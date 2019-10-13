import {
  Animation,
  EventTracker,
  HoverState
} from "@devexpress/dx-react-chart";
import {
  Chart,
  Legend,
  PieSeries,
  Title,
  Tooltip
} from "@devexpress/dx-react-chart-material-ui";
import { makeStyles, Typography } from "@material-ui/core";
import React from "react";
import OpcaoReport from "../../../models/Opcao/OpcaoReport";

interface IProps {
  data: OpcaoReport[];
}

export default function GraficoPizza(props: IProps) {
  const { data } = props;
  const classes = useStyles();

  const Root = (props: Legend.RootProps) => (
    <Legend.Root className={classes.root} {...props} />
  );

  const Label = (props: Legend.LabelProps) => {
    const text =
      props.text.toString().length > 50
        ? props.text.toString().substring(0, 50)
        : props.text;
    return <Legend.Label text={text} {...props} />;
  };

  const TooltipBody = (props: Tooltip.ContentProps) => {
    const item = data[props.targetItem.point];
    const text =
      item.descricao.length > 50
        ? item.descricao.toString().substring(0, 50)
        : item.descricao;
    let total = 0;
    data.forEach(x => (total += x.numeroEscolhas));

    return (
      <div>
        <Typography variant="h6" align="center">
          {text}
        </Typography>
        <Typography variant="body2" align="center">
          Número de respostas: {props.text}
          <br />
          {((item.numeroEscolhas * 100) / total).toFixed(2)}% das respostas
        </Typography>
      </div>
    );
  };

  return (
    <Chart data={data}>
      <PieSeries valueField="numeroEscolhas" argumentField="descricao" />
      <Title text="Area of Countries" />
      <Animation />
      <EventTracker />
      <Tooltip contentComponent={TooltipBody} />
      <HoverState />
      <Legend position="bottom" rootComponent={Root} labelComponent={Label} />
    </Chart>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
}));
