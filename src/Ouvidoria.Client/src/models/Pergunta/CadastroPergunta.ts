import TipoPergunta from "../../application/enums/TipoPergunta";
import CadastroOpcao from "../Opcao/CadastroOpcao";

export default interface ICadastroPergunta {
  descricao: string;
  tipo: TipoPergunta;
  opcoes: CadastroOpcao[];
}
