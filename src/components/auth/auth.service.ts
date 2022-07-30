import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto, SocialDto, VerifyDto} from './dto';
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
            if(user.mac.find(({mac}) => mac == dto.mac)){
                return {
                    status: 40004,
                    data: true,
                    message: 'Register failed'
                }
            } else {
                let mac = user.mac;
                mac.push({mac: dto.mac});
                await this.authModel.findOneAndUpdate(
                    { _id: user._id },
                    {
                        mac: mac
                    }
                );
                let access_token = await this.signToken(user.phone);
                return {
                    status: 40001,
                    data: access_token,
                    message: 'Register success'
                };
            }
        } else {
            let dataInsert = {
                ip: dto.ip,
                mac: [{
                    mac: dto.mac,
                }],
                phone: dto.phone,
                birthdate: dto.birthdate,
                sex: dto.sex,
                fullname: dto.fullname
            };
            const newAuth = await this.authModel.create(dataInsert);
            newAuth.save();
            let access_token = await this.signToken(newAuth.phone);
            return {
                status: 40001,
                data: access_token,
                message: 'Register success'
            };
        }
    }

    async signToken(phone: string): Promise<{ access_token: string }> {
        const payload = {
            sub: phone
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

    async verifyPhoneNumber(verifyDto: VerifyDto) {
        try {
            const user = await this.authModel
                .findOne({ phone: verifyDto.phone });

            if (!user) {
                return {
                    code: 80001,
                    data: true,
                    message: 'Phone number verified successfully'
                };
            }

            if(user.mac.find(({mac}) => mac == verifyDto.mac)){
                return {
                    code: 80004,
                    data: false,
                    message: 'The old device'
                };
            }

            return {
                code: 80003,
                data: false,
                message: 'the another device'
            };
        } catch (error) {
            throw new NotFoundException(error);
        }
    }

    async socialNetwork(socialDto: SocialDto) {
        const user = await this.authModel.findOne({ phone: socialDto.phone });

        if (!user) {
            let data = {
                ip: socialDto.ip,
                mac: [{
                    mac: socialDto.mac,
                }],
                phone: socialDto.phone,
                fullname: socialDto.fullname,
                social: [{
                    email: socialDto.email,
                    token: socialDto.token,
                    id: socialDto.id,
                    url: socialDto.url,
                    isGoogle: socialDto.isGoogle
                }]
            }
            const newAuth = await this.authModel.create(data);
            newAuth.save();
            let access_token = await this.signToken(newAuth.phone);

            return {
                status: 80005,
                data: access_token,
                message: 'Registered by social successfully'
            };
        }


    }
}
