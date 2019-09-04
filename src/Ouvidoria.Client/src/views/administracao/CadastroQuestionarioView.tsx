import { Container, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { createRef, useState, ChangeEvent } from "react";
import TipoPergunta from "../../application/enums/TipoPergunta";
import CabecalhoQuestionario, {
  ICabecalhoQuestionarioValidations
} from "../../components/administracao/questionario/CabecalhoQuestionario";
import PerguntasQuestionario, {
  IPerguntaQuestionarioValidations
} from "../../components/administracao/questionario/PerguntasQuestionario";
import DialogMessage from "../../components/common/fields/DialogMessage";
import SubmitButton from "../../components/common/formFields/SubmitButton";
import Opcao from "../../models/Opcao/Opcao";
import Pergunta from "../../models/Pergunta/Pergunta";
import CadastroQuestionario from "../../models/Questionario/CadastroQuestionario";
import QuestionarioApi from "../../services/QuestionarioApi";

interface IState {
  quiz: CadastroQuestionario;
  loading: boolean;
  dialogOpen: boolean;
  returnMessage: string[];
  returnType: string;
}

const initialState: IState = {
  quiz: {
    titulo: "",
    dataFim: new Date(),
    dataInicio: new Date(),
    descricao: "",
    perguntas: [{ descricao: "", opcoes: [], tipo: TipoPergunta.Dissertativa }]
  },
  loading: false,
  dialogOpen: false,
  returnMessage: [],
  returnType: ""
};

const emptyQuestion: Pergunta = {
  descricao: "",
  tipo: TipoPergunta.Dissertativa,
  opcoes: []
};

const emptyOption: Opcao = {
  descricao: ""
};

export default function CadastroQuestionarioView() {
  const [state, setState] = useState<IState>(initialState);
  const classes = useStyles(0);
  const quizHeaderRef = createRef<ICabecalhoQuestionarioValidations>();
  const quizQuestionsRef = createRef<IPerguntaQuestionarioValidations>();

  const handleDialogOpen = (title: string, message: string[]) => {
    setState(prevState => {
      return {
        ...prevState,
        dialogOpen: true,
        returnMessage: message,
        returnType: title
      };
    });
  };

  const resetFormAfterSucces = (title: string, message: string[]) => {
    setState(() => {
      return {
        ...initialState,
        dialogOpen: true,
        returnMessage: message,
        returnType: title
      };
    });
  };

  const handleDialogClose = () => {
    setState(prevState => {
      return {
        ...prevState,
        dialogOpen: false,
        returnMessage: [],
        returnType: ""
      };
    });
  };

  const handleLoading = () => {
    setState(prevState => {
      return { ...prevState, loading: !prevState.loading };
    });
  };

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
    quizQuestionsRef.current!.questionTypeChange(_index, value);
  };

  const handleStartDate = (date: Date | null): void => {
    handleDateChange(date, "dataInicio");
    if (date != null && state.quiz.dataFim < date)
      handleDateChange(date, "dataFim");
  };

  const handleFinalDate = (date: Date | null): void => {
    handleDateChange(date, "dataFim");
  };

  const handleDateChange = (date: Date | null, name: string): void => {
    setState((prevState: IState) => {
      return {
        ...prevState,
        quiz: {
          ...prevState.quiz,
          [name]: date === null ? new Date() : date
        }
      };
    });
  };

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

    quizQuestionsRef.current!.addQuestion();
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
    quizQuestionsRef.current!.addOption(questionIndex);
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
    quizQuestionsRef.current!.removeOption(questionIndex, optionIndex);
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
    quizQuestionsRef.current!.removeQuestion(questionIndex);
  };

  const handleSubmit = async () => {
    let valid = true;
    if (!quizQuestionsRef.current!.isValid()) valid = false;
    if (!quizHeaderRef.current!.isValid()) valid = false;
    if (!valid) return;
    handleLoading();
    let result = await QuestionarioApi.create(state.quiz);
    if (result.success) {
      resetFormAfterSucces("Sucesso", ["Questionário salvo com sucesso!"]);
    } else {
      handleDialogOpen("Erro ao salvar", result.messages);
      handleLoading();
    }
  };

  return (
    <Container maxWidth="md">
      <CabecalhoQuestionario
        quiz={state.quiz}
        ref={quizHeaderRef}
        onInputChange={handleInputChange}
        onStartDateChange={handleStartDate}
        onFinalDateChange={handleFinalDate}
      />
      <PerguntasQuestionario
        questions={state.quiz.perguntas}
        ref={quizQuestionsRef}
        onQuestionDescriptionChange={handleQuestionChange}
        onQuestionTypeChange={handleQuestionTypeChange}
        onOptionChange={handleOptionChange}
        onAddQuestion={handleAddQuestion}
        onAddOption={handleAddOption}
        onRemoveOption={handleRemoveOption}
        onRemoveQuestion={handleRemoveQuestion}
      />
      <div className={classes.buttons}>
        <SubmitButton
          label="Salvar Questionário"
          loading={state.loading}
          onSubmit={handleSubmit}
        />
      </div>
      <DialogMessage
        open={state.dialogOpen}
        title={state.returnType}
        messages={state.returnMessage}
        onClose={handleDialogClose}
      />
    </Container>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
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
