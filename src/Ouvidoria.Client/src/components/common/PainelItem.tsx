import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React, { ReactElement } from "react";

interface IProps {
  title: string;
  icon: ReactElement;
  content: ReactElement;
}

export default function PainelItem(props: IProps) {
  const classes = useStyles();

  return (
    <>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          {props.icon}
          <Typography className={classes.title}>{props.title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>{props.content}</ExpansionPanelDetails>
      </ExpansionPanel>
    </>
  );
}

const useStyles = makeStyles(() => ({
  title: {
    marginLeft: 10
  }
}));
