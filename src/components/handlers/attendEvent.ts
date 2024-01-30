import { Logger } from "components";
import { Handler } from "components/base/handler";
import { EventService } from "components/event/service";
import { UserService } from "components/user/service";
import { NodeProperty } from "neode";

const eventService = EventService.getInstance();
const userService = UserService.getInstance();

export class AttendEvent extends Handler {
    logger = Logger.getLogger("attendEvent handler");
    authorId: string | undefined;
    authorName: string | undefined;

    constructor(
        tokens: Array<string>,
        authorId: string | undefined,
        authorName: string | undefined,
    ) {
        super("/attendEvent", tokens);
        this.authorId = authorId;
        this.authorName = authorName;
    }

    getArgs() {
        const args = [];
        const name = this.tokens.join(" ");
        if (!this.authorId || !this.authorName) return [null, null, null];
        args.push(name, this.authorId, this.authorName);
        if (args.length !== 3) return [null, null, null];
        return args.map((arg) => arg.trim());
    }

    async execute(): Promise<string> {
        const [name, authorId, authorName] = this.getArgs();
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
