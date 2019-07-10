import {
  makeStyles,
  AppBar,
  IconButton,
  Theme,
  Toolbar,
  Typography
} from "@material-ui/core";
import { AccountCircle, Menu } from "@material-ui/icons";
import clsx from "clsx";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import * as NavigationActions from "../../store/ducks/navigation/NavigationActions";

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
            aria-label="Open drawer"
            edge="start"
            onClick={props.toggleSidebar}
            className={classes.iconButton}
          >
            <Menu />
          </IconButton>
          <div className={classes.grow}>
            <Typography variant="h6" noWrap>
              <Link to="/" className={classes.link}>
                Ouvidoria
              </Link>
            </Typography>
          </div>
          <IconButton
            aria-owns={"menu-appbar"}
            aria-haspopup="false"
            className={classes.iconButton}
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

export default connect(
  null,
  mapDispatchToProps
)(NavbarComponent);

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: 9999,
    border: 0,
    background: "linear-gradient(-206deg, #00B4DB 35%, #0083B0)"
  },
  iconButton: {
    marginRight: theme.spacing(2),
    color: "inherit"
  },
  grow: {
    flexGrow: 1
  },
  link: {
    color: "white",
    textDecoration: "none"
  }
}));
