import { UserService } from "components/user/service";
import { WhatsApp } from "./whatsapp";
import { EventService } from "./event/service";

export class Bot extends WhatsApp {
    private static instance: Bot;
    private userService: UserService;
    private eventService: EventService;

    private constructor() {
        super();
        this.userService = new UserService();
        this.eventService = new EventService();
    }

    static getInstance() {
        if (!Bot.instance) {
            Bot.instance = new Bot();
        }
        return Bot.instance;
    }

    protected async processMessage(msg: string) {
        this.logger.info("received whatsapp message in subclass", msg);
    }
}
