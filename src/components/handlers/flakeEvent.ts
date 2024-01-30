import { Logger } from "components";
import { Handler } from "components/base/handler";
import { EventService } from "components/event/service";
import { UserService } from "components/user/service";

const eventService = EventService.getInstance();
const userService = UserService.getInstance();

export class FlakeEvent extends Handler {
    logger = Logger.getLogger("flakeEvent handler");
    authorId: string | undefined;
    authorName: string | undefined;

    constructor(
        tokens: Array<string>,
        authorId: string | undefined,
        authorName: string | undefined,
    ) {
        super("/flakeEvent", tokens);
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
            this.reply = "usage: /flakeEvent <name>";
            this.logger.error(this.reply);
            return this.reply;
        }
        const event = await eventService.findOne(name);
        const user = await userService.findOne(authorId);
        await event.detachFrom(user);
        const userName = user.get("name");
        const eventName = event.get("name");
        this.reply = `Removed ${userName} from event ${eventName}`;
        return this.reply;
    }
}
