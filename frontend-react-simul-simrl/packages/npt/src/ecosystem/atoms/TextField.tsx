import "./TextField.scss";
import { NBCurrencyTextField } from "@nb-omc-xit-frontend/nb-shared/lib/NBCurrencyTextField";
import { useEffect, useState } from "react";

type TextFieldProps = {
  defaultValue?: string | undefined;
  label?: string;
  isDisabled?: boolean;
  valueCallback?: Function;
  textInfo?: string;
  infoIcon?: boolean;
  placeholder?: string;
  margin?: string;
  width?: string;
  id?: string;
};

const TextField = (props: TextFieldProps) => {
  const {
    defaultValue,
    label,
    isDisabled,
    valueCallback,
    textInfo,
    infoIcon,
    placeholder,
    margin,
    width,
    id,
  } = props;
  const [value, setValue] = useState<string | undefined>(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className="text-field-wrapper" style={{ margin, width }}>
      {infoIcon === true ? (
        <NBCurrencyTextField
          id={id ?? ""}
          label={label?.toUpperCase()}
          placeholder={placeholder}
          disabled={isDisabled}
          value={value ?? ""}
          variant="primary"
          onChange={(valueInString, valueInNumber) => {
            setValue(valueInString);
            valueCallback!(valueInNumber ?? 0);
          }}
          dialog={{
            tooltip: textInfo,
          }}
        />
      ) : (
        <NBCurrencyTextField
          id={id ?? ""}
          label={label?.toUpperCase()}
          placeholder={placeholder}
          disabled={isDisabled}
          value={value ?? ""}
          variant="primary"
          onChange={(valueInString, valueInNumber) => {
            setValue(valueInString);
            valueCallback!(valueInNumber ?? 0);
          }}
        />
      )}
    </div>
  );
};

export default TextField;
