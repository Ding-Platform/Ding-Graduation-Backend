import { PrismaClient } from '@prisma/client';
import neo4j from 'neo4j-driver';

const prisma = new PrismaClient();

const driver = neo4j.driver(
  process.env.NEO4J_URI || 'bolt://localhost:7687',
  neo4j.auth.basic(
    process.env.NEO4J_USER || 'neo4j',
    process.env.NEO4J_PASSWORD || 'password123'
  )
);

async function main() {
  console.log('🔄 Syncing existing friendships to follow relationships...');
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (u1:User)-[:FRIENDS]->(u2:User)
      RETURN u1.userId AS followerId, u2.userId AS followingId
    `);

    let count = 0;
    for (const record of result.records) {
      const followerId = record.get('followerId');
      const followingId = record.get('followingId');

      if (!followerId || !followingId) continue;

      // Create Follow in Postgres
      await prisma.follow.upsert({
        where: { followerId_followingId: { followerId, followingId } },
        create: { followerId, followingId },
        update: {},
      });

      // Create Follow in Neo4j
      await session.run(`
        MATCH (from:User {userId: $followerId}), (to:User {userId: $followingId})
        MERGE (from)-[:FOLLOWS {createdAt: datetime()}]->(to)
      `, { followerId, followingId });

      count++;
    }

    console.log(`✅ Successfully synced ${count} friendship relationships into follows!`);
  } catch (err) {
    console.error('❌ Error syncing relationships:', err);
  } finally {
    await session.close();
    await driver.close();
    await prisma.$disconnect();
  }
}

main().catch(console.error);
