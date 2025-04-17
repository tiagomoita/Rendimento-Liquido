/* eslint-disable max-len */
import { useDispatch, useSelector } from "react-redux";
import { NBButton } from "@nb-omc-xit-frontend/nb-shared/lib/NBButton";
import { useTranslation } from "react-i18next";
import TextField from "../../../atoms/TextField";
import Text from "../../../atoms/Text";
import Total from "../../../atoms/Total";
import info from "../../../../assets/images/info.svg";
import "./TypeOfIncome.scss";
import {
  setClean,
  setDependentsAndPensions,
} from "../../../../store/modules/entities/holder/slices";
import {
  retrieveIRSData,
  retrieveIRSDataByHolder,
} from "../../../../store/modules/entities/holder/selectors";
// eslint-disable-next-line import/order
import { formatToEuroCurrency } from "../../../../utils/utils";
import { color } from "../../../../utils/colors";

type DependenteOuPensoesProps = {
  readOnly?: boolean;
  tabHolder?: number;
};

const DependenteOuPensoes = (props: DependenteOuPensoesProps) => {
  const { readOnly, tabHolder } = props;
  const { t } = useTranslation();
  const IRSData = useSelector(retrieveIRSData);
  const IRSDataByHolder = useSelector(retrieveIRSDataByHolder(tabHolder!));
  const dispatch = useDispatch();

  const handleClean = () => {
    dispatch(setClean("dependentsAndPensions2"));
  };

  const handleFieldChange = (field: string) => {
    return (value: number) => {
      dispatch(
        setDependentsAndPensions({
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
            text={t("dependentsAndPensionsInfo")}
            fontSize="11px"
            margin="0px 0px 0px 10px"
            color={color.nb_bluegray}
            alignSelf="center"
          />
        </div>
      )}
      <TextField
        defaultValue={
          IRSData?.dependentsAndPensions?.grossIncome === 0
            ? undefined
            : IRSData?.dependentsAndPensions?.grossIncome?.toString()!
        }
        label={`${t("grossIncome")}*`}
        valueCallback={handleFieldChange("grossIncome")}
        textInfo={t("grossIncomeInfo")}
        placeholder={
          readOnly
            ? formatToEuroCurrency(
                IRSDataByHolder?.dependentsAndPensions?.grossIncome
              )
            : ""
        }
        isDisabled={readOnly}
      />
      <TextField
        defaultValue={
          IRSData?.dependentsAndPensions?.irsWithholdingTax === 0
            ? undefined
            : IRSData?.dependentsAndPensions?.irsWithholdingTax.toString()!
        }
        label={t("withholdingTax")}
        valueCallback={handleFieldChange("irsWithholdingTax")}
        placeholder={
          readOnly
            ? formatToEuroCurrency(
                IRSDataByHolder?.dependentsAndPensions?.irsWithholdingTax
              )
            : ""
        }
        isDisabled={readOnly}
      />
      <TextField
        defaultValue={
          IRSData?.dependentsAndPensions?.surchargeWithholding === 0
            ? undefined
            : IRSData?.dependentsAndPensions?.surchargeWithholding?.toString()!
        }
        label={t("surchargeWithholding")}
        valueCallback={handleFieldChange("surchargeWithholding")}
        placeholder={
          readOnly
            ? formatToEuroCurrency(
                IRSDataByHolder?.dependentsAndPensions?.surchargeWithholding
              )
            : ""
        }
        isDisabled={readOnly}
      />
      <TextField
        defaultValue={
          IRSData?.dependentsAndPensions?.mandatoryContributionsToSecSocial ===
          0
            ? undefined
            : IRSData?.dependentsAndPensions?.mandatoryContributionsToSecSocial?.toString()!
        }
        label={t("mandatoryContributionsToSecSocial")}
        valueCallback={handleFieldChange("mandatoryContributionsToSecSocial")}
        placeholder={
          readOnly
            ? formatToEuroCurrency(
                IRSDataByHolder?.dependentsAndPensions
                  ?.mandatoryContributionsToSecSocial
              )
            : ""
        }
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
              ? formatToEuroCurrency(
                  IRSDataByHolder?.dependentsAndPensions?.netIncome!
                )
              : formatToEuroCurrency(IRSData?.dependentsAndPensions?.netIncome!)
          }
        />
      </div>
    </div>
  );
};

export default DependenteOuPensoes;
