import { Injectable } from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Banner } from './entities/banner.entity';

@Injectable()
export class BannerService {
    constructor(
        @InjectModel(Banner.name)
        private readonly model: Model<Banner>
    ) {}

    create(createBannerDto: CreateBannerDto) {
        return this.model.create({ ...createBannerDto });
    }

    async findAll() {
        return this.model.find();
    }

    findOne(id: string) {
        return this.model.findById(id).exec();
    }

    update(id: string, updateBannerDto: UpdateBannerDto) {
        return this.model.findByIdAndUpdate(id, { ...updateBannerDto });
    }

    remove(id: string) {
        return this.model.findByIdAndDelete({ _id: id });
    }
}
