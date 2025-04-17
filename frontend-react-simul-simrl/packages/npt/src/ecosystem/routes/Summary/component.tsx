import { Grid } from "@mui/material";
import { NBButton } from "@nb-omc-xit-frontend/nb-shared/lib/NBButton";
import { useEffect, useRef, useState } from "react";
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
  setInitialStateWF,
} from "../../../store/modules/entities/holder/slices";

// Styles
import "./styles.scss";
import Tabs from "../../molecules/Tabs";
import HolderResume from "../../molecules/HolderResume";

import TableTotal from "../../organisms/TableTotal";
import {
  getQueryParams,
  updateQueryParams,
  withThunkWrapper,
} from "../../../utils/utils";
import {
  setIsLoadingFalse,
  setIsLoadingTrue,
} from "../../../store/modules/main/slices";
import { getDocumentThunk } from "../../../store/modules/entities/holder/thunks";
import main from "../../../store/modules/main";
import ERouteUrls from "../../../enums/route-urls";
import {
  retrieveNumberOfHolders,
  retrieveSimulationId,
} from "../../../store/modules/entities/holder/selectors";
import { useAlert } from "../../../hooks/useAlert";
import { Scrollbar } from "../../molecules/Scrollbar";

const Summary = () => {
  const { t } = useTranslation();
  const isLoading = useSelector(main.selectors.isLoading);
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { setAlert } = useAlert();
  const [tab, setTab] = useState(0);
  const { numberOfHolders, referenceWF } = getQueryParams();
  const SimulationId = useSelector(retrieveSimulationId);
  const numberOfHolders2 = useSelector(retrieveNumberOfHolders);
  const gridRefSummary = useRef<any>(null);
  const [isScrollbar2, setIsScrollbar2] = useState(false);

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
          t("errors.errorUnexpected"),
        );
      },
    );
  };

  useEffect(() => {
    document
      ?.getElementById("summary-scroller")
      ?.scrollTo({ top: 0, behavior: "smooth" });
  }, [tab]);

  useEffect(() => {
    if (
      referenceWF !== null &&
      referenceWF !== undefined &&
      numberOfHolders === undefined
    ) {
      dispatch(setCurrentHolder(Number(numberOfHolders2) + 1));
      dispatch(setCurrentTypeOfIncome(false));
      navigate({
        pathname: ERouteUrls.Summary,
        search: updateQueryParams({
          simulationId: SimulationId,
          numberOfHolders: numberOfHolders2.toString(),
        }),
      });
    }
  }, []);

  useEffect(() => {
    Scrollbar(gridRefSummary, setIsScrollbar2);
  }, []);

  return (
    <div className="summary-wrapper">
      <Header />
      <Tabs callback={(value: number) => setTab(value)} />
      <Grid
        container
        ref={gridRefSummary}
        style={{
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
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
                  {t("simulationRef")} <b>#{SimulationId!}</b>
                </p>
              }
              fontSize="14px"
              margin="0px 0px 0px 16px"
            />
          )}
          <div
            style={{
              marginRight: isScrollbar2 === false ? "0px" : "16px",
              transition: "margin-right 0.5s ease-in-out",
            }}
          >
            {tab === 0 ? <TableTotal /> : <HolderResume tabHolder={tab} />}
          </div>
          <div
            className="summary-footer-wrapper"
            style={{
              marginRight: isScrollbar2 === false ? "0px" : "16px",
              transition: "margin-right 0.5s ease-in-out",
            }}
          >
            <NBButton
              className="button"
              variant="outlined"
              onClick={() => {
                dispatch(setCurrentHolder(1));
                dispatch(setCurrentTypeOfIncome(true));
                navigate({
                  pathname: ERouteUrls.Holders,
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
              variant="outlined"
              onClick={() => {
                if (referenceWF !== null && referenceWF !== undefined) {
                  dispatch(setInitialStateWF());
                } else {
                  dispatch(setInitialState());
                }

                navigate({
                  pathname: ERouteUrls.Holders,
                  search: updateQueryParams({
                    simulationId: "",
                    numberOfHolders:
                      referenceWF !== null && referenceWF !== undefined
                        ? numberOfHolders
                        : "",
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
