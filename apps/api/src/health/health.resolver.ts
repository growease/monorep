import { Resolver, Query } from '@nestjs/graphql';
import { HealthStatus } from '@growease/types';
import { HealthService } from './health.service';
import { ObjectType, Field } from '@nestjs/graphql';

// GraphQL Object Type for HealthStatus
@ObjectType()
export class HealthStatusType implements HealthStatus {
  @Field(() => String)
  status!: 'ok' | 'error';

  @Field(() => Date)
  timestamp!: Date;

  @Field(() => Number, { nullable: true })
  uptime?: number;

  @Field(() => HealthServicesType, { nullable: true })
  services?: {
    database?: 'healthy' | 'unhealthy';
  };
}

@ObjectType()
class HealthServicesType {
  @Field(() => String, { nullable: true })
  database?: 'healthy' | 'unhealthy';
}

@Resolver(() => HealthStatusType)
export class HealthResolver {
  constructor(private readonly healthService: HealthService) {}

  @Query(() => HealthStatusType, {
    name: 'health',
    description: 'Health check endpoint for monitoring',
  })
  async getHealth(): Promise<HealthStatus> {
    return this.healthService.getHealth();
  }
}

