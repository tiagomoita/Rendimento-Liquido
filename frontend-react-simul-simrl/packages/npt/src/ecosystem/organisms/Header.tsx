import "./Header.scss";
import { NBDropdown } from "@nb-omc-xit-frontend/nb-shared/lib/NBDropdown";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Text from "../atoms/Text";
import Cockpit from "../../store/NPTCockpit";

// selectors & actions
import {
  holderInitialState,
  setNumberOfHolders,
  setArrayHolder,
  setContext,
} from "../../store/modules/entities/holder/slices";
import MyStepper from "./Stepper";
import { holder } from "../../store/modules/entities/holder/types";
import { retrieveArrayHolders } from "../../store/modules/entities/holder/selectors";
import { getQueryParams, updateQueryParams } from "../../utils/utils";
import { addAlert, removeAlert } from "../../store/modules/main/slices";

const Header = forwardRef((_props, ref) => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { numberOfHolders, loadNPTCtx, Entity } = getQueryParams();
  const [holders, setHolders] = useState<number>(parseInt(numberOfHolders, 10));
  const arrayHolders = useSelector(retrieveArrayHolders);
  const url = new URL(window.location.href);

  const workFlowData: any = [];
  const data = new Array<holder>(workFlowData.length).fill(holderInitialState);

  const setAlert = (variant: string, title: string, message: string) => {
    const id = Math.random().toString(36).slice(2, 9);

    dispatch(addAlert({ variant, title, message, id }));

    setTimeout(() => {
      dispatch(removeAlert({ id }));
    }, 10000);
  };

  const updateHolders = (value: string) => {
    const currentHolder = parseInt(value, 10);

    setHolders(currentHolder);
    dispatch(setNumberOfHolders(currentHolder));
    navigate({
      pathname: "/",
      search: updateQueryParams({ numberOfHolders: currentHolder.toString() }),
    });

    let array = new Array<holder>(currentHolder).fill(holderInitialState);

    if (arrayHolders.length !== 0) {
      for (let i = 0; i < currentHolder; i += 1) {
        array[i] = {
          ...array[i],
          ...arrayHolders[i],
        };
      }
    }

    array = array.map((elem, index) => {
      return {
        ...elem,
        holderNumber: index + 1,
      };
    });

    dispatch(setArrayHolder(array));
  };

  const setInitialContext = () => {
    if (workFlowData.length !== 0) {
      for (let i = 0; i < workFlowData.length; i += 1) {
        data[i] = {
          ...data[i],
          holderNumber: i + 1,
          Name: workFlowData[i].name,
          Nif: workFlowData[i].nif,
        };
      }
      setHolders(workFlowData.length);
      dispatch(setNumberOfHolders(workFlowData.length));
      navigate({
        pathname: "/",
        search: updateQueryParams({
          numberOfHolders: workFlowData.length.toString(),
        }),
      });

      dispatch(setArrayHolder(data));
    }
  };

  useEffect(() => {
    setInitialContext();
    if (location.pathname === "/" && loadNPTCtx === "yes") {
      try {
        const cockpit = new Cockpit();
        if (!cockpit.get_DadosContexto) {
          const Abreviado = cockpit.read("ENTIDADE", "Abreviado");
          dispatch(setContext({ Abreviado }));
          throw new Error(t("errors.cockpitNotFound"));
        }
        const dados = cockpit.get_DadosContexto();
        const { Nome = "" } = { ...dados };
        dispatch(setContext({ ...dados }));
        if (Nome !== null) {
          if (parseInt(numberOfHolders, 10) > 1) {
            updateHolders(numberOfHolders.toString());
          } else {
            updateHolders("1");
          }
        }
      } catch (error) {
        // Cockpit não encontrado.
      }
    }
    if (location.pathname === "/" && url.searchParams.has("Entity")) {
      if (Entity === "BES" || Entity === "BAC" || Entity === "BST") {
        dispatch(setContext({ Abreviado: Entity }));
      } else {
        setAlert(
          "primary-error",
          t("errors.errorOccurred"),
          t("errors.errorUnexpected")
        );
      }
    }
  }, []);

  useImperativeHandle(ref, () => ({
    updateHolders,
  }));

  return (
    <div className="header-wrapper" data-testid="Header-testId">
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Text
            text={<b>{t("netIncomeSimulation")}</b>}
            fontSize="20px"
            margin="20px 0px 20px 0px"
          />
          {location.pathname === "/" ? (
            <NBDropdown
              id="sample-search-select-document"
              label={t("numberOfHolders")}
              options={[
                {
                  label: `1 ${t("holder")}`,
                  value: "1",
                  disabled: data[0] !== undefined,
                },
                {
                  label: `2 ${t("holder")}`,
                  value: "2",
                  disabled: data[1] !== undefined,
                },
                {
                  label: `3 ${t("holder")}`,
                  value: "3",
                  disabled: data[2] !== undefined,
                },
                {
                  label: `4 ${t("holder")}`,
                  value: "4",
                  disabled: data[3] !== undefined,
                },
                {
                  label: `5 ${t("holder")}`,
                  value: "5",
                  disabled: data[4] !== undefined,
                },
                {
                  label: `6 ${t("holder")}`,
                  value: "6",
                  disabled: data[5] !== undefined,
                },
                {
                  label: `7 ${t("holder")}`,
                  value: "7",
                  disabled: data[6] !== undefined,
                },
                {
                  label: `8 ${t("holder")}`,
                  value: "8",
                  disabled: data[7] !== undefined,
                },
                {
                  label: `9 ${t("holder")}`,
                  value: "9",
                  disabled: data[8] !== undefined,
                },
                {
                  label: `10 ${t("holder")}`,
                  value: "10",
                  disabled: data[9] !== undefined,
                },
              ]}
              placeholder={t("select")}
              value={holders?.toString()}
              onChange={(value: string) => updateHolders(value)}
              helperText={t("pleaseFillThisField")}
            />
          ) : null}
          {location.pathname !== "/" ? <MyStepper /> : null}
        </Grid>
      </Grid>
    </div>
  );
});

export default Header;
