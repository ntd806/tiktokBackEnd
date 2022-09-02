import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateHotDto } from './dto';
import { Hot } from './model/hot.schema';
import { IHot } from './interfaces/hot.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class HotService {
    constructor(
        @InjectModel(Hot.name)
        private readonly hotModel: Model<Hot>
    ) {}

    public async create(createHotDto: CreateHotDto): Promise<IHot> {
        try {
            const trend = await this.hotModel.create(createHotDto);
            return trend;
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async getHotTrend() {
        try {
            const trend = await this.hotModel
                .find()
                .select('trend')
                .limit(1)
                .skip(0)
                .sort({
                    createdAt: 'desc'
                })
                .exec();

            return trend;
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
