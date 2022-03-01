import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import { ConfigModule } from "@nestjs/config";

@Module({
    controllers: [AppController],
    providers: [AppService], // Всё, что содержит логику и может использоватся в других компонентов
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        SequelizeModule.forRoot({
          dialect: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: '4224',
          database: 'nest-app',
          models: [],
          autoLoadModels: true,
        }),
        UsersModule,
      ],
})
export class AppModule{

}