import { Module, HttpModule } from '@nestjs/common';
import { LiveService } from './live.service';
import { LiveController } from './live.controller';
import { RequestService } from 'src/vender/core/request.service';

@Module({
    imports: [HttpModule],
    providers: [LiveService, RequestService],
    controllers: [LiveController]
})
export class LiveModule {}
