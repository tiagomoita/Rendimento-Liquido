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
  retrieveCurrentName,
  retrieveCurrentNIF,
} from "../../store/modules/entities/holder/selectors";
import {
  increaseCurrentHolder,
  toggleCurrentTypeOfIncome,
  setCleanHolder,
  setClean,
  decreaseCurrentHolder,
  setIrsOrReceipts,
  setNameAndNif,
  holderDataInitialStateIndComProIncome,
  holderDataInitialStateAgriYieldsSilvLivstck,
} from "../../store/modules/entities/holder/slices";

import {
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
import ERouteUrls from "../../enums/route-urls";
import { useAlert } from "../../hooks/useAlert";

type FooterProps = {
  setModel3Data?: Dispatch<SetStateAction<Model3Data>>;
  isScrollbar?: boolean;
};

const Footer = (props: FooterProps) => {
  const { t } = useTranslation();
  const { setModel3Data, isScrollbar } = props;
  const navigate = useNavigate();
  const { setAlert } = useAlert();
  const location = useLocation();
  const dispatch = useDispatch<any>();
  const { numberOfHolders, loadNPTCtx } = getQueryParams();
  const [buttonName, setButtonName] = useState(t("continue"));
  const state = useSelector(retrieveState);
  const contexto = useSelector(retrieveContext);
  const currentName = useSelector(retrieveCurrentName);
  const currentNIF = useSelector(retrieveCurrentNIF);
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

  const validateSimulation = () => {
    setIsValidSimulation(false);
    if (arrayHolders.length === 1) {
      if (
        !arrayHolders.some(
          (elem: holder) =>
            elem.irsOrReceipts !== null &&
            (elem.IRSTotal !== 0 || elem.ReceiptsTotal !== 0),
        )
      ) {
        setIsValidSimulation(true);
      }
    } else if (
      arrayHolders.every(
        (elem: holder) =>
          elem.irsOrReceipts === null &&
          (elem.IRSTotal !== 0 || elem.ReceiptsTotal !== 0),
      ) ||
      arrayHolders.some(
        (elem: holder) =>
          elem.irsOrReceipts === null &&
          (elem.IRSTotal !== 0 || elem.ReceiptsTotal !== 0),
      ) ||
      arrayHolders.every(
        (elem: holder) => elem.IRSTotal === 0 && elem.ReceiptsTotal === 0,
      )
    ) {
      setIsValidSimulation(true);
    }
  };

  useEffect(() => {
    if (
      currentHolder === holders &&
      currentTypeOfIncome === false &&
      location.pathname === ERouteUrls.Simulation
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
        setIsButtonTaxesGreaterGrossIncome,
      );
    }
    if (currentTypeOfIncome === false) {
      validateMandatoryFieldsReceipts(
        ReceiptsData,
        setIsButton,
        calculateIsRegularOrIrregular,
        Taxes,
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
      setModel3Data({ show: false, title: "", isAttachmentJ: false });
    }
    if (location.pathname === ERouteUrls.Holders) {
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
                }),
              );
            } catch (error) {
              // Cockpit não encontrado.
            }
          }

          for (let i = 1; i <= parseInt(numberOfHolders, 10); i += 1) {
            const holderName = state.arrayHolders.find(
              (e: holder) => e.holderNumber === i,
            )?.Name;
            const holderNif = state.arrayHolders.find(
              (e: holder) => e.holderNumber === i,
            )?.Nif;
            const bodyIRS = state.arrayHolders.find(
              (e: holder) => e.holderNumber === i,
            )?.IRSData;
            const bodyReceipts = state.arrayHolders.find(
              (e: holder) => e.holderNumber === i,
            )?.ReceiptsData;
            const mostRepresentativeCheckBok = state.arrayHolders.find(
              (e: holder) => e.holderNumber === i,
            )?.irsOrReceipts;
            await dispatch(
              simulateThunk({ holder: i, holderName, holderNif, bodyIRS }),
            );
            await dispatch(
              simulateReceiptsThunk({
                holder: i,
                holderName,
                holderNif,
                bodyReceipts,
                mostRepresentativeCheckBok,
              }),
            );
          }

          await handleFindBySimulationIdAndHolder();
          await handleFindBySimulationIdAndHolderReceipts();
          navigate({
            pathname: ERouteUrls.Simulation,
            search: updateQueryParams({ simulationId: payload.simulationId }),
          });
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
            t("errors.errorUnexpected"),
          );
        },
      );
      return;
    }
    if (currentHolder === holders && currentTypeOfIncome === false) {
      if (!isButton && !isValidSimulation) {
        dispatch(setIsLoadingTrue());
        await dispatch(
          simulateReceiptsThunk({
            holderName: currentName,
            holderNif: currentNIF,
          }),
        );
        withThunkWrapper(
          dispatch(
            simulationResultsThunk({
              toView: undefined,
            }),
          ),
          async () => {
            navigate({
              pathname: ERouteUrls.Summary,
              search: window.location.search,
            });
            dispatch(increaseCurrentHolder());
            dispatch(setIsLoadingFalse());
            setAlert(
              "primary-success",
              t("successes.success"),
              t("successes.successSimulation"),
            );
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
              t("errors.errorUnexpected"),
            );
          },
        );
      } else {
        setAlert(
          "secondary-error",
          t("errors.errorOccurred"),
          t("errors.existsHoldersWithoutIncomes"),
        );
      }

      return;
    }
    if (!isButton) {
      if (!isButtonTaxesGreaterGrossIncome) {
        if (currentTypeOfIncome === false) {
          dispatch(setIsLoadingTrue());
          withThunkWrapper(
            dispatch(
              simulateReceiptsThunk({
                holderName: currentName,
                holderNif: currentNIF,
              }),
            ),
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
                pathname: ERouteUrls.Holders,
                search: window.location.search,
              });
              setAlert(
                "primary-error",
                t("errors.errorOccurred"),
                t("errors.errorUnexpected"),
              );
            },
          );
        } else {
          dispatch(setIsLoadingTrue());
          withThunkWrapper(
            dispatch(
              simulateThunk({ holderName: currentName, holderNif: currentNIF }),
            ),
            async () => {
              await handleFindBySimulationIdAndHolder();
              await handleFindBySimulationIdAndHolderReceipts();
              dispatch(setIsLoadingFalse());
              dispatch(toggleCurrentTypeOfIncome());
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
                t("errors.errorUnexpected"),
              );
            },
          );
        }
      } else {
        setAlert(
          "secondary-error",
          t("errors.errorOccurred"),
          t("errors.sumTaxFieldsGreaterThanGrossIncome"),
        );
      }
    } else {
      setAlert(
        "secondary-error",
        t("errors.errorOccurred"),
        t("errors.requiredFieldsToChangePage"),
      );
    }
  };

  const handlePrevious = async () => {
    if (setModel3Data) {
      setModel3Data({ show: false, title: "", isAttachmentJ: false });
    }
    if (!isButton) {
      if (!isButtonTaxesGreaterGrossIncome) {
        if (currentTypeOfIncome === true) {
          if (isButton === false) {
            dispatch(setIsLoadingTrue());
            withThunkWrapper(
              dispatch(
                simulateThunk({
                  holderName: currentName,
                  holderNif: currentNIF,
                }),
              ),
              async () => {
                if (currentHolder === 1) {
                  navigate({
                    pathname: ERouteUrls.Holders,
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
                  pathname: ERouteUrls.Holders,
                  search: window.location.search,
                });
                setAlert(
                  "primary-error",
                  t("errors.errorOccurred"),
                  t("errors.errorUnexpected"),
                );
              },
            );
          }
        }
        if (currentTypeOfIncome === false) {
          dispatch(setIsLoadingTrue());

          withThunkWrapper(
            dispatch(
              simulateReceiptsThunk({
                holderName: currentName,
                holderNif: currentNIF,
              }),
            ),
            async () => {
              dispatch(toggleCurrentTypeOfIncome());
              await handleFindBySimulationIdAndHolder();
              await handleFindBySimulationIdAndHolderReceipts();
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
                t("errors.errorUnexpected"),
              );
            },
          );
        }
      } else {
        setAlert(
          "secondary-error",
          t("errors.errorOccurred"),
          t("errors.sumTaxFieldsGreaterThanGrossIncome"),
        );
      }
    } else {
      setAlert(
        "secondary-error",
        t("errors.errorOccurred"),
        t("errors.requiredFieldsToChangePage"),
      );
    }
  };

  const handleClean = () => {
    if (setModel3Data) {
      setModel3Data({
        title: "",
        show: false,
        isAttachmentJ: false,
        indComProIncome: holderDataInitialStateIndComProIncome,
        agriYieldsSilvLivstck: holderDataInitialStateAgriYieldsSilvLivstck,
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
    document
      ?.getElementById("simulation-scroller")
      ?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="footer-wrapper"
      data-testid="Footer-testId"
      style={{
        marginRight: isScrollbar === false ? "0px" : "16px",
        transition: "margin-right 0.5s ease-in-out",
      }}
    >
      {location.pathname !== ERouteUrls.Holders ? (
        <>
          <div className="clean-button">
            <NBButton variant="outlined" onClick={handleClean}>
              {t("clean")}
            </NBButton>
          </div>
          <div className="previous-button">
            <NBButton
              className="previous-button"
              onClick={() => handlePrevious()}
            >
              {t("previous")}
            </NBButton>
          </div>
        </>
      ) : null}
      <div className="continue-button">
        <NBButton
          onClick={() => handleNext()}
          disabled={
            ((numberOfHolders === undefined || numberOfHolders === "") &&
              location.pathname === ERouteUrls.Holders) ||
            contexto.Abreviado === undefined
          }
        >
          {buttonName}
        </NBButton>
      </div>
    </div>
  );
};

export default Footer;
