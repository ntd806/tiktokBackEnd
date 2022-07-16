import {
    Body,
    Controller,
    Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { ApiTags, ApiResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';



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
                message: 'phone exists'
            };
        }
    }
}
