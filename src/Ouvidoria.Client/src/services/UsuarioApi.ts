import Usuario from "../models/Usuario";
import EntityApi from "./EntityApi";
import ICadastroUsuario from "../models/CadastroUsuario";
import IResultado from "../models/Resultado";
import Http from "../core/http";
import IUsuario from "../models/Usuario";

export default class UsuarioApi {
    public static readonly entity = new EntityApi<Usuario>("Usuario");

    public static async create(user: ICadastroUsuario): Promise<IResultado<IUsuario>> {
        return await Http.post(`/api/Usuario`, user);
    }

    public static async update(id: number, user: ICadastroUsuario): Promise<IResultado<IUsuario>> {
        return await Http.put(`/api/Usuario/${id}`, user);
    }
}