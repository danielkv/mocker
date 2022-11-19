import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import { GlobalExceptionFilter } from '@shared/exceptions/exception-filter';

import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );
    app.useGlobalFilters(
        new GlobalExceptionFilter(app.get(HttpAdapterHost).httpAdapter),
    );
    await app.listen(3000);
}
bootstrap();
