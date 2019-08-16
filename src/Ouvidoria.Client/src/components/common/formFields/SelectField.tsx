import {
  FormControl,
  FormHelperText,
  InputLabel,
  NativeSelect
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
  return (
    <FormControl fullWidth>
      <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
      <NativeSelect
        name={props.name}
        fullWidth
        value={props.value || ""}
        onChange={props.onChange}
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
      <FormHelperText>{""}</FormHelperText>
    </FormControl>
  );
}
