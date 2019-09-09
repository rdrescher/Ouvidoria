import Http from "../application/http";
import CadastroQuestionario from "../models/Questionario/CadastroQuestionario";
import Questionario from "../models/Questionario/Questionario";
import QuestionarioPreview from "../models/Questionario/QuestionarioPreview";
import CadastroQuestionarioResposta from "../models/QuestionarioResposta/CadastroQuestionarioResposta";
import Resultado from "../models/Resultado";
import EntityApi from "./EntityApi";

export default class QuestionarioApi {
    public static readonly entity = new EntityApi<CadastroQuestionario>("Questionario");

    public static async create(quiz: CadastroQuestionario): Promise<Resultado> {
        return await Http.post(`/api/Questionario`, quiz);
    }

    public static async getPreviewList(): Promise<Resultado<QuestionarioPreview[]>> {
        return await Http.get(`/api/Questionario/GetPreviewList`);
    }

    public static async get(id: number): Promise<Resultado<Questionario>> {
        return await Http.get(`/api/Questionario/${id}`);
    }
    public static async IsUserAbleToAnswer(id: number): Promise<Resultado>  {
        return await Http.get(`/api/Questionario/IsUserAbleToAnswer/${id}`);
    }

    public static async Reply(answer: CadastroQuestionarioResposta): Promise<Resultado> {
        return await Http.post(`/api/Questionario/Reply`, answer);
    }
}