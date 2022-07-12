import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Auth } from './entity/auth.entity';
import { Repository } from 'typeorm';
import { DatabaseModule } from '../../database/database.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

@Module({
    imports: [
        JwtModule.register({ secret: process.env.SECRET }),
        TypeOrmModule.forFeature([Auth, Repository])
    ],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
