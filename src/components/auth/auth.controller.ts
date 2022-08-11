import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, VerifyDto, SocialDto, Reinstall } from './dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
@ApiTags('auth')
@Controller('/api/v1/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({
        summary: 'Register user'
    })
    @ApiResponse({
        status: 40001,
        description: `Create a user successfully`
    })
    @ApiResponse({
        status: 80006,
        description: `Register success`
    })
    @ApiResponse({
        status: 80002,
        description: `Register failed`
    })
    @Post('register')
    async signup(@Body() dto: AuthDto) {
        return await this.authService.signup(dto);
    }

    @ApiOperation({
        summary: 'Verify phone number'
    })
    @ApiResponse({
        status: 80001,
        description: 'Verify phone number successfully'
    })
    @ApiResponse({
        status: 80003,
        description: 'the another device'
    })
    @ApiResponse({
        status: 80004,
        description: 'The old device'
    })
    @Post('verify-phone-number')
    async verifyPhoneNumber(@Body() verifyDto: VerifyDto) {
        return await this.authService.verifyPhoneNumber(verifyDto);
    }

    @ApiOperation({
        summary: 'Register social network'
    })
    @ApiResponse({
        status: 80005,
        description: 'Registered by social successfully'
    })
    @ApiResponse({
        status: 80003,
        description: 'the another device'
    })
    @ApiResponse({
        status: 80006,
        description: 'The old device'
    })
    @ApiResponse({
        status: 80007,
        description: 'The new device'
    })
    @Post('social-network')
    async socialNetwork(@Body() socialDto: SocialDto) {
        return await this.authService.socialNetwork(socialDto);
    }

    @ApiOperation({
        summary: 'Reinstall application'
    })
    @ApiResponse({
        status: 80010,
        description: 'Not found phone number or MAC address of device'
    })
    @ApiResponse({
        status: 80011,
        description: 'Reinstall successfully'
    })
    @Post('reinstall')
    async reinstall(@Body() reinstall: Reinstall) {
        return await this.authService.reinstall(reinstall);
    }
}
