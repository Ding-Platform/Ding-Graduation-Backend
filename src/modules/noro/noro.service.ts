import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../configs/database/database.service';
import {
  CrisisIntervention,
  CrisisSeverity,
  InterventionMethod,
  NoroMessageRole,
  NoroTrigger,
} from '@prisma/client';

import { InterestService } from '../interest/interest.service';

@Injectable()
export class NoroService {
  private readonly logger = new Logger(NoroService.name);
  private readonly OLLAMA_URL = 'http://localhost:11434/api/chat';
  private readonly MODEL = 'llama3'; // or 'noro' custom model

  constructor(
    private readonly prisma: DatabaseService,
    private readonly interestService: InterestService,
  ) {}

  async getContext(userId: string) {
    // Fetch User Profile, Mood, Sentiment, and Interests
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { Profile: true, userMoodProfile: true, sentimentProfile: true },
    });

    let age: number | null = null;
    if (user?.Profile?.dateOfBirth) {
      const diff = Date.now() - user.Profile.dateOfBirth.getTime();
      age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    }

    const interests = await this.interestService.getTopInterests(userId, 5);
    const interestTopics = interests.map((i) => i.topic);
    
    let dominantMood = 'neutral';
    let energyLevel = 5;

    if (user?.userMoodProfile) {
      dominantMood = user.userMoodProfile.dominantMood || 'neutral';
      energyLevel = user.userMoodProfile.energyLevel ? Number(user.userMoodProfile.energyLevel) : 5;
    } else if (user?.sentimentProfile) {
      const { positivePoints, negativePoints } = user.sentimentProfile;
      if (negativePoints >= 70) {
        dominantMood = 'sad';
        energyLevel = 3;
      } else if (negativePoints >= 55) {
        dominantMood = 'anxious';
        energyLevel = 4;
      } else if (positivePoints >= 65) {
        dominantMood = 'happy';
        energyLevel = 8;
      }
    }

    return {
      name: user?.name || null,
      age,
      location: user?.Profile?.location || null,
      interests: interestTopics,
      emotionalState: {
        dominantMood,
        energyLevel,
      }
    };
  }

  async chat(userId: string, content: string, systemPrompt?: string) {
    // 1. Context Retrieval
    const history = await this.prisma.noroChat.findMany({
      where: { userId },
      take: 10,
      orderBy: { createdAt: 'desc' },
    });

    // Format history for Ollama
    // history is desc (newest first), reverse it for chronological order
    const contextMessages = history.reverse().flatMap((chat) => [
      { role: 'user', content: chat.message },
      { role: 'assistant', content: chat.response },
    ]);

    // 2. Call Ollama
    let responseText = "I'm having trouble connecting to my brain right now.";

    const defaultSystemPrompt = 'You are Noro, a friendly and helpful AI assistant for the Ding platform.';

    try {
      const messages = [
        {
          role: 'system',
          content: systemPrompt || defaultSystemPrompt,
        },
        ...contextMessages,
        { role: 'user', content: content },
      ];

      const body = {
        model: this.MODEL,
        messages,
        stream: false,
      };

      const response = await fetch(this.OLLAMA_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        responseText = data.message?.content || responseText;
      } else {
        this.logger.warn(`Ollama responded with ${response.status}`);
        if (process.env.NODE_ENV !== 'production') {
          responseText = `[Mock Noro] You said: "${content}". (Ollama not running)`;
        }
      }
    } catch (error) {
      this.logger.error('Failed to call Ollama', error);
      responseText = `[Mock Noro] You said: "${content}". (Ollama unreachable)`;
    }

    // 3. Save to DB
    const chat = await this.prisma.noroChat.create({
      data: {
        userId,
        message: content,
        response: responseText,
      },
    });

    return chat;
  }

  async getHistory(userId: string) {
    return this.prisma.noroChat.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }

  async createConversation(
    userId: string,
    trigger: NoroTrigger = 'USER_INITIATED',
  ) {
    return this.prisma.noroConversation.create({
      data: {
        userId,
        trigger,
      },
    });
  }

  async addMessage(payload: {
    conversationId: string;
    userId: string;
    role: NoroMessageRole;
    content: string;
  }) {
    const message = await this.prisma.noroMessage.create({
      data: {
        conversationId: payload.conversationId,
        userId: payload.userId,
        role: payload.role,
        content: payload.content,
      },
    });

    if (payload.role === 'USER') {
      const sentiment = this.estimateSentiment(payload.content);
      await this.prisma.noroMessage.update({
        where: { id: message.id },
        data: {
          sentiment,
          keywords: sentiment.keywords,
        },
      });
      await this.updateMoodProfile(
        payload.userId,
        sentiment.score,
        payload.conversationId,
      );
      await this.maybeCreateCrisisEvent(
        payload.userId,
        message.id,
        payload.content,
      );
    }

    return this.prisma.noroMessage.findUnique({
      where: { id: message.id },
    });
  }

  async listConversations(userId: string, cursor?: string, limit = 20) {
    const cursorDate = this.decodeCursor(cursor);
    const safeLimit = Math.min(Math.max(limit, 1), 50);

    const rows = await this.prisma.noroConversation.findMany({
      where: {
        userId,
        deletedAt: null,
        ...(cursorDate ? { startedAt: { lt: cursorDate } } : {}),
      },
      orderBy: { startedAt: 'desc' },
      take: safeLimit + 1,
    });

    const hasMore = rows.length > safeLimit;
    const data = hasMore ? rows.slice(0, safeLimit) : rows;
    const nextCursor = hasMore
      ? this.encodeCursor(data[data.length - 1].startedAt)
      : null;

    return {
      data,
      nextCursor,
      hasMore,
    };
  }

  async getConversationMessages(
    userId: string,
    conversationId: string,
    cursor?: string,
    limit = 20,
  ) {
    const conversation = await this.prisma.noroConversation.findFirst({
      where: {
        id: conversationId,
        userId,
        deletedAt: null,
      },
    });

    if (!conversation) {
      return { data: [], nextCursor: null, hasMore: false };
    }

    const cursorDate = this.decodeCursor(cursor);
    const safeLimit = Math.min(Math.max(limit, 1), 100);

    const rows = await this.prisma.noroMessage.findMany({
      where: {
        conversationId,
        deletedAt: null,
        ...(cursorDate ? { createdAt: { lt: cursorDate } } : {}),
      },
      orderBy: { createdAt: 'desc' },
      take: safeLimit + 1,
    });

    const hasMore = rows.length > safeLimit;
    const data = hasMore ? rows.slice(0, safeLimit) : rows;
    const nextCursor = hasMore
      ? this.encodeCursor(data[data.length - 1].createdAt)
      : null;

    return {
      data,
      nextCursor,
      hasMore,
    };
  }

  async softDeleteConversation(userId: string, conversationId: string) {
    await this.prisma.noroConversation.updateMany({
      where: {
        id: conversationId,
        userId,
        deletedAt: null,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async reportCrisis(payload: {
    userId: string;
    messageId?: string;
    crisisScore: number;
    keywords: string[];
  }) {
    return this.prisma.crisisEvent.create({
      data: {
        userId: payload.userId,
        messageId: payload.messageId,
        crisisScore: payload.crisisScore,
        keywordsHit: payload.keywords,
        severity: this.mapSeverity(payload.crisisScore),
        intervention: this.mapIntervention(payload.crisisScore),
      },
    });
  }

  async getHotlines(countryCode: string, language = 'en') {
    const normalizedCountry = (countryCode || '').trim().toUpperCase();
    if (!normalizedCountry || normalizedCountry.length !== 2) {
      return [];
    }
    return this.prisma.crisisHotline.findMany({
      where: {
        isActive: true,
        countryCode: normalizedCountry,
        OR: [{ language }, { language: 'en' }],
      },
      orderBy: [{ language: 'desc' }, { name: 'asc' }],
    });
  }

  async logIntervention(userId: string, crisisEventId: string, type: string) {
    await this.prisma.crisisEvent.updateMany({
      where: {
        id: crisisEventId,
        userId,
      },
      data: {
        intervention: type === 'hotline_response' ? 'HOTLINE' : 'SOFT',
      },
    });
  }

  async transcribe(file: Express.Multer.File) {
    // Mock STT
    return { text: 'This is a simulated transcription of the uploaded audio.' };
  }

  async speak(text: string) {
    // Mock TTS
    return { audioUrl: 'https://example.com/noro-speech.mp3' };
  }

  async handleSentimentIntervention(userId: string, negativePoints: number) {
    let method: InterventionMethod;
    if (negativePoints >= 85) {
      method = 'CONVERSATION';
    } else if (negativePoints >= 78) {
      method = 'FRIEND_SUGGESTION';
    } else {
      method = 'FEED_BOOST';
    }

    if (method === 'CONVERSATION') {
      const conversation = await this.createConversation(
        userId,
        'PERIODIC_CHECKIN',
      );

      await this.addMessage({
        conversationId: conversation.id,
        userId,
        role: 'ASSISTANT',
        content:
          "Hey, I noticed you might be going through a tough time. I'm here if you want to talk. How are you feeling?",
      });

      return {
        method,
        conversationId: conversation.id,
        suggestedFriendIds: [] as string[],
      };
    }

    if (method === 'FRIEND_SUGGESTION') {
      // Lightweight fallback suggestion using accepted friendships.
      const friends = await this.prisma.friendship.findMany({
        where: {
          status: 'ACCEPTED',
          OR: [{ requesterId: userId }, { recipientId: userId }],
        },
        take: 3,
        orderBy: { updatedAt: 'desc' },
      });

      const suggestedFriendIds = friends.map((f) =>
        f.requesterId === userId ? f.recipientId : f.requesterId,
      );

      return {
        method,
        suggestedFriendIds,
      };
    }

    return {
      method,
      suggestedFriendIds: [] as string[],
    };
  }

  private encodeCursor(date: Date) {
    return Buffer.from(date.toISOString()).toString('base64');
  }

  private decodeCursor(cursor?: string): Date | null {
    if (!cursor) {
      return null;
    }

    try {
      const raw = Buffer.from(cursor, 'base64').toString('utf8');
      const parsed = new Date(raw);
      if (Number.isNaN(parsed.getTime())) {
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  }

  private estimateSentiment(content: string) {
    const lower = content.toLowerCase();
    const positiveWords = [
      'good',
      'great',
      'happy',
      'better',
      'love',
      'thanks',
    ];
    const negativeWords = [
      'sad',
      'depressed',
      'anxious',
      'hurt',
      'alone',
      'bad',
    ];
    const crisisWords = [
      'suicide',
      'kill myself',
      'end my life',
      'self harm',
      'hopeless',
    ];
    const words = lower.split(/\s+/).filter(Boolean);

    const positiveHits = positiveWords.filter((word) =>
      lower.includes(word),
    ).length;
    const negativeHits = negativeWords.filter((word) =>
      lower.includes(word),
    ).length;
    const crisisHits = crisisWords.filter((word) =>
      lower.includes(word),
    ).length;

    const rawScore = positiveHits - negativeHits - crisisHits * 2;
    const normalized = Math.max(-1, Math.min(1, rawScore / 4));
    const label =
      normalized > 0.2
        ? 'positive'
        : normalized < -0.2
          ? 'negative'
          : 'neutral';

    return {
      score: normalized,
      label,
      keywords: words.filter((word) => word.length > 3).slice(0, 10),
    };
  }

  private async updateMoodProfile(
    userId: string,
    sentimentScore: number,
    conversationId: string,
  ) {
    const existing = await this.prisma.userMoodProfile.findUnique({
      where: { userId },
    });

    const latestMoodScore = this.normalizeMoodScore(sentimentScore);
    const moodScore = existing?.moodScore
      ? Number(
          (0.3 * latestMoodScore + 0.7 * Number(existing.moodScore)).toFixed(2),
        )
      : latestMoodScore;
    const energyLevel = Number(
      Math.max(1, Math.min(10, moodScore + 0.5)).toFixed(2),
    );
    const dominantMood =
      moodScore >= 6.8
        ? 'happy'
        : moodScore <= 4
          ? 'sad'
          : moodScore <= 5.5
            ? 'anxious'
            : 'neutral';

    await this.prisma.userMoodProfile.upsert({
      where: { userId },
      update: {
        moodScore,
        energyLevel,
        dominantMood,
        sourceConvId: conversationId,
        lastUpdated: new Date(),
      },
      create: {
        userId,
        moodScore,
        energyLevel,
        dominantMood,
        sourceConvId: conversationId,
      },
    });
  }

  private normalizeMoodScore(sentimentScore: number) {
    return Number((5.5 + sentimentScore * 3.5).toFixed(2));
  }

  private async maybeCreateCrisisEvent(
    userId: string,
    messageId: string,
    content: string,
  ) {
    const lower = content.toLowerCase();
    const keywords = [
      'suicide',
      'kill myself',
      'end my life',
      'self harm',
      'i want to die',
    ];
    const hits = keywords.filter((keyword) => lower.includes(keyword));
    if (!hits.length) {
      return null;
    }

    const crisisScore = Number(
      Math.min(0.95, 0.45 + hits.length * 0.18).toFixed(4),
    );
    return this.prisma.crisisEvent.create({
      data: {
        userId,
        messageId,
        crisisScore,
        severity: this.mapSeverity(crisisScore),
        intervention: this.mapIntervention(crisisScore),
        keywordsHit: hits,
      },
    });
  }

  private mapSeverity(score: number): CrisisSeverity {
    if (score > 0.7) return 'HIGH';
    if (score >= 0.4) return 'MEDIUM';
    return 'LOW';
  }

  private mapIntervention(score: number): CrisisIntervention {
    if (score > 0.7) return 'HOTLINE';
    if (score >= 0.4) return 'SOFT';
    return 'NONE';
  }
}
