import { PrismaClient } from '@prisma/client';
import { MeiliSearch } from 'meilisearch';

const prisma = new PrismaClient();
const meilisearch = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST || 'http://localhost:7700',
  apiKey: process.env.MEILISEARCH_API_KEY || 'masterKey123',
});

async function main() {
  console.log('Starting search indexing...');

  try {
    // Index users
    console.log('Indexing users...');
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
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

    const userDocuments = users.map((user) => ({
      id: user.id,
      name: user.name || '',
      bio: user.Profile?.bio || '',
      avatar: user.image || '',
      isActive: user.active && !user.isBanned,
    }));

    if (userDocuments.length > 0) {
      await meilisearch.index('users').addDocuments(userDocuments);
      console.log(`Indexed ${userDocuments.length} users`);
    } else {
      console.log('No users to index');
    }

    // Index posts
    console.log('Indexing posts...');
    const posts = await prisma.post.findMany({
      where: {
        isDeleted: false,
      },
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

    console.log(`Found ${posts.length} posts in database`);
    const postDocuments = posts.map((post) => ({
      id: post.id,
      content: post.content,
      authorId: post.authorId,
      authorName: post.author?.name || 'Unknown',
      createdAt: post.createdAt.toISOString(),
      privacy: post.privacy || 'PUBLIC',
      isDeleted: false,
    }));

    if (postDocuments.length > 0) {
      const result = await meilisearch.index('posts').addDocuments(postDocuments, { primaryKey: 'id' });
      console.log(`Indexed ${postDocuments.length} posts`);
      console.log('MeiliSearch result:', result);
    } else {
      console.log('No posts to index');
    }

    console.log('Search indexing completed successfully!');
  } catch (error) {
    console.error('Error during search indexing:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
