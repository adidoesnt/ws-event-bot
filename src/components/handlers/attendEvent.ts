import { Logger } from "components";
import { Handler } from "components/base/handler";
import { DateFormatter } from "components/date";
import { EventService } from "components/event/service";
import { UserService } from "components/user/service";
import { NodeProperty } from "neode";

const dateFormatter = DateFormatter.getInstance();
const eventService = EventService.getInstance();
const userService = UserService.getInstance();

export class AttendEvent extends Handler {
    logger = Logger.getLogger("addEvent handler");

    constructor(tokens: Array<string>) {
        super("/attendEvent", tokens);
    }

    async execute(): Promise<string> {
        const [name, authorId, authorName] = this.tokens;
        if (!name || !authorId || !authorName) {
            this.reply = "usage: /attendEvent <name>";
            this.logger.error(this.reply);
            return this.reply;
        }
        const event = await eventService.findOne(name);
        let user = await userService.findOne(authorId);
        if (!user) {
            user = await userService.create({
                id: authorId as NodeProperty,
                name: authorName as NodeProperty,
            });
        }
        await event.relateTo(user, "attendedBy");
        const userName = user.get("name");
        const eventName = event.get("name");
        this.reply = `Added ${userName} to event ${eventName}`;
        return this.reply;
    }
}
