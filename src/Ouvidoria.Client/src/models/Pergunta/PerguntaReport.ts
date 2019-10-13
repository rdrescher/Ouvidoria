import TipoPergunta from "../../application/enums/TipoPergunta";
import OpcaoReport from "../Opcao/OpcaoReport";

export default interface IPerguntaReport {
  titulo: string;
  tipoPergunta: TipoPergunta;
  respostas: string[];
  opcoes: OpcaoReport[];
}
