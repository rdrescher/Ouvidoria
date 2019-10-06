import TipoManifestacao from "../../application/enums/TipoManifestacao";

export default interface ICadastroManifestacao {
    titulo: string;
    descricao: string;
    idDepartamento: number;
    tipoManifestacao: TipoManifestacao;
}