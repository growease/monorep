import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT_API', 3001);
  const nodeEnv = configService.get<string>('NODE_ENV', 'development');

  // Global prefix for REST APIs (GraphQL stays at /graphql)
  app.setGlobalPrefix('api');

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  // Global exception filter for user-friendly errors
  app.useGlobalFilters(new AllExceptionsFilter());

  // CORS
  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN', 'http://localhost:3000'),
    credentials: true,
  });

  // Swagger/OpenAPI documentation
  if (nodeEnv !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('GrowEase API')
      .setDescription(
        'REST API documentation for GrowEase. GraphQL API is available at /graphql'
      )
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document, {
      customSiteTitle: 'GrowEase API Docs',
    });

    logger.log(`📚 Swagger UI available at http://localhost:${port}/api-docs`);
  }

  await app.listen(port);

  logger.log(`🚀 API server is running on http://localhost:${port}`);
  logger.log(`🔗 GraphQL endpoint: http://localhost:${port}/graphql`);

  // Graceful shutdown
  process.on('SIGTERM', async () => {
    logger.log('SIGTERM signal received: closing HTTP server');
    await app.close();
  });
}

bootstrap();

