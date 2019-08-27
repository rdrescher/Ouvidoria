import Http from "../application/http";
import IResultado from "../models/Resultado";

export default class EntityApi<TEntity>
{
    private readonly controller: string;

    public constructor(controller: string) {
        this.controller = controller;
    }

    public async create(entity: TEntity): Promise<IResultado<TEntity>> {
        return await Http.post(`/api/${this.controller}`, entity);
    }

    public async delete(id: number): Promise<IResultado<TEntity>> {
        return await Http.delete(`/api/${this.controller}/${id}`);
    }

    public async get(): Promise<IResultado<Array<TEntity>>> {
        return await Http.get(`/api/${this.controller}`);
    }

    public async getById(id: number): Promise<IResultado<TEntity>> {
        return await Http.post(`/api/${this.controller}/${id}`);
    }

    public async update(id: number, entity: TEntity): Promise<IResultado<TEntity>> {
        return await Http.put(`/api/${this.controller}/${id}`, entity);
    }
}