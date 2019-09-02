import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  Container,
  Divider,
  Input,
  NativeSelect,
  Paper,
  Theme
} from "@material-ui/core";
import { CalendarToday } from "@material-ui/icons";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/styles";
import ptBR from "date-fns/locale/pt-BR";
import React, { useState, ChangeEvent } from "react";
import TipoPergunta from "../../application/enums/TipoPergunta";
import InputField from "../../components/common/formFields/InputField";
import Pergunta from "../../models/Pergunta/Pergunta";
import CadastroQuestionario from "../../models/Questionario/CadastroQuestionario";
import clsx from "clsx";

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

  return (
    <Container maxWidth="md">
      <Paper className={classes.paper}>
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
              className={clsx(classes.date, classes.dateLeft)}
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
              className={clsx(classes.date, classes.dateRight)}
            />
          </MuiPickersUtilsProvider>
        </div>
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
  },
  dates: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  date: {
    flexGrow: 0.5,
  },
  dateRight: {
    marginLeft: 10
  },
  dateLeft: {
    marginRight: 10
  }
}));
