import { Controller, Query, Res, Get, NotFoundException } from '@nestjs/common';
import {
    ApiTags,
    ApiOperation
} from '@nestjs/swagger';
import { FileNameQueryDto } from './dto';

@ApiTags('assets')
@Controller('assets')
export class AssetsController {
    @Get('image')
    @ApiOperation({
        summary: 'Get assets of app'
    })
    async getImage(@Query() fileName: FileNameQueryDto, @Res() res): Promise<any> {
        try {
            res.sendFile(fileName.fileName, { root: './public/image/'});
        } catch (error) {
            throw new NotFoundException(error);
        }
    }
}
