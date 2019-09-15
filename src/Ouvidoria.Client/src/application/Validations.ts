export function hasCorrectSize(
  value: string,
  min: number,
  max: number
): boolean {
  return String(value).length >= min && String(value).length <= max;
}

export function hasExactSize(value: string, size: number): boolean {
  return String(value).length === size;
}

export function hasMinimunSize(value: string, min: number): boolean {
  return String(value).length > min;
}

export function hasMaximunSize(value: string, max: number): boolean {
  return String(value).length < max;
}

export function isValidEmail(email: string): boolean {
  let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return regex.test(String(email).toLowerCase());
}

export function onlyNumbers(value: string): boolean {
  let regex = /^\d+$/;

  return regex.test(String(value));
}

export function isValidCPF(value: string): boolean {
  let soma = 0;
  let resto: number;
  if (value === "00000000000" || !hasExactSize(value, 11)) {
    return false;
  } else {
    for (let i = 1; i <= 9; i++) {
      soma = soma + parseInt(value.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }
    if (resto !== parseInt(value.substring(9, 10))) {
      return false;
    } else {
      soma = 0;
      for (let i = 1; i <= 10; i++) {
        soma = soma + parseInt(value.substring(i - 1, i)) * (12 - i);
      }
      resto = (soma * 10) % 11;

      if (resto === 10 || resto === 11) {
        resto = 0;
      }
      if (resto !== parseInt(value.substring(10, 11))) {
        return false;
      }
    }
  }
  return true;
}
