import "./Header.scss";
import { NBDropdown } from "@nb-omc-xit-frontend/nb-shared/lib/NBDropdown";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  Dispatch,
  SetStateAction,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Buffer } from "buffer";
import Text from "../atoms/Text";
import Cockpit from "../../store/NPTCockpit";

// selectors & actions
import {
  holderInitialState,
  setNumberOfHolders,
  setArrayHolder,
  setContext,
  setNamesAndNifs,
  setNameAndNif,
} from "../../store/modules/entities/holder/slices";
import MyStepper from "./Stepper";
import { Model3Data, holder } from "../../store/modules/entities/holder/types";
import { retrieveArrayHolders } from "../../store/modules/entities/holder/selectors";
import { getQueryParams, updateQueryParams } from "../../utils/utils";
import ERouteUrls from "../../enums/route-urls";
import EntitiesCode from "../../enums/entities-code";
import { useAlert } from "../../hooks/useAlert";

interface HeaderProps {
  setModel3Data?: Dispatch<SetStateAction<Model3Data>>;
}

const Header = forwardRef<any, HeaderProps>((props, ref) => {
  const { setModel3Data } = props;
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch<any>();
  const { setAlert } = useAlert();
  const navigate = useNavigate();

  const { numberOfHolders, loadNPTCtx, referenceWF, Entity, holdersWF } =
    getQueryParams();
  const holdersWFaux =
    holdersWF && JSON.parse(Buffer.from(holdersWF, "base64").toString("utf-8"));
  const [holders, setHolders] = useState<number>(parseInt(numberOfHolders, 10));
  const arrayHolders = useSelector(retrieveArrayHolders);
  const url = new URL(window.location.href);
  const arrayNamesNifs: any = [];

  for (let i = 0; i < 10; i += 1) {
    arrayNamesNifs.push({
      Nome: holdersWFaux?.holders[i]?.Name!,
      Nif: holdersWFaux?.holders[i]?.Nif!,
      currentHolder: i + 1,
    });
  }

  const workFlowData: any = [];
  const data = new Array<holder>(workFlowData.length).fill(holderInitialState);

  const updateHolders = (value: string) => {
    const currentHolder = parseInt(value, 10);

    setHolders(currentHolder);
    dispatch(setNumberOfHolders(currentHolder));
    navigate({
      pathname: ERouteUrls.Holders,
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
    if (arrayNamesNifs[0].Nome !== undefined) {
      dispatch(setNamesAndNifs(arrayNamesNifs));
    }
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
        pathname: ERouteUrls.Holders,
        search: updateQueryParams({
          numberOfHolders: workFlowData.length.toString(),
        }),
      });

      dispatch(setArrayHolder(data));
    }
  };

  useEffect(() => {
    setInitialContext();
    if (location.pathname === ERouteUrls.Holders && loadNPTCtx === "yes") {
      try {
        const cockpit = new Cockpit();
        if (!cockpit.get_DadosContexto) {
          const Abreviado = cockpit.read("ENTIDADE", "Abreviado");
          dispatch(setContext({ Abreviado }));
          throw new Error(t("errors.cockpitNotFound"));
        }
        const dados = cockpit.get_DadosContexto();
        const { Nome = "", Nif = "" } = { ...dados };
        dispatch(setContext({ ...dados }));
        if (Nome !== null) {
          if (parseInt(numberOfHolders, 10) > 1) {
            updateHolders(numberOfHolders.toString());
          } else {
            updateHolders("1");
          }
          dispatch(
            setNameAndNif({
              Nome,
              Nif,
              currentHolder: 1,
            })
          );
        }
      } catch (error) {
        // Cockpit não encontrado.
      }
    }
    if (
      location.pathname === ERouteUrls.Holders &&
      url.searchParams.has("Entity")
    ) {
      if (
        Entity === EntitiesCode.BES ||
        Entity === EntitiesCode.BAC ||
        Entity === EntitiesCode.BEST
      ) {
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
      <Text
        text={<b>{t("netIncomeSimulation")}</b>}
        fontSize="22px"
        margin="20px 0px 20px 0px"
      />
      <Grid container spacing={3}>
        <Grid item xs={6}>
          {location.pathname === ERouteUrls.Holders ? (
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
                  label: `2 ${t("holders")}`,
                  value: "2",
                  disabled: data[1] !== undefined,
                },
                {
                  label: `3 ${t("holders")}`,
                  value: "3",
                  disabled: data[2] !== undefined,
                },
                {
                  label: `4 ${t("holders")}`,
                  value: "4",
                  disabled: data[3] !== undefined,
                },
                {
                  label: `5 ${t("holders")}`,
                  value: "5",
                  disabled: data[4] !== undefined,
                },
                {
                  label: `6 ${t("holders")}`,
                  value: "6",
                  disabled: data[5] !== undefined,
                },
                {
                  label: `7 ${t("holders")}`,
                  value: "7",
                  disabled: data[6] !== undefined,
                },
                {
                  label: `8 ${t("holders")}`,
                  value: "8",
                  disabled: data[7] !== undefined,
                },
                {
                  label: `9 ${t("holders")}`,
                  value: "9",
                  disabled: data[8] !== undefined,
                },
                {
                  label: `10 ${t("holders")}`,
                  value: "10",
                  disabled: data[9] !== undefined,
                },
              ]}
              placeholder={t("select")}
              value={holders?.toString()}
              onChange={(value) => updateHolders(value.toString())}
              helperText={t("pleaseFillThisField")}
              disabled={referenceWF !== null && referenceWF !== undefined}
            />
          ) : null}
        </Grid>
      </Grid>
      {location.pathname !== ERouteUrls.Holders ? (
        <MyStepper setModel3Data={setModel3Data} />
      ) : null}
    </div>
  );
});

export default Header;
