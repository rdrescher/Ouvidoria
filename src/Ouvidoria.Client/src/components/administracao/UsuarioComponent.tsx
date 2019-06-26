import React, { SyntheticEvent, useState, useEffect, ChangeEvent } from "react";
import Usuario from "../../models/Usuario";
import Operacao from "../../types/Operacao";
import {
    Input,
    Container,
    FormControl,
    InputLabel,
    FormHelperText,
    Checkbox
} from "@material-ui/core";

interface IProps {
    usuario: Usuario;
    operacao: Operacao;
    fechaDialogo: (e: SyntheticEvent, operacao: string) => void;
}

interface IState {
    usuario: Usuario;
}

const initialState = {
    usuario: {} as Usuario
};

export default function UsuarioComponent(props: IProps) {
    const [state, setState] = useState<IState>(initialState);

    useEffect(() => {
        setState({ ...state, usuario: props.usuario });
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        let name = e.target.name;
        let value = e.target.value;
        setState({ ...state, usuario: { ...state.usuario, [name]: value } });
    };

    return (
        <Container maxWidth="lg">
            <form>
                <FormControl fullWidth>
                    <InputLabel htmlFor="nome">Nome</InputLabel>
                    <Input
                        name="nome"
                        aria-describedby="nome-helper"
                        fullWidth
                        value={state.usuario.nome}
                        onChange={handleInputChange}
                    />
                    <FormHelperText id="nome-helper">{""}</FormHelperText>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel htmlFor="email">E-mail</InputLabel>
                    <Input
                        name="email"
                        aria-describedby="email-helper"
                        fullWidth
                        value={state.usuario.email}
                        onChange={handleInputChange}
                    />
                    <FormHelperText id="email-helper">{""}</FormHelperText>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel htmlFor="telefone">Telefone</InputLabel>
                    <Input
                        name="telefone"
                        aria-describedby="telefone-helper"
                        fullWidth
                        value={state.usuario.telefone}
                        onChange={handleInputChange}
                    />
                    <FormHelperText id="telefone-helper">{""}</FormHelperText>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel htmlFor="cpf">CPF</InputLabel>
                    <Input
                        name="cpf"
                        aria-describedby="cpf-helper"
                        fullWidth
                        value={state.usuario.cpf}
                        onChange={handleInputChange}
                    />
                    <FormHelperText id="cpf-helper">{""}</FormHelperText>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel htmlFor="senha">Senha</InputLabel>
                    <Input
                        name="senha"
                        aria-describedby="senha-helper"
                        fullWidth
                        value={state.usuario.senha}
                        onChange={handleInputChange}
                        type="password"
                        disabled={props.operacao === "Atualizar"}
                    />
                    <FormHelperText id="senha-helper">{""}</FormHelperText>
                </FormControl>
            </form>
        </Container>
    );
}
