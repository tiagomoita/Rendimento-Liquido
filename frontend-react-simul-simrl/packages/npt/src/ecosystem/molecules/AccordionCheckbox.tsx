import {
  useState,
  ReactNode,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import "./AccordionCheckbox.scss";
import { NBAccordion } from "@nb-omc-xit-frontend/nb-shared/lib/NBAccordion";
import { NBCheckbox } from "@nb-omc-xit-frontend/nb-shared/lib/NBCheckbox";
import Skeleton from "@mui/material/Skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { NBTooltip } from "@nb-omc-xit-frontend/nb-data-display/lib/NBTooltip";
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
import infoSolid from "../../assets/images/circle-info-solid.svg";
import { Model3Data } from "../../store/modules/entities/holder/types";

type AccordionProps = {
  title: string;
  children?: ReactNode;
  disable?: boolean;
  isDisableCheckbox?: boolean;
  textInfo?: string;
  infoIcon?: boolean;
  setModel3Data?: Dispatch<SetStateAction<Model3Data>>;
  isOpen: any;
  setIsOpen: any;
  name: string;
  initialIrsChackboxOpenStatus: any;
};

const AccordionCheckbox = (props: AccordionProps) => {
  const {
    title,
    children,
    disable,
    isDisableCheckbox,
    textInfo = "",
    infoIcon,
    setModel3Data,
    isOpen,
    setIsOpen,
    name,
    initialIrsChackboxOpenStatus,
  } = props;
  const { t } = useTranslation();
  const [isDisabled, setIsDisabled] = useState(true);
  const currentHolder = useSelector(retrieveCurrentHolder);
  const cleanHolder = useSelector(retrieveCleanHolder);
  const IRSData = useSelector(retrieveIRSData);
  const ReceiptsData = useSelector(retrieveReceiptsData);
  const dispatch = useDispatch<any>();
  const [check, setCheck] = useState(false);
  const isMounted = useRef(false);
  const isMounted2 = useRef(false);
  const isLoading = useSelector(main.selectors.isLoading);

  useEffect(() => {
    setIsOpen({
      ...initialIrsChackboxOpenStatus,
      [name]: isDisableCheckbox!,
    });
    setCheck(isDisableCheckbox!);
  }, [currentHolder]);

  useEffect(() => {
    if (isMounted.current) {
      setIsOpen({
        ...initialIrsChackboxOpenStatus,
        [name]: false,
      });
      setCheck(false);
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
          // eslint-disable-next-line react/no-unstable-nested-components
          header={
            <div style={{ display: "flex" }}>
              <div className="accordion-header">
                <NBCheckbox
                  style={{ paddingTop: "0px", paddingBottom: "0px" }}
                  checked={check}
                  className="nb-checkbox"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDisabled(!isDisabled);
                    setIsOpen({
                      ...initialIrsChackboxOpenStatus,
                      [name]: !isOpen[name],
                    });
                    setCheck(!check!);
                    if (setModel3Data) {
                      setModel3Data({
                        show: false,
                        title: "",
                        isAttachmentJ: false,
                      });
                    }
                  }}
                  disabled={disable}
                />
                <b>{title}</b>
              </div>
              {infoIcon === true && (
                <div
                  style={{
                    width: "22px",
                    marginLeft: "5px",
                    zIndex: "2",
                    alignSelf: "center",
                  }}
                >
                  <NBTooltip
                    tooltip={textInfo}
                    variant="dark"
                    style={{
                      cursor: "pointer",
                      display: "flex",
                    }}
                  >
                    <img style={{ width: "20px" }} src={infoSolid} alt="img" />
                  </NBTooltip>
                </div>
              )}
            </div>
          }
          // eslint-disable-next-line react/jsx-no-bind
          onChange={() => {
            setIsOpen({
              ...initialIrsChackboxOpenStatus,
              [name]: !isOpen[name],
            });

            if (setModel3Data) {
              setModel3Data({ show: false, title: "", isAttachmentJ: false });
            }
          }}
          variant="primary"
          expanded={isOpen[name] && check}
          disabled={!check}
        >
          {children}
        </NBAccordion>
      )}
    </div>
  );
};

export default AccordionCheckbox;
