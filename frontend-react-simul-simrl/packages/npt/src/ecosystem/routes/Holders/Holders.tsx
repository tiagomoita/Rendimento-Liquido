import { Grid } from "@mui/material";
import { useEffect, forwardRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "../../organisms/Footer";
import Header from "../../organisms/Header";
import { setCurrentTypeOfIncome } from "../../../store/modules/entities/holder/slices";

// Styles
import "./Holders.scss";
import { withThunkWrapper } from "../../../utils/utils";
import { getTaxesThunk } from "../../../store/modules/entities/holder/thunks";
import {
  addAlert,
  removeAlert,
  setIsLoadingFalse,
} from "../../../store/modules/main/slices";

const Holders = forwardRef((_props, ref) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const setAlert = (variant: string, title: string, message: string) => {
    const id = Math.random().toString(36).slice(2, 9);

    dispatch(addAlert({ variant, title, message, id }));

    setTimeout(() => {
      dispatch(removeAlert({ id }));
    }, 10000);
  };

  useEffect(() => {
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

    dispatch(setCurrentTypeOfIncome(true));
  }, []);

  return (
    <Grid container data-testid="Holders-testId" style={{ height: "100%" }}>
      <Grid
        item
        xs={12}
        style={{
          display: "flex",
          marginBottom: "24px",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Header ref={ref} />
        <Footer />
      </Grid>
    </Grid>
  );
});

export default Holders;
