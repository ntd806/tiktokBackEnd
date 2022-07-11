import { BaseInterfaceRepository } from '../../../repositories/base/base.interface.repository';
import { User } from '../entity/user.entity';

export type UserRepositoryInterface = BaseInterfaceRepository<User>;
