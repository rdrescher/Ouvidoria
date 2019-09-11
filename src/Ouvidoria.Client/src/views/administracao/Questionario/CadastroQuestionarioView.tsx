import { Container, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { createRef, useState, ChangeEvent } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import TipoPergunta from "../../../application/enums/TipoPergunta";
import CabecalhoQuestionario, {
  ICabecalhoQuestionarioValidations
} from "../../../components/administracao/questionario/CabecalhoQuestionario";
import PerguntasQuestionario, {
  IPerguntaQuestionarioValidations
} from "../../../components/administracao/questionario/PerguntasQuestionario";
import SubmitButton from "../../../components/common/formFields/SubmitButton";
import CadastroOpcao from "../../../models/Opcao/CadastroOpcao";
import CadastroPergunta from "../../../models/Pergunta/CadastroPergunta";
import CadastroQuestionario from "../../../models/Questionario/CadastroQuestionario";
import QuestionarioApi from "../../../services/QuestionarioApi";
import * as MessageBoxActions from "../../../store/ducks/dialogMessages/DialogMessagesActions";
import * as LoadingActions from "../../../store/ducks/loading/LoadingActions";

interface IState {
  quiz: CadastroQuestionario;
  loading: boolean;
  dataInicial: Date;
  dataFinal: Date;
}

interface IDispatchProps {
  open(title: string, messages: string[]): void;
  setLoading(): void;
  setLoaded(): void;
}

const adjustDate = (date: Date) => {
  let newDate = new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    )
  );

  return newDate;
};

const initialState: IState = {
  quiz: {
    titulo: "",
    dataFim: adjustDate(new Date()),
    dataInicio: adjustDate(new Date()),
    descricao: "",
    perguntas: [{ descricao: "", opcoes: [], tipo: TipoPergunta.Dissertativa }]
  },
  loading: false,
  dataInicial: new Date(),
  dataFinal: new Date()
};

const emptyQuestion: CadastroPergunta = {
  descricao: "",
  tipo: TipoPergunta.Dissertativa,
  opcoes: []
};

const emptyOption: CadastroOpcao = {
  descricao: ""
};

function CadastroQuestionarioView(props: IDispatchProps) {
  const [state, setState] = useState<IState>(initialState);
  const classes = useStyles(0);
  const quizHeaderRef = createRef<ICabecalhoQuestionarioValidations>();
  const quizQuestionsRef = createRef<IPerguntaQuestionarioValidations>();

  const resetFormAfterSucces = () => {
    setState(() => {
      return { ...initialState };
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
    let newDate = adjustDate(date!);
    setState((prevState: IState) => {
      return {
        ...prevState,
        quiz: {
          ...prevState.quiz,
          dataInicio: newDate
        },
        dataInicial: date!
      };
    });
    if (newDate != null && state.quiz.dataFim < newDate) handleFinalDate(date);
  };

  const handleFinalDate = (date: Date | null): void => {
    let newDate = adjustDate(date!);
    setState((prevState: IState) => {
      return {
        ...prevState,
        quiz: {
          ...prevState.quiz,
          dataFim: newDate
        },
        dataFinal: date!
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
    props.setLoading();
    let result = await QuestionarioApi.create(state.quiz);
    if (result.success) {
      resetFormAfterSucces();
      props.open("Sucesso", ["Questionário salvo com sucesso!"]);
    } else {
      props.open("Erro ao salvar", result.messages);
    }
    props.setLoaded();
  };

  return (
    <Container maxWidth="md">
      <CabecalhoQuestionario
        quiz={state.quiz}
        initialDate={state.dataInicial}
        finalDate={state.dataFinal}
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
          label="Salvar Questionários"
          loading={state.loading}
          onSubmit={handleSubmit}
        />
      </div>
    </Container>
  );
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    Object.assign({}, MessageBoxActions, LoadingActions),
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(CadastroQuestionarioView);

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
