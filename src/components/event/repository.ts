import { Respository } from "components/base/repository";
import { Event } from "models/event";

export class EventRepository extends Respository<typeof Event> {
    readonly model = Event;
}