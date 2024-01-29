import { Respository } from "components/base/repository";
import { Event, event } from "models";
import { Model } from "neode";

export class EventRepository extends Respository<Event> {
    readonly model: Model<Event>;

    constructor() {
        super();
        this.model = this.database.neode.model("Event", event)
    }
}