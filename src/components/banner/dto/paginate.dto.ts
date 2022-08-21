import { IsNumber, IsOptional, IsPositive } from "class-validator";

export class PaginateQueryDto {
    @IsOptional()
    @IsPositive()
    limit: number;

    @IsOptional()
    @IsNumber()
    offset: number;
}