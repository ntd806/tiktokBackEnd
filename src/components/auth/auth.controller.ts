import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { StatusCode } from 'src/vender/core/Status/status.code';
import { VerifyDto } from '../user/dto/verify.dto';

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
}
