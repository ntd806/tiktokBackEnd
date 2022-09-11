import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Comment, CommentDocument } from "src/entities";
import { Paging } from "src/interfaces";
import { BaseRepository } from "./base.repository";

@Injectable()
export class CommentRepository extends BaseRepository<CommentDocument> {
    constructor(
        @InjectModel(Comment.name)
        commentModel: Model<CommentDocument>
    ) {
        super(commentModel);
    }

    async getComments(videoId: string, paging: Paging) {
        try {
            return await this.model.find({ videoId}).populate('author', {
                _id: 1, fullname: 1,  metadata: 1
            }).skip(paging.offset).limit(paging.limit);
        } catch (err) {
            throw err
        }
    }

    async countCommentsByVideoId(videoId: string) {
        try {
            const result = await this.model.aggregate([
                {
                    $match: {
                        videoId
                    }
                },
                {
                    $group: {
                        _id: "$videoId", root_count: { $sum: 1 },
                    }
                },
                {
                    $lookup: {
                        from: 'replies',
                        let: {
                            id: '$_id'
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: [
                                            "$videoId",
                                            "$$id"
                                        ]
                                    }
                                }
                            },
                            {
                                $group: {
                                    _id: '$videoId',
                                    total_reply: {
                                        $sum: 1
                                    }
                                }
                            },
                        ],
                        as: 'reply'
                    }
                },
                { $unwind: '$reply' },
                {
                    $addFields: {
                        total_comment: { $add: ["$reply.total_reply", "$root_count"] }
                    }
                },
                {
                    $group: {
                        _id: null,
                        root: {
                            $push: {
                                k: 'total_comment', v: '$total_comment'
                            }
                        }
                    }
                },
                {
                    $replaceRoot: { newRoot: { $arrayToObject: '$root' } }
                }
            ])

            return result?.[0] || {total_comment: 0}
        } catch (err) {
            throw err
        }
    }

    async countComments() {
        try {
            const result = await this.model.aggregate([
                {
                    $group: {
                        _id: "$videoId", root_count: { $sum: 1 },
                    }
                },
                {
                    $lookup: {
                        from: 'replies',
                        let: {
                            id: '$_id'
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $eq: [
                                            "$videoId",
                                            "$$id"
                                        ]
                                    }
                                }
                            },
                            {
                                $group: {
                                    _id: '$videoId',
                                    total_reply: {
                                        $sum: 1
                                    }
                                }
                            },
                        ],
                        as: 'reply'
                    }
                },
                { $unwind: '$reply' },
                {
                    $addFields: {
                        total_comment: { $add: ["$reply.total_reply", "$root_count"] }
                    }
                },
                {
                    $group: {
                        _id: null,
                        root: {
                            $push: {
                                k: '$_id', v: {
                                    total_comment: '$total_comment'
                                }
                            }
                        }
                    }
                },
                {
                    $replaceRoot: { newRoot: { $arrayToObject: '$root' } }
                }
            ])

            return result?.[0] || {}
        } catch (err) {
            throw err
        }
    }
}