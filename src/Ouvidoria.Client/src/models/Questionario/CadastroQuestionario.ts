import CadastroPergunta from "../Pergunta/CadastroPergunta";

export default interface ICadastroQuestionario {
    titulo: string;
    descricao: string;
    dataInicio: Date;
    dataFim: Date;
    perguntas: CadastroPergunta[];
}