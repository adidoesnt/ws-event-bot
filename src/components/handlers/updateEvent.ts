import { Logger } from "components";
import { Handler } from "components/base/handler";
import { DateFormatter } from "components/date";
import { EventService } from "components/event/service";
import { NodeProperty } from "neode";

const dateFormatter = DateFormatter.getInstance();
const eventService = EventService.getInstance();

export class UpdateEvent extends Handler {
    logger = Logger.getLogger("updateEvent handler");

    constructor(tokens: Array<string>) {
        super("/updateEvent", tokens);
    }

    async execute(): Promise<string> {
        const name = this.tokens.shift();
        const date = this.tokens.join(" ");
        if (!name || !date) {
            this.reply =
                "usage: /updateEvent <name> <date and time in natural language>";
            this.logger.error(this.reply);
            return this.reply;
        }
        const parsedDate = dateFormatter.dateFromNL(date);
        const event = await eventService.update(name, {
            name: name as NodeProperty,
            date: parsedDate as unknown as NodeProperty,
        } as any);
        const eventName = event.get("name");
        const eventDate = dateFormatter.dateToNL(event.get("date"));
        this.reply = `Update event ${eventName} to be on ${eventDate}`;
        return this.reply;
    }
}
