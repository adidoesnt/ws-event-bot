import { Service } from "components/base/service";
import { Event } from "models";
import { EventRepository } from "./repository";

export class EventService extends Service<Event>{
    readonly repository: EventRepository = new EventRepository();
    private static instance: EventService;

    async findRelationships(id: number | string) {
        return await this.repository.findRelationships(id);
    }

    static getInstance() {
        if (!EventService.instance) {
            EventService.instance = new EventService();
        }
        return EventService.instance;
    }
}