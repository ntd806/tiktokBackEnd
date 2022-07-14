import {
    Body,
    Controller,
    Post,
    Get,
    Request,
    UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from '../auth/decorator';
import { UserDto } from './dto/user.dto';
import { JwtStrategy } from '../auth/strategy';
import { JwtGuard } from '../auth/guard';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@UseGuards(JwtStrategy)
@Controller('/api/v1/user')
export class UserController {
    constructor(private userService: UserService) {}

    @ApiOperation({
        summary: 'Get info user'
    })
    @ApiOkResponse({ description: 
        `{
            code: 201,
            data: {
                "_id": "xx",
                "ip": "xx",
                "mac": "xx",
                "phone": "xx",
                "sex": "xx",
                "birthday": "xx"
                "__v": 0
            },
            message: 'ok'
        }` 
    })
    @UseGuards(JwtGuard)
    @Get('info')
    async info(
        @Request() req
    ) {
        return {
            code: 200,
            data: req.user,
            message: 'update successfully'
        };
    }

    @ApiOperation({
        summary: 'Update user'
    })
    @ApiOkResponse({ description: 
        `{
            code: 200,
            data: {
                "_id": "xx",
                "ip": "xx",
                "mac": "xx",
                "phone": "xx",
                "sex": "xx",
                "birthday": "xx"
                "__v": 0
            },
            message: 'update successfully'
        }` 
    })
    @UseGuards(JwtGuard)
    @Post('update')
    async updateUser(
        @Request() req,
        @Body() dto: UserDto
    ) {
        const data = await this.userService.updateUser(req.user, dto);
        return {
            code: 200,
            data: data,
            message: 'update successfully'
        };
    }
}
