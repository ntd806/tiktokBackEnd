import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UserRepository } from '../../repositories/user.repository';
import { UserServiceInterface } from './interface/user.service.interface';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [
        {
            provide: 'UserRepositoryInterface',
            useClass: UserRepository
        },
        {
            provide: 'UserServiceInterface',
            useClass: UserService
        }
    ],
    controllers: [UserController]
})
export class UserModule {}
