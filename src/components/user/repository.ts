import { Respository } from "components/base/repository";
import { User } from "models/user";

export class UserRepository extends Respository<typeof User> {
    readonly model = User;
    
    async findOne(name: string) {
        try {
            return await this.model.find(name);
        } catch (error) {
            this.logger.error("error finding one model", error);
            throw error;
        }
    }

    async update(id: string, data: Record<string, unknown>) {
        try {
            const node = await this.findOne(id);
            return await node?.update(data);
        } catch (error) {
            this.logger.error("error updating one model", error);
            throw error;
        }
    }
}