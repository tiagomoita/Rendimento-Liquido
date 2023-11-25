import { useDispatch, useSelector } from "react-redux";
import { NBButton } from "@nb-omc-xit-frontend/nb-shared/lib/NBButton";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  retrieveIRSData,
  retrieveIRSDataByHolder,
} from "../../../../store/modules/entities/holder/selectors";
import Accordion from "../../../atoms/Accordion";
import {
  setClean,
  setTaxTransparency,
} from "../../../../store/modules/entities/holder/slices";
import Total from "../../../atoms/Total";
import Text from "../../../atoms/Text";
import info from "../../../../assets/images/info.svg";
import { formatToEuroCurrency } from "../../../../utils/utils";
import TextField from "../../../atoms/TextField";
import { color } from "../../../../utils/colors";

type TransparenciaFiscalProps = {
  readOnly?: boolean;
  tabHolder?: number;
};

const TransparenciaFiscal = (props: TransparenciaFiscalProps) => {
  const { readOnly, tabHolder } = props;
  const { t } = useTranslation();
  const IRSData = useSelector(retrieveIRSData);
  const IRSDataByHolder = useSelector(retrieveIRSDataByHolder(tabHolder!));
  const [isActive, setIsActive] = useState({ 1: false, 2: false });
  const dispatch = useDispatch();

  const handleClean = () => {
    dispatch(setClean("taxTransparency2"));
  };

  const handleFieldChange = (field: string, subfield: string) => {
    return (value: number) => {
      if (field === "societies") {
        dispatch(
          setTaxTransparency({
            data: {
              [field]: {
                ...IRSData?.taxTransparency?.societies,
                [subfield]: value,
              },
            },
          })
        );
      }
      if (field === "complementaryGrouping") {
        dispatch(
          setTaxTransparency({
            data: {
              [field]: {
                ...IRSData?.taxTransparency?.complementaryGrouping,
                [subfield]: value,
              },
            },
          })
        );
      }
    };
  };

  useEffect(() => {
    const profit = IRSData?.taxTransparency?.complementaryGrouping?.profit;
    const losses = IRSData?.taxTransparency?.complementaryGrouping?.losses;
    if (profit === 0 && losses === 0) {
      setIsActive({ 1: false, 2: false });
    }
    if (profit !== 0 && losses === 0) {
      setIsActive({ 1: false, 2: true });
    }
    if (profit === 0 && losses !== 0) {
      setIsActive({ 1: true, 2: false });
    }
  }, [
    IRSData?.taxTransparency?.complementaryGrouping?.profit,
    IRSData?.taxTransparency?.complementaryGrouping?.losses,
  ]);

  return (
    <div>
      {!readOnly && (
        <div className="info-wrapper">
          <img src={info} alt="img" width="18px" />
          <Text
            text={t("taxTransparencyInfo")}
            fontSize="11px"
            margin="0px 0px 0px 10px"
            color={color.nb_bluegray}
            alignSelf="center"
          />
        </div>
      )}
      <Accordion title={t("societies")}>
        <TextField
          defaultValue={
            IRSData?.taxTransparency?.societies?.netIncome === 0
              ? undefined
              : IRSData?.taxTransparency?.societies?.netIncome.toString()!
          }
          label={`${t("netIncome")}*`}
          valueCallback={handleFieldChange("societies", "netIncome")}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.taxTransparency?.societies?.netIncome
                )
              : ""
          }
          isDisabled={readOnly}
        />
        <TextField
          defaultValue={
            IRSData?.taxTransparency?.societies?.withholdingTax === 0
              ? undefined
              : IRSData?.taxTransparency?.societies?.withholdingTax.toString()!
          }
          label={t("withholdingTax")}
          valueCallback={handleFieldChange("societies", "withholdingTax")}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.taxTransparency?.societies?.withholdingTax
                )
              : ""
          }
          isDisabled={readOnly}
        />
      </Accordion>
      <Accordion title={t("complementaryGrouping")}>
        <TextField
          defaultValue={
            IRSData?.taxTransparency?.complementaryGrouping?.profit === 0
              ? undefined
              : IRSData?.taxTransparency?.complementaryGrouping?.profit.toString()!
          }
          label={`${t("profit")}*`}
          valueCallback={handleFieldChange("complementaryGrouping", "profit")}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.taxTransparency?.complementaryGrouping
                    ?.profit
                )
              : ""
          }
          isDisabled={readOnly || isActive[1]}
        />
        <TextField
          defaultValue={
            IRSData?.taxTransparency?.complementaryGrouping?.losses === 0
              ? undefined
              : IRSData?.taxTransparency?.complementaryGrouping?.losses.toString()!
          }
          label={`${t("losses")}*`}
          valueCallback={handleFieldChange("complementaryGrouping", "losses")}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.taxTransparency?.complementaryGrouping
                    ?.losses
                )
              : ""
          }
          isDisabled={readOnly || isActive[2]}
        />
        <TextField
          defaultValue={
            IRSData?.taxTransparency?.complementaryGrouping?.withholdingTax ===
            0
              ? undefined
              : IRSData?.taxTransparency?.complementaryGrouping?.withholdingTax.toString()!
          }
          label={t("withholdingTax")}
          valueCallback={handleFieldChange(
            "complementaryGrouping",
            "withholdingTax"
          )}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.taxTransparency?.complementaryGrouping
                    ?.withholdingTax
                )
              : ""
          }
          isDisabled={readOnly}
        />
      </Accordion>
      <div className="buttons">
        {!readOnly && (
          <NBButton nbtype="Secondary" onClick={handleClean}>
            {t("clean")}
          </NBButton>
        )}
        <Total
          value={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.taxTransparency?.netIncome!
                )
              : formatToEuroCurrency(IRSData?.taxTransparency?.netIncome!)
          }
        />
      </div>
    </div>
  );
};

export default TransparenciaFiscal;
