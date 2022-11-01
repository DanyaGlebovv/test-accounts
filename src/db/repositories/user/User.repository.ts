import { UserEntity } from '../../entities';
import { AppDataSource } from '../../data-source';

export const UserRepository = AppDataSource.getRepository(UserEntity);
