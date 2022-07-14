import {
    Body,
    Controller,
    Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('/api/v1/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({
        summary: 'Register user'
    })
    @ApiOkResponse({ description: 
    `{
        code: 201,
        data: {
            "access_token": "xxx"
        },
        message: 'ok'
    }` 
    })
    @Post('register')
    async signup(@Body() dto: AuthDto) {
        const data = await this.authService.signup(dto);
        if (data) {
            return {
                code: 201,
                data: data,
                message: 'ok'
            };
        } else {
            return {
                code: 400,
                data: data,
                message: 'phone exists'
            };
        }
    }
}
