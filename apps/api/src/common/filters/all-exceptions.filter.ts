import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * Global exception filter
 * Ensures all errors are returned in a user-friendly format
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'An unexpected error occurred';
    let code = 'INTERNAL_ERROR';
    let details: unknown = undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const responseObj = exceptionResponse as {
          message?: string | string[];
          error?: string;
          code?: string;
          details?: unknown;
        };

        message = Array.isArray(responseObj.message)
          ? responseObj.message.join(', ')
          : responseObj.message || responseObj.error || message;
        code = responseObj.code || exception.name;
        details = responseObj.details;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      code = exception.name;
    }

    // Log technical details internally
    this.logger.error(
      `${request.method} ${request.url} - ${status} - ${message}`,
      exception instanceof Error ? exception.stack : JSON.stringify(exception),
      'AllExceptionsFilter'
    );

    // Return user-friendly response
    response.status(status).json({
      success: false,
      error: {
        message,
        code,
        ...(details ? { details } : {}),
        ...(process.env.NODE_ENV === 'development' && {
          path: request.url,
          timestamp: new Date().toISOString(),
        }),
      },
    });
  }
}

