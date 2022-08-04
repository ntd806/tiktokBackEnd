import {
    Body,
    Controller,
    Post,
    Get,
    Request,
    UseGuards,
    Query
} from '@nestjs/common';
import { VideoService } from './video.service';
import { LikeDto } from './dto/like.dto';
import { JwtGuard } from '../auth/guard';
import { PaginationQueryDto } from './dto/pagination.query.dto';
import {
    ApiTags,
    ApiResponse,
    ApiOperation,
    ApiBearerAuth,
    ApiQuery
} from '@nestjs/swagger';
@ApiBearerAuth('Authorization')
@ApiTags('video')
@UseGuards(JwtGuard)
@Controller('/api/v1/video')
export class VideoController {
    constructor(private videoService: VideoService) {}

    @ApiOperation({
        summary: 'Like video'
    })
    @ApiResponse({
        status: 90001,
        description: 'Like video successfully'
    })
    @ApiResponse({
        status: 90002,
        description: 'Like video false'
    })
    @Post('like')
    async likeVideo(@Request() req, @Body() likeDto: LikeDto) {
        return await this.videoService.likeVideo(req.user, likeDto);
    }

    @ApiOperation({
        summary: 'Unlike video'
    })
    @ApiResponse({
        status: 9003,
        description: 'Unlike video successfully'
    })
    @ApiResponse({
        status: 9004,
        description: 'Unlike video false'
    })
    @Post('unlike')
    async unlikeVideo(@Request() req, @Body() likeDto: LikeDto) {
        return await this.videoService.unlikeVideo(req.user, likeDto);
    }

    @ApiOperation({
        summary: 'Get list video liked'
    })
    @ApiResponse({
        status: 90005,
        description: 'Get list video liked successfully'
    })
    @ApiResponse({
        status: 90006,
        description: 'Get list video liked failed'
    })
    @ApiQuery({
        name: 'limit',
        type: 'number',
        description: 'enter limit of record',
        required: true
    })
    @ApiQuery({
        name: 'offset',
        type: 'number',
        description: 'enter offset of record',
        required: true
    })
    @Get('video-liked')
    async getListVideo(@Request() req, @Query() paginationQuery: PaginationQueryDto) {
        return await this.videoService.getListVideoLiked(req.user, paginationQuery);
    }
}