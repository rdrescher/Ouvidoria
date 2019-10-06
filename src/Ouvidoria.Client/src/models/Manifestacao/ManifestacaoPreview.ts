import TipoManifestacao from "../../application/enums/TipoManifestacao";

export default interface IManifestacaoPeview {
    id: number;
    titulo: string;
    descricao: string;
    departamento: string;
    usuario: string;
    numeroInteracoes: number;
    usuarioUltimaInteracao: string;
    dataCriacao: string;
    tipoManifestacao: TipoManifestacao;
}