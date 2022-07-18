import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app/controllers/app.controller';
import { ConfigModule } from './config/config.module';
import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './components/auth/auth.module';
import { UserModule } from './components/user/user.module';
import { DatabaseModule } from './database/database.module';
import { TwilioModule } from 'nestjs-twilio';
import { RedisCacheModule } from './components/redis/redis.module';
import { LiveModule } from './components/live/live.module';
import { GameModule } from './components/game/game.module';
import { SearchModule } from './components/search/search.module';
import { MoviesModule } from './components/movies/movies.module';
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
        LiveModule,
        AuthModule,
        GameModule,
        UserModule,
        SearchModule,
        MoviesModule
    ],
    controllers: [AppController]
})
export class AppModule {}
