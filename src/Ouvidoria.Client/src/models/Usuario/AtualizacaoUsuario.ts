import { UsuarioPerfil } from "./Usuario";

export default interface IAtualizacaoUsuario {
    id: number;
    nome: string;
    telefone: string;
    ativo: boolean;
    idCurso: number | null;
    usuarioPerfil: UsuarioPerfil;
}