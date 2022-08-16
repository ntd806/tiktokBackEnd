import { Injectable } from '@nestjs/common';
import { JwtService as NestJSJwtService } from '@nestjs/jwt';
import { JwtPayload } from '../../interfaces';

@Injectable()
export class JwtService {
    constructor(
        private readonly jwt: NestJSJwtService,
    ) {}

    async signToken(phone: string, fullname: string): Promise<{ access_token: string }> {
        const payload: JwtPayload = {
            sub: phone,
            fullname,
        };
        const secret = process.env.SECRET;

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '365d',
            secret: secret
        });

        return {
            access_token: token
        };
    }
}