import Http from "../application/http";
import CadastroQuestionario from "../models/Questionario/CadastroQuestionario";
import Resultado from "../models/Resultado";
import EntityApi from "./EntityApi";

export default class QuestionarioApi {
    public static readonly entity = new EntityApi<CadastroQuestionario>("Questionario");

    public static async create(quiz: CadastroQuestionario): Promise<Resultado<any>> {
        return await Http.post(`/api/Questionario`, quiz);
    }

}