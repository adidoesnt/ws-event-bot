require("dotenv").config();
const { connectDB } = require("./controller/repository");
const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

function initClient(client) {
  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });
  client.on("ready", () => {
    console.log("client is ready");
  });
  client.initialize();
}

async function main() {
  await connectDB();
  const client = new Client();
  initClient(client);
}

main();
