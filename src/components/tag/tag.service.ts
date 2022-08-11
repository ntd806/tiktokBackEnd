import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { TagDto, TagUpdateDto } from './dto';
import { User } from './model/user.schema';
import { PaginationQueryDto } from './dto/pagination.query.dto';

@Injectable()
export class TagService {
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>
    ) {}

    public async findAll(user: User, paginationQuery: PaginationQueryDto) {
        try {
            const { limit, offset } = paginationQuery;
            return {
                code: 10005,
                data: user.tag.slice((offset - 1) * limit, offset * limit),
                message: 'Get list tag successfully'
            };
        } catch (err) {
            return {
                code: 10006,
                data: false,
                message: 'Get list tag failed'
            };
        }
    }

    public async create(user: User, TagDto: TagDto) {
        let tagCreate = [];
        if (typeof user.tag == 'undefined') {
            tagCreate = [{ name: TagDto.name }];
        } else {
            tagCreate = user.tag;
            const index = tagCreate.find(({ name }) => name === TagDto.name);
            if (index) {
                return {
                    code: 10002,
                    data: true,
                    message: 'Error: Tag not created!'
                };
            } else {
                tagCreate.push({ name: TagDto.name });
            }
        }
        await this.userModel.findOneAndUpdate(
            { _id: user._id },
            {
                tag: tagCreate
            }
        );
        return {
            code: 10001,
            data: true,
            message: 'Create Tag successfully'
        };
    }

    public async update(user: User, TagUpdateDto: TagUpdateDto) {
        if (typeof user.tag == 'undefined') {
            return {
                code: 10004,
                data: false,
                message: 'Update tag failed'
            };
        } else {
            const index = user.tag
                .map(function (e) {
                    return e.name;
                })
                .indexOf(TagUpdateDto.name);
            if (index > -1) {
                user.tag.splice(index, 1);
                user.tag.push({ name: TagUpdateDto.nameUpdate });
                await user.save();
                return {
                    code: 10003,
                    data: false,
                    message: 'Update tag successfully'
                };
            } else {
                return {
                    code: 10004,
                    data: false,
                    message: 'Error: Tag not updated!'
                };
            }
        }
    }

    public async remove(user: User, TagDto: TagDto) {
        if (typeof user.tag == 'undefined') {
            return {
                code: 10007,
                data: false,
                message: 'Delete tag failed'
            };
        } else {
            const index = user.tag
                .map(function (e) {
                    return e.name;
                })
                .indexOf(TagDto.name);
            if (index > -1) {
                user.tag.splice(index, 1);
                await user.save();
                return {
                    code: 10008,
                    data: false,
                    message: 'Delete tag successfully'
                };
            } else {
                return {
                    code: 10007,
                    data: false,
                    message: 'Delete tag false'
                };
            }
        }
    }
}
