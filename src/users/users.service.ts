import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService) {} // чтобы использовать надо связать RolesService с модулем User

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
        const users = await this.userRepository.findAll({include: {all: true}})
        return users;
    }
}
