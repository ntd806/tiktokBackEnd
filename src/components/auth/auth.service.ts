import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto, SocialDto, VerifyDto } from './dto';
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
        const access_token = await this.signToken(dto.phone);
        if (user) {
            if (user.mac.find(({ mac }) => mac == dto.mac)) {
                return {
                    code: 40004,
                    data: access_token,
                    message: 'Register failed'
                };
            } else {
                const mac = user.mac;
                mac.push({ mac: dto.mac });
                await this.authModel.findOneAndUpdate(
                    { _id: user._id },
                    {
                        mac: mac
                    }
                );
                return {
                    code: 40001,
                    data: access_token,
                    message: 'Register success'
                };
            }
        } else {
            const dataInsert = {
                ip: dto.ip,
                mac: [
                    {
                        mac: dto.mac
                    }
                ],
                phone: dto.phone,
                birthdate: dto.birthdate,
                sex: dto.sex,
                fullname: dto.fullname
            };
            const newAuth = await this.authModel.create(dataInsert);
            newAuth.save();
            const access_token = await this.signToken(newAuth.phone);
            return {
                code: 40001,
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
            const user = await this.authModel.findOne({
                phone: verifyDto.phone
            });

            if (!user) {
                return {
                    code: 80001,
                    data: true,
                    message: 'Phone number verified successfully'
                };
            }

            if (user.mac.find(({ mac }) => mac == verifyDto.mac)) {
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
        try {
            const user = await this.authModel.findOne({
                phone: socialDto.phone
            });
            const access_token = await this.signToken(socialDto.phone);
            if (!user) {
                const dataInsert = {
                    ip: socialDto.ip,
                    mac: [
                        {
                            mac: socialDto.mac
                        }
                    ],
                    phone: socialDto.phone,
                    fullname: socialDto.fullname,
                    social: { 
                        token: socialDto.url,
                        isGoogle: socialDto.isGoogle,
                        email: socialDto.email,
                        id: socialDto.id,
                        url: socialDto.url
                    }
                };
                const newAuth = await this.authModel.create(dataInsert);
                newAuth.save();

                return {
                    code: 80001,
                    data: access_token,
                    message: 'Registered by social successfully'
                };
            }

            if (user.mac.find(({ mac }) => mac == socialDto.mac)) {
                return {
                    code: 80006,
                    data: access_token,
                    message: 'The old device'
                };
            }
            const mac = user.mac;
            mac.push({ mac: socialDto.mac });
            const dataUpdate = {
                ip: socialDto.ip,
                mac: mac,
                phone: socialDto.phone,
                fullname: socialDto.fullname,
                social: { 
                    token: socialDto.url,
                    isGoogle: socialDto.isGoogle,
                    email: socialDto.email,
                    id: socialDto.id,
                    url: socialDto.url
                }
            };
            await user.update(dataUpdate);
            await user.save();
            return {
                code: 80007,
                data: access_token,
                message: 'The new device'
            };

        } catch (error) {
            throw new NotFoundException(error);
        }
    }

    private async isNotNullUser(socialDto: SocialDto) {
        try {
            const user = await this.authModel.findOne({
                phone: socialDto.phone
            });
            const access_token = await this.signToken(socialDto.phone);

            if(user) {
                return {
                    code: 80003,
                    data: false,
                    message: 'the another device'
                };
            }

            const data = {
                ip: socialDto.ip,
                mac: [
                    {
                        mac: socialDto.mac
                    }
                ],
                phone: socialDto.phone,
                fullname: socialDto.fullname
            };
            const newAuth = await this.authModel.create(data);
            newAuth.save();

            return {
                code: 80005,
                data: access_token,
                message: 'Registered by social successfully'
            };
        } catch (error) {
            throw new NotFoundException(error);
        }
    }
}
