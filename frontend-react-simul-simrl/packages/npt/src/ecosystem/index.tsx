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
import { NBLoader } from "@nb-omc-xit-frontend/nb-shared/lib/NBLoader";

// Enums

import { useTranslation } from "react-i18next";
import ERouteUrls from "../enums/route-urls";

// Routes
import { Holders } from "./routes/Holders";
import { Simulation } from "./routes/Simulation";
import { Summary } from "./routes/Summary";

// Wrappers
import { withExceptionHandler } from "./wrappers/ExceptionHandler";

// Thunks
import main from "../store/modules/main";
import {
  addAlert,
  removeAlert,
  setIsLoadingFalse,
  setIsLoadingTrue,
} from "../store/modules/main/slices";
import {
  getTaxesThunk,
  getContextThunk,
  simulationResultsThunk,
} from "../store/modules/entities/holder/thunks";
import {
  getQueryParams,
  updateQueryParams,
  withThunkWrapper,
} from "../utils/utils";
import InfoMessage from "./molecules/InfoMessage";
import {
  setCurrentHolder,
  setCurrentTypeOfIncome,
} from "../store/modules/entities/holder/slices";
import Cockpit from "../store/NPTCockpit";

const Ecosystem = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { numberOfHolders } = getQueryParams();
  const isLoading = useSelector(main.selectors.isLoading);
  const dispatch = useDispatch();
  const ref: any = useRef();
  const { t } = useTranslation();

  const setAlert = (variant: string, title: string, message: string) => {
    const id = Math.random().toString(36).slice(2, 9);

    dispatch(addAlert({ variant, title, message, id }));

    setTimeout(() => {
      dispatch(removeAlert({ id }));
    }, 10000);
  };

  useEffect(() => {
    const { simulationId, loadNPTCtx } = getQueryParams();

    if (window.location.href.includes("localhost")) {
      navigate({
        pathname: "",
        search: updateQueryParams({
          Entity: "BES",
        }),
      });
    }

    if (location.pathname === "/" && loadNPTCtx === "yes") {
      try {
        const cockpit = new Cockpit();
        if (cockpit.get_DadosContexto) {
          const Abreviado = cockpit.read("ENTIDADE", "Abreviado");
          navigate({
            pathname: "",
            search: updateQueryParams({
              Entity: Abreviado.toString(),
            }),
          });
          throw new Error(t("errors.cockpitNotFound"));
        }
      } catch (error) {
        // Cockpit não encontrado.
      }
    }

    // Load Taxes
    withThunkWrapper(
      dispatch(getTaxesThunk()),
      () => {
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

    // Load Context
    if (simulationId !== null && simulationId !== undefined) {
      dispatch(setIsLoadingTrue());
      withThunkWrapper(
        dispatch(getContextThunk()),
        async () => {
          if (location.pathname !== "/summary") {
            dispatch(setCurrentHolder(1));
            dispatch(setCurrentTypeOfIncome(true));
            navigate({
              pathname: "/",
              search: window.location.search,
            });
            ref.current.updateHolders(numberOfHolders.toString());
          }
          if (location.pathname === "/summary") {
            withThunkWrapper(
              dispatch(simulationResultsThunk({ toView: "toView" })),
              async () => {
                dispatch(setCurrentHolder(numberOfHolders + 1));
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
  }, []);

  return (
    <>
      {isLoading && <NBLoader mode="Overlay" />}
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

export default withNBRoot(withExceptionHandler(Ecosystem));
