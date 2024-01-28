import { Service } from "components/base/service";
import { Event } from "models/event";
import { EventRepository } from "./repository";

export class EventService extends Service<typeof Event>{
    readonly repository: EventRepository = new EventRepository();
}