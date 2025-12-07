import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { DatabaseModule } from './database/database.module';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';


@Module({
  imports: [
    // Config module - loads from .env or can be extended for secret managers
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
      cache: true,
    }),
    // GraphQL module with code-first approach
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        playground: configService.get<string>('NODE_ENV') !== 'production',
        introspection: configService.get<string>('NODE_ENV') !== 'production',
        context: ({ req, res }: { req: Request; res: Response }) => ({ req, res }),
        formatError: (error) => {
          // Return user-friendly error messages
          return {
            message: error.message,
            code: error.extensions?.code || 'INTERNAL_ERROR',
            path: error.path,
          };
        },
      }),
    }),
    DatabaseModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

