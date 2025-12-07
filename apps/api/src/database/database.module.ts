import { Global, Module, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { connectDb, disconnectDb, prisma } from '@growease/db';

/**
 * Database Module
 * Provides Prisma client as a global module
 */
@Global()
@Module({
  providers: [
    {
      provide: 'PrismaClient',
      useValue: prisma,
    },
  ],
  exports: ['PrismaClient'],
})
export class DatabaseModule implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await connectDb();
  }

  async onModuleDestroy() {
    await disconnectDb();
  }
}

