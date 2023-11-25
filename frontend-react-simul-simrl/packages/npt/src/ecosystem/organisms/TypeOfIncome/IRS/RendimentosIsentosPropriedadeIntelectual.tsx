import { NBButton } from "@nb-omc-xit-frontend/nb-shared/lib/NBButton";
import { useDispatch, useSelector } from "react-redux";
import { t } from "i18next";
import TextField from "../../../atoms/TextField";
import "./TypeOfIncome.scss";
import Total from "../../../atoms/Total";
import Text from "../../../atoms/Text";
import info from "../../../../assets/images/info.svg";
import Accordion from "../../../atoms/Accordion";
import {
  retrieveIRSData,
  retrieveIRSDataByHolder,
} from "../../../../store/modules/entities/holder/selectors";

import {
  setClean,
  setExemptIncomeOrIntellectualProperty,
} from "../../../../store/modules/entities/holder/slices";
import { formatToEuroCurrency } from "../../../../utils/utils";
import { color } from "../../../../utils/colors";

type RendimentosIsentosPropriedadeIntelectualProps = {
  readOnly?: boolean;
  tabHolder?: number;
};

const RendimentosIsentosPropriedadeIntelectual = (
  props: RendimentosIsentosPropriedadeIntelectualProps
) => {
  const { readOnly, tabHolder } = props;
  const dispatch = useDispatch();
  const IRSData = useSelector(retrieveIRSData);
  const IRSDataByHolder = useSelector(retrieveIRSDataByHolder(tabHolder!));

  const handleClean = () => {
    dispatch(setClean("exemptIncomeOrIntellectualProperty2"));
  };

  const handleFieldChange = (field: string, subfield: string) => {
    return (value: number) => {
      if (field === "exemptIncomeSubjectToAggregation") {
        dispatch(
          setExemptIncomeOrIntellectualProperty({
            data: {
              [field]: {
                ...IRSData?.exemptIncomeOrIntellectualProperty
                  ?.exemptIncomeSubjectToAggregation,
                [subfield]: value,
              },
            },
          })
        );
      }
      if (field === "incomeFromIntellectualPropertyPartiallyExempted") {
        dispatch(
          setExemptIncomeOrIntellectualProperty({
            data: {
              [field]: {
                ...IRSData?.exemptIncomeOrIntellectualProperty
                  ?.incomeFromIntellectualPropertyPartiallyExempted,
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
            text={t("exemptIncomeOrIntellectualPropertyInfo")}
            fontSize="11px"
            margin="0px 0px 0px 10px"
            color={color.nb_bluegray}
            alignSelf="center"
          />
        </div>
      )}
      <Accordion title={t("exemptIncomeSubjectToAggregation")}>
        <TextField
          label={`${t("grossIncome")}*`}
          defaultValue={
            IRSData?.exemptIncomeOrIntellectualProperty
              ?.exemptIncomeSubjectToAggregation?.grossIncome === 0
              ? undefined
              : IRSData?.exemptIncomeOrIntellectualProperty?.exemptIncomeSubjectToAggregation?.grossIncome?.toString()!
          }
          valueCallback={handleFieldChange(
            "exemptIncomeSubjectToAggregation",
            "grossIncome"
          )}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.exemptIncomeOrIntellectualProperty
                    ?.exemptIncomeSubjectToAggregation?.grossIncome
                )
              : ""
          }
          isDisabled={readOnly}
        />
        <TextField
          label={t("withholdingTax")}
          defaultValue={
            IRSData?.exemptIncomeOrIntellectualProperty
              ?.exemptIncomeSubjectToAggregation?.irsWithholdingTax === 0
              ? undefined
              : IRSData?.exemptIncomeOrIntellectualProperty?.exemptIncomeSubjectToAggregation?.irsWithholdingTax?.toString()!
          }
          valueCallback={handleFieldChange(
            "exemptIncomeSubjectToAggregation",
            "irsWithholdingTax"
          )}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.exemptIncomeOrIntellectualProperty
                    ?.exemptIncomeSubjectToAggregation?.irsWithholdingTax
                )
              : ""
          }
          isDisabled={readOnly}
        />
      </Accordion>
      <Accordion title={t("incomeFromIntellectualPropertyPartiallyExempted")}>
        <TextField
          label={`${t("incomes")}*`}
          defaultValue={
            IRSData?.exemptIncomeOrIntellectualProperty
              ?.incomeFromIntellectualPropertyPartiallyExempted?.income === 0
              ? undefined
              : IRSData?.exemptIncomeOrIntellectualProperty?.incomeFromIntellectualPropertyPartiallyExempted?.income?.toString()!
          }
          valueCallback={handleFieldChange(
            "incomeFromIntellectualPropertyPartiallyExempted",
            "income"
          )}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.exemptIncomeOrIntellectualProperty
                    ?.incomeFromIntellectualPropertyPartiallyExempted?.income
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
                  IRSDataByHolder?.exemptIncomeOrIntellectualProperty
                    ?.netIncome!
                )
              : formatToEuroCurrency(
                  IRSData?.exemptIncomeOrIntellectualProperty?.netIncome!
                )
          }
        />
      </div>
    </div>
  );
};

export default RendimentosIsentosPropriedadeIntelectual;
