import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDto } from 'src/dto/add-role.dto';
import { BanUserDto } from 'src/dto/ban-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { // dependency injection
    }

    @ApiOperation({summary: 'Создание пользователя'})
    @ApiResponse({status: 200, type: User})
    // @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto: CreateUserDto) {
        try {
            return this.usersService.createUser(userDto);
        } catch (e) {
            console.log(`\n ControllerError: ${e.messgae}`)
        }
    }

    @ApiOperation({summary: 'Получение пользователей'})
    @ApiResponse({status: 200, type: [User]})
    //@UseGuards(JwtAuthGuard)
    @Roles("ADMIN") // наш декоратор
    @UseGuards(RolesGuard)
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: 'Выдача ролей'})
    @ApiResponse({status: 200})
    //@UseGuards(JwtAuthGuard)
    @Roles("ADMIN") // наш декоратор
    @UseGuards(RolesGuard)
    @Post("/role")
    addRole(@Body() dto: AddRoleDto) {
        return this.usersService.addRole(dto);
    }

    @ApiOperation({summary: 'Забанить пользователя'})
    @ApiResponse({status: 200})
    //@UseGuards(JwtAuthGuard)
    @Roles("ADMIN") // наш декоратор
    @UseGuards(RolesGuard)
    @Post("/ban")
    ban(@Body() dto: BanUserDto) {
        return this.usersService.ban(dto);
    }
}
