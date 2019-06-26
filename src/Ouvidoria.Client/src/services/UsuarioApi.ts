import Usuario from "../models/Usuario";
import EntityApi from "./EntityApi";

export default class UsuarioApi {
    public static readonly entity = new EntityApi<Usuario>("Usuario");
}