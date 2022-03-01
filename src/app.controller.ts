import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";


@Controller('/api') // Нет необходимости создавать роутеры как в Express
export class AppController {

    constructor(private appService: AppService) {} // Dependency Injection

    @Get('/users')
    getUsers() {
        return this.appService.getUsers();
    }
}