import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NameVideoDto {
    @IsNotEmpty()
    @ApiProperty()
    name: string;
}