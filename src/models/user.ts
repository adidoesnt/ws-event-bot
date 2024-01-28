import { database } from "components/database";
const { neode } = database;

export const User = neode.model("User", {
    id: {
        type: "number",
        primary: true,
        required: true,
    },
    name: {
        type: "string",
        required: true,
    },
});
