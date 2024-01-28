import { Logger } from "components";
import { Model } from "neode";

export abstract class Respository<T extends Model<unknown>> {
    abstract readonly model: T;
    logger = Logger.getLogger("repository");

    async create(data: Record<string, unknown>) {
        try {
            return await this.model.create(data);
        } catch (error) {
            this.logger.error("error creating model", error);
            throw error;
        }
    }

    async findOne(id: number) {
        try {
            return await this.model.find(id);
        } catch (error) {
            this.logger.error("error finding one model", error);
            throw error;
        }
    }

    async findAll() {
        try {
            return await this.model.all();
        } catch (error) {
            this.logger.error("error finding all models", error);
            throw error;
        }
    }

    async deleteOne(id: number) {
        try {
            const node = await this.findOne(id);
            return await node?.delete();
        } catch (error) {
            this.logger.error("error deleting one model", error);
            throw error;
        }
    }

    async deleteAll() {
        try {
            return await this.model.deleteAll();
        } catch (error) {
            this.logger.error("error deleting all models", error);
            throw error;
        }
    }

    async update(id: number, data: Record<string, unknown>) {
        try {
            const node = await this.findOne(id);
            return await node?.update(data);
        } catch (error) {
            this.logger.error("error updating one model", error);
            throw error;
        }
    }
}
