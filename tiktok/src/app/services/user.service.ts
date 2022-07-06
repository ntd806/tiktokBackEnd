import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm";
import CreateUserDto from "../dto/user.dto";
import User from "../entities/user";

@Injectable()
export default class UserService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>) {}
    public async getByIp(ip: string) {
        const user = await this.userRepo.findOne(ip);
        if(!user) {
            throw new HttpException('User with this ip does not exist', HttpStatus.NOT_FOUND);
        }
        return user;
    }
    public async getById(id: string) {
        const user = await this.userRepo.findOne(id);
        if(!user) {
            throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
        }
        return user;
    }
    public async create(user: CreateUserDto) {
        const newUser = await this.userRepo.create(user);
        await this.userRepo.save(newUser);
        return newUser;
    }
}