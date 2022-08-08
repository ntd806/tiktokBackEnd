import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { LikeDto } from './dto/like.dto';
import { User } from './model/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaginationQueryDto } from './dto/pagination.query.dto';
import { ConfigSearch } from '../search/config/config.search';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { productIndex } from '../search/constant/product.elastic';
import { SearchProductDto } from '../search/dto';
@Injectable()
export class VideoService extends ElasticsearchService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>
    ) {
        super(ConfigSearch.searchConfig(process.env.ELASTIC_SEARCH_URL));
    }

    async likeVideo(user: User, likeDto: LikeDto) {
        let likeUpdate = [];
        if (typeof user.like == 'undefined') {
            likeUpdate = [{ url: likeDto.url, isLive: likeDto.isLive }];
        } else {
            likeUpdate = user.like;
            const index = likeUpdate.find(
                ({ url }) => url === likeDto.url
            );
            if (index) {
                return {
                    code: 90002,
                    data: true,
                    message: 'You have liked this video already'
                };
            } else {
                likeUpdate.push({ url: likeDto.url, isLive: likeDto.isLive });
            }
        }
        console.log(likeUpdate);
        await this.userModel.findOneAndUpdate(
            { _id: user._id },
            {
                like: likeUpdate
            }
        );
        return {
            code: 90001,
            data: true,
            message: 'Like video successfully'
        };
    }

    async unlikeVideo(user: User, likeDto: LikeDto) {
        let likeUpdate = [];
        if (typeof user.like == 'undefined') {
            return {
                code: 90007,
                data: true,
                message: 'Does not exist video to unlike'
            };
        } else {
            likeUpdate = user.like;
            const index = likeUpdate.find(
                ({ url }) => url === likeDto.url
            );
            if (index) {
                likeUpdate = likeUpdate.splice(index, 1);
            } else {
                return {
                    code: 90004,
                    data: true,
                    message: 'You have unliked this video already'
                };
            }
        }
        await this.userModel.findOneAndUpdate(
            { _id: user._id },
            {
                like: likeUpdate
            }
        );
        await user.save();
        return {
            code: 90003,
            data: true,
            message: 'Unlike video successfully'
        };
    }

    async getListVideoLiked(user: User, paginationQuery: PaginationQueryDto) {
        try {
            const { limit, offset } = paginationQuery;
            console.log(paginationQuery);
            return {
                code: 90005,
                data: user.like.slice((offset-1)*limit, offset*limit),
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

        if (video[0]._source.lenght < 1) {
            return {
                code: 90008,
                data: [],
                message: 'Not found data'
            }
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
        const video = await this.getVideoByTag(searchProductDto);

        return {
            code: 90009,
            data: video,
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
        return await this.search({
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
        })
            .then((res) => res.hits.hits)
            .catch((err) => {
                throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
            });
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
}
