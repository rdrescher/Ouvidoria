import ICurso from "./Curso";

export default interface IUsuario
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
    curso: ICurso;
}

export enum UsuarioPerfil
{
    "Administrador",
    "Usuario" 
}