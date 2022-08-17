import { IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOtpDto {
    @ApiProperty()
    @IsNotEmpty()
    @Matches(/(^\+84|^0)\d{9}$/g, {
        message: 'this is not Viet Nam phone number'
    })
    phoneNumber: string;
}
