import LocalAuthenticationGuard from '../../components/authentication/auth.guard';
import { CreateUserDto } from '../../components/authentication/dto/user.dto';
import AuthenticationService from './authentication.service';
import {
    Controller,
    Get,
    Post,
    Req,
    Body,
    HttpCode,
    UseGuards
} from '@nestjs/common';

@Controller('auth')
export class UserController {
    constructor(
        private readonly authenticationService: AuthenticationService
    ) {}

    @Get('/hehe')
    async hehe() {
        return {
            status: 'ok from company service'
        };
    }

    @Post('/register')
    async register(@Body() registrationData: CreateUserDto) {
        return this.authenticationService.register(registrationData);
    }

    @HttpCode(200)
    @UseGuards(LocalAuthenticationGuard)
    @Post('/login')
    async login(@Req() request) {
        const user = request.user;
        const token = await this.authenticationService.getUserToken(user.id);
        return { ...user, token };
    }
}
