import { Injectable, Logger } from '@nestjs/common';
import { HealthStatus } from '@growease/types';
import { Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);
  private readonly startTime = Date.now();

  constructor(@Inject('PrismaClient') private prisma: PrismaClient) {}

  async getHealth(): Promise<HealthStatus> {
    const uptime = Math.floor((Date.now() - this.startTime) / 1000);
    const services: HealthStatus['services'] = {};

    // Check database connection (for MongoDB, use a simple operation)
    try {
      await this.prisma.$runCommandRaw({ ping: 1 });
      services.database = 'healthy';
    } catch (error) {
      this.logger.error('Database health check failed', error);
      services.database = 'unhealthy';
    }

    const status =
      Object.values(services).every((s) => s === 'healthy') && services.database === 'healthy'
        ? 'ok'
        : 'error';

    return {
      status,
      timestamp: new Date(),
      uptime,
      services,
    };
  }
}

