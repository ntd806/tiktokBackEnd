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
    Query,
    UseGuards
} from '@nestjs/common';
import {
    ApiTags,
    ApiParam,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth
} from '@nestjs/swagger';
import { GameService } from './game.service';
import { CreateGameDto, UpdateGameDto } from './dto';
import { PaginationQueryDto } from './dto/pagination.query.dto';
import { JwtGuard } from '../auth/guard';

@ApiTags('game')
@UseGuards(JwtGuard)
@ApiBearerAuth('Authorization')
@Controller('/api/v1/game')
@UseGuards(JwtGuard)
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
    @ApiResponse({
        status: 200,
        description: 'Get all game success'
    })
    public async getAllGame(
        @Res() res,
        @Query() paginationQuery: PaginationQueryDto
    ) {
        const games = await this.GameService.findAll(paginationQuery);
        return res.status(HttpStatus.OK).json(games);
    }

    @ApiOperation({
        summary: 'Get game by id'
    })
    @ApiResponse({
        status: 200,
        description: 'Get game by id success'
    })
    @ApiResponse({
        status: 404,
        description: 'Game ID does not exist'
    })
    @Get('/:id')
    public async getGame(@Res() res, @Param('id') gameId: string) {
        if (!gameId) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                code: 50007,
                data: false,
                message: 'Game does not exist!'
            });
        }

        return await this.GameService.findOne(gameId);
    }

    @ApiOperation({
        summary: 'Add new game'
    })
    @ApiResponse({
        status: 200,
        description: 'Game has been created successfully'
    })
    @ApiResponse({
        status: 400,
        description: 'Error: Game not created!'
    })
    @Post()
    public async addGame(@Res() res, @Body() CreateGameDto: CreateGameDto) {
        try {
            const Game = await this.GameService.create(CreateGameDto);
            return res.status(HttpStatus.OK).json({
                code: 50001,
                message: 'Game has been created successfully',
                Game
            });
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                code: 50004,
                data: false,
                message: 'Error: Game not created!'
            });
        }
    }

    @ApiOperation({
        summary: 'Update game by id'
    })
    @ApiResponse({
        status: 200,
        description: 'Game has been successfully updated'
    })
    @ApiResponse({
        status: 400,
        description: 'Error: Game not updated!'
    })
    @ApiResponse({
        status: 404,
        description: 'Game ID does not exist'
    })
    @Put('/:id')
    public async updateGame(
        @Res() res,
        @Param('id') gameId: string,
        @Body() UpdateGameDto: UpdateGameDto
    ) {
        try {
            const Game = await this.GameService.update(gameId, UpdateGameDto);
            if (!Game) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    code: 50007,
                    data: false,
                    message: 'Game does not exist!'
                });
            }
            return res.status(HttpStatus.OK).json({
                code: 50002,
                message: 'Game has been successfully updated',
                Game
            });
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Error: Game not updated!',
                code: 50005
            });
        }
    }

    @ApiOperation({
        summary: 'Delete game by id'
    })
    @ApiResponse({
        status: 200,
        description: 'Game has been deleted'
    })
    @ApiResponse({
        status: 404,
        description: 'Game ID does not exist'
    })
    @Delete('/:id')
    public async deleteGame(@Res() res, @Param('id') gameId: string) {
        if (!gameId) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                code: 50007,
                data: false,
                message: 'Game does not exist!'
            });
        }

        const Game = await this.GameService.remove(gameId);

        return res.status(HttpStatus.OK).json({
            code: 50008,
            message: 'Game has been deleted',
            Game
        });
    }
}
