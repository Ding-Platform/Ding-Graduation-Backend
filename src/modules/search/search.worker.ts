import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { SearchService } from './search.service';
import { DatabaseService } from '../../configs/database/database.service';

interface IndexingJobData {
  type: 'user' | 'post';
  action: 'create' | 'update' | 'delete';
  data: any;
}

@Processor('search-indexing')
export class SearchWorker {
  constructor(
    private readonly searchService: SearchService,
    private readonly prisma: DatabaseService,
  ) {}

  @Process('index-document')
  async handleIndexing(job: Job<IndexingJobData>) {
    const { type, action, data } = job.data;

    try {
      if (type === 'user') {
        await this.handleUserIndexing(action, data);
      } else if (type === 'post') {
        await this.handlePostIndexing(action, data);
      }
    } catch (error) {
      console.error(`Search indexing error for ${type} ${action}:`, error);
      // Retry logic could be implemented here
      throw error;
    }
  }

  private async handleUserIndexing(action: string, data: any) {
    switch (action) {
      case 'create':
      case 'update':
        // Fetch fresh user data from database
        const user = await this.prisma.user.findUnique({
          where: { id: data.id },
          select: {
            id: true,
            name: true,
            image: true,
            active: true,
            isBanned: true,
            Profile: {
              select: {
                bio: true,
              },
            },
          },
        });

        if (user) {
          await this.searchService.updateUser({
            ...user,
            bio: user.Profile?.bio || '',
          });
        }
        break;

      case 'delete':
        await this.searchService.removeUser(data.id);
        break;
    }
  }

  private async handlePostIndexing(action: string, data: any) {
    switch (action) {
      case 'create':
      case 'update':
        // Fetch fresh post data with author info
        const post = await this.prisma.post.findUnique({
          where: { id: data.id },
          select: {
            id: true,
            content: true,
            authorId: true,
            createdAt: true,
            privacy: true,
            isDeleted: true,
            author: {
              select: {
                name: true,
              },
            },
          },
        });

        if (post && !post.isDeleted) {
          await this.searchService.updatePost(post);
        } else if (post && post.isDeleted) {
          await this.searchService.removePost(post.id);
        }
        break;

      case 'delete':
        await this.searchService.removePost(data.id);
        break;
    }
  }
}
