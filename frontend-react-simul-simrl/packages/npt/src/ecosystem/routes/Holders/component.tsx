import { Grid } from "@mui/material";
import { useEffect, forwardRef } from "react";
import { useDispatch } from "react-redux";
import Footer from "../../organisms/Footer";
import Header from "../../organisms/Header";
import { setCurrentTypeOfIncome } from "../../../store/modules/entities/holder/slices";

// Styles
import "./styles.scss";

const Holders = forwardRef((_props, ref) => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
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
