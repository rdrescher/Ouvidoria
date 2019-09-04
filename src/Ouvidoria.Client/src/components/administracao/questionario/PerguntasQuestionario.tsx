import {
  makeStyles,
  Divider,
  Fab,
  Paper,
  Theme,
  Typography
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  ChangeEvent
} from "react";
import TipoPergunta from "../../../application/enums/TipoPergunta";
import OpcaoErrors from "../../../models/Errors/OpcaoErrors";
import PerguntaErrors from "../../../models/Errors/PerguntaErrors";
import Pergunta from "../../../models/Pergunta/Pergunta";
import * as Validations from "../../../utils/Validations";
import TipoPerguntaSelect from "../../common/formFields/nativeSelects/TipoPerguntaSelect";
import InputField from "../../common/formFields/InputField";

interface IProps {
  questions: Pergunta[];
  onRemoveQuestion: (questionIndex: number) => () => void;
  onQuestionTypeChange: (
    questionIndex: number
  ) => (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onQuestionDescriptionChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onOptionChange: (
    questionIndex: number
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddQuestion: () => void;
  onAddOption: (questionIndex: number) => () => void;
  onRemoveOption: (questionIndex: number, optionIndex: number) => () => void;
}

export interface IPerguntaQuestionarioValidations {
  isValid: () => boolean;
  questionTypeChange: (questionIndex: number, type: TipoPergunta) => void;
  addQuestion: () => void;
  removeQuestion: (questionIndex: number) => void;
  addOption: (questionIndex: number, optionIndex: number) => void;
}

const emptyQuestionError: PerguntaErrors = {
  descricao: "",
  opcoes: []
};

const emptyOptionError: OpcaoErrors = {
  descricao: ""
};

interface IState {
  questions: PerguntaErrors[];
}

const initialState: IState = { questions: [emptyQuestionError] };

const PerguntasQuestionario = forwardRef<
  IPerguntaQuestionarioValidations,
  IProps
>((props, ref) => {
  const [state, setState] = useState(initialState);
  const classes = useStyles(0);

  useImperativeHandle(ref, () => ({
    isValid: (): boolean => {
      let valid = true;
      state.questions.forEach((question, index) => {
        if (!validateQuestionDescription(index)) valid = false;
      });
      return valid;
    },
    addQuestion: (): void => {
      handleAddQuestion();
    },
    removeQuestion: (questionIndex: number): void => {
      handleRemoveQuestion(questionIndex);
    },
    addOption: (questionIndex: number, optionIndex: number): void => {},
    questionTypeChange: (questionIndex: number, type: TipoPergunta): void => {
      handleQuestionTypeChange(questionIndex, type);
    }
  }));

  const validateQuestionDescription = (questionIndex: number): boolean => {
    let valid = true;
    let message = "";
    let question = props.questions[questionIndex];

    if (!question.descricao) {
      valid = false;
      message = "A descrição é obrigatória";
    } else if (!Validations.hasCorrectSize(question.descricao, 2, 5000)) {
      valid = false;
      message = "A descrição deve conter entre 2 e 5000 caracteres";
    }

    if (valid) {
      setState(prevState => {
        return {
          ...prevState,
          questions: prevState.questions.map((question, index) =>
            index === questionIndex ? { ...question, descricao: "" } : question
          )
        };
      });
    } else {
      setState(prevState => {
        return {
          ...prevState,
          questions: prevState.questions.map((question, index) =>
            index === questionIndex
              ? { ...question, descricao: message }
              : question
          )
        };
      });
    }

    return valid;
  };

  const handleRemoveQuestion = (questionIndex: number) => {
    setState(prevState => {
      return {
        ...prevState,
        questions: prevState.questions
          .slice(0, questionIndex)
          .concat(
            prevState.questions.slice(
              questionIndex + 1,
              prevState.questions.length
            )
          )
      };
    });
  };

  const handleAddQuestion = () => {
    setState(prevState => {
      return {
        ...prevState,
        questions: [...prevState.questions, emptyQuestionError]
      };
    });
  };

  const handleQuestionTypeChange = (
    questionIndex: number,
    type: TipoPergunta
  ) => {
    console.log(props.questions[questionIndex], TipoPergunta.Dissertativa);
    setState(prevState => {
      return {
        ...prevState,
        questions: prevState.questions.map((question, index) =>
          index === questionIndex
            ? {
                ...question,
                opcoes:
                  type === TipoPergunta.Dissertativa
                    ? []
                    : [emptyOptionError, emptyOptionError]
              }
            : question
        )
      };
    });
  };

  return (
    <Paper className={classes.paper}>
      <div className={classes.questionsHeader}>
        <Typography variant="h5">Perguntas</Typography>
        <Fab
          variant="extended"
          color="secondary"
          size="medium"
          onClick={props.onAddQuestion}
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
      {props.questions.map((question, questionIndex) => (
        <div key={questionIndex} className={classes.questions}>
          <div className={classes.questionsHeader}>
            <Typography variant="h6" className={classes.question}>
              Pergunta nº {questionIndex + 1}
            </Typography>
            {props.questions.length > 1 && (
              <Fab
                color="secondary"
                size="medium"
                className={classes.removeOption}
                onClick={props.onRemoveQuestion(questionIndex)}
              >
                <Delete />
              </Fab>
            )}
          </div>
          <InputField
            name={questionIndex.toString()}
            label="Descrição"
            value={question.descricao}
            onChange={props.onQuestionDescriptionChange}
            error={state.questions[questionIndex].descricao}
            onBlur={() => validateQuestionDescription(questionIndex)}
          />
          <TipoPerguntaSelect
            name={`options${questionIndex.toString()}`}
            index={questionIndex}
            label="Tipo da Pergunta"
            value={question.tipo}
            onChange={props.onQuestionTypeChange(questionIndex)}
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
                  onClick={props.onAddOption(questionIndex)}
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
                        onChange={props.onOptionChange(questionIndex)}
                      />
                    </div>
                    {props.questions[questionIndex].opcoes.length > 2 && (
                      <Fab
                        color="secondary"
                        className={classes.removeOption}
                        onClick={props.onRemoveOption(
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
  );
});

export default PerguntasQuestionario;

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: 20,
    textAlign: "center",
    marginTop: 20
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
