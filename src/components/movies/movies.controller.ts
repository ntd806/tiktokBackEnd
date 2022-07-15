import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('movies')
@Controller('/api/v1/movies')
export class MoviesController {
    constructor(){}

    @Get()
    public get(){
        return "ok";
    }

}
