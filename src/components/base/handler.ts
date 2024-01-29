import { Logger } from "components";
import { DateFormatter } from "components/date";

export type Command =
    | "/addEvent"
    | "/attendEvent"
    | "/flakeEvent"
    | "/deleteEvent"
    | "/updateEvent"
    | "/viewEvent";

export abstract class Handler {
    command: Command;
    tokens: Array<string>;
    reply: string = "";
    dateFormatter: DateFormatter;
    abstract execute(): Promise<string>;

    constructor(command: Command, tokens: Array<string>) {
        this.command = command;
        this.tokens = tokens;
        this.dateFormatter = DateFormatter.getInstance();
    }
}
