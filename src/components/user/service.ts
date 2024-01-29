import { Service } from "components/base/service";
import { User } from "models/user";
import { UserRepository } from "./repository";

export class UserService extends Service<User>{
    readonly repository: UserRepository = new UserRepository();
    static instance: UserService;

    static getInstance() {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }
}