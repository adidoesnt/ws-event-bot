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
    attendedBy: {
        type: "relationship",
        relationship: "ATTENDED_BY",
        direction: "in",
        target: "User",
        properties: {},
    },
});
