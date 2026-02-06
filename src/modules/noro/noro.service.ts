import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../configs/database/database.service';

@Injectable()
export class NoroService {
  private readonly logger = new Logger(NoroService.name);
  private readonly OLLAMA_URL = 'http://localhost:11434/api/chat';
  private readonly MODEL = 'llama3'; // or 'noro' custom model

  constructor(private readonly prisma: DatabaseService) {}

  async chat(userId: string, content: string) {
    // 1. Save user message temporarily or just context?
    // We'll save the interaction after response.

    // 2. Call Ollama
    let responseText = "I'm having trouble connecting to my brain right now.";

    try {
      // Basic fetch to Ollama
      // In Node.js 18+ fetch is native.
      // If environment is older, we might need 'node-fetch' but let's assume native or simple http.
      // Since 'axios' is broken, we use native fetch.

      const body = {
        model: this.MODEL,
        messages: [
          {
            role: 'system',
            content:
              'You are Noro, a friendly and helpful AI assistant for the Ding platform.',
          },
          { role: 'user', content: content },
        ],
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
        // Fallback or Mock if 404/Connection refused
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
}
