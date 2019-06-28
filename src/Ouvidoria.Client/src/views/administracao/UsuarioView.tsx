import {
    LinearProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
    Fab,
    Typography,
    Toolbar,
    makeStyles,
    Theme,
    Dialog,
    DialogTitle,
    Divider,
    DialogContent
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Usuario from "../../models/Usuario";
import UsuarioApi from "../../services/UsuarioApi";
import { Edit, Add, ThumbDown, ThumbUp } from "@material-ui/icons";
import Operacao from "../../types/Operacao";
import UsuarioComponent from "../../components/administracao/UsuarioComponent";
import { MUIDataTableColumnDef } from "mui-datatables";
import DataTable from "../../components/common/dataTable/DataTable";
import Resultado from "../../models/Resultado";

const cabecalhos: MUIDataTableColumnDef[] = [
    { name: "nome", label: "Nome" },
    { name: "email", label: "Email" },
    { name: "telefone", label: "Telefone" },
    { name: "cpf", label: "CPF" },
    { name: "curso", label: "Curso" },
    { name: "perfil", label: "Perfil" },
    { name: "ativo", label: "Ativo" },
    { name: "ações", label: "Ações" }
];

interface IState {
    usuarios: Usuario[];
    carregando: boolean;
    dialogoAberto: boolean;
    operacao: Operacao;
    usuarioSelecionado: Usuario;
}

const initialState: IState = {
    usuarios: [],
    carregando: false,
    dialogoAberto: false,
    operacao: "Criar",
    usuarioSelecionado: {} as Usuario
};

export default function UsuarioView() {
    const [state, setState] = useState<IState>(initialState);
    const classes = useStyles();

    async function getUsuarios(): Promise<Resultado<Usuario[]>> {
        return await UsuarioApi.entity.get();
    }

    

    const handleDialogClose = () => {
        setState({
            ...state,
            dialogoAberto: false,
            usuarioSelecionado: {} as Usuario
        });
    };

    const onHandleClick = (operacao: Operacao, id: number = 0) => {
        if (operacao === "Atualizar") {
            let usuario = state.usuarios.find(x => x.id === id);
            setState({
                ...state,
                dialogoAberto: true,
                usuarioSelecionado: usuario!,
                operacao: operacao
            });
        } else {
            setState({ ...state, dialogoAberto: true, operacao: operacao });
        }
    };

    return (
        <DataTable
            data={getUsuarios}
            columns={cabecalhos}
        />
    );

    /*return (
        <>
            <Paper>
                <Toolbar className={classes.root}>
                    <div className={classes.title}>
                        <Typography variant="h4" id="tableTitle">
                            Usuários
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
                            {cabecalhos.map(cabecalho => (
                                <TableCell key={cabecalho}>
                                    {cabecalho}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.carregando && (
                            <TableRow>
                                <TableCell colSpan={cabecalhos.length}>
                                    <LinearProgress />
                                </TableCell>
                            </TableRow>
                        )}
                        {!!state.usuarios &&
                            state.usuarios.map(usuario => (
                                <TableRow key={usuario.id}>
                                    <TableCell>{usuario.nome}</TableCell>
                                    <TableCell>{usuario.email}</TableCell>
                                    <TableCell>{usuario.telefone}</TableCell>
                                    <TableCell>{usuario.cpf}</TableCell>
                                    <TableCell>
                                        {!!usuario.curso && usuario.curso.nome}
                                    </TableCell>
                                    <TableCell>
                                        {usuario.usuarioPerfil}
                                    </TableCell>
                                    <TableCell>
                                        {usuario.ativo && (
                                            <ThumbUp
                                                className={classes.active}
                                            />
                                        )}
                                        {!usuario.ativo && (
                                            <ThumbDown
                                                className={classes.inactive}
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip
                                            title="Editar"
                                            aria-label="Editar"
                                        >
                                            <Fab
                                                size="small"
                                                variant="round"
                                                aria-label="Editar"
                                                color="primary"
                                                onClick={() =>
                                                    onHandleClick(
                                                        "Atualizar",
                                                        usuario.id
                                                    )
                                                }
                                            >
                                                <Edit />
                                            </Fab>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        {state.usuarios.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={cabecalhos.length}
                                    align="center"
                                >
                                    {"A consulta não retornou registros"}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <Dialog
                    open={state.dialogoAberto}
                    onClose={handleDialogClose}
                    aria-labelledby="form-dialog-title"
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle id="form-dialog-title">
                        {state.operacao} Usuário
                    </DialogTitle>
                    <Divider className={classes.divider} />
                    <DialogContent>
                        <UsuarioComponent
                            usuario={state.usuarioSelecionado}
                            operacao={state.operacao}
                            fechaDialogo={handleDialogClose}
                        />
                    </DialogContent>
                </Dialog>
            </Paper>
        </>
    );*/
}

const useStyles = makeStyles((theme: Theme) => ({
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
    active: {
        color: "green"
    },
    inactive: {
        color: "red"
    }
}));
