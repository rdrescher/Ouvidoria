export default interface IDepartamentoDTO {
    id: number;
    nome: string;
    idUsuarioResponsavel: number | null;
    usuarioResponsavel?: string;
}