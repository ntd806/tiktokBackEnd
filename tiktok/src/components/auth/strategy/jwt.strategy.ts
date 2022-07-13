import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../model/user.schema';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(@InjectRepository(User) private authRepo: Repository<User>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        });
    }

    async validate(payload: { sub: number; email: string }) {
        const auth = await this.authRepo.find({
            where: {
                _id: payload.sub
            }
        });
        return auth;
    }
}
