import { Model } from 'neode';
import { Respository } from './repository';

export abstract class Service<T> {
    abstract readonly repository: Respository<T>;

    async create(data: T) {
        try {
            return await this.repository.create(data);
        } catch (error) {
            throw error;
        }
    }

    async findOne(id: number | string) {
        try {
            return await this.repository.findOne(id);
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        try {
            return await this.repository.findAll();
        } catch (error) {
            throw error;
        }
    }

    async deleteOne(id: number) {
        try {
            return await this.repository.deleteOne(id);
        } catch (error) {
            throw error;
        }
    }

    async deleteAll() {
        try {
            return await this.repository.deleteAll();
        } catch (error) {
            throw error;
        }
    }

    async update(id: number | string, data: T) {
        try {
            return await this.repository.update(id, data);
        } catch (error) {
            throw error;
        }
    }
}