import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IGame } from './interfaces/game.interface';
import { CreateGameDto, UpdateGameDto } from './dto';
import { Game } from './model/game.schema';
import { PaginationQueryDto } from './dto/pagination.query.dto';

@Injectable()
export class GameService {
    constructor(
        @InjectModel(Game.name)
        private readonly gameModel: Model<Game>
    ) {}

    public async findAll(paginationQuery: PaginationQueryDto): Promise<Game[]> {
        const { limit, offset } = paginationQuery;

        return await this.gameModel
            .find()
            .skip(offset)
            .limit(limit)
            // .populate('organization')
            .exec();
    }

    public async findOne(gameId: string): Promise<any> {
        const Game = await this.gameModel
            .findById({ _id: gameId })
            // .populate('organization')
            .exec();

        if (!Game) {
            return {
                code: 50007,
                data: false,
                message: `Game #${gameId} not found`
            };
        }

        return {
            code: 50008,
            data: Game,
            message: 'OK'
        };
    }

    public async create(CreateGameDto: CreateGameDto): Promise<IGame> {
        const newCustomer = await this.gameModel.create(CreateGameDto);
        return newCustomer;
    }

    public async update(
        gameId: string,
        UpdateGameDto: UpdateGameDto
    ): Promise<IGame> {
        const existingCustomer = await this.gameModel.findByIdAndUpdate(
            { _id: gameId },
            UpdateGameDto
        );

        if (!existingCustomer) {
            throw new NotFoundException(`Game #${gameId} not found`);
        }

        return existingCustomer;
    }

    public async remove(gameId: string): Promise<any> {
        const deletedCustomer = await this.gameModel.findByIdAndRemove(gameId);
        return deletedCustomer;
    }
}
