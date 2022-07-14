import { Controller, Post, Req, HttpCode } from '@nestjs/common';
import { OtpService } from './otp.service';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('/api/v1/auth')
export class OtpController {
    constructor(private readonly otpService: OtpService) {}

    @ApiOperation({
        summary: 'Send otp to SMS'
    })
    @Post('/send-code')
    async sendCode(@Req() request) {
        const data = await this.otpService.sendSMS(request.body.phoneNumber);

        return {
            code: 200,
            data: data,
            message: 'Successfully'
        };
    }

    @ApiOperation({
        summary: 'Verify SMS'
    })
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
