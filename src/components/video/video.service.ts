import {
    Injectable,
    HttpException,
    HttpStatus,
    InternalServerErrorException,
    BadRequestException
} from '@nestjs/common';
import { ReactionDto } from './dto/reaction.dto';
import { User } from './model/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from './dto/pagination.query.dto';
import { ConfigSearch } from '../search/config/config.search';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { productIndex } from '../search/constant/product.elastic';
import { SearchProductDto } from '../search/dto';
import { VideoPaginateDto } from './dto';
import { BaseErrorResponse, BaseResponse } from 'src/common';
import { MESSAGE, MESSAGE_ERROR, STATUSCODE } from 'src/constants';
import { Reaction } from './model/reaction.schema';
import { Video } from './model/video.schema';
import * as moment from 'moment';
@Injectable()
export class VideoService extends ElasticsearchService {
    constructor(
        @InjectModel(Reaction.name)
        private readonly reactionModel: Model<Reaction>,
        @InjectModel(Video.name)
        private readonly videoModel: Model<Video>
    ) {
        super(ConfigSearch.searchConfig(process.env.ELASTIC_SEARCH_URL));
    }

    async updateReaction<T>(reactionId: string, reaction: T) {
        return await this.reactionModel.findByIdAndUpdate(
            { _id: reactionId },
            { $set: reaction },
            { new: true }
        );
    }

    async createReaction<T>(reaction: T) {
        return await this.reactionModel.create(reaction);
    }

    async reactionVideo(userId: string, reactionDto: ReactionDto) {
        const reaction = {
            ...reactionDto,
            userId,
            reactionDate: moment().toISOString(),
            isLiked: true
        };
        try {
            console.log(reaction);
            const reactionFind = await this.reactionModel.findOne({
                userId,
                videoId: reaction.videoId
            });
            if (reactionFind) {
                await this.updateReaction(reactionFind._id, {
                    isLiked: reactionFind.isLiked ? false : true
                });
                return new BaseResponse(
                    reactionFind.isLiked
                        ? STATUSCODE.VIDEO_UNLIKE_SUCCESS_903
                        : STATUSCODE.VIDEO_LIKE_SUCCESS_901,
                    null,
                    reactionFind.isLiked ? 'Unliked video' : 'Liked this video'
                );
            } else {
                const response = await this.createReaction(reaction);
                return new BaseResponse(
                    STATUSCODE.VIDEO_LIKE_SUCCESS_901,
                    response,
                    'Liked this video'
                );
            }
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    async getListVideoLiked(user: User, paginationQuery: PaginationQueryDto) {
        try {
            const { limit, offset } = paginationQuery;
            console.log(paginationQuery);
            return {
                code: 90005,
                data: user.like.slice((offset - 1) * limit, offset * limit),
                message: 'Get list video successfully'
            };
        } catch (err) {
            return {
                code: 90006,
                data: false,
                message: 'Get list video failed'
            };
        }
    }

    public async getRelativeVideo(
        searchProductDto: SearchProductDto
    ): Promise<any> {
        const video = await this.getVideoByUrl(searchProductDto);

        if (video[0]._source.length < 1) {
            return {
                code: 90008,
                data: [],
                message: 'Not found data'
            };
        }

        let tag = '';
        for (const v in video[0]._source) {
            if (v === 'tag') {
                tag = video[0]._source[v];
                break;
            }
        }
        const list = await this.getTag(searchProductDto, tag);

        return {
            code: 90009,
            data: list,
            message: 'Get relative video successfully'
        };
    }

    public async getRelativeVideoByTag(
        searchProductDto: SearchProductDto
    ): Promise<any> {
        const videos = await this.getVideoByTag(searchProductDto);

        const aggregate = await this.reactionModel.aggregate([
            {
                $group: {
                    _id: '$videoId',
                    total_like: {
                        $sum: { $cond: [{ $eq: ['$isLiked', true] }, 1, 0] }
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    root: { $push: { k: '$_id', v: '$total_like' } }
                }
            },
            {
                $replaceRoot: { newRoot: { $arrayToObject: '$root' } }
            }
        ]);

        const result = aggregate[0];

        const maps = videos.map((video) => ({
            ...video,
            _source: {
                ...video._source,
                total_like: video._source.videoId
                    ? result[video._source.videoId]
                    : 0
            }
        }));

        return {
            code: 90009,
            data: maps,
            message: 'Get relative video by tag successfully'
        };
    }

    private async getVideoByUrl(
        searchProductDto: SearchProductDto
    ): Promise<any> {
        return await this.search({
            index: productIndex._index,
            body: {
                size: 1,
                from: 0,
                query: {
                    multi_match: {
                        query: searchProductDto.search,
                        fields: ['url']
                    }
                }
            }
        })
            .then((res) => res.hits.hits)
            .catch((err) => {
                throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
            });
    }

    private async getVideoByTag(
        searchProductDto: SearchProductDto
    ): Promise<any> {
        try {
            const response = await this.search({
                index: productIndex._index,
                body: {
                    size: searchProductDto.limit,
                    from: searchProductDto.offset,
                    query: {
                        multi_match: {
                            query: searchProductDto.search,
                            fields: ['tag']
                        }
                    }
                }
            });
            return response.hits.hits;
        } catch (err) {
            console.log(err, 'errror');
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private async getTag(
        searchProductDto: SearchProductDto,
        tag: string
    ): Promise<any> {
        return await this.search({
            index: productIndex._index,
            body: {
                size: searchProductDto.limit,
                from: searchProductDto.offset,
                query: {
                    multi_match: {
                        query: tag,
                        fields: ['name', 'description', 'preview', 'tag']
                    }
                }
            }
        })
            .then((res) => res.hits.hits)
            .catch((err) => {
                throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
            });
    }

    async getVideos(videoPaginate: VideoPaginateDto) {
        try {
            const videos = await this.search({
                index: productIndex._index,
                body: {
                    size: videoPaginate.limit,
                    from: videoPaginate.offset,
                    query: {
                        match_all: {}
                    }
                }
            });

            return new BaseResponse(
                STATUSCODE.LISTED_SUCCESS_9010,
                {
                    videos: videos.hits.hits,
                    total: videos.hits.total
                },
                MESSAGE.LIST_SUCCESS
            );
        } catch (err) {
            throw new BaseErrorResponse(
                STATUSCODE.LISTED_FAIL_9011,
                MESSAGE.LIST_FAILED,
                err
            );
        }
    }

    async getHotTrend(searchProductDto: SearchProductDto, hot: string) {
        try {
            const videos = await this.search({
                index: productIndex._index,
                body: {
                    size: searchProductDto.limit,
                    from: searchProductDto.offset,
                    query: {
                        multi_match: {
                            query: hot,
                            fields: ['name', 'description', 'preview', 'tag']
                        }
                    }
                }
            });

            return new BaseResponse(
                STATUSCODE.LISTED_SUCCESS_9010,
                {
                    videos: videos.hits.hits,
                    total: videos.hits.total
                },
                MESSAGE.LIST_SUCCESS
            );
        } catch (err) {
            throw new BaseErrorResponse(
                STATUSCODE.LISTED_FAIL_9011,
                MESSAGE.LIST_FAILED,
                err
            );
        }
    }
}
