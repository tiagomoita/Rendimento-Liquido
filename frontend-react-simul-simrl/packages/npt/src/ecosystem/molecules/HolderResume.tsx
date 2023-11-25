import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Accordion from "../atoms/Accordion";
import "./HolderResume.scss";
import Text from "../atoms/Text";
import { color } from "../../utils/colors";
import DependenteOuPensoes from "../organisms/TypeOfIncome/IRS/DependenteOuPensoes";
import IndependenteComContabilidadeOrganizada from "../organisms/TypeOfIncome/IRS/IndependenteComContabilidadeOrganizada";
import IndependenteSemContabilidadeOrganizada from "../organisms/TypeOfIncome/IRS/IndependenteSemContabilidadeOrganizada";
import RendimentosPrediais from "../organisms/TypeOfIncome/IRS/RendimentosPrediais";
import RendimentosPrediaisReceipts from "../organisms/TypeOfIncome/Receipts/RendimentosPrediais";
import RendimentosIsentosPropriedadeIntelectual from "../organisms/TypeOfIncome/IRS/RendimentosIsentosPropriedadeIntelectual";
import RendimentosObtidosNoEstrangeiroParaResidentes from "../organisms/TypeOfIncome/IRS/RendimentosObtidosNoEstrangeiroParaResidentes";
import RendimentosDeCapitais from "../organisms/TypeOfIncome/IRS/RendimentosDeCapitais";
import RendimentosObtidosNoEstrangeiroParaNãoResidentes from "../organisms/TypeOfIncome/IRS/RendimentosObtidosNoEstrangeiroParaNãoResidentes";
import OutrosRendimentos from "../organisms/TypeOfIncome/IRS/OutrosRendimentos";
import RecibosVencimentosOuPensoes from "../organisms/TypeOfIncome/Receipts/RecibosVencimentosOuPensoes";
import RecibosVerdes from "../organisms/TypeOfIncome/Receipts/RecibosVerdes";
import BolsasInvestigacaoEstagio from "../organisms/TypeOfIncome/Receipts/BolsasInvestigacaoEstagio";
import PensoesAlimentos from "../organisms/TypeOfIncome/Receipts/PensoesAlimentos";
import {
  retrieveIRSDataByHolder,
  retrieveReceiptsDataByHolder,
} from "../../store/modules/entities/holder/selectors";
import TransparenciaFiscal from "../organisms/TypeOfIncome/IRS/TransparenciaFiscal";

type HolderResumeProps = {
  tabHolder: number;
};

const HolderResume = (props: HolderResumeProps) => {
  const { tabHolder } = props;
  const { t } = useTranslation();
  const IRSDataByHolder = useSelector(retrieveIRSDataByHolder(tabHolder!));
  const ReceiptsDataByHolder = useSelector(
    retrieveReceiptsDataByHolder(tabHolder!)
  );

  return (
    <div className="holder-resume-wrapper">
      <Grid container columnSpacing={2}>
        <Grid item xs={7}>
          <Text
            className="text-holder"
            text={<b>{t("irsIncome")}</b>}
            fontSize="20px"
            margin="0px 0px 16px 16px"
            color={color.nb_green}
          />
          <Accordion
            title={t("attachmentA")}
            isDisabled={
              !IRSDataByHolder?.dependentsAndPensions
                ?.dependentsAndPensionsCheckBox!
            }
          >
            <DependenteOuPensoes readOnly tabHolder={tabHolder} />
          </Accordion>
          <Accordion
            title={t("attachmentB")}
            isDisabled={
              !IRSDataByHolder?.independentWithoutOrganizedAccounting
                ?.independentWithoutOrganizedAccountingCheckBox!
            }
          >
            <IndependenteSemContabilidadeOrganizada
              readOnly
              tabHolder={tabHolder}
            />
          </Accordion>
          <Accordion
            title={t("attachmentC")}
            isDisabled={
              !IRSDataByHolder?.independentWithOrganizedAccounting
                ?.independentWithOrganizedAccountingCheckBox!
            }
          >
            <IndependenteComContabilidadeOrganizada
              readOnly
              tabHolder={tabHolder}
            />
          </Accordion>
          <Accordion
            title={t("attachmentD")}
            isDisabled={
              !IRSDataByHolder?.taxTransparency?.taxTransparencyCheckBox!
            }
          >
            <TransparenciaFiscal readOnly tabHolder={tabHolder} />
          </Accordion>
          <Accordion
            title={t("attachmentE")}
            isDisabled={!IRSDataByHolder?.capitalIncome?.capitalIncomeCheckBox!}
          >
            <RendimentosDeCapitais readOnly tabHolder={tabHolder} />
          </Accordion>
          <Accordion
            title={t("attachmentF")}
            isDisabled={
              !IRSDataByHolder?.propertyIncome?.propertyIncomeCheckBox!
            }
          >
            <RendimentosPrediais readOnly tabHolder={tabHolder} />
          </Accordion>
          <Accordion
            title={t("attachmentH")}
            isDisabled={
              !IRSDataByHolder?.exemptIncomeOrIntellectualProperty
                ?.exemptIncomeOrIntellectualPropertCheckBox!
            }
          >
            <RendimentosIsentosPropriedadeIntelectual
              readOnly
              tabHolder={tabHolder}
            />
          </Accordion>
          <Accordion
            title={t("attachmentJ")}
            isDisabled={
              !IRSDataByHolder?.incomeEarnedAbroadForResidents
                ?.incomeEarnedAbroadForResidentsCheckBox!
            }
          >
            <RendimentosObtidosNoEstrangeiroParaResidentes
              readOnly
              tabHolder={tabHolder}
            />
          </Accordion>
          <Text
            className="text-holder"
            text={<b>{t("incomeEarnedAbroadForNonResidents")}</b>}
            fontSize="20px"
            margin="10px 0px 16px 16px"
            color={color.nb_green}
          />
          <Accordion
            title={t("incomeEarnedAbroadForNonResidents")}
            isDisabled={
              !IRSDataByHolder?.incomeEarnedAbroadForNonResidents
                ?.incomeEarnedAbroadForNonResidentsCheckBok!
            }
          >
            <RendimentosObtidosNoEstrangeiroParaNãoResidentes
              readOnly
              tabHolder={tabHolder}
            />
          </Accordion>
          <Text
            className="text-holder"
            text={<b>{t("otherIncome")}</b>}
            fontSize="20px"
            margin="10px 0px 16px 16px"
            color={color.nb_green}
          />
          <Accordion
            title={t("otherIncome")}
            isDisabled={!IRSDataByHolder?.otherIncome?.otherIncomeCheckBox!}
          >
            <OutrosRendimentos readOnly tabHolder={tabHolder} />
          </Accordion>
        </Grid>
        <Grid item xs={5}>
          <Text
            className="text-holder"
            text={<b>{t("monthlyIncome")}</b>}
            fontSize="20px"
            margin="0px 0px 16px 16px"
            color={color.nb_green}
          />
          <Accordion
            title={t("salaryOrPensionReceipts")}
            isDisabled={
              !ReceiptsDataByHolder?.salaryOrPensionReceipts
                ?.salaryOrPensionReceiptsCheckBox!
            }
          >
            <RecibosVencimentosOuPensoes readOnly tabHolder={tabHolder} />
          </Accordion>
          <Accordion
            title={t("greenReceipts")}
            isDisabled={
              !ReceiptsDataByHolder?.greenReceipts?.greenReceiptsCheckBox!
            }
          >
            <RecibosVerdes readOnly tabHolder={tabHolder} />
          </Accordion>
          <Accordion
            title={t("propertyIncomeReceipts")}
            isDisabled={
              !ReceiptsDataByHolder?.propertyIncomeReceipts
                ?.propertyIncomeRecCheckBox!
            }
          >
            <RendimentosPrediaisReceipts readOnly tabHolder={tabHolder} />
          </Accordion>
          <Accordion
            title={t("researchScholarshipsInternshipReceipts")}
            isDisabled={
              !ReceiptsDataByHolder?.researchScholarshipsInternshipReceipts
                ?.researchScholarReceiptsCheckBox!
            }
          >
            <BolsasInvestigacaoEstagio readOnly tabHolder={tabHolder} />
          </Accordion>
          <Accordion
            title={t("alimonyReceipts")}
            isDisabled={
              !ReceiptsDataByHolder?.alimonyReceipts?.almonyReceiptsCheckBox!
            }
          >
            <PensoesAlimentos readOnly tabHolder={tabHolder} />
          </Accordion>
        </Grid>
      </Grid>
    </div>
  );
};

export default HolderResume;
