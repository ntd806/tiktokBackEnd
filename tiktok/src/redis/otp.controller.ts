import { Controller, Post, Req, HttpCode } from '@nestjs/common';
import { OtpService } from './otp.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
@Controller('/api/v1/auth')
@ApiTags('/api/v1/auth')
export class OtpController {
    constructor(private readonly otpService: OtpService) {}
    @Post('/send-code')
    async sendCode(@Req() request) {
        const data = await this.otpService.sendSMS(request.body.phoneNumber);

        return {
            code:200,
            data:data,
            message: "Successfully"
        }
    }

    @HttpCode(200)
    @Post('/verify-code')
    async verifyCode(@Req() request) {
        const data = await this.otpService.verifyCode(
            request.body.recipientPhoneNumber,
            request.body.smsCode
        );

        return {
            code:200,
            data:data,
            message: "Successfully"
        }
    }
}
