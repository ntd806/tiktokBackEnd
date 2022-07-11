import { BaseAbstractRepository } from './base/base.abstract.repository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepositoryInterface } from '../components/user/interface/user.repository.interface';
import { User } from '../components/user/entity/user.entity';

@Injectable()
export class UserRepository
    extends BaseAbstractRepository<User>
    implements UserRepositoryInterface
{
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {
        super(userRepository);
    }
}
