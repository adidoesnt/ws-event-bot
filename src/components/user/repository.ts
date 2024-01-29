import { Respository } from "components/base/repository";
import { User, user } from "models";
import { Model } from "neode";

export class UserRepository extends Respository<User> {
    readonly model: Model<User>;

    constructor() {
        super();
        this.model = this.database.neode.model("User", user);
    }
}
