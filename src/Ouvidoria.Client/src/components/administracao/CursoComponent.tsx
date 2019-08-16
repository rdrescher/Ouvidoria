import { Container, Typography } from "@material-ui/core";
import React, { useState, ChangeEvent, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import Curso from "../../models/Curso/Curso";
import Resultado from "../../models/Resultado";
import CursoApi from "../../services/CursoApi";
import * as DialogActions from "../../store/ducks/dialogDatatable/DialogActions";
import Operacao from "../../utils/Operacao";
import * as MessageBoxActions from "../../store/ducks/messageBox/MessageBoxActions";
import * as Validations from "../../utils/Validations";
import InputField from "../common/formFields/InputField";
import SaveButton from "../common/formFields/SaveButton";
import ErrorMessages from "../common/formFields/ErrorMessages";

interface IProps {
  class: Curso;
  operation: Operacao;
  handleUpdateData: (_class: Curso) => void;
}

interface IDispatchProps {
  closeDialog(): void;
  show(message: string): void;
}

interface IState {
  class: Curso;
  loading: boolean;
  serverErrors: string[];
  formError: string;
}

const initialState: IState = {
  class: { id: 0, nome: "" },
  loading: false,
  serverErrors: [],
  formError: ""
};

type Props = IProps & IDispatchProps;

function CursoComponent(props: Props) {
  const [state, setState] = useState<IState>({
    ...initialState,
    class: props.class
  });

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    let valid = true;
    let result: Resultado<Curso>;
    let operationMessage = "";

    if (state.class === props.class && props.operation !== "Deletar") return;
    if (!validateName() && props.operation !== "Deletar") valid = false;

    if (!valid) return;

    setState((prevState: IState) => {
      return { ...prevState, loading: true };
    });

    switch (props.operation) {
      case "Criar":
        result = await CursoApi.entity.create(state.class);
        operationMessage = "criado";
        break;
      case "Atualizar":
        result = await CursoApi.entity.update(props.class.id, state.class);
        operationMessage = "atualizado";
        break;
      case "Deletar":
        result = await CursoApi.entity.delete(props.class.id);
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
      props.show(`Curso ${operationMessage} com sucesso!`);
    } else {
      setState((prevState: IState) => {
        return { ...prevState, serverErrors: result.messages, loading: false };
      });
    }
  };

  const validateName = (): boolean => {
    let name = state.class.nome;
    if (!name) {
      setState((prevState: IState) => {
        return { ...prevState, formError: "Insira o nome do curso" };
      });
      return false;
    } else if (!Validations.hasCorrectSize(name, 2, 50)) {
      setState((prevState: IState) => {
        return {
          ...prevState,
          formError: "O nome do curso deve possuir entre 2 e 50 caracteres"
        };
      });
      return false;
    }
    return true;
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    setState((prevState: IState) => {
      return {
        ...prevState,
        class: { ...prevState.class, nome: value }
      };
    });
  };

  return (
    <>
      <Container maxWidth="lg">
        <form style={{ marginTop: 30, marginBottom: 10 }}>
          {(props.operation === "Deletar" && (
            <Typography variant="body1">
              Você tem certeza que deseja excluir curso {props.class.nome}{" "}
              permanentemente?
            </Typography>
          )) || (
            <InputField
              name="nome"
              label="Curso"
              value={state.class.nome}
              onChange={handleNameChange}
              onBlur={validateName}
              error={state.formError}
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
)(CursoComponent);
