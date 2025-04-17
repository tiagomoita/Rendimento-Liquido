/* eslint-disable no-nested-ternary */
import { useEffect, useState } from "react";
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
  retrieveTaxes,
} from "../../../../store/modules/entities/holder/selectors";
import { formatToEuroCurrency } from "../../../../utils/utils";

import {
  setClean,
  setIndependentWithOrganizedAccounting,
} from "../../../../store/modules/entities/holder/slices";
import { color } from "../../../../utils/colors";

type IndependenteComContabilidadeOrganizadaProps = {
  readOnly?: boolean;
  tabHolder?: number;
};

const IndependenteComContabilidadeOrganizada = (
  props: IndependenteComContabilidadeOrganizadaProps
) => {
  const { readOnly, tabHolder } = props;
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState({ 1: true, 2: true });
  const dispatch = useDispatch();
  const IRSData = useSelector(retrieveIRSData);
  const IRSDataByHolder = useSelector(retrieveIRSDataByHolder(tabHolder!));
  const Taxes = useSelector(retrieveTaxes);

  useEffect(() => {
    if (
      IRSData?.independentWithOrganizedAccounting?.calculatedProfit === 0 &&
      IRSData?.independentWithOrganizedAccounting?.calculatedLoss === 0
    ) {
      setIsActive({ 1: true, 2: true });
    } else if (
      IRSData?.independentWithOrganizedAccounting?.calculatedProfit !== 0
    ) {
      setIsActive({ ...isActive, 1: false });
    } else if (
      IRSData?.independentWithOrganizedAccounting?.calculatedLoss !== 0
    ) {
      setIsActive({ ...isActive, 2: false });
    }
  }, [
    IRSData?.independentWithOrganizedAccounting?.calculatedProfit,
    IRSData?.independentWithOrganizedAccounting?.calculatedLoss,
  ]);

  const handleClean = () => {
    dispatch(setClean("independentWithOrganizedAccounting2"));
  };

  const handleFieldChange = (field: string) => {
    return (value: number) => {
      dispatch(
        setIndependentWithOrganizedAccounting({
          taxIncidenceRate:
            Taxes?.irsParams.taxIncOnIndWorkOrgAcc.parameterValue!,
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
            text={t("independentWithOrganizedAccountingInfo")}
            fontSize="11px"
            margin="0px 0px 0px 10px"
            color={color.nb_bluegray}
            alignSelf="center"
          />
        </div>
      )}
      <TextField
        label={`${t("calculatedProfit")}*`}
        defaultValue={
          IRSData?.independentWithOrganizedAccounting?.calculatedProfit === 0
            ? undefined
            : IRSData?.independentWithOrganizedAccounting?.calculatedProfit.toString()!
        }
        valueCallback={handleFieldChange("calculatedProfit")}
        placeholder={
          readOnly
            ? formatToEuroCurrency(
                IRSDataByHolder?.independentWithOrganizedAccounting
                  ?.calculatedProfit
              )
            : ""
        }
        isDisabled={!isActive[2].valueOf() || readOnly}
        infoIcon
        textInfo="470"
      />
      <TextField
        label={`${t("calculatedLoss")}*`}
        defaultValue={
          IRSData?.independentWithOrganizedAccounting?.calculatedLoss === 0
            ? undefined
            : IRSData?.independentWithOrganizedAccounting?.calculatedLoss?.toString()!
        }
        valueCallback={handleFieldChange("calculatedLoss")}
        placeholder={
          readOnly
            ? formatToEuroCurrency(
                IRSDataByHolder?.independentWithOrganizedAccounting
                  ?.calculatedLoss
              )
            : ""
        }
        isDisabled={!isActive[1].valueOf() || readOnly}
        infoIcon
        textInfo="469"
      />
      <TextField
        label={t("taxIncidence")}
        placeholder={
          readOnly
            ? formatToEuroCurrency(
                IRSDataByHolder?.independentWithOrganizedAccounting
                  ?.taxIncidence!
              )
            : IRSData?.independentWithOrganizedAccounting?.taxIncidence! === 0
            ? ""
            : formatToEuroCurrency(
                IRSData?.independentWithOrganizedAccounting?.taxIncidence!
              )
        }
        isDisabled
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
              ? formatToEuroCurrency(
                  IRSDataByHolder?.independentWithOrganizedAccounting
                    ?.netIncome!
                )
              : formatToEuroCurrency(
                  IRSData?.independentWithOrganizedAccounting?.netIncome!
                )
          }
        />
      </div>
    </div>
  );
};

export default IndependenteComContabilidadeOrganizada;
