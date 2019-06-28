import React, { useState, useEffect } from "react";
import { Delete, Edit } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import { Fab } from "@material-ui/core";

interface IProps {
    delete: boolean;
    edit: boolean;
    onHandleEdit?: () => void;
    onHandleDelete?: () => void;
}

interface IState {
    delete: boolean;
    edit: boolean;
}

const initialState: IState = {
    delete: false,
    edit: false
};

export default function CustomToolbarSelect(props: IProps) {
    const [state, setState] = useState<IState>(initialState);
    const classes = useStyles(1);

    useEffect(() => {
        setState({ ...state, delete: props.delete, edit: props.edit });
    }, []);

    const handleEdit = () => {
        !!props.onHandleEdit && props.onHandleEdit!();
    };

    const handleDelete = () => {
        !!props.onHandleDelete && props.onHandleDelete!();
    };

    return (
        <div className={classes.div}>
            {state.edit && (
                <Tooltip title="Editar" aria-label="Editar">
                    <Fab
                        size="small"
                        variant="round"
                        aria-label="Editar"
                        color="primary"
                        onClick={handleEdit}
                    >
                        <Edit />
                    </Fab>
                </Tooltip>
            )}
            {state.delete && (
                <Tooltip title="Deletar" aria-label="Deletar">
                    <Fab
                        size="small"
                        variant="round"
                        aria-label="Deletar"
                        className={classes.deleteButtom}
                        onClick={handleDelete}
                    >
                        <Delete />
                    </Fab>
                </Tooltip>
            )}
        </div>
    );
}

const useStyles = makeStyles((theme: Theme) => ({
    deleteButtom: {
        marginLeft: theme.spacing(2),
        color: theme.palette.getContrastText(red[700]),
        backgroundColor: red[700],
        "&:hover": {
            backgroundColor: red[900]
        }
    },
    div: {
        marginRight: theme.spacing(2)
    }
}));
