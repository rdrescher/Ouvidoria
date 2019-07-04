import { UsuarioPerfil } from "./Usuario";

export default interface ICadastroUsuario
{
    id: number;
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    senha: string;
    ativo: boolean;
    idCurso: number;
    usuarioPerfil: UsuarioPerfil;
}