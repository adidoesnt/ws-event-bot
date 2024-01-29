import { UserService } from "components/user/service";
import { WhatsApp } from "./whatsapp";
import { EventService } from "./event/service";
import { Message } from "whatsapp-web.js";
import { parseDate } from "chrono-node";

const { BOT_CHAT_ID, TIMEZONE, FORMAT } = process.env;

export class Bot extends WhatsApp {
    private static instance: Bot;
    private chatId: string;
    private userService: UserService;
    private eventService: EventService;
    private format: string = FORMAT ?? "DD-MM-YYYY";
    private timezone: string = TIMEZONE ?? "GMT+8";

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
        const {
            from: chatId,
            body,
            id,
            author,
            notifyName,
        } = msg as Message & { notifyName: string };
        if (!this.validateChatId(chatId)) return;
        this.logger.debug("received whatsapp message", msg);
        const tokens = body.split(" ");
        const command = tokens.shift();
        const msgId = id._serialized;
        if (!command) {
            this.logger.error("command is required");
            return;
        }
        await this.processCommand(command, tokens, msgId, author, notifyName);
    }

    private async processCommand(
        command: string,
        tokens: string[],
        msgId: string,
        author?: string,
        notifyName?: string,
    ) {
        let reply: string = "";
        switch (command) {
            case "/addEvent":
                reply = await this.addEvent(tokens);
                break;
            case "/attendEvent":
                reply = await this.attendEvent(tokens, author, notifyName);
                break;
            case "/deleteEvent":
                reply = await this.deleteEvent(tokens);
                break;
            case "/viewEvent":
                reply = await this.viewEvent(tokens);
                break;
            default:
                break;
        }
        if (reply.trim() !== "") {
            this.logger.info("sending reply", reply);
            return await this.client.sendMessage(this.chatId, reply, {
                quotedMessageId: msgId,
            });
        } else {
            return;
        }
    }

    private getDate(date: string) {
        const year = new Date().getFullYear();
        return parseDate(`${date} ${year} ${this.format} ${this.timezone}`);
    }

    private async addEvent(tokens: string[]) {
        return "";
    }

    private async attendEvent(
        tokens: string[],
        author: string | undefined,
        notifyName: string | undefined,
    ) {
        return "";
    }

    private async deleteEvent(tokens: string[]) {
        return "";
    }

    private async viewEvent(tokens: string[]) {
        return "";
    }
}
