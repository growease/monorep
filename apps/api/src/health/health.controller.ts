import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthService } from './health.service';
import { HealthStatus } from '@growease/types';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOperation({
    summary: 'Health check',
    description: 'Returns the health status of the API and its services',
  })
  @ApiResponse({
    status: 200,
    description: 'Health status retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', enum: ['ok', 'error'] },
        timestamp: { type: 'string', format: 'date-time' },
        uptime: { type: 'number' },
        services: {
          type: 'object',
          properties: {
            database: { type: 'string', enum: ['healthy', 'unhealthy'] },
          },
        },
      },
    },
  })
  async getHealth(): Promise<HealthStatus> {
    return this.healthService.getHealth();
  }
}

