/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import { useEffect, useState } from "react";
import { NBButton } from "@nb-omc-xit-frontend/nb-shared/lib/NBButton";
import { calculateNetIncomeEarnedAbroadForResidentsTotal } from "npm-pkg-simul-simrl";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { t } from "i18next";
import Accordion from "../../../atoms/Accordion";
import TextField from "../../../atoms/TextField";
import Total from "../../../atoms/Total";
import Text from "../../../atoms/Text";
import {
  retrieveCurrentHolder,
  retrieveTaxes,
} from "../../../../store/modules/entities/holder/selectors";
import { formatToEuroCurrency, roundValue } from "../../../../utils/utils";
import { BusinessAndProfessionalIncome } from "../../../../store/modules/entities/holder/types";
import "./Common.scss";

type TipoRendimentoDeclaradoModelo3AnexoJProps = {
  title: string;
  businessAndProfessionalIncome?: BusinessAndProfessionalIncome;
  businessAndProfessionalIncomeByHolder?: BusinessAndProfessionalIncome;
  totalGrossIncomeByHolder?: number;
  readOnly?: boolean;
  applyTotalValue?: any;
  handleCleanModel?: any;
  saveValues?: any;
};

type valuesInterface = {
  [key: string]: { rate: number; name: string; code: string; label: string };
};

const TipoRendimentoDeclaradoModelo3AnexoJ = (
  props: TipoRendimentoDeclaradoModelo3AnexoJProps
) => {
  const {
    title,
    businessAndProfessionalIncome,
    businessAndProfessionalIncomeByHolder,
    totalGrossIncomeByHolder,
    readOnly,
    applyTotalValue,
    handleCleanModel,
    saveValues,
  } = props;

  const currentHolder = useSelector(retrieveCurrentHolder);
  const Taxes = useSelector(retrieveTaxes);

  const [rendimentosAnexoJ, setRendimentosAnexoJ] = useState<valuesInterface>(
    {}
  );

  const [
    businessAndProfessionalIncomeClone,
    setBusinessAndProfessionalIncomeClone,
  ] = useState<BusinessAndProfessionalIncome>(businessAndProfessionalIncome!);

  const [totalGrossIncomeField, setTotalGrossIncomeField] = useState(0);

  const returnDefaultValue = (field: string): number => {
    if (field === "commercialAndIndustrialIncome") {
      return (
        businessAndProfessionalIncomeClone?.commercialAndIndustrialIncome ?? 0
      );
    }
    if (field === "agriculturalIncomeFromForestryOrLivestock") {
      return (
        businessAndProfessionalIncomeClone?.agriculturalIncomeFromForestryOrLivestock ??
        0
      );
    }
    if (field === "incomeTableArticle151") {
      return businessAndProfessionalIncomeClone?.incomeTableArticle151 ?? 0;
    }
    if (field === "incomeFromUnforeseenInstallments") {
      return (
        businessAndProfessionalIncomeClone?.incomeFromUnforeseenInstallments ??
        0
      );
    }
    if (field === "intellectualOrIndustrialPropertyIncome") {
      return (
        businessAndProfessionalIncomeClone?.intellectualOrIndustrialPropertyIncome ??
        0
      );
    }
    if (field === "incomeIntellectualPropertyArt58NonExempt") {
      return (
        businessAndProfessionalIncomeClone?.incomeIntellectualPropertyArt58NonExempt ??
        0
      );
    }
    if (field === "incomeIntellectualPropertyArt58Exempt") {
      return (
        businessAndProfessionalIncomeClone?.incomeIntellectualPropertyArt58Exempt ??
        0
      );
    }
    if (field === "incomeOfArtistsAndSportsmen2017AndPrevious") {
      return (
        businessAndProfessionalIncomeClone?.incomeOfArtistsAndSportsmen2017AndPrevious ??
        0
      );
    }
    if (field === "incomeAttributableBusinessIndIncomeGeneratingActivities") {
      return (
        businessAndProfessionalIncomeClone?.incomeAttributableBusinessIndIncomeGeneratingActivities ??
        0
      );
    }
    if (field === "incomeOfArtists2018AndLater") {
      return (
        businessAndProfessionalIncomeClone?.incomeOfArtists2018AndLater ?? 0
      );
    }
    if (field === "incomeOfSportsmen2018AndLater") {
      return (
        businessAndProfessionalIncomeClone?.incomeOfSportsmen2018AndLater ?? 0
      );
    }

    return 0;
  };

  const initialValuesTotal = () => {
    return {
      commercialAndIndustrialIncomeTotal: roundValue(
        returnDefaultValue("commercialAndIndustrialIncome") *
          (Taxes?.anexxJParams.commIndIncome.parameterValue! || 0)
      ),
      agriculturalIncomeFromForestryOrLivestockTotal: roundValue(
        returnDefaultValue("agriculturalIncomeFromForestryOrLivestock") *
          (Taxes?.anexxJParams.agriForestryLivestockIncome.parameterValue! || 0)
      ),
      incomeTableArticle151Total: roundValue(
        returnDefaultValue("incomeTableArticle151") *
          (Taxes?.anexxJParams.incomeFromProfActSpecProv.parameterValue! || 0)
      ),
      incomeFromUnforeseenInstallmentsTotal: roundValue(
        returnDefaultValue("incomeFromUnforeseenInstallments") *
          (Taxes?.anexxJParams.incomeFromServNotPrevCodes.parameterValue! || 0)
      ),
      intellectualOrIndustrialPropertyIncomeTotal: roundValue(
        returnDefaultValue("intellectualOrIndustrialPropertyIncome") *
          (Taxes?.anexxJParams.incomeFromIntelOrIndusProp.parameterValue! || 0)
      ),
      incomeIntellectualPropertyArt58NonExemptTotal: roundValue(
        returnDefaultValue("incomeIntellectualPropertyArt58NonExempt") *
          (Taxes?.anexxJParams.incomeFromIntelPropNonExempt.parameterValue! ||
            0)
      ),
      incomeIntellectualPropertyArt58ExemptTotal: roundValue(
        returnDefaultValue("incomeIntellectualPropertyArt58Exempt") *
          (Taxes?.anexxJParams.incomeFromIntelPropExempt.parameterValue! || 0)
      ),
      incomeOfArtistsAndSportsmen2017AndPreviousTotal: roundValue(
        returnDefaultValue("incomeOfArtistsAndSportsmen2017AndPrevious") *
          (Taxes?.anexxJParams.incomeOfArtistsSportsmenPrev.parameterValue! ||
            0)
      ),
      incomeAttributableBusinessIndIncomeGeneratingActivitiesTotal: roundValue(
        returnDefaultValue(
          "incomeAttributableBusinessIndIncomeGeneratingActivities"
        ) * (Taxes?.anexxJParams.incomeAttrToBusiProfAct.parameterValue! || 0)
      ),
      incomeOfArtists2018AndLaterTotal: roundValue(
        returnDefaultValue("incomeOfArtists2018AndLater") *
          (Taxes?.anexxJParams.artistIncomePost2018.parameterValue! || 0)
      ),
      incomeOfSportsmen2018AndLaterTotal: roundValue(
        returnDefaultValue("incomeOfSportsmen2018AndLater") *
          (Taxes?.anexxJParams.incomeOfAthletesPost2018.parameterValue! || 0)
      ),
    };
  };

  const [valueTotal, setValueTotal] = useState<any>(initialValuesTotal());

  const handleClean = () => {
    setBusinessAndProfessionalIncomeClone({
      commercialAndIndustrialIncome: 0,
      agriculturalIncomeFromForestryOrLivestock: 0,
      incomeTableArticle151: 0,
      incomeFromUnforeseenInstallments: 0,
      intellectualOrIndustrialPropertyIncome: 0,
      incomeIntellectualPropertyArt58NonExempt: 0,
      incomeIntellectualPropertyArt58Exempt: 0,
      incomeOfArtistsAndSportsmen2017AndPrevious: 0,
      incomeAttributableBusinessIndIncomeGeneratingActivities: 0,
      incomeOfArtists2018AndLater: 0,
      incomeOfSportsmen2018AndLater: 0,
    });
    setValueTotal({
      commercialAndIndustrialIncomeTotal: 0,
      agriculturalIncomeFromForestryOrLivestockTotal: 0,
      incomeTableArticle151Total: 0,
      incomeFromUnforeseenInstallmentsTotal: 0,
      intellectualOrIndustrialPropertyIncomeTotal: 0,
      incomeIntellectualPropertyArt58NonExemptTotal: 0,
      incomeIntellectualPropertyArt58ExemptTotal: 0,
      incomeOfArtistsAndSportsmen2017AndPreviousTotal: 0,
      incomeAttributableBusinessIndIncomeGeneratingActivitiesTotal: 0,
      incomeOfArtists2018AndLaterTotal: 0,
      incomeOfSportsmen2018AndLaterTotal: 0,
    });
    handleCleanModel();
  };

  const handleFieldChange = (
    field: string,
    value: number,
    subfield?: string
  ) => {
    if (field === "businessAndProfessionalIncome") {
      setBusinessAndProfessionalIncomeClone({
        ...businessAndProfessionalIncomeClone!,
        [subfield!]: value,
      });
    }
  };

  const handleChange = (key: string, val: number, rate?: number) => {
    switch (key) {
      case "Rendimentos comerciais e industriais": {
        handleFieldChange(
          "businessAndProfessionalIncome",
          val,
          "commercialAndIndustrialIncome"
        );
        setValueTotal({
          ...valueTotal,
          commercialAndIndustrialIncomeTotal: roundValue(val * rate!),
        });

        break;
      }
      case "Rendimentos Agrícolas, Silvícolas ou pecuários": {
        handleFieldChange(
          "businessAndProfessionalIncome",
          val,
          "agriculturalIncomeFromForestryOrLivestock"
        );
        setValueTotal({
          ...valueTotal,
          agriculturalIncomeFromForestryOrLivestockTotal: roundValue(
            val * rate!
          ),
        });
        break;
      }
      case "Rendimento das atividades profissionais especificamente previstas na Tabela do artigo 151.º do CIRS (exceto B10 e B11)": {
        handleFieldChange(
          "businessAndProfessionalIncome",
          val,
          "incomeTableArticle151"
        );
        setValueTotal({
          ...valueTotal,
          incomeTableArticle151Total: roundValue(val * rate!),
        });
        break;
      }
      case "Rendimentos de prestações de serviços não previstas nos códigos anteriores": {
        handleFieldChange(
          "businessAndProfessionalIncome",
          val,
          "incomeFromUnforeseenInstallments"
        );
        setValueTotal({
          ...valueTotal,
          incomeFromUnforeseenInstallmentsTotal: roundValue(val * rate!),
        });
        break;
      }
      case "Rendimentos de propriedade intelectual ou industrial": {
        handleFieldChange(
          "businessAndProfessionalIncome",
          val,
          "intellectualOrIndustrialPropertyIncome"
        );
        setValueTotal({
          ...valueTotal,
          intellectualOrIndustrialPropertyIncomeTotal: roundValue(val * rate!),
        });
        break;
      }
      case "Rendimentos de propriedade intelectual (rendimentos abrangidos pelo artigo º 58.º do EBF - parte não isenta)": {
        handleFieldChange(
          "businessAndProfessionalIncome",
          val,
          "incomeIntellectualPropertyArt58NonExempt"
        );
        setValueTotal({
          ...valueTotal,
          incomeIntellectualPropertyArt58NonExemptTotal: roundValue(
            val * rate!
          ),
        });
        break;
      }
      case "Rendimentos da propriedade intelectual (rendimentos abrangidos pelo artigo 58.º do EBF - parte isenta)": {
        handleFieldChange(
          "businessAndProfessionalIncome",
          val,
          "incomeIntellectualPropertyArt58Exempt"
        );
        setValueTotal({
          ...valueTotal,
          incomeIntellectualPropertyArt58ExemptTotal: roundValue(val * rate!),
        });
        break;
      }
      case "Rendimentos de artistas e desportistas - Ano de 2017 e anteriores": {
        handleFieldChange(
          "businessAndProfessionalIncome",
          val,
          "incomeOfArtistsAndSportsmen2017AndPrevious"
        );
        setValueTotal({
          ...valueTotal,
          incomeOfArtistsAndSportsmen2017AndPreviousTotal: roundValue(
            val * rate!
          ),
        });
        break;
      }
      case "Rendimentos imputáveis a atividades geradoras de rendimentos empresariais e profissionais: i) Resultado positivo de rendimentos prediais ii) Rendimentos de capitais iii) Saldo positivo entre as mais e menos-valias e restantes incrementos patrimoniais": {
        handleFieldChange(
          "businessAndProfessionalIncome",
          val,
          "incomeAttributableBusinessIndIncomeGeneratingActivities"
        );
        setValueTotal({
          ...valueTotal,
          incomeAttributableBusinessIndIncomeGeneratingActivitiesTotal:
            roundValue(val * rate!),
        });
        break;
      }
      case "Rendimentos de artistas – Ano de 2018 e seguintes": {
        handleFieldChange(
          "businessAndProfessionalIncome",
          val,
          "incomeOfArtists2018AndLater"
        );
        setValueTotal({
          ...valueTotal,
          incomeOfArtists2018AndLaterTotal: roundValue(val * rate!),
        });
        break;
      }
      case "Rendimentos de desportistas – Ano de 2018 e seguintes": {
        handleFieldChange(
          "businessAndProfessionalIncome",
          val,
          "incomeOfSportsmen2018AndLater"
        );
        setValueTotal({
          ...valueTotal,
          incomeOfSportsmen2018AndLaterTotal: roundValue(val * rate!),
        });
        break;
      }

      default:
    }
  };

  const calculateFinalGrossIncome = (key: string, rate: number) => {
    if (readOnly) {
      switch (key) {
        case "Rendimentos comerciais e industriais": {
          return `${roundValue(
            (businessAndProfessionalIncomeByHolder?.commercialAndIndustrialIncome! ||
              0) * rate
          ).toString()} €`;
        }
        case "Rendimentos Agrícolas, Silvícolas ou pecuários": {
          return `${roundValue(
            (businessAndProfessionalIncomeByHolder?.agriculturalIncomeFromForestryOrLivestock! ||
              0) * rate
          ).toString()} €`;
        }
        case "Rendimento das atividades profissionais especificamente previstas na Tabela do artigo 151.º do CIRS (exceto B10 e B11)": {
          return `${roundValue(
            (businessAndProfessionalIncomeByHolder?.incomeTableArticle151! ||
              0) * rate
          ).toString()} €`;
        }
        case "Rendimentos de prestações de serviços não previstas nos códigos anteriores": {
          return `${roundValue(
            (businessAndProfessionalIncomeByHolder?.incomeFromUnforeseenInstallments! ||
              0) * rate
          ).toString()} €`;
        }
        case "Rendimentos de propriedade intelectual ou industrial": {
          return `${roundValue(
            (businessAndProfessionalIncomeByHolder?.intellectualOrIndustrialPropertyIncome! ||
              0) * rate
          ).toString()} €`;
        }
        case "Rendimentos de propriedade intelectual (rendimentos abrangidos pelo artigo º 58.º do EBF - parte não isenta)": {
          return `${roundValue(
            (businessAndProfessionalIncomeByHolder?.incomeIntellectualPropertyArt58NonExempt! ||
              0) * rate
          ).toString()} €`;
        }
        case "Rendimentos da propriedade intelectual (rendimentos abrangidos pelo artigo 58.º do EBF - parte isenta)": {
          return `${roundValue(
            (businessAndProfessionalIncomeByHolder?.incomeIntellectualPropertyArt58Exempt! ||
              0) * rate
          ).toString()} €`;
        }
        case "Rendimentos de artistas e desportistas - Ano de 2017 e anteriores": {
          return `${roundValue(
            (businessAndProfessionalIncomeByHolder?.incomeOfArtistsAndSportsmen2017AndPrevious! ||
              0) * rate
          ).toString()} €`;
        }
        case "Rendimentos imputáveis a atividades geradoras de rendimentos empresariais e profissionais: i) Resultado positivo de rendimentos prediais ii) Rendimentos de capitais iii) Saldo positivo entre as mais e menos-valias e restantes incrementos patrimoniais": {
          return `${roundValue(
            (businessAndProfessionalIncomeByHolder?.incomeAttributableBusinessIndIncomeGeneratingActivities! ||
              0) * rate
          ).toString()} €`;
        }
        case "Rendimentos de artistas – Ano de 2018 e seguintes": {
          return `${roundValue(
            (businessAndProfessionalIncomeByHolder?.incomeOfArtists2018AndLater! ||
              0) * rate
          ).toString()} €`;
        }
        case "Rendimentos de desportistas – Ano de 2018 e seguintes": {
          return `${roundValue(
            (businessAndProfessionalIncomeByHolder?.incomeOfSportsmen2018AndLater! ||
              0) * rate
          ).toString()} €`;
        }
        default:
          return "0 €";
      }
    } else {
      switch (key) {
        case "Rendimentos comerciais e industriais": {
          return `${roundValue(
            (businessAndProfessionalIncomeClone?.commercialAndIndustrialIncome! ||
              0) * rate
          ).toString()} €`;
        }
        case "Rendimentos Agrícolas, Silvícolas ou pecuários": {
          return `${roundValue(
            (businessAndProfessionalIncomeClone?.agriculturalIncomeFromForestryOrLivestock! ||
              0) * rate
          ).toString()} €`;
        }
        case "Rendimento das atividades profissionais especificamente previstas na Tabela do artigo 151.º do CIRS (exceto B10 e B11)": {
          return `${roundValue(
            (businessAndProfessionalIncomeClone?.incomeTableArticle151! || 0) *
              rate
          ).toString()} €`;
        }
        case "Rendimentos de prestações de serviços não previstas nos códigos anteriores": {
          return `${roundValue(
            (businessAndProfessionalIncomeClone?.incomeFromUnforeseenInstallments! ||
              0) * rate
          ).toString()} €`;
        }
        case "Rendimentos de propriedade intelectual ou industrial": {
          return `${roundValue(
            (businessAndProfessionalIncomeClone?.intellectualOrIndustrialPropertyIncome! ||
              0) * rate
          ).toString()} €`;
        }
        case "Rendimentos de propriedade intelectual (rendimentos abrangidos pelo artigo º 58.º do EBF - parte não isenta)": {
          return `${roundValue(
            (businessAndProfessionalIncomeClone?.incomeIntellectualPropertyArt58NonExempt! ||
              0) * rate
          ).toString()} €`;
        }
        case "Rendimentos da propriedade intelectual (rendimentos abrangidos pelo artigo 58.º do EBF - parte isenta)": {
          return `${roundValue(
            (businessAndProfessionalIncomeClone?.incomeIntellectualPropertyArt58Exempt! ||
              0) * rate
          ).toString()} €`;
        }
        case "Rendimentos de artistas e desportistas - Ano de 2017 e anteriores": {
          return `${roundValue(
            (businessAndProfessionalIncomeClone?.incomeOfArtistsAndSportsmen2017AndPrevious! ||
              0) * rate
          ).toString()} €`;
        }
        case "Rendimentos imputáveis a atividades geradoras de rendimentos empresariais e profissionais: i) Resultado positivo de rendimentos prediais ii) Rendimentos de capitais iii) Saldo positivo entre as mais e menos-valias e restantes incrementos patrimoniais": {
          return `${roundValue(
            (businessAndProfessionalIncomeClone?.incomeAttributableBusinessIndIncomeGeneratingActivities! ||
              0) * rate
          ).toString()} €`;
        }
        case "Rendimentos de artistas – Ano de 2018 e seguintes": {
          return `${roundValue(
            (businessAndProfessionalIncomeClone?.incomeOfArtists2018AndLater! ||
              0) * rate
          ).toString()} €`;
        }
        case "Rendimentos de desportistas – Ano de 2018 e seguintes": {
          return `${roundValue(
            (businessAndProfessionalIncomeClone?.incomeOfSportsmen2018AndLater! ||
              0) * rate
          ).toString()} €`;
        }
        default:
          return "0 €";
      }
    }
  };

  const returnPlaceHolderValue = (field: string): string => {
    if (field === "commercialAndIndustrialIncome") {
      return businessAndProfessionalIncomeByHolder?.commercialAndIndustrialIncome?.toString()!;
    }
    if (field === "agriculturalIncomeFromForestryOrLivestock") {
      return businessAndProfessionalIncomeByHolder?.agriculturalIncomeFromForestryOrLivestock?.toString()!;
    }
    if (field === "incomeTableArticle151") {
      return businessAndProfessionalIncomeByHolder?.incomeTableArticle151?.toString()!;
    }
    if (field === "incomeFromUnforeseenInstallments") {
      return businessAndProfessionalIncomeByHolder?.incomeFromUnforeseenInstallments?.toString()!;
    }
    if (field === "intellectualOrIndustrialPropertyIncome") {
      return businessAndProfessionalIncomeByHolder?.intellectualOrIndustrialPropertyIncome?.toString()!;
    }
    if (field === "incomeIntellectualPropertyArt58NonExempt") {
      return businessAndProfessionalIncomeByHolder?.incomeIntellectualPropertyArt58NonExempt?.toString()!;
    }
    if (field === "incomeIntellectualPropertyArt58Exempt") {
      return businessAndProfessionalIncomeByHolder?.incomeIntellectualPropertyArt58Exempt?.toString()!;
    }
    if (field === "incomeOfArtistsAndSportsmen2017AndPrevious") {
      return businessAndProfessionalIncomeByHolder?.incomeOfArtistsAndSportsmen2017AndPrevious?.toString()!;
    }
    if (field === "incomeAttributableBusinessIndIncomeGeneratingActivities") {
      return businessAndProfessionalIncomeByHolder?.incomeAttributableBusinessIndIncomeGeneratingActivities?.toString()!;
    }
    if (field === "incomeOfArtists2018AndLater") {
      return businessAndProfessionalIncomeByHolder?.incomeOfArtists2018AndLater?.toString()!;
    }
    if (field === "incomeOfSportsmen2018AndLater") {
      return businessAndProfessionalIncomeByHolder?.incomeOfSportsmen2018AndLater?.toString()!;
    }

    return "";
  };

  const removeInvisibleLines = (object: valuesInterface) => {
    let NewBusinessAndProfessionalIncome = businessAndProfessionalIncome;

    // RENDIMENTOS ANEXO J

    if (Taxes?.anexxJParams.commIndIncome.visible! === false) {
      delete object["Rendimentos comerciais e industriais"];
      NewBusinessAndProfessionalIncome = {
        ...NewBusinessAndProfessionalIncome!,
        commercialAndIndustrialIncome: 0,
      };
    }
    if (Taxes?.anexxJParams.agriForestryLivestockIncome.visible! === false) {
      delete object["Rendimentos Agrícolas, Silvícolas ou pecuários"];
      NewBusinessAndProfessionalIncome = {
        ...NewBusinessAndProfessionalIncome!,
        agriculturalIncomeFromForestryOrLivestock: 0,
      };
    }
    if (Taxes?.anexxJParams.incomeFromProfActSpecProv.visible! === false) {
      delete object[
        "Rendimento das atividades profissionais especificamente previstas na Tabela do artigo 151.º do CIRS (exceto B10 e B11)"
      ];
      NewBusinessAndProfessionalIncome = {
        ...NewBusinessAndProfessionalIncome!,
        incomeTableArticle151: 0,
      };
    }
    if (Taxes?.anexxJParams.incomeFromServNotPrevCodes.visible! === false) {
      delete object[
        "Rendimentos de prestações de serviços não previstas nos códigos anteriores"
      ];
      NewBusinessAndProfessionalIncome = {
        ...NewBusinessAndProfessionalIncome!,
        incomeFromUnforeseenInstallments: 0,
      };
    }
    if (Taxes?.anexxJParams.incomeFromIntelOrIndusProp.visible! === false) {
      delete object["Rendimentos de propriedade intelectual ou industrial"];
      NewBusinessAndProfessionalIncome = {
        ...NewBusinessAndProfessionalIncome!,
        intellectualOrIndustrialPropertyIncome: 0,
      };
    }
    if (Taxes?.anexxJParams.incomeFromIntelPropNonExempt.visible! === false) {
      delete object[
        "Rendimentos de propriedade intelectual (rendimentos abrangidos pelo artigo º 58.º do EBF - parte não isenta)"
      ];
      NewBusinessAndProfessionalIncome = {
        ...NewBusinessAndProfessionalIncome!,
        incomeIntellectualPropertyArt58NonExempt: 0,
      };
    }
    if (Taxes?.anexxJParams.incomeFromIntelPropExempt.visible! === false) {
      delete object[
        "Rendimentos da propriedade intelectual (rendimentos abrangidos pelo artigo 58.º do EBF - parte isenta)"
      ];
      NewBusinessAndProfessionalIncome = {
        ...NewBusinessAndProfessionalIncome!,
        incomeIntellectualPropertyArt58Exempt: 0,
      };
    }
    if (Taxes?.anexxJParams.incomeOfArtistsSportsmenPrev.visible! === false) {
      delete object[
        "Rendimentos de artistas e desportistas - Ano de 2017 e anteriores"
      ];
      NewBusinessAndProfessionalIncome = {
        ...NewBusinessAndProfessionalIncome!,
        incomeOfArtistsAndSportsmen2017AndPrevious: 0,
      };
    }
    if (Taxes?.anexxJParams.incomeAttrToBusiProfAct.visible! === false) {
      delete object[
        "Rendimentos imputáveis a atividades geradoras de rendimentos empresariais e profissionais: i) Resultado positivo de rendimentos prediais ii) Rendimentos de capitais iii) Saldo positivo entre as mais e menos-valias e restantes incrementos patrimoniais"
      ];
      NewBusinessAndProfessionalIncome = {
        ...NewBusinessAndProfessionalIncome!,
        incomeAttributableBusinessIndIncomeGeneratingActivities: 0,
      };
    }
    if (Taxes?.anexxJParams.artistIncomePost2018.visible! === false) {
      delete object["Rendimentos de artistas – Ano de 2018 e seguintes"];
      NewBusinessAndProfessionalIncome = {
        ...NewBusinessAndProfessionalIncome!,
        incomeOfArtists2018AndLater: 0,
      };
    }
    if (Taxes?.anexxJParams.incomeOfAthletesPost2018.visible! === false) {
      delete object["Rendimentos de desportistas – Ano de 2018 e seguintes"];
      NewBusinessAndProfessionalIncome = {
        ...NewBusinessAndProfessionalIncome!,
        incomeOfSportsmen2018AndLater: 0,
      };
    }

    setBusinessAndProfessionalIncomeClone(
      NewBusinessAndProfessionalIncome ?? businessAndProfessionalIncomeClone
    );

    return object;
  };

  const InitialsValues = () => {
    const InitialRendimentosAnexoJ = {
      "Rendimentos comerciais e industriais": {
        rate: Taxes?.anexxJParams.commIndIncome.parameterValue!,
        name: "commercialAndIndustrialIncome",
        code: Taxes?.anexxJParams.commIndIncome.parameterCode ?? "B01",
        label: Taxes?.anexxJParams.commIndIncome.parameterName!,
      },
      "Rendimentos Agrícolas, Silvícolas ou pecuários": {
        rate: Taxes?.anexxJParams.agriForestryLivestockIncome.parameterValue!,
        name: "agriculturalIncomeFromForestryOrLivestock",
        code:
          Taxes?.anexxJParams.agriForestryLivestockIncome.parameterCode ??
          "B02",
        label: Taxes?.anexxJParams.agriForestryLivestockIncome.parameterName!,
      },
      "Rendimento das atividades profissionais especificamente previstas na Tabela do artigo 151.º do CIRS (exceto B10 e B11)":
        {
          rate: Taxes?.anexxJParams.incomeFromProfActSpecProv.parameterValue!,
          name: "incomeTableArticle151",
          code:
            Taxes?.anexxJParams.incomeFromProfActSpecProv.parameterCode ??
            "B03",
          label: Taxes?.anexxJParams.incomeFromProfActSpecProv.parameterName!,
        },
      "Rendimentos de prestações de serviços não previstas nos códigos anteriores":
        {
          rate: Taxes?.anexxJParams.incomeFromServNotPrevCodes.parameterValue!,
          name: "incomeFromUnforeseenInstallments",
          code:
            Taxes?.anexxJParams.incomeFromServNotPrevCodes.parameterCode ??
            "B04",
          label: Taxes?.anexxJParams.incomeFromServNotPrevCodes.parameterName!,
        },
      "Rendimentos de propriedade intelectual ou industrial": {
        rate: Taxes?.anexxJParams.incomeFromIntelOrIndusProp.parameterValue!,
        name: "intellectualOrIndustrialPropertyIncome",
        code:
          Taxes?.anexxJParams.incomeFromIntelOrIndusProp.parameterCode ?? "B05",
        label: Taxes?.anexxJParams.incomeFromIntelOrIndusProp.parameterName!,
      },
      "Rendimentos de propriedade intelectual (rendimentos abrangidos pelo artigo º 58.º do EBF - parte não isenta)":
        {
          rate: Taxes?.anexxJParams.incomeFromIntelPropNonExempt
            .parameterValue!,
          name: "incomeIntellectualPropertyArt58NonExempt",
          code:
            Taxes?.anexxJParams.incomeFromIntelPropNonExempt.parameterCode ??
            "B06",
          label:
            Taxes?.anexxJParams.incomeFromIntelPropNonExempt.parameterName!,
        },
      "Rendimentos da propriedade intelectual (rendimentos abrangidos pelo artigo 58.º do EBF - parte isenta)":
        {
          rate: Taxes?.anexxJParams.incomeFromIntelPropExempt.parameterValue!,
          name: "incomeIntellectualPropertyArt58Exempt",
          code:
            Taxes?.anexxJParams.incomeFromIntelPropExempt.parameterCode ??
            "B07",
          label: Taxes?.anexxJParams.incomeFromIntelPropExempt.parameterName!,
        },
      "Rendimentos de artistas e desportistas - Ano de 2017 e anteriores": {
        rate: Taxes?.anexxJParams.incomeOfArtistsSportsmenPrev.parameterValue!,
        name: "incomeOfArtistsAndSportsmen2017AndPrevious",
        code:
          Taxes?.anexxJParams.incomeOfArtistsSportsmenPrev.parameterCode ??
          "B08",
        label: Taxes?.anexxJParams.incomeOfArtistsSportsmenPrev.parameterName!,
      },
      "Rendimentos imputáveis a atividades geradoras de rendimentos empresariais e profissionais: i) Resultado positivo de rendimentos prediais ii) Rendimentos de capitais iii) Saldo positivo entre as mais e menos-valias e restantes incrementos patrimoniais":
        {
          rate: Taxes?.anexxJParams.incomeAttrToBusiProfAct.parameterValue!,
          name: "incomeAttributableBusinessIndIncomeGeneratingActivities",
          code:
            Taxes?.anexxJParams.incomeAttrToBusiProfAct.parameterCode ?? "B09",
          label: Taxes?.anexxJParams.incomeAttrToBusiProfAct.parameterName!,
        },
      "Rendimentos de artistas – Ano de 2018 e seguintes": {
        rate: Taxes?.anexxJParams.artistIncomePost2018.parameterValue!,
        name: "incomeOfArtists2018AndLater",
        code: Taxes?.anexxJParams.artistIncomePost2018.parameterCode ?? "B10",
        label: Taxes?.anexxJParams.artistIncomePost2018.parameterName!,
      },
      "Rendimentos de desportistas – Ano de 2018 e seguintes": {
        rate: Taxes?.anexxJParams.incomeOfAthletesPost2018.parameterValue!,
        name: "incomeOfSportsmen2018AndLater",
        code:
          Taxes?.anexxJParams.incomeOfAthletesPost2018.parameterCode ?? "B11",
        label: Taxes?.anexxJParams.incomeOfAthletesPost2018.parameterName!,
      },
    };

    setRendimentosAnexoJ(removeInvisibleLines(InitialRendimentosAnexoJ));
  };

  useEffect(() => {
    const value =
      calculateNetIncomeEarnedAbroadForResidentsTotal({
        ...valueTotal,
      }) * 0.75;
    setTotalGrossIncomeField(value);
  }, [valueTotal]);

  useEffect(() => {
    setValueTotal(initialValuesTotal());

    InitialsValues();
  }, [currentHolder]);

  useEffect(() => {
    setBusinessAndProfessionalIncomeClone(businessAndProfessionalIncome!);
  }, [businessAndProfessionalIncome]);

  useEffect(() => {
    if (businessAndProfessionalIncomeClone === businessAndProfessionalIncome) {
      setValueTotal(initialValuesTotal());
      InitialsValues();
    }
    saveValues(businessAndProfessionalIncomeClone);
  }, [businessAndProfessionalIncomeClone]);

  return (
    <div className="resume-wrapper" style={{ marginTop: "20px" }}>
      <div>
        <Text
          className="title"
          text={<b>{t("typeIncomeDeclaredModel3")}</b>}
          fontSize="16px"
          margin="0px 0px 10px 0px"
        />
      </div>
      <Accordion title={title} open>
        <div className="row-title-wrapper">
          <div style={{ width: "163px" }}>
            <Text
              text={
                <b>
                  {t("grossIncome")}
                  <br />
                  (1)
                </b>
              }
              margin="20px auto 16px 0px"
              textAlign="center"
            />
          </div>

          <div style={{ width: "75px" }}>
            <Text
              text={
                <b>
                  {t("correctionFactor")}
                  <br />
                  (2)
                </b>
              }
              textAlign="center"
              margin="20px 10px"
            />
          </div>
          <div style={{ width: "156px" }}>
            <Text
              text={
                <b>
                  {t("finalGrossIncome")}
                  <br />
                  (1x2)
                </b>
              }
              textAlign="center"
              margin="20px 10px"
            />
          </div>
        </div>

        {Object.keys(rendimentosAnexoJ).length !== 0 ? (
          <Text
            className="uppercase"
            text={<b>{t("professionalsIncome")}</b>}
            margin="20px 0px"
          />
        ) : null}
        {Object.entries(rendimentosAnexoJ).map(([key, value]) => (
          <div className="row-wrapper" key={key}>
            <TextField
              label={`${value.code}-${value.label}`}
              defaultValue={
                returnDefaultValue(value.name) === 0
                  ? undefined
                  : returnDefaultValue(value.name)?.toString()!
              }
              valueCallback={(val: number) =>
                handleChange(key, val, value.rate)
              }
              placeholder={
                readOnly
                  ? formatToEuroCurrency(
                      parseFloat(returnPlaceHolderValue(value.name))
                    )
                  : ""
              }
              isDisabled={readOnly}
              width="200px"
            />
            <div className="row-wrapper-2">
              <div style={{ marginLeft: "5px" }}>
                <TextField
                  placeholder={`${parseInt(
                    (value.rate * 100).toString(),
                    10
                  )}%`}
                  isDisabled
                  width="75px"
                />
              </div>
              <div style={{ marginLeft: "5px" }}>
                <TextField
                  placeholder={formatToEuroCurrency(
                    parseFloat(calculateFinalGrossIncome(key, value.rate))
                  )}
                  isDisabled
                />
              </div>
            </div>
          </div>
        ))}
      </Accordion>
      <Grid container>
        <Grid item xs={12} style={{ marginTop: "5px" }}>
          <div>
            <Total
              value={
                readOnly
                  ? formatToEuroCurrency(totalGrossIncomeByHolder!)
                  : formatToEuroCurrency(totalGrossIncomeField!)
              }
              isModel
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6} style={{ marginTop: "14px" }}>
          {!readOnly && (
            <NBButton onClick={handleClean} fullWidth>
              {t("clean")}
            </NBButton>
          )}
        </Grid>
        <Grid item xs={12} md={6} style={{ marginTop: "14px" }}>
          {!readOnly && (
            <div className="row-spacing-div">
              <NBButton
                onClick={() =>
                  applyTotalValue(
                    totalGrossIncomeField,
                    businessAndProfessionalIncomeClone
                  )
                }
                fullWidth
              >
                {t("apply")}
              </NBButton>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default TipoRendimentoDeclaradoModelo3AnexoJ;
