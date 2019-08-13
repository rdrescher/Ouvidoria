import ICurso from "../Curso/Curso";

export default interface IUsuario {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    cpf: string;
    ativo: boolean;
    idCurso: number;
    usuarioPerfil: UsuarioPerfil;
    curso: ICurso;
}

export enum UsuarioPerfil {
    "Administrador",
    "Usuario"
}