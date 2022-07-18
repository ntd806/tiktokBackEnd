import { IsNotEmpty, IsString, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsObject()
    ip: object;

    @ApiProperty()
    @IsObject()
    mac: object;

    @ApiProperty({
        description: 'Phone number of user'
    })
    @IsNotEmpty()
    @IsString()
    phone: string;
}
