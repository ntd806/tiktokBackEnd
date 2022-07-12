import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from '../entity/auth.entity';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(Auth) private authRepo: Repository<Auth>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET
        });
    }

    async validate(payload: { sub: string}) {
        console.log(payload.sub);
        const auth = await this.authRepo.find({
            where: {
                phone: payload.sub
            }
        });
        return auth;
    }
}
