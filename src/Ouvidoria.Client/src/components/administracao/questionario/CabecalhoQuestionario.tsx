import DateFnsUtils from "@date-io/date-fns";
import {
  makeStyles,
  FormHelperText,
  Grid,
  Paper,
  Theme,
  Typography
} from "@material-ui/core";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import ptBR from "date-fns/locale/pt-BR";
import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  ChangeEvent
} from "react";
import QuestionarioErrors from "../../../models/Errors/QuestionarioErrors";
import CadastroQuestionario from "../../../models/Questionario/CadastroQuestionario";
import * as Validations from "../../../utils/Validations";
import InputField from "../../common/formFields/InputField";

interface IProps {
  quiz: CadastroQuestionario;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onStartDateChange: (date: Date | null) => void;
  onFinalDateChange: (date: Date | null) => void;
}

export interface ICabecalhoQuestionarioValidations {
  isValid: () => boolean;
  reset: () => void;
}

const initialState: QuestionarioErrors = {
  titulo: "",
  descricao: "",
  dataFim: "",
  dataInicio: ""
};

const CabecalhoQuestionario = forwardRef<
  ICabecalhoQuestionarioValidations,
  IProps
>((props, ref) => {
  const [state, setState] = useState<QuestionarioErrors>(initialState);
  const classes = useStyles(0);

  useImperativeHandle(ref, () => ({
    isValid: validate,
    reset
  }));

  const reset = () => setState(initialState);

  const validate = (): boolean => {
    let valid = true;
    if (!validateTitle()) valid = false;
    if (!validateDescription()) valid = false;
    if (!validateFinalDate()) valid = false;
    return valid;
  };

  function validateTitle(): boolean {
    let valid = true;
    let message = "";

    if (!props.quiz.titulo) {
      message = "O título é obrigatório";
      valid = false;
    } else if (!Validations.hasCorrectSize(props.quiz.titulo, 2, 100)) {
      message = "O título deve conter entre 2 e 100 caracteres";
      valid = false;
    }

    if (!valid) {
      setState((prevState: QuestionarioErrors) => {
        return {
          ...prevState,
          titulo: message
        };
      });
    } else {
      setState((prevState: QuestionarioErrors) => {
        return {
          ...prevState,
          titulo: ""
        };
      });
    }

    return valid;
  }

  function validateDescription(): boolean {
    let valid = true;
    let message = "";

    if (!props.quiz.descricao) {
      message = "A descrição é obrigatória";
      valid = false;
    } else if (!Validations.hasCorrectSize(props.quiz.descricao, 2, 5000)) {
      message = "A descrição deve conter entre 2 e 5000 caracteres";
      valid = false;
    }

    if (!valid) {
      setState((prevState: QuestionarioErrors) => {
        return {
          ...prevState,
          descricao: message
        };
      });
    } else {
      setState((prevState: QuestionarioErrors) => {
        return {
          ...prevState,
          descricao: ""
        };
      });
    }

    return valid;
  }

  function validateFinalDate(): boolean {
    let valid = true;
    let message = "";

    if (!props.quiz.dataFim) {
      message = "Data final inválida";
      valid = false;
    } else if (props.quiz.dataFim <= props.quiz.dataInicio) {
      message = "A data inicial deve ser menor que a data final";
      valid = false;
    }

    if (!valid) {
      setState((prevState: QuestionarioErrors) => {
        return {
          ...prevState,
          dataFim: message
        };
      });
    } else {
      setState((prevState: QuestionarioErrors) => {
        return {
          ...prevState,
          dataFim: ""
        };
      });
    }

    return valid;
  }

  return (
    <Paper className={classes.paper}>
      <Typography variant="h4">Novo Questionário</Typography>
      <InputField
        error={state.titulo}
        label="Título"
        name="titulo"
        onChange={props.onInputChange}
        value={props.quiz.titulo}
        onBlur={validateTitle}
      />
      <InputField
        error={state.descricao}
        label="Descrição"
        name="descricao"
        onChange={props.onInputChange}
        value={props.quiz.descricao}
        multiline
        onBlur={validateDescription}
      />
      <Grid container spacing={2} className={classes.dates}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBR}>
          <Grid item xs={12} sm={6}>
            <DateTimePicker
              value={props.quiz.dataInicio}
              variant="dialog"
              inputVariant="outlined"
              format="dd/MM/yyyy HH:mm"
              label="Data inicial"
              minDateMessage="A data inicial deve ser maior ou igual à data atual"
              ampm={false}
              disableToolbar
              disablePast
              fullWidth
              onChange={props.onStartDateChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DateTimePicker
              value={props.quiz.dataFim}
              onChange={props.onFinalDateChange}
              variant="dialog"
              inputVariant="outlined"
              format="dd/MM/yyyy HH:mm"
              ampm={false}
              label="Data final"
              disableToolbar
              fullWidth
              minDate={props.quiz.dataInicio}
              minDateMessage={"A data final deve ser maior que a data inicial"}
              error={!!state.dataFim}
              onBlur={validateFinalDate}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </Grid>
      {!!state.dataFim && (
        <FormHelperText
          id={`${state.dataFim}-helper`}
          className={classes.dateError}
        >
          {state.dataFim}
        </FormHelperText>
      )}
    </Paper>
  );
});

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: 20,
    textAlign: "center",
  },
  dates: {
    marginTop: 5
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
  dateError: {
    color: "red",
    textAlign: "center"
  }
}));

export default CabecalhoQuestionario;
