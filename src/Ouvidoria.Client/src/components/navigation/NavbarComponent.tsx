import {
  makeStyles,
  AppBar,
  IconButton,
  Theme,
  Toolbar,
  Typography,
  Container
} from "@material-ui/core";
import { AccountCircle, Menu } from "@material-ui/icons";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators, Dispatch } from "redux";
import { IApplicationState } from "../../store";
import * as NavigationActions from "../../store/ducks/navigation/NavigationActions";
import * as SessionActions from "../../store/ducks/session/SessionActions";
import DropDownMenu, { IItems } from "../common/fields/DropDownMenu";

interface IDispatchState {
  toggleSidebar(): void;
  logout(): void;
}

interface IStateProps {
  isAuthenticated: boolean;
}

interface IState {
  userMenuIsOpen: boolean;
}

const initialState: IState = {
  userMenuIsOpen: false
};

type Props = IDispatchState & IStateProps;

function NavbarComponent(props: Props) {
  const [state, setState] = useState(initialState);
  const classes = useStyles();
  const userMenuItems: IItems[] = [{ label: "Sair", onClick: props.logout }];

  function handleDropDown(): void {
    setState((prevState: IState) => {
      return {
        ...prevState,
        userMenuIsOpen: !prevState.userMenuIsOpen
      };
    });
  }

  function handleClose(): void {
    setState((prevState: IState) => {
      return { ...prevState, userMenuIsOpen: false };
    });
  }

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Container className={classes.container}>
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
                <>
                  <IconButton
                    aria-owns={"menu-appbar"}
                    aria-haspopup="false"
                    className={classes.userButton}
                    onClick={handleDropDown}
                  >
                    <AccountCircle />
                  </IconButton>
                  <DropDownMenu
                    open={state.userMenuIsOpen}
                    handleClose={handleClose}
                    items={userMenuItems}
                  />
                </>
              ) : (
                <>
                  <Typography variant="body1">
                    <Link to="/login" className={classes.link}>
                      Acesse!
                    </Link>
                  </Typography>
                </>
              )}
            </div>
          </Container>
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
  hamburger: {
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
  container: {
    display: "flex",
    alignItems: "center"
  },
  userButton: {
    color: "inherit"
  }
}));
