import {
  makeStyles,
  Divider,
  Fab,
  Paper,
  Theme,
  Typography
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";
import TipoPergunta from "../../../application/enums/TipoPergunta";
import Pergunta from "../../../models/Pergunta/Pergunta";
import TipoPerguntaSelect from "../../common/formFields/nativeSelects/TipoPerguntaSelect";
import InputField from "../../common/formFields/InputField";

interface IProps {
  questions: Pergunta[];
  onRemoveQuestion: (questionIndex: number) => () => void;
  onQuestionTypeChange: (questionIndex: number) => () => void;
  onQuestionDescriptionChange: () => void;
  onAddOption: (questionIndex: number) => () => void;
  onOptionChange: (questionIndex: number) => () => void;
  onRemoveOption: (questionIndex: number, optionIndex: number) => () => void;
}

export default function PerguntasQuestionario(props: IProps) {
  const classes = useStyles(0);

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5">Perguntas</Typography>
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
            error={""}
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
}

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
