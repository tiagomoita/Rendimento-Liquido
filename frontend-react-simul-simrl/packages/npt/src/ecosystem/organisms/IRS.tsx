import "./IRS.scss";
import { useSelector } from "react-redux";
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { useTranslation } from "react-i18next";
import DependenteOuPensoes from "./TypeOfIncome/IRS/DependenteOuPensoes";
import IndependenteComContabilidadeOrganizada from "./TypeOfIncome/IRS/IndependenteComContabilidadeOrganizada";
import IndependenteSemContabilidadeOrganizada from "./TypeOfIncome/IRS/IndependenteSemContabilidadeOrganizada";
import RendimentosPrediais from "./TypeOfIncome/IRS/RendimentosPrediais";
import RendimentosIsentosPropriedadeIntelectual from "./TypeOfIncome/IRS/RendimentosIsentosPropriedadeIntelectual";
import RendimentosObtidosNoEstrangeiroParaResidentes from "./TypeOfIncome/IRS/RendimentosObtidosNoEstrangeiroParaResidentes";
import RendimentosDeCapitais from "./TypeOfIncome/IRS/RendimentosDeCapitais";
import RendimentosObtidosNoEstrangeiroParaNãoResidentes from "./TypeOfIncome/IRS/RendimentosObtidosNoEstrangeiroParaNãoResidentes";
import OutrosRendimentos from "./TypeOfIncome/IRS/OutrosRendimentos";
import TransparenciaFiscal from "./TypeOfIncome/IRS/TransparenciaFiscal";

import Text from "../atoms/Text";
import {
  retrieveCleanHolder,
  retrieveCurrentHolder,
  retrieveIRSData,
} from "../../store/modules/entities/holder/selectors";

import AccordionCheckbox from "../molecules/AccordionCheckbox";
import { Model3Data } from "../../store/modules/entities/holder/types";
import { color } from "../../utils/colors";

type IRSProps = {
  setModel3Data: Dispatch<SetStateAction<Model3Data>>;
};

const IRS = (props: IRSProps) => {
  const { setModel3Data } = props;
  const cleanHolder = useSelector(retrieveCleanHolder);
  const IRSData = useSelector(retrieveIRSData);
  const currentHolder = useSelector(retrieveCurrentHolder);
  const [isActive, setIsActive] = useState({ 1: false, 2: false });
  const [update, setUpdate] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setUpdate(!update);
  }, [currentHolder]);

  useEffect(() => {
    setIsActive({ 1: false, 2: false });
  }, [cleanHolder]);

  return (
    <div className="irs-wrapper">
      <AccordionCheckbox
        title={t("attachmentA")}
        isDisableCheckbox={
          IRSData?.dependentsAndPensions?.dependentsAndPensionsCheckBox!
        }
      >
        <DependenteOuPensoes />
      </AccordionCheckbox>
      <AccordionCheckbox
        title={t("attachmentB")}
        callback={(value: boolean) => setIsActive({ ...isActive, 2: value })}
        disable={isActive[1].valueOf()}
        isDisableCheckbox={
          IRSData?.independentWithoutOrganizedAccounting
            ?.independentWithoutOrganizedAccountingCheckBox!
        }
      >
        <IndependenteSemContabilidadeOrganizada setModel3Data={setModel3Data} />
      </AccordionCheckbox>
      <AccordionCheckbox
        title={t("attachmentC")}
        callback={(value: boolean) => setIsActive({ ...isActive, 1: value })}
        disable={isActive[2].valueOf()}
        isDisableCheckbox={
          IRSData?.independentWithOrganizedAccounting
            ?.independentWithOrganizedAccountingCheckBox!
        }
      >
        <IndependenteComContabilidadeOrganizada />
      </AccordionCheckbox>
      <AccordionCheckbox title={t("attachmentD")} isDisableCheckbox={false}>
        <TransparenciaFiscal />
      </AccordionCheckbox>
      <AccordionCheckbox
        title={t("attachmentE")}
        isDisableCheckbox={IRSData?.capitalIncome?.capitalIncomeCheckBox!}
      >
        <RendimentosDeCapitais />
      </AccordionCheckbox>
      <AccordionCheckbox
        title={t("attachmentF")}
        isDisableCheckbox={IRSData?.propertyIncome?.propertyIncomeCheckBox!}
      >
        <RendimentosPrediais />
      </AccordionCheckbox>
      <AccordionCheckbox
        title={t("attachmentH")}
        isDisableCheckbox={
          IRSData?.exemptIncomeOrIntellectualProperty
            ?.exemptIncomeOrIntellectualPropertCheckBox!
        }
      >
        <RendimentosIsentosPropriedadeIntelectual />
      </AccordionCheckbox>
      <AccordionCheckbox
        title={t("attachmentJ")}
        isDisableCheckbox={
          IRSData?.incomeEarnedAbroadForResidents
            ?.incomeEarnedAbroadForResidentsCheckBox!
        }
      >
        <RendimentosObtidosNoEstrangeiroParaResidentes
          setModel3Data={setModel3Data}
        />
      </AccordionCheckbox>
      <Text
        className="text-holder"
        text={<b>{t("taxIncomeDeclaredAbroad")}</b>}
        fontSize="20px"
        margin="25px 0px 16px 16px"
        color={color.nb_green}
      />
      <AccordionCheckbox
        title={t("incomeEarnedAbroadForNonResidents")}
        isDisableCheckbox={
          IRSData?.incomeEarnedAbroadForNonResidents
            ?.incomeEarnedAbroadForNonResidentsCheckBok!
        }
      >
        <RendimentosObtidosNoEstrangeiroParaNãoResidentes />
      </AccordionCheckbox>
      <Text
        className="text-holder"
        text={<b>{t("otherIncome")}</b>}
        fontSize="20px"
        margin="25px 0px 16px 16px"
        color={color.nb_green}
      />
      <AccordionCheckbox
        title={t("otherIncome")}
        isDisableCheckbox={IRSData?.otherIncome?.otherIncomeCheckBox!}
      >
        <OutrosRendimentos />
      </AccordionCheckbox>
    </div>
  );
};

export default IRS;
