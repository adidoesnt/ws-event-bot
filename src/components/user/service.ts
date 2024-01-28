import { Service } from "components/base/service";
import { User } from "models/user";
import { UserRepository } from "./repository";

export class UserService extends Service<typeof User>{
    readonly repository: UserRepository = new UserRepository();

    async findOne(id: string) {
        try {
            return await this.repository.findOne(id);
        } catch (error) {
            throw error;
        }
    }

    async update(name: string, data: Record<string, unknown>) {
        try {
            return await this.repository.update(name, data);
        } catch (error) {
            throw error;
        }
    }
}