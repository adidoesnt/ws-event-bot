import { neode } from "components/database";
import { v4 as uuidV4 } from "uuid";

export const Event = neode.model("Event", {
    id: {
        type: "string",
        primary: true,
        required: true,
        unique: true,
        default: () => uuidV4(),
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
