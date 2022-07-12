import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
    @IsNotEmpty()
    @IsString()
    ip: string;

    @IsString()
    mac: string;

    @IsNotEmpty()
    @IsString()
    phone: string;
}
