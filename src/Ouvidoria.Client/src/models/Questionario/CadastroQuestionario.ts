import Pergunta from "../Pergunta/Pergunta";

export default interface IQuestionario {
    titulo: string;
    descricao: string;
    dataInicio: Date;
    dataFim: Date;
    perguntas: Pergunta[];
}