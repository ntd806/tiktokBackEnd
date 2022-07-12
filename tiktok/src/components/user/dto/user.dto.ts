import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class UserDto {
    @IsDateString()
    birthdate: Date;

    @IsString()
    sex: string;

    @IsString()
    fullname: string;
}
