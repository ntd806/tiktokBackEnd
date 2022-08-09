import { IsNotEmpty, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Reinstall {
    @ApiProperty({
        description: 'MAC address'
    })
    @IsString()
    mac: string;

    @ApiProperty({
        description: 'Phone number of user'
    })
    @IsNotEmpty()
    @IsString()
    phone: string;
}