import { useState, ReactNode, useEffect, useRef } from "react";
import "./AccordionCheckbox.scss";
import { NBAccordion } from "@nb-omc-xit-frontend/nb-shared/lib/NBAccordion";
import { NBCheckbox } from "@nb-omc-xit-frontend/nb-shared/lib/NBCheckbox";
import Skeleton from "@mui/material/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  retrieveCleanHolder,
  retrieveCurrentHolder,
  retrieveIRSData,
  retrieveReceiptsData,
} from "../../store/modules/entities/holder/selectors";
import {
  setAlimony,
  setCapitalIncome,
  setClean,
  setDependentsAndPensions,
  setExemptIncomeOrIntellectualProperty,
  setGreenReceipts,
  setIncomeEarnedAbroadForNonResidents,
  setIncomeEarnedAbroadForResidents,
  setIndependentWithOrganizedAccounting,
  setIndependentWithoutOrganizedAccounting,
  setOtherIncome,
  setPropertyIncome,
  setReiceptsPropertyIncome,
  setResearchScholarshipsInternship,
  setSalaryOrPensionReceipts,
  setTaxTransparency,
} from "../../store/modules/entities/holder/slices";
import main from "../../store/modules/main";

type AccordionProps = {
  title: string;
  children?: ReactNode;
  callback?: Function;
  disable?: boolean;
  isDisableCheckbox?: boolean;
};

const AccordionCheckbox = (props: AccordionProps) => {
  const { title, children, callback, disable, isDisableCheckbox } = props;
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const currentHolder = useSelector(retrieveCurrentHolder);
  const cleanHolder = useSelector(retrieveCleanHolder);
  const IRSData = useSelector(retrieveIRSData);
  const ReceiptsData = useSelector(retrieveReceiptsData);
  const dispatch = useDispatch();
  const [minimize, setMinimize] = useState(false);
  const isMounted = useRef(false);
  const isMounted2 = useRef(false);
  const isLoading = useSelector(main.selectors.isLoading);

  useEffect(() => {
    setIsOpen(isDisableCheckbox!);
  }, [currentHolder]);

  useEffect(() => {
    if (isMounted.current) {
      setIsOpen(false);
      setMinimize(false);
    } else {
      isMounted.current = true;
    }
  }, [cleanHolder]);

  useEffect(() => {
    if (isMounted2.current) {
      switch (title) {
        case t("attachmentA").toString(): {
          if (
            IRSData?.dependentsAndPensions?.dependentsAndPensionsCheckBox! ===
            false
          ) {
            dispatch(
              setDependentsAndPensions({
                data: {
                  dependentsAndPensionsCheckBox: true,
                },
              })
            );
          }
          if (
            IRSData?.dependentsAndPensions?.dependentsAndPensionsCheckBox! ===
            true
          ) {
            dispatch(setClean("dependentsAndPensions"));
          }
          break;
        }
        case t("attachmentB").toString(): {
          if (
            IRSData?.independentWithoutOrganizedAccounting
              ?.independentWithoutOrganizedAccountingCheckBox! === false
          ) {
            dispatch(
              setIndependentWithoutOrganizedAccounting({
                data: {
                  independentWithoutOrganizedAccountingCheckBox: true,
                },
              })
            );
          }
          if (
            IRSData?.independentWithoutOrganizedAccounting
              ?.independentWithoutOrganizedAccountingCheckBox! === true
          ) {
            dispatch(setClean("independentWithoutOrganizedAccountingAll"));
          }
          break;
        }
        case t("attachmentC").toString(): {
          if (
            IRSData?.independentWithOrganizedAccounting
              ?.independentWithOrganizedAccountingCheckBox! === false
          ) {
            dispatch(
              setIndependentWithOrganizedAccounting({
                data: {
                  independentWithOrganizedAccountingCheckBox: true,
                },
              })
            );
          }
          if (
            IRSData?.independentWithOrganizedAccounting
              ?.independentWithOrganizedAccountingCheckBox! === true
          ) {
            dispatch(setClean("independentWithOrganizedAccounting"));
          }
          break;
        }
        case t("attachmentD").toString(): {
          if (IRSData?.taxTransparency?.taxTransparencyCheckBox! === false) {
            dispatch(
              setTaxTransparency({
                data: {
                  taxTransparencyCheckBox: true,
                },
              })
            );
          }
          if (IRSData?.taxTransparency?.taxTransparencyCheckBox! === true) {
            dispatch(setClean("taxTransparency"));
          }
          break;
        }
        case t("attachmentE").toString(): {
          if (IRSData?.capitalIncome?.capitalIncomeCheckBox! === false) {
            dispatch(
              setCapitalIncome({
                data: {
                  capitalIncomeCheckBox: true,
                },
              })
            );
          }
          if (IRSData?.capitalIncome?.capitalIncomeCheckBox! === true) {
            dispatch(setClean("capitalIncome"));
          }
          break;
        }
        case t("attachmentF").toString(): {
          if (IRSData?.propertyIncome?.propertyIncomeCheckBox! === false) {
            dispatch(
              setPropertyIncome({
                data: {
                  propertyIncomeCheckBox: true,
                },
              })
            );
          }
          if (IRSData?.propertyIncome?.propertyIncomeCheckBox! === true) {
            dispatch(setClean("propertyIncome"));
          }
          break;
        }
        case t("attachmentH").toString(): {
          if (
            IRSData?.exemptIncomeOrIntellectualProperty
              ?.exemptIncomeOrIntellectualPropertCheckBox! === false
          ) {
            dispatch(
              setExemptIncomeOrIntellectualProperty({
                data: {
                  exemptIncomeOrIntellectualPropertCheckBox: true,
                },
              })
            );
          }
          if (
            IRSData?.exemptIncomeOrIntellectualProperty
              ?.exemptIncomeOrIntellectualPropertCheckBox! === true
          ) {
            dispatch(setClean("exemptIncomeOrIntellectualProperty"));
          }
          break;
        }
        case t("attachmentJ").toString(): {
          if (
            IRSData?.incomeEarnedAbroadForResidents
              ?.incomeEarnedAbroadForResidentsCheckBox! === false
          ) {
            dispatch(
              setIncomeEarnedAbroadForResidents({
                data: {
                  incomeEarnedAbroadForResidentsCheckBox: true,
                },
              })
            );
          }
          if (
            IRSData?.incomeEarnedAbroadForResidents
              ?.incomeEarnedAbroadForResidentsCheckBox! === true
          ) {
            dispatch(setClean("incomeEarnedAbroadForResidents"));
          }
          break;
        }
        case t("incomeEarnedAbroadForNonResidents").toString(): {
          if (
            IRSData?.incomeEarnedAbroadForNonResidents
              ?.incomeEarnedAbroadForNonResidentsCheckBok! === false
          ) {
            dispatch(
              setIncomeEarnedAbroadForNonResidents({
                data: {
                  incomeEarnedAbroadForNonResidentsCheckBok: true,
                },
              })
            );
          }
          if (
            IRSData?.incomeEarnedAbroadForNonResidents
              ?.incomeEarnedAbroadForNonResidentsCheckBok! === true
          ) {
            dispatch(setClean("incomeEarnedAbroadForNonResidents"));
          }
          break;
        }
        case t("otherIncome").toString(): {
          if (IRSData?.otherIncome?.otherIncomeCheckBox! === false) {
            dispatch(
              setOtherIncome({
                data: {
                  otherIncomeCheckBox: true,
                },
              })
            );
          }
          if (IRSData?.otherIncome?.otherIncomeCheckBox! === true) {
            dispatch(setClean("otherIncome"));
          }
          break;
        }
        case t("salaryOrPensionReceipts").toString(): {
          if (
            ReceiptsData?.salaryOrPensionReceipts
              ?.salaryOrPensionReceiptsCheckBox! === false
          ) {
            dispatch(
              setSalaryOrPensionReceipts({
                data: {
                  salaryOrPensionReceiptsCheckBox: true,
                },
              })
            );
          }
          if (
            ReceiptsData?.salaryOrPensionReceipts
              ?.salaryOrPensionReceiptsCheckBox! === true
          ) {
            dispatch(setClean("salaryOrPensionReceipts"));
          }
          break;
        }
        case t("greenReceipts").toString(): {
          if (ReceiptsData?.greenReceipts?.greenReceiptsCheckBox! === false) {
            dispatch(
              setGreenReceipts({
                data: {
                  greenReceiptsCheckBox: true,
                },
              })
            );
          }
          if (ReceiptsData?.greenReceipts?.greenReceiptsCheckBox! === true) {
            dispatch(setClean("greenReceipts"));
          }
          break;
        }
        case t("propertyIncomeReceipts").toString(): {
          if (
            ReceiptsData?.propertyIncomeReceipts?.propertyIncomeRecCheckBox! ===
            false
          ) {
            dispatch(
              setReiceptsPropertyIncome({
                data: {
                  propertyIncomeRecCheckBox: true,
                },
              })
            );
          }
          if (
            ReceiptsData?.propertyIncomeReceipts?.propertyIncomeRecCheckBox! ===
            true
          ) {
            dispatch(setClean("propertyIncomeReceipts"));
          }
          break;
        }
        case t("researchScholarshipsInternshipReceipts").toString(): {
          if (
            ReceiptsData?.researchScholarshipsInternshipReceipts
              ?.researchScholarReceiptsCheckBox! === false
          ) {
            dispatch(
              setResearchScholarshipsInternship({
                data: {
                  researchScholarReceiptsCheckBox: true,
                },
              })
            );
          }
          if (
            ReceiptsData?.researchScholarshipsInternshipReceipts
              ?.researchScholarReceiptsCheckBox! === true
          ) {
            dispatch(setClean("researchScholarshipsInternshipReceipts"));
          }
          break;
        }
        case t("alimonyReceipts").toString(): {
          if (
            ReceiptsData?.alimonyReceipts?.almonyReceiptsCheckBox! === false
          ) {
            dispatch(
              setAlimony({
                data: {
                  almonyReceiptsCheckBox: true,
                },
              })
            );
          }
          if (ReceiptsData?.alimonyReceipts?.almonyReceiptsCheckBox! === true) {
            dispatch(setClean("alimonyReceipts"));
          }
          break;
        }
        default:
      }
    } else {
      isMounted2.current = true;
    }
  }, [isDisabled]);

  return (
    <div className="accordion-wrapper">
      {isLoading ? (
        <Skeleton variant="rectangular" className="skeleton-2" />
      ) : (
        <NBAccordion
          classes="nb-accordion"
          // eslint-disable-next-line react/no-unstable-nested-components
          header={
            <div className="accordion-header">
              <NBCheckbox
                checked={isOpen}
                className="nb-checkbox"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDisabled(!isDisabled);
                  setIsOpen(!isOpen);
                  setMinimize(!minimize);
                  if (callback) {
                    callback(!isOpen);
                  }
                }}
                disabled={disable}
              />
              <b>{title}</b>
            </div>
          }
          // eslint-disable-next-line react/jsx-no-bind
          onChange={() => setMinimize(!minimize)}
          variant="primary"
          expanded={isOpen && minimize}
          disabled={!isOpen}
        >
          {children}
        </NBAccordion>
      )}
    </div>
  );
};

export default AccordionCheckbox;
