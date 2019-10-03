import { MUIDataTableColumnDef } from "mui-datatables";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect, RouteComponentProps } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import Params from "../../../application/types/RouteParams";
import DataTable from "../../../components/common/dataTable/DataTable";
import QuestionarioApi from "../../../services/QuestionarioApi";
import { IApplicationState } from "../../../store";
import * as LoadingActions from "../../../store/ducks/loading/LoadingActions";

interface IDispatchProps {
  open(title: string, messages: string[]): void;
}

interface IStateProps {
  isOpen: boolean;
}

interface IState {
  id: number | null;
  validId: boolean;
}

const initialState: IState = {
  id: null,
  validId: true
};

const headers: MUIDataTableColumnDef[] = [
  { label: "Id", name: "id" },
  { label: "Usuário", name: "usuario" },
  { label: "Data da Resposta", name: "dataInsercao" },
  { label: "Ações", name: "", options: {
    customBodyRender: (a, tbl) =>
      tbl.tableData.length > 0 && (
        <Link to={`/questionarios/resposta/${tbl.rowData[0]}`}>
          Visualizar
        </Link>
      )
  }}
];

type Props = IDispatchProps & RouteComponentProps<Params> & IStateProps;

function ListaRespostasPorQuestinarioView(props: Props) {
  const { open } = props;
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const id = Number(props.match.params.id);
    if (id === null || id <= 0 || isNaN(id)) {
      open("Aviso", ["O parâmetro informado é inválido"]);
      setState(prevState => ({ ...prevState, validId: false }));
    } else {
      setState(prevState => ({ ...prevState, id }));
    }
  },        [props.match.params.id, open]);

  async function getQuizAnswers() {
    return await QuestionarioApi.GetAnswersByQuiz(state.id!);
  }

  return !state.validId && !props.isOpen ? (
    <Redirect to="/questionarios/lista" />
  ) : state.id === null ? (
    <></>
  ) : (
    <DataTable
      title="Respostas do Questionário"
      data={getQuizAnswers}
      columns={headers}
    />
  );
}

const mapStateToProps = (state: IApplicationState) => ({
  isOpen: state.DialogMessagesReducer.isOpen
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(Object.assign({}, LoadingActions), dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListaRespostasPorQuestinarioView);
