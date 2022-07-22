import { Injectable, HttpService, Logger} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { RequestService } from 'src/vender/core/request.service';

@Injectable()
export class LiveService {
    private readonly logger = new Logger(LiveService.name);
    constructor(
        private readonly requestService: RequestService,
        private readonly httpService: HttpService
    ) {}
    /**
     * URL of live streamming server
     *
     */
    private url = process.env.URL_LIVE;

    /**
     * Username and Password to login live streamming server
     *
     */
    private data: any = {
        email: process.env.EMAIL_LIVE,
        password: process.env.PASSWORD_LIVE
    };

    /**
     * Options for request
     *
     */
    private options: any = {};

    public async getLiveList(): Promise<any> {
        this.logger.log('userId:', this.requestService.getUserId());
        return this.httpService
            .post(this.url, this.data, this.options)
            .pipe(map((resp) => resp.data.streamKey));
    }
}
