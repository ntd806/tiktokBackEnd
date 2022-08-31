import { MaxLength, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateTrendDto {
    @ApiProperty()
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    readonly nameTrend: string;

    @ApiProperty()
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    readonly tag: string;
}
