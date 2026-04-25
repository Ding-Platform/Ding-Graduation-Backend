import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function readArg(key: '--email' | '--userId'): string | undefined {
  const index = process.argv.indexOf(key);
  if (index === -1) return undefined;
  return process.argv[index + 1];
}

async function main() {
  const email = readArg('--email');
  const userId = readArg('--userId');

  if (!email && !userId) {
    throw new Error(
      'Usage: pnpm prisma:promote-admin --email user@example.com OR --userId <uuid>',
    );
  }

  const user = await prisma.user.findFirst({
    where: {
      ...(email ? { email } : {}),
      ...(userId ? { id: userId } : {}),
    },
    select: { id: true, email: true, role: true, name: true },
  });

  if (!user) {
    throw new Error('User not found for provided criteria.');
  }

  if (user.role === 'ADMIN') {
    console.log(`User ${user.email} is already ADMIN.`);
    return;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { role: 'ADMIN' },
  });

  console.log(`Promoted ${user.email} (${user.id}) to ADMIN.`);
}

main()
  .catch((error) => {
    console.error(error.message ?? error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
