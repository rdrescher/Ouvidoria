import Http from "../core/http";

export default class EntityApi<TEntity>
{
    private readonly controller: string;

    public constructor(controller: string) {
        this.controller = controller;
    }

    public async create(entity: TEntity): Promise<TEntity> {
        return await Http.post(`/api/${this.controller}`, entity);
    }

    public async delete(entity: TEntity): Promise<void> {
        return await Http.delete(`/api/${this.controller}`, entity);
    }

    public async get(): Promise<Array<TEntity>> {
        return await Http.get(`/api/${this.controller}`);
    }

    public async getById(id: number): Promise<TEntity> {
        return await Http.post(`/api/${this.controller}/${id}`);
    }

    public async update(entity: TEntity): Promise<TEntity> {
        return await Http.put(`/api/${this.controller}`, entity);
    }
}