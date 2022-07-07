import { Controller , Post, Get} from '@nestjs/common';

@Controller('/api/v1')
export class UserController {
    @Get('/user/getCode')
    getCode() {
        return {
            status: 'ok from company service'
        };
    }

    @Post('/user/sendCode')
    SendCode() {
        return {
            status: 'ok from company service'
        };
    }

    @Post('/user/verifyCode')
    verifyCode() {
        return {
            status: 'ok from company service'
        };
    }
}
