import "./TextField.scss";
import { NBTooltip } from "@nb-omc-xit-frontend/nb-data-display/lib/NBTooltip";
import CurrencyInput from "react-currency-input-field";
import { useEffect, useRef, useState } from "react";
import info from "../../assets/images/info.svg";
import Text from "./Text";
import { converterStringMonetariaParaNumero } from "../../utils/utils";

type TextFieldProps = {
  defaultValue?: any;
  label?: string;
  isDisabled?: boolean;
  valueCallback?: Function;
  textInfo?: string;
  infoIcon?: boolean;
  placeholder?: string;
  textAlign?: any;
  margin?: string;
  width?: string;
};

const TextField = (props: TextFieldProps) => {
  const {
    defaultValue,
    label,
    isDisabled,
    valueCallback,
    textInfo,
    infoIcon,
    textAlign,
    placeholder,
    margin,
    width,
  } = props;

  const [value, setValue] = useState<any>(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const formatValue2DecimalPlaces = (formatedValue: string) => {
    const floatValue = parseFloat(formatedValue.replace(",", ".")).toFixed(2);
    return floatValue.replace(".", ",");
  };

  const handleChange = (targetValue: string | undefined) => {
    const maxValue = 99999999;
    if (parseFloat(targetValue === undefined ? "0" : targetValue) <= maxValue) {
      valueCallback!(converterStringMonetariaParaNumero(targetValue));
      setValue(targetValue);
    }
  };

  useEffect(() => {
    if (defaultValue !== undefined) {
      setValue(defaultValue);
    } else {
      setValue("");
    }
  }, [defaultValue]);

  useEffect(() => {
    if (value !== "" && value !== undefined) {
      setValue(formatValue2DecimalPlaces(value));
    }
  }, []);

  const substituirPontoPorVirgula = (texto: string): string => {
    const indiceEuro = texto.indexOf("€");

    if (indiceEuro !== -1 && indiceEuro >= 2 && texto[indiceEuro - 2] === ".") {
      const novoTexto = `${texto.slice(0, indiceEuro - 2)},${texto.slice(
        indiceEuro - 1
      )}`;
      return novoTexto;
    }

    return texto;
  };

  const handleKeyDown = (event: any): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      inputRef.current?.blur();
    }
  };

  return (
    <div className="text-field-wrapper" style={{ margin, width }}>
      <Text
        text={label?.toUpperCase()}
        margin="0px 0px 8px 0px"
        fontSize="12px"
        color={isDisabled ? "var(--nb-color-bluegray)" : "inherit"}
      />
      <CurrencyInput
        ref={inputRef}
        className="text-field"
        name={label}
        id="sample-document-type-field"
        placeholder={placeholder}
        disabled={isDisabled}
        value={value}
        onValueChange={(val: string | undefined) => handleChange(val)}
        transformRawValue={(rawValue: string) =>
          substituirPontoPorVirgula(rawValue)
        }
        onKeyDown={handleKeyDown}
        groupSeparator="."
        decimalSeparator=","
        decimalsLimit={2}
        onBlur={() => {
          if (value !== "" && value !== undefined) {
            setValue(formatValue2DecimalPlaces(value));
          }
        }}
        style={{
          textAlign,
          backgroundColor: placeholder
            ? "var(--nb-color-pale-gray)"
            : "inherit",
          border: textAlign ? "1px solid var(--nb-color-gray-6)" : "",
        }}
        intlConfig={{ locale: "de-DE", currency: "EUR" }}
      />
      {infoIcon === true && (
        <div className="image">
          <NBTooltip tooltip={textInfo!} variant="dark">
            <img src={info} alt="img" />
          </NBTooltip>
        </div>
      )}
    </div>
  );
};

export default TextField;
