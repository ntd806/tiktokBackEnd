import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBannerDto } from './create-banner.dto';
import {
    IsBoolean,
    IsString
} from 'class-validator';

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

    // @ApiProperty()
    // metadata?: MetadataDTO;

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

interface MetadataDTO {
    description: string;
    title: string;
}
