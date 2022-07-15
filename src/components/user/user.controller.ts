import {
    Body,
    Controller,
    Post,
    Get,
    Request,
    UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from '../auth/decorator';
import { UserDto } from './dto/user.dto';
import { JwtStrategy } from '../auth/strategy';
import { JwtGuard } from '../auth/guard';
import { ApiTags } from '@nestjs/swagger';
@UseGuards(JwtStrategy)
@ApiTags('user')
@Controller('/api/v1/user')
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(JwtGuard)
    @Get('info')
    async info(
        @Request() req
    ) {
        return {
            code: 200,
            data: req.user,
            message: 'update successfully'
        };
    }

    @UseGuards(JwtGuard)
    @Post('update')
    async updateUser(
        @Request() req,
        @Body() dto: UserDto
    ) {
        const data = await this.userService.updateUser(req.user, dto);
        return {
            code: 200,
            data: data,
            message: 'update successfully'
        };
    }
}
