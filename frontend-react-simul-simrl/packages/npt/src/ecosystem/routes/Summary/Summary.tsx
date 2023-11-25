import { Grid } from "@mui/material";
import { NBButton } from "@nb-omc-xit-frontend/nb-shared/lib/NBButton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import { useTranslation } from "react-i18next";
import Header from "../../organisms/Header";
import Text from "../../atoms/Text";
import {
  setCurrentHolder,
  setCurrentTypeOfIncome,
  setInitialState,
} from "../../../store/modules/entities/holder/slices";

// Styles
import "./Summary.scss";
import Tabs from "../../molecules/Tabs";
import HolderResume from "../../molecules/HolderResume";

import TableTotal from "../../organisms/TableTotal";
import {
  getQueryParams,
  updateQueryParams,
  withThunkWrapper,
} from "../../../utils/utils";
import {
  addAlert,
  removeAlert,
  setIsLoadingFalse,
  setIsLoadingTrue,
} from "../../../store/modules/main/slices";
import { getDocumentThunk } from "../../../store/modules/entities/holder/thunks";
import main from "../../../store/modules/main";

const Summary = () => {
  const isLoading = useSelector(main.selectors.isLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0);
  const { simulationId } = getQueryParams();
  const { t } = useTranslation();

  const setAlert = (variant: string, title: string, message: string) => {
    const id = Math.random().toString(36).slice(2, 9);

    dispatch(addAlert({ variant, title, message, id }));

    setTimeout(() => {
      dispatch(removeAlert({ id }));
    }, 10000);
  };

  const handlePrint = () => {
    dispatch(setIsLoadingTrue());
    withThunkWrapper(
      dispatch(getDocumentThunk()),
      async () => {
        dispatch(setIsLoadingFalse());
      },
      () => {
        dispatch(setIsLoadingFalse());
        setAlert(
          "primary-error",
          t("errors.errorOccurred"),
          t("errors.errorUnexpected")
        );
      }
    );
  };

  useEffect(() => {
    document
      ?.getElementById("summary-scroller")
      ?.scrollTo({ top: 0, behavior: "smooth" });
  }, [tab]);

  return (
    <div className="summary-wrapper">
      <Header />
      <Tabs callback={(value: number) => setTab(value)} />
      <Grid
        container
        style={{
          display: "flex",
          flexDirection: "column",
          overflowY: "scroll",
          marginTop: "16px",
          marginBottom: "24px",
          height: "100%",
        }}
        data-testid="Summary-testId"
        id="summary-scroller"
      >
        <Grid item xs={12} style={{ display: "flex", flexDirection: "column" }}>
          {isLoading ? (
            <Skeleton variant="rectangular" className="skeleton-6" />
          ) : (
            <Text
              className="reference"
              text={
                <p style={{ marginBottom: "16px", marginTop: "0px" }}>
                  {t("simulationRef")} <b>#{simulationId!}</b>
                </p>
              }
              fontSize="14px"
              margin="0px 0px 0px 16px"
            />
          )}
          {tab === 0 ? <TableTotal /> : <HolderResume tabHolder={tab} />}
          <div className="summary-footer-wrapper">
            <NBButton
              className="button"
              nbtype="Secondary"
              onClick={() => {
                dispatch(setCurrentHolder(1));
                dispatch(setCurrentTypeOfIncome(true));
                navigate({
                  pathname: "/",
                  search: updateQueryParams({
                    simulationId: "",
                  }),
                });
              }}
            >
              {t("updateSimulation")}
            </NBButton>
            <NBButton
              className="button"
              nbtype="Secondary"
              onClick={() => {
                dispatch(setInitialState());
                navigate({
                  pathname: "/",
                  search: updateQueryParams({
                    simulationId: "",
                    numberOfHolders: "",
                  }),
                });
              }}
            >
              {t("newSimulation")}
            </NBButton>
            <NBButton className="button" onClick={() => handlePrint()}>
              {t("print")}
            </NBButton>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Summary;
