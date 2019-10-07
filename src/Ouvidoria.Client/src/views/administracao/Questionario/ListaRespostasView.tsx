import {
  makeStyles,
  Container,
  Divider,
  Paper,
  Typography
} from "@material-ui/core";
import { CalendarToday, Person } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import Params from "../../../application/types/RouteParams";
import QuestionarioRespostaDetail from "../../../models/QuestionarioResposta/QuestionarioRespostaDetail";
import QuestionarioApi from "../../../services/QuestionarioApi";
import * as DialogMessagesActions from "../../../store/ducks/dialogMessages/DialogMessagesActions";
import * as LoadingActions from "../../../store/ducks/loading/LoadingActions";
import { IApplicationState } from "../../../store/index";

interface IDispatchProps {
  setLoading(): void;
  setLoaded(): void;
  open(title: string, messages: string[]): void;
}

interface IStateProps {
  isOpen: boolean;
  loading: boolean;
}

interface IState {
  id: number | null;
  answer: Partial<QuestionarioRespostaDetail>;
  isValidAnswer: boolean;
}

const initialState: IState = {
  id: null,
  answer: {},
  isValidAnswer: true
};

type Props = IStateProps & IDispatchProps & RouteComponentProps<Params>;

function ListaRespostasView(props: Props) {
  const { setLoaded, setLoading, open, isOpen } = props;
  const [state, setState] = useState(initialState);
  const classes = useStyles();

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      id: Number(props.match.params.id)
    }));
  },        [props.match.params.id]);

  useEffect(() => {
    if (state.id === null) return;

    if (state.id <= 0 || isNaN(state.id)) {
      setState(prevState => ({ ...prevState, isValidAnswer: false }));
      return;
    }
    async function getAnswersById() {
      setLoading();
      const result = await QuestionarioApi.GetAnswersById(state.id!);
      setLoaded();

      if (result.success) {
        setState(prevState => ({ ...prevState, answer: result.data! }));
      } else {
        open("Atenção", result.messages);
        setState(prevState => ({ ...prevState, isValidAnswer: false }));
      }
    }

    getAnswersById();
  },        [setLoaded, setLoading, open, state.id]);

  return !state.isValidAnswer && !isOpen ? (
    <Redirect to="/questionarios/lista" />
  ) : (!state.isValidAnswer && isOpen) || state.id === null || props.loading ? (
    <></>
  ) : (
    <Container maxWidth="md">
      <Paper className={classes.container}>
        <Typography variant="h4" align="center" paragraph>
          Resposta do Usuário
        </Typography>
        <div className={classes.content}>
          <Typography variant="h6" paragraph>
            {state.answer.titulo}
          </Typography>
          <div className={classes.description}>
            <Person />
            <Typography variant="body2">{` ${state.answer.usuario}`}</Typography>
          </div>
          <div className={classes.description}>
            <CalendarToday />
            <Typography variant="body2">{` ${state.answer.dataCriacao}`}</Typography>
          </div>
          <Divider className={classes.divider} />
          <Typography variant="h5" align="center" className={classes.title}>
            Respostas
          </Typography>
          <div className={classes.content}>
            {state.answer.respostas !== undefined &&
              state.answer.respostas!.map((answer, index) => (
                <div className={classes.answer} key={index}>
                  <Typography
                    variant="body1"
                    align="justify"
                    className={classes.question}
                  >
                    {`${index + 1} - ${answer.pergunta}`}
                  </Typography>
                  <Typography variant="body2" align="justify">
                    {`R: ${answer.resposta}`}
                  </Typography>
                </div>
              ))}
          </div>
        </div>
      </Paper>
    </Container>
  );
}

const mapStateToProps = (state: IApplicationState) => ({
  isOpen: state.DialogMessagesReducer.isOpen,
  loading: state.LoadingReducer.loading
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    Object.assign({}, LoadingActions, DialogMessagesActions),
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListaRespostasView);

const useStyles = makeStyles(() => ({
  container: {
    padding: 20
  },
  content: {
    border: "solid 1px #ddd",
    borderRadius: 5,
    padding: 20
  },
  divider: {
    background: "#ddd",
    margin: "20px 0"
  },
  answer: {
    marginBottom: 20
  },
  question: {
    fontWeight: 500
  },
  title: {
    marginBottom: 20
  },
  description: {
    display: "flex",
    alignItems: "flex-end",
    marginBottom: 10,
    "& svg": {
      marginRight:5
    }
  }
}));
