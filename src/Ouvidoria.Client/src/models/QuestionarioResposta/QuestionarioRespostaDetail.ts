import Resposta from "../Resposta/Resosta";

export default interface IQuestionarioDetail {
  titulo: string;
  usuario: string;
  dataCriacao: string;
  respostas: Resposta[];
}