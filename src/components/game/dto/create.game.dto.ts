import { MaxLength, IsNotEmpty, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateGameDto {
    @ApiProperty()
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty()
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    readonly url: string;

    @ApiProperty()
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    readonly image: string;
}
