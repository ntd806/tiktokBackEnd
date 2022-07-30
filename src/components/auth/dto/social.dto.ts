import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SocialDto {
    @ApiProperty({
        description: 'Phone number of user'
    })
    @IsNotEmpty()
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty({
    description: 'MAC address'
    })
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    mac: string;

    @ApiProperty({
    description: 'token of Google or Facebook'
    })
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    token: string;

    @ApiProperty({
    description: 'Id of Google or Facebook'
    })
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty({
    description: 'fullname of user'
    })
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    fullname: string;

    @ApiProperty({
    description: 'Is Google or not Google'
    })
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    isGoogle: number;
}
