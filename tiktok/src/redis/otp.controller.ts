import { Controller, Post, Req, HttpCode } from '@nestjs/common';
import { OtpService } from './otp.service';

@Controller('/api/v1/auth')
export class OtpController {
    constructor(private readonly otpService: OtpService) {}
    @Post('/send-code')
    async sendCode(@Req() request) {
        return await this.otpService.sendSMS(request.phoneNumber);
    }

    @HttpCode(200)
    @Post('/verify-code')
    async verifyCode(@Req() request) {
        return await this.otpService.verifyCode(
            request.recipientPhoneNumber,
            request.smsCode
        );
    }
}
