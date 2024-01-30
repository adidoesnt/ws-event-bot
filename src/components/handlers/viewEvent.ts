import { Logger } from "components";
import { Handler } from "components/base/handler";
import { DateFormatter } from "components/date";
import { EventService } from "components/event/service";
import { Relationship } from "neode";

const dateFormatter = DateFormatter.getInstance();
const eventService = EventService.getInstance();

export class ViewEvent extends Handler {
    logger = Logger.getLogger("viewEvent handler");

    constructor(tokens: Array<string>) {
        super("/viewEvent", tokens);
    }

    async execute(): Promise<string> {
        const name = this.tokens.shift();
        if (!name) {
            this.reply = await this.getAllEvents();
        } else {
            this.reply = await this.getEvent(name);
        }
        return this.reply;
    }

    async getAllEvents(): Promise<string> {
        const events = Array.from(await eventService.findAll());
        events
            .filter((event) => {
                const date: string = event.get("date");
                const parsedDate = dateFormatter.dateFromNL(date);
                return parsedDate && parsedDate > new Date();
            })
            .sort((a, b) => {
                const aDate: string = a.get("date");
                const bDate: string = b.get("date");
                const aParsedDate = dateFormatter.dateFromNL(aDate);
                const bParsedDate = dateFormatter.dateFromNL(bDate);
                return aParsedDate!.getTime() - bParsedDate!.getTime();
            })
            .map((event, i) => {
                const index = i + 1;
                const name: string = event.get("name");
                const date: string = event.get("date");
                const parsedDate = dateFormatter.dateToNL(date);
                const attendees = event.get("attendedBy");
                const eventString = `${index}. Event ${name} on ${parsedDate}\n`;
                this.reply += eventString;
            });
        return this.reply;
    }

    async getEvent(name: string): Promise<string> {
        const event = await eventService.findOne(name);
        if (!event) {
            this.reply = `Event ${name} not found`;
            this.logger.error(this.reply);
        } else {
            const name: string = event.get("name");
            const date: string = event.get("date");
            const parsedDate = dateFormatter.dateToNL(date);
            const attendees: Relationship = event.get("attendedBy");
            console.log({ attendees: attendees.endNode() });
            this.reply = `Event ${name} on ${parsedDate}`;
        }
        return this.reply;
    }
}
