import React from "react";
import { FormControl, FormControlLabel, Checkbox } from "@material-ui/core";

interface IProps {
    name: string;
    label: string;
    value: boolean;
    onChange: () => void;
}

export default function CheckBoxField(props: IProps) {
  return (
    <FormControl fullWidth>
      <FormControlLabel
        control={
          <Checkbox
            checked={props.value === true ? true : false}
            onChange={props.onChange}
            value={props.value}
            name={props.name}
          />
        }
        label={props.label}
      />
    </FormControl>
  );
}
