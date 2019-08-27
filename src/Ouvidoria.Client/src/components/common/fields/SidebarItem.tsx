import {
  makeStyles,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme
} from "@material-ui/core";
import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

interface IProps {
  path: string;
  icon: ReactElement;
  label: string;
  nested?: boolean;
}

export default function SidebarItem(props: IProps) {
  const classes = useStyles(0);
  return (
    <Link to={props.path} className={classes.link}>
      <ListItem button className={!!props.nested ? classes.nested : ""}>
        <ListItemIcon>{props.icon}</ListItemIcon>
        <ListItemText primary={props.label} />
      </ListItem>
    </Link>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    color: "white",
    textDecoration: "none"
  },
  nested: {
    paddingLeft: theme.spacing(4),
    background: "rgba(0, 0, 0, 0.04)"
  }
}));
