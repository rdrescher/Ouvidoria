import http from "../core/http";
import Curso from "../models/Curso/Curso";
import GenericList from "../models/GenericList";
import Resultado from "../models/Resultado";
import EntityApi from "./EntityApi";

export default class CursoApi {
    public static readonly entity = new EntityApi<Curso>("Curso");

    public static async GetGenericList(): Promise<Resultado<GenericList[]>> {
        return await http.get(`/api/Curso/GetGenericList`);
    }
}