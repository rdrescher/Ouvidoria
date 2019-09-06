import Http from "../application/http";
import CadastroQuestionario from "../models/Questionario/CadastroQuestionario";
import QuestionarioPreview from "../models/Questionario/QuestionarioPreview";
import Resultado from "../models/Resultado";
import EntityApi from "./EntityApi";

export default class QuestionarioApi {
    public static readonly entity = new EntityApi<CadastroQuestionario>("Questionario");

    public static async create(quiz: CadastroQuestionario): Promise<Resultado<any>> {
        return await Http.post(`/api/Questionario`, quiz);
    }

    public static async getPreviewList(): Promise<Resultado<QuestionarioPreview[]>> {
        return await Http.get(`/api/Questionario/GetPreviewList`);
    }

}