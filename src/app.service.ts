import { Get, Injectable } from "@nestjs/common";

@Injectable() // чтобы класс стал провайдером, т.к. будем внедрять в контроллер
export class AppService {
    getUsers() {
        return [{id: 1, name: 'Jettik1'}]
    }
}