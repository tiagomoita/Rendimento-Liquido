/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import { useEffect, useState } from "react";
import { NBButton } from "@nb-omc-xit-frontend/nb-shared/lib/NBButton";
import { calculateNetIncomeIndependentWithoutOrganizedAccountingTotal } from "npm-pkg-simul-simrl";
import { Grid } from "@material-ui/core";
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
import {
  AgriYieldsSilvLivstck,
  IndComProIncome,
} from "../../../../store/modules/entities/holder/types";
import "./Common.scss";

type TipoRendimentoDeclaradoModelo3Props = {
  title: string;
  indComProIncome?: IndComProIncome;
  agriYieldsSilvLivstck?: AgriYieldsSilvLivstck;
  otherIncome?: {
    otherIncome: number;
  };
  indComProIncomeByHolder?: IndComProIncome;
  agriYieldsSilvLivstckByHolder?: AgriYieldsSilvLivstck;
  otherIncomeByHolder?: {
    otherIncome: number;
  };
  totalGrossIncomeByHolder?: number;
  readOnly?: boolean;
  applyTotalValue?: any;
  handleCleanModel?: any;
};

type valuesInterface = {
  [key: string]: { rate: number; name: string };
};

const TipoRendimentoDeclaradoModelo3 = (
  props: TipoRendimentoDeclaradoModelo3Props
) => {
  const {
    title,
    indComProIncome,
    agriYieldsSilvLivstck,
    otherIncome,
    indComProIncomeByHolder,
    agriYieldsSilvLivstckByHolder,
    otherIncomeByHolder,
    totalGrossIncomeByHolder,
    readOnly,
    applyTotalValue,
    handleCleanModel,
  } = props;

  const currentHolder = useSelector(retrieveCurrentHolder);
  const Taxes = useSelector(retrieveTaxes);

  const [
    rendimentosProfissionaisComerciaisIndustriais,
    setRendimentosProfissionaisComerciaisIndustriais,
  ] = useState<valuesInterface>({});

  const [indComProIncomeClone, setIndComProIncomeClone] =
    useState<IndComProIncome>(indComProIncome!);

  const [agriYieldsSilvLivstckClone, setAgriYieldsSilvLivstckClone] =
    useState<AgriYieldsSilvLivstck>(agriYieldsSilvLivstck!);

  const [otherIncomeClone, setOtherIncomeClone] = useState<{
    otherIncome: number;
  }>(otherIncome!);

  const [totalGrossIncomeField, setTotalGrossIncomeField] = useState(0);

  const [
    rendimentosAgricolasSilvicolasPecuarios,
    setRendimentosAgricolasSilvicolasPecuarios,
  ] = useState<valuesInterface>({});

  const [outrosRendimentos, setOutrosRendimentos] = useState<valuesInterface>(
    {}
  );

  const returnDefaultValue = (field: string): number => {
    if (field === "saleOfGoodsAndProducts") {
      return indComProIncomeClone?.saleOfGoodsAndProducts ?? 0;
    }
    if (field === "provisionOfHotelAndSimilarServicesCateringAndBeverage") {
      return (
        indComProIncomeClone?.provisionOfHotelAndSimilarServicesCateringAndBeverage ??
        0
      );
    }
    if (field === "provisionOfCateringAndBeverageActivitiesServices") {
      return (
        indComProIncomeClone?.provisionOfCateringAndBeverageActivitiesServices ??
        0
      );
    }
    if (field === "provisionOfHotelServicesAndSimilarActivities") {
      return (
        indComProIncomeClone?.provisionOfHotelServicesAndSimilarActivities ?? 0
      );
    }
    if (field === "provisionOfServRelatedToTheExploOfLocalAccEstablishments") {
      return (
        indComProIncomeClone?.provisionOfServRelatedToTheExploOfLocalAccEstablishments ??
        0
      );
    }
    if (field === "incomeFromProActivitiesSpecifArticle151OfTheCIRS") {
      return (
        indComProIncomeClone?.incomeFromProActivitiesSpecifArticle151OfTheCIRS ??
        0
      );
    }
    if (field === "incomeFromServicesRenderedNotForeseenInThePreviousFields") {
      return (
        indComProIncomeClone?.incomeFromServicesRenderedNotForeseenInThePreviousFields ??
        0
      );
    }
    if (field === "intellPropertyNotCoveByArtic58OfTheEBFIndOrInforProperty") {
      return (
        indComProIncomeClone?.intellPropertyNotCoveByArtic58OfTheEBFIndOrInforProperty ??
        0
      );
    }
    if (field === "intellPropertyIncoCoveredByArtic58OfTheEBFNonExemptPart") {
      return (
        indComProIncomeClone?.intellPropertyIncoCoveredByArtic58OfTheEBFNonExemptPart ??
        0
      );
    }
    if (field === "positiveBalanOfCapGainsAndLossesAndOtherEquityIncrements") {
      return (
        indComProIncomeClone?.positiveBalanOfCapGainsAndLossesAndOtherEquityIncrements ??
        0
      );
    }
    if (field === "incomeFromFinancialActivitiesCAECodesStartWith6465or66") {
      return (
        indComProIncomeClone?.incomeFromFinancialActivitiesCAECodesStartWith6465or66 ??
        0
      );
    }
    if (field === "servicProvidedByMembToProSocOfTheFiscalTransparencRegime") {
      return (
        indComProIncomeClone?.servicProvidedByMembToProSocOfTheFiscalTransparencRegime ??
        0
      );
    }
    if (field === "positiveResultOfPropertyIncome") {
      return indComProIncomeClone?.positiveResultOfPropertyIncome ?? 0;
    }
    if (field === "propertyIncomeAttributableToCatBIncomeGeneratingActivity") {
      return (
        indComProIncomeClone?.propertyIncomeAttributableToCatBIncomeGeneratingActivity ??
        0
      );
    }
    if (field === "operatingSubsidies") {
      return indComProIncomeClone?.operatingSubsidies ?? 0;
    }
    if (field === "otherSubsidies") {
      return indComProIncomeClone?.otherSubsidies ?? 0;
    }
    if (field === "categoryBIncomeNotIncludedInPreviousFields") {
      return (
        indComProIncomeClone?.categoryBIncomeNotIncludedInPreviousFields ?? 0
      );
    }
    if (field === "salesProductsOtherThanThoseIncludField7") {
      return (
        agriYieldsSilvLivstckClone?.salesProductsOtherThanThoseIncludField7 ?? 0
      );
    }
    if (field === "servicesRendered") {
      return agriYieldsSilvLivstckClone?.servicesRendered ?? 0;
    }
    if (field === "incomeFromCapitalAndRealEstate") {
      return agriYieldsSilvLivstckClone?.incomeFromCapitalAndRealEstate ?? 0;
    }
    if (field === "agriYieldsSilvLivstckPositiveResultOfPropertyIncome") {
      return agriYieldsSilvLivstckClone?.positiveResultOfPropertyIncome ?? 0;
    }
    if (field === "operatingSubsidiesRelatedToSales") {
      return agriYieldsSilvLivstckClone?.operatingSubsidiesRelatedToSales ?? 0;
    }
    if (field === "agriYieldsSilvLivstckOtherSubsidies") {
      return agriYieldsSilvLivstckClone?.otherSubsidies ?? 0;
    }
    if (field === "incomeFromSalesMultiannual") {
      return agriYieldsSilvLivstckClone?.incomeFromSalesMultiannual ?? 0;
    }
    if (field === "categoryBIncome") {
      return agriYieldsSilvLivstckClone?.categoryBIncome ?? 0;
    }
    if (field === "otherIncome") {
      return otherIncomeClone?.otherIncome ?? 0;
    }

    return 0;
  };

  const initialValuesTotal = () => {
    return {
      saleOfGoodsAndProductsTotal: roundValue(
        returnDefaultValue("saleOfGoodsAndProducts") *
          (Taxes?.saleOfGoodsAndProducts! || 0)
      ),
      provisionOfHotelAndSimilarServicesCateringAndBeverageTotal: roundValue(
        returnDefaultValue(
          "provisionOfHotelAndSimilarServicesCateringAndBeverage"
        ) * (Taxes?.provisionOfHotelAndSimilarServicesCateringAndBeverage! || 0)
      ),
      provisionOfCateringAndBeverageActivitiesServicesTotal: roundValue(
        returnDefaultValue("provisionOfCateringAndBeverageActivitiesServices") *
          (Taxes?.provisionOfCateringAndBeverageActivitiesServices! || 0)
      ),
      provisionOfHotelServicesAndSimilarActivitiesTotal: roundValue(
        returnDefaultValue("provisionOfHotelServicesAndSimilarActivities") *
          (Taxes?.provisionOfHotelServicesAndSimilarActivities! || 0)
      ),
      provisionOfServRelatedToTheExploOfLocalAccEstablishmentsTotal: roundValue(
        returnDefaultValue(
          "provisionOfServRelatedToTheExploOfLocalAccEstablishments"
        ) *
          (Taxes?.provisionOfServRelatedToTheExploOfLocalAccEstablishments! ||
            0)
      ),
      incomeFromProActivitiesSpecifArticle151OfTheCIRSTotal: roundValue(
        returnDefaultValue("incomeFromProActivitiesSpecifArticle151OfTheCIRS") *
          (Taxes?.incomeFromProActivitiesSpecifArticle151OfTheCIRS! || 0)
      ),
      incomeFromServicesRenderedNotForeseenInThePreviousFieldsTotal: roundValue(
        returnDefaultValue(
          "incomeFromServicesRenderedNotForeseenInThePreviousFields"
        ) *
          (Taxes?.incomeFromServicesRenderedNotForeseenInThePreviousFields! ||
            0)
      ),
      intellPropertyNotCoveByArtic58OfTheEBFIndOrInforPropertyTotal: roundValue(
        returnDefaultValue(
          "intellPropertyNotCoveByArtic58OfTheEBFIndOrInforProperty"
        ) *
          (Taxes?.intellPropertyNotCoveByArtic58OfTheEBFIndOrInforProperty! ||
            0)
      ),
      intellPropertyIncoCoveredByArtic58OfTheEBFNonExemptPartTotal: roundValue(
        returnDefaultValue(
          "intellPropertyIncoCoveredByArtic58OfTheEBFNonExemptPart"
        ) *
          (Taxes?.intellPropertyIncoCoveredByArtic58OfTheEBFNonExemptPart! || 0)
      ),
      positiveBalanOfCapGainsAndLossesAndOtherEquityIncrementsTotal: roundValue(
        returnDefaultValue(
          "positiveBalanOfCapGainsAndLossesAndOtherEquityIncrements"
        ) *
          (Taxes?.positiveBalanOfCapGainsAndLossesAndOtherEquityIncrements! ||
            0)
      ),
      incomeFromFinancialActivitiesCAECodesStartWith6465or66Total: roundValue(
        returnDefaultValue(
          "incomeFromFinancialActivitiesCAECodesStartWith6465or66"
        ) *
          (Taxes?.incomeFromFinancialActivitiesCAECodesStartWith6465or66! || 0)
      ),
      servicProvidedByMembToProSocOfTheFiscalTransparencRegimeTotal: roundValue(
        returnDefaultValue(
          "servicProvidedByMembToProSocOfTheFiscalTransparencRegime"
        ) *
          (Taxes?.servicProvidedByMembToProSocOfTheFiscalTransparencRegime! ||
            0)
      ),
      positiveResultOfPropertyIncomeTotal: roundValue(
        returnDefaultValue("positiveResultOfPropertyIncome") *
          (Taxes?.positiveResultOfPropertyIncome! || 0)
      ),
      propertyIncomeAttributableToCatBIncomeGeneratingActivityTotal: roundValue(
        returnDefaultValue(
          "propertyIncomeAttributableToCatBIncomeGeneratingActivity"
        ) *
          (Taxes?.propertyIncomeAttributableToCatBIncomeGeneratingActivity! ||
            0)
      ),
      operatingSubsidiesTotal: roundValue(
        returnDefaultValue("operatingSubsidies") *
          (Taxes?.operatingSubsidies! || 0)
      ),
      otherSubsidiesTotal: roundValue(
        returnDefaultValue("otherSubsidies") * (Taxes?.otherSubsidies! || 0)
      ),
      categoryBIncomeNotIncludedInPreviousFieldsTotal: roundValue(
        returnDefaultValue("categoryBIncomeNotIncludedInPreviousFields") *
          (Taxes?.categoryBIncomeNotIncludedInPreviousFields! || 0)
      ),
      salesProductsOtherThanThoseIncludField7Total: roundValue(
        returnDefaultValue("salesProductsOtherThanThoseIncludField7") *
          (Taxes?.salesProductsOtherThanThoseIncludField7! || 0)
      ),
      servicesRenderedTotal: roundValue(
        returnDefaultValue("servicesRendered") * (Taxes?.servicesRendered! || 0)
      ),
      incomeFromCapitalAndRealEstateTotal: roundValue(
        returnDefaultValue("incomeFromCapitalAndRealEstate") *
          (Taxes?.incomeFromCapitalAndRealEstate! || 0)
      ),
      agriYieldsSilvLivstckPositiveResultOfPropertyIncomeTotal: roundValue(
        returnDefaultValue(
          "agriYieldsSilvLivstckPositiveResultOfPropertyIncome"
        ) * (Taxes?.positiveResultOfPropertyIncomeAgri! || 0)
      ),
      operatingSubsidiesRelatedToSalesTotal: roundValue(
        returnDefaultValue("operatingSubsidiesRelatedToSales") *
          (Taxes?.operatingSubsidiesRelatedToSales! || 0)
      ),
      agriYieldsSilvLivstckOtherSubsidiesTotal: roundValue(
        returnDefaultValue("agriYieldsSilvLivstckOtherSubsidies") *
          (Taxes?.otherSubsidiesAgri! || 0)
      ),
      incomeFromSalesMultiannualTotal: roundValue(
        returnDefaultValue("incomeFromSalesMultiannual") *
          (Taxes?.incomeFromSalesMultiannual! || 0)
      ),
      categoryBIncomeTotal: roundValue(
        returnDefaultValue("categoryBIncome") * (Taxes?.categoryBIncome! || 0)
      ),
      otherIncomeTotal: roundValue(
        returnDefaultValue("otherIncome") * (Taxes?.otherIncome! || 0)
      ),
    };
  };

  const [valueTotal, setValueTotal] = useState<any>(initialValuesTotal());

  const handleClean = () => {
    setIndComProIncomeClone({
      saleOfGoodsAndProducts: 0,
      provisionOfHotelAndSimilarServicesCateringAndBeverage: 0,
      provisionOfCateringAndBeverageActivitiesServices: 0,
      provisionOfHotelServicesAndSimilarActivities: 0,
      provisionOfServRelatedToTheExploOfLocalAccEstablishments: 0,
      incomeFromProActivitiesSpecifArticle151OfTheCIRS: 0,
      incomeFromServicesRenderedNotForeseenInThePreviousFields: 0,
      intellPropertyNotCoveByArtic58OfTheEBFIndOrInforProperty: 0,
      intellPropertyIncoCoveredByArtic58OfTheEBFNonExemptPart: 0,
      positiveBalanOfCapGainsAndLossesAndOtherEquityIncrements: 0,
      incomeFromFinancialActivitiesCAECodesStartWith6465or66: 0,
      servicProvidedByMembToProSocOfTheFiscalTransparencRegime: 0,
      positiveResultOfPropertyIncome: 0,
      propertyIncomeAttributableToCatBIncomeGeneratingActivity: 0,
      operatingSubsidies: 0,
      otherSubsidies: 0,
      categoryBIncomeNotIncludedInPreviousFields: 0,
    });
    setAgriYieldsSilvLivstckClone({
      salesProductsOtherThanThoseIncludField7: 0,
      servicesRendered: 0,
      incomeFromCapitalAndRealEstate: 0,
      positiveResultOfPropertyIncome: 0,
      operatingSubsidiesRelatedToSales: 0,
      otherSubsidies: 0,
      incomeFromSalesMultiannual: 0,
      categoryBIncome: 0,
    });
    setOtherIncomeClone({ otherIncome: 0 });
    setValueTotal({
      saleOfGoodsAndProductsTotal: 0,
      provisionOfHotelAndSimilarServicesCateringAndBeverageTotal: 0,
      provisionOfCateringAndBeverageActivitiesServicesTotal: 0,
      provisionOfHotelServicesAndSimilarActivitiesTotal: 0,
      provisionOfServRelatedToTheExploOfLocalAccEstablishmentsTotal: 0,
      incomeFromProActivitiesSpecifArticle151OfTheCIRSTotal: 0,
      incomeFromServicesRenderedNotForeseenInThePreviousFieldsTotal: 0,
      intellPropertyNotCoveByArtic58OfTheEBFIndOrInforPropertyTotal: 0,
      intellPropertyIncoCoveredByArtic58OfTheEBFNonExemptPartTotal: 0,
      positiveBalanOfCapGainsAndLossesAndOtherEquityIncrementsTotal: 0,
      incomeFromFinancialActivitiesCAECodesStartWith6465or66Total: 0,
      servicProvidedByMembToProSocOfTheFiscalTransparencRegimeTotal: 0,
      positiveResultOfPropertyIncomeTotal: 0,
      propertyIncomeAttributableToCatBIncomeGeneratingActivityTotal: 0,
      operatingSubsidiesTotal: 0,
      otherSubsidiesTotal: 0,
      categoryBIncomeNotIncludedInPreviousFieldsTotal: 0,
      salesProductsOtherThanThoseIncludField7Total: 0,
      servicesRenderedTotal: 0,
      incomeFromCapitalAndRealEstateTotal: 0,
      agriYieldsSilvLivstckPositiveResultOfPropertyIncomeTotal: 0,
      operatingSubsidiesRelatedToSalesTotal: 0,
      agriYieldsSilvLivstckOtherSubsidiesTotal: 0,
      incomeFromSalesMultiannualTotal: 0,
      categoryBIncomeTotal: 0,
      otherIncomeTotal: 0,
    });
    handleCleanModel();
  };

  const handleFieldChange = (
    field: string,
    value: number,
    subfield?: string
  ) => {
    if (field === "indComProIncome") {
      setIndComProIncomeClone({
        ...indComProIncomeClone!,
        [subfield!]: value,
      });
    }
    if (field === "agriYieldsSilvLivstck") {
      setAgriYieldsSilvLivstckClone({
        ...agriYieldsSilvLivstckClone!,
        [subfield!]: value,
      });
    }
    if (field === "otherIncome") {
      setOtherIncomeClone({
        ...otherIncomeClone!,
        [subfield!]: value,
      });
    }
  };

  const handleChange = (key: string, val: number, rate?: number) => {
    switch (key) {
      case "Venda de mercadorias e produtos": {
        handleFieldChange("indComProIncome", val, "saleOfGoodsAndProducts");
        setValueTotal({
          ...valueTotal,
          saleOfGoodsAndProductsTotal: roundValue(val * rate!),
        });

        break;
      }
      case "Prestações de serviços de atividades hoteleiras e similares, restauração e bebidas - anos 2015 e 2016": {
        handleFieldChange(
          "indComProIncome",
          val,
          "provisionOfHotelAndSimilarServicesCateringAndBeverage"
        );
        setValueTotal({
          ...valueTotal,
          provisionOfHotelAndSimilarServicesCateringAndBeverageTotal:
            roundValue(val * rate!),
        });
        break;
      }
      case "Prestações de serviços de atividades de restauração e bebidas": {
        handleFieldChange(
          "indComProIncome",
          val,
          "provisionOfCateringAndBeverageActivitiesServices"
        );
        setValueTotal({
          ...valueTotal,
          provisionOfCateringAndBeverageActivitiesServicesTotal: roundValue(
            val * rate!
          ),
        });
        break;
      }
      case "Prestações de serviços de atividades hoteleiras e similares": {
        handleFieldChange(
          "indComProIncome",
          val,
          "provisionOfHotelServicesAndSimilarActivities"
        );
        setValueTotal({
          ...valueTotal,
          provisionOfHotelServicesAndSimilarActivitiesTotal: roundValue(
            val * rate!
          ),
        });
        break;
      }
      case "Prestações de serviços de atividades de exploração de estabelecimentos de alojamento local na modalidade de moradia ou apartamento": {
        handleFieldChange(
          "indComProIncome",
          val,
          "provisionOfServRelatedToTheExploOfLocalAccEstablishments"
        );
        setValueTotal({
          ...valueTotal,
          provisionOfServRelatedToTheExploOfLocalAccEstablishmentsTotal:
            roundValue(val * rate!),
        });
        break;
      }
      case "Rendimento das atividades profissionais especificamente previstas na Tabela do art.º 151.º do CIRS": {
        handleFieldChange(
          "indComProIncome",
          val,
          "incomeFromProActivitiesSpecifArticle151OfTheCIRS"
        );
        setValueTotal({
          ...valueTotal,
          incomeFromProActivitiesSpecifArticle151OfTheCIRSTotal: roundValue(
            val * rate!
          ),
        });
        break;
      }
      case "Rendimentos de prestações de serviços não previstos nos campos anteriores": {
        handleFieldChange(
          "indComProIncome",
          val,
          "incomeFromServicesRenderedNotForeseenInThePreviousFields"
        );
        setValueTotal({
          ...valueTotal,
          incomeFromServicesRenderedNotForeseenInThePreviousFieldsTotal:
            roundValue(val * rate!),
        });
        break;
      }
      case "Propriedade intelectual(não abrangida pelo art. 58.º do EBF), industrial ou de prestação de informações": {
        handleFieldChange(
          "indComProIncome",
          val,
          "intellPropertyNotCoveByArtic58OfTheEBFIndOrInforProperty"
        );
        setValueTotal({
          ...valueTotal,
          intellPropertyNotCoveByArtic58OfTheEBFIndOrInforPropertyTotal:
            roundValue(val * rate!),
        });
        break;
      }
      case "Propriedade intelectual(Rendimentos abrangidos pelo art. 58.º do EBF - parte não isenta)": {
        handleFieldChange(
          "indComProIncome",
          val,
          "intellPropertyIncoCoveredByArtic58OfTheEBFNonExemptPart"
        );
        setValueTotal({
          ...valueTotal,
          intellPropertyIncoCoveredByArtic58OfTheEBFNonExemptPartTotal:
            roundValue(val * rate!),
        });
        break;
      }
      case "Saldo positivo das mais e menos-valias e restantes incrementos patrimoniais": {
        handleFieldChange(
          "indComProIncome",
          val,
          "positiveBalanOfCapGainsAndLossesAndOtherEquityIncrements"
        );
        setValueTotal({
          ...valueTotal,
          positiveBalanOfCapGainsAndLossesAndOtherEquityIncrementsTotal:
            roundValue(val * rate!),
        });
        break;
      }
      case "Rendimentos de Atividades Financeiras (Códigos CAE iniciados por 64, 65 ou 66)": {
        handleFieldChange(
          "indComProIncome",
          val,
          "incomeFromFinancialActivitiesCAECodesStartWith6465or66"
        );
        setValueTotal({
          ...valueTotal,
          incomeFromFinancialActivitiesCAECodesStartWith6465or66Total:
            roundValue(val * rate!),
        });
        break;
      }
      case "Serviços prestados por sócios a sociedades de profissionais do Regime de Transparência Fiscal": {
        handleFieldChange(
          "indComProIncome",
          val,
          "servicProvidedByMembToProSocOfTheFiscalTransparencRegime"
        );
        setValueTotal({
          ...valueTotal,
          servicProvidedByMembToProSocOfTheFiscalTransparencRegimeTotal:
            roundValue(val * rate!),
        });
        break;
      }
      case "Resultado positivo de rendimentos prediais": {
        handleFieldChange(
          "indComProIncome",
          val,
          "positiveResultOfPropertyIncome"
        );
        setValueTotal({
          ...valueTotal,
          positiveResultOfPropertyIncomeTotal: roundValue(val * rate!),
        });
        break;
      }
      case "Rendimentos prediais imputáveis a atividade geradora de rendimentos da Categoria B": {
        handleFieldChange(
          "indComProIncome",
          val,
          "propertyIncomeAttributableToCatBIncomeGeneratingActivity"
        );
        setValueTotal({
          ...valueTotal,
          propertyIncomeAttributableToCatBIncomeGeneratingActivityTotal:
            roundValue(val * rate!),
        });
        break;
      }
      case "Subsídios à exploração": {
        handleFieldChange("indComProIncome", val, "operatingSubsidies");
        setValueTotal({
          ...valueTotal,
          operatingSubsidiesTotal: roundValue(val * rate!),
        });
        break;
      }
      case "Outros subsídios": {
        handleFieldChange("indComProIncome", val, "otherSubsidies");
        setValueTotal({
          ...valueTotal,
          otherSubsidiesTotal: roundValue(val * rate!),
        });
        break;
      }
      case "Rendimentos da Categoria B não incluídos nos campos anteriores": {
        handleFieldChange(
          "indComProIncome",
          val,
          "categoryBIncomeNotIncludedInPreviousFields"
        );
        setValueTotal({
          ...valueTotal,
          categoryBIncomeNotIncludedInPreviousFieldsTotal: roundValue(
            val * rate!
          ),
        });
        break;
      }
      case "Vendas de produtos com exceção das incluídas no campo 7": {
        handleFieldChange(
          "agriYieldsSilvLivstck",
          val,
          "salesProductsOtherThanThoseIncludField7"
        );
        setValueTotal({
          ...valueTotal,
          salesProductsOtherThanThoseIncludField7Total: roundValue(val * rate!),
        });
        break;
      }
      case "Prestações de serviços": {
        handleFieldChange("agriYieldsSilvLivstck", val, "servicesRendered");
        setValueTotal({
          ...valueTotal,
          servicesRenderedTotal: roundValue(val * rate!),
        });
        break;
      }
      case "Rendimentos de capitais e prediais imputáveis a atividades geradoras de rendimentos da Categoria B, rendimentos da propriedade intelectual, industrial ou prestação de informações, saldo positivo das mais e menos-valias e restantes incrementos patrimoniais": {
        handleFieldChange(
          "agriYieldsSilvLivstck",
          val,
          "incomeFromCapitalAndRealEstate"
        );
        setValueTotal({
          ...valueTotal,
          incomeFromCapitalAndRealEstateTotal: roundValue(val * rate!),
        });
        break;
      }
      case "Resultado positivo de rendimentos prediais ": {
        handleFieldChange(
          "agriYieldsSilvLivstck",
          val,
          "positiveResultOfPropertyIncome"
        );
        setValueTotal({
          ...valueTotal,
          agriYieldsSilvLivstckPositiveResultOfPropertyIncomeTotal: roundValue(
            val * rate!
          ),
        });
        break;
      }
      case "Subsídios à exploração relacionados com as vendas": {
        handleFieldChange(
          "agriYieldsSilvLivstck",
          val,
          "operatingSubsidiesRelatedToSales"
        );
        setValueTotal({
          ...valueTotal,
          operatingSubsidiesRelatedToSalesTotal: roundValue(val * rate!),
        });
        break;
      }
      case "Outros subsídios ": {
        handleFieldChange("agriYieldsSilvLivstck", val, "otherSubsidies");
        setValueTotal({
          ...valueTotal,
          agriYieldsSilvLivstckOtherSubsidiesTotal: roundValue(val * rate!),
        });
        break;
      }
      case "Rendimentos decorrentes de vendas em explorações silvícolas plurianuais (art.º 59.º-D, n.º 1 do EBF)": {
        handleFieldChange(
          "agriYieldsSilvLivstck",
          val,
          "incomeFromSalesMultiannual"
        );
        setValueTotal({
          ...valueTotal,
          incomeFromSalesMultiannualTotal: roundValue(val * rate!),
        });
        break;
      }
      case "Rendimentos da Categoria B não incluídos nos campos anteriores ": {
        handleFieldChange("agriYieldsSilvLivstck", val, "categoryBIncome");
        setValueTotal({
          ...valueTotal,
          categoryBIncomeTotal: roundValue(val * rate!),
        });
        break;
      }
      case "OUTROS RENDIMENTOS": {
        handleFieldChange("otherIncome", val, "otherIncome");
        setValueTotal({
          ...valueTotal,
          otherIncomeTotal: roundValue(val * rate!),
        });
        break;
      }

      default:
    }
  };

  const calculateFinalGrossIncome = (key: string, rate: number) => {
    if (readOnly) {
      switch (key) {
        case "Venda de mercadorias e produtos": {
          return `${roundValue(
            (indComProIncomeByHolder?.saleOfGoodsAndProducts! || 0) * rate
          ).toString()} €`;
        }
        case "Prestações de serviços de atividades hoteleiras e similares, restauração e bebidas - anos 2015 e 2016": {
          return `${roundValue(
            (indComProIncomeByHolder?.provisionOfHotelAndSimilarServicesCateringAndBeverage! ||
              0) * rate
          ).toString()} €`;
        }
        case "Prestações de serviços de atividades de restauração e bebidas": {
          return `${roundValue(
            (indComProIncomeByHolder?.provisionOfCateringAndBeverageActivitiesServices! ||
              0) * rate
          ).toString()} €`;
        }
        case "Prestações de serviços de atividades hoteleiras e similares": {
          return `${roundValue(
            (indComProIncomeByHolder?.provisionOfHotelServicesAndSimilarActivities! ||
              0) * rate
          ).toString()} €`;
        }
        case "Prestações de serviços de atividades de exploração de estabelecimentos de alojamento local na modalidade de moradia ou apartamento": {
          return `${roundValue(
            (indComProIncomeByHolder?.provisionOfServRelatedToTheExploOfLocalAccEstablishments! ||
              0) * rate
          ).toString()} €`;
        }
        case "Rendimento das atividades profissionais especificamente previstas na Tabela do art.º 151.º do CIRS": {
          return `${roundValue(
            (indComProIncomeByHolder?.incomeFromProActivitiesSpecifArticle151OfTheCIRS! ||
              0) * rate
          ).toString()} €`;
        }
        case "Rendimentos de prestações de serviços não previstos nos campos anteriores": {
          return `${roundValue(
            (indComProIncomeByHolder?.incomeFromServicesRenderedNotForeseenInThePreviousFields! ||
              0) * rate
          ).toString()} €`;
        }
        case "Propriedade intelectual(não abrangida pelo art. 58.º do EBF), industrial ou de prestação de informações": {
          return `${roundValue(
            (indComProIncomeByHolder?.intellPropertyNotCoveByArtic58OfTheEBFIndOrInforProperty! ||
              0) * rate
          ).toString()} €`;
        }
        case "Propriedade intelectual(Rendimentos abrangidos pelo art. 58.º do EBF - parte não isenta)": {
          return `${roundValue(
            (indComProIncomeByHolder?.intellPropertyIncoCoveredByArtic58OfTheEBFNonExemptPart! ||
              0) * rate
          ).toString()} €`;
        }
        case "Saldo positivo das mais e menos-valias e restantes incrementos patrimoniais": {
          return `${roundValue(
            (indComProIncomeByHolder?.positiveBalanOfCapGainsAndLossesAndOtherEquityIncrements! ||
              0) * rate
          ).toString()} €`;
        }
        case "Rendimentos de Atividades Financeiras (Códigos CAE iniciados por 64, 65 ou 66)": {
          return `${roundValue(
            (indComProIncomeByHolder?.incomeFromFinancialActivitiesCAECodesStartWith6465or66! ||
              0) * rate
          ).toString()} €`;
        }
        case "Serviços prestados por sócios a sociedades de profissionais do Regime de Transparência Fiscal": {
          return `${roundValue(
            (indComProIncomeByHolder?.servicProvidedByMembToProSocOfTheFiscalTransparencRegime! ||
              0) * rate
          ).toString()} €`;
        }
        case "Resultado positivo de rendimentos prediais": {
          return `${roundValue(
            (indComProIncomeByHolder?.positiveResultOfPropertyIncome! || 0) *
              rate
          ).toString()} €`;
        }
        case "Rendimentos prediais imputáveis a atividade geradora de rendimentos da Categoria B": {
          return `${roundValue(
            (indComProIncomeByHolder?.propertyIncomeAttributableToCatBIncomeGeneratingActivity! ||
              0) * rate
          ).toString()} €`;
        }
        case "Subsídios à exploração": {
          return `${roundValue(
            (indComProIncomeByHolder?.operatingSubsidies! || 0) * rate
          ).toString()} €`;
        }
        case "Outros subsídios": {
          return `${roundValue(
            (indComProIncomeByHolder?.otherSubsidies! || 0) * rate
          ).toString()} €`;
        }
        case "Rendimentos da Categoria B não incluídos nos campos anteriores": {
          return `${roundValue(
            (indComProIncomeByHolder?.categoryBIncomeNotIncludedInPreviousFields! ||
              0) * rate
          ).toString()} €`;
        }
        case "Vendas de produtos com exceção das incluídas no campo 7": {
          return `${roundValue(
            (agriYieldsSilvLivstckByHolder?.salesProductsOtherThanThoseIncludField7! ||
              0) * rate
          ).toString()} €`;
        }
        case "Prestações de serviços": {
          return `${roundValue(
            (agriYieldsSilvLivstckByHolder?.servicesRendered! || 0) * rate
          ).toString()} €`;
        }
        case "Rendimentos de capitais e prediais imputáveis a atividades geradoras de rendimentos da Categoria B, rendimentos da propriedade intelectual, industrial ou prestação de informações, saldo positivo das mais e menos-valias e restantes incrementos patrimoniais": {
          return `${roundValue(
            (agriYieldsSilvLivstckByHolder?.incomeFromCapitalAndRealEstate! ||
              0) * rate
          ).toString()} €`;
        }
        case "Resultado positivo de rendimentos prediais ": {
          return `${roundValue(
            (agriYieldsSilvLivstckByHolder?.positiveResultOfPropertyIncome! ||
              0) * rate
          ).toString()} €`;
        }
        case "Subsídios à exploração relacionados com as vendas": {
          return `${roundValue(
            (agriYieldsSilvLivstckByHolder?.operatingSubsidiesRelatedToSales! ||
              0) * rate
          ).toString()} €`;
        }
        case "Outros subsídios ": {
          return `${roundValue(
            (agriYieldsSilvLivstckByHolder?.otherSubsidies! || 0) * rate
          ).toString()} €`;
        }
        case "Rendimentos decorrentes de vendas em explorações silvícolas plurianuais (art.º 59.º-D, n.º 1 do EBF)": {
          return `${roundValue(
            (agriYieldsSilvLivstckByHolder?.incomeFromSalesMultiannual! || 0) *
              rate
          ).toString()} €`;
        }
        case "Rendimentos da Categoria B não incluídos nos campos anteriores ": {
          return `${roundValue(
            (agriYieldsSilvLivstckByHolder?.categoryBIncome! || 0) * rate
          ).toString()} €`;
        }
        case "OUTROS RENDIMENTOS": {
          return `${roundValue(
            (otherIncomeByHolder?.otherIncome! || 0) * rate
          ).toString()} €`;
        }
        default:
          return "0 €";
      }
    } else {
      switch (key) {
        case "Venda de mercadorias e produtos": {
          return `${roundValue(
            (indComProIncomeClone?.saleOfGoodsAndProducts! || 0) * rate
          ).toString()} €`;
        }
        case "Prestações de serviços de atividades hoteleiras e similares, restauração e bebidas - anos 2015 e 2016": {
          return `${roundValue(
            (indComProIncomeClone?.provisionOfHotelAndSimilarServicesCateringAndBeverage! ||
              0) * rate
          ).toString()} €`;
        }
        case "Prestações de serviços de atividades de restauração e bebidas": {
          return `${roundValue(
            (indComProIncomeClone?.provisionOfCateringAndBeverageActivitiesServices! ||
              0) * rate
          ).toString()} €`;
        }
        case "Prestações de serviços de atividades hoteleiras e similares": {
          return `${roundValue(
            (indComProIncomeClone?.provisionOfHotelServicesAndSimilarActivities! ||
              0) * rate
          ).toString()} €`;
        }
        case "Prestações de serviços de atividades de exploração de estabelecimentos de alojamento local na modalidade de moradia ou apartamento": {
          return `${roundValue(
            (indComProIncomeClone?.provisionOfServRelatedToTheExploOfLocalAccEstablishments! ||
              0) * rate
          ).toString()} €`;
        }
        case "Rendimento das atividades profissionais especificamente previstas na Tabela do art.º 151.º do CIRS": {
          return `${roundValue(
            (indComProIncomeClone?.incomeFromProActivitiesSpecifArticle151OfTheCIRS! ||
              0) * rate
          ).toString()} €`;
        }
        case "Rendimentos de prestações de serviços não previstos nos campos anteriores": {
          return `${roundValue(
            (indComProIncomeClone?.incomeFromServicesRenderedNotForeseenInThePreviousFields! ||
              0) * rate
          ).toString()} €`;
        }
        case "Propriedade intelectual(não abrangida pelo art. 58.º do EBF), industrial ou de prestação de informações": {
          return `${roundValue(
            (indComProIncomeClone?.intellPropertyNotCoveByArtic58OfTheEBFIndOrInforProperty! ||
              0) * rate
          ).toString()} €`;
        }
        case "Propriedade intelectual(Rendimentos abrangidos pelo art. 58.º do EBF - parte não isenta)": {
          return `${roundValue(
            (indComProIncomeClone?.intellPropertyIncoCoveredByArtic58OfTheEBFNonExemptPart! ||
              0) * rate
          ).toString()} €`;
        }
        case "Saldo positivo das mais e menos-valias e restantes incrementos patrimoniais": {
          return `${roundValue(
            (indComProIncomeClone?.positiveBalanOfCapGainsAndLossesAndOtherEquityIncrements! ||
              0) * rate
          ).toString()} €`;
        }
        case "Rendimentos de Atividades Financeiras (Códigos CAE iniciados por 64, 65 ou 66)": {
          return `${roundValue(
            (indComProIncomeClone?.incomeFromFinancialActivitiesCAECodesStartWith6465or66! ||
              0) * rate
          ).toString()} €`;
        }
        case "Serviços prestados por sócios a sociedades de profissionais do Regime de Transparência Fiscal": {
          return `${roundValue(
            (indComProIncomeClone?.servicProvidedByMembToProSocOfTheFiscalTransparencRegime! ||
              0) * rate
          ).toString()} €`;
        }
        case "Resultado positivo de rendimentos prediais": {
          return `${roundValue(
            (indComProIncomeClone?.positiveResultOfPropertyIncome! || 0) * rate
          ).toString()} €`;
        }
        case "Rendimentos prediais imputáveis a atividade geradora de rendimentos da Categoria B": {
          return `${roundValue(
            (indComProIncomeClone?.propertyIncomeAttributableToCatBIncomeGeneratingActivity! ||
              0) * rate
          ).toString()} €`;
        }
        case "Subsídios à exploração": {
          return `${roundValue(
            (indComProIncomeClone?.operatingSubsidies! || 0) * rate
          ).toString()} €`;
        }
        case "Outros subsídios": {
          return `${roundValue(
            (indComProIncomeClone?.otherSubsidies! || 0) * rate
          ).toString()} €`;
        }
        case "Rendimentos da Categoria B não incluídos nos campos anteriores": {
          return `${roundValue(
            (indComProIncomeClone?.categoryBIncomeNotIncludedInPreviousFields! ||
              0) * rate
          ).toString()} €`;
        }
        case "Vendas de produtos com exceção das incluídas no campo 7": {
          return `${roundValue(
            (agriYieldsSilvLivstckClone?.salesProductsOtherThanThoseIncludField7! ||
              0) * rate
          ).toString()} €`;
        }
        case "Prestações de serviços": {
          return `${roundValue(
            (agriYieldsSilvLivstckClone?.servicesRendered! || 0) * rate
          ).toString()} €`;
        }
        case "Rendimentos de capitais e prediais imputáveis a atividades geradoras de rendimentos da Categoria B, rendimentos da propriedade intelectual, industrial ou prestação de informações, saldo positivo das mais e menos-valias e restantes incrementos patrimoniais": {
          return `${roundValue(
            (agriYieldsSilvLivstckClone?.incomeFromCapitalAndRealEstate! || 0) *
              rate
          ).toString()} €`;
        }
        case "Resultado positivo de rendimentos prediais ": {
          return `${roundValue(
            (agriYieldsSilvLivstckClone?.positiveResultOfPropertyIncome! || 0) *
              rate
          ).toString()} €`;
        }
        case "Subsídios à exploração relacionados com as vendas": {
          return `${roundValue(
            (agriYieldsSilvLivstckClone?.operatingSubsidiesRelatedToSales! ||
              0) * rate
          ).toString()} €`;
        }
        case "Outros subsídios ": {
          return `${roundValue(
            (agriYieldsSilvLivstckClone?.otherSubsidies! || 0) * rate
          ).toString()} €`;
        }
        case "Rendimentos decorrentes de vendas em explorações silvícolas plurianuais (art.º 59.º-D, n.º 1 do EBF)": {
          return `${roundValue(
            (agriYieldsSilvLivstckClone?.incomeFromSalesMultiannual! || 0) *
              rate
          ).toString()} €`;
        }
        case "Rendimentos da Categoria B não incluídos nos campos anteriores ": {
          return `${roundValue(
            (agriYieldsSilvLivstckClone?.categoryBIncome! || 0) * rate
          ).toString()} €`;
        }
        case "OUTROS RENDIMENTOS": {
          return `${roundValue(
            (otherIncomeClone?.otherIncome! || 0) * rate
          ).toString()} €`;
        }
        default:
          return "0 €";
      }
    }
  };

  const returnPlaceHolderValue = (field: string): string => {
    if (field === "saleOfGoodsAndProducts") {
      return indComProIncomeByHolder?.saleOfGoodsAndProducts?.toString()!;
    }
    if (field === "provisionOfHotelAndSimilarServicesCateringAndBeverage") {
      return indComProIncomeByHolder?.provisionOfHotelAndSimilarServicesCateringAndBeverage?.toString()!;
    }
    if (field === "provisionOfCateringAndBeverageActivitiesServices") {
      return indComProIncomeByHolder?.provisionOfCateringAndBeverageActivitiesServices?.toString()!;
    }
    if (field === "provisionOfHotelServicesAndSimilarActivities") {
      return indComProIncomeByHolder?.provisionOfHotelServicesAndSimilarActivities?.toString()!;
    }
    if (field === "provisionOfServRelatedToTheExploOfLocalAccEstablishments") {
      return indComProIncomeByHolder?.provisionOfServRelatedToTheExploOfLocalAccEstablishments?.toString()!;
    }
    if (field === "incomeFromProActivitiesSpecifArticle151OfTheCIRS") {
      return indComProIncomeByHolder?.incomeFromProActivitiesSpecifArticle151OfTheCIRS?.toString()!;
    }
    if (field === "incomeFromServicesRenderedNotForeseenInThePreviousFields") {
      return indComProIncomeByHolder?.incomeFromServicesRenderedNotForeseenInThePreviousFields?.toString()!;
    }
    if (field === "intellPropertyNotCoveByArtic58OfTheEBFIndOrInforProperty") {
      return indComProIncomeByHolder?.intellPropertyNotCoveByArtic58OfTheEBFIndOrInforProperty?.toString()!;
    }
    if (field === "intellPropertyIncoCoveredByArtic58OfTheEBFNonExemptPart") {
      return indComProIncomeByHolder?.intellPropertyIncoCoveredByArtic58OfTheEBFNonExemptPart?.toString()!;
    }
    if (field === "positiveBalanOfCapGainsAndLossesAndOtherEquityIncrements") {
      return indComProIncomeByHolder?.positiveBalanOfCapGainsAndLossesAndOtherEquityIncrements?.toString()!;
    }
    if (field === "incomeFromFinancialActivitiesCAECodesStartWith6465or66") {
      return indComProIncomeByHolder?.incomeFromFinancialActivitiesCAECodesStartWith6465or66?.toString()!;
    }
    if (field === "servicProvidedByMembToProSocOfTheFiscalTransparencRegime") {
      return indComProIncomeByHolder?.servicProvidedByMembToProSocOfTheFiscalTransparencRegime?.toString()!;
    }
    if (field === "positiveResultOfPropertyIncome") {
      return indComProIncomeByHolder?.positiveResultOfPropertyIncome?.toString()!;
    }
    if (field === "propertyIncomeAttributableToCatBIncomeGeneratingActivity") {
      return indComProIncomeByHolder?.propertyIncomeAttributableToCatBIncomeGeneratingActivity?.toString()!;
    }
    if (field === "operatingSubsidies") {
      return indComProIncomeByHolder?.operatingSubsidies?.toString()!;
    }
    if (field === "otherSubsidies") {
      return indComProIncomeByHolder?.otherSubsidies?.toString()!;
    }
    if (field === "categoryBIncomeNotIncludedInPreviousFields") {
      return indComProIncomeByHolder?.categoryBIncomeNotIncludedInPreviousFields?.toString()!;
    }
    if (field === "salesProductsOtherThanThoseIncludField7") {
      return agriYieldsSilvLivstckByHolder?.salesProductsOtherThanThoseIncludField7?.toString()!;
    }
    if (field === "servicesRendered") {
      return agriYieldsSilvLivstckByHolder?.servicesRendered?.toString()!;
    }
    if (field === "incomeFromCapitalAndRealEstate") {
      return agriYieldsSilvLivstckByHolder?.incomeFromCapitalAndRealEstate?.toString()!;
    }
    if (field === "agriYieldsSilvLivstckPositiveResultOfPropertyIncome") {
      return agriYieldsSilvLivstckByHolder?.positiveResultOfPropertyIncome?.toString()!;
    }
    if (field === "operatingSubsidiesRelatedToSales") {
      return agriYieldsSilvLivstckByHolder?.operatingSubsidiesRelatedToSales?.toString()!;
    }
    if (field === "agriYieldsSilvLivstckOtherSubsidies") {
      return agriYieldsSilvLivstckByHolder?.otherSubsidies?.toString()!;
    }
    if (field === "incomeFromSalesMultiannual") {
      return agriYieldsSilvLivstckByHolder?.incomeFromSalesMultiannual?.toString()!;
    }
    if (field === "categoryBIncome") {
      return agriYieldsSilvLivstckByHolder?.categoryBIncome?.toString()!;
    }
    if (field === "otherIncome") {
      return otherIncomeByHolder?.otherIncome?.toString()!;
    }

    return "";
  };

  const removeInvisibleLines = (object: valuesInterface) => {
    let NewIndComProIncome = indComProIncome;

    let NewAgriYieldsSilvLivstck = agriYieldsSilvLivstck;

    let NewOtherIncome = otherIncome;

    // RENDIMENTOS PROFISSIONAIS, COMERCIAIS E INDUSTRIAIS

    if (Taxes?.saleOfGoodsAndProductsVisibility! === false) {
      delete object["Venda de mercadorias e produtos"];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        saleOfGoodsAndProducts: 0,
      };
    }
    if (
      Taxes?.provisionOfHotelAndSimilarServicesCateringAndBeverageVisibility! ===
      false
    ) {
      delete object[
        "Prestações de serviços de atividades hoteleiras e similares, restauração e bebidas - anos 2015 e 2016"
      ];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        provisionOfHotelAndSimilarServicesCateringAndBeverage: 0,
      };
    }
    if (
      Taxes?.provisionOfCateringAndBeverageActivitiesServicesVisibility! ===
      false
    ) {
      delete object[
        "Prestações de serviços de atividades de restauração e bebidas"
      ];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        provisionOfCateringAndBeverageActivitiesServices: 0,
      };
    }
    if (
      Taxes?.provisionOfHotelServicesAndSimilarActivitiesVisibility! === false
    ) {
      delete object[
        "Prestações de serviços de atividades hoteleiras e similares"
      ];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        provisionOfHotelServicesAndSimilarActivities: 0,
      };
    }
    if (
      Taxes?.provisionOfServRelatedToTheExploOfLocalAccEstablishmentsVisibility! ===
      false
    ) {
      delete object[
        "Prestações de serviços de atividades de exploração de estabelecimentos de alojamento local na modalidade de moradia ou apartamento"
      ];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        provisionOfServRelatedToTheExploOfLocalAccEstablishments: 0,
      };
    }
    if (
      Taxes?.incomeFromProActivitiesSpecifArticle151OfTheCIRSVisibility! ===
      false
    ) {
      delete object[
        "Rendimento das atividades profissionais especificamente previstas na Tabela do art.º 151.º do CIRS"
      ];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        incomeFromProActivitiesSpecifArticle151OfTheCIRS: 0,
      };
    }
    if (
      Taxes?.incomeFromServicesRenderedNotForeseenInThePreviousFieldsVisibility! ===
      false
    ) {
      delete object[
        "Rendimentos de prestações de serviços não previstos nos campos anteriores"
      ];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        incomeFromServicesRenderedNotForeseenInThePreviousFields: 0,
      };
    }
    if (
      Taxes?.intellPropertyNotCoveByArtic58OfTheEBFIndOrInforPropertyVisibility! ===
      false
    ) {
      delete object[
        "Propriedade intelectual(não abrangida pelo art. 58.º do EBF), industrial ou de prestação de informações"
      ];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        intellPropertyNotCoveByArtic58OfTheEBFIndOrInforProperty: 0,
      };
    }
    if (
      Taxes?.intellPropertyIncoCoveredByArtic58OfTheEBFNonExemptPartVisibility! ===
      false
    ) {
      delete object[
        "Propriedade intelectual(Rendimentos abrangidos pelo art. 58.º do EBF - parte não isenta)"
      ];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        intellPropertyIncoCoveredByArtic58OfTheEBFNonExemptPart: 0,
      };
    }
    if (
      Taxes?.positiveBalanOfCapGainsAndLossesAndOtherEquityIncrementsVisibility! ===
      false
    ) {
      delete object[
        "Saldo positivo das mais e menos-valias e restantes incrementos patrimoniais"
      ];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        positiveBalanOfCapGainsAndLossesAndOtherEquityIncrements: 0,
      };
    }
    if (
      Taxes?.incomeFromFinancialActivitiesCAECodesStartWith6465or66Visibility! ===
      false
    ) {
      delete object[
        "Rendimentos de Atividades Financeiras (Códigos CAE iniciados por 64, 65 ou 66)"
      ];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        incomeFromFinancialActivitiesCAECodesStartWith6465or66: 0,
      };
    }
    if (
      Taxes?.servicProvidedByMembToProSocOfTheFiscalTransparencRegimeVisibility! ===
      false
    ) {
      delete object[
        "Serviços prestados por sócios a sociedades de profissionais do Regime de Transparência Fiscal"
      ];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        servicProvidedByMembToProSocOfTheFiscalTransparencRegime: 0,
      };
    }
    if (Taxes?.positiveResultOfPropertyIncomeVisibility! === false) {
      delete object["Resultado positivo de rendimentos prediais"];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        positiveResultOfPropertyIncome: 0,
      };
    }
    if (
      Taxes?.propertyIncomeAttributableToCatBIncomeGeneratingActivityVisibility! ===
      false
    ) {
      delete object[
        "Rendimentos prediais imputáveis a atividade geradora de rendimentos da Categoria B"
      ];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        propertyIncomeAttributableToCatBIncomeGeneratingActivity: 0,
      };
    }
    if (Taxes?.operatingSubsidiesVisibility! === false) {
      delete object["Subsídios à exploração"];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        operatingSubsidies: 0,
      };
    }
    if (Taxes?.otherSubsidiesVisibility! === false) {
      delete object["Outros subsídios"];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        otherSubsidies: 0,
      };
    }
    if (
      Taxes?.categoryBIncomeNotIncludedInPreviousFieldsVisibility! === false
    ) {
      delete object[
        "Rendimentos da Categoria B não incluídos nos campos anteriores"
      ];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        categoryBIncomeNotIncludedInPreviousFields: 0,
      };
    }

    // RENDIMENTOS AGRÍCOLAS, SILVÍCOLAS E PECUÁRIOS
    if (Taxes?.salesProductsOtherThanThoseIncludField7Visibility! === false) {
      delete object["Vendas de produtos com exceção das incluídas no campo 7"];
      NewAgriYieldsSilvLivstck = {
        ...NewAgriYieldsSilvLivstck!,
        salesProductsOtherThanThoseIncludField7: 0,
      };
    }
    if (Taxes?.servicesRenderedVisibility! === false) {
      delete object["Prestações de serviços"];
      NewAgriYieldsSilvLivstck = {
        ...NewAgriYieldsSilvLivstck!,
        servicesRendered: 0,
      };
    }
    if (Taxes?.incomeFromCapitalAndRealEstateVisibility! === false) {
      delete object[
        "Rendimentos de capitais e prediais imputáveis a atividades geradoras de rendimentos da Categoria B, rendimentos da propriedade intelectual, industrial ou prestação de informações, saldo positivo das mais e menos-valias e restantes incrementos patrimoniais"
      ];
      NewAgriYieldsSilvLivstck = {
        ...NewAgriYieldsSilvLivstck!,
        incomeFromCapitalAndRealEstate: 0,
      };
    }
    if (Taxes?.positiveResultOfPropertyIncomeAgriVisibility! === false) {
      delete object["Resultado positivo de rendimentos prediais "];
      NewAgriYieldsSilvLivstck = {
        ...NewAgriYieldsSilvLivstck!,
        positiveResultOfPropertyIncome: 0,
      };
    }
    if (Taxes?.operatingSubsidiesRelatedToSalesVisibility! === false) {
      delete object["Subsídios à exploração relacionados com as vendas"];
      NewAgriYieldsSilvLivstck = {
        ...NewAgriYieldsSilvLivstck!,
        operatingSubsidiesRelatedToSales: 0,
      };
    }
    if (Taxes?.otherSubsidiesAgriVisibility! === false) {
      delete object["Outros subsídios "];
      NewAgriYieldsSilvLivstck = {
        ...NewAgriYieldsSilvLivstck!,
        otherSubsidies: 0,
      };
    }
    if (Taxes?.incomeFromSalesMultiannualVisibility! === false) {
      delete object[
        "Rendimentos decorrentes de vendas em explorações silvícolas plurianuais (art.º 59.º-D, n.º 1 do EBF)"
      ];
      NewAgriYieldsSilvLivstck = {
        ...NewAgriYieldsSilvLivstck!,
        incomeFromSalesMultiannual: 0,
      };
    }
    if (Taxes?.categoryBIncomeVisibility! === false) {
      delete object[
        "Rendimentos da Categoria B não incluídos nos campos anteriores "
      ];
      NewAgriYieldsSilvLivstck = {
        ...NewAgriYieldsSilvLivstck!,
        categoryBIncome: 0,
      };
    }

    // OUTROS RENDIMENTOS
    if (Taxes?.otherIncomeVisibility! === false) {
      delete object["OUTROS RENDIMENTOS"];
      NewOtherIncome = {
        ...NewOtherIncome,
        otherIncome: 0,
      };
    }

    setIndComProIncomeClone(NewIndComProIncome ?? indComProIncomeClone);
    setAgriYieldsSilvLivstckClone(
      NewAgriYieldsSilvLivstck ?? agriYieldsSilvLivstckClone
    );
    setOtherIncomeClone(NewOtherIncome ?? otherIncomeClone);

    return object;
  };

  const InitialsValues = () => {
    const InitialRendimentosProfissionaisComerciaisIndustriais = {
      "Venda de mercadorias e produtos": {
        rate: Taxes?.saleOfGoodsAndProducts!,
        name: "saleOfGoodsAndProducts",
      },
      "Prestações de serviços de atividades hoteleiras e similares, restauração e bebidas - anos 2015 e 2016":
        {
          rate: Taxes?.provisionOfHotelAndSimilarServicesCateringAndBeverage!,
          name: "provisionOfHotelAndSimilarServicesCateringAndBeverage",
        },
      "Prestações de serviços de atividades de restauração e bebidas": {
        rate: Taxes?.provisionOfCateringAndBeverageActivitiesServices!,
        name: "provisionOfCateringAndBeverageActivitiesServices",
      },
      "Prestações de serviços de atividades hoteleiras e similares": {
        rate: Taxes?.provisionOfHotelServicesAndSimilarActivities!,
        name: "provisionOfHotelServicesAndSimilarActivities",
      },
      "Prestações de serviços de atividades de exploração de estabelecimentos de alojamento local na modalidade de moradia ou apartamento":
        {
          rate: Taxes?.provisionOfServRelatedToTheExploOfLocalAccEstablishments!,
          name: "provisionOfServRelatedToTheExploOfLocalAccEstablishments",
        },
      "Rendimento das atividades profissionais especificamente previstas na Tabela do art.º 151.º do CIRS":
        {
          rate: Taxes?.incomeFromProActivitiesSpecifArticle151OfTheCIRS!,
          name: "incomeFromProActivitiesSpecifArticle151OfTheCIRS",
        },
      "Rendimentos de prestações de serviços não previstos nos campos anteriores":
        {
          rate: Taxes?.incomeFromServicesRenderedNotForeseenInThePreviousFields!,
          name: "incomeFromServicesRenderedNotForeseenInThePreviousFields",
        },
      "Propriedade intelectual(não abrangida pelo art. 58.º do EBF), industrial ou de prestação de informações":
        {
          rate: Taxes?.intellPropertyNotCoveByArtic58OfTheEBFIndOrInforProperty!,
          name: "intellPropertyNotCoveByArtic58OfTheEBFIndOrInforProperty",
        },
      "Propriedade intelectual(Rendimentos abrangidos pelo art. 58.º do EBF - parte não isenta)":
        {
          rate: Taxes?.intellPropertyIncoCoveredByArtic58OfTheEBFNonExemptPart!,
          name: "intellPropertyIncoCoveredByArtic58OfTheEBFNonExemptPart",
        },
      "Saldo positivo das mais e menos-valias e restantes incrementos patrimoniais":
        {
          rate: Taxes?.positiveBalanOfCapGainsAndLossesAndOtherEquityIncrements!,
          name: "positiveBalanOfCapGainsAndLossesAndOtherEquityIncrements",
        },
      "Rendimentos de Atividades Financeiras (Códigos CAE iniciados por 64, 65 ou 66)":
        {
          rate: Taxes?.incomeFromFinancialActivitiesCAECodesStartWith6465or66!,
          name: "incomeFromFinancialActivitiesCAECodesStartWith6465or66",
        },
      "Serviços prestados por sócios a sociedades de profissionais do Regime de Transparência Fiscal":
        {
          rate: Taxes?.servicProvidedByMembToProSocOfTheFiscalTransparencRegime!,
          name: "servicProvidedByMembToProSocOfTheFiscalTransparencRegime",
        },
      "Resultado positivo de rendimentos prediais": {
        rate: Taxes?.positiveResultOfPropertyIncome!,
        name: "positiveResultOfPropertyIncome",
      },
      "Rendimentos prediais imputáveis a atividade geradora de rendimentos da Categoria B":
        {
          rate: Taxes?.propertyIncomeAttributableToCatBIncomeGeneratingActivity!,
          name: "propertyIncomeAttributableToCatBIncomeGeneratingActivity",
        },
      "Subsídios à exploração": {
        rate: Taxes?.operatingSubsidies!,
        name: "operatingSubsidies",
      },
      "Outros subsídios": {
        rate: Taxes?.otherSubsidies!,
        name: "otherSubsidies",
      },
      "Rendimentos da Categoria B não incluídos nos campos anteriores": {
        rate: Taxes?.categoryBIncomeNotIncludedInPreviousFields!,
        name: "categoryBIncomeNotIncludedInPreviousFields",
      },
    };

    setRendimentosProfissionaisComerciaisIndustriais(
      removeInvisibleLines(InitialRendimentosProfissionaisComerciaisIndustriais)
    );

    const InitialRendimentosAgricolasSilvicolasPecuarios = {
      "Vendas de produtos com exceção das incluídas no campo 7": {
        rate: Taxes?.salesProductsOtherThanThoseIncludField7!,
        name: "salesProductsOtherThanThoseIncludField7",
      },
      "Prestações de serviços": {
        rate: Taxes?.servicesRendered!,
        name: "servicesRendered",
      },
      "Rendimentos de capitais e prediais imputáveis a atividades geradoras de rendimentos da Categoria B, rendimentos da propriedade intelectual, industrial ou prestação de informações, saldo positivo das mais e menos-valias e restantes incrementos patrimoniais":
        {
          rate: Taxes?.incomeFromCapitalAndRealEstate!,
          name: "incomeFromCapitalAndRealEstate",
        },
      "Resultado positivo de rendimentos prediais ": {
        rate: Taxes?.positiveResultOfPropertyIncomeAgri!,
        name: "agriYieldsSilvLivstckPositiveResultOfPropertyIncome",
      },
      "Subsídios à exploração relacionados com as vendas": {
        rate: Taxes?.operatingSubsidiesRelatedToSales!,
        name: "operatingSubsidiesRelatedToSales",
      },
      "Outros subsídios ": {
        rate: Taxes?.otherSubsidiesAgri!,
        name: "agriYieldsSilvLivstckOtherSubsidies",
      },
      "Rendimentos decorrentes de vendas em explorações silvícolas plurianuais (art.º 59.º-D, n.º 1 do EBF)":
        {
          rate: Taxes?.incomeFromSalesMultiannual!,
          name: "incomeFromSalesMultiannual",
        },
      "Rendimentos da Categoria B não incluídos nos campos anteriores ": {
        rate: Taxes?.categoryBIncome!,
        name: "categoryBIncome",
      },
    };

    setRendimentosAgricolasSilvicolasPecuarios(
      removeInvisibleLines(InitialRendimentosAgricolasSilvicolasPecuarios)
    );

    const InitialOutrosRendimentos = {
      "OUTROS RENDIMENTOS": {
        rate: Taxes?.otherIncome!,
        name: "otherIncome",
      },
    };

    setOutrosRendimentos(removeInvisibleLines(InitialOutrosRendimentos));
  };

  useEffect(() => {
    const value = calculateNetIncomeIndependentWithoutOrganizedAccountingTotal({
      ...valueTotal,
    });
    setTotalGrossIncomeField(value);
  }, [valueTotal]);

  useEffect(() => {
    setValueTotal(initialValuesTotal());

    InitialsValues();
  }, [currentHolder]);

  useEffect(() => {
    setIndComProIncomeClone(indComProIncome!);
    setAgriYieldsSilvLivstckClone(agriYieldsSilvLivstck!);
    setOtherIncomeClone(otherIncome!);
  }, [indComProIncome, agriYieldsSilvLivstck, otherIncome]);

  useEffect(() => {
    if (
      indComProIncomeClone === indComProIncome &&
      agriYieldsSilvLivstckClone === agriYieldsSilvLivstck &&
      otherIncomeClone === otherIncome
    ) {
      setValueTotal(initialValuesTotal());
      InitialsValues();
    }
  }, [indComProIncomeClone, agriYieldsSilvLivstckClone, otherIncomeClone]);

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
      <Accordion title={title}>
        <div className="row-title-wrapper">
          <Text
            text={<b>{t("grossIncome")} (1)</b>}
            margin="auto auto 16px 0px"
          />

          <div style={{ width: "130px" }}>
            <Text
              text={<b>{t("correctionFactor")} (2)</b>}
              textAlign="center"
              margin="20px 0px"
            />
          </div>
          <div style={{ width: "130px" }}>
            <Text
              text={<b>{t("finalGrossIncome")} (1x2)</b>}
              textAlign="center"
              margin="20px 0px"
            />
          </div>
        </div>

        {Object.keys(rendimentosProfissionaisComerciaisIndustriais).length !==
        0 ? (
          <Text
            className="uppercase"
            text={<b>{t("professionalsIncome")}</b>}
            margin="20px 0px"
          />
        ) : null}
        {Object.entries(rendimentosProfissionaisComerciaisIndustriais).map(
          ([key, value], index) => (
            <div className="row-wrapper" key={key}>
              <TextField
                label={`${index + 1}-${key}`}
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
                    placeholder={`${value.rate * 100}%`}
                    isDisabled
                    textAlign="center"
                    width="75px"
                  />
                </div>
                <div style={{ marginLeft: "5px" }}>
                  <TextField
                    placeholder={formatToEuroCurrency(
                      parseFloat(calculateFinalGrossIncome(key, value.rate))
                    )}
                    isDisabled
                    textAlign="center"
                  />
                </div>
              </div>
            </div>
          )
        )}

        {Object.keys(rendimentosAgricolasSilvicolasPecuarios).length !== 0 ? (
          <Text
            className="uppercase"
            text={<b>{t("agriculturalIncome")}</b>}
            margin="2px 0px 20px 0px"
          />
        ) : null}
        {Object.entries(rendimentosAgricolasSilvicolasPecuarios).map(
          ([key, value], index) => (
            <div className="row-wrapper" key={key}>
              <TextField
                label={`${index + 1}-${key}`}
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
                    placeholder={`${value.rate * 100}%`}
                    isDisabled
                    textAlign="center"
                    width="75px"
                  />
                </div>
                <div style={{ marginLeft: "5px" }}>
                  <TextField
                    placeholder={formatToEuroCurrency(
                      parseFloat(calculateFinalGrossIncome(key, value.rate))
                    )}
                    isDisabled
                    textAlign="center"
                  />
                </div>
              </div>
            </div>
          )
        )}

        {Object.keys(outrosRendimentos).length !== 0 ? (
          <Text
            className="uppercase"
            text={<b>{t("otherIncome")}</b>}
            margin="2px 0px 20px 0px"
          />
        ) : null}
        {Object.entries(outrosRendimentos).map(([key, value]) => (
          <div className="row-wrapper" key={key}>
            <TextField
              label={key}
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
                  placeholder={`${value.rate * 100}%`}
                  isDisabled
                  textAlign="center"
                  width="75px"
                />
              </div>
              <div style={{ marginLeft: "5px" }}>
                <TextField
                  placeholder={formatToEuroCurrency(
                    parseFloat(calculateFinalGrossIncome(key, value.rate))
                  )}
                  isDisabled
                  textAlign="center"
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
        <Grid item xs={12} md={6} style={{ marginTop: "5px" }}>
          {!readOnly && (
            <NBButton nbtype="Secondary" onClick={handleClean} fullWidth>
              {t("clean")}
            </NBButton>
          )}
        </Grid>
        <Grid item xs={12} md={6} style={{ marginTop: "5px" }}>
          {!readOnly && (
            <div className="row-spacing-div">
              <NBButton
                nbtype="Secondary"
                onClick={() =>
                  applyTotalValue(
                    totalGrossIncomeField,
                    indComProIncomeClone,
                    agriYieldsSilvLivstckClone,
                    otherIncomeClone
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

export default TipoRendimentoDeclaradoModelo3;
