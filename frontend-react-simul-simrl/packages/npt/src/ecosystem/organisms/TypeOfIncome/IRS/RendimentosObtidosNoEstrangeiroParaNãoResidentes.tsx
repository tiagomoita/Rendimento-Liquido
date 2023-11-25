import { NBButton } from "@nb-omc-xit-frontend/nb-shared/lib/NBButton";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Accordion from "../../../atoms/Accordion";
import "./TypeOfIncome.scss";
import Total from "../../../atoms/Total";
import TextField from "../../../atoms/TextField";
import Text from "../../../atoms/Text";
import info from "../../../../assets/images/info.svg";
import {
  retrieveIRSData,
  retrieveIRSDataByHolder,
} from "../../../../store/modules/entities/holder/selectors";

import {
  setClean,
  setIncomeEarnedAbroadForNonResidents,
} from "../../../../store/modules/entities/holder/slices";
import { formatToEuroCurrency } from "../../../../utils/utils";
import { color } from "../../../../utils/colors";

type RendimentosObtidosNoEstrangeiroParaNãoResidentesProps = {
  readOnly?: boolean;
  tabHolder?: number;
};

const RendimentosObtidosNoEstrangeiroParaNãoResidentes = (
  props: RendimentosObtidosNoEstrangeiroParaNãoResidentesProps
) => {
  const { readOnly, tabHolder } = props;
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const IRSData = useSelector(retrieveIRSData);
  const IRSDataByHolder = useSelector(retrieveIRSDataByHolder(tabHolder!));

  const handleClean = () => {
    dispatch(setClean("incomeEarnedAbroadForNonResidents2"));
  };

  const handleFieldChange = (field: string, subfield: string) => {
    return (value: number) => {
      if (field === "incomeNotExemptFromTax") {
        dispatch(
          setIncomeEarnedAbroadForNonResidents({
            data: {
              [field]: {
                ...IRSData?.incomeEarnedAbroadForNonResidents
                  ?.incomeNotExemptFromTax,
                [subfield]: value,
              },
            },
          })
        );
      }
      if (field === "taxFreeIncome") {
        dispatch(
          setIncomeEarnedAbroadForNonResidents({
            data: {
              [field]: {
                ...IRSData?.incomeEarnedAbroadForNonResidents?.taxFreeIncome,
                [subfield]: value,
              },
            },
          })
        );
      }
    };
  };

  return (
    <div>
      {!readOnly && (
        <div className="info-wrapper">
          <img src={info} alt="img" width="18px" />

          <Text
            text={t("incomeEarnedAbroadForNonResidentsInfo")}
            fontSize="11px"
            margin="0px 0px 0px 10px"
            color={color.nb_bluegray}
            alignSelf="center"
          />
        </div>
      )}
      <Accordion title={t("incomeNotExemptFromTax")}>
        <TextField
          label={`${t("grossIncome")}*`}
          defaultValue={
            IRSData?.incomeEarnedAbroadForNonResidents?.incomeNotExemptFromTax
              ?.grossIncome === 0
              ? undefined
              : IRSData?.incomeEarnedAbroadForNonResidents?.incomeNotExemptFromTax?.grossIncome?.toString()!
          }
          valueCallback={handleFieldChange(
            "incomeNotExemptFromTax",
            "grossIncome"
          )}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.incomeEarnedAbroadForNonResidents
                    ?.incomeNotExemptFromTax?.grossIncome
                )
              : ""
          }
          isDisabled={readOnly}
        />
        <TextField
          label={t("taxPaidAbroad")}
          defaultValue={
            IRSData?.incomeEarnedAbroadForNonResidents?.incomeNotExemptFromTax
              ?.taxPaidAbroad === 0
              ? undefined
              : IRSData?.incomeEarnedAbroadForNonResidents?.incomeNotExemptFromTax?.taxPaidAbroad?.toString()!
          }
          valueCallback={handleFieldChange(
            "incomeNotExemptFromTax",
            "taxPaidAbroad"
          )}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.incomeEarnedAbroadForNonResidents
                    ?.incomeNotExemptFromTax?.taxPaidAbroad
                )
              : ""
          }
          isDisabled={readOnly}
        />
        <TextField
          label={t("taxWithheldAbroad")}
          defaultValue={
            IRSData?.incomeEarnedAbroadForNonResidents?.incomeNotExemptFromTax
              ?.taxWithheldAbroad === 0
              ? undefined
              : IRSData?.incomeEarnedAbroadForNonResidents?.incomeNotExemptFromTax?.taxWithheldAbroad?.toString()!
          }
          valueCallback={handleFieldChange(
            "incomeNotExemptFromTax",
            "taxWithheldAbroad"
          )}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.incomeEarnedAbroadForNonResidents
                    ?.incomeNotExemptFromTax?.taxWithheldAbroad
                )
              : ""
          }
          isDisabled={readOnly}
        />
        <TextField
          label={t("chargesForSocialSecurityorEquivalent")}
          defaultValue={
            IRSData?.incomeEarnedAbroadForNonResidents?.incomeNotExemptFromTax
              ?.chargesForSocialSecurityorEquivalent === 0
              ? undefined
              : IRSData?.incomeEarnedAbroadForNonResidents?.incomeNotExemptFromTax?.chargesForSocialSecurityorEquivalent?.toString()!
          }
          valueCallback={handleFieldChange(
            "incomeNotExemptFromTax",
            "chargesForSocialSecurityorEquivalent"
          )}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.incomeEarnedAbroadForNonResidents
                    ?.incomeNotExemptFromTax
                    ?.chargesForSocialSecurityorEquivalent
                )
              : ""
          }
          isDisabled={readOnly}
        />
      </Accordion>
      <Accordion title={t("taxFreeIncome")}>
        <TextField
          label={`${t("grossIncome")}*`}
          defaultValue={
            IRSData?.incomeEarnedAbroadForNonResidents?.taxFreeIncome
              ?.grossIncome === 0
              ? undefined
              : IRSData?.incomeEarnedAbroadForNonResidents?.taxFreeIncome?.grossIncome?.toString()!
          }
          valueCallback={handleFieldChange("taxFreeIncome", "grossIncome")}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.incomeEarnedAbroadForNonResidents
                    ?.taxFreeIncome?.grossIncome
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
                  IRSDataByHolder?.incomeEarnedAbroadForNonResidents?.netIncome!
                )
              : formatToEuroCurrency(
                  IRSData?.incomeEarnedAbroadForNonResidents?.netIncome!
                )
          }
        />
      </div>
    </div>
  );
};

export default RendimentosObtidosNoEstrangeiroParaNãoResidentes;
