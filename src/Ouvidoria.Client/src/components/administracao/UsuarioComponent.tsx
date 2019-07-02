import React, { useState, useEffect, ChangeEvent, SyntheticEvent } from "react";
import Usuario, { UsuarioPerfil } from "../../models/Usuario";
import Operacao from "../../types/Operacao";
import {
  Input,
  Container,
  FormControl,
  InputLabel,
  FormHelperText,
  Fab,
  Typography,
  makeStyles,
  Theme
} from "@material-ui/core";
import { Save } from "@material-ui/icons";
import ICurso from "../../models/Curso";

interface IProps {
  user: Usuario;
  operation: Operacao;
}

interface IState {
  user: Usuario;
}

interface IErrors {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  senha: string;
}

const initialErrorsState: IErrors = {
  nome: "",
  email: "",
  telefone: "",
  cpf: "",
  senha: ""
};

export default function UsuarioComponent(props: IProps) {
  const [state, setState] = useState<IState>({ user: props.user });
  const [errors, setErrors] = useState<IErrors>(initialErrorsState);
  const classes = useStyles();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    let value = e.target.value;
    setState({ ...state, user: { ...state.user, [name]: value } });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { user } = state;
    let valid = true;

    if (!validateName(user.nome)) valid = false;
    if (!validateEmail(user.email)) valid = false;

    // if (!user.senha) {
    //   Errors.senha = "Por favor, informe a senha";
    //   valid = false;
    // } else {
    //   if (user.senha.length < 6) {
    //     Errors.senha = "A senha deve conter ao menos 6 caracteres";
    //     valid = false;
    //   }
    // }
    // if (
    //   user.telefone &&
    //   (user.telefone.length < 9 || user.telefone.length < 15)
    // ) {
    //   setErrors({
    //     ...errors,
    //     telefone: "O telefone deve conter entre 9 e 15 caracteres"
    //   });
    //   valid = false;
    // }
    // if (!user.email) {
    //   setErrors({ ...errors, email: "Por favor, informe o email" });
    //   valid = false;
    // } else {
    //   if (user.email.length < 5) {
    //     setErrors({ ...errors, email: "O email deve ser válido" });
    //     valid = false;
    //   }
    // }
    if (user === props.user || !valid) {
      //setErrors(Errors);
      console.log(errors);
      return;
    }
  };

  const validateName = (name: string): boolean => {
    if (!name) {

      setErrors((Errors: IErrors) => {
        return { ...Errors, nome: "Por favor, informe o nome" };
      });
      
      return false;
    } else {
      if (name.length < 2 || name.length > 100) {
        setErrors({
          ...errors,
          nome: "O nome deve conter entre 2 e 100 caracteres"
        });
        return false;
      }
    }
    return true;
  };

  const validateEmail = (email: string): boolean => {
    if (!email) {
      setErrors((Errors: IErrors) => {
        return { ...Errors, email: "Por favor, informe o nome" };
      });
      return false;
    } else {
      if (email.length < 5) {
        setErrors({ ...errors, email: "O email deve ser válido" });
        return false;
      }
    }
    return true;
  };

  return (
    <Container maxWidth="lg">
      <form>
        <FormControl fullWidth error={!!errors.nome}>
          <InputLabel htmlFor="nome">Nome</InputLabel>
          <Input
            name="nome"
            aria-describedby="nome-helper"
            fullWidth
            value={state.user.nome || ""}
            onChange={handleInputChange}
          />
          <FormHelperText id="nome-helper">{errors.nome}</FormHelperText>
        </FormControl>
        <FormControl fullWidth error={!!errors.email}>
          <InputLabel htmlFor="email">E-mail</InputLabel>
          <Input
            name="email"
            aria-describedby="email-helper"
            fullWidth
            type="email"
            value={state.user.email || ""}
            onChange={handleInputChange}
          />
          <FormHelperText id="email-helper">{errors.email}</FormHelperText>
        </FormControl>
        <FormControl fullWidth error={!!errors.telefone}>
          <InputLabel htmlFor="telefone">Telefone</InputLabel>
          <Input
            name="telefone"
            aria-describedby="telefone-helper"
            fullWidth
            value={state.user.telefone || ""}
            onChange={handleInputChange}
          />
          <FormHelperText id="telefone-helper">
            {errors.telefone}
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth error={!!errors.cpf}>
          <InputLabel htmlFor="cpf">CPF</InputLabel>
          <Input
            name="cpf"
            aria-describedby="cpf-helper"
            fullWidth
            value={state.user.cpf || ""}
            onChange={handleInputChange}
          />
          <FormHelperText id="cpf-helper">{errors.cpf}</FormHelperText>
        </FormControl>
        <FormControl fullWidth error={!!errors.senha}>
          <InputLabel htmlFor="senha">Senha</InputLabel>
          <Input
            name="senha"
            aria-describedby="senha-helper"
            fullWidth
            value={state.user.senha || ""}
            onChange={handleInputChange}
            type="password"
            disabled={props.operation === "Atualizar"}
          />
          <FormHelperText id="senha-helper">{errors.senha}</FormHelperText>
        </FormControl>
        <div className={classes.buttons}>
          <Fab
            variant="extended"
            color="primary"
            aria-label="salvar"
            size="small"
            onClick={handleSubmit}
          >
            <Save className={classes.btnMargin} />
            <Typography variant="inherit" className={classes.contentSpacer}>
              Salvar
            </Typography>
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
  },
  contentSpacer: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));
