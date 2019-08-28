import Pergunta from "../Pergunta/Pergunta";

export default interface IQuestionario {
    titulo: string;
    descricao: string;
    dataInicio: string;
    dataFim: string;
    perguntas: Pergunta[];
}