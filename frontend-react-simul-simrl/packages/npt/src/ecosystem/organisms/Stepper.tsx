/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import "./Stepper.scss";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { NBTooltip } from "@nb-omc-xit-frontend/nb-data-display/lib/NBTooltip";
import { calculateIsRegularOrIrregular } from "npm-pkg-simul-simrl";

import { useTranslation } from "react-i18next";
import {
  retrieveArrayHolders,
  retrieveCurrentHolder,
  retrieveCurrentNIF,
  retrieveCurrentName,
  retrieveCurrentTypeOfIncome,
  retrieveIRSData,
  retrieveNumberOfHolders,
  retrieveReceiptsData,
  retrieveTaxes,
} from "../../store/modules/entities/holder/selectors";
import {
  setCurrentHolder,
  setCurrentTypeOfIncome,
} from "../../store/modules/entities/holder/slices";
import {
  setIsLoadingFalse,
  setIsLoadingTrue,
} from "../../store/modules/main/slices";
import {
  simulateReceiptsThunk,
  simulateThunk,
} from "../../store/modules/entities/holder/thunks";
import { withThunkWrapper } from "../../utils/utils";
import {
  validateMandatoryFieldsIRS,
  validateMandatoryFieldsReceipts,
} from "../helper/functions";
import { Model3Data } from "../../store/modules/entities/holder/types";
import ERouteUrls from "../../enums/route-urls";
import { useAlert } from "../../hooks/useAlert";

type StepperProps = {
  setModel3Data?: Dispatch<SetStateAction<Model3Data>>;
};

const MyStepper = (props: StepperProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setModel3Data } = props;
  const dispatch = useDispatch<any>();
  const { setAlert } = useAlert();
  const location = useLocation();
  const [steps, setSteps] = useState<string[]>([
    t("numberOfHolders"),
    t("simulationResult"),
  ]);

  const holders = useSelector(retrieveNumberOfHolders);
  const currentName = useSelector(retrieveCurrentName);
  const currentNIF = useSelector(retrieveCurrentNIF);
  const currentHolder = useSelector(retrieveCurrentHolder);
  const arrayHolders = useSelector(retrieveArrayHolders);
  const currentTypeOfIncome = useSelector(retrieveCurrentTypeOfIncome);
  const IRSData = useSelector(retrieveIRSData);
  const ReceiptsData = useSelector(retrieveReceiptsData);
  const Taxes = useSelector(retrieveTaxes);
  const [isButton, setIsButton] = useState(false);
  const [isButtonTaxesGreaterGrossIncome, setIsButtonTaxesGreaterGrossIncome] =
    useState(false);

  useEffect(() => {
    const aux: string[] = [];
    if (holders!) {
      for (let i = 1; i <= holders; i += 1) {
        aux.splice(i, 0, `${i}${t("holderNumber")}`);
      }
      setSteps([t("numberOfHolders"), ...aux, t("simulationResult")]);
    }
  }, [holders]);

  useEffect(() => {
    const aux: string[] = [];
    if (holders!) {
      for (let i = 1; i <= holders; i += 1) {
        aux.splice(i, 0, `${i}${t("holderNumber")}`);
      }
      setSteps([t("numberOfHolders"), ...aux, t("simulationResult")]);
    }
  }, [currentHolder]);

  useEffect(() => {
    if (currentTypeOfIncome === true) {
      validateMandatoryFieldsIRS(
        IRSData,
        setIsButton,
        setIsButtonTaxesGreaterGrossIncome
      );
    }
    if (currentTypeOfIncome === false) {
      validateMandatoryFieldsReceipts(
        ReceiptsData,
        setIsButton,
        calculateIsRegularOrIrregular,
        Taxes
      );
    }
  }, [IRSData, ReceiptsData]);

  const handleClickStep = async (index: number) => {
    if (index === 0) {
      if (!isButton) {
        if (!isButtonTaxesGreaterGrossIncome) {
          if (location.pathname !== ERouteUrls.Simulation) {
            if (setModel3Data)
              setModel3Data({ show: false, title: "", isAttachmentJ: false });
            dispatch(setCurrentHolder(1));
            dispatch(setCurrentTypeOfIncome(true));
            navigate({
              pathname: ERouteUrls.Holders,
              search: window.location.search,
            });
            return;
          }
          if (currentTypeOfIncome === true) {
            if (setModel3Data)
              setModel3Data({ show: false, title: "", isAttachmentJ: false });
            dispatch(setIsLoadingTrue());
            withThunkWrapper(
              dispatch(
                simulateThunk({
                  holderName: currentName,
                  holderNif: currentNIF,
                })
              ),
              async () => {
                dispatch(setCurrentHolder(1));
                dispatch(setCurrentTypeOfIncome(true));
                dispatch(setIsLoadingFalse());
                navigate({
                  pathname: ERouteUrls.Holders,
                  search: window.location.search,
                });
              },
              () => {
                dispatch(setIsLoadingFalse());
                navigate({
                  pathname: ERouteUrls.Holders,
                  search: window.location.search,
                });
                setAlert(
                  "primary-error",
                  t("errors.errorOccurred"),
                  t("errors.errorUnexpected")
                );
              }
            );
          }
          if (currentTypeOfIncome === false) {
            if (setModel3Data)
              setModel3Data({ show: false, title: "", isAttachmentJ: false });
            dispatch(setIsLoadingTrue());
            withThunkWrapper(
              dispatch(
                simulateReceiptsThunk({
                  holderName: currentName,
                  holderNif: currentNIF,
                })
              ),
              async () => {
                dispatch(setCurrentHolder(1));
                dispatch(setCurrentTypeOfIncome(true));
                dispatch(setIsLoadingFalse());
                navigate({
                  pathname: ERouteUrls.Holders,
                  search: window.location.search,
                });
              },
              () => {
                dispatch(setIsLoadingFalse());
                navigate({
                  pathname: ERouteUrls.Holders,
                  search: window.location.search,
                });
                setAlert(
                  "primary-error",
                  t("errors.errorOccurred"),
                  t("errors.errorUnexpected")
                );
              }
            );
          }
        } else {
          setAlert(
            "secondary-error",
            t("errors.errorOccurred"),
            t("errors.sumTaxFieldsGreaterThanGrossIncome")
          );
        }
      } else {
        setAlert(
          "secondary-error",
          t("errors.errorOccurred"),
          t("errors.requiredFieldsToChangePage")
        );
      }
    } else if (index <= holders!) {
      if (location.pathname !== ERouteUrls.Simulation) {
        if (setModel3Data)
          setModel3Data({ show: false, title: "", isAttachmentJ: false });
        dispatch(setCurrentHolder(index));
        dispatch(setCurrentTypeOfIncome(true));
        navigate({
          pathname: ERouteUrls.Simulation,
          search: window.location.search,
        });
        return;
      }

      if (!isButton) {
        if (!isButtonTaxesGreaterGrossIncome) {
          if (currentTypeOfIncome === true) {
            if (setModel3Data)
              setModel3Data({ show: false, title: "", isAttachmentJ: false });
            dispatch(setIsLoadingTrue());
            withThunkWrapper(
              dispatch(
                simulateThunk({
                  holderName: currentName,
                  holderNif: currentNIF,
                })
              ),
              async () => {
                dispatch(setCurrentHolder(index));
                dispatch(setCurrentTypeOfIncome(true));
                dispatch(setIsLoadingFalse());
              },
              () => {
                dispatch(setIsLoadingFalse());
                navigate({
                  pathname: ERouteUrls.Holders,
                  search: window.location.search,
                });
                setAlert(
                  "primary-error",
                  t("errors.errorOccurred"),
                  t("errors.errorUnexpected")
                );
              }
            );
          }
          if (currentTypeOfIncome === false) {
            if (setModel3Data)
              setModel3Data({ show: false, title: "", isAttachmentJ: false });
            dispatch(setIsLoadingTrue());
            withThunkWrapper(
              dispatch(
                simulateReceiptsThunk({
                  holderName: currentName,
                  holderNif: currentNIF,
                })
              ),
              async () => {
                dispatch(setCurrentHolder(index));
                dispatch(setCurrentTypeOfIncome(true));
                dispatch(setIsLoadingFalse());
              },
              () => {
                dispatch(setIsLoadingFalse());
                navigate({
                  pathname: ERouteUrls.Holders,
                  search: window.location.search,
                });
                setAlert(
                  "primary-error",
                  t("errors.errorOccurred"),
                  t("errors.errorUnexpected")
                );
              }
            );
          }
        } else {
          setAlert(
            "secondary-error",
            t("errors.errorOccurred"),
            t("errors.sumTaxFieldsGreaterThanGrossIncome")
          );
        }
      } else {
        setAlert(
          "secondary-error",
          t("errors.errorOccurred"),
          t("errors.requiredFieldsToChangePage")
        );
      }
    }
  };

  const handleStepperWidth = () => {
    switch (holders) {
      case 1:
        return "41%";
      case 2:
        return "54%";
      case 3:
        return "68%";
      case 4:
        return "81%";
      case 5:
        return "94%";
      default:
        return "100%";
    }
  };

  return (
    <div
      className="stepper-wrapper"
      style={{
        width: handleStepperWidth(),
      }}
      data-testid="Stepper-testId"
    >
      <Stepper activeStep={currentHolder} alternativeLabel>
        {steps.map((label, index) => {
          const holder = arrayHolders.find((e: any) => {
            return e.holderNumber === index;
          });
          return (
            <Step key={label} data-testid="step-testId">
              <NBTooltip
                tooltip={
                  label.includes("º")
                    ? holder?.Name === null || holder?.Nif === null
                      ? t("anonymous")
                      : `${t("name")}: ${holder?.Name} \n ${t("nif")}: ${
                          holder?.Nif
                        }`
                    : ""
                }
                variant="dark"
                style={{
                  cursor: label.includes("Resultado") ? "auto" : "pointer",
                }}
              >
                <StepLabel
                  style={{
                    cursor: label.includes("Resultado") ? "auto" : "pointer",
                  }}
                  onClick={() => handleClickStep(index)}
                  data-testid="step-label-testId"
                >
                  {label}
                </StepLabel>
              </NBTooltip>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
};

export default MyStepper;
