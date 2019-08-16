import {
  FormControl,
  InputLabel,
  NativeSelect,
  FormHelperText
} from "@material-ui/core";
import React, { ChangeEvent } from "react";
import SelectDictionary from "../../../utils/SelectDictionary";

interface IProps {
  name: string;
  label: string;
  value: string | number | null | undefined;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  data: SelectDictionary[];
  nullable?: boolean;
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
        {props.nullable && (
          <option value="-1" selected>
            Selecione
          </option>
        )}
        {props.data.map(item => (
          <option value={item.id} key={item.id}>
            {item.description}
          </option>
        ))}
      </NativeSelect>
      <FormHelperText>{""}</FormHelperText>
    </FormControl>
  );
}
