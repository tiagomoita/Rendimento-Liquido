import { NBButton } from "@nb-omc-xit-frontend/nb-shared/lib/NBButton";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import TextField from "../../../atoms/TextField";
import "./TypeOfIncome.scss";
import Total from "../../../atoms/Total";
import Accordion from "../../../atoms/Accordion";
import Text from "../../../atoms/Text";
import info from "../../../../assets/images/info.svg";
import {
  retrieveIRSData,
  retrieveIRSDataByHolder,
} from "../../../../store/modules/entities/holder/selectors";

import {
  setClean,
  setPropertyIncome,
} from "../../../../store/modules/entities/holder/slices";
import { formatToEuroCurrency } from "../../../../utils/utils";
import { color } from "../../../../utils/colors";

type RendimentosPrediaisProps = {
  readOnly?: boolean;
  tabHolder?: number;
};

const RendimentosPrediais = (props: RendimentosPrediaisProps) => {
  const { readOnly, tabHolder } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const IRSData = useSelector(retrieveIRSData);
  const IRSDataByHolder = useSelector(retrieveIRSDataByHolder(tabHolder!));

  const handleClean = () => {
    dispatch(setClean("propertyIncome2"));
  };

  const handleFieldChange = (field: string, subfield: string) => {
    return (value: number) => {
      if (field === "earnedIncome") {
        dispatch(
          setPropertyIncome({
            data: {
              [field]: {
                ...IRSData?.propertyIncome?.earnedIncome,
                [subfield]: value,
              },
            },
          })
        );
      }
      if (field === "sublease") {
        dispatch(
          setPropertyIncome({
            data: {
              [field]: {
                ...IRSData?.propertyIncome?.sublease,
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
            text={t("propertyIncomeInfo")}
            fontSize="11px"
            margin="0px 0px 0px 10px"
            color={color.nb_bluegray}
            alignSelf="center"
          />
        </div>
      )}
      <Accordion title={t("earnedIncome")}>
        <TextField
          label={`${t("grossIncome")}*`}
          defaultValue={
            IRSData?.propertyIncome?.earnedIncome?.grossIncome === 0
              ? undefined
              : IRSData?.propertyIncome?.earnedIncome?.grossIncome?.toString()!
          }
          valueCallback={handleFieldChange("earnedIncome", "grossIncome")}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.propertyIncome?.earnedIncome?.grossIncome
                )
              : ""
          }
          isDisabled={readOnly}
        />
        <TextField
          label={t("withholdingTax")}
          defaultValue={
            IRSData?.propertyIncome?.earnedIncome?.withholdingTax === 0
              ? undefined
              : IRSData?.propertyIncome?.earnedIncome?.withholdingTax?.toString()!
          }
          valueCallback={handleFieldChange("earnedIncome", "withholdingTax")}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.propertyIncome?.earnedIncome?.withholdingTax
                )
              : ""
          }
          isDisabled={readOnly}
        />
        <TextField
          label={t("supportedAndPaidExpenses")}
          defaultValue={
            IRSData?.propertyIncome?.earnedIncome?.supportedAndPaidExpenses ===
            0
              ? undefined
              : IRSData?.propertyIncome?.earnedIncome?.supportedAndPaidExpenses?.toString()!
          }
          valueCallback={handleFieldChange(
            "earnedIncome",
            "supportedAndPaidExpenses"
          )}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.propertyIncome?.earnedIncome
                    ?.supportedAndPaidExpenses
                )
              : ""
          }
          isDisabled={readOnly}
        />
      </Accordion>
      <Accordion title={t("sublease")}>
        <TextField
          label={`${t("incomeReceivedByTheSublessor")}*`}
          defaultValue={
            IRSData?.propertyIncome?.sublease?.incomeReceivedByTheSublessor ===
            0
              ? undefined
              : IRSData?.propertyIncome?.sublease?.incomeReceivedByTheSublessor?.toString()!
          }
          valueCallback={handleFieldChange(
            "sublease",
            "incomeReceivedByTheSublessor"
          )}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.propertyIncome?.sublease
                    ?.incomeReceivedByTheSublessor
                )
              : ""
          }
          isDisabled={readOnly}
        />
        <TextField
          label={`${t("rentPaidToLandlord")}*`}
          defaultValue={
            IRSData?.propertyIncome?.sublease?.rentPaidToLandlord === 0
              ? undefined
              : IRSData?.propertyIncome?.sublease?.rentPaidToLandlord?.toString()!
          }
          valueCallback={handleFieldChange("sublease", "rentPaidToLandlord")}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.propertyIncome?.sublease?.rentPaidToLandlord
                )
              : ""
          }
          isDisabled={readOnly}
        />
        <TextField
          label={t("withholdingTax")}
          defaultValue={
            IRSData?.propertyIncome?.sublease?.irsWithholdingTax === 0
              ? undefined
              : IRSData?.propertyIncome?.sublease?.irsWithholdingTax?.toString()!
          }
          valueCallback={handleFieldChange("sublease", "irsWithholdingTax")}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.propertyIncome?.sublease?.irsWithholdingTax
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
                  IRSDataByHolder?.propertyIncome?.netIncome!
                )
              : formatToEuroCurrency(IRSData?.propertyIncome?.netIncome!)
          }
        />
      </div>
    </div>
  );
};

export default RendimentosPrediais;
