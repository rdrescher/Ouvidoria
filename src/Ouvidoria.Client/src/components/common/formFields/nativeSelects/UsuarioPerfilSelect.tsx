import {
  FormControl,
  InputLabel,
  NativeSelect,
  OutlinedInput
} from "@material-ui/core";
import React from "react";
import UsuarioPerfil from "../../../../application/enums/UsuarioPerfil";

interface IProps {
  name: string;
  label: string;
  value: UsuarioPerfil;
  index: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function UsuarioPerfilSelect(props: IProps) {
  const inputLabel = React.useRef<HTMLLabelElement>(null);
  const [labelWidth, setLabelWidth] = React.useState(0);

  React.useEffect(() => {
    setLabelWidth(inputLabel.current!.offsetWidth);
  },              []);

  return (
    <FormControl fullWidth variant="outlined" style={{ marginTop: 20 }}>
      <InputLabel ref={inputLabel} htmlFor={props.name}>
        {props.label}
      </InputLabel>
      <NativeSelect
        name={props.name}
        fullWidth
        value={props.value}
        onChange={props.onChange}
        variant="outlined"
        input={
          <OutlinedInput
            name={props.name}
            labelWidth={labelWidth}
            id={props.name}
          />
        }
      >
        {Object.keys(UsuarioPerfil)
          .filter(type => !isNaN(Number(type)))
          .map(type => (
            <option value={Number(type)} key={Number(type)}>
              {UsuarioPerfil[Number(type)]}
            </option>
          ))}
      </NativeSelect>
    </FormControl>
  );
}
