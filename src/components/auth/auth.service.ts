import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { User } from './model/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VerifyDto } from '../user/dto/verify.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwt: JwtService,
        @InjectModel(User.name)
        private readonly authModel: Model<User>,
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

    async verifyPhoneNumber(verifyDto: VerifyDto) {
        try {
            const user = await this.authModel.find({phone:verifyDto.phone}).exec();
            const count = user.length
            
            if (count == 0) {
                return {
                    code: 70001,
                    data: true,
                    message: 'Phone number verified successfully'
                };
            }

            if (count >= 1) {
                for (let item of user) {
                    let splitted = `${item.mac}`.split(",");
                    if (!splitted.includes(`${verifyDto.mac}`)) {
                        return {
                            code: 70003,
                            data: false,
                            message: 'the another device'
                        };
                    }
                }
            }

            return {
                code: 70004,
                data: false,
                message: 'The old device'
            };
            
        } catch (error) {
            throw new NotFoundException(error);
        }
    }
}
