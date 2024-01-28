import { database } from "components/database";
const { neode } = database;

export const Event = neode.model("Event", {
    id: {
        type: "number",
        primary: true,
        required: true,
    },
    name: {
        type: "string",
        required: true,
    },
    date: {
        type: "date",
        required: true,
    },
    time: {
        type: "time",
        required: false,
    },
    attendedBy: {
        type: "relationship",
        relationship: "ATTENDED_BY",
        direction: "in",
        target: "User",
        cascade: "detach",
        properties: {},
    },
});
