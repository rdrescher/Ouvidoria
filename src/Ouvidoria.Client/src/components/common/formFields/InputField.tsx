import {
  FormControl,
  FormHelperText,
  TextField
} from "@material-ui/core";
import React, { ChangeEvent, KeyboardEvent } from "react";

interface IProps {
  error: string;
  name: string;
  label: string;
  value: string | number | null;
  type?: string;
  disabled?: boolean;
  multiline?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onEnterPress?: (e: KeyboardEvent<HTMLDivElement>) => void;
  onBlur?: () => void;
}

export default function InputField(props: IProps) {
  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      if(props.onEnterPress === undefined)
        e.preventDefault();
      else
        props.onEnterPress(e);
    }
  };

  return (
    <FormControl fullWidth error={!!props.error}>
      <TextField
        error={!!props.error}
        name={props.name}
        aria-describedby={`${props.name}-helper`}
        fullWidth
        label={props.label}
        value={props.value || ""}
        type={!!props.type ? props.type : "text"}
        disabled={props.disabled}
        onChange={props.onChange}
        onBlur={props.onBlur !== undefined ? props.onBlur : () => {}}
        onKeyPress={handleKeyPress}
        multiline={props.multiline}
        rows="3"
        rowsMax="10"
        variant="outlined"
      />
      {!!props.error && (
        <FormHelperText id={`${props.name}-helper`}>
          {props.error}
        </FormHelperText>
      )}
    </FormControl>
  );
}
