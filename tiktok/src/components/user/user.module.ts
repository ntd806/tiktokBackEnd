import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { Auth } from '../auth/entity/auth.entity';
import { Repository } from 'typeorm';
import { JwtStrategy } from '../auth/strategy';

@Module({
    imports: [
        JwtModule.register({ secret: process.env.SECRET }),
        TypeOrmModule.forFeature([User, Repository, Auth])
    ],
    providers: [UserService, JwtStrategy],
    controllers: [UserController]
})
export class UserModule {}
