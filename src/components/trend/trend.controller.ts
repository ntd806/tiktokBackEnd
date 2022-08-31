import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    UseGuards
} from '@nestjs/common';
import { multerCSV } from '../../vender/helper/Helper';
import {
    ApiOperation,
    ApiBody,
    ApiConsumes,
    ApiBearerAuth,
    ApiTags
} from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('trend')
@ApiTags('trend')
@ApiBearerAuth('Authorization')
@UseGuards(JwtGuard)
export class TrendController {
    @Post()
    @ApiOperation({
        summary: 'Analytics trend by CSV'
    })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                    description:
                        'image file upload, if available image url please empty field'
                }
            }
        }
    })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file', multerCSV))
    async uploadFile(@UploadedFile() file) {
    }
}
