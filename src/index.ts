import { Bot } from "components";
import { message } from "samples/message";
import { Message } from "whatsapp-web.js";

const bot = Bot.getInstance();
// await bot.initialize();
console.log(await bot.processMessage(message as unknown as Message));
