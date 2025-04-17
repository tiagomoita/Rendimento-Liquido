import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { withNBRoot } from "@nb-omc-xit-frontend/nb-shared/lib/NBRoot";

// Enums

import { useTranslation } from "react-i18next";
import { Buffer } from "buffer";
import { NBLoader } from "@nb-omc-xit-frontend/nb-shared/lib/NBLoader";
import ERouteUrls from "../enums/route-urls";

// Routes
import { Holders } from "./routes/Holders";
import { Simulation } from "./routes/Simulation";
import { Summary } from "./routes/Summary";

// Wrappers
import { ExceptionHandler } from "./wrappers/ExceptionHandler";

// Thunks
import main from "../store/modules/main";
import {
  setIsLoadingFalse,
  setIsLoadingTrue,
} from "../store/modules/main/slices";
import {
  getContextThunk,
  simulationResultsThunk,
  getContextWFThunk,
  getTaxesThunk,
} from "../store/modules/entities/holder/thunks";
import {
  getQueryParams,
  updateQueryParams,
  withThunkWrapper,
} from "../utils/utils";
import InfoMessage from "./molecules/InfoMessage";
import {
  setContext,
  setCurrentHolder,
  setCurrentTypeOfIncome,
} from "../store/modules/entities/holder/slices";
import Cockpit from "../store/NPTCockpit";
import EntitiesCode from "../enums/entities-code";
import { useAlert } from "../hooks/useAlert";

const Ecosystem = () => {
  const navigate = useNavigate();
  const { setAlert } = useAlert();
  const location = useLocation();
  const {
    simulationId,
    numberOfHolders,
    loadNPTCtx,
    referenceWF,
    holdersWF,
    Entity,
  } = getQueryParams();
  const holdersWFaux: any =
    holdersWF && JSON.parse(Buffer.from(holdersWF, "base64").toString("utf-8"));
  const isLoading = useSelector(main.selectors.isLoading);
  const dispatch = useDispatch<any>();
  const ref: any = useRef();
  const { t } = useTranslation();

  useEffect(() => {
    if (window.location.href.includes("localhost")) {
      navigate({
        pathname: ERouteUrls.Holders,
        search: updateQueryParams({
          Entity: EntitiesCode.BES,
        }),
      });
    }

    if (location.pathname === ERouteUrls.Holders && loadNPTCtx === "yes") {
      try {
        const cockpit = new Cockpit();
        if (cockpit.get_DadosContexto) {
          const CodigoBanco = cockpit.read("ENTIDADE", "CodigoBanco");
          navigate({
            pathname: "",
            search: updateQueryParams({
              Entity: CodigoBanco.toString(),
            }),
          });
          throw new Error(t("errors.cockpitNotFound"));
        }
      } catch (error) {
        // Cockpit não encontrado.
      }
    }

    // Load Taxes
    dispatch(setIsLoadingTrue());
    withThunkWrapper(
      dispatch(getTaxesThunk()),
      () => {
        // Load Context By Simulation ID
        if (simulationId !== null && simulationId !== undefined) {
          dispatch(setIsLoadingTrue());
          withThunkWrapper(
            dispatch(getContextThunk()),
            async () => {
              if (location.pathname !== ERouteUrls.Summary) {
                dispatch(setCurrentHolder(1));
                dispatch(setCurrentTypeOfIncome(true));
                navigate({
                  pathname: ERouteUrls.Holders,
                  search: window.location.search,
                });
                ref.current.updateHolders(numberOfHolders.toString());
              }
              if (location.pathname === ERouteUrls.Summary) {
                withThunkWrapper(
                  dispatch(simulationResultsThunk({ toView: "toView" })),
                  async () => {
                    dispatch(setCurrentHolder(Number(numberOfHolders) + 1));
                    navigate({
                      pathname: ERouteUrls.Summary,
                      search: window.location.search,
                    });
                    if (
                      Entity === EntitiesCode.BES ||
                      Entity === EntitiesCode.BAC ||
                      Entity === EntitiesCode.BEST
                    ) {
                      dispatch(setContext({ Abreviado: Entity }));
                    }
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

        // Load Context By Reference WF and Initialize APP
        if (
          referenceWF !== null &&
          referenceWF !== undefined &&
          holdersWF !== null &&
          holdersWF !== undefined
        ) {
          dispatch(setIsLoadingTrue());
          withThunkWrapper(
            dispatch(getContextWFThunk()),
            async () => {
              dispatch(setCurrentHolder(1));
              dispatch(setCurrentTypeOfIncome(true));
              navigate({
                pathname: ERouteUrls.Holders,
                search: window.location.search,
              });
              ref.current.updateHolders(holdersWFaux?.holders?.length);
              dispatch(setIsLoadingFalse());
            },
            () => {
              dispatch(setCurrentHolder(1));
              dispatch(setCurrentTypeOfIncome(true));
              navigate({
                pathname: ERouteUrls.Holders,
                search: window.location.search,
              });
              ref.current.updateHolders(holdersWFaux?.holders?.length);
              dispatch(setIsLoadingFalse());
            }
          );
        }

        // Load Context By Reference WF and Redirect do Summary Page
        if (
          referenceWF !== null &&
          referenceWF !== undefined &&
          holdersWF === undefined
        ) {
          dispatch(setIsLoadingTrue());
          withThunkWrapper(
            dispatch(getContextWFThunk()),
            async () => {
              navigate({
                pathname: ERouteUrls.Summary,
                search: window.location.search,
              });
              if (
                Entity === EntitiesCode.BES ||
                Entity === EntitiesCode.BAC ||
                Entity === EntitiesCode.BEST
              ) {
                dispatch(setContext({ Abreviado: Entity }));
              }

              dispatch(setIsLoadingFalse());
            },
            (response) => {
              dispatch(setIsLoadingFalse());
              navigate({
                pathname: ERouteUrls.Holders,
                search: window.location.search,
              });
              if (
                response.payload.metadata.status.title ===
                t("errors.simulationNotFound")
              ) {
                setAlert(
                  "primary-error",
                  t("errors.errorOccurred"),
                  `${t("errors.simulationNotFoundMessage")} ${referenceWF}.`
                );
              } else {
                setAlert(
                  "primary-error",
                  t("errors.errorOccurred"),
                  t("errors.errorUnexpected")
                );
              }
            }
          );
        }
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
  }, []);

  return (
    <>
      {isLoading && <NBLoader variant="overlay" />}
      <InfoMessage />
      <Routes>
        <Route path={ERouteUrls.Holders} element={<Holders ref={ref} />} />
        <Route path={ERouteUrls.Simulation} element={<Simulation />} />
        <Route path={ERouteUrls.Summary} element={<Summary />} />
        <Route
          path="*"
          element={<Navigate to={ERouteUrls.Holders} replace />}
        />
      </Routes>
    </>
  );
};

export default withNBRoot(ExceptionHandler(Ecosystem));
