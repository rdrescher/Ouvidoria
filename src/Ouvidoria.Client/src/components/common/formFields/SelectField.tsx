import {
  FormControl,
  InputLabel,
  NativeSelect,
  OutlinedInput
} from "@material-ui/core";
import React, { ChangeEvent } from "react";
import GenericList from "../../../models/GenericList";

interface IProps {
  name: string;
  label: string;
  value: string | number | null | undefined;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  data: GenericList[];
  nullable?: boolean;
}

export default function SelectField(props: IProps) {
  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
  },              []);

  return (
    <FormControl fullWidth variant="outlined" style={{marginTop: 20}}>
      <InputLabel ref={inputLabel} htmlFor={props.name}>{props.label}</InputLabel>
      <NativeSelect
        name={props.name}
        fullWidth
        value={props.value || ""}
        onChange={props.onChange}
        variant="outlined"
        input={
          <OutlinedInput name={props.name} labelWidth={labelWidth} id={props.name} />
        }
      >
        {props.nullable && (
          <option value="">
            {""}
          </option>
        )}
        {props.data.map(item => (
          <option value={item.id} key={item.id}>
            {item.description}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
}
