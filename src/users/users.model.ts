import { ApiProperty } from "@nestjs/swagger";
import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { Role } from "src/roles/roles.model";
import { UserRoles } from "src/roles/user-roles.model";

interface UserCreationAttrs{
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный id'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
    @ApiProperty({example: 'user@mail.ru', description: 'Почтовый адрес'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;
    @ApiProperty({example: '12345', description: 'Пароль'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;
    @ApiProperty({example: 'true', description: 'Забанен ли пользователь'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;
    @ApiProperty({example: 'Reason', description: 'Reason for ban'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: |Role[];
}