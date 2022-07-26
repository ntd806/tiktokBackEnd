import {
    Body,
    Controller,
    Post,
    Get,
    Request,
    UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { LikeDto } from './dto/like.dto';
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
        status: 200,
        description: 'Get successfully'
    })
    @UseGuards(JwtGuard)
    @Get('info')
    async info(@Request() req) {
        return {
            code: 200,
            data: req.user,
            message: 'Get successfully'
        };
    }

    @ApiOperation({
        summary: 'Update user'
    })
    @ApiResponse({
        status: 200,
        description: 'Update successfully'
    })
    @UseGuards(JwtGuard)
    @Post('update')
    async updateUser(@Request() req, @Body() dto: UserDto) {
        const data = await this.userService.updateUser(req.user, dto);
        return {
            code: 200,
            data: data,
            message: 'Update successfully'
        };
    }

    @ApiOperation({
        summary: 'Like video'
    })
    @ApiResponse({
        status: 200,
        description: 'Like video successfully'
    })
    @ApiResponse({
        status: 400,
        description: 'Like video false'
    })
    @UseGuards(JwtGuard)
    @Post('like-video')
    async likeVideo(@Request() req, @Body() dto: LikeDto) {
        const data = await this.userService.likeVideo(req.user, dto.video_id);
        if (data) {
            return {
                code: 200,
                message: 'Like video successfully'
            };
        } else {
            return {
                code: 400,
                message: 'Like video false'
            };
        }
    }

    @ApiOperation({
        summary: 'Unlike video'
    })
    @ApiResponse({
        status: 200,
        description: 'Unlike video successfully'
    })
    @ApiResponse({
        status: 400,
        description: 'Unlike video false'
    })
    @UseGuards(JwtGuard)
    @Post('unlike-video')
    async unlikeVideo(@Request() req, @Body() dto: LikeDto) {
        const data = await this.userService.unlikeVideo(req.user, dto.video_id);
        if (data) {
            return {
                code: 200,
                message: 'Unlike video successfully'
            };
        } else {
            return {
                code: 400,
                message: 'Unlike video false'
            };
        }
    }
}
