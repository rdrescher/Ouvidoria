import { Container, Typography } from "@material-ui/core";
import React, { useState, ChangeEvent, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import AtualizacaoDepartamento from "../../models/Departamento/AtualizacaoDepartamento";
import CadastroDepartamento from "../../models/Departamento/CadastroDepartamento";
import Departamento from "../../models/Departamento/Departamento";
import Resultado from "../../models/Resultado";
import DepartamentoApi from "../../services/DepartamentoApi";
import * as DialogActions from "../../store/ducks/dialogDatatable/DialogActions";
import * as MessageBoxActions from "../../store/ducks/messageBox/MessageBoxActions";
import * as Validations from "../../utils/Validations";
import Operacao from "../../utils/Operacao";
import InputField from "../common/formFields/InputField";
import ErrorMessages from "../common/formFields/ErrorMessages";
import SaveButton from "../common/formFields/SaveButton";

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
  formError: ""
};

type Props = IProps & IDispatchProps;

function DepartamentoComponent(props: Props) {
  const [state, setState] = useState({
    ...initialState,
    department: props.department
  });

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

  return (
    <>
      <Container maxWidth="lg">
        <form style={{ marginTop: 30, marginBottom: 10 }}>
          {(props.operation === "Deletar" && (
            <Typography variant="body2">
              Você tem certeza que deseja excluir departamento{" "}
              {props.department.nome} permanentemente?
            </Typography>
          )) || (
            <InputField
              name="nome"
              label="Nome"
              value={state.department.nome}
              onChange={handleNameChange}
              error={state.formError}
              onBlur={validateName}
            />
          )}
          {!!state.serverErrors.length && (
            <ErrorMessages errors={state.serverErrors} />
          )}
          <SaveButton loading={state.loading} onSubmit={handleSubmit} />
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
