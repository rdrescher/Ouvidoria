import http from "../application/http";
import Login from "../models/Autenticacao/Login";
import LoginResponse from "../models/Autenticacao/LoginResponse";
import Resultado from "../models/Resultado";

export default class AutenticacaoApi {
  public static async Login(login: Login): Promise<Resultado<LoginResponse>> {
    return await http.post(`/api/Autenticacao/Login`, login);
  }
}
