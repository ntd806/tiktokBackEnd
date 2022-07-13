import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { User } from './model/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwt: JwtService,
        @InjectModel(User.name)
        private readonly authModel: Model<User>
    ) {}

    async signup(dto: AuthDto) {
        const user = await this.authModel.findOne({ phone: dto.phone });
        if (user) {
            return false;
        } else {
            const newAuth = await this.authModel.create(dto);
            newAuth.save();
            return this.signToken(newAuth.phone);
        }
        
    }

    async signToken(phone: string): Promise<{ access_token: string }> {
        const payload = {
            sub: phone
        };
        const secret = process.env.SECRET;

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '120m',
            secret: secret
        });

        return {
            access_token: token
        };
    }
}
