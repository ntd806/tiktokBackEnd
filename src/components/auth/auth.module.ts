import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema, User } from './model/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Helper } from 'src/vender/core/helpers/helper';

@Module({
    imports: [
        JwtModule.register({ secret: process.env.SECRET }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
    ],
    providers: [AuthService, Helper],
    controllers: [AuthController]
})
export class AuthModule {}
