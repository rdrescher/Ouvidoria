import Http from "../application/http";
import GenericList from "../models/GenericList";
import Resultado from "../models/Resultado";
import AtualizacaoUsuario from "../models/Usuario/AtualizacaoUsuario";
import Usuario from "../models/Usuario/Usuario";
import EntityApi from "./EntityApi";

export default class UsuarioApi {
    public static readonly entity = new EntityApi<Usuario>("Usuario");

    public static async update(id: number, user: AtualizacaoUsuario): Promise<Resultado<Usuario>> {
        return await Http.put(`/api/Usuario/${id}`, user);
    }

    public static async GetGenericList(): Promise<Resultado<GenericList[]>> {
        return await Http.get(`/api/Usuario/GetGenericList`);
    }
}