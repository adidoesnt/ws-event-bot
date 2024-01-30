import { Respository } from "components/base/repository";
import { Event, event } from "models";
import { Model } from "neode";

export class EventRepository extends Respository<Event> {
    readonly model: Model<Event>;

    constructor() {
        super();
        this.model = this.database.neode.model("Event", event);
    }

    async findRelationships(id: number | string) {
        try {
            const query = `
                MATCH (:Event {name: $id})-[r]-()
                RETURN r, startNode(r) as startNode, endNode(r) as endNode
            `;
            const result = await this.database.neode.readCypher(query, { id });
            const relationships = result.records.map((record) => {
                const relationship = record.get("r");
                const startNode = record.get("startNode");
                const endNode = record.get("endNode");
                return { relationship, startNode, endNode };
            });
            return relationships;
        } catch (error) {
            this.logger.error("Error finding relationships", error);
            throw error;
        }
    }
}
