import { FormControl, InputLabel, NativeSelect } from "@material-ui/core";
import React, { ChangeEvent } from "react";
import SelectDictionary from "../../../types/SelectDictionary";

interface IProps {
  name: string;
  label: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  data: SelectDictionary[];
}

export default function SelectField(props: IProps) {
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
      <NativeSelect
        name={props.name}
        fullWidth
        value={props.value}
        onChange={props.onChange}
      >
        {props.data.map(item => (
          <option value={item.id} key={item.id}>
            {item.description}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
}
