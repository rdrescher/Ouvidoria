import {
  makeStyles,
  Container,
  Fab,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Theme,
  Typography
} from "@material-ui/core";
import { Save } from "@material-ui/icons";
import React, {
  useEffect,
  useState,
  ChangeEvent,
  KeyboardEvent,
  SyntheticEvent
} from "react";
import ICurso from "../../models/Curso";
import IResultado from "../../models/Resultado";
import CursoApi from "../../services/CursoApi";
import Operacao from "../../types/Operacao";

interface IProps {
  curso: ICurso;
  operacao: Operacao;
  fechaModal: (e: SyntheticEvent, operacao: string) => void;
}

interface IError {
  mensagem: string[];
  possuiErro: boolean;
}

export default function CursoComponent(props: IProps) {
  const [curso, setCurso] = useState<ICurso>(props.curso);
  const [erro, setErro] = useState<IError>({
    mensagem: [],
    possuiErro: false
  });

  const classes = useStyles();

  useEffect(() => {
    setCurso(props.curso);
  }, [props]);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurso({ ...curso, nome: e.target.value });
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (curso === props.curso) {
      return;
    }
    if (curso.nome.length === 0) {
      let erros = erro.mensagem
      erros.push("Insira o nome do curso");
      setErro({ mensagem: erros, possuiErro: true });
    } else if (curso.nome.length < 2 || curso.nome.length > 50) {
      let erros = erro.mensagem
      erros.push("O nome do curso deve possuir entre dois e cinquênta caracteres");
      setErro({
        mensagem: erros,
        possuiErro: true
      });
    } else {
      let retorno: IResultado<ICurso>;
      if (props.operacao === "Criar") {
        retorno = await CursoApi.entity.create(curso);
      } else {
        retorno = await CursoApi.entity.update(props.curso.id, curso);
      }
      if (retorno.success) {
        setErro({ mensagem: [], possuiErro: false });
        props.fechaModal(e, props.operacao);
      } else {
        setErro({ mensagem: retorno.messages, possuiErro: true });
      }
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <Container maxWidth="lg">
      <form>
        <FormControl fullWidth error={erro.possuiErro}>
          <InputLabel htmlFor="nome">Nome</InputLabel>
          <Input
            id="nome"
            aria-describedby="nome-helper"
            fullWidth
            value={curso.nome}
            onChange={handleNameChange}
            onKeyPress={handleKeyPress}
          />
          <FormHelperText id="nome-helper">{erro.mensagem}</FormHelperText>
        </FormControl>
        <div className={classes.buttons}>
          <Fab
            variant="extended"
            color="primary"
            aria-label="salvar"
            size="small"
            onClick={handleSubmit}
          >
            <Save className={classes.btnMargin} />
            <Typography variant="inherit" className={classes.contentSpacer}>
              Salvar
            </Typography>
          </Fab>
        </div>
      </form>
    </Container>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  buttons: {
    marginBottom: "1.25em",
    marginTop: ".5em",
    display: "flex",
    justifyContent: "flex-end"
  },
  btnMargin: {
    marginRight: theme.spacing(1)
  },
  contentSpacer: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));
