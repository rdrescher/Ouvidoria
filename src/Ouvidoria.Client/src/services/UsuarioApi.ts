import Usuario from "../models/Usuario";
import EntityApi from "./EntityApi";
import ICadastroUsuario from "../models/CadastroUsuario";
import IResultado from "../models/Resultado";
import Http from "../core/http";

export default class UsuarioApi {
    public static readonly entity = new EntityApi<Usuario>("Usuario");

    public static async create(entity: ICadastroUsuario): Promise<IResultado<ICadastroUsuario>> {
        return await Http.post(`/api/Usuario`, entity);
    }

}