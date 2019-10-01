import Interacao from "../Interacao/Interacao";

export default interface IManifestacao {
    id: number;
    titulo: string;
    descricao: string;
    departamento: string;
    usuario: string;
    dataCriacao: string;
    interacoes: Interacao[];
}