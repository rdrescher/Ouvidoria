import {
  Container,
  Divider,
  List,
  ListItem,
  Paper,
  Theme,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import TipoPergunta from "../../application/enums/TipoPergunta";
import Params from "../../application/types/RouteParams";
import GraficoPizza from "../../components/administracao/questionario/GraficoPizza";
import QuestionarioReport from "../../models/Questionario/QuestionarioReport";
import QuestionarioApi from "../../services/QuestionarioApi";
import { IApplicationState } from "../../store";
import * as MessageBoxActions from "../../store/ducks/dialogMessages/DialogMessagesActions";
import * as LoadingActions from "../../store/ducks/loading/LoadingActions";

interface IDispatchProps {
  open(title: string, messages: string[]): void;
  setLoading(): void;
  setLoaded(): void;
}

interface IStateProps {
  isOpen: boolean;
}

interface IState {
  isValid: boolean;
  quiz: QuestionarioReport | null;
}

const initialState: IState = {
  isValid: true,
  quiz: null
};

type Props = IDispatchProps & IStateProps & RouteComponentProps<Params>;

function RelatorioQuestionarioView(props: Props) {
  const [state, setState] = useState(initialState);
  const { setLoaded, setLoading, match, open } = props;
  const classes = useStyles();

  useEffect(() => {
    const id = Number(match.params.id);

    if (id === null || isNaN(id) || id <= 0) {
      setState(prevState => ({ ...prevState, isValid: false }));
    } else {
      async function getQuizForReport() {
        setLoading();

        const result = await QuestionarioApi.getForReport(id);

        if (result.success) {
          setState(prevState => ({ ...prevState, quiz: result.data! }));
          setLoaded();
        } else {
          open("Alerta", result.messages);
          setLoaded();
          setState(prevState => ({ ...prevState, isValid: false }));
        }
      }

      getQuizForReport();
    }
  },        [setLoaded, setLoading, match, open]);

  return (state.isValid && state.quiz === null) || props.isOpen ? (
    <></>
  ) : !state.isValid && !props.isOpen ? (
    <Redirect to="/questionarios/lista" />
  ) : (
    <Container>
      <Paper className={classes.container}>
        <Typography variant="h4" align="center" paragraph>
          Relatório do questionário
        </Typography>
        <Typography variant="body1" paragraph>
          Título: {state.quiz!.titulo}
        </Typography>
        <Typography variant="body2" paragraph>
          Descrição: {state.quiz!.descricao}
        </Typography>
        <Typography variant="h5" paragraph align="center">
          Respostas
        </Typography>
        {state.quiz!.perguntas.map((question, index) => (
          <div key={index} className={classes.questionContainer}>
            <Typography variant="h6" paragraph>{`${index + 1} - ${
              question.titulo
            }`}</Typography>
            {question.tipoPergunta === TipoPergunta.Dissertativa ? (
              <List component="ol">
                {question.respostas.map((answer, answerIndex) => (
                  <div  key={answerIndex}>
                    <ListItem className={classes.listItem}>{answer}</ListItem>
                    {answerIndex + 1 !== question.respostas.length && (
                      <Divider className={classes.divider} />
                    )}
                  </div>
                ))}
              </List>
            ) : (
              <GraficoPizza data={question.opcoes} />
            )}
          </div>
        ))}
      </Paper>
    </Container>
  );
}

const mapStateToProps = (state: IApplicationState) => ({
  isOpen: state.DialogMessagesReducer.isOpen
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    Object.assign({}, MessageBoxActions, LoadingActions),
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RelatorioQuestionarioView);

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: 20
  },
  questionContainer: {
    padding: 20,
    border: "1px solid #ddd",
    borderRadius: 5,
    marginBottom: 20
  },
  divider: {
    height: 3
  },
  listItem: {
    background: "#f7f7f7",
    borderRadius: 5
  }
}));
