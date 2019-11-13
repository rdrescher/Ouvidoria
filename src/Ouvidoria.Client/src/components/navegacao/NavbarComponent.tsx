import {
  makeStyles,
  AppBar,
  Fab,
  IconButton,
  Theme,
  Toolbar,
  Typography
} from "@material-ui/core";
import { ExitToAppOutlined, Menu, Person } from "@material-ui/icons";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import { IApplicationState } from "../../store";
import * as NavigationActions from "../../store/ducks/navigation/NavigationActions";
import * as SessionActions from "../../store/ducks/session/SessionActions";

interface IDispatchState {
  toggleSidebar(): void;
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
          <div className={classes.container}>
            <IconButton
              aria-label="Open drawer"
              edge="start"
              onClick={props.toggleSidebar}
              className={classes.hamburger}
            >
              <Menu />
            </IconButton>
            <Typography variant="h6" noWrap>
              <Link to="/" className={classes.link}>
                Ouvidoria
              </Link>
            </Typography>
            <div className={classes.grow} />
            <div>
              {props.isAuthenticated ? (
                <Link to="/logout" className={classes.link}>
                  <Fab
                    size="small"
                    variant="extended"
                    color="default"
                    className={classes.button}
                  >
                    Sair
                    <ExitToAppOutlined className={classes.userIcon} />
                  </Fab>
                </Link>
              ) : (
                <Typography variant="body1">
                  <Link to="/login" className={classes.link}>
                    <Fab
                      size="small"
                      variant="extended"
                      color="default"
                      className={classes.button}
                    >
                      Acessar
                      <Person className={classes.userIcon} />
                    </Fab>
                  </Link>
                </Typography>
              )}
            </div>
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
    [theme.breakpoints.up("xs")]: {
      background: "linear-gradient(-206deg, #00B4DB 35%, #0083B0)"
    },
    [theme.breakpoints.down("xs")]: {
      background: "#00B4DB"
    }
  },
  hamburger: {
    marginRight: theme.spacing(2),
    color: "inherit",
  },
  grow: {
    flexGrow: 1
  },
  link: {
    color: "white",
    textDecoration: "none",
    cursor: "pointer"
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  },
  userIcon: {
    marginLeft: 10
  },
  button: {
    padding: "0 15px !important",
    background: "transparent",
    color: "white",
    boxShadow: "none",
    border: "1px solid white",
    "&:hover": {
      background: "rgba(255, 255, 255, .1)"
    }
  }
}));
