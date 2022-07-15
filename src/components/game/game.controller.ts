import {
    Controller,
    Get,
    Res,
    HttpStatus,
    Post,
    Body,
    Put,
    NotFoundException,
    Delete,
    Param,
    Query
} from '@nestjs/common';
import { ApiTags, ApiParam, ApiOperation } from '@nestjs/swagger';
import { GameService } from './game.service';
import { CreateGameDto, UpdateGameDto } from './dto';
import { PaginationQueryDto } from './dto/pagination.query.dto';

@ApiTags('game')
@Controller('/api/v1/game')
export class GameController {
    constructor(private GameService: GameService) {}

    @Get()
    @ApiOperation({
        summary: 'Get all games'
    })
    @ApiParam({
        name: 'limit',
        type: 'number',
        description: 'enter limit of record',
        required: true
    })
    @ApiParam({
        name: 'offset',
        type: 'number',
        description: 'enter offset of record',
        required: true
    })
    public async getAllGame(
        @Res() res,
        @Query() paginationQuery: PaginationQueryDto
    ) {
        const games = await this.GameService.findAll(paginationQuery);
        return res.status(HttpStatus.OK).json(games);
    }

    @Get('/:id')
    public async getGame(@Res() res, @Param('id') gameId: string) {
        if (!gameId) {
            throw new NotFoundException('Game ID does not exist');
        }

        const Game = await this.GameService.findOne(gameId);

        return res.status(HttpStatus.OK).json(Game);
    }

    @Post()
    public async addGame(@Res() res, @Body() CreateGameDto: CreateGameDto) {
        try {
            const Game = await this.GameService.create(CreateGameDto);
            return res.status(HttpStatus.OK).json({
                message: 'Game has been created successfully',
                Game
            });
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Error: Game not created!',
                status: 400
            });
        }
    }

    @Put('/:id')
    public async updateGame(
        @Res() res,
        @Param('id') gameId: string,
        @Body() UpdateGameDto: UpdateGameDto
    ) {
        try {
            const Game = await this.GameService.update(gameId, UpdateGameDto);
            if (!Game) {
                throw new NotFoundException('Game does not exist!');
            }
            return res.status(HttpStatus.OK).json({
                message: 'Game has been successfully updated',
                Game
            });
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Error: Game not updated!',
                status: 400
            });
        }
    }

    @Delete('/:id')
    public async deleteGame(@Res() res, @Param('id') gameId: string) {
        if (!gameId) {
            throw new NotFoundException('Game ID does not exist');
        }

        const Game = await this.GameService.remove(gameId);

        return res.status(HttpStatus.OK).json({
            message: 'Game has been deleted',
            Game
        });
    }
}
