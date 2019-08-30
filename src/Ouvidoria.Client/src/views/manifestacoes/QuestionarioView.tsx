import {
  Button,
  Container,
  Divider,
  Input,
  NativeSelect,
  Paper,
  Theme
} from "@material-ui/core";
import React, { useState, ChangeEvent } from "react";
import TipoPergunta from "../../application/enums/TipoPergunta";
import InputField from "../../components/common/formFields/InputField";
import Pergunta from "../../models/Pergunta/Pergunta";
import CadastroQuestionario from "../../models/Questionario/CadastroQuestionario";
import { makeStyles } from "@material-ui/styles";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ptBR from "date-fns/locale/pt-BR";

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

const perguntaVazia: Pergunta = {
  descricao: "",
  tipo: TipoPergunta.Dissertativa,
  opcoes: []
};

export default function QuestionarioView() {
  const [state, setState] = useState<IState>(initialState);
  const classes = useStyles();
  const dt = new Date();
  const minDate = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());

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
    let _index = Number(e.target.name);
    let value = e.target.value;
    setState((prevState: IState) => {
      return {
        ...prevState,
        quiz: {
          ...prevState.quiz,
          perguntas: prevState.quiz.perguntas.map((item, index) =>
            index === _index ? { ...item, descricao: value } : item
          )
        }
      };
    });
  };

  const handleAdd = () => {
    setState((prevState: IState) => {
      return {
        ...prevState,
        quiz: {
          ...prevState.quiz,
          perguntas: [...prevState.quiz.perguntas, perguntaVazia]
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
            index === _index ? { ...item, tipo: value } : item
          )
        }
      };
    });
  };

  function handleStartDate(date: Date | null) {
    handleDateChange(date, "dataInicio");
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

  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
        <InputField
          error=""
          label="Título do Questionário"
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
            fullWidth
            minDate={minDate}
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
            fullWidth
            minDate={minDate}
          />
        </MuiPickersUtilsProvider>
      </Paper>
      <Button variant="contained" color="primary" onClick={handleAdd}>
        +
      </Button>
      <Divider />
      {state.quiz.perguntas.map((item, index) => (
        <div key={index}>
          Pergunta nº {index + 1}
          <Input
            name={index.toString()}
            value={item.descricao}
            onChange={handleQuestionChange}
          />
          {item.tipo === TipoPergunta.Objetiva && (
            <>
              <Input />
              <Input />
              <Input />
            </>
          )}
          <NativeSelect
            name="usuarioPerfil"
            fullWidth
            value={item.tipo}
            onChange={handleQuestionTypeChange(index)}
          >
            {Object.keys(TipoPergunta)
              .filter(type => !isNaN(Number(type)))
              .map(type => (
                <option value={Number(type)} key={Number(type)}>
                  {TipoPergunta[Number(type)]}
                </option>
              ))}
          </NativeSelect>
        </div>
      ))}
    </Container>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: "0px 20px 20px 20px "
  }
}));
