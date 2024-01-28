import { UserService } from "components/user/service";
import { WhatsApp } from "./whatsapp";
import { EventService } from "./event/service";
import { Message } from "whatsapp-web.js";
import { Event as EventModel } from "models";
import { Node } from "neode";

const { BOT_CHAT_ID } = process.env;

type EventProps = keyof (typeof EventModel)["properties"];

export class Bot extends WhatsApp {
    private static instance: Bot;
    private chatId: string;
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
        const { from: chatId, body, id, author } = msg;
        if (!this.validateChatId(chatId)) return;
        this.logger.info("received whatsapp message", msg);
        const tokens = body.split(" ");
        const command = tokens.shift();
        const msgId = id._serialized;
        if (!command) {
            this.logger.error("command is required");
            return;
        }
        await this.processCommand(command, tokens, msgId, author);
    }

    private async processCommand(
        command: string,
        tokens: string[],
        msgId: string,
        author?: string,
    ) {
        let reply: string = "";
        switch (command) {
            case "/addEvent":
                reply = await this.addEvent(tokens);
                break;
            case "/attendEvent":
                reply = await this.attendEvent(tokens, author);
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
            return await this.client.sendMessage(this.chatId, reply, {
                quotedMessageId: msgId,
            });
        } else {
            return;
        }
    }

    private async addEvent(tokens: string[]) {
        const [name, date, time] = tokens;
        if (!name || !date) {
            return "Event name and date are required\nExample: /addEvent <name> <date> <time>";
        }
        const event = await this.eventService.create({
            name,
            date,
            time,
        });
        const { properties } = event;
        const { name: eventName } = properties as EventProps;
        return `Event ${eventName} created`;
    }

    private async attendEvent(tokens: string[], author: string | undefined) {
        if (!author) {
            this.logger.error("author is required");
            return "";
        } else {
            const [id] = tokens;
            if (!id) {
                return "Event ID is required\nExample: /attendEvent <id>";
            }
            let user = await this.userService.findOne(author);
            if (!user) {
                user = await this.userService.create({
                    name: author,
                });
            }
            const event = await this.eventService.findOne(parseInt(id) - 1);
            if (!event) {
                return `Event with ID ${id} not found`;
            }
            await event.relateTo(user, "attendedBy");
            const { properties: eventProps } = event;
            const { name: eventName } = eventProps as EventProps;
            return `You will be attending ${eventName}`;
        }
    }

    private async deleteEvent(tokens: string[]) {
        const [id] = tokens;
        if (!id) {
            return "Event ID is required\nExample: /deleteEvent <id>";
        }
        const event = await this.eventService.deleteOne(parseInt(id) - 1);
        const { properties } = event;
        const { name } = properties as EventProps;
        return `Event ${name} created`;
    }

    private async viewEvent(tokens: string[]) {
        const [id] = tokens;
        if (id) {
            const event = await this.eventService.findOne(parseInt(id) - 1);
            const { properties } = event;
            const { name, date, time } = properties as EventProps;
            return `${name} ${date} ${time}`;
        } else {
            const events = await this.eventService.findAll();
            let reply = "";
            events.forEach((event: Node<unknown>, index: number) => {
                const { properties } = event;
                const { name, date, time } = properties as EventProps;
                reply += `${index + 1}. ${name} ${date} ${time}\n`;
            });
            return reply;
        }
    }
}
