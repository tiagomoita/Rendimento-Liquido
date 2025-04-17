import "./IRS.scss";
import { useSelector } from "react-redux";
import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { useTranslation } from "react-i18next";
import Skeleton from "@mui/material/Skeleton";
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
  retrieveCurrentHolder,
  retrieveIRSData,
} from "../../store/modules/entities/holder/selectors";

import AccordionCheckbox from "../molecules/AccordionCheckbox";
import { Model3Data } from "../../store/modules/entities/holder/types";
import { color } from "../../utils/colors";
import main from "../../store/modules/main";

type IRSProps = {
  setModel3Data: Dispatch<SetStateAction<Model3Data>>;
};
const initialIrsChackboxOpenStatus = {
  dependenteOuPensoesCheckboxOpen: false,
  independenteSemContabilidadeOrganizadaCheckboxOpen: false,
  independenteComContabilidadeOrganizadaCheckboxOpen: false,
  transparenciaFiscalCheckboxOpen: false,
  rendimentosDeCapitaisCheckboxOpen: false,
  rendimentosPrediaisCheckboxOpen: false,
  rendimentosIsentosPropriedadeIntelectualCheckboxOpen: false,
  rendimentosObtidosNoEstrangeiroParaResidentesCheckboxOpen: false,
  rendimentosObtidosNoEstrangeiroParaNãoResidentesCheckboxOpen: false,
  outrosRendimentosCheckboxOpen: false,
};

const IRS = (props: IRSProps) => {
  const { setModel3Data } = props;
  const isLoading = useSelector(main.selectors.isLoading);
  const IRSData = useSelector(retrieveIRSData);
  const currentHolder = useSelector(retrieveCurrentHolder);
  const [isOpen, setIsOpen] = useState(initialIrsChackboxOpenStatus);
  const [update, setUpdate] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setUpdate(!update);
  }, [currentHolder]);

  return (
    <div className="irs-wrapper">
      <AccordionCheckbox
        title={t("attachmentA")}
        isDisableCheckbox={
          IRSData?.dependentsAndPensions?.dependentsAndPensionsCheckBox!
        }
        infoIcon
        textInfo={`${t("table")} 4`}
        setModel3Data={setModel3Data}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        initialIrsChackboxOpenStatus={initialIrsChackboxOpenStatus}
        name="dependenteOuPensoesCheckboxOpen"
      >
        <DependenteOuPensoes />
      </AccordionCheckbox>
      <AccordionCheckbox
        title={t("attachmentB")}
        disable={
          IRSData?.independentWithOrganizedAccounting
            ?.independentWithOrganizedAccountingCheckBox! === true
        }
        isDisableCheckbox={
          IRSData?.independentWithoutOrganizedAccounting
            ?.independentWithoutOrganizedAccountingCheckBox!
        }
        setModel3Data={setModel3Data}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        initialIrsChackboxOpenStatus={initialIrsChackboxOpenStatus}
        name="independenteSemContabilidadeOrganizadaCheckboxOpen"
      >
        <IndependenteSemContabilidadeOrganizada setModel3Data={setModel3Data} />
      </AccordionCheckbox>
      <AccordionCheckbox
        title={t("attachmentC")}
        disable={
          IRSData?.independentWithoutOrganizedAccounting
            ?.independentWithoutOrganizedAccountingCheckBox! === true
        }
        isDisableCheckbox={
          IRSData?.independentWithOrganizedAccounting
            ?.independentWithOrganizedAccountingCheckBox!
        }
        setModel3Data={setModel3Data}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        initialIrsChackboxOpenStatus={initialIrsChackboxOpenStatus}
        name="independenteComContabilidadeOrganizadaCheckboxOpen"
      >
        <IndependenteComContabilidadeOrganizada />
      </AccordionCheckbox>
      <AccordionCheckbox
        title={t("attachmentD")}
        isDisableCheckbox={IRSData?.taxTransparency?.taxTransparencyCheckBox!}
        setModel3Data={setModel3Data}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        initialIrsChackboxOpenStatus={initialIrsChackboxOpenStatus}
        name="transparenciaFiscalCheckboxOpen"
      >
        <TransparenciaFiscal />
      </AccordionCheckbox>
      <AccordionCheckbox
        title={t("attachmentE")}
        isDisableCheckbox={IRSData?.capitalIncome?.capitalIncomeCheckBox!}
        setModel3Data={setModel3Data}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        initialIrsChackboxOpenStatus={initialIrsChackboxOpenStatus}
        name="rendimentosDeCapitaisCheckboxOpen"
      >
        <RendimentosDeCapitais />
      </AccordionCheckbox>
      <AccordionCheckbox
        title={t("attachmentF")}
        isDisableCheckbox={IRSData?.propertyIncome?.propertyIncomeCheckBox!}
        setModel3Data={setModel3Data}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        initialIrsChackboxOpenStatus={initialIrsChackboxOpenStatus}
        name="rendimentosPrediaisCheckboxOpen"
      >
        <RendimentosPrediais />
      </AccordionCheckbox>
      <AccordionCheckbox
        title={t("attachmentH")}
        isDisableCheckbox={
          IRSData?.exemptIncomeOrIntellectualProperty
            ?.exemptIncomeOrIntellectualPropertCheckBox!
        }
        setModel3Data={setModel3Data}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        initialIrsChackboxOpenStatus={initialIrsChackboxOpenStatus}
        name="rendimentosIsentosPropriedadeIntelectualCheckboxOpen"
      >
        <RendimentosIsentosPropriedadeIntelectual />
      </AccordionCheckbox>
      <AccordionCheckbox
        title={t("attachmentJ")}
        isDisableCheckbox={
          IRSData?.incomeEarnedAbroadForResidents
            ?.incomeEarnedAbroadForResidentsCheckBox!
        }
        setModel3Data={setModel3Data}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        initialIrsChackboxOpenStatus={initialIrsChackboxOpenStatus}
        name="rendimentosObtidosNoEstrangeiroParaResidentesCheckboxOpen"
      >
        <RendimentosObtidosNoEstrangeiroParaResidentes
          setModel3Data={setModel3Data}
        />
      </AccordionCheckbox>
      {isLoading ? (
        <Skeleton variant="rectangular" className="skeleton-9" />
      ) : (
        <Text
          className="text-holder"
          text={<b>{t("taxIncomeDeclaredAbroad")}</b>}
          fontSize="20px"
          margin="15px 0px 16px 16px"
          color={color.nb_green}
        />
      )}
      <AccordionCheckbox
        title={t("incomeEarnedAbroadForNonResidents")}
        isDisableCheckbox={
          IRSData?.incomeEarnedAbroadForNonResidents
            ?.incomeEarnedAbroadForNonResidentsCheckBok!
        }
        setModel3Data={setModel3Data}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        initialIrsChackboxOpenStatus={initialIrsChackboxOpenStatus}
        name="rendimentosObtidosNoEstrangeiroParaNãoResidentesCheckboxOpen"
      >
        <RendimentosObtidosNoEstrangeiroParaNãoResidentes />
      </AccordionCheckbox>
      {isLoading ? (
        <Skeleton variant="rectangular" className="skeleton-10" />
      ) : (
        <Text
          className="text-holder"
          text={<b>{t("otherIncome")}</b>}
          fontSize="20px"
          margin="10px 0px 16px 16px"
          color={color.nb_green}
        />
      )}
      <AccordionCheckbox
        title={t("otherIncome")}
        isDisableCheckbox={IRSData?.otherIncome?.otherIncomeCheckBox!}
        setModel3Data={setModel3Data}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        initialIrsChackboxOpenStatus={initialIrsChackboxOpenStatus}
        name="outrosRendimentosCheckboxOpen"
      >
        <OutrosRendimentos />
      </AccordionCheckbox>
    </div>
  );
};

export default IRS;
