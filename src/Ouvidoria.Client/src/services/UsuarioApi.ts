import Http from "../core/http";
import GenericList from "../models/GenericList";
import Resultado from "../models/Resultado";
import CadastroUsuario from "../models/Usuario/CadastroUsuario";
import Usuario from "../models/Usuario/Usuario";
import EntityApi from "./EntityApi";

export default class UsuarioApi {
    public static readonly entity = new EntityApi<Usuario>("Usuario");

    public static async create(user: CadastroUsuario): Promise<Resultado<Usuario>> {
        return await Http.post(`/api/Usuario`, user);
    }

    public static async update(id: number, user: CadastroUsuario): Promise<Resultado<Usuario>> {
        return await Http.put(`/api/Usuario/${id}`, user);
    }

    public static async GetGenericList(): Promise<Resultado<GenericList[]>> {
        return await Http.get(`/api/Usuario/GetGenericList`);
    }
}