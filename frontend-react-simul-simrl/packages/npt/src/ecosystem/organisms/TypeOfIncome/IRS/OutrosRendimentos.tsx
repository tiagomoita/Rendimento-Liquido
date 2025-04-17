import { NBButton } from "@nb-omc-xit-frontend/nb-shared/lib/NBButton";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import TextField from "../../../atoms/TextField";
import Text from "../../../atoms/Text";
import info from "../../../../assets/images/info.svg";
import "./TypeOfIncome.scss";
import Total from "../../../atoms/Total";
import {
  retrieveIRSData,
  retrieveIRSDataByHolder,
} from "../../../../store/modules/entities/holder/selectors";

import {
  setClean,
  setOtherIncome,
} from "../../../../store/modules/entities/holder/slices";
import { formatToEuroCurrency } from "../../../../utils/utils";
import { color } from "../../../../utils/colors";

type OutrosRendimentosProps = {
  readOnly?: boolean;
  tabHolder?: number;
};

const OutrosRendimentos = (props: OutrosRendimentosProps) => {
  const { readOnly, tabHolder } = props;
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const IRSData = useSelector(retrieveIRSData);
  const IRSDataByHolder = useSelector(retrieveIRSDataByHolder(tabHolder!));

  const handleClean = () => {
    dispatch(setClean("otherIncome2"));
  };

  const handleFieldChange = (field: string) => {
    return (value: number) => {
      dispatch(
        setOtherIncome({
          data: {
            [field]: value,
          },
        })
      );
    };
  };

  return (
    <div>
      {!readOnly && (
        <div className="info-wrapper">
          <img src={info} alt="img" width="18px" />

          <Text
            text={t("otherIncomeInfo")}
            fontSize="11px"
            margin="0px 0px 0px 10px"
            color={color.nb_bluegray}
            alignSelf="center"
          />
        </div>
      )}
      <TextField
        label={`${t("othersNetIncome")}*`}
        defaultValue={
          IRSData?.otherIncome?.otherNetIncome! === 0
            ? undefined
            : IRSData?.otherIncome?.otherNetIncome?.toString()!
        }
        valueCallback={handleFieldChange("otherNetIncome")}
        infoIcon
        placeholder={
          readOnly
            ? formatToEuroCurrency(IRSDataByHolder?.otherIncome?.otherNetIncome)
            : ""
        }
        textInfo={t("othersNetIncomeInfo")}
        isDisabled={readOnly}
      />
      <div className="buttons">
        {!readOnly && (
          <NBButton variant="outlined" onClick={handleClean}>
            {t("clean")}
          </NBButton>
        )}
        <Total
          value={
            readOnly
              ? formatToEuroCurrency(IRSDataByHolder?.otherIncome?.netIncome!)
              : formatToEuroCurrency(IRSData?.otherIncome?.netIncome!)
          }
        />
      </div>
    </div>
  );
};

export default OutrosRendimentos;
