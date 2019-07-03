import React, { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
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
  Theme,
  CircularProgress,
  Select,
  MenuItem,
  NativeSelect,
  FormControlLabel,
  Checkbox,
  Divider
} from "@material-ui/core";
import { Save } from "@material-ui/icons";
import Curso from "../../models/Curso";
import { green, red } from "@material-ui/core/colors";
import CursoApi from "../../services/CursoApi";
import { MenuProps } from "@material-ui/core/Menu";

interface IProps {
  user: Usuario;
  operation: Operacao;
}

interface IState {
  user: Usuario;
  loading: boolean;
  classes: Curso[];
  errors: string;
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
  const [state, setState] = useState<IState>({
    user: props.user,
    loading: false,
    classes: [],
    errors: ""
  });
  const [errors, setErrors] = useState<IErrors>(initialErrorsState);
  const classes = useStyles();

  useEffect(() => {
    async function getClasses() {
      let result = await CursoApi.entity.get();
      let classes: Curso[];
      if (!result.success) {
        classes = [];
      } else {
        classes = result.data!;
      }
      setState((prevState: IState) => {
        return { ...prevState, classes: classes };
      });
    }
    getClasses();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    let value = e.target.value;
    setState({ ...state, user: { ...state.user, [name]: value } });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    let name = e.target.name;
    let value = e.target.value;
    console.log(name, value);
    setState({ ...state, user: { ...state.user, [name]: value } });
  };

  const handleTelephoneCPFChange = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    let value = e.target.value;
    let regex = /^\d+$/;
    if (regex.test(String(value)))
      setState({ ...state, user: { ...state.user, [name]: value } });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { user } = state;
    let valid = true;

    if (!validateName(user.nome)) valid = false;
    if (!validateEmail(user.email)) valid = false;
    if (!validateTelephone(user.telefone)) valid = false;
    if (!validateCPF(user.cpf)) valid = false;
    if (!validatePassword(user.senha)) valid = false;

    if (user === props.user || !valid) return;
    setState((prevState: IState) => {
      return { ...prevState, loading: true, errors: "Erro ao cadastrar usuário" };
    });
    let result = "";
  };

  const validateName = (name: string): boolean => {
    if (!name) {
      setErrors((prevState: IErrors) => {
        return { ...prevState, nome: "Por favor, informe o nome" };
      });

      return false;
    } else {
      if (name.length < 2 || name.length > 100) {
        setErrors((prevState: IErrors) => {
          return {
            ...prevState,
            nome: "O nome deve conter entre 2 e 100 caracteres"
          };
        });
        return false;
      }
    }
    setErrors((prevState: IErrors) => {
      return { ...prevState, nome: "" };
    });
    return true;
  };

  const validateEmail = (email: string): boolean => {
    if (!email) {
      setErrors((prevState: IErrors) => {
        return { ...prevState, email: "Por favor, informe o email" };
      });
      return false;
    } else {
      let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!regex.test(String(email).toLowerCase())) {
        setErrors((prevState: IErrors) => {
          return { ...prevState, email: "O email deve ser válido" };
        });
        return false;
      }
    }
    setErrors((prevState: IErrors) => {
      return { ...prevState, email: "" };
    });
    return true;
  };

  const validateTelephone = (phone: string): boolean => {
    let regex = /^\d+$/;
    if (phone && !regex.test(String(phone))) {
      setErrors((prevState: IErrors) => {
        return {
          ...prevState,
          telefone: "O telefone deve conter apenas números"
        };
      });
      return false;
    } else if (phone && (phone.length < 9 || phone.length > 15)) {
      setErrors((prevState: IErrors) => {
        return {
          ...prevState,
          telefone: "O telefone deve conter entre 9 e 15 caracteres"
        };
      });
      return false;
    }
    setErrors((prevState: IErrors) => {
      return { ...prevState, telefone: "" };
    });
    return true;
  };

  const validateCPF = (cpf: string): boolean => {
    let regex = /^\d+$/;
    if (!cpf) {
      setErrors((prevState: IErrors) => {
        return { ...prevState, cpf: "Por favor, informe o cpf" };
      });
      return false;
    } else {
      if (!regex.test(String(cpf))) {
        setErrors((prevState: IErrors) => {
          return {
            ...prevState,
            cpf: "O CPF deve conter apenas números"
          };
        });
        return false;
      } else {
        let Soma = 0;
        let Resto: number;
        let valid = true;
        if (cpf === "00000000000") {
          valid = false;
        } else {
          for (let i = 1; i <= 9; i++)
            Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
          Resto = (Soma * 10) % 11;

          if (Resto === 10 || Resto === 11) Resto = 0;
          if (Resto !== parseInt(cpf.substring(9, 10))) {
            valid = false;
          } else {
            Soma = 0;
            for (let i = 1; i <= 10; i++)
              Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
            Resto = (Soma * 10) % 11;

            if (Resto === 10 || Resto === 11) Resto = 0;
            if (Resto !== parseInt(cpf.substring(10, 11))) valid = false;
          }
        }
        if (!valid) {
          setErrors((prevState: IErrors) => {
            return {
              ...prevState,
              cpf: "O CPF informado é inválido"
            };
          });
          return false;
        }
        setErrors((prevState: IErrors) => {
          return { ...prevState, cpf: "" };
        });
        return true;
      }
    }
  };

  const validatePassword = (password: string): boolean => {
    if (!password) {
      setErrors((prevState: IErrors) => {
        return { ...prevState, senha: "Por favor, informe a senha" };
      });
      return false;
    } else {
      if (password.length < 6) {
        setErrors((prevState: IErrors) => {
          return {
            ...prevState,
            senha: "A senha deve conter ao menos 6 caracteres"
          };
        });
        return false;
      }
    }
    setErrors((prevState: IErrors) => {
      return { ...prevState, senha: "" };
    });
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
            onBlur={() => validateName(state.user.nome)}
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
            onBlur={() => validateEmail(state.user.email)}
          />
          <FormHelperText id="email-helper">{errors.email}</FormHelperText>
        </FormControl>
        <FormControl fullWidth error={!!errors.cpf}>
          <InputLabel htmlFor="cpf">CPF</InputLabel>
          <Input
            name="cpf"
            aria-describedby="cpf-helper"
            fullWidth
            value={state.user.cpf || ""}
            onChange={handleTelephoneCPFChange}
            onBlur={() => validateCPF(state.user.cpf)}
          />
          <FormHelperText id="cpf-helper">{errors.cpf}</FormHelperText>
        </FormControl>
        <FormControl fullWidth error={!!errors.telefone}>
          <InputLabel htmlFor="telefone">Telefone</InputLabel>
          <Input
            name="telefone"
            aria-describedby="telefone-helper"
            fullWidth
            value={state.user.telefone || ""}
            onChange={handleTelephoneCPFChange}
            onBlur={() => validateTelephone(state.user.telefone)}
          />
          <FormHelperText id="telefone-helper">
            {errors.telefone}
          </FormHelperText>
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
            onBlur={() => validatePassword(state.user.senha)}
          />
          <FormHelperText id="senha-helper">{errors.senha}</FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="idCurso">Curso</InputLabel>
          <NativeSelect
            name="idCurso"
            fullWidth
            value={state.user.idCurso}
            onChange={handleSelectChange}
          >
            {state.classes.map(_class => (
              <option value={_class.id} key={_class.id}>
                {_class.nome}
              </option>
            ))}
          </NativeSelect>
          <FormHelperText>{""}</FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel htmlFor="usuarioPerfil">Perfil</InputLabel>
          <NativeSelect
            name="usuarioPerfil"
            fullWidth
            value={state.user.usuarioPerfil}
            onChange={handleSelectChange}
          >
            {Object.keys(UsuarioPerfil)
              .filter(user => isNaN(Number(user)) === false)
              .map(user => (
                <option value={Number(user)} key={Number(user)}>
                  {UsuarioPerfil[Number(user)]}
                </option>
              ))}
          </NativeSelect>
          <FormHelperText>{""}</FormHelperText>
        </FormControl>
        <FormControl fullWidth>
          <FormControlLabel
            control={
              <Checkbox
                checked={state.user.ativo}
                onChange={handleInputChange}
                value="ativo"
                name="ativo"
              />
            }
            label="Cadastro ativo"
          />
        </FormControl>
        
        {state.errors && (
          <div className={classes.errors}>
            <Typography variant="h6">Erro ao salvar</Typography>
            <Divider className={classes.divider} />
            <Typography variant="body2">{state.errors}</Typography>
          </div>
        )}

        <div className={classes.buttons}>
          <div className={classes.wrapper}>
            <Fab
              variant="extended"
              color="primary"
              aria-label="salvar"
              size="small"
              onClick={handleSubmit}
              disabled={state.loading}
            >
              <Save className={classes.btnMargin} />
              <Typography variant="inherit" className={classes.contentSpacer}>
                Salvar
              </Typography>
            </Fab>
            {state.loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
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
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative"
  },
  errors: {
    backgroundColor: "rgba(239, 83, 80, 0.7)",
    width: "100%",
    border: 1,
    borderRadius: 5,
    marginTop: 20,
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20
  },
  divider: {
    marginBottom: 15
  }
}));
