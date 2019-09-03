import Pergunta from "../Pergunta/Pergunta";

export default interface ICadastroQuestionario {
    titulo: string;
    descricao: string;
    dataInicio: Date;
    dataFim: Date;
    perguntas: Pergunta[];
}