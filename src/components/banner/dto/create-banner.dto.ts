import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsDate,
    IsString
} from 'class-validator';
import { BannerMetadata } from '../entities/banner.entity';

export class CreateBannerDto {
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

    @ApiProperty({ required: false})
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
//
// interface MetadataDTO {
//     description?: string;
//     title?: string;
// }
