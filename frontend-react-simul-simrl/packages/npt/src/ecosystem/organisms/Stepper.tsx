/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import "./Stepper.scss";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { NBTooltip } from "@nb-omc-xit-frontend/nb-data-display/lib/NBTooltip";
import { calculateIsRegularOrIrregular } from "npm-pkg-simul-simrl";

import { useTranslation } from "react-i18next";
import {
  retrieveArrayHolders,
  retrieveCurrentHolder,
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
  addAlert,
  removeAlert,
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

const MyStepper = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch<any>();
  const location = useLocation();
  const [steps, setSteps] = useState<string[]>([
    t("numberOfHolders"),
    t("collectedInfoSuccess"),
  ]);

  const holders = useSelector(retrieveNumberOfHolders);
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
      setSteps([t("numberOfHolders"), ...aux, t("collectedInfoSuccess")]);
    }
  }, [holders]);

  useEffect(() => {
    const aux: string[] = [];
    if (holders!) {
      for (let i = 1; i <= holders; i += 1) {
        aux.splice(i, 0, `${i}${t("holderNumber")}`);
      }
      setSteps([t("numberOfHolders"), ...aux, t("collectedInfoSuccess")]);
    }
  }, [currentHolder]);

  const setAlert = (variant: string, title: string, message: string) => {
    const id = Math.random().toString(36).slice(2, 9);

    dispatch(addAlert({ variant, title, message, id }));

    setTimeout(() => {
      dispatch(removeAlert({ id }));
    }, 10000);
  };

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
    dispatch(setIsLoadingTrue());
    if (index === 0) {
      if (!isButton) {
        if (!isButtonTaxesGreaterGrossIncome) {
          if (location.pathname !== "/simulation") {
            dispatch(setCurrentHolder(1));
            dispatch(setCurrentTypeOfIncome(true));
            dispatch(setIsLoadingFalse());
            navigate({
              pathname: "/",
              search: window.location.search,
            });
            return;
          }
          if (currentTypeOfIncome === true) {
            withThunkWrapper(
              dispatch(simulateThunk({})),
              async () => {
                dispatch(setCurrentHolder(1));
                dispatch(setCurrentTypeOfIncome(true));
                dispatch(setIsLoadingFalse());
                navigate({
                  pathname: "/",
                  search: window.location.search,
                });
              },
              () => {
                dispatch(setIsLoadingFalse());
                navigate({
                  pathname: "/",
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
            withThunkWrapper(
              dispatch(simulateReceiptsThunk({})),
              async () => {
                dispatch(setCurrentHolder(1));
                dispatch(setCurrentTypeOfIncome(true));
                dispatch(setIsLoadingFalse());
                navigate({
                  pathname: "/",
                  search: window.location.search,
                });
              },
              () => {
                dispatch(setIsLoadingFalse());
                navigate({
                  pathname: "/",
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
      if (location.pathname !== "/simulation") {
        dispatch(setCurrentHolder(index));
        dispatch(setCurrentTypeOfIncome(true));
        dispatch(setIsLoadingFalse());
        navigate({
          pathname: "/simulation",
          search: window.location.search,
        });
        return;
      }

      if (!isButton) {
        if (!isButtonTaxesGreaterGrossIncome) {
          if (currentTypeOfIncome === true) {
            withThunkWrapper(
              dispatch(simulateThunk({})),
              async () => {
                dispatch(setCurrentHolder(index));
                dispatch(setCurrentTypeOfIncome(true));
              },
              () => {
                dispatch(setIsLoadingFalse());
                navigate({
                  pathname: "/",
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
            withThunkWrapper(
              dispatch(simulateReceiptsThunk({})),
              async () => {
                dispatch(setCurrentHolder(index));
                dispatch(setCurrentTypeOfIncome(true));
              },
              () => {
                dispatch(setIsLoadingFalse());
                navigate({
                  pathname: "/",
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
    dispatch(setIsLoadingFalse());
  };

  return (
    <div className="stepper-wrapper" data-testid="Stepper-testId">
      <Box>
        <Stepper activeStep={currentHolder} alternativeLabel>
          {steps.map((label, index) => {
            const holder = arrayHolders.find((e: any) => {
              return e.holderNumber === index;
            });
            return (
              <Step key={label} data-testid="step-testId">
                <NBTooltip
                  tooltip={
                    label.includes("º") && label.charAt(0) !== "1"
                      ? t("anonymous")
                      : label.includes("º")
                      ? holder?.Name === null || holder?.Nif === null
                        ? t("anonymous")
                        : `${t("name")}: ${holder?.Name} \n ${t("nif")}: ${
                            holder?.Nif
                          }`
                      : ""
                  }
                  variant="dark"
                >
                  <StepLabel
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
      </Box>
    </div>
  );
};

export default MyStepper;
