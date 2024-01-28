import { neode } from "components/database";

export const User = neode.model("User", {
    id: {
        primary: true,
        type: "string",
        required: true,
    },
    name: {
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
