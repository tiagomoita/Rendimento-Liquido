import { useEffect, useRef, useState } from "react";
import { Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Text from "../../atoms/Text";

// Styles
import "./styles.scss";
import {
  retrieveCurrentHolder,
  retrieveCurrentTypeOfIncome,
  retrieveCurrentName,
  retrieveCurrentNIF,
} from "../../../store/modules/entities/holder/selectors";

import Header from "../../organisms/Header";
import IRS from "../../organisms/IRS";
import Recibos from "../../organisms/Recibos";
import Resume from "../../organisms/Resume";
import Footer from "../../organisms/Footer";
import main from "../../../store/modules/main";
import { Model3Data } from "../../../store/modules/entities/holder/types";
import { color } from "../../../utils/colors";
import { Scrollbar } from "../../molecules/Scrollbar";
import TipoRendimentoDeclaradoModelo3AnexoJ from "../../organisms/TypeOfIncome/Common/TipoRendimentoDeclaradoModelo3AnexoJ";
import TipoRendimentoDeclaradoModelo3 from "../../organisms/TypeOfIncome/Common/TipoRendimentoDeclaradoModelo3";

const Simulation = () => {
  const { t } = useTranslation();
  const isLoading = useSelector(main.selectors.isLoading);
  const currentHolder = useSelector(retrieveCurrentHolder);
  const currentName = useSelector(retrieveCurrentName);
  const currentNif = useSelector(retrieveCurrentNIF);
  const currentTypeOfIncome = useSelector(retrieveCurrentTypeOfIncome);
  const gridRefSimulation = useRef<any>(null);
  const [isScrollbar, setIsScrollbar] = useState(false);
  const [model3Data, setModel3Data] = useState<Model3Data>({
    show: false,
    title: "",
    isAttachmentJ: false,
  });

  useEffect(() => {
    document
      ?.getElementById("simulation-scroller")
      ?.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentHolder, currentTypeOfIncome]);

  useEffect(() => {
    Scrollbar(gridRefSimulation, setIsScrollbar);
  }, []);

  return (
    <div className="simulation-wrapper" data-testid="Simulation-testId">
      <Header setModel3Data={setModel3Data} />

      <Grid
        container
        ref={gridRefSimulation}
        style={{
          overflowY: "auto",
          marginTop: "16px",
          marginBottom: "24px",
          height: "100%",
          display: "flex",
          alignContent: "space-between",
        }}
        id="simulation-scroller"
      >
        <div
          style={{ display: "flex", flexDirection: "column", width: "100%" }}
        >
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
          <div style={{ display: "flex", width: "100%" }}>
            <Grid item xs={7}>
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
                  margin="10px 0px 16px 16px"
                  color={color.nb_green}
                />
              )}
              {currentTypeOfIncome ? (
                <IRS setModel3Data={setModel3Data} />
              ) : (
                <Recibos setModel3Data={setModel3Data} />
              )}
            </Grid>
            <Grid
              item
              xs={5}
              mr={isScrollbar === false ? "0px" : "16px"}
              sx={{ transition: "margin-right 0.5s ease-in-out" }}
            >
              <Resume />
              {model3Data.isAttachmentJ
                ? !!model3Data.show && (
                    <TipoRendimentoDeclaradoModelo3AnexoJ
                      title={model3Data.title}
                      businessAndProfessionalIncome={
                        model3Data.businessAndProfessionalIncome
                      }
                      businessAndProfessionalIncomeByHolder={
                        model3Data.businessAndProfessionalIncomeByHolder
                      }
                      totalGrossIncomeByHolder={
                        model3Data.totalGrossIncomeByHolder
                      }
                      applyTotalValue={model3Data.applyTotalValue}
                      handleCleanModel={model3Data.handleCleanModel}
                      saveValues={model3Data.saveValues}
                    />
                  )
                : !!model3Data.show && (
                    <TipoRendimentoDeclaradoModelo3
                      title={model3Data.title}
                      indComProIncome={model3Data.indComProIncome}
                      agriYieldsSilvLivstck={model3Data.agriYieldsSilvLivstck}
                      indComProIncomeByHolder={
                        model3Data.indComProIncomeByHolder
                      }
                      agriYieldsSilvLivstckByHolder={
                        model3Data.agriYieldsSilvLivstckByHolder
                      }
                      totalGrossIncomeByHolder={
                        model3Data.totalGrossIncomeByHolder
                      }
                      applyTotalValue={model3Data.applyTotalValue}
                      handleCleanModel={model3Data.handleCleanModel}
                      saveValues={model3Data.saveValues}
                    />
                  )}
            </Grid>
          </div>
        </div>
        <Footer setModel3Data={setModel3Data} isScrollbar={isScrollbar} />
      </Grid>
    </div>
  );
};

export default Simulation;
