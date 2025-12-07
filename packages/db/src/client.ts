import { PrismaClient } from '@prisma/client';

/**
 * Prisma Client singleton
 * Ensures we only have one instance of PrismaClient across the application
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

/**
 * Get database client instance
 * This is the main export for database access
 */
export function getDbClient(): PrismaClient {
  return prisma;
}

/**
 * Disconnect from database
 * Useful for cleanup in tests or graceful shutdown
 */
export async function disconnectDb(): Promise<void> {
  await prisma.$disconnect();
}

/**
 * Connect to database and verify connection
 */
export async function connectDb(): Promise<void> {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
}

