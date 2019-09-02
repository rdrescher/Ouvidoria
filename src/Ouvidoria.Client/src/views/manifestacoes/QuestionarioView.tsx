import DateFnsUtils from "@date-io/date-fns";
import {
  useMediaQuery,
  Container,
  Divider,
  Fab,
  Paper,
  Theme,
  Typography
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import ptBR from "date-fns/locale/pt-BR";
import React, { useState, ChangeEvent } from "react";
import TipoPergunta from "../../application/enums/TipoPergunta";
import TipoPerguntaSelect from "../../components/common/formFields/nativeSelects/TipoPerguntaSelect";
import InputField from "../../components/common/formFields/InputField";
import SubmitButton from "../../components/common/formFields/SubmitButton";
import Opcao from "../../models/Opcao/Opcao";
import Pergunta from "../../models/Pergunta/Pergunta";
import CadastroQuestionario from "../../models/Questionario/CadastroQuestionario";
import QuestionarioApi from "../../services/QuestionarioApi";

interface IState {
  quiz: CadastroQuestionario;
}

const initialState: IState = {
  quiz: {
    titulo: "",
    dataFim: new Date(),
    dataInicio: new Date(),
    descricao: "",
    perguntas: [{ descricao: "", opcoes: [], tipo: TipoPergunta.Dissertativa }]
  }
};

const emptyQuestion: Pergunta = {
  descricao: "",
  tipo: TipoPergunta.Dissertativa,
  opcoes: []
};

const emptyOption: Opcao = {
  descricao: ""
};

export default function QuestionarioView() {
  const [state, setState] = useState<IState>(initialState);
  const classes = useStyles();
  const matches = useMediaQuery("(min-width:864px)");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    let value = e.target.value;
    setState((prevState: IState) => {
      return {
        ...prevState,
        quiz: { ...prevState.quiz, [name]: value }
      };
    });
  };

  const handleQuestionChange = (e: ChangeEvent<HTMLInputElement>) => {
    let quetionIndex = Number(e.target.name);
    let value = e.target.value;

    setState((prevState: IState) => {
      return {
        ...prevState,
        quiz: {
          ...prevState.quiz,
          perguntas: prevState.quiz.perguntas.map((item, index) =>
            index === quetionIndex ? { ...item, descricao: value } : item
          )
        }
      };
    });
  };

  const handleQuestionTypeChange = (_index: number) => (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    let value = Number(e.target.value);
    setState((prevState: IState) => {
      return {
        ...prevState,
        quiz: {
          ...prevState.quiz,
          perguntas: prevState.quiz.perguntas.map((item, index) =>
            index === _index
              ? {
                  ...item,
                  tipo: value,
                  opcoes:
                    value === TipoPergunta.Dissertativa
                      ? []
                      : [emptyOption, emptyOption]
                }
              : item
          )
        }
      };
    });
  };

  function handleStartDate(date: Date | null) {
    handleDateChange(date, "dataInicio");
    if (date != null && state.quiz.dataFim < date)
      handleDateChange(date, "dataFim");
  }

  function handleFinalDate(date: Date | null) {
    handleDateChange(date, "dataFim");
  }

  function handleDateChange(date: Date | null, name: string) {
    setState((prevState: IState) => {
      return {
        ...prevState,
        quiz: {
          ...prevState.quiz,
          [name]: date === null ? new Date() : date
        }
      };
    });
  }

  const handleOptionChange = (questionIndex: number) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let optionIndex = Number(e.target.name);
    let value = e.target.value;
    setState((prevState: IState) => {
      return {
        ...prevState,
        quiz: {
          ...prevState.quiz,
          perguntas: prevState.quiz.perguntas.map((question, index) =>
            index === questionIndex
              ? {
                  ...question,
                  opcoes: question.opcoes.map((option, indx) =>
                    indx === optionIndex
                      ? {
                          ...option,
                          descricao: value
                        }
                      : option
                  )
                }
              : question
          )
        }
      };
    });
  };

  const handleAddQuestion = () => {
    setState((prevState: IState) => {
      return {
        ...prevState,
        quiz: {
          ...prevState.quiz,
          perguntas: [...prevState.quiz.perguntas, emptyQuestion]
        }
      };
    });
  };

  const handleAddOption = (questionIndex: number) => () => {
    setState((prevState: IState) => {
      return {
        ...prevState,
        quiz: {
          ...prevState.quiz,
          perguntas: prevState.quiz.perguntas.map((question, qIndex) =>
            qIndex === questionIndex
              ? {
                  ...question,
                  opcoes: [...question.opcoes, emptyOption]
                }
              : question
          )
        }
      };
    });
  };

  const handleRemoveOption = (
    questionIndex: number,
    optionIndex: number
  ) => () => {
    setState((prevState: IState) => {
      return {
        ...prevState,
        quiz: {
          ...prevState.quiz,
          perguntas: prevState.quiz.perguntas.map((question, qIndex) =>
            qIndex === questionIndex
              ? {
                  ...question,
                  opcoes: question.opcoes
                    .slice(0, optionIndex)
                    .concat(
                      question.opcoes.slice(
                        optionIndex + 1,
                        question.opcoes.length
                      )
                    )
                }
              : question
          )
        }
      };
    });
  };

  const handleRemoveQuestion = (questionIndex: number) => () => {
    setState((prevState: IState) => {
      return {
        ...prevState,
        quiz: {
          ...prevState.quiz,
          perguntas: prevState.quiz.perguntas
            .slice(0, questionIndex)
            .concat(
              prevState.quiz.perguntas.slice(
                questionIndex + 1,
                prevState.quiz.perguntas.length
              )
            )
        }
      };
    });
  };

  async function handleSubmit() {
    console.log(await QuestionarioApi.create(state.quiz));
  }

  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        <Typography variant="h4">Novo Questionário</Typography>
        <InputField
          error=""
          label="Título"
          name="titulo"
          onChange={handleInputChange}
          value={state.quiz.titulo}
        />
        <InputField
          error=""
          label="Descrição"
          name="descricao"
          onChange={handleInputChange}
          value={state.quiz.descricao}
          multiline
        />
        <div className={classes.dates}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
            <DateTimePicker
              value={state.quiz.dataInicio}
              onChange={handleStartDate}
              variant="dialog"
              inputVariant="outlined"
              format="dd/MM/yyyy HH:mm"
              ampm={false}
              label="Data inicial"
              disableToolbar
              disablePast
              className={clsx(classes.date, matches ? classes.dateLeft : null)}
            />
            <DateTimePicker
              value={state.quiz.dataFim}
              onChange={handleFinalDate}
              variant="dialog"
              inputVariant="outlined"
              format="dd/MM/yyyy HH:mm"
              ampm={false}
              label="Data final"
              disableToolbar
              minDate={state.quiz.dataInicio}
              minDateMessage={"A data final deve ser maior que a data inicial"}
              className={clsx(classes.date, matches ? classes.dateRight : null)}
            />
          </MuiPickersUtilsProvider>
        </div>
      </Paper>
      <Paper className={classes.paper}>
        <Typography variant="h5">Perguntas</Typography>
        {state.quiz.perguntas.map((question, questionIndex) => (
          <div key={questionIndex} className={classes.questions}>
            <div className={classes.questionsHeader}>
              <Typography variant="h6" className={classes.question}>
                Pergunta nº {questionIndex + 1}
              </Typography>
              {state.quiz.perguntas.length > 1 && (
                <Fab
                  color="secondary"
                  size="medium"
                  className={classes.removeOption}
                  onClick={handleRemoveQuestion(questionIndex)}
                >
                  <Delete />
                </Fab>
              )}
            </div>
            <InputField
              name={questionIndex.toString()}
              label="Descrição"
              value={question.descricao}
              onChange={handleQuestionChange}
              error={""}
            />
            <TipoPerguntaSelect
              name={`options${questionIndex.toString()}`}
              index={questionIndex}
              label="Tipo da Pergunta"
              value={question.tipo}
              onChange={handleQuestionTypeChange(questionIndex)}
            />
            {question.tipo === TipoPergunta.Objetiva && (
              <>
                <Divider className={classes.divider} />
                <div className={classes.optionsHeader}>
                  <Typography variant="h6">Opções</Typography>
                  <Fab
                    variant="extended"
                    color="secondary"
                    size="medium"
                    onClick={handleAddOption(questionIndex)}
                  >
                    <Typography
                      variant="inherit"
                      color="textSecondary"
                      className={classes.contentSpacer}
                    >
                      Nova Opção
                    </Typography>
                  </Fab>
                </div>
                <div className={classes.options}>
                  {question.opcoes.map((option, optionIndex) => (
                    <div key={optionIndex} className={classes.optionContent}>
                      <div className={classes.option}>
                        <InputField
                          value={option.descricao}
                          error=""
                          label={`Opção nº ${optionIndex + 1}`}
                          name={optionIndex.toString()}
                          onChange={handleOptionChange(questionIndex)}
                        />
                      </div>
                      {state.quiz.perguntas[questionIndex].opcoes.length >
                        2 && (
                        <Fab
                          color="secondary"
                          className={classes.removeOption}
                          onClick={handleRemoveOption(
                            questionIndex,
                            optionIndex
                          )}
                        >
                          <Delete />
                        </Fab>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </Paper>
      <div className={classes.buttons}>
        <div className={classes.wrapper}>
          <Fab
            variant="extended"
            color="secondary"
            aria-label="nova-pergunta"
            size="medium"
            onClick={handleAddQuestion}
          >
            <Typography
              variant="inherit"
              color="textSecondary"
              className={classes.contentSpacer}
            >
              Nova Pergunta
            </Typography>
          </Fab>
        </div>
        <SubmitButton
          label="Salvar Questionário"
          loading={false}
          onSubmit={handleSubmit}
        />
      </div>
    </Container>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: 20,
    textAlign: "center",
    marginTop: 20
  },
  dates: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  date: {
    flexGrow: 1
  },
  dateRight: {
    marginLeft: 10
  },
  dateLeft: {
    marginRight: 10
  },
  optionsHeader: {
    marginTop: 20,
    display: "flex",
    justifyContent: "space-between"
  },
  questions: {
    marginBottom: 10,
    border: "1px solid #ddd",
    borderRadius: 5,
    padding: 20,
    marginTop: 10
  },
  divider: {
    backgroundColor: "#ddd",
    marginTop: 30
  },
  options: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly"
  },
  option: {
    width: 250
  },
  question: {
    textAlign: "left"
  },
  optionContent: {
    width: 300,
    display: "flex",
    alignItems: "flex-end"
  },
  removeOption: {
    marginLeft: 10,
    color: "white"
  },
  questionsHeader: {
    display: "flex",
    justifyContent: "space-between"
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    margin: 20
  },
  contentSpacer: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
    "& a": { textDecoration: "none" }
  }
}));
