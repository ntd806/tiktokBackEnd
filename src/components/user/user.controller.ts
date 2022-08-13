import {
    Body,
    Controller,
    Post,
    Get,
    Request,
    UseGuards,
    Query,
    Put,
    Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, UpdateUserDto } from './dto';
import { JwtStrategy } from '../auth/strategy';
import { JwtGuard } from '../auth/guard';
import { PaginationQueryDto } from '../video/dto/pagination.query.dto';
import {
    ApiTags,
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
    @UseGuards(JwtGuard)
    @Put('update-phone')
    public async updateGame(
        @Request() req,
        @Body() UpdateGameDto: UpdateUserDto
    ) {
        return await this.userService.updatePhoneNumber(req.user, UpdateGameDto);
    }
}
