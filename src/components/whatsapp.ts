import { Client } from "whatsapp-web.js";
import { Logger } from "./logger";

export class WhatsApp {
    client: Client;
    logger = Logger.getLogger("whatsapp");

    constructor() {
        this.client = new Client({
            puppeteer: {
                headless: true,
                args: ["--no-sandbox"],
            },
        });
    }

    registerEvents() {
        this.client.on("qr", (qr) => {
            this.logger.info("received whatsapp qr code", qr);
        });
        this.client.on("authenticated", (session) => {
            this.logger.info("successfully authenticated session", session);
        });
        this.client.on("auth_failure", (msg) => {
            this.logger.error("session authentication unsuccessful", msg);
        });
        this.client.on("ready", () => {
            this.logger.info("whatsapp client is ready");
        });
        this.client.on("disconnected", (reason) => {
            this.logger.info("whatsapp client was disconnected", reason);
        });
        this.client.on("message", async (msg) => {
            await this.processMessage(msg.body);
        });
    }

    async initialize() {
        this.registerEvents();
        await this.client.initialize();
    }

    async processMessage(msg: string) {
        this.logger.info("received whatsapp message", msg);
    }
}
