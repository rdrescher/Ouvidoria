import http from "../application/http";
import CadastroUsuario from "../models/Autenticacao/CadastroUsuario";
import Login from "../models/Autenticacao/Login";
import LoginResponse from "../models/Autenticacao/LoginResponse";
import Resultado from "../models/Resultado";

export default class AutenticacaoApi {
  public static async Cadastrar(user: CadastroUsuario): Promise<Resultado<LoginResponse>> {
    return await http.post(`/api/Autenticacao/Cadastrar`, user);
  }

  public static async Login(login: Login): Promise<Resultado<LoginResponse>> {
    return await http.post(`/api/Autenticacao/Login`, login);
  }

  public static async CheckToken(): Promise<Resultado> {
    return await http.get(`/api/Autenticacao/CheckToken`);
  }
}
