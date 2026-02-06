import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../configs/database/database.service';

@Injectable()
export class NoroService {
  private readonly logger = new Logger(NoroService.name);
  private readonly OLLAMA_URL = 'http://localhost:11434/api/chat';
  private readonly MODEL = 'llama3'; // or 'noro' custom model

  constructor(private readonly prisma: DatabaseService) {}

  async chat(userId: string, content: string) {
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

    try {
      const messages = [
        {
          role: 'system',
          content:
            'You are Noro, a friendly and helpful AI assistant for the Ding platform.',
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

  async transcribe(file: Express.Multer.File) {
    // Mock STT
    return { text: 'This is a simulated transcription of the uploaded audio.' };
  }

  async speak(text: string) {
    // Mock TTS
    return { audioUrl: 'https://example.com/noro-speech.mp3' };
  }
}
