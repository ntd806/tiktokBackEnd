import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateUserDto from '../dto/user.dto';
import UserService from './user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export default class AuthenticationService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}
    public async register(registrationData: CreateUserDto) {
        try {
            const createdUser = await this.userService.create({
                ...registrationData
            });
            return createdUser;
        } catch (error) {
            throw new HttpException(
                'Something went wrong',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    public async getAuthUser(ip: string) {
        try {
            const user = await this.userService.getByIp(ip);
            return user;
        } catch (error) {
            throw new HttpException(
                'Something went wrong',
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }
    public async getUserToken(userId: number) {
        const payload: any = { userId };
        return this.jwtService.sign(payload);
    }
}
