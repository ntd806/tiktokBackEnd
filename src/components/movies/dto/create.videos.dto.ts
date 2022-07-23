import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVideoDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    url: string;
}