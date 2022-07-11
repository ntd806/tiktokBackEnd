import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [JwtModule.register({ secret: process.env.SECRET })],
    providers: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {}
