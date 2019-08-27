import { makeStyles, Container, Typography } from "@material-ui/core";
import React, { useEffect, useState, ChangeEvent, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import AtualizacaoDepartamento from "../../models/Departamento/AtualizacaoDepartamento";
import CadastroDepartamento from "../../models/Departamento/CadastroDepartamento";
import Departamento from "../../models/Departamento/Departamento";
import GenericList from "../../models/GenericList";
import Resultado from "../../models/Resultado";
import DepartamentoApi from "../../services/DepartamentoApi";
import UsuarioApi from "../../services/UsuarioApi";
import * as DialogActions from "../../store/ducks/dialogDatatable/DialogActions";
import * as MessageBoxActions from "../../store/ducks/messageBox/MessageBoxActions";
import Operacao from "../../utils/Operacao";
import * as Validations from "../../utils/Validations";
import ErrorMessages from "../common/formFields/ErrorMessages";
import InputField from "../common/formFields/InputField";
import SelectField from "../common/formFields/SelectField";
import SubmitButton from "../common/formFields/SubmitButton";

interface IProps {
  department: Departamento;
  operation: Operacao;
  handleUpdateData: (department: Departamento) => void;
}

interface IDispatchProps {
  closeDialog(): void;
  show(message: string): void;
}

interface IState {
  department: Departamento;
  loading: boolean;
  serverErrors: string[];
  formError: string;
  userList: GenericList[];
}

const initialState: IState = {
  department: {
    id: 0,
    nome: "",
    usuarioResponsavel: "",
    idUsuarioResponsavel: null
  },
  loading: false,
  serverErrors: [],
  formError: "",
  userList: []
};

type Props = IProps & IDispatchProps;

function DepartamentoComponent(props: Props) {
  const [state, setState] = useState({
    ...initialState,
    department: props.department
  });
  const classes = useStyles();

  useEffect(() => {
    async function getUserList() {
      let result = await UsuarioApi.GetGenericList();
      if (result.success) {
        setState((prevState: IState) => {
          return {
            ...prevState,
            userList: result.data!
          };
        });
      }
    }

    getUserList();
  },               []);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setState((prevState: IState) => {
      return {
        ...prevState,
        department: { ...prevState.department, nome: value }
      };
    });
  };

  const validateName = (): boolean => {
    let name = state.department.nome;
    if (name.length === 0) {
      setState((prevState: IState) => {
        return { ...prevState, formError: "Insira o nome do departamento" };
      });
      return false;
    } else if (!Validations.hasCorrectSize(name, 2, 50)) {
      setState((prevState: IState) => {
        return {
          ...prevState,
          formError:
            "O nome do departamento deve possuir entre 2 e 50 caracteres"
        };
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    let valid = true;
    let operationMessage = "";
    if (state.department === props.department && props.operation !== "Deletar")
      return;
    if (!validateName() && props.operation !== "Deletar") valid = false;

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
        operationMessage = "criado";
        break;
      case "Atualizar":
        result = await DepartamentoApi.update(
          props.department.id,
          state.department as AtualizacaoDepartamento
        );
        operationMessage = "atualizado";
        break;
      case "Deletar":
        result = await DepartamentoApi.entity.delete(props.department.id);
        operationMessage = "excluído";
        break;
      default:
        result = { data: null, messages: [], success: false };
        break;
    }

    if (result.success) {
      setState((prevState: IState) => {
        return { ...prevState, loading: false };
      });
      props.handleUpdateData(result.data!);
      props.closeDialog();
      props.show(`Departamento ${operationMessage} com sucesso!`);
    } else {
      setState((prevState: IState) => {
        return { ...prevState, serverErrors: result.messages, loading: false };
      });
    }
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    let name = e.target.name;
    let value = e.target.value;
    setState((prevState: IState) => {
      return {
        ...prevState,
        department: {
          ...prevState.department,
          [name]: value || null
        }
      };
    });
  };

  return (
    <>
      <Container maxWidth="lg">
        <form className={classes.form}>
          {(props.operation === "Deletar" && (
            <Typography variant="body2">
              Você tem certeza que deseja excluir departamento{" "}
              {props.department.nome} permanentemente?
            </Typography>
          )) || (
            <>
              <InputField
                name="nome"
                label="Nome"
                value={state.department.nome}
                onChange={handleNameChange}
                error={state.formError}
                onBlur={validateName}
              />
              <SelectField
                name="idUsuarioResponsavel"
                label="Usuário Responsável"
                data={state.userList}
                value={state.department.idUsuarioResponsavel}
                onChange={handleSelectChange}
                nullable={true}
              />
            </>
          )}
          {!!state.serverErrors.length && (
            <ErrorMessages errors={state.serverErrors} />
          )}
          <div className={classes.buttons}>
            <SubmitButton
              loading={state.loading}
              onSubmit={handleSubmit}
              label="Salvar"
              saveIcon={true}
            />
          </div>
        </form>
      </Container>
    </>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    Object.assign({}, MessageBoxActions, DialogActions),
    dispatch
  );
export default connect(
  null,
  mapDispatchToProps
)(DepartamentoComponent);

const useStyles = makeStyles(() => ({
  buttons: {
    marginBottom: "1.25em",
    marginTop: ".5em",
    display: "flex",
    justifyContent: "flex-end"
  },
  form: {
    marginTop: 30,
    marginBottom: 10
  }
}));
