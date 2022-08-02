import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SocialDto {
    @ApiProperty({
        description: 'email of user'
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
        description: 'Phone of user'
    })
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    phone: string;

    @ApiProperty({
        description: 'Ip of user'
    })
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    ip: string;

    @ApiProperty({
        description: 'url of user'
    })
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    url: string;

    @ApiProperty({
        description: 'Is Google or not Google'
    })
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    isGoogle: number;
}
