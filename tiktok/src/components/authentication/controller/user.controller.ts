import LocalAuthenticationGuard from '../auth.guard';
import CreateUserDto from '../dto/user.dto';
import AuthenticationService from '../services/authentication.service';
import {
    Controller,
    Get,
    Post,
    Req,
    Body,
    HttpCode,
    UseGuards
} from '@nestjs/common';

@Controller('/api/v1/auth')
export class UserController {
    constructor(
        private readonly authenticationService: AuthenticationService
    ) {}
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
