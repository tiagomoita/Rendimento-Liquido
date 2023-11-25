import { useDispatch, useSelector } from "react-redux";
import "./Recibos.scss";
import { NBRadio } from "@nb-omc-xit-frontend/nb-shared/lib/NBRadio";
import Skeleton from "@mui/material/Skeleton";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import Text from "../atoms/Text";
import AccordionCheckbox from "../molecules/AccordionCheckbox";
import RecibosVencimentosOuPensoes from "./TypeOfIncome/Receipts/RecibosVencimentosOuPensoes";
import RecibosVerdes from "./TypeOfIncome/Receipts/RecibosVerdes";
import RendimentosPrediais from "./TypeOfIncome/Receipts/RendimentosPrediais";
import BolsasInvestigacaoEstagio from "./TypeOfIncome/Receipts/BolsasInvestigacaoEstagio";
import PensoesAlimentos from "./TypeOfIncome/Receipts/PensoesAlimentos";
import {
  retrieveCurrentTypeOfIncome,
  retrieveIrsOrReceipts,
  retrieveReceiptsData,
} from "../../store/modules/entities/holder/selectors";
import { setIrsOrReceipts } from "../../store/modules/entities/holder/slices";
import main from "../../store/modules/main";

import { Model3Data } from "../../store/modules/entities/holder/types";

type RecibosProps = {
  setModel3Data: Dispatch<SetStateAction<Model3Data>>;
};

const Recibos = (props: RecibosProps) => {
  const { setModel3Data } = props;
  const dispatch = useDispatch();
  const ReceiptsData = useSelector(retrieveReceiptsData);
  const irsOrReceipts = useSelector(retrieveIrsOrReceipts);
  const currentTypeOfIncome = useSelector(retrieveCurrentTypeOfIncome);
  const isLoading = useSelector(main.selectors.isLoading);
  const { t } = useTranslation();

  return (
    <div className="recibos-wrapper">
      <AccordionCheckbox
        title={t("salaryOrPensionReceipts")}
        isDisableCheckbox={
          ReceiptsData?.salaryOrPensionReceipts
            ?.salaryOrPensionReceiptsCheckBox!
        }
      >
        <RecibosVencimentosOuPensoes />
      </AccordionCheckbox>
      <AccordionCheckbox
        title={t("greenReceipts")}
        isDisableCheckbox={ReceiptsData?.greenReceipts?.greenReceiptsCheckBox!}
      >
        <RecibosVerdes setModel3Data={setModel3Data} />
      </AccordionCheckbox>
      <AccordionCheckbox
        title={t("propertyIncomeReceipts")}
        isDisableCheckbox={
          ReceiptsData?.propertyIncomeReceipts?.propertyIncomeRecCheckBox!
        }
      >
        <RendimentosPrediais />
      </AccordionCheckbox>
      <AccordionCheckbox
        title={t("researchScholarshipsInternshipReceipts")}
        isDisableCheckbox={
          ReceiptsData?.researchScholarshipsInternshipReceipts
            ?.researchScholarReceiptsCheckBox!
        }
      >
        <BolsasInvestigacaoEstagio />
      </AccordionCheckbox>
      <AccordionCheckbox
        title={t("alimonyReceipts")}
        isDisableCheckbox={
          ReceiptsData?.alimonyReceipts?.almonyReceiptsCheckBox!
        }
      >
        <PensoesAlimentos />
      </AccordionCheckbox>
      {!currentTypeOfIncome && (
        <div>
          {isLoading ? (
            <Skeleton variant="rectangular" className="skeleton-3" />
          ) : (
            <div className="question-wrapper">
              <Text
                text={t("whatIncomeMostRepresentativeOfreality")}
                margin="0px 0px 20px 0px"
              />
              <div className="radio-buttons">
                <div className="radio-buttons-2">
                  <NBRadio
                    checked={irsOrReceipts === null ? false : !irsOrReceipts}
                    onClick={() =>
                      dispatch(setIrsOrReceipts({ irsOrReceipts: false }))
                    }
                  />
                  <Text text={t("annualIncome")} />
                </div>
                <div className="radio-buttons-2">
                  <NBRadio
                    checked={irsOrReceipts === null ? false : irsOrReceipts}
                    onClick={() =>
                      dispatch(setIrsOrReceipts({ irsOrReceipts: true }))
                    }
                  />
                  <Text text={t("averageMonthlyIncome")} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Recibos;
