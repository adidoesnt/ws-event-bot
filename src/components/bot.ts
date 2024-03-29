import { WhatsApp } from "./whatsapp";
import { Message } from "whatsapp-web.js";
import { AddEvent } from "./handlers/addEvent";
import { AttendEvent } from "./handlers/attendEvent";
import { FlakeEvent } from "./handlers/flakeEvent";
import { DeleteEvent } from "./handlers/deleteEvent";
import { UpdateEvent } from "./handlers/updateEvent";
import { ViewEvent } from "./handlers/viewEvent";

const { BOT_CHAT_ID } = process.env;

export class Bot extends WhatsApp {
    private static instance: Bot;
    private chatId: string;

    private constructor() {
        super();
        this.chatId = `${BOT_CHAT_ID}`;
    }

    static getInstance() {
        if (!Bot.instance) {
            Bot.instance = new Bot();
        }
        return Bot.instance;
    }

    private validateChatId(chatId: string | number) {
        if (!chatId) {
            this.logger.warn("chatId is required");
            return false;
        } else if (typeof chatId !== "string" && typeof chatId !== "number") {
            this.logger.warn("chatId must be a string or number");
            return false;
        } else if (`${chatId}` !== this.chatId) {
            this.logger.warn("chatId does not match bot configuration");
            return false;
        }
        return true;
    }

    async processMessage(msg: Message) {
        const {
            from: chatId,
            body,
            id,
            author,
            _data: { notifyName },
        } = msg as Message & { _data: { notifyName: string } };
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
            case "/flakeEvent":
                reply = await this.flakeEvent(tokens, author, notifyName);
                break;
            case "/deleteEvent":
                reply = await this.deleteEvent(tokens);
                break;
            case "/updateEvent":
                reply = await this.updateEvent(tokens);
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

    private async addEvent(tokens: string[]) {
        const handler = new AddEvent(tokens);
        return await handler.execute();
    }

    private async attendEvent(
        tokens: string[],
        author: string | undefined,
        notifyName: string | undefined,
    ) {
        const handler = new AttendEvent(tokens, author, notifyName);
        return await handler.execute();
    }

    private async flakeEvent(
        tokens: string[],
        author: string | undefined,
        notifyName: string | undefined,
    ) {
        const handler = new FlakeEvent(tokens, author, notifyName);
        return await handler.execute();
    }

    private async deleteEvent(tokens: string[]) {
        const handler = new DeleteEvent(tokens);
        return await handler.execute();
    }

    private async updateEvent(tokens: string[]) {
        const handler = new UpdateEvent(tokens);
        return await handler.execute();
    }

    private async viewEvent(tokens: string[]) {
        const handler = new ViewEvent(tokens);
        return await handler.execute();
    }
}
