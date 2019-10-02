import { makeStyles } from "@material-ui/core";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import ContentComponent from "../components/navegacao/ContentComponent";
import NavbarComponent from "../components/navegacao/NavbarComponent";
import SidebarComponent from "../components/navegacao/SidebarComponent";
import Store from "../store";

export default function MainView() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Provider store={Store}>
        <BrowserRouter>
          <NavbarComponent />
          <SidebarComponent />
          <ContentComponent />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    display: "flex"
  }
}));
