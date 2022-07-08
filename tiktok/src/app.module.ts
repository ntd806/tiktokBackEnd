import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app/controllers/app.controller';
import { ConfigModule } from './config/config.module';
import { LoggerModule } from './logger/logger.module';
import { DatabaseModule } from './database/database.module';
import { RedisCacheModule } from './redis/redis.module';
import { TwilioModule } from 'nestjs-twilio';
import { OtpModule } from './components/otp/otp.module';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
    imports: [
        TwilioModule.forRoot({
            accountSid: process.env.TWILIO_ACCOUNT_SID,
            authToken: process.env.TWILIO_AUTH_TOKEN
        }),
        DatabaseModule.forRoot(),
        ConfigModule,
        LoggerModule,
        RedisCacheModule,
        OtpModule
    ],
    controllers: [AppController]
})
export class AppModule {}
