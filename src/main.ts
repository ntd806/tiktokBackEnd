import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { createDocument } from './swagger/swagger';
import { SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { HttpExceptionFilter } from './vender/core/filter/exception.filter';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
// import { Transport } from '@nestjs/microservices';

dotenv.config();
import 'reflect-metadata';
(async () => {
    const app = await NestFactory.create(AppModule, { cors: true });
    app.useGlobalFilters(new HttpExceptionFilter());
    const configService = app.get(ConfigService);
    app.useGlobalPipes(new ValidationPipe({
        exceptionFactory: (validationErrors: ValidationError[] = []) => {
            console.error(JSON.stringify(validationErrors));
            return new BadRequestException(validationErrors.map(error => ({
                property: error.property,
                validators: error.constraints
            })));
          },
    }));
    SwaggerModule.setup('api/v1', app, createDocument(app));
    await app.listen(configService.get().port);
    console.info('SERVER IS RUNNING ON PORT', configService.get().port);
})();
