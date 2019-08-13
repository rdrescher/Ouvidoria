import Curso from "../models/Curso/Curso";
import EntityApi from "./EntityApi";

export default class CursoApi {
    public static readonly entity = new EntityApi<Curso>("Curso");
}