import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBannerDto } from './create-banner.dto';
import {
    IsBoolean,
    IsString,
    ValidateIf
} from 'class-validator';
import { BannerMetadata } from '../entities/banner.entity';

export class UpdateBannerDto extends PartialType(CreateBannerDto) {
    @ApiProperty()
    @IsString()
    status?: string;

    @ApiProperty()
    @IsString()
    imageUrl?: string;

    @ApiProperty()
    @IsString()
    template?: string;

    @ApiProperty()
    @IsBoolean()
    transparent?: boolean;

    @ApiProperty({required: false})
    @ValidateIf((object, value) => value !== null)
    metadata?: BannerMetadata;

    @ApiProperty()
    @IsString()
    title?: string;

    @ApiProperty()
    @IsString()
    campaignId?: string;

    @ApiProperty()
    @IsString()
    startDate?: Date;

    @ApiProperty()
    @IsString()
    endDate?: Date;

    @ApiProperty()
    @IsBoolean()
    hidden?: false;
}
