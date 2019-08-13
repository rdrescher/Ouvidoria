import {
  makeStyles,
  CircularProgress,
  Container,
  Divider,
  Fab,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Theme,
  Typography
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { Done, Save } from "@material-ui/icons";
import clsx from "clsx";
import React, {
  useEffect,
  useState,
  ChangeEvent,
  KeyboardEvent,
  SyntheticEvent
} from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import AtualizacaoDepartamento from "../../models/Departamento/AtualizacaoDepartamento";
import CadastroDepartamento from "../../models/Departamento/CadastroDepartamento";
import Departamento from "../../models/Departamento/Departamento";
import Resultado from "../../models/Resultado";
import DepartamentoApi from "../../services/DepartamentoApi";
import * as DialogActions from "../../store/ducks/dialogDatatable/DialogActions";
import Operacao from "../../types/Operacao";

interface IProps {
  department: Departamento;
  operation: Operacao;
  handleUpdateData: (department: Departamento) => void;
}

interface IDispatchProps {
  closeDialog(): void;
}

interface IState {
  department: Departamento;
  loading: boolean;
  success: boolean;
  serverErrors: string[];
  formError: string;
}

const initialState: IState = {
  department: {
    id: 0,
    nome: "",
    usuarioResponsavel: "",
    idUsuarioResponsavel: null
  },
  loading: false,
  success: false,
  serverErrors: [],
  formError: ""
};

type Props = IProps & IDispatchProps;

function DepartamentoComponent(props: Props) {
  const [state, setState] = useState(initialState);
  const classes = useStyles(1);

  useEffect(() => {
    setState((prevState: IState) => {
      return {
        ...prevState,
        department: props.department
      };
    });
  },        []);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setState((prevState: IState) => {
      return {
        ...prevState,
        department: { ...prevState.department, nome: value }
      };
    });
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") e.preventDefault();
  };

  const validateName = (name: string): boolean => {
    if (name.length === 0) {
      setState((prevState: IState) => {
        return { ...prevState, formError: "Insira o nome do departamento" };
      });
      return false;
    } else if (name.length < 2 || name.length > 50) {
      setState((prevState: IState) => {
        return {
          ...prevState,
          formError:
            "O nome do departamento deve possuir entre dois e cinquênta caracteres"
        };
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    let valid = true;
    if (state.department === props.department && props.operation !== "Deletar")
      return;
    if (!validateName(state.department.nome) && props.operation !== "Deletar")
      valid = false;

    if (!valid) return;

    setState((prevState: IState) => {
      return { ...prevState, loading: true };
    });

    let result: Resultado<Departamento>;
    switch (props.operation) {
      case "Criar":
        result = await DepartamentoApi.create(
          state.department as CadastroDepartamento
        );
        break;
      case "Atualizar":
        result = await DepartamentoApi.update(
          props.department.id,
          state.department as AtualizacaoDepartamento
        );
        break;
      case "Deletar":
        result = await DepartamentoApi.entity.delete(props.department.id);
        break;
      default:
        result = { data: null, messages: [], success: false };
        break;
    }

    if (result.success) {
      setState((prevState: IState) => {
        return { ...prevState, loading: false, success: true };
      });
      props.handleUpdateData(result.data!);
      setTimeout(() => {
        props.closeDialog();
      },         1000);
    } else {
      setState((prevState: IState) => {
        return { ...prevState, serverErrors: result.messages, loading: false };
      });
    }
  };

  return (
    <>
      <Container maxWidth="lg">
        <form className={classes.form}>
          {(props.operation === "Deletar" && (
            <Typography variant="body2">
              Você tem certeza que deseja excluir curso {props.department.nome}{" "}
              permanentemente?
            </Typography>
          )) || (
            <FormControl fullWidth error={!!state.formError}>
              <InputLabel htmlFor="nome">Nome</InputLabel>
              <Input
                id="nome"
                aria-describedby="nome-helper"
                fullWidth
                value={state.department.nome}
                onChange={handleNameChange}
                onKeyPress={handleKeyPress}
                onBlur={() => validateName(state.department.nome)}
              />
              <FormHelperText id="nome-helper">
                {state.formError}
              </FormHelperText>
            </FormControl>
          )}
          {!!state.serverErrors.length && (
            <div className={classes.errors}>
              <Typography variant="h6">Erro ao salvar</Typography>
              <Divider className={classes.divider} />
              {state.serverErrors.map(error => (
                <Typography key={error} variant="body2">
                  {error}
                </Typography>
              ))}
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
                className={clsx({
                  [classes.buttonSuccess]: state.success
                })}
              >
                {(!state.success && (
                  <>
                    <Save className={classes.btnMargin} />
                    <Typography
                      variant="inherit"
                      className={classes.contentSpacer}
                    >
                      Salvar
                    </Typography>
                  </>
                )) || (
                  <>
                    <Done className={classes.btnMargin} />
                    <Typography
                      variant="inherit"
                      className={classes.contentSpacer}
                    >
                      Sucesso ao salvar
                    </Typography>
                  </>
                )}
              </Fab>
              {state.loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
            </div>
          </div>
        </form>
      </Container>
    </>
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
    backgroundColor: "rgba(239, 83, 80, 0.5)",
    color: "rgba(0, 0, 0, 0.6)",
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
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  form: {
    marginTop: 30,
    marginBottom: 30
  }
}));

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(DialogActions, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(DepartamentoComponent);
