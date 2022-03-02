import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async createUser(dto: CreateUserDto) {
        try {
            const user = await this.userRepository.create(dto);
            console.log(user)
            return user;
        } catch (e) {
            throw e;
        }
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll()
        return users;
    }
}
