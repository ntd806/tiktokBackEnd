import { MaxLength, IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOtpDto {
    @ApiProperty()
    @IsNotEmpty()
    phoneNumber: string;
}
