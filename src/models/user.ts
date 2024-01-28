import { database } from "components/database";
const { neode } = database;

export const User = neode.model("User", {
    name: {
        primary: true,
        type: "string",
        required: true,
    },
    attendedBy: {
        type: "relationship",
        relationship: "ATTENDED_BY",
        direction: "out",
        target: "Event",
        cascade: "detach",
        properties: {},
    },
});
