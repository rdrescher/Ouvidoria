import http from "../application/http";
import AtualizacaoDepartamento from "../models/Departamento/AtualizacaoDepartamento";
import CadastroDepartamento from "../models/Departamento/CadastroDepartamento";
import Departamento from "../models/Departamento/Departamento";
import GenericList from "../models/GenericList";
import Resultado from "../models/Resultado";
import EntityApi from "./EntityApi";

export default class DepartamentoApi {
    public static readonly entity = new EntityApi<Departamento>("Departamento");

    public static async update(id: number, department: AtualizacaoDepartamento): Promise<Resultado<Departamento>> {
        return await http.put(`/api/Departamento/${id}`, department);
    }

    public static async create(department: CadastroDepartamento): Promise<Resultado<Departamento>> {
        return await http.post(`/api/Departamento`, department);
    }

    public static async getGenericList(): Promise<Resultado<GenericList[]>> {
        return await http.get(`/api/Departamento/GetGenericList`);
    }
}