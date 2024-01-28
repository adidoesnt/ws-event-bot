import { Client } from "whatsapp-web.js";
import { Logger } from "./logger";
import puppeteer from "puppeteer";
import qrcode from "qrcode-terminal";

export class WhatsApp {
    client: Client;
    logger = Logger.getLogger("whatsapp");

    constructor() {
        this.client = new Client({});
    }

    registerEvents() {
        this.client.on("qr", (qr) => {
            this.logger.info("received whatsapp qr code", qr);
            qrcode.generate(qr, { small: true });
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
        await puppeteer.launch({ headless: true });
        this.registerEvents();
        await this.client.initialize();
    }

    async processMessage(msg: string) {
        this.logger.info("received whatsapp message", msg);
    }
}
