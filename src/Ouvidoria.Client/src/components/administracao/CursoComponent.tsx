import {
    makeStyles,
    Container,
    Fab,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    Theme
} from "@material-ui/core";
import { Save } from "@material-ui/icons";
import React, { useEffect, useState, ChangeEvent, SyntheticEvent } from "react";
import ICurso from "../../models/Curso";
import CursoApi from "../../services/CursoApi";
import Operacao from "../../types/Operacao";

interface IProps {
    curso: ICurso;
    operacao: Operacao;
}

interface IError {
    mensagem: string;
    possuiErro: boolean;
}

export default function CursoComponent(props: IProps) {
    const [curso, setCurso] = useState<ICurso>(props.curso);
    const [erro, setErro] = useState<IError>({
        mensagem: "",
        possuiErro: false
    });
    const classes = useStyles();

    useEffect(() => {
        setCurso(props.curso);
    },        [props]);

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCurso({ ...curso, nome: e.target.value });
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        if (curso.nome.length === 0) {
            setErro({ mensagem: "Insira o nome do curso", possuiErro: true });
        } else if (curso.nome.length < 2 || curso.nome.length > 50) {
            setErro({
                mensagem:
                    "O nome do curso deve possuir entre dois e cinquênta caracteres",
                possuiErro: true
            });
        } else {
            let retorno = await CursoApi.entity.update(curso);
            if (retorno.success) {
                setErro({ mensagem: "", possuiErro: false });
            } else {
                setErro({ mensagem: retorno.message, possuiErro: true });
            }
        }
    };

    return (
        <Container maxWidth="lg">
            <form>
                <FormControl fullWidth error={erro.possuiErro}>
                    <InputLabel htmlFor="nome">Nome</InputLabel>
                    <Input
                        id="nome"
                        aria-describedby="nome-helper"
                        fullWidth
                        value={curso.nome}
                        onChange={handleNameChange}
                    />
                    <FormHelperText id="nome-helper">
                        {erro.mensagem}
                    </FormHelperText>
                </FormControl>
                <div className={classes.buttons}>
                    <Fab
                        variant="extended"
                        color="primary"
                        aria-label="salvar"
                        size="medium"
                    >
                        <Save
                            className={classes.btnMargin}
                            onClick={handleSubmit}
                        />
                        Salvar
                    </Fab>
                </div>
            </form>
        </Container>
    );
}

const useStyles = makeStyles((theme: Theme) => ({
    buttons: {
        marginBottom: "1.25em",
        marginTop: ".5em",
        display: "flex",
        justifyContent: "flex-end"
    },
    btnMargin: {
        marginRight: theme.spacing(1)
    }
}));
