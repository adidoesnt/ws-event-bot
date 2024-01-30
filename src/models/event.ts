import { NodeProperty, PropertyType, SchemaObject } from "neode";

export type Event = typeof event;

export const event = {
    name: {
        primary: true,
        unique: true,
        type: "string" as PropertyType,
        required: true,
    } as NodeProperty,
    date: {
        type: "datetime" as PropertyType,
        required: true,
    } as NodeProperty,
    attendedBy: {
        type: "relationship" as PropertyType,
        relationship: "ATTENDED_BY",
        direction: "out",
        target: "User",
        cascade: "detach",
        properties: {},
        eager: true,
        required: false,
    } as NodeProperty | undefined,
} as SchemaObject;
