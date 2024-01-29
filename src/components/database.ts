import Neode from "neode";
import { Logger } from "./logger";
import { event, user } from "models";

const {
    NODE_ENV,
    DB_HOST = "127.0.0.1",
    DB_PORT = 7687,
    DB_USER = "neo4j",
    DB_PASS = "",
    DB_NAME = "neo4j",
} = process.env;

export class Database {
    private static instance: Database;
    neode: Neode;
    logger = Logger.getLogger("database");

    constructor() {
        this.neode = new Neode(
            `bolt://${DB_HOST}:${DB_PORT}`,
            DB_USER,
            DB_PASS,
            false,
            DB_NAME,
            {
                debug: NODE_ENV === "DEV",
                encrypted:
                    NODE_ENV === "DEV" ? "ENCRYPTION_OFF" : "ENCRYPTION_ON",
                trust:
                    NODE_ENV === "DEV"
                        ? "TRUST_ALL_CERTIFICATES"
                        : "TRUST_SYSTEM_CA_SIGNED_CERTIFICATES",
            },
        );
        this.logger.info("connection has been established successfully.");
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

export const database = Database.getInstance();
