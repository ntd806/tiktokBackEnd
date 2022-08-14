import { Injectable, Get, Res, Param } from '@nestjs/common';

@Injectable()
export class AssetsService {

    @Get('image/:name')
    async serveAvatar(@Param('name') fileName, @Res() res): Promise<any> {
        res.sendFile(fileName, { root: 'avatars'});
    }
}
