import PerguntaReport from "../Pergunta/PerguntaReport";

export default interface IQuestionarioReport {
  id: number;
  titulo: string;
  descricao: string;
  perguntas: PerguntaReport[];
}
