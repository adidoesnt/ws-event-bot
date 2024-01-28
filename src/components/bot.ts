import { WhatsApp } from "./whatsapp";

export class Bot extends WhatsApp {
    constructor() {
        super();
    }

    async processMessage(msg: string) {
        this.logger.info("received whatsapp message in subclass", msg);
    }
}
