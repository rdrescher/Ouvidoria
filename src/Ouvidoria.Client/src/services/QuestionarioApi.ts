import Http from "../application/http";
import CadastroQuestionario from "../models/Questionario/CadastroQuestionario";
import DetalheQuestionario from "../models/Questionario/DetalheQuestionario";
import Questionario from "../models/Questionario/Questionario";
import QuestionarioPreview from "../models/Questionario/QuestionarioPreview";
import QuestionarioReport from "../models/Questionario/QuestionarioReport";
import CadastroQuestionarioResposta from "../models/QuestionarioResposta/CadastroQuestionarioResposta";
import QuestionarioResposta from "../models/QuestionarioResposta/QuestionarioResposta";
import QuestionarioRespostaDetail from "../models/QuestionarioResposta/QuestionarioRespostaDetail";
import Resultado from "../models/Resultado";
import EntityApi from "./EntityApi";

export default class QuestionarioApi {
    public static readonly entity = new EntityApi<DetalheQuestionario>("Questionario");

    public static async GetAnswersById(id: number): Promise<Resultado<QuestionarioRespostaDetail>> {
        return await Http.get(`/api/Questionario/GetAnswersById/${id}`);
    }

    public static async GetAnswersByQuiz(id: number): Promise<Resultado<QuestionarioResposta[]>> {
        return await Http.get(`/api/Questionario/GetAnswersByQuiz/${id}`);
    }

    public static async create(quiz: CadastroQuestionario): Promise<Resultado> {
        return await Http.post(`/api/Questionario`, quiz);
    }

    public static async getPreviewList(): Promise<Resultado<QuestionarioPreview[]>> {
        return await Http.get(`/api/Questionario/GetPreviewList`);
    }

    public static async get(id: number): Promise<Resultado<Questionario>> {
        return await Http.get(`/api/Questionario/${id}`);
    }
    public static async IsUserAbleToAnswer(id: number): Promise<Resultado> {
        return await Http.get(`/api/Questionario/IsUserAbleToAnswer/${id}`);
    }

    public static async Reply(answer: CadastroQuestionarioResposta): Promise<Resultado> {
        return await Http.post(`/api/Questionario/Reply`, answer);
    }

    public static async getForReport(id: number): Promise<Resultado<QuestionarioReport>> {
        return await Http.get(`/api/Questionario/GetQuizForReport/${id}`);
    }
}