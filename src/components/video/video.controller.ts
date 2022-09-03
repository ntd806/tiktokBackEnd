import {
    Body,
    Controller,
    Post,
    Get,
    Request,
    UseGuards,
    Query,
    UseInterceptors,
    UploadedFile
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoService } from './video.service';
import { ReactionDto } from './dto/reaction.dto';
import { JwtGuard } from '../auth/guard';
import { PaginationQueryDto } from './dto/pagination.query.dto';
import {
    ApiTags,
    ApiResponse,
    ApiOperation,
    ApiBearerAuth,
    ApiQuery,
    ApiBody
} from '@nestjs/swagger';
import { SearchProductDto } from '../search/dto';
import { VideoPaginateDto } from './dto';
import { STATUSCODE } from 'src/constants';
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
        status: STATUSCODE.VIDEO_LIKE_SUCCESS_901,
        description: 'Like video successfully'
    })
    @ApiResponse({
        status: STATUSCODE.VIDEO_UNLIKE_SUCCESS_903,
        description: 'Unlike video successfully'
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                url: {
                    type: 'string',
                    description: 'url of video'
                },
                isLive: {
                    type: 'boolean'
                },
                id: {
                    type: 'string',
                    description: 'mongo video _id (ignore if is live stream)'
                },
                streamKey: {
                    type: 'string',
                    description: 'streamKey live stream'
                }
            }
        }
    })
    @Post('reaction')
    async reactionVideo(@Request() req, @Body() reactionDto: ReactionDto) {
        return await this.videoService.reactionVideo(req.user.id, reactionDto);
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
    async getListVideo(
        @Request() req,
        @Query() paginationQuery: PaginationQueryDto
    ) {
        return await this.videoService.getListVideoLiked(
            req.user,
            paginationQuery
        );
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
    @Get('get-relative-video')
    async getRelativeVideo(@Query() searchProductDto: SearchProductDto) {
        return await this.videoService.getRelativeVideo(searchProductDto);
    }

    @ApiOperation({
        summary: 'Get list video liked'
    })
    @ApiResponse({
        status: 90007,
        description: 'Get list video liked by tag successfully'
    })
    @ApiResponse({
        status: 90008,
        description: 'Get list video liked by tag failed'
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
    @Get('get-relative-video-by-tag')
    async getRelativeVideoByTag(@Query() searchProductDto: SearchProductDto) {
        return await this.videoService.getRelativeVideoByTag(searchProductDto);
    }

    @ApiOperation({
        summary: 'Get list video'
    })
    @ApiResponse({
        status: STATUSCODE.LISTED_SUCCESS_9010,
        description: 'Get list video successfully'
    })
    @ApiResponse({
        status: STATUSCODE.LISTED_FAIL_9011,
        description: 'Get list video failed'
    })
    @ApiQuery({
        name: 'search',
        type: 'string',
        description: 'filter',
        required: false
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
    @Get('get-videos')
    async getVideos(@Query() paginate: VideoPaginateDto) {
        return await this.videoService.getVideos(paginate);
    }

    @ApiOperation({
        summary: 'Get hot trend'
    })
    @ApiResponse({
        status: STATUSCODE.LISTED_SUCCESS_9010,
        description: 'Get list video successfully'
    })
    @ApiResponse({
        status: STATUSCODE.LISTED_FAIL_9011,
        description: 'Get list video failed'
    })
    @ApiQuery({
        name: 'search',
        type: 'string',
        description: 'filter',
        required: false
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
    @Get('get-hot-trend')
    async getHotTrend(searchProductDto: SearchProductDto, hot: string) {
        return await this.videoService.getHotTrend(searchProductDto, hot);
    }
}
