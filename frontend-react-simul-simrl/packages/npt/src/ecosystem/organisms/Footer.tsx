/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
import "./Footer.scss";
import { NBButton } from "@nb-omc-xit-frontend/nb-shared/lib/NBButton";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { calculateIsRegularOrIrregular } from "npm-pkg-simul-simrl";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  retrieveCurrentHolder,
  retrieveNumberOfHolders,
  retrieveCurrentTypeOfIncome,
  retrieveIRSData,
  retrieveReceiptsData,
  retrieveIrsOrReceipts,
  retrieveArrayHolders,
  retrieveIRSTotal,
  retrieveReceiptsTotal,
  retrieveTaxes,
  retrieveContext,
  retrieveState,
} from "../../store/modules/entities/holder/selectors";
import {
  increaseCurrentHolder,
  toggleCurrentTypeOfIncome,
  setCleanHolder,
  setClean,
  decreaseCurrentHolder,
  setIrsOrReceipts,
  setNameAndNif,
} from "../../store/modules/entities/holder/slices";

import {
  addAlert,
  removeAlert,
  setIsLoadingFalse,
  setIsLoadingTrue,
} from "../../store/modules/main/slices";
import {
  createContextThunk,
  findBySimulationIdAndHolderReceiptsThunk,
  findBySimulationIdAndHolderThunk,
  simulateReceiptsThunk,
  simulateThunk,
  simulationResultsThunk,
} from "../../store/modules/entities/holder/thunks";
import {
  getQueryParams,
  updateQueryParams,
  withThunkWrapper,
} from "../../utils/utils";
import Cockpit from "../../store/NPTCockpit";
import { Model3Data, holder } from "../../store/modules/entities/holder/types";
import {
  validateMandatoryFieldsIRS,
  validateMandatoryFieldsReceipts,
} from "../helper/functions";

type FooterProps = {
  setModel3Data?: Dispatch<SetStateAction<Model3Data>>;
};

const Footer = (props: FooterProps) => {
  const { t } = useTranslation();
  const { setModel3Data } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { numberOfHolders, loadNPTCtx } = getQueryParams();
  const [buttonName, setButtonName] = useState(t("continue"));
  const state = useSelector(retrieveState);
  const contexto = useSelector(retrieveContext);
  const currentHolder = useSelector(retrieveCurrentHolder);
  const holders = useSelector(retrieveNumberOfHolders);
  const currentTypeOfIncome = useSelector(retrieveCurrentTypeOfIncome);
  const IRSTotal = useSelector(retrieveIRSTotal);
  const ReceiptsTotal = useSelector(retrieveReceiptsTotal);
  const IRSData = useSelector(retrieveIRSData);
  const ReceiptsData = useSelector(retrieveReceiptsData);
  const irsOrReceipts = useSelector(retrieveIrsOrReceipts);
  const arrayHolders = useSelector(retrieveArrayHolders);
  const Taxes = useSelector(retrieveTaxes);
  const [update, setUpdate] = useState(false);
  const [isButton, setIsButton] = useState(false);
  const [isButtonTaxesGreaterGrossIncome, setIsButtonTaxesGreaterGrossIncome] =
    useState(false);
  const [isValidSimulation, setIsValidSimulation] = useState(false);

  const setAlert = (variant: string, title: string, message: string) => {
    const id = Math.random().toString(36).slice(2, 9);

    dispatch(addAlert({ variant, title, message, id }));

    setTimeout(() => {
      dispatch(removeAlert({ id }));
    }, 10000);
  };

  const validateSimulation = () => {
    setIsValidSimulation(false);
    arrayHolders.forEach((elem: holder) => {
      if (
        elem.irsOrReceipts === null ||
        (elem.IRSTotal === 0 && elem.ReceiptsTotal === 0)
      ) {
        setIsValidSimulation(true);
      }
    });
  };

  useEffect(() => {
    if (
      currentHolder === holders &&
      currentTypeOfIncome === false &&
      location.pathname === "/simulation"
    ) {
      setButtonName(t("simulate"));
      validateSimulation();
    } else {
      setButtonName(t("continue"));
    }
  }, [
    currentHolder,
    holders,
    currentTypeOfIncome,
    irsOrReceipts,
    IRSTotal,
    ReceiptsTotal,
  ]);

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

  useEffect(() => {
    setUpdate(!update);
  }, [contexto]);

  const handleFindBySimulationIdAndHolder = async () => {
    dispatch(setIsLoadingTrue());
    await dispatch(findBySimulationIdAndHolderThunk({}));
    dispatch(setIsLoadingFalse());
  };

  const handleFindBySimulationIdAndHolderReceipts = async () => {
    dispatch(setIsLoadingTrue());
    await dispatch(findBySimulationIdAndHolderReceiptsThunk());
    dispatch(setIsLoadingFalse());
  };

  const handleNext = async () => {
    if (setModel3Data) {
      setModel3Data({ show: false, title: "" });
    }
    if (location.pathname === "/") {
      dispatch(setIsLoadingTrue());
      withThunkWrapper(
        dispatch(createContextThunk()),
        async (payload) => {
          if (loadNPTCtx === "yes") {
            try {
              const cockpit = new Cockpit();
              if (!cockpit.get_DadosContexto) {
                throw new Error(t("errors.cockpitNotFound"));
              }
              const dados = cockpit.get_DadosContexto();
              const { Nome = "", Nif = "" } = { ...dados };
              dispatch(
                setNameAndNif({
                  Nome,
                  Nif,
                  currentHolder: 1,
                })
              );
            } catch (error) {
              // Cockpit não encontrado.
            }
          }

          for (let i = 1; i <= parseInt(numberOfHolders, 10); i += 1) {
            const holderName = state.arrayHolders.find(
              (e: holder) => e.holderNumber === i
            )?.Name;
            const holderNif = state.arrayHolders.find(
              (e: holder) => e.holderNumber === i
            )?.Nif;
            const bodyIRS = state.arrayHolders.find(
              (e: holder) => e.holderNumber === i
            )?.IRSData;
            const bodyReceipts = state.arrayHolders.find(
              (e: holder) => e.holderNumber === i
            )?.ReceiptsData;
            const mostRepresentativeCheckBok = state.arrayHolders.find(
              (e: holder) => e.holderNumber === i
            )?.irsOrReceipts;

            await dispatch(
              simulateThunk({ holder: i, holderName, holderNif, bodyIRS })
            );
            await dispatch(
              simulateReceiptsThunk({
                holder: i,
                holderName,
                holderNif,
                bodyReceipts,
                mostRepresentativeCheckBok,
              })
            );
          }

          await handleFindBySimulationIdAndHolder();
          await handleFindBySimulationIdAndHolderReceipts();
          navigate({
            pathname: "/simulation",
            search: updateQueryParams({ simulationId: payload.simulationId }),
          });
          dispatch(setIsLoadingFalse());
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
      return;
    }
    if (currentHolder === holders && currentTypeOfIncome === false) {
      if (!isButton && !isValidSimulation) {
        dispatch(setIsLoadingTrue());
        await dispatch(simulateReceiptsThunk({}));
        withThunkWrapper(
          dispatch(
            simulationResultsThunk({
              toView: undefined,
            })
          ),
          async () => {
            navigate({
              pathname: "/summary",
              search: window.location.search,
            });
            dispatch(increaseCurrentHolder());
            dispatch(setIsLoadingFalse());
            setAlert(
              "primary-success",
              t("successes.success"),
              t("successes.successSimulation")
            );
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
      } else {
        setAlert(
          "secondary-error",
          t("errors.errorOccurred"),
          t("errors.existsHoldersWithoutIncomes")
        );
      }

      return;
    }
    if (!isButton) {
      if (!isButtonTaxesGreaterGrossIncome) {
        if (currentTypeOfIncome === false) {
          dispatch(setIsLoadingTrue());
          withThunkWrapper(
            dispatch(simulateReceiptsThunk({})),
            async () => {
              dispatch(increaseCurrentHolder());
              await handleFindBySimulationIdAndHolder();
              await handleFindBySimulationIdAndHolderReceipts();
              dispatch(setIsLoadingFalse());
              dispatch(toggleCurrentTypeOfIncome());
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
        } else {
          dispatch(setIsLoadingTrue());
          withThunkWrapper(
            dispatch(simulateThunk({})),
            async () => {
              await handleFindBySimulationIdAndHolder();
              await handleFindBySimulationIdAndHolderReceipts();
              dispatch(setIsLoadingFalse());
              dispatch(toggleCurrentTypeOfIncome());
            },
            () => {
              dispatch(setIsLoadingFalse());
              navigate({
                pathname: "/",
                search: window.location.search,
              });
              setAlert(
                "primary-error",
                "Ocorreu um erro",
                "Um erro inesperado aconteceu."
              );
            }
          );
        }
      } else {
        setAlert(
          "secondary-error",
          "Ocorreu um erro",
          "O somatório dos campos de impostos não podem ser superiores ao valor dos rendimentos brutos."
        );
      }
    } else {
      setAlert(
        "secondary-error",
        t("errors.errorOccurred"),
        t("errors.requiredFieldsToChangePage")
      );
    }
  };

  const handlePrevious = async () => {
    if (setModel3Data) {
      setModel3Data({ show: false, title: "" });
    }
    if (!isButton) {
      if (!isButtonTaxesGreaterGrossIncome) {
        if (currentTypeOfIncome === true) {
          if (isButton === false) {
            dispatch(setIsLoadingTrue());
            withThunkWrapper(
              dispatch(simulateThunk({})),
              async () => {
                if (currentHolder === 1) {
                  navigate({
                    pathname: "/",
                    search: window.location.search,
                  });
                }
                dispatch(decreaseCurrentHolder());
                if (currentHolder !== 1) {
                  dispatch(toggleCurrentTypeOfIncome());
                }
                await handleFindBySimulationIdAndHolder();
                await handleFindBySimulationIdAndHolderReceipts();
                dispatch(setIsLoadingFalse());
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
        }
        if (currentTypeOfIncome === false) {
          dispatch(setIsLoadingTrue());

          withThunkWrapper(
            dispatch(simulateReceiptsThunk({})),
            async () => {
              dispatch(toggleCurrentTypeOfIncome());
              await handleFindBySimulationIdAndHolder();
              await handleFindBySimulationIdAndHolderReceipts();
              dispatch(setIsLoadingFalse());
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
  };

  const handleClean = () => {
    if (setModel3Data) {
      setModel3Data({
        title: "",
        show: false,
        indComProIncome: {
          saleOfGoodsAndProducts: 0,
          provisionOfHotelAndSimilarServicesCateringAndBeverage: 0,
          provisionOfCateringAndBeverageActivitiesServices: 0,
          provisionOfHotelServicesAndSimilarActivities: 0,
          provisionOfServRelatedToTheExploOfLocalAccEstablishments: 0,
          incomeFromProActivitiesSpecifArticle151OfTheCIRS: 0,
          incomeFromServicesRenderedNotForeseenInThePreviousFields: 0,
          intellPropertyNotCoveByArtic58OfTheEBFIndOrInforProperty: 0,
          intellPropertyIncoCoveredByArtic58OfTheEBFNonExemptPart: 0,
          positiveBalanOfCapGainsAndLossesAndOtherEquityIncrements: 0,
          incomeFromFinancialActivitiesCAECodesStartWith6465or66: 0,
          servicProvidedByMembToProSocOfTheFiscalTransparencRegime: 0,
          positiveResultOfPropertyIncome: 0,
          propertyIncomeAttributableToCatBIncomeGeneratingActivity: 0,
          operatingSubsidies: 0,
          otherSubsidies: 0,
          categoryBIncomeNotIncludedInPreviousFields: 0,
        },
        agriYieldsSilvLivstck: {
          salesProductsOtherThanThoseIncludField7: 0,
          servicesRendered: 0,
          incomeFromCapitalAndRealEstate: 0,
          positiveResultOfPropertyIncome: 0,
          operatingSubsidiesRelatedToSales: 0,
          otherSubsidies: 0,
          incomeFromSalesMultiannual: 0,
          categoryBIncome: 0,
        },
        otherIncome: { otherIncome: 0 },
      });
    }

    dispatch(setCleanHolder());
    if (currentTypeOfIncome === true) {
      dispatch(setClean("resetIRS"));
    } else {
      dispatch(setClean("resetReceipts"));
      dispatch(setIrsOrReceipts({ irsOrReceipts: null }));
    }
  };

  return (
    <div className="footer-wrapper" data-testid="Footer-testId">
      {location.pathname !== "/" ? (
        <>
          <NBButton
            className="clean-button"
            nbtype="Secondary"
            onClick={handleClean}
          >
            {t("clean")}
          </NBButton>
          <NBButton
            className="previous-button"
            onClick={() => handlePrevious()}
          >
            {t("previous")}
          </NBButton>
        </>
      ) : null}
      <NBButton
        className="continue-button"
        onClick={() => handleNext()}
        disabled={
          ((numberOfHolders === undefined || numberOfHolders === "") &&
            location.pathname === "/") ||
          contexto.Abreviado === undefined
        }
      >
        {buttonName}
      </NBButton>
    </div>
  );
};

export default Footer;
