import { UserService } from "components/user/service";
import { WhatsApp } from "./whatsapp";
import { EventService } from "./event/service";
import { Message } from "whatsapp-web.js";

const { BOT_CHAT_ID } = process.env;

export class Bot extends WhatsApp {
    private static instance: Bot;
    private chatId: string | number;
    private userService: UserService;
    private eventService: EventService;

    private constructor() {
        super();
        this.chatId = `${BOT_CHAT_ID}`;
        this.userService = new UserService();
        this.eventService = new EventService();
    }

    static getInstance() {
        if (!Bot.instance) {
            Bot.instance = new Bot();
        }
        return Bot.instance;
    }

    private validateChatId(chatId: string | number) {
        if (!chatId) {
            this.logger.error("chatId is required");
            return false;
        } else if (typeof chatId !== "string" && typeof chatId !== "number") {
            this.logger.error("chatId must be a string or number");
            return false;
        } else if (`${chatId}` !== this.chatId) {
            this.logger.error("chatId does not match bot configuration");
            return false;
        }
        return true;
    }

    protected async processMessage(msg: Message) {
        const { from: chatId } = msg;
        if(!this.validateChatId(chatId)) return;
        this.logger.info("received whatsapp message", msg);
    }
}
