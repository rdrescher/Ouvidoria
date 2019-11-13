import { makeStyles, Typography } from "@material-ui/core";
import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

interface IProps {
  title: string;
  link: string;
  icon: ReactElement;
  dark?: boolean;
}

export default function Botao(props: IProps) {
  const classes = useStyles(0);

  return (
    <Link className={classes.link} to={props.link}>
      <div
        className={`${classes.box} ${
          props.dark ? classes.darkBox : classes.lightBox
        }`}
      >
        <div className={classes.boxContent}>
          <div className={classes.icon}>{props.icon}</div>
          <Typography variant="h6">{props.title}</Typography>
        </div>
      </div>
    </Link>
  );
}

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: "none"
  },
  icon: {
    "& svg": {
      width: 35,
      height: 35,
      color: "white",
      marginBottom: 5
    }
  },
  boxContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transitionDuration: ".3s"
  },
  box: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: 134,
    height: 134,
    overflow: "hidden",
    borderRadius: 20,
    color: "white",
    margin: 5,
    transitionDuration: ".3s",
    "&::before, &::after": {
      content: "'.'",
      width: "100%",
      height: 20,
      position: "absolute",
      right: 0,
      color: "transparent",
      transitionDuration: ".3s"
    },
    "&::before": {
      top: 0
    },
    "&::after": {
      bottom: 0
    },
    "&:hover": {
      transitionDuration: ".3s",
      "& div": {
        transform: "scale(1.15);",
        transitionDuration: ".3s"
      }
    },
    "&:hover::before, &:hover::after": {
      transitionDuration: ".3s"
    }
  },
  lightBox: {
    background: "#00B4DB",
    "&::before, &::after": {
      background: "rgba(255, 255, 255, 0.2)"
    },
    "&:hover::before": {
      top: -10
    },
    "&:hover::after": {
      bottom: -10
    }
  },
  darkBox: {
    background: "#0083B0",
    "&::before, &::after": {
      background: "rgba(255, 255, 255, 0.25)"
    },
    "&:hover::before": {
      top: -10
    },
    "&:hover::after": {
      bottom: -10
    }
  }
}));
