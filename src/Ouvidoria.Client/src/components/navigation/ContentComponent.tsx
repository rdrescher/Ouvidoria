import { Container } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";
import { connect } from "react-redux";
import { IApplicationState } from "../../store";
import MessageBox from "../common/MessageBox";
import Routes from "./Routes";

interface IStateProps {
  sidebarIsOpen: boolean;
}

function ContentComponent(props: IStateProps) {
  const classes = useStyles();

  return (
    <Container maxWidth="lg" className={classes.container}>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: props.sidebarIsOpen
        })}
      >
        <Routes />
        <MessageBox />
      </main>
    </Container>
  );
}

const mapStateToProps = (state: IApplicationState) => ({
  sidebarIsOpen: state.NavigationReducer.sidebarIsOpen
});

export default connect(
  mapStateToProps,
  null
)(ContentComponent);

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    background: "rgb(249, 249, 252)"
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth,
    paddingTop: 80
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));
