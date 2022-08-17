import { IsString, IsNotEmpty, IsMACAddress, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyDto {
    @ApiProperty({
        description: 'Phone number of user'
    })
    @IsNotEmpty()
    @IsString()
    @Matches(/(^\+84|^0)\d{9}$/g, {
        message: 'this is not Viet Nam phone number'
    })
    phone: string;

    @ApiProperty({
        description: 'MAC address'
    })
    @ApiProperty()
    @IsString()
    @IsMACAddress()
    mac: string;
}
