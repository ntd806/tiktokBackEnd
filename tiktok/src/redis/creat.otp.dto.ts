import { ApiProperty } from '@nestjs/swagger';
export default class CreateOtpDto {
    @ApiProperty({
        description: 'Phone number',
        default: '+84983455604'
    })
    phoneNumber: string;
}
