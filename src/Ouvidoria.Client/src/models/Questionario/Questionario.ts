import Pergunta from "../Pergunta/Pergunta";

export default interface IQuestionario {
  id: number;
  titulo: string;
  descricao: string;
  perguntas: Pergunta[];
}