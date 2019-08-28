import TipoPergunta from "../../application/enums/TipoPergunta";
import Opcao from "../Opcao/Opcao";

export default interface IPergunta {
    descricao: string;
    tipo: TipoPergunta;
    opcoes: Opcao[];
}

