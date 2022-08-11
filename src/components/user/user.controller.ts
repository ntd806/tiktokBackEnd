import {
    Body,
    Controller,
    Post,
    Get,
    Request,
    UseGuards,
    Delete
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { JwtStrategy } from '../auth/strategy';
import { JwtGuard } from '../auth/guard';
import {
    ApiTags,
    ApiResponse,
    ApiOperation,
    ApiBearerAuth
} from '@nestjs/swagger';
@UseGuards(JwtStrategy)
@ApiBearerAuth('Authorization')
@ApiTags('user')
@Controller('/api/v1/user')
export class UserController {
    constructor(private userService: UserService) {}

    @ApiOperation({
        summary: 'Get info user'
    })
    @ApiResponse({
        status: 40007,
        description: 'Get successfully'
    })
    @UseGuards(JwtGuard)
    @Get('info')
    async info(@Request() req) {
        return {
            code: 40007,
            data: req.user,
            message: 'Get successfully'
        };
    }

    @ApiOperation({
        summary: 'Update user'
    })
    @ApiResponse({
        status: 40002,
        description: 'Update successfully'
    })
    @UseGuards(JwtGuard)
    @Post('update')
    async updateUser(@Request() req, @Body() dto: UserDto) {
        return await this.userService.updateUser(req.user, dto);
    }
}
