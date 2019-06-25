import {
  makeStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Fab,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Theme,
  Typography,
  Toolbar
} from "@material-ui/core";
import { Edit, Add, Delete } from "@material-ui/icons";
import React, { useEffect, useState, SyntheticEvent } from "react";
import CursoComponent from "../../components/administracao/CursoComponent";
import Curso from "../../models/Curso";
import CursoApi from "../../services/CursoApi";
import Operacao from "../../types/Operacao";
import { red } from "@material-ui/core/colors";

export default function CursoView() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [curso, setCurso] = useState<Curso>({ id: 0, nome: "" });
  const [operacao, setOperacao] = useState<Operacao>("Criar");
  const [erro, setErro] = useState<string>("");
  const classes = useStyles();

  useEffect(() => {
    GetCursos();
  }, []);

  async function GetCursos() {
    setLoading(true);
    let result = await CursoApi.entity.get();
    if (result.success) setCursos(result.data as Curso[]);
    else setErro(result.message);
    setLoading(false);
  }

  const onHandleClick = (operacao: Operacao, id: number = 0) => {
    if (id !== 0) setCurso(cursos.find(x => x.id === id) as Curso);
    else setCurso({ id: 0, nome: "" });
    setOperacao(operacao);
    setOpen(true);
  };

  const handleClose = (e: SyntheticEvent, operation: string = "") => {
    if (operacao === operation) GetCursos();
    setOpen(false);
  };

  const onHandleDelete = async (id: number) => {
    setLoading(true);
    await CursoApi.entity.delete(id);
    setLoading(false);
    GetCursos();
  };

  return (
    <>
      <div className={classes.header} />
      <Paper>
        <Toolbar className={classes.root}>
          <div className={classes.title}>
            <Typography variant="h4" id="tableTitle">
              Cursos
            </Typography>
          </div>
          <div className={classes.spacer} />
          <div className={classes.actions}>
            <Tooltip title="Criar" aria-label="Criar">
              <Fab
                size="small"
                variant="round"
                aria-label="Criar"
                color="primary"
                onClick={() => onHandleClick("Criar")}
              >
                <Add />
              </Fab>
            </Tooltip>
          </div>
        </Toolbar>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              <TableCell align="left">Nome</TableCell>
              <TableCell align="center">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress />
                </TableCell>
              </TableRow>
            )}
            {!!erro && (
              <TableRow>
                <TableCell align="center" colSpan={3}>
                  {erro}
                </TableCell>
              </TableRow>
            )}
            {cursos.map(curso => (
              <TableRow key={curso.id}>
                <TableCell align="center">{curso.id}</TableCell>
                <TableCell align="left">{curso.nome}</TableCell>
                <TableCell align="center">
                  <Tooltip title="Editar" aria-label="Editar">
                    <Fab
                      size="small"
                      variant="round"
                      aria-label="Editar"
                      color="primary"
                      onClick={() => onHandleClick("Atualizar", curso.id)}
                    >
                      <Edit />
                    </Fab>
                  </Tooltip>
                  <Tooltip title="Deletar" aria-label="Deletar">
                    <Fab
                      size="small"
                      variant="round"
                      aria-label="Deletar"
                      className={classes.deleteButtom}
                      onClick={() => onHandleDelete(curso.id)}
                    >
                      <Delete />
                    </Fab>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">{operacao} Curso</DialogTitle>
        <Divider className={classes.divider} />
        <DialogContent>
          <CursoComponent
            curso={curso}
            operacao={operacao}
            fechaModal={handleClose}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

const useStyles = makeStyles((theme: Theme) => {
  return {
    divider: {
      backgroundColor: "rgba(0, 0, 0, 0.2)",
      marginBottom: "2em"
    },
    header: {
      display: "flex",
      justifyContent: "flex-end",
      marginBottom: theme.spacing(2),
      marginRight: theme.spacing(2)
    },
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1)
    },
    spacer: {
      flex: "1 1 100%"
    },
    actions: {
      color: theme.palette.text.secondary,
      marginTop: theme.spacing(2),
      marginRight: theme.spacing(2)
    },
    title: {
      flex: "0 0 auto",
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      marginLeft: theme.spacing(1)
    },
    deleteButtom: {
      marginLeft: theme.spacing(1),
      color: theme.palette.getContrastText(red[700]),
      backgroundColor: red[700],
      "&:hover": {
        backgroundColor: red[900]
      }
    }
  };
});
