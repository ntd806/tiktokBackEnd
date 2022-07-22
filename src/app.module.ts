import { Module, Scope } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './vender/core/filter/exception.filter';
import { LoggingInterceptor } from './vender/core/interceptors/logging.interceptor';
import { RequestService } from './vender/core/request.service';
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
    providers: [
        RequestService,
        {
            provide: APP_INTERCEPTOR,
            scope: Scope.REQUEST,
            useClass: LoggingInterceptor
        },
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter
        }
    ],
    controllers: []
})
export class AppModule {}
