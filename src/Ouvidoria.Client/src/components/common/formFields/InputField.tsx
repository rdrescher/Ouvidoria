import {
  FormControl,
  FormHelperText,
  Input,
  InputLabel
} from "@material-ui/core";
import React, { ChangeEvent, KeyboardEvent } from "react";

interface IProps {
  error: string;
  name: string;
  label: string;
  value: string | number;
  type?: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (e: KeyboardEvent<HTMLDivElement>) => void;
  onBlur?: () => void;
}

export default function InputField(props: IProps) {
  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") e.preventDefault();
  };

  return (
    <FormControl fullWidth error={!!props.error}>
      <InputLabel htmlFor={props.name}>{props.label}</InputLabel>
      <Input
        name={props.name}
        aria-describedby={`${props.name}-helper`}
        fullWidth
        value={props.value || ""}
        type={!!props.type ? props.type : "text"}
        disabled={props.disabled}
        onChange={props.onChange}
        onBlur={props.onBlur !== undefined ? props.onBlur : () => {}}
        onKeyPress={
          props.onKeyPress !== undefined ? props.onKeyPress : handleKeyPress
        }
      />
      <FormHelperText id={`${props.name}-helper`}>{props.error}</FormHelperText>
    </FormControl>
  );
}
