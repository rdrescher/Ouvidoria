import TipoPergunta from "../../application/enums/TipoPergunta";
import Opcao from "../Opcao/Opcao";

export default interface IPergunta {
  id: number;
  descricao: string;
  tipo: TipoPergunta;
  opcoes: Opcao[];
}
