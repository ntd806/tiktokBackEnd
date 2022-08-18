import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseErrorResponse, BaseResponse, JwtService } from '../../common';
import { AuthDto, SocialDto, VerifyDto, SignInDto } from './dto';
import { MESSAGE, MESSAGE_ERROR, STATUSCODE } from '../../constants';
import { UserService } from '../user/user.service';
import { UserDto } from '../../models';
@Injectable()
export class AuthService {
    constructor(
        private readonly jwt: JwtService,
        private userService: UserService
    ) { }

    async signup(dto: UserDto) {

        const userFind = await this.userService.findByPhoneNumber(dto.phone);
        if (userFind) {
            return new BaseErrorResponse(
                STATUSCODE.REGISTED_FAILED_802,
                MESSAGE_ERROR.PHONE_EXISTED
            )
        }

        const user = await this.userService.create(dto);
        const access_token = await this.jwt.signToken(user.phone, user.fullname);
        return new BaseResponse(
            STATUSCODE.REGISTER_SUCCESS_806,
            access_token,
            MESSAGE.REGISTER_SUCCESS
        );
    }

    async verifyPhoneNumber(verifyDto: VerifyDto) {
        try {
            const user = await this.userService.findByPhoneNumber(verifyDto.phone);

            if (!user) {
                return new BaseResponse(
                    STATUSCODE.PHONE_IS_NEW_801,
                    true,
                    MESSAGE.PHONE_VERIFIED
                );
            }

            if (user.mac.find((m) => m.mac == verifyDto.mac)) {
                return new BaseResponse(
                    STATUSCODE.PHONE_USED_OLD_DEVICE_804,
                    false,
                    MESSAGE.PHONE_USE_OLD_DEVICE
                );
            }

            return new BaseResponse(
                STATUSCODE.PHONE_USED_ANOTHER_DEVICE_803,
                false,
                MESSAGE.PHONE_USE_ANOTHER_DEVICE
            );

        } catch (error) {
            throw new NotFoundException(error);
        }
    }

    async socialNetwork(socialDto: SocialDto) {
        try {
            const user = await this.userService.findByPhoneNumber(socialDto.phone);
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
                const newUser = await this.userService.createUserByGGFb(dataInsert);
                return new BaseResponse(
                    STATUSCODE.REGISTER_SOCIAL_SUCCESS_805,
                    this.jwt.signToken(newUser.phone, newUser.fullname)
                );
            } else {
                return new BaseErrorResponse(
                    STATUSCODE.REGISTED_FAILED_802,
                    MESSAGE_ERROR.PHONE_EXISTED
                );
            }
        } catch (error) {
            throw new NotFoundException(error);
        }
    }

    public async signIn(signIn: SignInDto) {
        const user = await this.userService.findByPhoneNumber(signIn.phone);

        if (user) {
            const userByMac = user.mac.find(item => item.mac === signIn.mac);
            if (userByMac) {
                return new BaseResponse(
                    STATUSCODE.PHONE_USED_OLD_DEVICE_804,
                    this.jwt.signToken(user.phone, user.fullname),
                    MESSAGE.PHONE_USE_OLD_DEVICE
                );
            } else {
                const macs = [...user.mac, { mac: signIn.mac }]
                await this.userService.updateSomeFieldWithId(user.id, { mac: macs });
                return new BaseResponse(
                    STATUSCODE.PHONE_USED_ANOTHER_DEVICE_803,
                    this.jwt.signToken(user.phone, user.fullname),
                    MESSAGE.PHONE_USE_ANOTHER_DEVICE
                );
            }

        } else {
            return new BaseErrorResponse(
                STATUSCODE.NOTFOUND_PHONE_OR_MAC_810,
                MESSAGE_ERROR.USER_NOT_FOUND
            );
        }
    }
}
