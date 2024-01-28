import { Respository } from "components/base/repository";
import { User } from "models/user";

export class UserRepository extends Respository<typeof User> {
    readonly model = User;
}