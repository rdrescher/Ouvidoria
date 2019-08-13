import Http from "../core/http";
import IResultado from "../models/Resultado";
import CadastroUsuario from "../models/Usuario/CadastroUsuario";
import Usuario from "../models/Usuario/Usuario";
import EntityApi from "./EntityApi";

export default class UsuarioApi {
    public static readonly entity = new EntityApi<Usuario>("Usuario");

    public static async create(user: CadastroUsuario): Promise<IResultado<Usuario>> {
        return await Http.post(`/api/Usuario`, user);
    }

    public static async update(id: number, user: CadastroUsuario): Promise<IResultado<Usuario>> {
        return await Http.put(`/api/Usuario/${id}`, user);
    }
}