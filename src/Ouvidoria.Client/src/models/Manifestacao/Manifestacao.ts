import TipoManifestacao from "../../application/enums/TipoManifestacao";
import Interacao from "../Interacao/Interacao";

export default interface IManifestacao {
    id: number;
    titulo: string;
    descricao: string;
    departamento: string;
    usuario: string;
    dataCriacao: string;
    tipoManifestacao: TipoManifestacao;
    interacoes: Interacao[];
}