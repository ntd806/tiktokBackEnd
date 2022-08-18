import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards
} from '@nestjs/common';
import { BannerService } from './banner.service';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard';

@ApiBearerAuth('Authorization')
@ApiTags('banner')
@UseGuards(JwtGuard)
@Controller('/api/v1/banner')
export class BannerController {
    constructor(private readonly bannerService: BannerService) {}

    @Post()
    create(@Body() createBannerDto: CreateBannerDto) {
        return this.bannerService.create(createBannerDto);
    }

    @Get()
    async findAll() {
        return await this.bannerService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.bannerService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBannerDto: UpdateBannerDto) {
        return this.bannerService.update(id, updateBannerDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.bannerService.remove(id);
    }
}
