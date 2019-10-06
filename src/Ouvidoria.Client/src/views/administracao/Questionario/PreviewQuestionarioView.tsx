import {
  makeStyles,
  Container,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps } from "react-router";
import { bindActionCreators, Dispatch } from "redux";
import TipoPergunta from "../../../application/enums/TipoPergunta";
import Params from "../../../application/types/RouteParams";
import InputField from "../../../components/common/formFields/InputField";
import Questionario from "../../../models/Questionario/Questionario";
import QuestionarioApi from "../../../services/QuestionarioApi";
import { IApplicationState } from "../../../store";
import * as DialogMessagesActions from "../../../store/ducks/dialogMessages/DialogMessagesActions";
import * as LoadingActions from "../../../store/ducks/loading/LoadingActions";

interface IState {
  quiz: Questionario | null;
  id: number | null;
  success: boolean;
}

interface IStateProps {
  isOpen: boolean;
}

interface IDispatchToProps {
  setLoading(): void;
  setLoaded(): void;
  open(title: string, messages: string[]): void;
}

type Props = IDispatchToProps & RouteComponentProps<Params> & IStateProps;

function PreviewQuestionario(props: Props) {
  const [state, setState] = useState<IState>({
    quiz: null,
    id: null,
    success: true
  });
  const classes = useStyles(0);
  const { setLoaded, setLoading, open } = props;

  useEffect(() => {
    let id = Number(props.match.params.id);
    setState(prevState => ({ ...prevState, id }));

    async function getQuiz() {
      setLoading();
      let result = await QuestionarioApi.get(id);

      if (result.success) {
        setState(prevState => ({ ...prevState, quiz: result.data! }));

        if (result.data === null) {
          open("Aviso", ["Registro não encontrado"]);
          setState(prevState => ({ ...prevState, success: false }));
        }
      }
      setLoaded();
    }
    if (!isNaN(id)) getQuiz();
  },        [props.match, setLoading, open, setLoaded]);

  return props.match.params.id === null ? (
    <Redirect to="/" />
  ) : state.id !== null && isNaN(state.id) ? (
    <Redirect to="/questionarios/lista" />
  ) : !props.isOpen && !state.success ? (
    <Redirect to="/questionarios/lista" />
  ) : state.quiz === null ? (
    <></>
  ) : (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        <Typography className={classes.pageTitle} variant="h4">
          Preview questionário
        </Typography>
        <Typography className={classes.quizTitle} variant="body1">
          Título: {state.quiz!.titulo}
        </Typography>
        <Typography className={classes.quizDescription} variant="body2">
          Descrição: {state.quiz!.descricao}
        </Typography>

        {state.quiz!.perguntas.map((question, index) => (
          <div key={question.id} className={classes.questions}>
            <Typography key={question.id}>{`${index + 1} - ${
              question.descricao
            }`}</Typography>
            {question.tipo === TipoPergunta.Dissertativa ? (
              <InputField
                error={""}
                label="Resposta"
                name={""}
                onChange={() => {}}
                value={""}
                multiline
                disabled
              />
            ) : (
              <>
                {question.opcoes.map(option => (
                  <FormControl key={option.id} component="fieldset">
                    <RadioGroup
                      aria-label="option"
                      name={""}
                      value={""}
                      onChange={() => {}}
                      row
                    >
                      <FormControlLabel
                        value={option.id}
                        control={<Radio size="small" color="secondary" />}
                        label={option.descricao}
                        labelPlacement="end"
                      />
                    </RadioGroup>
                  </FormControl>
                ))}
              </>
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
    Object.assign({}, DialogMessagesActions, LoadingActions),
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreviewQuestionario);

const useStyles = makeStyles(() => ({
  paper: {
    padding: 20
  },
  questions: {
    padding: 20,
    border: "1px solid #ddd",
    borderRadius: 5,
    marginTop: 10
  },
  pageTitle: {
    textAlign: "center"
  },
  quizTitle: {
    marginTop: 20
  },
  quizDescription: {
    margin: "20px 0"
  },
  error: {
    color: "#ff1744"
  },
  submit: {
    marginTop: 20,
    display: "flex",
    justifyContent: "flex-end"
  }
}));
