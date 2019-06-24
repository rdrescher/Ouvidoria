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
    Tooltip
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import CursoComponent from "../../components/administracao/CursoComponent";
import Curso from "../../models/Curso";
import CursoApi from "../../services/CursoApi";
import Operacao from "../../types/Operacao";

export default function CursoView() {
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [curso, setCurso] = useState<Curso>({ id: 0, nome: "" });
    const [operacao, setOperacao] = useState<Operacao>("Criar");
    const classes = useStyles();

    useEffect(() => {
        async function GetCursos() {
            setLoading(true);
            let result = await CursoApi.entity.get();
            setCursos(result.data as Curso[]);
            setLoading(false);
            setOperacao("Atualizar");
        }

        GetCursos();
    },        []);

    const onHandleClick = (id: number) => {
        setCurso(cursos.find(x => x.id == id) as Curso);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Paper>
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
                            <TableCell colSpan={3}>
                                <LinearProgress />
                            </TableCell>
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
                                            onClick={() =>
                                                onHandleClick(curso.id)
                                            }
                                        >
                                            <Edit />
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
                <DialogTitle id="form-dialog-title">
                    {operacao} Curso
                </DialogTitle>
                <Divider className={classes.divider} />
                <DialogContent>
                    <CursoComponent curso={curso} operacao={operacao} />
                </DialogContent>
            </Dialog>
        </>
    );
}

const useStyles = makeStyles(() => ({
    divider: {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        marginBottom: "2em",
    }
}));
