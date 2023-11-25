import "./Resume.scss";
import { useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import { useTranslation } from "react-i18next";
import Text from "../atoms/Text";
import HolderTotal from "../molecules/HolderTotal";
import {
  retrieveArrayHolders,
  retrieveSimulationId,
} from "../../store/modules/entities/holder/selectors";

import {
  holder,
  holderData,
  ReceiptsData,
} from "../../store/modules/entities/holder/types";
import { roundValue } from "../../utils/utils";
import main from "../../store/modules/main";

const Resume = () => {
  const arrayHolders = useSelector(retrieveArrayHolders);
  const simulationId = useSelector(retrieveSimulationId);
  const isLoading = useSelector(main.selectors.isLoading);
  const { t } = useTranslation();

  const calculateIRSTotal = (data: holderData) => {
    const {
      dependentsAndPensions,
      independentWithOrganizedAccounting,
      independentWithoutOrganizedAccounting,
      // taxTransparency,
      propertyIncome,
      exemptIncomeOrIntellectualProperty,
      incomeEarnedAbroadForResidents,
      capitalIncome,
      incomeEarnedAbroadForNonResidents,
      otherIncome,
    } = data;
    const result =
      (dependentsAndPensions ? dependentsAndPensions.netIncome! : 0) +
      (independentWithOrganizedAccounting
        ? independentWithOrganizedAccounting.netIncome!
        : 0) +
      (independentWithoutOrganizedAccounting
        ? independentWithoutOrganizedAccounting.netIncome!
        : 0) +
      // (taxTransparency ? taxTransparency.netIncome! : 0) +
      (propertyIncome ? propertyIncome.netIncome! : 0) +
      (exemptIncomeOrIntellectualProperty
        ? exemptIncomeOrIntellectualProperty.netIncome!
        : 0) +
      (incomeEarnedAbroadForResidents
        ? incomeEarnedAbroadForResidents.netIncome!
        : 0) +
      (capitalIncome ? capitalIncome.netIncome! : 0) +
      (incomeEarnedAbroadForNonResidents
        ? incomeEarnedAbroadForNonResidents.netIncome!
        : 0) +
      (otherIncome ? otherIncome.netIncome! : 0);
    return roundValue(result);
  };

  const calculateReceiptsTotal = (data: ReceiptsData) => {
    const {
      salaryOrPensionReceipts,
      greenReceipts,
      propertyIncomeReceipts,
      researchScholarshipsInternshipReceipts,
      alimonyReceipts,
    } = data;
    const result =
      (salaryOrPensionReceipts
        ? salaryOrPensionReceipts.averageNetIncome!
        : 0) +
      (greenReceipts ? greenReceipts.averageNetIncome! : 0) +
      (propertyIncomeReceipts ? propertyIncomeReceipts.averageNetIncome! : 0) +
      (researchScholarshipsInternshipReceipts
        ? researchScholarshipsInternshipReceipts.averageNetIncome!
        : 0) +
      (alimonyReceipts ? alimonyReceipts.averageNetIncome! : 0);

    return roundValue(result);
  };

  return (
    <div>
      {isLoading ? (
        <Skeleton variant="rectangular" className="skeleton-1" />
      ) : (
        <div className="resume-wrapper">
          <div className="resume-header">
            <Text
              className="title"
              text={<b>{t("irsNetIncome")}</b>}
              fontSize="18px"
            />
            <Text
              className="reference"
              text={
                <p>
                  {t("simulationRef")} <b>#{simulationId!}</b>
                </p>
              }
              fontSize="14px"
            />
          </div>
          {arrayHolders &&
            arrayHolders.map((elem: holder) => {
              return (
                <HolderTotal
                  key={elem.holderNumber}
                  title={elem.holderNumber}
                  irsValue={calculateIRSTotal(elem.IRSData)}
                  receiptValue={calculateReceiptsTotal(elem.ReceiptsData)}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Resume;
