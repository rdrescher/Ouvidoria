export default interface ICadastroUsuario {
    nome: string;
    email: string;
    telefone: string | null;
    cpf: string;
    senha: string;
    confirmaSenha: string;
    idCurso: number | null | undefined;
}