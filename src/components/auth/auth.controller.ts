import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, VerifyDto, SocialDto } from './dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
@ApiTags('auth')
@Controller('/api/v1/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({
        summary: 'Register user'
    })
    @ApiResponse({
        status: 201,
        description: `ok`
    })
    @ApiResponse({
        status: 400,
        description: `phone exists`
    })
    @Post('register')
    async signup(@Body() dto: AuthDto) {
        return await this.authService.signup(dto);
    }

    @ApiOperation({
        summary: 'Verify phone number'
    })
    @ApiResponse({
        status: 70001,
        description: 'Verify phone number successfully'
    })
    @ApiResponse({
        status: 70003,
        description: 'the another device'
    })
    @ApiResponse({
        status: 70003,
        description: 'The old device'
    })
    @Post('verify-phone-number')
    async verifyPhoneNumber(@Body() verifyDto: VerifyDto) {
        return await this.authService.verifyPhoneNumber(verifyDto);
    }

    @ApiOperation({
        summary: 'Verify phone number'
    })
    @ApiResponse({
        status: 70001,
        description: 'Verify phone number successfully'
    })
    @ApiResponse({
        status: 70003,
        description: 'the another device'
    })
    @ApiResponse({
        status: 70003,
        description: 'The old device'
    })
    @Post('verify-social-network')
    async socialNetwork(@Body() socialDto: SocialDto) {
        return await this.authService.socialNetwork(socialDto);
    }
}
