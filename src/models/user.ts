import { NodeProperty, PropertyType } from "neode";

export type User = typeof user;

export const user = {
    id: {
        primary: true,
        type: "string" as PropertyType,
        required: true,
    } as NodeProperty,
    name: {
        type: "string" as PropertyType,
        required: true,
    } as NodeProperty,
    attendedBy: {
        type: "relationship" as PropertyType,
        relationship: "ATTENDED_BY",
        direction: "out",
        target: "Event",
        cascade: "detach",
        properties: {},
    } as NodeProperty,
};
