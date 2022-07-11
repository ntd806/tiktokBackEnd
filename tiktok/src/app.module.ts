import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app/controllers/app.controller';
import { ConfigModule } from './config/config.module';
import { LoggerModule } from './logger/logger.module';
import { AuthModule } from './components/auth/auth.module';
// import { ProductModule } from './components/product/product.module';
import { DatabaseModule } from './database/database.module';
@Module({
    imports: [DatabaseModule.forRoot(), ConfigModule, LoggerModule, AuthModule],
    controllers: [AppController]
})
export class AppModule {}
