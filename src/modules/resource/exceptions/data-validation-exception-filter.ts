import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

import { Request, Response } from 'express';

import { DataValidationException } from './data-validation-exception';

@Catch(DataValidationException)
export class DataValidationExceptionFilter implements ExceptionFilter {
    catch(exception: DataValidationException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = 400;

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url,
            errors: exception.errors,
        });
    }
}
