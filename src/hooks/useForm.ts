import { useState } from 'react';

export const useForm = <TForm extends Record<string, any>>(
  inputValues: TForm
) => {
  const [values, setValues] = useState(inputValues);

  const createSetter =
    (key: keyof TForm) => (value: React.SetStateAction<string>) => {
      setValues((prevValues) => ({
        ...prevValues,
        [key]:
          typeof value === 'function'
            ? (value as (prev: string) => string)(prevValues[key])
            : value
      }));
    };

  return { values, setValues, createSetter };
};
