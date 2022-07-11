import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import AuthenticationService from './authentication.service';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthenticationService) {
        super({
            ipField: 'ip'
        });
    }

    async validate(ip: string): Promise<any> {
        return this.authService.getAuthUser(ip);
    }
}
