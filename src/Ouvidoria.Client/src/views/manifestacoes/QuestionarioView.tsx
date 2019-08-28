import { Button, Divider, Input, NativeSelect, Radio } from "@material-ui/core";
import React, { useState, ChangeEvent } from "react";
import TipoPergunta from "../../application/enums/TipoPergunta";
import Pergunta from "../../models/Pergunta/Pergunta";
import CadastroQuestionario from "../../models/Questionario/CadastroQuestionario";

interface IState {
  quiz: CadastroQuestionario;
}

const initialState: IState = {
  quiz: {
    titulo: "",
    dataFim: "",
    dataInicio: "",
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

  const handleChange = (_index: number) => (
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

  return (
    <div>
      <Input value={state.quiz.titulo} onChange={handleInputChange} />
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
            onChange={handleChange(index)}
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
    </div>
  );
}
