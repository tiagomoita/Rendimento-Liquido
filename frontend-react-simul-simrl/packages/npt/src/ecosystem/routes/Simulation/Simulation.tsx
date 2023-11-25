import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Text from "../../atoms/Text";

// Styles
import "./Simulation.scss";
import {
  retrieveCurrentHolder,
  retrieveCurrentTypeOfIncome,
  retrieveName,
  retrieveNIF,
} from "../../../store/modules/entities/holder/selectors";

import Header from "../../organisms/Header";
import IRS from "../../organisms/IRS";
import Recibos from "../../organisms/Recibos";
import Resume from "../../organisms/Resume";
import Footer from "../../organisms/Footer";
import main from "../../../store/modules/main";
import TipoRendimentoDeclaradoModelo3 from "../../organisms/TypeOfIncome/common/TipoRendimentoDeclaradoModelo3";
import { Model3Data } from "../../../store/modules/entities/holder/types";
import { color } from "../../../utils/colors";

const Simulation = () => {
  const { t } = useTranslation();
  const isLoading = useSelector(main.selectors.isLoading);
  const currentHolder = useSelector(retrieveCurrentHolder);
  const currentName = useSelector(retrieveName);
  const currentNif = useSelector(retrieveNIF);
  const currentTypeOfIncome = useSelector(retrieveCurrentTypeOfIncome);
  const [model3Data, setModel3Data] = useState<Model3Data>({
    show: false,
    title: "",
  });

  useEffect(() => {
    document
      ?.getElementById("simulation-scroller")
      ?.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentHolder, currentTypeOfIncome]);

  return (
    <div className="simulation-wrapper" data-testid="Simulation-testId">
      <Header />

      <Grid
        container
        style={{
          overflowY: "scroll",
          marginTop: "16px",
          marginBottom: "24px",
          height: "100%",
          display: "flex",
          alignContent: "space-between",
        }}
        id="simulation-scroller"
      >
        <Grid item xs={7}>
          {isLoading ? (
            <Skeleton variant="rectangular" className="skeleton-7" />
          ) : (
            <div className="text-titles">
              <Text
                className="text-holder"
                text={
                  <b>
                    {currentHolder}
                    {t("holderNumber")}
                  </b>
                }
                fontSize="18px"
                width="100px"
              />
              {(currentName !== null || currentNif !== null) && (
                <>
                  <Text
                    className="text-holder-2"
                    text="Nome:"
                    fontSize="16px"
                  />
                  <Text
                    className="text-holder-2"
                    text={<b>{currentName}</b>}
                    fontSize="14px"
                  />

                  <Text className="text-holder-2" text="NIF:" fontSize="16px" />
                  <Text
                    className="text-holder-2"
                    text={<b>{currentNif}</b>}
                    fontSize="14px"
                  />
                </>
              )}
            </div>
          )}
          {isLoading ? (
            <Skeleton variant="rectangular" className="skeleton-8" />
          ) : (
            <Text
              className="text-holder"
              text={
                currentTypeOfIncome ? (
                  <b>{t("irsIncome")}</b>
                ) : (
                  <b>{t("monthlyIncome")}</b>
                )
              }
              fontSize="20px"
              margin="25px 0px 16px 16px"
              color={color.nb_green}
            />
          )}
          {currentTypeOfIncome ? (
            <IRS setModel3Data={setModel3Data} />
          ) : (
            <Recibos setModel3Data={setModel3Data} />
          )}
        </Grid>
        <Grid item xs={5}>
          <Resume />
          {!!model3Data.show && (
            <TipoRendimentoDeclaradoModelo3
              title={model3Data.title}
              indComProIncome={model3Data.indComProIncome}
              agriYieldsSilvLivstck={model3Data.agriYieldsSilvLivstck}
              otherIncome={model3Data.otherIncome}
              indComProIncomeByHolder={model3Data.indComProIncomeByHolder}
              agriYieldsSilvLivstckByHolder={
                model3Data.agriYieldsSilvLivstckByHolder
              }
              otherIncomeByHolder={model3Data.otherIncomeByHolder}
              totalGrossIncomeByHolder={model3Data.totalGrossIncomeByHolder}
              applyTotalValue={model3Data.applyTotalValue}
              handleCleanModel={model3Data.handleCleanModel}
            />
          )}
        </Grid>
        <Footer setModel3Data={setModel3Data} />
      </Grid>
    </div>
  );
};

export default Simulation;
