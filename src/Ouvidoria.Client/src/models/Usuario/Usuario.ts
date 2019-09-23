import UsuarioPerfil from "../../application/enums/UsuarioPerfil";
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