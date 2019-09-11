export default interface IQuestionarioDetail {
  titulo: string;
  descricao: string;
  dataInicio: Date;
  dataFim: Date;
  usuarioCriador: string;
  perguntas: number;
  respostas: number;
  id: number;
}
