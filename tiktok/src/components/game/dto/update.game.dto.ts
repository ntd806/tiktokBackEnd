import { PartialType } from '@nestjs/mapped-types';
import { CreateGameDto } from './create.game.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateGameDto extends PartialType(CreateGameDto) {}
