import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import React, { ReactElement } from "react";

interface IProps {
  onClick: () => void;
  isOpen: boolean;
  icon: ReactElement;
  label: string;
}

export default function SidebarExpandItem(props: IProps) {
  return (
    <ListItem button onClick={props.onClick}>
      <ListItemIcon>{props.icon}</ListItemIcon>
      <ListItemText primary={props.label} />
      {props.isOpen ? <ExpandLess /> : <ExpandMore />}
    </ListItem>
  );
}
