import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@ApiTags('movies')
@Controller('/api/v1/movies')
export class MoviesController {
    constructor(){}

    @ApiOperation({
        summary: 'Get movie'
    })
    @ApiOkResponse({ description: 
    `"ok"` 
    })
    @Get()
    public get(){
        return "ok";
    }

}
