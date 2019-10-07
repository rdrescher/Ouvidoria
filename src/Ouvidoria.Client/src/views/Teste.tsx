import {
  Animation,
  EventTracker,
  HoverState,
  Stack,
  ValueScale
} from "@devexpress/dx-react-chart";
import {
  ArgumentAxis,
  BarSeries,
  Chart,
  Legend,
  PieSeries,
  Title,
  Tooltip,
  ValueAxis
} from "@devexpress/dx-react-chart-material-ui";
import { makeStyles, Container, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import React from "react";

interface IDataItem {
  month: string;
  sale: number;
  total: number;
}

const chartData: IDataItem[] = [
  { month: "Jan", sale: 50, total: 87 },
  { month: "Feb", sale: 100, total: 100 },
  { month: "March", sale: 30, total: 100 },
  { month: "April", sale: 107, total: 10 },
  { month: "May", sale: 95, total: 30 },
  { month: "June", sale: 150, total: 20 }
];

export default function Teste() {
  const classes = useStyles();

  const AxisLabel = (props: ValueAxis.LabelProps) => (
    <ValueAxis.Label className={classes.axisLabel} {...props} />
  );

  const Root = (props: Legend.RootProps) => (
    <Legend.Root className={classes.root} {...props} />
  );

  const Label = (props: Legend.LabelProps) => (
    <Legend.Label className={classes.label} {...props} />
  );

  const BarLabel = (props: ArgumentAxis.LabelProps) => (
    <ArgumentAxis.Label className={classes.axisLabel} {...props} />
  );

  const TooltipBody = (props: Tooltip.ContentProps) => {
    const item = chartData[props.targetItem.point];
    let total = 0;
    chartData.forEach(x => (total += x.sale));

    return (
      <div>
        <Typography variant="h6" align="center">{item.month}</Typography>
        <Typography variant="body2" align="center">
          Valor: {props.text}
          <br />
          {((item.sale * 100) / total).toFixed(2)}%
        </Typography>
      </div>
    );
  };

  return (
    <Container maxWidth="md">
      <Paper>
        <Chart data={chartData}>
          <ValueScale name="sale" />
          <ValueScale name="total" />
          <ArgumentAxis labelComponent={BarLabel} />
          <ValueAxis
            scaleName="sale"
            showGrid={true}
            showLine={true}
            showTicks={true}
            labelComponent={AxisLabel}
          />
          <BarSeries
            name="Units Sold"
            valueField="sale"
            argumentField="month"
            scaleName="sale"
          />
          <BarSeries
            name="Total"
            valueField="total"
            argumentField="month"
            scaleName="sale"
          />

          <Animation />
          <Stack />
          <Legend
            position="bottom"
            rootComponent={Root}
            labelComponent={Label}
          />
          <EventTracker />
          <HoverState />
          <Tooltip contentComponent={TooltipBody} />
        </Chart>
        <Chart data={chartData}>
          <PieSeries valueField="sale" argumentField="month" />
          <Title text="Area of Countries" />
          <Animation />
          <EventTracker />
          <Tooltip contentComponent={TooltipBody} />
          <HoverState />
          <Legend
            position="bottom"
            rootComponent={Root}
            labelComponent={Label}
          />
        </Chart>
      </Paper>
    </Container>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    margin: "auto",
    flexDirection: "row"
  },
  label: {
    whiteSpace: "nowrap"
  },
  axisLabel: {
    fill: "#aaa"
  }
}));
