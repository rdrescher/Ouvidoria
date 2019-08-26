import {
  makeStyles,
  AppBar,
  IconButton,
  Theme,
  Toolbar,
  Typography
} from "@material-ui/core";
import { AccountCircle, Menu } from "@material-ui/icons";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import { IApplicationState } from "../../store";
import * as NavigationActions from "../../store/ducks/navigation/NavigationActions";
import * as SessionActions from "../../store/ducks/session/SessionActions";

interface IDispatchState {
  toggleSidebar(): void;
  logout(): void;
}

interface IStateProps {
  isAuthenticated: boolean;
}

type Props = IDispatchState & IStateProps;

function NavbarComponent(props: Props) {
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
          <div className={classes.user}>
            {props.isAuthenticated ? (
              <IconButton
                aria-owns={"menu-appbar"}
                aria-haspopup="false"
                className={classes.iconButton}
                onClick={props.logout}
              >
                <AccountCircle />
              </IconButton>
            ) : (
              <>
                <Typography variant="body1" className={classes.nested}>
                  <Link to="/login" className={classes.link}>
                    Logar
                  </Link>
                </Typography>
                <Typography variant="body1" className={classes.nested}>
                  <Link to="/login" className={classes.link}>
                    Registrar
                  </Link>
                </Typography>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
}

const mapStateToProps = (state: IApplicationState) => ({
  isAuthenticated: state.SessionReducer.isAuthenticated
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    Object.assign({}, NavigationActions, SessionActions),
    dispatch
  );

export default connect(
  mapStateToProps,
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
  },
  user: {
    display: "flex"
  },
  nested: {
    paddingLeft: theme.spacing(3)
  }
}));
