import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app/controllers/app.controller';
import { ConfigModule } from './config/config.module';
import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './components/auth/auth.module';
import { UserModule } from './components/user/user.module';
// import { ProductModule } from './components/product/product.module';
import { DatabaseModule } from './database/database.module';
import { TwilioModule } from 'nestjs-twilio';
import { RedisCacheModule } from './redis/redis.module';
import { LiveModule } from './components/live/live.module';
import { GameModule } from './components/game/game.module';
import { Auth } from './components/auth/entity/auth.entity';
import { User } from './components/user/entity/user.entity';

import * as dotenv from 'dotenv';
dotenv.config();
@Module({
    imports: [
        TwilioModule.forRoot({
            accountSid: process.env.TWILIO_ACCOUNT_SID,
            authToken: process.env.TWILIO_AUTH_TOKEN
        }),
        DatabaseModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'mongodb',
            host: 'mongo',
            port: 27017,
            database: 'tiktok',
            entities: [Auth, User]
        }),
        ConfigModule,
        LoggerModule,
        RedisCacheModule,
        LiveModule,
        AuthModule,
        GameModule,
        UserModule
    ],
    controllers: [AppController]
})
export class AppModule {}
