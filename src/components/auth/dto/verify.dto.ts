import { IsString, IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyDto {
    @ApiProperty({
        description: 'Phone number of user'
    })
    @IsNotEmpty()
    @IsString()
    @Matches(/(^\+d{1,4})\d{9,10}$/g, {
        message: 'Invalid phone number'
    })
    phone: string;

    @ApiProperty({
        description: 'MAC address'
    })
    @ApiProperty()
    @IsString()
    mac: string;
}
