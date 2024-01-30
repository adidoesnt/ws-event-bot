import { Logger } from "components";
import { Handler } from "components/base/handler";;
import { EventService } from "components/event/service";

const eventService = EventService.getInstance();

export class DeleteEvent extends Handler {
    logger = Logger.getLogger("deleteEvent handler");

    constructor(tokens: Array<string>) {
        super("/deleteEvent", tokens);
    }

    async execute(): Promise<string> {
        const name = this.tokens.join(" ");
        if (!name) {
            this.reply =
                "usage: /deleteEvent <name>";
            this.logger.error(this.reply);
            return this.reply;
        }
        const event = await eventService.deleteOne(name);
        const eventName = event.get("name");
        const eventDate = event.get("date");
        this.reply = `Deleted event ${eventName} on ${eventDate}`;
        return this.reply;
    }
}
