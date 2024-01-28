import { WhatsApp } from "./whatsapp";

export class Bot extends WhatsApp {
    private static instance: Bot;

    private constructor() {
        super();
    }

    protected async processMessage(msg: string) {
        this.logger.info("received whatsapp message in subclass", msg);
    }

    static getInstance() {
        if (!Bot.instance) {
            Bot.instance = new Bot();
        }
        return Bot.instance;
    }
}
