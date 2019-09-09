import {
  makeStyles,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Paper,
  Radio,
  RadioGroup,
  Typography
} from "@material-ui/core";
import React, { useEffect, useState, ChangeEvent } from "react";
import { connect } from "react-redux";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import TipoPergunta from "../../application/enums/TipoPergunta";
import Params from "../../application/types/RouteParams";
import InputField from "../../components/common/formFields/InputField";
import SubmitButton from "../../components/common/formFields/SubmitButton";
import Questionario from "../../models/Questionario/Questionario";
import CadastroQuestionarioResposta from "../../models/QuestionarioResposta/CadastroQuestionarioResposta";
import ICadastroResposta from "../../models/Resposta/CadastroResposta";
import QuestionarioApi from "../../services/QuestionarioApi";
import * as MessageBoxActions from "../../store/ducks/dialogMessages/DialogMessagesActions";
import * as Validations from "../../utils/Validations";

interface IDispatchProps {
  open(title: string, messages: string[]): void;
}

interface IState {
  quiz: Questionario | null;
  id: number | null;
  validQuiz: boolean;
  answer: CadastroQuestionarioResposta | null;
  errors: string[];
  loading: boolean;
  success: boolean;
}

const initialState: IState = {
  quiz: null,
  id: null,
  validQuiz: true,
  answer: null,
  errors: [],
  loading: false,
  success: false
};

type Props = IDispatchProps & RouteComponentProps<Params>;

function ResponderQuestionario(props: Props) {
  const [state, setState] = useState(initialState);
  const classes = useStyles();

  useEffect(() => {
    let id = Number(props.match.params.id);
    setState(prevState => {
      return { ...prevState, id };
    });
  },        [props.match]);

  useEffect(() => {
    if (state.id === null) return;
    if (!isNaN(state.id)) {
      async function getQuiz() {
        let validQuiz = true;
        let userResult = await QuestionarioApi.IsUserAbleToAnswer(state.id!);

        if (!userResult.success) {
          validQuiz = false;
        } else {
          let result = await QuestionarioApi.get(state.id!);

          if (!result.success) {
            validQuiz = false;
          } else {
            setState(prevState => {
              return { ...prevState, quiz: result.data! };
            });
          }
        }
        if (!validQuiz)
          setState(prevState => {
            return { ...prevState, validQuiz };
          });
      }
      getQuiz();
    }
  },        [state.id]);

  useEffect(() => {
    if (state.quiz === null) return;
    let questions: ICadastroResposta[] = [];
    let errors: string[] = [];

    state.quiz.perguntas.forEach(question => {
      questions.push({ descricao: "", idOpcao: null, idPergunta: question.id });
      errors.push("");
    });

    let answer: CadastroQuestionarioResposta = {
      idQuestionario: state.quiz.id,
      respostas: questions
    };

    setState(prevState => {
      return {
        ...prevState,
        answer,
        errors
      };
    });
  },        [state.quiz]);

  const handleAnswerChange = (e: ChangeEvent<HTMLInputElement>) => {
    let questionId = Number(e.target.name);
    let value = e.target.value;

    setState(prevState => {
      return {
        ...prevState,
        answer: {
          ...prevState.answer!,
          respostas: prevState.answer!.respostas.map(ans =>
            questionId === ans.idPergunta ? { ...ans, descricao: value } : ans
          )
        }
      };
    });
  };

  const handleOptionChange = (questionIndex: number) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value;
    setState(prevState => {
      return {
        ...prevState,
        answer: {
          ...prevState.answer!,
          respostas: prevState.answer!.respostas.map((answer, answerIndex) =>
            answerIndex === questionIndex
              ? { ...answer, idOpcao: Number(value) }
              : answer
          )
        },
        errors: prevState.errors.map((error, errorIndex) =>
          errorIndex === questionIndex ? "" : error
        )
      };
    });
  };

  const validateAnswer = (answerIndex: number) => {
    let valid = true;
    let message = "";
    let answer = state.answer!.respostas[answerIndex];
    let question = state.quiz!.perguntas.find(x => x.id === answer.idPergunta);

    if (question!.tipo === TipoPergunta.Objetiva && answer.idOpcao === null) {
      valid = false;
      message = "Selecione uma opção";
    } else if (question!.tipo === TipoPergunta.Dissertativa) {
      if (!answer.descricao) {
        valid = false;
        message = "A resposta é obrigatória";
      } else if (!Validations.hasCorrectSize(answer.descricao, 2, 5000)) {
        valid = false;
        message = "A resposta deve ter entre 2 e 5000 caracteres";
      }
    }
    setState(prevState => {
      return {
        ...prevState,
        errors: prevState.errors.map((error, errorIndex) =>
          errorIndex === answerIndex ? message : error
        )
      };
    });

    return valid;
  };

  const validateForm = () => {
    let valid = true;

    state.answer!.respostas.forEach((answer, index) => {
      if (!validateAnswer(index)) valid = false;
    });

    return valid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    let success = false;

    setState(prevState => {
      return { ...prevState, loading: true };
    });

    let result = await QuestionarioApi.Reply(state.answer!);

    if (result.success) {
      success = true;
      props.open("Sucesso", ["Questionário respondido com sucesso!"]);
    } else {
      props.open("Erro ao salvar", result.messages);
    }

    setState(prevState => {
      return { ...prevState, loading: false, success };
    });
  };

  return state.id === null ? (
    <></>
  ) : isNaN(state.id) || !state.validQuiz ? (
    <Redirect to="/questionarios" />
  ) : state.quiz === null || state.answer === null ? (
    <></>
  ) : state.success ? (
    <Redirect to="/questionarios" />
  ) : (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        <Typography className={classes.pageTitle} variant="h4">
          Responder questionário
        </Typography>
        <Typography className={classes.quizTitle} variant="body1">
          Título: {state.quiz!.titulo}
        </Typography>
        <Typography className={classes.quizDescription} variant="body2">
          Descrição: {state.quiz!.descricao}
        </Typography>

        {state.quiz!.perguntas.map((question, index) => (
          <div className={classes.questions}>
            <Typography key={question.id}>{`${index + 1} - ${
              question.descricao
            }`}</Typography>
            {question.tipo === TipoPergunta.Dissertativa ? (
              <InputField
                error={state.errors[index]}
                label="Resposta"
                name={question.id.toString()}
                onChange={handleAnswerChange}
                value={state.answer!.respostas[index].descricao}
                multiline
                onBlur={() => validateAnswer(index)}
              />
            ) : (
              <>
                {question.opcoes.map(option => (
                  <FormControl key={option.id} component="fieldset">
                    <RadioGroup
                      aria-label="option"
                      name={state.answer!.respostas[
                        index
                      ].idPergunta.toString()}
                      value={state.answer!.respostas[index].idOpcao}
                      onChange={handleOptionChange(index)}
                      row
                    >
                      <FormControlLabel
                        value={option.id}
                        control={
                          <Radio
                            checked={
                              state.answer!.respostas[index].idOpcao ===
                              option.id
                            }
                            size="small"
                            color="secondary"
                          />
                        }
                        label={option.descricao}
                        labelPlacement="end"
                      />
                    </RadioGroup>
                  </FormControl>
                ))}
                {!!state.errors[index] && (
                  <FormHelperText
                    className={classes.error}
                    id={`${state.errors[index]}-helper`}
                  >
                    {state.errors[index]}
                  </FormHelperText>
                )}
              </>
            )}
          </div>
        ))}
        <div className={classes.submit}>
          <SubmitButton
            label="Enviar resposta"
            loading={state.loading}
            onSubmit={handleSubmit}
          />
        </div>
      </Paper>
    </Container>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(MessageBoxActions, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(ResponderQuestionario);



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
