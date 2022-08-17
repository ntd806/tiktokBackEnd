import {
    IsString,
    IsNotEmpty,
    IsNumber,
    IsEmail,
    IsMACAddress,
    Length,
    Matches,
    IsIP,
    IsUrl
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SocialDto {
    @ApiProperty({
        description: 'email of user'
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'MAC address'
    })
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsMACAddress()
    mac: string;

    @ApiProperty({
        description: 'token of Google or Facebook'
    })
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    //todo: don't know format
    token: string;

    @ApiProperty({
        description: 'Id of Google or Facebook'
    })
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    //todo: don't know format
    id: string;

    @ApiProperty({
        description: 'fullname of user'
    })
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(0, 127)
    fullname: string;

    @ApiProperty({
        description: 'Phone of user'
    })
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Matches(/(^\+84|^0)\d{9}$/g, {
        message: 'this is not Viet Nam phone number'
    })
    phone: string;

    @ApiProperty({
        description: 'Ip of user'
    })
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsIP()
    ip: string;

    @ApiProperty({
        description: 'url of user'
    })
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @IsUrl()
    url: string;

    @ApiProperty({
        description: 'Is Google or not Google'
    })
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    isGoogle: number;
}
