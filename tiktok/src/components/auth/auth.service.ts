import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entity/auth.entity';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwt: JwtService,
        @InjectRepository(Auth)
        private readonly authRepository: Repository<Auth>
    ) {}

    async signup(dto: AuthDto) {
        const user = await this.authRepository.findOne({
            where: { phone: dto.phone }
        });
        if (user) {
            return false;
        } else {
            const auth = new Auth();
            auth.phone = dto.phone;
            auth.ip = dto.ip;
            auth.mac = dto.mac;
            const newUser = await this.authRepository.save(auth);
            return this.signToken(newUser.phone);
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
