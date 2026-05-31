import { PrismaClient } from '@prisma/client';
import { MeiliSearch } from 'meilisearch';

const prisma = new PrismaClient();
const meilisearch = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST || 'http://localhost:7700',
  apiKey: process.env.MEILISEARCH_API_KEY || 'masterKey123',
});

async function waitForTask(indexUid: string, taskUid: number, label: string) {
  const task = await meilisearch.index(indexUid).waitForTask(taskUid);

  if (task.status !== 'succeeded') {
    throw new Error(`${label} failed with status: ${task.status}`);
  }

  console.log(`${label} completed`);
  return task;
}

async function ensureIndex(indexUid: string) {
  try {
    await meilisearch.index(indexUid).getRawInfo();
    console.log(`${indexUid} index already exists`);
    return;
  } catch (error) {
    const code =
      typeof error === 'object' && error !== null && 'code' in error ? String(error.code) : undefined;

    if (code && code !== 'index_not_found' && code !== 'index_not_accessible') {
      throw error;
    }
  }

  const task = await meilisearch.createIndex(indexUid, { primaryKey: 'id' });
  await waitForTask(indexUid, task.taskUid, `Create ${indexUid} index`);
}

async function clearIndex(indexUid: string) {
  const task = await meilisearch.index(indexUid).deleteAllDocuments();
  await waitForTask(indexUid, task.taskUid, `Clear ${indexUid} index`);
}

async function main() {
  console.log('Starting search indexing...');

  try {
    console.log('Ensuring search indexes exist...');
    await ensureIndex('users');
    await ensureIndex('posts');

    console.log('Clearing existing search documents...');
    await clearIndex('users');
    await clearIndex('posts');

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
      const task = await meilisearch.index('users').addDocuments(userDocuments, { primaryKey: 'id' });
      await waitForTask('users', task.taskUid, 'Index users');
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
      await waitForTask('posts', result.taskUid, 'Index posts');
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
