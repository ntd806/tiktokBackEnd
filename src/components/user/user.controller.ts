import {
    Body,
    Controller,
    Post,
    Get,
    Request,
    UseGuards,
    Put,
    UploadedFile,
    UseInterceptors,
    Query
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, UpdateUserDto, AvataDto } from './dto';
import { JwtStrategy } from '../auth/strategy';
import { JwtGuard } from '../auth/guard';
import { FileInterceptor } from '@nestjs/platform-express'
import { multerOptions } from '../../vender/helper/Helper'
import { PaginationQueryDto } from '../video/dto/pagination.query.dto';
import {
    ApiTags,
    ApiBody,
    ApiConsumes,
    ApiResponse,
    ApiOperation,
    ApiBearerAuth,
    ApiParam
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
        status: 40007,
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
        summary: 'Update avata of user'
    })
    @ApiResponse({
        status: 40013,
        description: 'Update avata number successfully'
    })
    @ApiResponse({
        status: 40012,
        description: 'Not found user'
    })
    @UseGuards(JwtGuard)
    @Post('update-avata')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                }
            },
        },
    })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file', multerOptions))
    async updateAvata(@Request() req, @Body() dto: AvataDto, @UploadedFile('file') file) {
        dto.avatar = file.filename;
        return await this.userService.updateAvata(req.user, dto);
    }

    @ApiOperation({
        summary: 'Update user'
    })
    @ApiResponse({
        status: 40002,
        description: 'Update successfully'
    })
    @UseGuards(JwtGuard)
    @Post('update')
    async updateUser(@Request() req, @Body() dto: UserDto) {
        return await this.userService.updateUser(req.user, dto);
    }

    @Get()
    @ApiOperation({
        summary: 'Get all users'
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
    public async getAllGame(@Query() paginationQuery: PaginationQueryDto) {
        return await this.userService.findAll(paginationQuery);
    }

    @ApiOperation({
        summary: 'Update phone number'
    })
    @ApiResponse({
        status: 40011,
        description: 'Update phone number successfully'
    })
    @ApiResponse({
        status: 40012,
        description: 'Not found user'
    })
    @UseGuards(JwtGuard)
    @Put('update-phone')
    public async updateGame(
        @Request() req,
        @Body() UpdateGameDto: UpdateUserDto
    ) {
        return await this.userService.updatePhoneNumber(req.user, UpdateGameDto);
    }
}
