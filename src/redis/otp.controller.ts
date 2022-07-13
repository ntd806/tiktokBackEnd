import { Controller, Post, Req, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OtpService } from './otp.service';
@ApiTags('authencation')
@Controller('/api/v1/auth')
export class OtpController {
    constructor(private readonly otpService: OtpService) {}
    @Post('/send-code')
    async sendCode(@Req() request) {
        const data = await this.otpService.sendSMS(request.body.phoneNumber);

        return {
            code: 200,
            data: data,
            message: 'Successfully'
        };
    }

    @HttpCode(200)
    @Post('/verify-code')
    async verifyCode(@Req() request) {
        const data = await this.otpService.verifyCode(
            request.body.recipientPhoneNumber,
            request.body.smsCode
        );

        return {
            code: 200,
            data: data,
            message: 'Successfully'
        };
    }
}
