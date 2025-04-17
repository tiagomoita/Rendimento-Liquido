/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import { useEffect, useState } from "react";
import { NBButton } from "@nb-omc-xit-frontend/nb-shared/lib/NBButton";
import { calculateNetIncomeIndependentWithoutOrganizedAccountingTotal } from "npm-pkg-simul-simrl";
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
import {
  AgriYieldsSilvLivstck,
  IndComProIncome,
} from "../../../../store/modules/entities/holder/types";
import "./Common.scss";
import {
  holderDataInitialStateAgriYieldsSilvLivstck,
  holderDataInitialStateIndComProIncome,
} from "../../../../store/modules/entities/holder/slices";

type TipoRendimentoDeclaradoModelo3Props = {
  title: string;
  indComProIncome?: IndComProIncome;
  agriYieldsSilvLivstck?: AgriYieldsSilvLivstck;
  indComProIncomeByHolder?: IndComProIncome;
  agriYieldsSilvLivstckByHolder?: AgriYieldsSilvLivstck;
  totalGrossIncomeByHolder?: number;
  readOnly?: boolean;
  applyTotalValue?: any;
  handleCleanModel?: any;
  saveValues?: any;
};

type valuesInterface = {
  [key: string]: { rate: number; name: string; code: string; label: string };
};

const TipoRendimentoDeclaradoModelo3 = (
  props: TipoRendimentoDeclaradoModelo3Props
) => {
  const {
    title,
    indComProIncome,
    agriYieldsSilvLivstck,
    indComProIncomeByHolder,
    agriYieldsSilvLivstckByHolder,
    totalGrossIncomeByHolder,
    readOnly,
    applyTotalValue,
    handleCleanModel,
    saveValues,
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

  const [totalGrossIncomeField, setTotalGrossIncomeField] = useState(0);

  const [
    rendimentosAgricolasSilvicolasPecuarios,
    setRendimentosAgricolasSilvicolasPecuarios,
  ] = useState<valuesInterface>({});

  const returnDefaultValue = (field: string): number => {
    if (field === "saleOfMerchAndProducts") {
      return indComProIncomeClone?.saleOfMerchAndProducts ?? 0;
    }
    if (field === "provisionHotelServ2015And2016") {
      return indComProIncomeClone?.provisionHotelServ2015And2016 ?? 0;
    }
    if (field === "provisionCateringAndBeverageServ") {
      return indComProIncomeClone?.provisionCateringAndBeverageServ ?? 0;
    }
    if (field === "provisionHotelAndSimilarServ") {
      return indComProIncomeClone?.provisionHotelAndSimilarServ ?? 0;
    }
    if (field === "provisionLocalAccommodationServ") {
      return indComProIncomeClone?.provisionLocalAccommodationServ ?? 0;
    }
    if (field === "incomeProfActivitiesArt151CIRS") {
      return indComProIncomeClone?.incomeProfActivitiesArt151CIRS ?? 0;
    }
    if (field === "incomeFromUnforcastedServProv") {
      return indComProIncomeClone?.incomeFromUnforcastedServProv ?? 0;
    }
    if (field === "intellectualPropertyNotArt58EBF") {
      return indComProIncomeClone?.intellectualPropertyNotArt58EBF ?? 0;
    }
    if (field === "intellectualPropertyIncomeArt58EBFNonExempt") {
      return (
        indComProIncomeClone?.intellectualPropertyIncomeArt58EBFNonExempt ?? 0
      );
    }
    if (field === "positiveBalanceGainsLossesEquityInc") {
      return indComProIncomeClone?.positiveBalanceGainsLossesEquityInc ?? 0;
    }
    if (field === "incomeFromFinancialActivitiesCAE") {
      return indComProIncomeClone?.incomeFromFinancialActivitiesCAE ?? 0;
    }
    if (field === "servicesProvidedByPartnersProfCo") {
      return indComProIncomeClone?.servicesProvidedByPartnersProfCo ?? 0;
    }
    if (field === "positiveResultPropertyIncome") {
      return indComProIncomeClone?.positiveResultPropertyIncome ?? 0;
    }
    if (field === "buildingIncomeAttribCatBActivity") {
      return indComProIncomeClone?.buildingIncomeAttribCatBActivity ?? 0;
    }
    if (field === "explorationSubsidies") {
      return indComProIncomeClone?.explorationSubsidies ?? 0;
    }
    if (field === "otherSubsidies") {
      return indComProIncomeClone?.otherSubsidies ?? 0;
    }
    if (field === "catBIncomeNotInPrevFields") {
      return indComProIncomeClone?.catBIncomeNotInPrevFields ?? 0;
    }
    if (field === "servicesProvidedByPartnersToCompanies") {
      return indComProIncomeClone?.servicesProvidedByPartnersToCompanies ?? 0;
    }

    if (field === "salesOfOtherProducts") {
      return agriYieldsSilvLivstckClone?.salesOfOtherProducts ?? 0;
    }
    if (field === "serviceProvision") {
      return agriYieldsSilvLivstckClone?.serviceProvision ?? 0;
    }
    if (field === "incomeFromCapPropAttribCatB") {
      return agriYieldsSilvLivstckClone?.incomeFromCapPropAttribCatB ?? 0;
    }
    if (field === "agriSilvPositiveResultPropertyIncome") {
      return agriYieldsSilvLivstckClone?.positiveResultPropertyIncome ?? 0;
    }
    if (field === "operatingSubsidiesRelatedSales") {
      return agriYieldsSilvLivstckClone?.operatingSubsidiesRelatedSales ?? 0;
    }
    if (field === "agriYieldsSilvLivstckOtherSubsidies") {
      return agriYieldsSilvLivstckClone?.otherSubsidies ?? 0;
    }
    if (field === "incomeFromSalesMultiAnnualForestry") {
      return (
        agriYieldsSilvLivstckClone?.incomeFromSalesMultiAnnualForestry ?? 0
      );
    }
    if (field === "agriSilvCatBIncomeNotInPrevFields") {
      return agriYieldsSilvLivstckClone?.catBIncomeNotInPrevFields ?? 0;
    }
    if (field === "agriSilvServicesProvidedByPartnersToCompanies") {
      return (
        agriYieldsSilvLivstckClone?.servicesProvidedByPartnersToCompanies ?? 0
      );
    }

    return 0;
  };

  const initialValuesTotal = () => {
    return {
      saleOfGoodsAndProductsTotal: roundValue(
        returnDefaultValue("saleOfMerchAndProducts") *
          (Taxes?.anexxBParams.profCommIndIncomes.saleOfMerchAndProducts
            .parameterValue! || 0)
      ),
      provisionOfHotelAndSimilarServicesCateringAndBeverageTotal: roundValue(
        returnDefaultValue("provisionHotelServ2015And2016") *
          (Taxes?.anexxBParams.profCommIndIncomes.provisionHotelServ2015And2016
            .parameterValue! || 0)
      ),
      provisionOfCateringAndBeverageActivitiesServicesTotal: roundValue(
        returnDefaultValue("provisionCateringAndBeverageServ") *
          (Taxes?.anexxBParams.profCommIndIncomes
            .provisionCateringAndBeverageServ.parameterValue! || 0)
      ),
      provisionOfHotelServicesAndSimilarActivitiesTotal: roundValue(
        returnDefaultValue("provisionHotelAndSimilarServ") *
          (Taxes?.anexxBParams.profCommIndIncomes.provisionHotelAndSimilarServ
            .parameterValue! || 0)
      ),
      provisionOfServRelatedToTheExploOfLocalAccEstablishmentsTotal: roundValue(
        returnDefaultValue("provisionLocalAccommodationServ") *
          (Taxes?.anexxBParams.profCommIndIncomes
            .provisionLocalAccommodationServ.parameterValue! || 0)
      ),
      incomeFromProActivitiesSpecifArticle151OfTheCIRSTotal: roundValue(
        returnDefaultValue("incomeProfActivitiesArt151CIRS") *
          (Taxes?.anexxBParams.profCommIndIncomes.incomeProfActivitiesArt151CIRS
            .parameterValue! || 0)
      ),
      incomeFromServicesRenderedNotForeseenInThePreviousFieldsTotal: roundValue(
        returnDefaultValue("incomeFromUnforcastedServProv") *
          (Taxes?.anexxBParams.profCommIndIncomes.incomeFromUnforcastedServProv
            .parameterValue! || 0)
      ),
      intellPropertyNotCoveByArtic58OfTheEBFIndOrInforPropertyTotal: roundValue(
        returnDefaultValue("intellectualPropertyNotArt58EBF") *
          (Taxes?.anexxBParams.profCommIndIncomes
            .intellectualPropertyNotArt58EBF.parameterValue! || 0)
      ),
      intellPropertyIncoCoveredByArtic58OfTheEBFNonExemptPartTotal: roundValue(
        returnDefaultValue("intellectualPropertyIncomeArt58EBFNonExempt") *
          (Taxes?.anexxBParams.profCommIndIncomes
            .intellectualPropertyIncomeArt58EBFNonExempt.parameterValue! || 0)
      ),
      positiveBalanOfCapGainsAndLossesAndOtherEquityIncrementsTotal: roundValue(
        returnDefaultValue("positiveBalanceGainsLossesEquityInc") *
          (Taxes?.anexxBParams.profCommIndIncomes
            .positiveBalanceGainsLossesEquityInc.parameterValue! || 0)
      ),
      incomeFromFinancialActivitiesCAECodesStartWith6465or66Total: roundValue(
        returnDefaultValue("incomeFromFinancialActivitiesCAE") *
          (Taxes?.anexxBParams.profCommIndIncomes
            .incomeFromFinancialActivitiesCAE.parameterValue! || 0)
      ),
      servicProvidedByMembToProSocOfTheFiscalTransparencRegimeTotal: roundValue(
        returnDefaultValue("servicesProvidedByPartnersProfCo") *
          (Taxes?.anexxBParams.profCommIndIncomes
            .servicesProvidedByPartnersProfCo.parameterValue! || 0)
      ),
      positiveResultOfPropertyIncomeTotal: roundValue(
        returnDefaultValue("positiveResultPropertyIncome") *
          (Taxes?.anexxBParams.profCommIndIncomes.positiveResultPropertyIncome
            .parameterValue! || 0)
      ),
      propertyIncomeAttributableToCatBIncomeGeneratingActivityTotal: roundValue(
        returnDefaultValue("buildingIncomeAttribCatBActivity") *
          (Taxes?.anexxBParams.profCommIndIncomes
            .buildingIncomeAttribCatBActivity.parameterValue! || 0)
      ),
      operatingSubsidiesTotal: roundValue(
        returnDefaultValue("explorationSubsidies") *
          (Taxes?.anexxBParams.profCommIndIncomes.explorationSubsidies
            .parameterValue! || 0)
      ),
      otherSubsidiesTotal: roundValue(
        returnDefaultValue("otherSubsidies") *
          (Taxes?.anexxBParams.profCommIndIncomes.otherSubsidies
            .parameterValue! || 0)
      ),
      categoryBIncomeNotIncludedInPreviousFieldsTotal: roundValue(
        returnDefaultValue("catBIncomeNotInPrevFields") *
          (Taxes?.anexxBParams.profCommIndIncomes.catBIncomeNotInPrevFields
            .parameterValue! || 0)
      ),
      servicesProvidedByMemberssProComIndIncTotal: roundValue(
        returnDefaultValue("servicesProvidedByPartnersToCompanies") *
          (Taxes?.anexxBParams.profCommIndIncomes
            .servicesProvidedByPartnersToCompanies.parameterValue! || 0)
      ),
      salesProductsOtherThanThoseIncludField7Total: roundValue(
        returnDefaultValue("salesOfOtherProducts") *
          (Taxes?.anexxBParams.agriSilvPecuIncomes.salesOfOtherProducts
            .parameterValue! || 0)
      ),
      servicesRenderedTotal: roundValue(
        returnDefaultValue("serviceProvision") *
          (Taxes?.anexxBParams.agriSilvPecuIncomes.serviceProvision
            .parameterValue! || 0)
      ),
      incomeFromCapitalAndRealEstateTotal: roundValue(
        returnDefaultValue("incomeFromCapPropAttribCatB") *
          (Taxes?.anexxBParams.agriSilvPecuIncomes.incomeFromCapPropAttribCatB
            .parameterValue! || 0)
      ),
      agriYieldsSilvLivstckPositiveResultOfPropertyIncomeTotal: roundValue(
        returnDefaultValue("agriSilvPositiveResultPropertyIncome") *
          (Taxes?.anexxBParams.agriSilvPecuIncomes.positiveResultPropertyIncome
            .parameterValue! || 0)
      ),
      operatingSubsidiesRelatedToSalesTotal: roundValue(
        returnDefaultValue("operatingSubsidiesRelatedSales") *
          (Taxes?.anexxBParams.agriSilvPecuIncomes
            .operatingSubsidiesRelatedSales.parameterValue! || 0)
      ),
      agriYieldsSilvLivstckOtherSubsidiesTotal: roundValue(
        returnDefaultValue("agriYieldsSilvLivstckOtherSubsidies") *
          (Taxes?.anexxBParams.agriSilvPecuIncomes.otherSubsidies
            .parameterValue! || 0)
      ),
      incomeFromSalesMultiannualTotal: roundValue(
        returnDefaultValue("incomeFromSalesMultiAnnualForestry") *
          (Taxes?.anexxBParams.agriSilvPecuIncomes
            .incomeFromSalesMultiAnnualForestry.parameterValue! || 0)
      ),
      categoryBIncomeTotal: roundValue(
        returnDefaultValue("agriSilvCatBIncomeNotInPrevFields") *
          (Taxes?.anexxBParams.agriSilvPecuIncomes.catBIncomeNotInPrevFields
            .parameterValue! || 0)
      ),
      servicesProvidedByMemberssAgriSilvPecuTotal: roundValue(
        returnDefaultValue("agriSilvServicesProvidedByPartnersToCompanies") *
          (Taxes?.anexxBParams.agriSilvPecuIncomes
            .servicesProvidedByPartnersToCompanies.parameterValue! || 0)
      ),
    };
  };

  const [valueTotal, setValueTotal] = useState<any>(initialValuesTotal());

  const handleClean = () => {
    setIndComProIncomeClone(holderDataInitialStateIndComProIncome);
    setAgriYieldsSilvLivstckClone(holderDataInitialStateAgriYieldsSilvLivstck);
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
      servicesProvidedByMemberssProComIndIncTotal: 0,
      salesProductsOtherThanThoseIncludField7Total: 0,
      servicesRenderedTotal: 0,
      incomeFromCapitalAndRealEstateTotal: 0,
      agriYieldsSilvLivstckPositiveResultOfPropertyIncomeTotal: 0,
      operatingSubsidiesRelatedToSalesTotal: 0,
      agriYieldsSilvLivstckOtherSubsidiesTotal: 0,
      incomeFromSalesMultiannualTotal: 0,
      categoryBIncomeTotal: 0,
      servicesProvidedByMemberssAgriSilvPecuTotal: 0,
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
  };

  const handleChange = (key: string, val: number, rate?: number) => {
    switch (key) {
      case "Venda de mercadorias e produtos": {
        handleFieldChange("indComProIncome", val, "saleOfMerchAndProducts");
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
          "provisionHotelServ2015And2016"
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
          "provisionCateringAndBeverageServ"
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
          "provisionHotelAndSimilarServ"
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
          "provisionLocalAccommodationServ"
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
          "incomeProfActivitiesArt151CIRS"
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
          "incomeFromUnforcastedServProv"
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
          "intellectualPropertyNotArt58EBF"
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
          "intellectualPropertyIncomeArt58EBFNonExempt"
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
          "positiveBalanceGainsLossesEquityInc"
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
          "incomeFromFinancialActivitiesCAE"
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
          "servicesProvidedByPartnersProfCo"
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
          "positiveResultPropertyIncome"
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
          "buildingIncomeAttribCatBActivity"
        );
        setValueTotal({
          ...valueTotal,
          propertyIncomeAttributableToCatBIncomeGeneratingActivityTotal:
            roundValue(val * rate!),
        });
        break;
      }
      case "Subsídios à exploração": {
        handleFieldChange("indComProIncome", val, "explorationSubsidies");
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
        handleFieldChange("indComProIncome", val, "catBIncomeNotInPrevFields");
        setValueTotal({
          ...valueTotal,
          categoryBIncomeNotIncludedInPreviousFieldsTotal: roundValue(
            val * rate!
          ),
        });
        break;
      }
      case "Serviços prestados por sócios a sociedades onde detenham partes de capital ou direitos de voto, nas condições previstas nos n.ºs 1 e 2 da subalínea ii) da alínea g) do n.º 1 do art.º 31.º do CIRS": {
        handleFieldChange(
          "indComProIncome",
          val,
          "servicesProvidedByPartnersToCompanies"
        );
        setValueTotal({
          ...valueTotal,
          servicesProvidedByMemberssProComIndIncTotal: roundValue(val * rate!),
        });
        break;
      }
      case "Vendas de produtos com exceção das incluídas no campo 457": {
        handleFieldChange("agriYieldsSilvLivstck", val, "salesOfOtherProducts");
        setValueTotal({
          ...valueTotal,
          salesProductsOtherThanThoseIncludField7Total: roundValue(val * rate!),
        });
        break;
      }
      case "Prestações de serviços": {
        handleFieldChange("agriYieldsSilvLivstck", val, "serviceProvision");
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
          "incomeFromCapPropAttribCatB"
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
          "positiveResultPropertyIncome"
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
          "operatingSubsidiesRelatedSales"
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
          "incomeFromSalesMultiAnnualForestry"
        );
        setValueTotal({
          ...valueTotal,
          incomeFromSalesMultiannualTotal: roundValue(val * rate!),
        });
        break;
      }
      case "Rendimentos da Categoria B não incluídos nos campos anteriores ": {
        handleFieldChange(
          "agriYieldsSilvLivstck",
          val,
          "catBIncomeNotInPrevFields"
        );
        setValueTotal({
          ...valueTotal,
          categoryBIncomeTotal: roundValue(val * rate!),
        });
        break;
      }
      case "Serviços prestados por sócios a sociedades onde detenham partes de capital ou direitos de voto, nas condições previstas nos n.ºs 1 e 2 da subalínea ii) da alínea g) do n.º 1 do art.º 31.º do CIRS ": {
        handleFieldChange(
          "agriYieldsSilvLivstck",
          val,
          "servicesProvidedByPartnersToCompanies"
        );
        setValueTotal({
          ...valueTotal,
          servicesProvidedByMemberssAgriSilvPecuTotal: roundValue(val * rate!),
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
            (indComProIncomeByHolder?.saleOfMerchAndProducts! || 0) * rate
          ).toString()} €`;
        }
        case "Prestações de serviços de atividades hoteleiras e similares, restauração e bebidas - anos 2015 e 2016": {
          return `${roundValue(
            (indComProIncomeByHolder?.provisionHotelServ2015And2016! || 0) *
              rate
          ).toString()} €`;
        }
        case "Prestações de serviços de atividades de restauração e bebidas": {
          return `${roundValue(
            (indComProIncomeByHolder?.provisionCateringAndBeverageServ! || 0) *
              rate
          ).toString()} €`;
        }
        case "Prestações de serviços de atividades hoteleiras e similares": {
          return `${roundValue(
            (indComProIncomeByHolder?.provisionHotelAndSimilarServ! || 0) * rate
          ).toString()} €`;
        }
        case "Prestações de serviços de atividades de exploração de estabelecimentos de alojamento local na modalidade de moradia ou apartamento": {
          return `${roundValue(
            (indComProIncomeByHolder?.provisionLocalAccommodationServ! || 0) *
              rate
          ).toString()} €`;
        }
        case "Rendimento das atividades profissionais especificamente previstas na Tabela do art.º 151.º do CIRS": {
          return `${roundValue(
            (indComProIncomeByHolder?.incomeProfActivitiesArt151CIRS! || 0) *
              rate
          ).toString()} €`;
        }
        case "Rendimentos de prestações de serviços não previstos nos campos anteriores": {
          return `${roundValue(
            (indComProIncomeByHolder?.incomeFromUnforcastedServProv! || 0) *
              rate
          ).toString()} €`;
        }
        case "Propriedade intelectual(não abrangida pelo art. 58.º do EBF), industrial ou de prestação de informações": {
          return `${roundValue(
            (indComProIncomeByHolder?.intellectualPropertyNotArt58EBF! || 0) *
              rate
          ).toString()} €`;
        }
        case "Propriedade intelectual(Rendimentos abrangidos pelo art. 58.º do EBF - parte não isenta)": {
          return `${roundValue(
            (indComProIncomeByHolder?.intellectualPropertyIncomeArt58EBFNonExempt! ||
              0) * rate
          ).toString()} €`;
        }
        case "Saldo positivo das mais e menos-valias e restantes incrementos patrimoniais": {
          return `${roundValue(
            (indComProIncomeByHolder?.positiveBalanceGainsLossesEquityInc! ||
              0) * rate
          ).toString()} €`;
        }
        case "Rendimentos de Atividades Financeiras (Códigos CAE iniciados por 64, 65 ou 66)": {
          return `${roundValue(
            (indComProIncomeByHolder?.incomeFromFinancialActivitiesCAE! || 0) *
              rate
          ).toString()} €`;
        }
        case "Serviços prestados por sócios a sociedades de profissionais do Regime de Transparência Fiscal": {
          return `${roundValue(
            (indComProIncomeByHolder?.servicesProvidedByPartnersProfCo! || 0) *
              rate
          ).toString()} €`;
        }
        case "Resultado positivo de rendimentos prediais": {
          return `${roundValue(
            (indComProIncomeByHolder?.positiveResultPropertyIncome! || 0) * rate
          ).toString()} €`;
        }
        case "Rendimentos prediais imputáveis a atividade geradora de rendimentos da Categoria B": {
          return `${roundValue(
            (indComProIncomeByHolder?.buildingIncomeAttribCatBActivity! || 0) *
              rate
          ).toString()} €`;
        }
        case "Subsídios à exploração": {
          return `${roundValue(
            (indComProIncomeByHolder?.explorationSubsidies! || 0) * rate
          ).toString()} €`;
        }
        case "Outros subsídios": {
          return `${roundValue(
            (indComProIncomeByHolder?.otherSubsidies! || 0) * rate
          ).toString()} €`;
        }
        case "Rendimentos da Categoria B não incluídos nos campos anteriores": {
          return `${roundValue(
            (indComProIncomeByHolder?.catBIncomeNotInPrevFields! || 0) * rate
          ).toString()} €`;
        }
        case "Serviços prestados por sócios a sociedades onde detenham partes de capital ou direitos de voto, nas condições previstas nos n.ºs 1 e 2 da subalínea ii) da alínea g) do n.º 1 do art.º 31.º do CIRS": {
          return `${roundValue(
            (indComProIncomeByHolder?.servicesProvidedByPartnersToCompanies! ||
              0) * rate
          ).toString()} €`;
        }
        case "Vendas de produtos com exceção das incluídas no campo 457": {
          return `${roundValue(
            (agriYieldsSilvLivstckByHolder?.salesOfOtherProducts! || 0) * rate
          ).toString()} €`;
        }
        case "Prestações de serviços": {
          return `${roundValue(
            (agriYieldsSilvLivstckByHolder?.serviceProvision! || 0) * rate
          ).toString()} €`;
        }
        case "Rendimentos de capitais e prediais imputáveis a atividades geradoras de rendimentos da Categoria B, rendimentos da propriedade intelectual, industrial ou prestação de informações, saldo positivo das mais e menos-valias e restantes incrementos patrimoniais": {
          return `${roundValue(
            (agriYieldsSilvLivstckByHolder?.incomeFromCapPropAttribCatB! || 0) *
              rate
          ).toString()} €`;
        }
        case "Resultado positivo de rendimentos prediais ": {
          return `${roundValue(
            (agriYieldsSilvLivstckByHolder?.positiveResultPropertyIncome! ||
              0) * rate
          ).toString()} €`;
        }
        case "Subsídios à exploração relacionados com as vendas": {
          return `${roundValue(
            (agriYieldsSilvLivstckByHolder?.operatingSubsidiesRelatedSales! ||
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
            (agriYieldsSilvLivstckByHolder?.incomeFromSalesMultiAnnualForestry! ||
              0) * rate
          ).toString()} €`;
        }
        case "Rendimentos da Categoria B não incluídos nos campos anteriores ": {
          return `${roundValue(
            (agriYieldsSilvLivstckByHolder?.catBIncomeNotInPrevFields! || 0) *
              rate
          ).toString()} €`;
        }
        case "Serviços prestados por sócios a sociedades onde detenham partes de capital ou direitos de voto, nas condições previstas nos n.ºs 1 e 2 da subalínea ii) da alínea g) do n.º 1 do art.º 31.º do CIRS ": {
          return `${roundValue(
            (agriYieldsSilvLivstckByHolder?.servicesProvidedByPartnersToCompanies! ||
              0) * rate
          ).toString()} €`;
        }
        default:
          return "0 €";
      }
    } else {
      switch (key) {
        case "Venda de mercadorias e produtos": {
          return `${roundValue(
            (indComProIncomeClone?.saleOfMerchAndProducts! || 0) * rate
          ).toString()} €`;
        }
        case "Prestações de serviços de atividades hoteleiras e similares, restauração e bebidas - anos 2015 e 2016": {
          return `${roundValue(
            (indComProIncomeClone?.provisionHotelServ2015And2016! || 0) * rate
          ).toString()} €`;
        }
        case "Prestações de serviços de atividades de restauração e bebidas": {
          return `${roundValue(
            (indComProIncomeClone?.provisionCateringAndBeverageServ! || 0) *
              rate
          ).toString()} €`;
        }
        case "Prestações de serviços de atividades hoteleiras e similares": {
          return `${roundValue(
            (indComProIncomeClone?.provisionHotelAndSimilarServ! || 0) * rate
          ).toString()} €`;
        }
        case "Prestações de serviços de atividades de exploração de estabelecimentos de alojamento local na modalidade de moradia ou apartamento": {
          return `${roundValue(
            (indComProIncomeClone?.provisionLocalAccommodationServ! || 0) * rate
          ).toString()} €`;
        }
        case "Rendimento das atividades profissionais especificamente previstas na Tabela do art.º 151.º do CIRS": {
          return `${roundValue(
            (indComProIncomeClone?.incomeProfActivitiesArt151CIRS! || 0) * rate
          ).toString()} €`;
        }
        case "Rendimentos de prestações de serviços não previstos nos campos anteriores": {
          return `${roundValue(
            (indComProIncomeClone?.incomeFromUnforcastedServProv! || 0) * rate
          ).toString()} €`;
        }
        case "Propriedade intelectual(não abrangida pelo art. 58.º do EBF), industrial ou de prestação de informações": {
          return `${roundValue(
            (indComProIncomeClone?.intellectualPropertyNotArt58EBF! || 0) * rate
          ).toString()} €`;
        }
        case "Propriedade intelectual(Rendimentos abrangidos pelo art. 58.º do EBF - parte não isenta)": {
          return `${roundValue(
            (indComProIncomeClone?.intellectualPropertyIncomeArt58EBFNonExempt! ||
              0) * rate
          ).toString()} €`;
        }
        case "Saldo positivo das mais e menos-valias e restantes incrementos patrimoniais": {
          return `${roundValue(
            (indComProIncomeClone?.positiveBalanceGainsLossesEquityInc! || 0) *
              rate
          ).toString()} €`;
        }
        case "Rendimentos de Atividades Financeiras (Códigos CAE iniciados por 64, 65 ou 66)": {
          return `${roundValue(
            (indComProIncomeClone?.incomeFromFinancialActivitiesCAE! || 0) *
              rate
          ).toString()} €`;
        }
        case "Serviços prestados por sócios a sociedades de profissionais do Regime de Transparência Fiscal": {
          return `${roundValue(
            (indComProIncomeClone?.servicesProvidedByPartnersProfCo! || 0) *
              rate
          ).toString()} €`;
        }
        case "Resultado positivo de rendimentos prediais": {
          return `${roundValue(
            (indComProIncomeClone?.positiveResultPropertyIncome! || 0) * rate
          ).toString()} €`;
        }
        case "Rendimentos prediais imputáveis a atividade geradora de rendimentos da Categoria B": {
          return `${roundValue(
            (indComProIncomeClone?.buildingIncomeAttribCatBActivity! || 0) *
              rate
          ).toString()} €`;
        }
        case "Subsídios à exploração": {
          return `${roundValue(
            (indComProIncomeClone?.explorationSubsidies! || 0) * rate
          ).toString()} €`;
        }
        case "Outros subsídios": {
          return `${roundValue(
            (indComProIncomeClone?.otherSubsidies! || 0) * rate
          ).toString()} €`;
        }
        case "Rendimentos da Categoria B não incluídos nos campos anteriores": {
          return `${roundValue(
            (indComProIncomeClone?.catBIncomeNotInPrevFields! || 0) * rate
          ).toString()} €`;
        }
        case "Serviços prestados por sócios a sociedades onde detenham partes de capital ou direitos de voto, nas condições previstas nos n.ºs 1 e 2 da subalínea ii) da alínea g) do n.º 1 do art.º 31.º do CIRS": {
          return `${roundValue(
            (indComProIncomeClone?.servicesProvidedByPartnersToCompanies! ||
              0) * rate
          ).toString()} €`;
        }
        case "Vendas de produtos com exceção das incluídas no campo 457": {
          return `${roundValue(
            (agriYieldsSilvLivstckClone?.salesOfOtherProducts! || 0) * rate
          ).toString()} €`;
        }
        case "Prestações de serviços": {
          return `${roundValue(
            (agriYieldsSilvLivstckClone?.serviceProvision! || 0) * rate
          ).toString()} €`;
        }
        case "Rendimentos de capitais e prediais imputáveis a atividades geradoras de rendimentos da Categoria B, rendimentos da propriedade intelectual, industrial ou prestação de informações, saldo positivo das mais e menos-valias e restantes incrementos patrimoniais": {
          return `${roundValue(
            (agriYieldsSilvLivstckClone?.incomeFromCapPropAttribCatB! || 0) *
              rate
          ).toString()} €`;
        }
        case "Resultado positivo de rendimentos prediais ": {
          return `${roundValue(
            (agriYieldsSilvLivstckClone?.positiveResultPropertyIncome! || 0) *
              rate
          ).toString()} €`;
        }
        case "Subsídios à exploração relacionados com as vendas": {
          return `${roundValue(
            (agriYieldsSilvLivstckClone?.operatingSubsidiesRelatedSales! || 0) *
              rate
          ).toString()} €`;
        }
        case "Outros subsídios ": {
          return `${roundValue(
            (agriYieldsSilvLivstckClone?.otherSubsidies! || 0) * rate
          ).toString()} €`;
        }
        case "Rendimentos decorrentes de vendas em explorações silvícolas plurianuais (art.º 59.º-D, n.º 1 do EBF)": {
          return `${roundValue(
            (agriYieldsSilvLivstckClone?.incomeFromSalesMultiAnnualForestry! ||
              0) * rate
          ).toString()} €`;
        }
        case "Rendimentos da Categoria B não incluídos nos campos anteriores ": {
          return `${roundValue(
            (agriYieldsSilvLivstckClone?.catBIncomeNotInPrevFields! || 0) * rate
          ).toString()} €`;
        }
        case "Serviços prestados por sócios a sociedades onde detenham partes de capital ou direitos de voto, nas condições previstas nos n.ºs 1 e 2 da subalínea ii) da alínea g) do n.º 1 do art.º 31.º do CIRS ": {
          return `${roundValue(
            (agriYieldsSilvLivstckClone?.servicesProvidedByPartnersToCompanies! ||
              0) * rate
          ).toString()} €`;
        }
        default:
          return "0 €";
      }
    }
  };

  const returnPlaceHolderValue = (field: string): string => {
    if (field === "saleOfMerchAndProducts") {
      return indComProIncomeByHolder?.saleOfMerchAndProducts?.toString()!;
    }
    if (field === "provisionHotelServ2015And2016") {
      return indComProIncomeByHolder?.provisionHotelServ2015And2016?.toString()!;
    }
    if (field === "provisionCateringAndBeverageServ") {
      return indComProIncomeByHolder?.provisionCateringAndBeverageServ?.toString()!;
    }
    if (field === "provisionHotelAndSimilarServ") {
      return indComProIncomeByHolder?.provisionHotelAndSimilarServ?.toString()!;
    }
    if (field === "provisionLocalAccommodationServ") {
      return indComProIncomeByHolder?.provisionLocalAccommodationServ?.toString()!;
    }
    if (field === "incomeProfActivitiesArt151CIRS") {
      return indComProIncomeByHolder?.incomeProfActivitiesArt151CIRS?.toString()!;
    }
    if (field === "incomeFromUnforcastedServProv") {
      return indComProIncomeByHolder?.incomeFromUnforcastedServProv?.toString()!;
    }
    if (field === "intellectualPropertyNotArt58EBF") {
      return indComProIncomeByHolder?.intellectualPropertyNotArt58EBF?.toString()!;
    }
    if (field === "intellectualPropertyIncomeArt58EBFNonExempt") {
      return indComProIncomeByHolder?.intellectualPropertyIncomeArt58EBFNonExempt?.toString()!;
    }
    if (field === "positiveBalanceGainsLossesEquityInc") {
      return indComProIncomeByHolder?.positiveBalanceGainsLossesEquityInc?.toString()!;
    }
    if (field === "incomeFromFinancialActivitiesCAE") {
      return indComProIncomeByHolder?.incomeFromFinancialActivitiesCAE?.toString()!;
    }
    if (field === "servicesProvidedByPartnersProfCo") {
      return indComProIncomeByHolder?.servicesProvidedByPartnersProfCo?.toString()!;
    }
    if (field === "positiveResultPropertyIncome") {
      return indComProIncomeByHolder?.positiveResultPropertyIncome?.toString()!;
    }
    if (field === "buildingIncomeAttribCatBActivity") {
      return indComProIncomeByHolder?.buildingIncomeAttribCatBActivity?.toString()!;
    }
    if (field === "explorationSubsidies") {
      return indComProIncomeByHolder?.explorationSubsidies?.toString()!;
    }
    if (field === "otherSubsidies") {
      return indComProIncomeByHolder?.otherSubsidies?.toString()!;
    }
    if (field === "catBIncomeNotInPrevFields") {
      return indComProIncomeByHolder?.catBIncomeNotInPrevFields?.toString()!;
    }
    if (field === "servicesProvidedByPartnersToCompanies") {
      return indComProIncomeByHolder?.servicesProvidedByPartnersToCompanies?.toString()!;
    }
    if (field === "salesOfOtherProducts") {
      return agriYieldsSilvLivstckByHolder?.salesOfOtherProducts?.toString()!;
    }
    if (field === "serviceProvision") {
      return agriYieldsSilvLivstckByHolder?.serviceProvision?.toString()!;
    }
    if (field === "incomeFromCapPropAttribCatB") {
      return agriYieldsSilvLivstckByHolder?.incomeFromCapPropAttribCatB?.toString()!;
    }
    if (field === "agriSilvPositiveResultPropertyIncome") {
      return agriYieldsSilvLivstckByHolder?.positiveResultPropertyIncome?.toString()!;
    }
    if (field === "operatingSubsidiesRelatedSales") {
      return agriYieldsSilvLivstckByHolder?.operatingSubsidiesRelatedSales?.toString()!;
    }
    if (field === "agriYieldsSilvLivstckOtherSubsidies") {
      return agriYieldsSilvLivstckByHolder?.otherSubsidies?.toString()!;
    }
    if (field === "incomeFromSalesMultiAnnualForestry") {
      return agriYieldsSilvLivstckByHolder?.incomeFromSalesMultiAnnualForestry?.toString()!;
    }
    if (field === "agriSilvCatBIncomeNotInPrevFields") {
      return agriYieldsSilvLivstckByHolder?.catBIncomeNotInPrevFields?.toString()!;
    }
    if (field === "agriSilvServicesProvidedByPartnersToCompanies") {
      return agriYieldsSilvLivstckByHolder?.servicesProvidedByPartnersToCompanies?.toString()!;
    }

    return "";
  };

  const removeInvisibleLines = (object: valuesInterface) => {
    let NewIndComProIncome = indComProIncome;

    let NewAgriYieldsSilvLivstck = agriYieldsSilvLivstck;

    // RENDIMENTOS PROFISSIONAIS, COMERCIAIS E INDUSTRIAIS

    if (
      Taxes?.anexxBParams.profCommIndIncomes.saleOfMerchAndProducts.visible! ===
      false
    ) {
      delete object["Venda de mercadorias e produtos"];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        saleOfMerchAndProducts: 0,
      };
    }
    if (
      Taxes?.anexxBParams.profCommIndIncomes.provisionHotelServ2015And2016
        .visible! === false
    ) {
      delete object[
        "Prestações de serviços de atividades hoteleiras e similares, restauração e bebidas - anos 2015 e 2016"
      ];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        provisionHotelServ2015And2016: 0,
      };
    }
    if (
      Taxes?.anexxBParams.profCommIndIncomes.provisionCateringAndBeverageServ
        .visible! === false
    ) {
      delete object[
        "Prestações de serviços de atividades de restauração e bebidas"
      ];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        provisionCateringAndBeverageServ: 0,
      };
    }
    if (
      Taxes?.anexxBParams.profCommIndIncomes.provisionHotelAndSimilarServ
        .visible! === false
    ) {
      delete object[
        "Prestações de serviços de atividades hoteleiras e similares"
      ];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        provisionHotelAndSimilarServ: 0,
      };
    }
    if (
      Taxes?.anexxBParams.profCommIndIncomes.provisionLocalAccommodationServ
        .visible! === false
    ) {
      delete object[
        "Prestações de serviços de atividades de exploração de estabelecimentos de alojamento local na modalidade de moradia ou apartamento"
      ];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        provisionLocalAccommodationServ: 0,
      };
    }
    if (
      Taxes?.anexxBParams.profCommIndIncomes.incomeProfActivitiesArt151CIRS
        .visible! === false
    ) {
      delete object[
        "Rendimento das atividades profissionais especificamente previstas na Tabela do art.º 151.º do CIRS"
      ];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        incomeProfActivitiesArt151CIRS: 0,
      };
    }
    if (
      Taxes?.anexxBParams.profCommIndIncomes.incomeFromUnforcastedServProv
        .visible! === false
    ) {
      delete object[
        "Rendimentos de prestações de serviços não previstos nos campos anteriores"
      ];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        incomeFromUnforcastedServProv: 0,
      };
    }
    if (
      Taxes?.anexxBParams.profCommIndIncomes.intellectualPropertyNotArt58EBF
        .visible! === false
    ) {
      delete object[
        "Propriedade intelectual(não abrangida pelo art. 58.º do EBF), industrial ou de prestação de informações"
      ];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        intellectualPropertyNotArt58EBF: 0,
      };
    }
    if (
      Taxes?.anexxBParams.profCommIndIncomes
        .intellectualPropertyIncomeArt58EBFNonExempt.visible! === false
    ) {
      delete object[
        "Propriedade intelectual(Rendimentos abrangidos pelo art. 58.º do EBF - parte não isenta)"
      ];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        intellectualPropertyIncomeArt58EBFNonExempt: 0,
      };
    }
    if (
      Taxes?.anexxBParams.profCommIndIncomes.positiveBalanceGainsLossesEquityInc
        .visible! === false
    ) {
      delete object[
        "Saldo positivo das mais e menos-valias e restantes incrementos patrimoniais"
      ];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        positiveBalanceGainsLossesEquityInc: 0,
      };
    }
    if (
      Taxes?.anexxBParams.profCommIndIncomes.incomeFromFinancialActivitiesCAE
        .visible! === false
    ) {
      delete object[
        "Rendimentos de Atividades Financeiras (Códigos CAE iniciados por 64, 65 ou 66)"
      ];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        incomeFromFinancialActivitiesCAE: 0,
      };
    }
    if (
      Taxes?.anexxBParams.profCommIndIncomes.servicesProvidedByPartnersProfCo
        .visible! === false
    ) {
      delete object[
        "Serviços prestados por sócios a sociedades de profissionais do Regime de Transparência Fiscal"
      ];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        servicesProvidedByPartnersProfCo: 0,
      };
    }
    if (
      Taxes?.anexxBParams.profCommIndIncomes.positiveResultPropertyIncome
        .visible! === false
    ) {
      delete object["Resultado positivo de rendimentos prediais"];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        positiveResultPropertyIncome: 0,
      };
    }
    if (
      Taxes?.anexxBParams.profCommIndIncomes.buildingIncomeAttribCatBActivity
        .visible! === false
    ) {
      delete object[
        "Rendimentos prediais imputáveis a atividade geradora de rendimentos da Categoria B"
      ];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        buildingIncomeAttribCatBActivity: 0,
      };
    }
    if (
      Taxes?.anexxBParams.profCommIndIncomes.explorationSubsidies.visible! ===
      false
    ) {
      delete object["Subsídios à exploração"];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        explorationSubsidies: 0,
      };
    }
    if (
      Taxes?.anexxBParams.profCommIndIncomes.otherSubsidies.visible! === false
    ) {
      delete object["Outros subsídios"];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        otherSubsidies: 0,
      };
    }
    if (
      Taxes?.anexxBParams.profCommIndIncomes.catBIncomeNotInPrevFields
        .visible! === false
    ) {
      delete object[
        "Rendimentos da Categoria B não incluídos nos campos anteriores"
      ];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        catBIncomeNotInPrevFields: 0,
      };
    }
    if (
      Taxes?.anexxBParams.profCommIndIncomes
        .servicesProvidedByPartnersToCompanies.visible! === false
    ) {
      delete object[
        "Serviços prestados por sócios a sociedades onde detenham partes de capital ou direitos de voto, nas condições previstas nos n.ºs 1 e 2 da subalínea ii) da alínea g) do n.º 1 do art.º 31.º do CIRS"
      ];
      NewIndComProIncome = {
        ...NewIndComProIncome!,
        servicesProvidedByPartnersToCompanies: 0,
      };
    }

    // RENDIMENTOS AGRÍCOLAS, SILVÍCOLAS E PECUÁRIOS
    if (
      Taxes?.anexxBParams.agriSilvPecuIncomes.salesOfOtherProducts.visible! ===
      false
    ) {
      delete object[
        "Vendas de produtos com exceção das incluídas no campo 457"
      ];
      NewAgriYieldsSilvLivstck = {
        ...NewAgriYieldsSilvLivstck!,
        salesOfOtherProducts: 0,
      };
    }
    if (
      Taxes?.anexxBParams.agriSilvPecuIncomes.serviceProvision.visible! ===
      false
    ) {
      delete object["Prestações de serviços"];
      NewAgriYieldsSilvLivstck = {
        ...NewAgriYieldsSilvLivstck!,
        serviceProvision: 0,
      };
    }
    if (
      Taxes?.anexxBParams.agriSilvPecuIncomes.incomeFromCapPropAttribCatB
        .visible! === false
    ) {
      delete object[
        "Rendimentos de capitais e prediais imputáveis a atividades geradoras de rendimentos da Categoria B, rendimentos da propriedade intelectual, industrial ou prestação de informações, saldo positivo das mais e menos-valias e restantes incrementos patrimoniais"
      ];
      NewAgriYieldsSilvLivstck = {
        ...NewAgriYieldsSilvLivstck!,
        incomeFromCapPropAttribCatB: 0,
      };
    }
    if (
      Taxes?.anexxBParams.agriSilvPecuIncomes.positiveResultPropertyIncome
        .visible! === false
    ) {
      delete object["Resultado positivo de rendimentos prediais "];
      NewAgriYieldsSilvLivstck = {
        ...NewAgriYieldsSilvLivstck!,
        positiveResultPropertyIncome: 0,
      };
    }
    if (
      Taxes?.anexxBParams.agriSilvPecuIncomes.operatingSubsidiesRelatedSales
        .visible! === false
    ) {
      delete object["Subsídios à exploração relacionados com as vendas"];
      NewAgriYieldsSilvLivstck = {
        ...NewAgriYieldsSilvLivstck!,
        operatingSubsidiesRelatedSales: 0,
      };
    }
    if (
      Taxes?.anexxBParams.agriSilvPecuIncomes.otherSubsidies.visible! === false
    ) {
      delete object["Outros subsídios "];
      NewAgriYieldsSilvLivstck = {
        ...NewAgriYieldsSilvLivstck!,
        otherSubsidies: 0,
      };
    }
    if (
      Taxes?.anexxBParams.agriSilvPecuIncomes.incomeFromSalesMultiAnnualForestry
        .visible! === false
    ) {
      delete object[
        "Rendimentos decorrentes de vendas em explorações silvícolas plurianuais (art.º 59.º-D, n.º 1 do EBF)"
      ];
      NewAgriYieldsSilvLivstck = {
        ...NewAgriYieldsSilvLivstck!,
        incomeFromSalesMultiAnnualForestry: 0,
      };
    }
    if (
      Taxes?.anexxBParams.agriSilvPecuIncomes.catBIncomeNotInPrevFields
        .visible! === false
    ) {
      delete object[
        "Rendimentos da Categoria B não incluídos nos campos anteriores "
      ];
      NewAgriYieldsSilvLivstck = {
        ...NewAgriYieldsSilvLivstck!,
        catBIncomeNotInPrevFields: 0,
      };
    }
    if (
      Taxes?.anexxBParams.agriSilvPecuIncomes
        .servicesProvidedByPartnersToCompanies.visible! === false
    ) {
      delete object[
        "Serviços prestados por sócios a sociedades onde detenham partes de capital ou direitos de voto, nas condições previstas nos n.ºs 1 e 2 da subalínea ii) da alínea g) do n.º 1 do art.º 31.º do CIRS "
      ];
      NewAgriYieldsSilvLivstck = {
        ...NewAgriYieldsSilvLivstck!,
        servicesProvidedByPartnersToCompanies: 0,
      };
    }

    setIndComProIncomeClone(NewIndComProIncome ?? indComProIncomeClone);
    setAgriYieldsSilvLivstckClone(
      NewAgriYieldsSilvLivstck ?? agriYieldsSilvLivstckClone
    );

    return object;
  };

  const InitialsValues = () => {
    const InitialRendimentosProfissionaisComerciaisIndustriais = {
      "Venda de mercadorias e produtos": {
        rate: Taxes?.anexxBParams.profCommIndIncomes.saleOfMerchAndProducts
          .parameterValue!,
        name: "saleOfMerchAndProducts",
        code:
          Taxes?.anexxBParams.profCommIndIncomes.saleOfMerchAndProducts
            .parameterCode ?? "401",
        label:
          Taxes?.anexxBParams.profCommIndIncomes.saleOfMerchAndProducts
            .parameterName!,
      },
      "Prestações de serviços de atividades hoteleiras e similares, restauração e bebidas - anos 2015 e 2016":
        {
          rate: Taxes?.anexxBParams.profCommIndIncomes
            .provisionHotelServ2015And2016.parameterValue!,
          name: "provisionHotelServ2015And2016",
          code:
            Taxes?.anexxBParams.profCommIndIncomes.provisionHotelServ2015And2016
              .parameterCode ?? "402",
          label:
            Taxes?.anexxBParams.profCommIndIncomes.provisionHotelServ2015And2016
              .parameterName!,
        },
      "Rendimento das atividades profissionais especificamente previstas na Tabela do art.º 151.º do CIRS":
        {
          rate: Taxes?.anexxBParams.profCommIndIncomes
            .incomeProfActivitiesArt151CIRS.parameterValue!,
          name: "incomeProfActivitiesArt151CIRS",
          code:
            Taxes?.anexxBParams.profCommIndIncomes
              .incomeProfActivitiesArt151CIRS.parameterCode ?? "403",
          label:
            Taxes?.anexxBParams.profCommIndIncomes
              .incomeProfActivitiesArt151CIRS.parameterName!,
        },
      "Rendimentos de prestações de serviços não previstos nos campos anteriores":
        {
          rate: Taxes?.anexxBParams.profCommIndIncomes
            .incomeFromUnforcastedServProv.parameterValue!,
          name: "incomeFromUnforcastedServProv",
          code:
            Taxes?.anexxBParams.profCommIndIncomes.incomeFromUnforcastedServProv
              .parameterCode ?? "404",
          label:
            Taxes?.anexxBParams.profCommIndIncomes.incomeFromUnforcastedServProv
              .parameterName!,
        },
      "Propriedade intelectual(não abrangida pelo art. 58.º do EBF), industrial ou de prestação de informações":
        {
          rate: Taxes?.anexxBParams.profCommIndIncomes
            .intellectualPropertyNotArt58EBF.parameterValue!,
          name: "intellectualPropertyNotArt58EBF",
          code:
            Taxes?.anexxBParams.profCommIndIncomes
              .intellectualPropertyNotArt58EBF.parameterCode ?? "405",
          label:
            Taxes?.anexxBParams.profCommIndIncomes
              .intellectualPropertyNotArt58EBF.parameterName!,
        },
      "Propriedade intelectual(Rendimentos abrangidos pelo art. 58.º do EBF - parte não isenta)":
        {
          rate: Taxes?.anexxBParams.profCommIndIncomes
            .intellectualPropertyIncomeArt58EBFNonExempt.parameterValue!,
          name: "intellectualPropertyIncomeArt58EBFNonExempt",
          code:
            Taxes?.anexxBParams.profCommIndIncomes
              .intellectualPropertyIncomeArt58EBFNonExempt.parameterCode ??
            "406",
          label:
            Taxes?.anexxBParams.profCommIndIncomes
              .intellectualPropertyIncomeArt58EBFNonExempt.parameterName!,
        },
      "Saldo positivo das mais e menos-valias e restantes incrementos patrimoniais":
        {
          rate: Taxes?.anexxBParams.profCommIndIncomes
            .positiveBalanceGainsLossesEquityInc.parameterValue!,
          name: "positiveBalanceGainsLossesEquityInc",
          code:
            Taxes?.anexxBParams.profCommIndIncomes
              .positiveBalanceGainsLossesEquityInc.parameterCode ?? "407",
          label:
            Taxes?.anexxBParams.profCommIndIncomes
              .positiveBalanceGainsLossesEquityInc.parameterName!,
        },
      "Rendimentos de Atividades Financeiras (Códigos CAE iniciados por 64, 65 ou 66)":
        {
          rate: Taxes?.anexxBParams.profCommIndIncomes
            .incomeFromFinancialActivitiesCAE.parameterValue!,
          name: "incomeFromFinancialActivitiesCAE",
          code:
            Taxes?.anexxBParams.profCommIndIncomes
              .incomeFromFinancialActivitiesCAE.parameterCode ?? "408",
          label:
            Taxes?.anexxBParams.profCommIndIncomes
              .incomeFromFinancialActivitiesCAE.parameterName!,
        },
      "Serviços prestados por sócios a sociedades de profissionais do Regime de Transparência Fiscal":
        {
          rate: Taxes?.anexxBParams.profCommIndIncomes
            .servicesProvidedByPartnersProfCo.parameterValue!,
          name: "servicesProvidedByPartnersProfCo",
          code:
            Taxes?.anexxBParams.profCommIndIncomes
              .servicesProvidedByPartnersProfCo.parameterCode ?? "409",
          label:
            Taxes?.anexxBParams.profCommIndIncomes
              .servicesProvidedByPartnersProfCo.parameterName!,
        },
      "Resultado positivo de rendimentos prediais": {
        rate: Taxes?.anexxBParams.profCommIndIncomes
          .positiveResultPropertyIncome.parameterValue!,
        name: "positiveResultPropertyIncome",
        code:
          Taxes?.anexxBParams.profCommIndIncomes.positiveResultPropertyIncome
            .parameterCode ?? "410",
        label:
          Taxes?.anexxBParams.profCommIndIncomes.positiveResultPropertyIncome
            .parameterName!,
      },
      "Rendimentos prediais imputáveis a atividade geradora de rendimentos da Categoria B":
        {
          rate: Taxes?.anexxBParams.profCommIndIncomes
            .buildingIncomeAttribCatBActivity.parameterValue!,
          name: "buildingIncomeAttribCatBActivity",
          code:
            Taxes?.anexxBParams.profCommIndIncomes
              .buildingIncomeAttribCatBActivity.parameterCode ?? "411",
          label:
            Taxes?.anexxBParams.profCommIndIncomes
              .buildingIncomeAttribCatBActivity.parameterName!,
        },
      "Subsídios à exploração": {
        rate: Taxes?.anexxBParams.profCommIndIncomes.explorationSubsidies
          .parameterValue!,
        name: "explorationSubsidies",
        code:
          Taxes?.anexxBParams.profCommIndIncomes.explorationSubsidies
            .parameterCode ?? "412",
        label:
          Taxes?.anexxBParams.profCommIndIncomes.explorationSubsidies
            .parameterName!,
      },
      "Outros subsídios": {
        rate: Taxes?.anexxBParams.profCommIndIncomes.otherSubsidies
          .parameterValue!,
        name: "otherSubsidies",
        code:
          Taxes?.anexxBParams.profCommIndIncomes.otherSubsidies.parameterCode ??
          "413",
        label:
          Taxes?.anexxBParams.profCommIndIncomes.otherSubsidies.parameterName!,
      },
      "Rendimentos da Categoria B não incluídos nos campos anteriores": {
        rate: Taxes?.anexxBParams.profCommIndIncomes.catBIncomeNotInPrevFields
          .parameterValue!,
        name: "catBIncomeNotInPrevFields",
        code:
          Taxes?.anexxBParams.profCommIndIncomes.catBIncomeNotInPrevFields
            .parameterCode ?? "414",
        label:
          Taxes?.anexxBParams.profCommIndIncomes.catBIncomeNotInPrevFields
            .parameterName!,
      },
      "Prestações de serviços de atividades de restauração e bebidas": {
        rate: Taxes?.anexxBParams.profCommIndIncomes
          .provisionCateringAndBeverageServ.parameterValue!,
        name: "provisionCateringAndBeverageServ",
        code:
          Taxes?.anexxBParams.profCommIndIncomes
            .provisionCateringAndBeverageServ.parameterCode ?? "415",
        label:
          Taxes?.anexxBParams.profCommIndIncomes
            .provisionCateringAndBeverageServ.parameterName!,
      },
      "Prestações de serviços de atividades hoteleiras e similares": {
        rate: Taxes?.anexxBParams.profCommIndIncomes
          .provisionHotelAndSimilarServ.parameterValue!,
        name: "provisionHotelAndSimilarServ",
        code:
          Taxes?.anexxBParams.profCommIndIncomes.provisionHotelAndSimilarServ
            .parameterCode ?? "416",
        label:
          Taxes?.anexxBParams.profCommIndIncomes.provisionHotelAndSimilarServ
            .parameterName!,
      },
      "Prestações de serviços de atividades de exploração de estabelecimentos de alojamento local na modalidade de moradia ou apartamento":
        {
          rate: Taxes?.anexxBParams.profCommIndIncomes
            .provisionLocalAccommodationServ.parameterValue!,
          name: "provisionLocalAccommodationServ",
          code:
            Taxes?.anexxBParams.profCommIndIncomes
              .provisionLocalAccommodationServ.parameterCode ?? "417",
          label:
            Taxes?.anexxBParams.profCommIndIncomes
              .provisionLocalAccommodationServ.parameterName!,
        },
      "Serviços prestados por sócios a sociedades onde detenham partes de capital ou direitos de voto, nas condições previstas nos n.ºs 1 e 2 da subalínea ii) da alínea g) do n.º 1 do art.º 31.º do CIRS":
        {
          rate: Taxes?.anexxBParams.profCommIndIncomes
            .servicesProvidedByPartnersToCompanies.parameterValue!,
          name: "servicesProvidedByPartnersToCompanies",
          code:
            Taxes?.anexxBParams.profCommIndIncomes
              .servicesProvidedByPartnersToCompanies.parameterCode ?? "418",
          label:
            Taxes?.anexxBParams.profCommIndIncomes
              .servicesProvidedByPartnersToCompanies.parameterName!,
        },
    };

    setRendimentosProfissionaisComerciaisIndustriais(
      removeInvisibleLines(InitialRendimentosProfissionaisComerciaisIndustriais)
    );

    const InitialRendimentosAgricolasSilvicolasPecuarios = {
      "Vendas de produtos com exceção das incluídas no campo 457": {
        rate: Taxes?.anexxBParams.agriSilvPecuIncomes.salesOfOtherProducts
          .parameterValue!,
        name: "salesOfOtherProducts",
        code:
          Taxes?.anexxBParams.agriSilvPecuIncomes.salesOfOtherProducts
            .parameterCode ?? "451",
        label:
          Taxes?.anexxBParams.agriSilvPecuIncomes.salesOfOtherProducts
            .parameterName!,
      },
      "Prestações de serviços": {
        rate: Taxes?.anexxBParams.agriSilvPecuIncomes.serviceProvision
          .parameterValue!,
        name: "serviceProvision",
        code:
          Taxes?.anexxBParams.agriSilvPecuIncomes.serviceProvision
            .parameterCode ?? "452",
        label:
          Taxes?.anexxBParams.agriSilvPecuIncomes.serviceProvision
            .parameterName!,
      },
      "Rendimentos de capitais e prediais imputáveis a atividades geradoras de rendimentos da Categoria B, rendimentos da propriedade intelectual, industrial ou prestação de informações, saldo positivo das mais e menos-valias e restantes incrementos patrimoniais":
        {
          rate: Taxes?.anexxBParams.agriSilvPecuIncomes
            .incomeFromCapPropAttribCatB.parameterValue!,
          name: "incomeFromCapPropAttribCatB",
          code:
            Taxes?.anexxBParams.agriSilvPecuIncomes.incomeFromCapPropAttribCatB
              .parameterCode ?? "453",
          label:
            Taxes?.anexxBParams.agriSilvPecuIncomes.incomeFromCapPropAttribCatB
              .parameterName!,
        },
      "Resultado positivo de rendimentos prediais ": {
        rate: Taxes?.anexxBParams.agriSilvPecuIncomes
          .positiveResultPropertyIncome.parameterValue!,
        name: "agriSilvPositiveResultPropertyIncome",
        code:
          Taxes?.anexxBParams.agriSilvPecuIncomes.positiveResultPropertyIncome
            .parameterCode ?? "454",
        label:
          Taxes?.anexxBParams.agriSilvPecuIncomes.positiveResultPropertyIncome
            .parameterName!,
      },
      "Subsídios à exploração relacionados com as vendas": {
        rate: Taxes?.anexxBParams.agriSilvPecuIncomes
          .operatingSubsidiesRelatedSales.parameterValue!,
        name: "operatingSubsidiesRelatedSales",
        code:
          Taxes?.anexxBParams.agriSilvPecuIncomes.operatingSubsidiesRelatedSales
            .parameterCode ?? "455",
        label:
          Taxes?.anexxBParams.agriSilvPecuIncomes.operatingSubsidiesRelatedSales
            .parameterName!,
      },
      "Outros subsídios ": {
        rate: Taxes?.anexxBParams.agriSilvPecuIncomes.otherSubsidies
          .parameterValue!,
        name: "agriYieldsSilvLivstckOtherSubsidies",
        code:
          Taxes?.anexxBParams.agriSilvPecuIncomes.otherSubsidies
            .parameterCode ?? "456",
        label:
          Taxes?.anexxBParams.agriSilvPecuIncomes.otherSubsidies.parameterName!,
      },
      "Rendimentos decorrentes de vendas em explorações silvícolas plurianuais (art.º 59.º-D, n.º 1 do EBF)":
        {
          rate: Taxes?.anexxBParams.agriSilvPecuIncomes
            .incomeFromSalesMultiAnnualForestry.parameterValue!,
          name: "incomeFromSalesMultiAnnualForestry",
          code:
            Taxes?.anexxBParams.agriSilvPecuIncomes
              .incomeFromSalesMultiAnnualForestry.parameterCode ?? "457",
          label:
            Taxes?.anexxBParams.agriSilvPecuIncomes
              .incomeFromSalesMultiAnnualForestry.parameterName!,
        },
      "Rendimentos da Categoria B não incluídos nos campos anteriores ": {
        rate: Taxes?.anexxBParams.agriSilvPecuIncomes.catBIncomeNotInPrevFields
          .parameterValue!,
        name: "agriSilvCatBIncomeNotInPrevFields",
        code:
          Taxes?.anexxBParams.agriSilvPecuIncomes.catBIncomeNotInPrevFields
            .parameterCode ?? "458",
        label:
          Taxes?.anexxBParams.agriSilvPecuIncomes.catBIncomeNotInPrevFields
            .parameterName!,
      },
      "Serviços prestados por sócios a sociedades onde detenham partes de capital ou direitos de voto, nas condições previstas nos n.ºs 1 e 2 da subalínea ii) da alínea g) do n.º 1 do art.º 31.º do CIRS ":
        {
          rate: Taxes?.anexxBParams.agriSilvPecuIncomes
            .servicesProvidedByPartnersToCompanies.parameterValue!,
          name: "agriSilvServicesProvidedByPartnersToCompanies",
          code:
            Taxes?.anexxBParams.agriSilvPecuIncomes
              .servicesProvidedByPartnersToCompanies.parameterCode ?? "459",
          label:
            Taxes?.anexxBParams.agriSilvPecuIncomes
              .servicesProvidedByPartnersToCompanies.parameterName!,
        },
    };

    setRendimentosAgricolasSilvicolasPecuarios(
      removeInvisibleLines(InitialRendimentosAgricolasSilvicolasPecuarios)
    );
  };

  useEffect(() => {
    const value =
      calculateNetIncomeIndependentWithoutOrganizedAccountingTotal({
        ...valueTotal,
      }) * 0.75;
    setTotalGrossIncomeField(value);
  }, [valueTotal]);

  useEffect(() => {
    setValueTotal(initialValuesTotal());

    InitialsValues();
  }, [currentHolder]);

  useEffect(() => {
    setIndComProIncomeClone(indComProIncome!);
    setAgriYieldsSilvLivstckClone(agriYieldsSilvLivstck!);
  }, [indComProIncome, agriYieldsSilvLivstck]);

  useEffect(() => {
    if (
      indComProIncomeClone === indComProIncome &&
      agriYieldsSilvLivstckClone === agriYieldsSilvLivstck
    ) {
      setValueTotal(initialValuesTotal());
      InitialsValues();
    }
    saveValues(indComProIncomeClone, agriYieldsSilvLivstckClone);
  }, [indComProIncomeClone, agriYieldsSilvLivstckClone]);

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

        {Object.keys(rendimentosProfissionaisComerciaisIndustriais).length !==
        0 ? (
          <Text
            className="uppercase"
            text={<b>{t("professionalsIncome")}</b>}
            margin="20px 0px"
          />
        ) : null}
        {Object.entries(rendimentosProfissionaisComerciaisIndustriais).map(
          ([key, value]) => (
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
                    placeholder={`${
                      value.rate
                        ? parseInt((value.rate * 100).toString(), 10)
                        : 0 * 100
                    }%`}
                    isDisabled
                    width="75px"
                  />
                </div>
                <div style={{ marginLeft: "5px" }}>
                  <TextField
                    placeholder={formatToEuroCurrency(
                      parseFloat(
                        calculateFinalGrossIncome(key, value.rate ?? 0)
                      )
                    )}
                    isDisabled
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
          ([key, value]) => (
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
                    placeholder={`${
                      value.rate
                        ? parseInt((value.rate * 100).toString(), 10)
                        : 0 * 100
                    }%`}
                    isDisabled
                    width="75px"
                  />
                </div>
                <div style={{ marginLeft: "5px" }}>
                  <TextField
                    placeholder={formatToEuroCurrency(
                      parseFloat(
                        calculateFinalGrossIncome(key, value.rate ?? 0)
                      )
                    )}
                    isDisabled
                  />
                </div>
              </div>
            </div>
          )
        )}
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
            <NBButton variant="outlined" onClick={handleClean} fullWidth>
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
                    indComProIncomeClone,
                    agriYieldsSilvLivstckClone
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
