import {
  makeStyles,
  Container,
  Fab,
  Paper,
  Tooltip,
  Typography
} from "@material-ui/core";
import { Reply } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import QuestionarioPreview from "../../models/Questionario/QuestionarioPreview";
import QuestionarioApi from "../../services/QuestionarioApi";
import * as LoadingActions from "../../store/ducks/loading/LoadingActions";

interface IDispatchToProps {
  setLoading: () => void;
  setLoaded: () => void;
}

interface IState {
  quizzes: QuestionarioPreview[];
}

const initialState: IState = {
  quizzes: []
};

function Questionarios(props: IDispatchToProps) {
  const [state, setState] = useState(initialState);
  const classes = useStyles();
  const { setLoaded, setLoading } = props;

  useEffect(() => {
    async function getQuizzesPreview() {
      setLoading();
      let result = await QuestionarioApi.getPreviewList();
      setLoaded();
      setState(prevState => {
        return { ...prevState, quizzes: result.data! };
      });
    }

    getQuizzesPreview();
  }, [setLoaded, setLoading]);

  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        <Typography className={classes.pageTitle} variant="h4">
          Questionários
        </Typography>
        {state.quizzes.length === 0 ? (
          <Typography variant="body1" className={classes.noQuizzes}>
            Não há questionários disponíveis para você responder no momento.
          </Typography>
        ) : (
          state.quizzes.map(quiz => (
            <div key={quiz.id} className={classes.item}>
              <div className={classes.description}>
                <Typography variant="h5">
                  {quiz.titulo.length > 50
                    ? `${quiz.titulo.substring(0, 50)}...`
                    : quiz.titulo}
                </Typography>
                <Typography className={classes.quizDescription} variant="body2">
                  Descrição:{" "}
                  {quiz.descricao.length > 100
                    ? `${quiz.descricao.substring(0, 100)}...`
                    : quiz.descricao}
                </Typography>
                <Typography variant="subtitle1">
                  Disponível até: {quiz.dataFim}
                </Typography>
              </div>
              <Tooltip title="Responder">
                <Link to={`/questionarios/responder/${quiz.id}`}>
                  <Fab
                    size="medium"
                    color="secondary"
                    className={classes.button}
                  >
                    <Reply />
                  </Fab>
                </Link>
              </Tooltip>
            </div>
          ))
        )}
      </Paper>
    </Container>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(LoadingActions, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(Questionarios);

const useStyles = makeStyles(() => ({
  paper: {
    padding: 20
  },
  item: {
    width: "100%",
    display: "flex",
    padding: 20,
    alignItems: "center",
    marginTop: 20,
    border: "1px solid #ddd",
    borderRadius: 5
  },
  description: {
    flexGrow: 1
  },
  button: {
    color: "white",
    minWidth: 46
  },
  pageTitle: {
    textAlign: "center"
  },
  quizDescription: {
    margin: "10px 0"
  },
  noQuizzes: {
    textAlign: "center",
    marginTop: 20
  }
}));
