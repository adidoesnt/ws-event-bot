import { NodeProperty, PropertyType, SchemaObject } from "neode";

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
} as SchemaObject;
