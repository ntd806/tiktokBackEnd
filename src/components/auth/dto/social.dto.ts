import {
    IsString,
    IsNotEmpty,
    IsNumber,
    IsEmail,
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
    @IsString()
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
    @Length(0, 30, {
        message: 'Full name must be less than 30 characters'
    })
    @Matches(/^[a-zA-Z0-9\s]+$/gi, {
        message: 'Invalid username',
    })
    fullname: string;

    @ApiProperty({
        description: 'Phone of user'
    })
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Matches(/(^\+d{1,4})\d{9,10}$/g, {
        message: 'Invalid phone number'
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
