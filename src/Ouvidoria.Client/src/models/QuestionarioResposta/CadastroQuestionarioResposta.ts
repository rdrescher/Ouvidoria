import CadastroResposta from "../Resposta/CadastroResposta";

export default interface ICadastroQuestionarioResposta {
  idQuestionario: number;
  respostas: CadastroResposta[];
}