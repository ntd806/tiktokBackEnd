import {
    Injectable,
    HttpException,
    HttpStatus,
    BadRequestException
} from '@nestjs/common';
import { ReactionDto } from './dto/reaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PaginationQueryDto } from './dto/pagination.query.dto';
import { ConfigSearch } from '../search/config/config.search';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { productIndex } from '../search/constant/product.elastic';
import { SearchProductDto } from '../search/dto';
import { VideoPaginateDto } from './dto';
import { BaseErrorResponse, BaseResponse } from 'src/common';
import { MESSAGE, STATUSCODE } from 'src/constants';
import { Reaction } from './model/reaction.schema';
import { Video } from './model/video.schema';
import * as moment from 'moment';
import { Bookmark } from './model/bookmark.schema';
@Injectable()
export class VideoService extends ElasticsearchService {
    constructor(
        @InjectModel(Reaction.name)
        private readonly reactionModel: Model<Reaction>,
        @InjectModel(Video.name)
        private readonly videoModel: Model<Video>,
        @InjectModel(Bookmark.name)
        private readonly bookmarkModel: Model<Bookmark>
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

    async getImageURL(videoId: string) {
        let imageURL = null;
        const isValidObjectId = Types.ObjectId.isValid(videoId);
        let videoFinder = null;
        if (isValidObjectId) {
            videoFinder = await this.videoModel.findById(videoId);
        }
        if (videoFinder) {
            imageURL = videoFinder.previewImage;
        } else {
            const document = await this.search({
                index: productIndex._index,
                query: {
                    terms: {
                        _id: [videoId]
                    }
                }
            });
            const videos = document.hits.hits;
            if (videos.length > 0) {
                imageURL = (videos[0]._source as any).previewImage;
            }
        }
        return imageURL;
    }

    async updateManyReactionByVideoId<T>(
        videoId: string,
        reaction: T
    ): Promise<any> {
        return await this.reactionModel.updateMany(
            { videoId },
            { $set: reaction },
            { multi: true }
        );
    }

    async deleteBookmark(bookmarkId: string) {
        return await this.bookmarkModel.findByIdAndDelete(bookmarkId);
    }

    async createBookmark<T>(bookmark: T) {
        return await this.bookmarkModel.create(bookmark);
    }

    async reactionVideo(userId: string, reactionDto: ReactionDto) {
        const reaction = {
            ...reactionDto,
            userId,
            reactionDate: moment().toISOString(),
            isLiked: true
        };
        try {
            const reactionFind = await this.reactionModel.findOne({
                userId,
                videoId: reaction.videoId
            });
            if (reactionFind) {
                const previewImage = await this.getImageURL(reaction.videoId);
                const response = await this.updateReaction(reactionFind._id, {
                    isLiked: reactionFind.isLiked ? false : true,
                    previewImage
                });
                await this.updateManyReactionByVideoId(reaction.videoId, {
                    previewImage
                });
                return new BaseResponse(
                    reactionFind.isLiked
                        ? STATUSCODE.VIDEO_UNLIKE_SUCCESS_903
                        : STATUSCODE.VIDEO_LIKE_SUCCESS_901,
                    response,
                    reactionFind.isLiked ? 'Unliked video' : 'Liked this video'
                );
            } else {
                const previewImage = await this.getImageURL(reaction.videoId);
                const response = await this.createReaction({
                    ...reaction,
                    previewImage
                });
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

    async bookmarkVideo(userId: string, bookmarkDto: ReactionDto) {
        const bookmark = {
            ...bookmarkDto,
            userId,
            bookmarkDate: moment().toISOString()
        };
        try {
            const bookmarkFind = await this.bookmarkModel.findOne({
                userId,
                videoId: bookmark.videoId
            });
            if (bookmarkFind) {
                await this.deleteBookmark(bookmarkFind._id);
                return new BaseResponse(
                    STATUSCODE.VIDEO_UNBOOKMARK_911,
                    null,
                    'Unbookmark video'
                );
            } else {
                const previewImage = await this.getImageURL(bookmark.videoId);
                const response = await this.createBookmark({
                    ...bookmark,
                    previewImage
                });
                return new BaseResponse(
                    STATUSCODE.VIDEO_BOOKMARK_SUCCESS_910,
                    response,
                    'Bookmark this video'
                );
            }
        } catch (e) {
            throw new BadRequestException(e);
        }
    }

    async getVideoBookmarks(userId: string, pagination: PaginationQueryDto) {
        try {
            const { limit, offset } = pagination;
            const videos = await this.bookmarkModel
                .find({ userId })
                .skip(offset)
                .limit(limit);

            return new BaseResponse(
                STATUSCODE.VIDEO_LIST_SUCCESS_905,
                videos,
                'Get list video successfully'
            );
        } catch (err) {
            return new BaseErrorResponse(
                STATUSCODE.VIDEO_LIST_FAIL_906,
                'Get list video failed',
                null
            );
        }
    }

    async getListVideoLiked(
        userId: string,
        paginationQuery: PaginationQueryDto
    ) {
        try {
            const { limit, offset } = paginationQuery;
            const videos = await this.reactionModel
                .find({ userId, isLiked: true })
                .skip(offset)
                .limit(limit);

            return new BaseResponse(
                STATUSCODE.VIDEO_LIST_SUCCESS_905,
                videos,
                'Get list video successfully'
            );
        } catch (err) {
            return new BaseErrorResponse(
                STATUSCODE.VIDEO_LIST_FAIL_906,
                'Get list video failed',
                null
            );
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

    getTotalLike(key: string, object: any) {
        return object[key]?.total_like || 0;
    }

    getBoolean(key: string, object: any) {
        return object[key]?.isLiked || false;
    }

    getBooleanLive(key: string, object: any) {
        return object[key]?.isLive || false;
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
                    },
                    reaction: {
                        $push: {
                            k: 'isLiked',
                            v: '$$ROOT.isLiked'
                        }
                    },
                    type: {
                        $push: {
                            k: 'isLive',
                            v: '$$ROOT.isLive'
                        }
                    }
                }
            },
            {
                $project: {
                    _id: '$_id',
                    reaction: {
                        $arrayToObject: '$reaction'
                    },
                    type: {
                        $arrayToObject: '$type'
                    },
                    total_like: '$total_like'
                }
            },
            {
                $group: {
                    _id: null,
                    root: {
                        $push: {
                            k: '$_id',
                            v: {
                                total_like: '$total_like',
                                isLiked: '$reaction.isLiked',
                                isLive: '$type.isLive'
                            }
                        }
                    }
                }
            },
            {
                $replaceRoot: { newRoot: { $arrayToObject: '$root' } }
            }
        ]);

        let result = {};

        if (aggregate.length > 0) {
            result = aggregate[0];
        }

        const maps = videos.map((video) => ({
            ...video,
            _source: {
                ...video._source,
                total_like: this.getTotalLike(
                    video._source.videoId || video._id,
                    result
                ),
                isLiked: this.getBoolean(
                    video._source.videoId || video._id,
                    result
                ),
                isLive: this.getBooleanLive(
                    video._source.videoId || video._id,
                    result
                )
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
}
