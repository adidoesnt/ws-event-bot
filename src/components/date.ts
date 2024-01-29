import { parseDate } from "chrono-node";
import { format } from "date-fns";

const { FORMAT, TIMEZONE } = process.env;

export class DateFormatter {
    private static instance: DateFormatter;
    private format: string = FORMAT ?? "DD-MM-YYYY";
    private timezone: string = TIMEZONE ?? "GMT+8";

    static getInstance() {
        if (!DateFormatter.instance) {
            DateFormatter.instance = new DateFormatter();
        }
        return DateFormatter.instance;
    }

    public dateToNL(dateString: string): string {
        const date = new Date(dateString);
        return format(date, this.format);
    }

    public dateFromNL(date: string): Date | null {
        const year = new Date().getFullYear();
        return parseDate(`${date} ${year} ${this.format} ${this.timezone}`);
    }
}
