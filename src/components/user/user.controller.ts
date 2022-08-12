import {
    Body,
    Controller,
    Post,
    Get,
    Request,
    UseGuards,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { JwtStrategy } from '../auth/strategy';
import { JwtGuard } from '../auth/guard';
import { FileInterceptor } from '@nestjs/platform-express'
import { multerOptions } from '../../vender/helper/Helper'
import {
    ApiTags,
    ApiBody,
    ApiConsumes,
    ApiResponse,
    ApiOperation,
    ApiBearerAuth
} from '@nestjs/swagger';
@UseGuards(JwtStrategy)
@ApiBearerAuth('Authorization')
@ApiTags('user')
@Controller('/api/v1/user')
export class UserController {
    constructor(private userService: UserService) {}

    @ApiOperation({
        summary: 'Get info user'
    })
    @ApiResponse({
        status: 200,
        description: 'Get successfully'
    })
    @UseGuards(JwtGuard)
    @Get('info')
    async info(@Request() req) {
        return {
            code: 40007,
            data: req.user,
            message: 'Get successfully'
        };
    }

    @ApiOperation({
        summary: 'Update user'
    })
    @ApiResponse({
        status: 200,
        description: 'Update successfully'
    })
    @UseGuards(JwtGuard)
    @Post('update')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
                birthdate: {
                    type: 'datetime',
                },
                sex: {
                    type: 'number'
                },
                fullname: {
                    type: 'string'
                }
            },
        },
    })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file', multerOptions))
    async updateUser(@Request() req, @Body() dto: UserDto, @UploadedFile('file') file) {
        dto.avatar = process.env.URL_IMAGE + file.filename;
        console.log(dto);
        return await this.userService.updateUser(req.user, dto);
    }
}
