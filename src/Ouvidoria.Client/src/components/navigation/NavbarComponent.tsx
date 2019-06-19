import { makeStyles, AppBar, IconButton, Theme, Toolbar, Typography } from "@material-ui/core";
import { AccountCircle, Menu } from "@material-ui/icons";
import clsx from "clsx";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import * as NavigationActions from "../../store/ducks/navigation/NavigationActions";


const useStyles = makeStyles((theme: Theme) => ({
    appBar: {
        zIndex: 9999,
        border: 0,
        background: "linear-gradient(-206deg, #00B4DB 35%, #0083B0)"
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    grow: {
        flexGrow: 1,
    },
    link: {
        color: "white",
        textDecoration: "none"
    }
}));

interface IDispatchState {
    toggleSidebar(): void;
}

function NavbarComponent(props: IDispatchState) {
    const classes = useStyles();

    return (
        <>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        edge="start"
                        onClick={props.toggleSidebar}
                        className={classes.menuButton}
                    >
                        <Menu />
                    </IconButton>
                    <Link to="/" className={clsx(classes.link, classes.grow)}>
                        <Typography variant="h6" noWrap>
                            Ouvidoria
                        </Typography>
                    </Link>
                    <IconButton
                        aria-owns={"menu-appbar"}
                        aria-haspopup="false"
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </>
    );
}

const mapDispatchToProps = (dispatch: Dispatch) =>
    bindActionCreators(NavigationActions, dispatch);

export default connect(null, mapDispatchToProps)(NavbarComponent);