import { createSlice } from "@reduxjs/toolkit";
import {
  calculateCapitalIncome,
  calculateExemptIncomeOrIntellectualProperty,
  calculateIncomeEarnedAbroadForNonResidents,
  calculateIncomeEarnedAbroadForResidents,
  calculateNetIncomeDependentsAndPensions,
  calculateNetIncomeIndependentWithOrganizedAccounting,
  calculateNetIncomePropertyIncome,
  calculateOtherIncome,
  calculateReceiptsAverageTotal,
  calculateTaxTransparency,
  calculateGreenReceiptsAverageTotal,
} from "common/lib/index";
import {
  createContextThunk,
  findBySimulationIdAndHolderReceiptsThunk,
  findBySimulationIdAndHolderThunk,
  getContextThunk,
  getDocumentThunk,
  getTaxesThunk,
  simulationResultsThunk,
} from "./thunks";
import ETypes, {
  aggEachTypeOfIncome,
  Context,
  holder,
  holderContext,
  holderData,
  ReceiptsData,
  Taxes,
} from "./types";

export const holderIRSDataInitialState: holderData = {
  dependentsAndPensions: {
    dependentsAndPensionsCheckBox: false,
    grossIncome: 0,
    irsWithholdingTax: 0,
    surchargeWithholding: 0,
    mandatoryContributionsToSecSocial: 0,
    netIncome: 0,
  },
  independentWithOrganizedAccounting: {
    independentWithOrganizedAccountingCheckBox: false,
    calculatedProfit: 0,
    calculatedLoss: 0,
    taxIncidence: 0,
    netIncome: 0,
  },
  independentWithoutOrganizedAccounting: {
    independentWithoutOrganizedAccountingCheckBox: false,
    indComProIncome: {
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
    },
    agriYieldsSilvLivstck: {
      salesProductsOtherThanThoseIncludField7: 0,
      servicesRendered: 0,
      incomeFromCapitalAndRealEstate: 0,
      positiveResultOfPropertyIncome: 0,
      operatingSubsidiesRelatedToSales: 0,
      otherSubsidies: 0,
      incomeFromSalesMultiannual: 0,
      categoryBIncome: 0,
    },
    otherIncome: {
      otherIncome: 0,
    },
    charges: 0,
    taxIncidence: 0,
    netIncome: 0,
    totalGrossIncome: 0,
  },
  taxTransparency: {
    taxTransparencyCheckBox: false,
    societies: {
      netIncome: 0,
      withholdingTax: 0,
    },
    complementaryGrouping: {
      profit: 0,
      losses: 0,
      withholdingTax: 0,
    },
    netIncome: 0,
  },
  propertyIncome: {
    propertyIncomeCheckBox: false,
    earnedIncome: {
      grossIncome: 0,
      withholdingTax: 0,
      supportedAndPaidExpenses: 0,
    },
    sublease: {
      incomeReceivedByTheSublessor: 0,
      rentPaidToLandlord: 0,
      irsWithholdingTax: 0,
    },
    netIncome: 0,
  },
  exemptIncomeOrIntellectualProperty: {
    exemptIncomeOrIntellectualPropertCheckBox: false,
    exemptIncomeSubjectToAggregation: {
      grossIncome: 0,
      irsWithholdingTax: 0,
    },
    incomeFromIntellectualPropertyPartiallyExempted: {
      income: 0,
    },
    netIncome: 0,
  },
  incomeEarnedAbroadForResidents: {
    incomeEarnedAbroadForResidentsCheckBox: false,
    incomeFromDependentWork: {
      grossIncome: 0,
      taxPaidAbroad: 0,
      withholding: 0,
      surchargeWithholding: 0,
      contributionsToSocialProtectionSchemes: 0,
    },
    pensionIncome: {
      grossIncome: 0,
      taxPaidAbroad: 0,
      contributionsToSocialProtectionSchemes: 0,
    },
    businessAndProfessionalIncome: {
      indComProIncome: {
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
      },
      agriYieldsSilvLivstck: {
        salesProductsOtherThanThoseIncludField7: 0,
        servicesRendered: 0,
        incomeFromCapitalAndRealEstate: 0,
        positiveResultOfPropertyIncome: 0,
        operatingSubsidiesRelatedToSales: 0,
        otherSubsidies: 0,
        incomeFromSalesMultiannual: 0,
        categoryBIncome: 0,
      },
      otherIncome: {
        otherIncome: 0,
      },
      grossIncome: 0,
      taxPaidAbroad: 0,
      contributionsToSocialProtectionSchemes: 0,
      withholding: 0,
    },
    propertyIncome: {
      netIncome: 0,
      taxPaidAbroad: 0,
    },
    capitalIncome: {
      grossIncome: 0,
      eithholdingTaxInPortugal: 0,
    },
    netIncome: 0,
  },
  capitalIncome: {
    capitalIncomeCheckBox: false,
    incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal: {
      grossIncomeYear1: 0,
      grossIncomeYear2: 0,
      grossIncomeYear3: 0,
      declarationsNumber: 0,
    },
    incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal:
      {
        grossIncomeYear1: 0,
        grossIncomeYear2: 0,
        grossIncomeYear3: 0,
        declarationsNumber: 0,
      },
    netIncome: 0,
  },
  incomeEarnedAbroadForNonResidents: {
    incomeEarnedAbroadForNonResidentsCheckBok: false,
    incomeNotExemptFromTax: {
      grossIncome: 0,
      taxPaidAbroad: 0,
      taxWithheldAbroad: 0,
      chargesForSocialSecurityorEquivalent: 0,
    },
    taxFreeIncome: {
      grossIncome: 0,
    },
    netIncome: 0,
  },
  otherIncome: {
    otherIncomeCheckBox: false,
    otherNetIncome: 0,
    netIncome: 0,
  },
};

export const holderReceiptsDataInitialState: ReceiptsData = {
  salaryOrPensionReceipts: {
    salaryOrPensionReceiptsCheckBox: false,
    receipt1: 0,
    receipt2: 0,
    receipt3: 0,
    receipt4: 0,
    receipt5: 0,
    receipt6: 0,
    averageNetIncome: 0,
  },
  greenReceipts: {
    greenReceiptsCheckBox: false,
    greenReceiptsIncomes1: {
      indComProIncome: {
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
      },
      agriYieldsSilvLivstck: {
        salesProductsOtherThanThoseIncludField7: 0,
        servicesRendered: 0,
        incomeFromCapitalAndRealEstate: 0,
        positiveResultOfPropertyIncome: 0,
        operatingSubsidiesRelatedToSales: 0,
        otherSubsidies: 0,
        incomeFromSalesMultiannual: 0,
        categoryBIncome: 0,
      },
      otherIncome: {
        otherIncome: 0,
      },
      receiptValue: 0,
    },
    greenReceiptsIncomes2: {
      indComProIncome: {
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
      },
      agriYieldsSilvLivstck: {
        salesProductsOtherThanThoseIncludField7: 0,
        servicesRendered: 0,
        incomeFromCapitalAndRealEstate: 0,
        positiveResultOfPropertyIncome: 0,
        operatingSubsidiesRelatedToSales: 0,
        otherSubsidies: 0,
        incomeFromSalesMultiannual: 0,
        categoryBIncome: 0,
      },
      otherIncome: {
        otherIncome: 0,
      },
      receiptValue: 0,
    },
    greenReceiptsIncomes3: {
      indComProIncome: {
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
      },
      agriYieldsSilvLivstck: {
        salesProductsOtherThanThoseIncludField7: 0,
        servicesRendered: 0,
        incomeFromCapitalAndRealEstate: 0,
        positiveResultOfPropertyIncome: 0,
        operatingSubsidiesRelatedToSales: 0,
        otherSubsidies: 0,
        incomeFromSalesMultiannual: 0,
        categoryBIncome: 0,
      },
      otherIncome: {
        otherIncome: 0,
      },
      receiptValue: 0,
    },
    greenReceiptsIncomes4: {
      indComProIncome: {
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
      },
      agriYieldsSilvLivstck: {
        salesProductsOtherThanThoseIncludField7: 0,
        servicesRendered: 0,
        incomeFromCapitalAndRealEstate: 0,
        positiveResultOfPropertyIncome: 0,
        operatingSubsidiesRelatedToSales: 0,
        otherSubsidies: 0,
        incomeFromSalesMultiannual: 0,
        categoryBIncome: 0,
      },
      otherIncome: {
        otherIncome: 0,
      },
      receiptValue: 0,
    },
    greenReceiptsIncomes5: {
      indComProIncome: {
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
      },
      agriYieldsSilvLivstck: {
        salesProductsOtherThanThoseIncludField7: 0,
        servicesRendered: 0,
        incomeFromCapitalAndRealEstate: 0,
        positiveResultOfPropertyIncome: 0,
        operatingSubsidiesRelatedToSales: 0,
        otherSubsidies: 0,
        incomeFromSalesMultiannual: 0,
        categoryBIncome: 0,
      },
      otherIncome: {
        otherIncome: 0,
      },
      receiptValue: 0,
    },
    greenReceiptsIncomes6: {
      indComProIncome: {
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
      },
      agriYieldsSilvLivstck: {
        salesProductsOtherThanThoseIncludField7: 0,
        servicesRendered: 0,
        incomeFromCapitalAndRealEstate: 0,
        positiveResultOfPropertyIncome: 0,
        operatingSubsidiesRelatedToSales: 0,
        otherSubsidies: 0,
        incomeFromSalesMultiannual: 0,
        categoryBIncome: 0,
      },
      otherIncome: {
        otherIncome: 0,
      },
      receiptValue: 0,
    },
    averageNetIncome: 0,
  },
  propertyIncomeReceipts: {
    propertyIncomeRecCheckBox: false,
    receipt1: 0,
    receipt2: 0,
    receipt3: 0,
    receipt4: 0,
    receipt5: 0,
    receipt6: 0,
    averageNetIncome: 0,
  },
  researchScholarshipsInternshipReceipts: {
    researchScholarReceiptsCheckBox: false,
    receipt1: 0,
    receipt2: 0,
    receipt3: 0,
    receipt4: 0,
    receipt5: 0,
    receipt6: 0,
    averageNetIncome: 0,
  },
  alimonyReceipts: {
    almonyReceiptsCheckBox: false,
    receipt1: 0,
    receipt2: 0,
    receipt3: 0,
    receipt4: 0,
    receipt5: 0,
    receipt6: 0,
    averageNetIncome: 0,
  },
};

export const holderInitialState: holder = {
  holderNumber: 0,
  Name: null,
  Nif: null,
  irsOrReceipts: null,
  IRSTotal: 0,
  ReceiptsTotal: 0,
  IRSData: holderIRSDataInitialState,
  ReceiptsData: holderReceiptsDataInitialState,
};

export const aggregator: aggEachTypeOfIncome = {
  aggDependentsPensions: 0,
  aggIndependentWith: 0,
  aggIndependentWithout: 0,
  aggTaxTransparency: 0,
  aggPropertyIncome: 0,
  aggIntellectualProper: 0,
  aggAbroadForResidents: 0,
  aggCapitalIncome: 0,
  aggAbroadForNonResidents: 0,
  aggOtherIncome: 0,
  totalNetIncomeIrs: 0,
  aggSalaryOrPensionReceipts: 0,
  aggGreenReceipts: 0,
  aggPropertyIncomeReceipts: 0,
  aggResearchInternshipReceipts: 0,
  aggAlimonyReceipts: 0,
  totalNetIncomeRec: 0,
};

export const taxesInitialState: Taxes = {
  indWorkWtoCalcTaxIncidence: 0,
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
  salesProductsOtherThanThoseIncludField7: 0,
  servicesRendered: 0,
  incomeFromCapitalAndRealEstate: 0,
  positiveResultOfPropertyIncomeAgri: 0,
  operatingSubsidiesRelatedToSales: 0,
  otherSubsidiesAgri: 0,
  incomeFromSalesMultiannual: 0,
  categoryBIncome: 0,
  otherIncome: 0,
  valueToCalculateTaxIncidence: 0,
  valueEntitiesBasedInPortugal: 0,
  valueEntiWithoutHeadPortugal: 0,
  taxFreeIncomeValue: 0,
  valueOfRegularReceipts: 0,
  netIncomeReceipts: 0,
  saleOfGoodsAndProductsVisibility: true,
  provisionOfHotelAndSimilarServicesCateringAndBeverageVisibility: true,
  provisionOfCateringAndBeverageActivitiesServicesVisibility: true,
  provisionOfHotelServicesAndSimilarActivitiesVisibility: true,
  provisionOfServRelatedToTheExploOfLocalAccEstablishmentsVisibility: true,
  incomeFromProActivitiesSpecifArticle151OfTheCIRSVisibility: true,
  incomeFromServicesRenderedNotForeseenInThePreviousFieldsVisibility: true,
  intellPropertyNotCoveByArtic58OfTheEBFIndOrInforPropertyVisibility: true,
  intellPropertyIncoCoveredByArtic58OfTheEBFNonExemptPartVisibility: true,
  positiveBalanOfCapGainsAndLossesAndOtherEquityIncrementsVisibility: true,
  incomeFromFinancialActivitiesCAECodesStartWith6465or66Visibility: true,
  servicProvidedByMembToProSocOfTheFiscalTransparencRegimeVisibility: true,
  positiveResultOfPropertyIncomeVisibility: true,
  propertyIncomeAttributableToCatBIncomeGeneratingActivityVisibility: true,
  operatingSubsidiesVisibility: true,
  otherSubsidiesVisibility: true,
  categoryBIncomeNotIncludedInPreviousFieldsVisibility: true,
  salesProductsOtherThanThoseIncludField7Visibility: true,
  servicesRenderedVisibility: true,
  incomeFromCapitalAndRealEstateVisibility: true,
  positiveResultOfPropertyIncomeAgriVisibility: true,
  operatingSubsidiesRelatedToSalesVisibility: true,
  otherSubsidiesAgriVisibility: true,
  incomeFromSalesMultiannualVisibility: true,
  categoryBIncomeVisibility: true,
  otherIncomeVisibility: true,
};

export const contextInitialState: Context = {
  NomeOperador: undefined,
  Operador: undefined,
  Estrutura: undefined,
  NomeEstrutura: undefined,
  IDPN: undefined,
  Conta: undefined,
  IdSessaoNPT: undefined,
  CodigoBanco: undefined,
  Entidade: undefined,
  Abreviado: undefined,
  Nome: undefined,
  Nif: undefined,
};

export const initialState: holderContext = {
  SimulationId: "",
  Holders: 1,
  currentHolder: 1,
  currentTypeOfIncome: true,
  cleanHolder: false,
  taxes: taxesInitialState,
  aggregator,
  context: contextInitialState,
  arrayHolders: [],
};

const slice = createSlice({
  name: ETypes.SLICE_NAME,
  initialState,
  reducers: {
    setInitialState() {
      return initialState;
    },
    setSimulationId(state, { payload }) {
      return { ...state, SimulationId: payload };
    },
    setContext(state, { payload }) {
      return { ...state, context: payload };
    },
    setNumberOfHolders(state, { payload }) {
      return { ...state, Holders: payload };
    },
    increaseCurrentHolder(state) {
      return {
        ...state,
        currentHolder:
          state.currentHolder <= state.Holders
            ? state.currentHolder + 1
            : state.currentHolder,
      };
    },
    decreaseCurrentHolder(state) {
      return {
        ...state,
        currentHolder:
          state.currentHolder > 1
            ? state.currentHolder - 1
            : state.currentHolder,
      };
    },
    setCurrentHolder(state, { payload }) {
      return { ...state, currentHolder: payload };
    },
    toggleCurrentTypeOfIncome(state) {
      return { ...state, currentTypeOfIncome: !state.currentTypeOfIncome };
    },
    setCurrentTypeOfIncome(state, { payload }) {
      return { ...state, currentTypeOfIncome: payload };
    },
    setCleanHolder(state) {
      return { ...state, cleanHolder: !state.cleanHolder };
    },
    setArrayHolder(state, { payload }) {
      return { ...state, arrayHolders: payload };
    },
    setNameAndNif(state, { payload }) {
      return {
        ...state,
        arrayHolders: state.arrayHolders.map((e) => {
          if (e.holderNumber === payload.currentHolder) {
            return {
              ...e,
              Name: payload.Nome,
              Nif: payload.Nif,
            };
          }
          return e;
        }),
      };
    },

    setIRSTotal(state, { payload }) {
      return {
        ...state,
        arrayHolders: state.arrayHolders.map((e) => {
          if (e.holderNumber === payload.currentHolder) {
            return {
              ...e,
              IRSTotal: payload.total,
            };
          }
          return e;
        }),
      };
    },
    setReceiptsTotal(state, { payload }) {
      return {
        ...state,
        arrayHolders: state.arrayHolders.map((e) => {
          if (e.holderNumber === payload.currentHolder) {
            return {
              ...e,
              ReceiptsTotal: payload.total,
            };
          }
          return e;
        }),
      };
    },
    setIrsOrReceipts(state, { payload }) {
      return {
        ...state,
        arrayHolders: state.arrayHolders.map((e) => {
          if (e.holderNumber === state.currentHolder) {
            return {
              ...e,
              irsOrReceipts: payload.irsOrReceipts,
            };
          }
          return e;
        }),
      };
    },
    setClean(state, { payload }) {
      switch (payload) {
        case "dependentsAndPensions": {
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === state.currentHolder) {
                return {
                  ...e,
                  IRSData: {
                    ...e.IRSData,
                    dependentsAndPensions: {
                      dependentsAndPensionsCheckBox: false,
                      grossIncome: 0,
                      irsWithholdingTax: 0,
                      surchargeWithholding: 0,
                      mandatoryContributionsToSecSocial: 0,
                      netIncome: 0,
                    },
                  },
                };
              }
              return e;
            }),
          };
        }
        case "independentWithOrganizedAccounting": {
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === state.currentHolder) {
                return {
                  ...e,
                  IRSData: {
                    ...e.IRSData,
                    independentWithOrganizedAccounting: {
                      independentWithOrganizedAccountingCheckBox: false,
                      calculatedProfit: 0,
                      calculatedLoss: 0,
                      taxIncidence: 0,
                      netIncome: 0,
                    },
                  },
                };
              }
              return e;
            }),
          };
        }
        case "independentWithoutOrganizedAccountingAll": {
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === state.currentHolder) {
                return {
                  ...e,
                  IRSData: {
                    ...e.IRSData,
                    independentWithoutOrganizedAccounting: {
                      independentWithoutOrganizedAccountingCheckBox: false,
                      indComProIncome: {
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
                      },
                      agriYieldsSilvLivstck: {
                        salesProductsOtherThanThoseIncludField7: 0,
                        servicesRendered: 0,
                        incomeFromCapitalAndRealEstate: 0,
                        positiveResultOfPropertyIncome: 0,
                        operatingSubsidiesRelatedToSales: 0,
                        otherSubsidies: 0,
                        incomeFromSalesMultiannual: 0,
                        categoryBIncome: 0,
                      },
                      otherIncome: {
                        otherIncome: 0,
                      },
                      charges: 0,
                      taxIncidence: 0,
                      netIncome: 0,
                      totalGrossIncome: 0,
                    },
                  },
                };
              }
              return e;
            }),
          };
        }
        case "independentWithoutOrganizedAccounting": {
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === state.currentHolder) {
                return {
                  ...e,
                  IRSData: {
                    ...e.IRSData,
                    independentWithoutOrganizedAccounting: {
                      ...e.IRSData.independentWithoutOrganizedAccounting,
                      indComProIncome: {
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
                      },
                      agriYieldsSilvLivstck: {
                        salesProductsOtherThanThoseIncludField7: 0,
                        servicesRendered: 0,
                        incomeFromCapitalAndRealEstate: 0,
                        positiveResultOfPropertyIncome: 0,
                        operatingSubsidiesRelatedToSales: 0,
                        otherSubsidies: 0,
                        incomeFromSalesMultiannual: 0,
                        categoryBIncome: 0,
                      },
                      otherIncome: {
                        otherIncome: 0,
                      },
                      totalGrossIncome: 0,
                    },
                  },
                };
              }
              return e;
            }),
          };
        }
        case "taxTransparency": {
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === state.currentHolder) {
                return {
                  ...e,
                  IRSData: {
                    ...e.IRSData,
                    taxTransparency: {
                      taxTransparencyCheckBox: false,
                      societies: {
                        netIncome: 0,
                        withholdingTax: 0,
                      },
                      complementaryGrouping: {
                        profit: 0,
                        losses: 0,
                        withholdingTax: 0,
                      },
                      netIncome: 0,
                    },
                  },
                };
              }
              return e;
            }),
          };
        }
        case "propertyIncome": {
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === state.currentHolder) {
                return {
                  ...e,
                  IRSData: {
                    ...e.IRSData,
                    propertyIncome: {
                      propertyIncomeCheckBox: false,
                      earnedIncome: {
                        grossIncome: 0,
                        withholdingTax: 0,
                        supportedAndPaidExpenses: 0,
                      },
                      sublease: {
                        incomeReceivedByTheSublessor: 0,
                        rentPaidToLandlord: 0,
                        irsWithholdingTax: 0,
                      },
                      netIncome: 0,
                    },
                  },
                };
              }
              return e;
            }),
          };
        }
        case "exemptIncomeOrIntellectualProperty": {
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === state.currentHolder) {
                return {
                  ...e,
                  IRSData: {
                    ...e.IRSData,
                    exemptIncomeOrIntellectualProperty: {
                      exemptIncomeOrIntellectualPropertCheckBox: false,
                      exemptIncomeSubjectToAggregation: {
                        grossIncome: 0,
                        irsWithholdingTax: 0,
                      },
                      incomeFromIntellectualPropertyPartiallyExempted: {
                        income: 0,
                      },
                      netIncome: 0,
                    },
                  },
                };
              }
              return e;
            }),
          };
        }
        case "incomeEarnedAbroadForResidents": {
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === state.currentHolder) {
                return {
                  ...e,
                  IRSData: {
                    ...e.IRSData,
                    incomeEarnedAbroadForResidents: {
                      incomeEarnedAbroadForResidentsCheckBox: false,
                      incomeFromDependentWork: {
                        grossIncome: 0,
                        taxPaidAbroad: 0,
                        withholding: 0,
                        surchargeWithholding: 0,
                        contributionsToSocialProtectionSchemes: 0,
                      },
                      pensionIncome: {
                        grossIncome: 0,
                        taxPaidAbroad: 0,
                        contributionsToSocialProtectionSchemes: 0,
                      },
                      businessAndProfessionalIncome: {
                        indComProIncome: {
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
                        },
                        agriYieldsSilvLivstck: {
                          salesProductsOtherThanThoseIncludField7: 0,
                          servicesRendered: 0,
                          incomeFromCapitalAndRealEstate: 0,
                          positiveResultOfPropertyIncome: 0,
                          operatingSubsidiesRelatedToSales: 0,
                          otherSubsidies: 0,
                          incomeFromSalesMultiannual: 0,
                          categoryBIncome: 0,
                        },
                        otherIncome: {
                          otherIncome: 0,
                        },
                        grossIncome: 0,
                        taxPaidAbroad: 0,
                        contributionsToSocialProtectionSchemes: 0,
                        withholding: 0,
                      },
                      propertyIncome: {
                        netIncome: 0,
                        taxPaidAbroad: 0,
                      },
                      capitalIncome: {
                        grossIncome: 0,
                        eithholdingTaxInPortugal: 0,
                      },
                      netIncome: 0,
                    },
                  },
                };
              }
              return e;
            }),
          };
        }
        case "capitalIncome": {
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === state.currentHolder) {
                return {
                  ...e,
                  IRSData: {
                    ...e.IRSData,
                    capitalIncome: {
                      capitalIncomeCheckBox: false,
                      incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal:
                        {
                          grossIncomeYear1: 0,
                          grossIncomeYear2: 0,
                          grossIncomeYear3: 0,
                          declarationsNumber: 0,
                        },
                      incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal:
                        {
                          grossIncomeYear1: 0,
                          grossIncomeYear2: 0,
                          grossIncomeYear3: 0,
                          declarationsNumber: 0,
                        },
                      netIncome: 0,
                    },
                  },
                };
              }
              return e;
            }),
          };
        }
        case "incomeEarnedAbroadForNonResidents": {
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === state.currentHolder) {
                return {
                  ...e,
                  IRSData: {
                    ...e.IRSData,
                    incomeEarnedAbroadForNonResidents: {
                      incomeEarnedAbroadForNonResidentsCheckBok: false,
                      incomeNotExemptFromTax: {
                        grossIncome: 0,
                        taxPaidAbroad: 0,
                        taxWithheldAbroad: 0,
                        chargesForSocialSecurityorEquivalent: 0,
                      },
                      taxFreeIncome: {
                        grossIncome: 0,
                      },
                      netIncome: 0,
                    },
                  },
                };
              }
              return e;
            }),
          };
        }
        case "otherIncome": {
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === state.currentHolder) {
                return {
                  ...e,
                  IRSData: {
                    ...e.IRSData,
                    otherIncome: {
                      otherIncomeCheckBox: false,
                      otherNetIncome: 0,
                      netIncome: 0,
                    },
                  },
                };
              }
              return e;
            }),
          };
        }
        case "salaryOrPensionReceipts": {
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === state.currentHolder) {
                return {
                  ...e,
                  ReceiptsData: {
                    ...e.ReceiptsData,
                    salaryOrPensionReceipts: {
                      salaryOrPensionReceiptsCheckBox: false,
                      receipt1: 0,
                      receipt2: 0,
                      receipt3: 0,
                      receipt4: 0,
                      receipt5: 0,
                      receipt6: 0,
                      averageNetIncome: 0,
                    },
                  },
                };
              }
              return e;
            }),
          };
        }
        case "greenReceipts": {
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === state.currentHolder) {
                return {
                  ...e,
                  ReceiptsData: {
                    ...e.ReceiptsData,
                    greenReceipts: {
                      greenReceiptsCheckBox: false,
                      greenReceiptsIncomes1: {
                        indComProIncome: {
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
                        },
                        agriYieldsSilvLivstck: {
                          salesProductsOtherThanThoseIncludField7: 0,
                          servicesRendered: 0,
                          incomeFromCapitalAndRealEstate: 0,
                          positiveResultOfPropertyIncome: 0,
                          operatingSubsidiesRelatedToSales: 0,
                          otherSubsidies: 0,
                          incomeFromSalesMultiannual: 0,
                          categoryBIncome: 0,
                        },
                        otherIncome: {
                          otherIncome: 0,
                        },
                        receiptValue: 0,
                      },
                      greenReceiptsIncomes2: {
                        indComProIncome: {
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
                        },
                        agriYieldsSilvLivstck: {
                          salesProductsOtherThanThoseIncludField7: 0,
                          servicesRendered: 0,
                          incomeFromCapitalAndRealEstate: 0,
                          positiveResultOfPropertyIncome: 0,
                          operatingSubsidiesRelatedToSales: 0,
                          otherSubsidies: 0,
                          incomeFromSalesMultiannual: 0,
                          categoryBIncome: 0,
                        },
                        otherIncome: {
                          otherIncome: 0,
                        },
                        receiptValue: 0,
                      },
                      greenReceiptsIncomes3: {
                        indComProIncome: {
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
                        },
                        agriYieldsSilvLivstck: {
                          salesProductsOtherThanThoseIncludField7: 0,
                          servicesRendered: 0,
                          incomeFromCapitalAndRealEstate: 0,
                          positiveResultOfPropertyIncome: 0,
                          operatingSubsidiesRelatedToSales: 0,
                          otherSubsidies: 0,
                          incomeFromSalesMultiannual: 0,
                          categoryBIncome: 0,
                        },
                        otherIncome: {
                          otherIncome: 0,
                        },
                        receiptValue: 0,
                      },
                      greenReceiptsIncomes4: {
                        indComProIncome: {
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
                        },
                        agriYieldsSilvLivstck: {
                          salesProductsOtherThanThoseIncludField7: 0,
                          servicesRendered: 0,
                          incomeFromCapitalAndRealEstate: 0,
                          positiveResultOfPropertyIncome: 0,
                          operatingSubsidiesRelatedToSales: 0,
                          otherSubsidies: 0,
                          incomeFromSalesMultiannual: 0,
                          categoryBIncome: 0,
                        },
                        otherIncome: {
                          otherIncome: 0,
                        },
                        receiptValue: 0,
                      },
                      greenReceiptsIncomes5: {
                        indComProIncome: {
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
                        },
                        agriYieldsSilvLivstck: {
                          salesProductsOtherThanThoseIncludField7: 0,
                          servicesRendered: 0,
                          incomeFromCapitalAndRealEstate: 0,
                          positiveResultOfPropertyIncome: 0,
                          operatingSubsidiesRelatedToSales: 0,
                          otherSubsidies: 0,
                          incomeFromSalesMultiannual: 0,
                          categoryBIncome: 0,
                        },
                        otherIncome: {
                          otherIncome: 0,
                        },
                        receiptValue: 0,
                      },
                      greenReceiptsIncomes6: {
                        indComProIncome: {
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
                        },
                        agriYieldsSilvLivstck: {
                          salesProductsOtherThanThoseIncludField7: 0,
                          servicesRendered: 0,
                          incomeFromCapitalAndRealEstate: 0,
                          positiveResultOfPropertyIncome: 0,
                          operatingSubsidiesRelatedToSales: 0,
                          otherSubsidies: 0,
                          incomeFromSalesMultiannual: 0,
                          categoryBIncome: 0,
                        },
                        otherIncome: {
                          otherIncome: 0,
                        },
                        receiptValue: 0,
                      },
                      averageNetIncome: 0,
                    },
                  },
                };
              }
              return e;
            }),
          };
        }
        case "propertyIncomeReceipts": {
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === state.currentHolder) {
                return {
                  ...e,
                  ReceiptsData: {
                    ...e.ReceiptsData,
                    propertyIncomeReceipts: {
                      propertyIncomeRecCheckBox: false,
                      receipt1: 0,
                      receipt2: 0,
                      receipt3: 0,
                      receipt4: 0,
                      receipt5: 0,
                      receipt6: 0,
                      averageNetIncome: 0,
                    },
                  },
                };
              }
              return e;
            }),
          };
        }
        case "researchScholarshipsInternshipReceipts": {
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === state.currentHolder) {
                return {
                  ...e,
                  ReceiptsData: {
                    ...e.ReceiptsData,
                    researchScholarshipsInternshipReceipts: {
                      researchScholarReceiptsCheckBox: false,
                      receipt1: 0,
                      receipt2: 0,
                      receipt3: 0,
                      receipt4: 0,
                      receipt5: 0,
                      receipt6: 0,
                      averageNetIncome: 0,
                    },
                  },
                };
              }
              return e;
            }),
          };
        }
        case "alimonyReceipts": {
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === state.currentHolder) {
                return {
                  ...e,
                  ReceiptsData: {
                    ...e.ReceiptsData,
                    alimonyReceipts: {
                      almonyReceiptsCheckBox: false,
                      receipt1: 0,
                      receipt2: 0,
                      receipt3: 0,
                      receipt4: 0,
                      receipt5: 0,
                      receipt6: 0,
                      averageNetIncome: 0,
                    },
                  },
                };
              }
              return e;
            }),
          };
        }
        case "resetIRS": {
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === state.currentHolder) {
                return {
                  ...e,
                  IRSData: {
                    ...e.IRSData,
                    ...holderIRSDataInitialState,
                  },
                };
              }
              return e;
            }),
          };
        }
        case "resetReceipts": {
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === state.currentHolder) {
                return {
                  ...e,
                  ReceiptsData: {
                    ...e.ReceiptsData,
                    ...holderReceiptsDataInitialState,
                  },
                };
              }
              return e;
            }),
          };
        }
        case "dependentsAndPensions2": {
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === state.currentHolder) {
                return {
                  ...e,
                  IRSData: {
                    ...e.IRSData,
                    dependentsAndPensions: {
                      ...e.IRSData.dependentsAndPensions,
                      grossIncome: 0,
                      irsWithholdingTax: 0,
                      surchargeWithholding: 0,
                      mandatoryContributionsToSecSocial: 0,
                      netIncome: 0,
                    },
                  },
                };
              }
              return e;
            }),
          };
        }
        case "independentWithOrganizedAccounting2": {
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === state.currentHolder) {
                return {
                  ...e,
                  IRSData: {
                    ...e.IRSData,
                    independentWithOrganizedAccounting: {
                      ...e.IRSData.independentWithOrganizedAccounting,
                      calculatedProfit: 0,
                      calculatedLoss: 0,
                      taxIncidence: 0,
                      netIncome: 0,
                    },
                  },
                };
              }
              return e;
            }),
          };
        }
        case "independentWithoutOrganizedAccountingAll2": {
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === state.currentHolder) {
                return {
                  ...e,
                  IRSData: {
                    ...e.IRSData,
                    independentWithoutOrganizedAccounting: {
                      ...e.IRSData.independentWithoutOrganizedAccounting,
                      indComProIncome: {
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
                      },
                      agriYieldsSilvLivstck: {
                        salesProductsOtherThanThoseIncludField7: 0,
                        servicesRendered: 0,
                        incomeFromCapitalAndRealEstate: 0,
                        positiveResultOfPropertyIncome: 0,
                        operatingSubsidiesRelatedToSales: 0,
                        otherSubsidies: 0,
                        incomeFromSalesMultiannual: 0,
                        categoryBIncome: 0,
                      },
                      otherIncome: {
                        otherIncome: 0,
                      },
                      charges: 0,
                      taxIncidence: 0,
                      netIncome: 0,
                      totalGrossIncome: 0,
                    },
                  },
                };
              }
              return e;
            }),
          };
        }
        case "independentWithoutOrganizedAccounting2": {
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === state.currentHolder) {
                return {
                  ...e,
                  IRSData: {
                    ...e.IRSData,
                    independentWithoutOrganizedAccounting: {
                      ...e.IRSData.independentWithoutOrganizedAccounting,
                      indComProIncome: {
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
                      },
                      agriYieldsSilvLivstck: {
                        salesProductsOtherThanThoseIncludField7: 0,
                        servicesRendered: 0,
                        incomeFromCapitalAndRealEstate: 0,
                        positiveResultOfPropertyIncome: 0,
                        operatingSubsidiesRelatedToSales: 0,
                        otherSubsidies: 0,
                        incomeFromSalesMultiannual: 0,
                        categoryBIncome: 0,
                      },
                      otherIncome: {
                        otherIncome: 0,
                      },
                      totalGrossIncome: 0,
                      taxIncidence: 0,
                    },
                  },
                };
              }
              return e;
            }),
          };
        }
        case "taxTransparency2": {
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === state.currentHolder) {
                return {
                  ...e,
                  IRSData: {
                    ...e.IRSData,
                    taxTransparency: {
                      ...e.IRSData.taxTransparency,
                      societies: {
                        netIncome: 0,
                        withholdingTax: 0,
                      },
                      complementaryGrouping: {
                        profit: 0,
                        losses: 0,
                        withholdingTax: 0,
                      },
                      netIncome: 0,
                    },
                  },
                };
              }
              return e;
            }),
          };
        }
        case "propertyIncome2": {
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === state.currentHolder) {
                return {
                  ...e,
                  IRSData: {
                    ...e.IRSData,
                    propertyIncome: {
                      ...e.IRSData.propertyIncome,
                      earnedIncome: {
                        grossIncome: 0,
                        withholdingTax: 0,
                        supportedAndPaidExpenses: 0,
                      },
                      sublease: {
                        incomeReceivedByTheSublessor: 0,
                        rentPaidToLandlord: 0,
                        irsWithholdingTax: 0,
                      },
                      netIncome: 0,
                    },
                  },
                };
              }
              return e;
            }),
          };
        }
        case "exemptIncomeOrIntellectualProperty2": {
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === state.currentHolder) {
                return {
                  ...e,
                  IRSData: {
                    ...e.IRSData,
                    exemptIncomeOrIntellectualProperty: {
                      ...e.IRSData.exemptIncomeOrIntellectualProperty,
                      exemptIncomeSubjectToAggregation: {
                        grossIncome: 0,
                        irsWithholdingTax: 0,
                      },
                      incomeFromIntellectualPropertyPartiallyExempted: {
                        income: 0,
                      },
                      netIncome: 0,
                    },
                  },
                };
              }
              return e;
            }),
          };
        }
        case "incomeEarnedAbroadForResidents2": {
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === state.currentHolder) {
                return {
                  ...e,
                  IRSData: {
                    ...e.IRSData,
                    incomeEarnedAbroadForResidents: {
                      ...e.IRSData.incomeEarnedAbroadForResidents,
                      incomeFromDependentWork: {
                        grossIncome: 0,
                        taxPaidAbroad: 0,
                        withholding: 0,
                        surchargeWithholding: 0,
                        contributionsToSocialProtectionSchemes: 0,
                      },
                      pensionIncome: {
                        grossIncome: 0,
                        taxPaidAbroad: 0,
                        contributionsToSocialProtectionSchemes: 0,
                      },
                      businessAndProfessionalIncome: {
                        indComProIncome: {
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
                        },
                        agriYieldsSilvLivstck: {
                          salesProductsOtherThanThoseIncludField7: 0,
                          servicesRendered: 0,
                          incomeFromCapitalAndRealEstate: 0,
                          positiveResultOfPropertyIncome: 0,
                          operatingSubsidiesRelatedToSales: 0,
                          otherSubsidies: 0,
                          incomeFromSalesMultiannual: 0,
                          categoryBIncome: 0,
                        },
                        otherIncome: {
                          otherIncome: 0,
                        },
                        grossIncome: 0,
                        taxPaidAbroad: 0,
                        contributionsToSocialProtectionSchemes: 0,
                        withholding: 0,
                      },
                      propertyIncome: {
                        netIncome: 0,
                        taxPaidAbroad: 0,
                      },
                      capitalIncome: {
                        grossIncome: 0,
                        eithholdingTaxInPortugal: 0,
                      },
                      netIncome: 0,
                    },
                  },
                };
              }
              return e;
            }),
          };
        }
        case "capitalIncome2": {
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === state.currentHolder) {
                return {
                  ...e,
                  IRSData: {
                    ...e.IRSData,
                    capitalIncome: {
                      ...e.IRSData.capitalIncome,
                      incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal:
                        {
                          grossIncomeYear1: 0,
                          grossIncomeYear2: 0,
                          grossIncomeYear3: 0,
                          declarationsNumber: 0,
                        },
                      incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal:
                        {
                          grossIncomeYear1: 0,
                          grossIncomeYear2: 0,
                          grossIncomeYear3: 0,
                          declarationsNumber: 0,
                        },
                      netIncome: 0,
                    },
                  },
                };
              }
              return e;
            }),
          };
        }
        case "incomeEarnedAbroadForNonResidents2": {
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === state.currentHolder) {
                return {
                  ...e,
                  IRSData: {
                    ...e.IRSData,
                    incomeEarnedAbroadForNonResidents: {
                      ...e.IRSData.incomeEarnedAbroadForNonResidents,
                      incomeNotExemptFromTax: {
                        grossIncome: 0,
                        taxPaidAbroad: 0,
                        taxWithheldAbroad: 0,
                        chargesForSocialSecurityorEquivalent: 0,
                      },
                      taxFreeIncome: {
                        grossIncome: 0,
                      },
                      netIncome: 0,
                    },
                  },
                };
              }
              return e;
            }),
          };
        }
        case "otherIncome2": {
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === state.currentHolder) {
                return {
                  ...e,
                  IRSData: {
                    ...e.IRSData,
                    otherIncome: {
                      ...e.IRSData.otherIncome,
                      otherNetIncome: 0,
                      netIncome: 0,
                    },
                  },
                };
              }
              return e;
            }),
          };
        }
        case "salaryOrPensionReceipts2": {
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === state.currentHolder) {
                return {
                  ...e,
                  ReceiptsData: {
                    ...e.ReceiptsData,
                    salaryOrPensionReceipts: {
                      ...e.ReceiptsData.salaryOrPensionReceipts,
                      receipt1: 0,
                      receipt2: 0,
                      receipt3: 0,
                      receipt4: 0,
                      receipt5: 0,
                      receipt6: 0,
                      averageNetIncome: 0,
                    },
                  },
                };
              }
              return e;
            }),
          };
        }
        case "greenReceipts2": {
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === state.currentHolder) {
                return {
                  ...e,
                  ReceiptsData: {
                    ...e.ReceiptsData,
                    greenReceipts: {
                      ...e.ReceiptsData.greenReceipts,
                      greenReceiptsIncomes1: {
                        indComProIncome: {
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
                        },
                        agriYieldsSilvLivstck: {
                          salesProductsOtherThanThoseIncludField7: 0,
                          servicesRendered: 0,
                          incomeFromCapitalAndRealEstate: 0,
                          positiveResultOfPropertyIncome: 0,
                          operatingSubsidiesRelatedToSales: 0,
                          otherSubsidies: 0,
                          incomeFromSalesMultiannual: 0,
                          categoryBIncome: 0,
                        },
                        otherIncome: {
                          otherIncome: 0,
                        },
                        receiptValue: 0,
                      },
                      greenReceiptsIncomes2: {
                        indComProIncome: {
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
                        },
                        agriYieldsSilvLivstck: {
                          salesProductsOtherThanThoseIncludField7: 0,
                          servicesRendered: 0,
                          incomeFromCapitalAndRealEstate: 0,
                          positiveResultOfPropertyIncome: 0,
                          operatingSubsidiesRelatedToSales: 0,
                          otherSubsidies: 0,
                          incomeFromSalesMultiannual: 0,
                          categoryBIncome: 0,
                        },
                        otherIncome: {
                          otherIncome: 0,
                        },
                        receiptValue: 0,
                      },
                      greenReceiptsIncomes3: {
                        indComProIncome: {
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
                        },
                        agriYieldsSilvLivstck: {
                          salesProductsOtherThanThoseIncludField7: 0,
                          servicesRendered: 0,
                          incomeFromCapitalAndRealEstate: 0,
                          positiveResultOfPropertyIncome: 0,
                          operatingSubsidiesRelatedToSales: 0,
                          otherSubsidies: 0,
                          incomeFromSalesMultiannual: 0,
                          categoryBIncome: 0,
                        },
                        otherIncome: {
                          otherIncome: 0,
                        },
                        receiptValue: 0,
                      },
                      greenReceiptsIncomes4: {
                        indComProIncome: {
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
                        },
                        agriYieldsSilvLivstck: {
                          salesProductsOtherThanThoseIncludField7: 0,
                          servicesRendered: 0,
                          incomeFromCapitalAndRealEstate: 0,
                          positiveResultOfPropertyIncome: 0,
                          operatingSubsidiesRelatedToSales: 0,
                          otherSubsidies: 0,
                          incomeFromSalesMultiannual: 0,
                          categoryBIncome: 0,
                        },
                        otherIncome: {
                          otherIncome: 0,
                        },
                        receiptValue: 0,
                      },
                      greenReceiptsIncomes5: {
                        indComProIncome: {
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
                        },
                        agriYieldsSilvLivstck: {
                          salesProductsOtherThanThoseIncludField7: 0,
                          servicesRendered: 0,
                          incomeFromCapitalAndRealEstate: 0,
                          positiveResultOfPropertyIncome: 0,
                          operatingSubsidiesRelatedToSales: 0,
                          otherSubsidies: 0,
                          incomeFromSalesMultiannual: 0,
                          categoryBIncome: 0,
                        },
                        otherIncome: {
                          otherIncome: 0,
                        },
                        receiptValue: 0,
                      },
                      greenReceiptsIncomes6: {
                        indComProIncome: {
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
                        },
                        agriYieldsSilvLivstck: {
                          salesProductsOtherThanThoseIncludField7: 0,
                          servicesRendered: 0,
                          incomeFromCapitalAndRealEstate: 0,
                          positiveResultOfPropertyIncome: 0,
                          operatingSubsidiesRelatedToSales: 0,
                          otherSubsidies: 0,
                          incomeFromSalesMultiannual: 0,
                          categoryBIncome: 0,
                        },
                        otherIncome: {
                          otherIncome: 0,
                        },
                        receiptValue: 0,
                      },
                      averageNetIncome: 0,
                    },
                  },
                };
              }
              return e;
            }),
          };
        }
        case "propertyIncomeReceipts2": {
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === state.currentHolder) {
                return {
                  ...e,
                  ReceiptsData: {
                    ...e.ReceiptsData,
                    propertyIncomeReceipts: {
                      ...e.ReceiptsData.propertyIncomeReceipts,
                      receipt1: 0,
                      receipt2: 0,
                      receipt3: 0,
                      receipt4: 0,
                      receipt5: 0,
                      receipt6: 0,
                      averageNetIncome: 0,
                    },
                  },
                };
              }
              return e;
            }),
          };
        }
        case "researchScholarshipsInternshipReceipts2": {
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === state.currentHolder) {
                return {
                  ...e,
                  ReceiptsData: {
                    ...e.ReceiptsData,
                    researchScholarshipsInternshipReceipts: {
                      ...e.ReceiptsData.researchScholarshipsInternshipReceipts,
                      receipt1: 0,
                      receipt2: 0,
                      receipt3: 0,
                      receipt4: 0,
                      receipt5: 0,
                      receipt6: 0,
                      averageNetIncome: 0,
                    },
                  },
                };
              }
              return e;
            }),
          };
        }
        case "alimonyReceipts2": {
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === state.currentHolder) {
                return {
                  ...e,
                  ReceiptsData: {
                    ...e.ReceiptsData,
                    alimonyReceipts: {
                      ...e.ReceiptsData.alimonyReceipts,
                      receipt1: 0,
                      receipt2: 0,
                      receipt3: 0,
                      receipt4: 0,
                      receipt5: 0,
                      receipt6: 0,
                      averageNetIncome: 0,
                    },
                  },
                };
              }
              return e;
            }),
          };
        }

        default:
      }
      return state;
    },

    setDependentsAndPensions(state, { payload }) {
      return {
        ...state,
        arrayHolders: state.arrayHolders.map((e, index) => {
          if (e.holderNumber === state.currentHolder) {
            return {
              ...e,
              IRSData: {
                ...e.IRSData,
                dependentsAndPensions: {
                  ...state.arrayHolders[index].IRSData.dependentsAndPensions,
                  ...payload.data,
                  netIncome: calculateNetIncomeDependentsAndPensions({
                    ...state.arrayHolders[index].IRSData.dependentsAndPensions,
                    ...payload.data,
                  }),
                },
              },
            };
          }
          return e;
        }),
      };
    },
    setIndependentWithOrganizedAccounting(state, { payload }) {
      return {
        ...state,
        arrayHolders: state.arrayHolders.map((e, index) => {
          if (e.holderNumber === state.currentHolder) {
            return {
              ...e,
              IRSData: {
                ...e.IRSData,
                independentWithOrganizedAccounting: {
                  ...state.arrayHolders[index].IRSData
                    .independentWithOrganizedAccounting,
                  ...payload.data,
                  netIncome:
                    calculateNetIncomeIndependentWithOrganizedAccounting({
                      ...state.arrayHolders[index].IRSData
                        .independentWithOrganizedAccounting,
                      ...payload.data,
                      taxIncidence:
                        payload?.data?.calculatedProfit! > 0
                          ? (payload?.data?.calculatedProfit! || 0) *
                            payload.taxIncidenceRate
                          : 0,
                    }),
                  taxIncidence:
                    payload?.data?.calculatedProfit! > 0
                      ? (payload?.data?.calculatedProfit! || 0) *
                        payload.taxIncidenceRate
                      : 0,
                },
              },
            };
          }
          return e;
        }),
      };
    },
    setIndependentWithoutOrganizedAccounting(state, { payload }) {
      return {
        ...state,
        arrayHolders: state.arrayHolders.map((e, index) => {
          if (e.holderNumber === state.currentHolder) {
            return {
              ...e,
              IRSData: {
                ...e.IRSData,
                independentWithoutOrganizedAccounting: {
                  ...state.arrayHolders[index].IRSData
                    .independentWithoutOrganizedAccounting,
                  ...payload.data,
                },
              },
            };
          }
          return e;
        }),
      };
    },
    setTaxTransparency(state, { payload }) {
      return {
        ...state,
        arrayHolders: state.arrayHolders.map((e, index) => {
          if (e.holderNumber === state.currentHolder) {
            return {
              ...e,
              IRSData: {
                ...e.IRSData,
                taxTransparency: {
                  ...state.arrayHolders[index].IRSData.taxTransparency,
                  ...payload.data,
                  netIncome: calculateTaxTransparency({
                    ...state.arrayHolders[index].IRSData.taxTransparency,
                    ...payload.data,
                  }),
                },
              },
            };
          }
          return e;
        }),
      };
    },
    setPropertyIncome(state, { payload }) {
      return {
        ...state,
        arrayHolders: state.arrayHolders.map((e, index) => {
          if (e.holderNumber === state.currentHolder) {
            return {
              ...e,
              IRSData: {
                ...e.IRSData,
                propertyIncome: {
                  ...state.arrayHolders[index].IRSData.propertyIncome,
                  ...payload.data,
                  netIncome: calculateNetIncomePropertyIncome({
                    ...state.arrayHolders[index].IRSData.propertyIncome,
                    ...payload.data,
                  }),
                },
              },
            };
          }
          return e;
        }),
      };
    },
    setExemptIncomeOrIntellectualProperty(state, { payload }) {
      return {
        ...state,
        arrayHolders: state.arrayHolders.map((e, index) => {
          if (e.holderNumber === state.currentHolder) {
            return {
              ...e,
              IRSData: {
                ...e.IRSData,
                exemptIncomeOrIntellectualProperty: {
                  ...state.arrayHolders[index].IRSData
                    .exemptIncomeOrIntellectualProperty,
                  ...payload.data,
                  netIncome: calculateExemptIncomeOrIntellectualProperty({
                    ...state.arrayHolders[index].IRSData
                      .exemptIncomeOrIntellectualProperty,
                    ...payload.data,
                  }),
                },
              },
            };
          }
          return e;
        }),
      };
    },
    setIncomeEarnedAbroadForResidents(state, { payload }) {
      return {
        ...state,
        arrayHolders: state.arrayHolders.map((e, index) => {
          if (e.holderNumber === state.currentHolder) {
            return {
              ...e,
              IRSData: {
                ...e.IRSData,
                incomeEarnedAbroadForResidents: {
                  ...state.arrayHolders[index].IRSData
                    .incomeEarnedAbroadForResidents,
                  ...payload.data,
                  netIncome: calculateIncomeEarnedAbroadForResidents({
                    ...state.arrayHolders[index].IRSData
                      .incomeEarnedAbroadForResidents,
                    ...payload.data,
                  }),
                },
              },
            };
          }
          return e;
        }),
      };
    },
    setCapitalIncome(state, { payload }) {
      return {
        ...state,
        arrayHolders: state.arrayHolders.map((e, index) => {
          if (e.holderNumber === state.currentHolder) {
            return {
              ...e,
              IRSData: {
                ...e.IRSData,
                capitalIncome: {
                  ...state.arrayHolders[index].IRSData.capitalIncome,
                  ...payload.data,
                  netIncome: calculateCapitalIncome({
                    ...state.arrayHolders[index].IRSData.capitalIncome,
                    ...payload.data,
                  }),
                },
              },
            };
          }
          return e;
        }),
      };
    },
    setIncomeEarnedAbroadForNonResidents(state, { payload }) {
      return {
        ...state,
        arrayHolders: state.arrayHolders.map((e, index) => {
          if (e.holderNumber === state.currentHolder) {
            return {
              ...e,
              IRSData: {
                ...e.IRSData,
                incomeEarnedAbroadForNonResidents: {
                  ...state.arrayHolders[index].IRSData
                    .incomeEarnedAbroadForNonResidents,
                  ...payload.data,
                  netIncome: calculateIncomeEarnedAbroadForNonResidents({
                    ...state.arrayHolders[index].IRSData
                      .incomeEarnedAbroadForNonResidents,
                    ...payload.data,
                    grossIncomeNetTaxRate: state.taxes.taxFreeIncomeValue,
                  }),
                },
              },
            };
          }
          return e;
        }),
      };
    },
    setOtherIncome(state, { payload }) {
      return {
        ...state,
        arrayHolders: state.arrayHolders.map((e, index) => {
          if (e.holderNumber === state.currentHolder) {
            return {
              ...e,
              IRSData: {
                ...e.IRSData,
                otherIncome: {
                  ...state.arrayHolders[index].IRSData.otherIncome,
                  ...payload.data,
                  netIncome: calculateOtherIncome({
                    ...state.arrayHolders[index].IRSData.otherIncome,
                    ...payload.data,
                  }),
                },
              },
            };
          }
          return e;
        }),
      };
    },

    setSalaryOrPensionReceipts(state, { payload }) {
      return {
        ...state,
        arrayHolders: state.arrayHolders.map((e, index) => {
          if (e.holderNumber === state.currentHolder) {
            return {
              ...e,
              ReceiptsData: {
                ...e.ReceiptsData,
                salaryOrPensionReceipts: {
                  ...state.arrayHolders[index].ReceiptsData
                    .salaryOrPensionReceipts,
                  ...payload.data,
                  averageNetIncome: calculateReceiptsAverageTotal({
                    ...state.arrayHolders[index].ReceiptsData
                      .salaryOrPensionReceipts,
                    ...payload.data,
                  }),
                },
              },
            };
          }
          return e;
        }),
      };
    },
    setGreenReceipts(state, { payload }) {
      return {
        ...state,
        arrayHolders: state.arrayHolders.map((e, index) => {
          if (e.holderNumber === state.currentHolder) {
            return {
              ...e,
              ReceiptsData: {
                ...e.ReceiptsData,
                greenReceipts: {
                  ...state.arrayHolders[index].ReceiptsData.greenReceipts,
                  ...payload.data,
                  averageNetIncome: calculateGreenReceiptsAverageTotal({
                    ...state.arrayHolders[index].ReceiptsData.greenReceipts,
                    ...payload.data,
                  }),
                },
              },
            };
          }
          return e;
        }),
      };
    },
    setReiceptsPropertyIncome(state, { payload }) {
      return {
        ...state,
        arrayHolders: state.arrayHolders.map((e, index) => {
          if (e.holderNumber === state.currentHolder) {
            return {
              ...e,
              ReceiptsData: {
                ...e.ReceiptsData,
                propertyIncomeReceipts: {
                  ...state.arrayHolders[index].ReceiptsData
                    .propertyIncomeReceipts,
                  ...payload.data,
                  averageNetIncome: calculateReceiptsAverageTotal({
                    ...state.arrayHolders[index].ReceiptsData
                      .propertyIncomeReceipts,
                    ...payload.data,
                  }),
                  propertyIncomeTax: payload.propertyIncomeTax,
                },
              },
            };
          }
          return e;
        }),
      };
    },
    setResearchScholarshipsInternship(state, { payload }) {
      return {
        ...state,
        arrayHolders: state.arrayHolders.map((e, index) => {
          if (e.holderNumber === state.currentHolder) {
            return {
              ...e,
              ReceiptsData: {
                ...e.ReceiptsData,
                researchScholarshipsInternshipReceipts: {
                  ...state.arrayHolders[index].ReceiptsData
                    .researchScholarshipsInternshipReceipts,
                  ...payload.data,
                  averageNetIncome: calculateReceiptsAverageTotal({
                    ...state.arrayHolders[index].ReceiptsData
                      .researchScholarshipsInternshipReceipts,
                    ...payload.data,
                  }),
                },
              },
            };
          }
          return e;
        }),
      };
    },
    setAlimony(state, { payload }) {
      return {
        ...state,
        arrayHolders: state.arrayHolders.map((e, index) => {
          if (e.holderNumber === state.currentHolder) {
            return {
              ...e,
              ReceiptsData: {
                ...e.ReceiptsData,
                alimonyReceipts: {
                  ...state.arrayHolders[index].ReceiptsData.alimonyReceipts,
                  ...payload.data,
                  averageNetIncome: calculateReceiptsAverageTotal({
                    ...state.arrayHolders[index].ReceiptsData.alimonyReceipts,
                    ...payload.data,
                  }),
                },
              },
            };
          }
          return e;
        }),
      };
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(createContextThunk.pending, (state) => {
        return state;
      })
      .addCase(createContextThunk.rejected, (state) => {
        return state;
      })
      .addCase(createContextThunk.fulfilled, (state, { payload }) => {
        return { ...state, SimulationId: payload.simulationId };
      })
      .addCase(getContextThunk.pending, (state) => {
        return state;
      })
      .addCase(getContextThunk.rejected, (state) => {
        return state;
      })
      .addCase(getContextThunk.fulfilled, (state, { payload }) => {
        const {
          simulationId,
          numberOfHolders,
          currentHolder,
          currentTypeOfIncome,
          cleanHolder,
          holders,
        } = payload;

        const data = holders.map((elem: any) => {
          const { simulationInputsIRS, simulationInputsRec } = elem;

          return {
            holderNumber: elem.holder,
            Name: simulationInputsIRS
              ? simulationInputsIRS.holderName
              : simulationInputsRec.holderName,
            Nif: simulationInputsIRS
              ? simulationInputsIRS.holderNif
              : simulationInputsRec.holderNif,
            irsOrReceipts:
              simulationInputsRec &&
              simulationInputsRec?.mostRepresentativeCheckBok!,
            IRSTotal: simulationInputsIRS?.totalNetIncome!,
            ReceiptsTotal: simulationInputsRec?.totalNetIncome!,
            IRSData: {
              dependentsAndPensions:
                simulationInputsIRS?.dependentsAndPensions!,
              independentWithOrganizedAccounting:
                simulationInputsIRS?.independentWithOrganizedAccounting!,
              independentWithoutOrganizedAccounting:
                simulationInputsIRS?.independentWithoutOrganizedAccounting!,
              taxTransparency: simulationInputsIRS?.taxTransparency!,
              propertyIncome: simulationInputsIRS?.propertyIncome!,
              exemptIncomeOrIntellectualProperty:
                simulationInputsIRS?.exemptIncomeOrIntellectualProperty!,
              incomeEarnedAbroadForResidents:
                simulationInputsIRS?.incomeEarnedAbroadForResidents!,
              capitalIncome: simulationInputsIRS?.capitalIncome!,
              incomeEarnedAbroadForNonResidents:
                simulationInputsIRS?.incomeEarnedAbroadForNonResidents!,
              otherIncome: simulationInputsIRS?.otherIncome!,
            },
            ReceiptsData: {
              salaryOrPensionReceipts:
                simulationInputsRec?.salaryOrPensionReceipts!,
              greenReceipts: simulationInputsRec?.greenReceipts!,
              propertyIncomeReceipts:
                simulationInputsRec?.propertyIncomeReceipts!,
              researchScholarshipsInternshipReceipts:
                simulationInputsRec?.researchScholarshipsInternshipReceipts!,
              alimonyReceipts: simulationInputsRec?.alimonyReceipts!,
            },
          };
        });

        return {
          ...state,
          SimulationId: simulationId,
          Holders: numberOfHolders,
          currentHolder,
          currentTypeOfIncome,
          cleanHolder,
          arrayHolders: data,
        };
      })
      .addCase(findBySimulationIdAndHolderThunk.pending, (state) => {
        return state;
      })
      .addCase(findBySimulationIdAndHolderThunk.rejected, (state) => {
        return state;
      })
      .addCase(
        findBySimulationIdAndHolderThunk.fulfilled,
        (state, { payload }) => {
          const data = {
            currentHolder: payload.holder,
            data: {
              dependentsAndPensions: { ...payload.dependentsAndPensions },
              independentWithOrganizedAccounting: {
                ...payload.independentWithOrganizedAccounting,
              },
              independentWithoutOrganizedAccounting: {
                ...payload.independentWithoutOrganizedAccounting,
              },
              taxTransparency: {
                ...payload.taxTransparency,
              },
              propertyIncome: { ...payload.propertyIncome },
              exemptIncomeOrIntellectualProperty: {
                ...payload.exemptIncomeOrIntellectualProperty,
              },
              incomeEarnedAbroadForResidents: {
                ...payload.incomeEarnedAbroadForResidents,
              },
              capitalIncome: { ...payload.capitalIncome },
              incomeEarnedAbroadForNonResidents: {
                ...payload.incomeEarnedAbroadForNonResidents,
              },
              otherIncome: { ...payload.otherIncome },
            },
          };
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === data.currentHolder) {
                return {
                  ...e,
                  IRSData: {
                    ...data.data,
                  },
                };
              }
              return e;
            }),
          };
        }
      )
      .addCase(findBySimulationIdAndHolderReceiptsThunk.pending, (state) => {
        return state;
      })
      .addCase(findBySimulationIdAndHolderReceiptsThunk.rejected, (state) => {
        return state;
      })
      .addCase(
        findBySimulationIdAndHolderReceiptsThunk.fulfilled,
        (state, { payload }) => {
          const data = {
            currentHolder: payload.holder,
            data: {
              salaryOrPensionReceipts: { ...payload.salaryOrPensionReceipts },
              greenReceipts: {
                ...payload.greenReceipts,
              },
              propertyIncomeReceipts: {
                ...payload.propertyIncomeReceipts,
              },
              researchScholarshipsInternshipReceipts: {
                ...payload.researchScholarshipsInternshipReceipts,
              },
              alimonyReceipts: {
                ...payload.alimonyReceipts,
              },
            },
          };
          return {
            ...state,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === data.currentHolder) {
                return {
                  ...e,
                  ReceiptsData: {
                    ...data.data,
                  },
                };
              }
              return e;
            }),
          };
        }
      )
      .addCase(getTaxesThunk.pending, (state) => {
        return state;
      })
      .addCase(getTaxesThunk.rejected, (state) => {
        return state;
      })
      .addCase(getTaxesThunk.fulfilled, (state, { payload }) => {
        return { ...state, taxes: { ...payload } };
      })
      .addCase(simulationResultsThunk.pending, (state) => {
        return state;
      })
      .addCase(simulationResultsThunk.rejected, (state) => {
        return state;
      })
      .addCase(simulationResultsThunk.fulfilled, (state, { payload }) => {
        const arrayHolders = payload.holders.map((elem: any) => {
          const { simulationInputsIRS, simulationInputsRec } = elem;

          return {
            holderNumber: elem.holder,
            Name: simulationInputsIRS
              ? simulationInputsIRS.holderName
              : simulationInputsRec.holderName,
            Nif: simulationInputsIRS
              ? simulationInputsIRS.holderNif
              : simulationInputsRec.holderNif,
            irsOrReceipts: simulationInputsRec?.mostRepresentativeCheckBok!,
            IRSTotal: simulationInputsIRS?.totalNetIncome!,
            ReceiptsTotal: simulationInputsRec?.totalNetIncome!,
            IRSData: {
              dependentsAndPensions:
                simulationInputsIRS?.dependentsAndPensions!,
              independentWithOrganizedAccounting:
                simulationInputsIRS?.independentWithOrganizedAccounting!,
              independentWithoutOrganizedAccounting:
                simulationInputsIRS?.independentWithoutOrganizedAccounting!,
              taxTransparency: simulationInputsIRS?.taxTransparency!,
              propertyIncome: simulationInputsIRS?.propertyIncome!,
              exemptIncomeOrIntellectualProperty:
                simulationInputsIRS?.exemptIncomeOrIntellectualProperty!,
              incomeEarnedAbroadForResidents:
                simulationInputsIRS?.incomeEarnedAbroadForResidents!,
              capitalIncome: simulationInputsIRS?.capitalIncome!,
              incomeEarnedAbroadForNonResidents:
                simulationInputsIRS?.incomeEarnedAbroadForNonResidents!,
              otherIncome: simulationInputsIRS?.otherIncome!,
            },
            ReceiptsData: {
              salaryOrPensionReceipts:
                simulationInputsRec?.salaryOrPensionReceipts!,
              greenReceipts: simulationInputsRec?.greenReceipts!,
              propertyIncomeReceipts:
                simulationInputsRec?.propertyIncomeReceipts!,
              researchScholarshipsInternshipReceipts:
                simulationInputsRec?.researchScholarshipsInternshipReceipts!,
              alimonyReceipts: simulationInputsRec?.alimonyReceipts!,
            },
          };
        });

        return {
          ...state,
          arrayHolders,
          aggregator: {
            aggDependentsPensions: payload?.aggDependentsPensions!,
            aggIndependentWith: payload?.aggIndependentWith!,
            aggIndependentWithout: payload?.aggIndependentWithout!,
            aggTaxTransparency: payload?.aggTaxTransparency!,
            aggPropertyIncome: payload?.aggPropertyIncome!,
            aggIntellectualProper: payload?.aggIntellectualProper!,
            aggAbroadForResidents: payload?.aggAbroadForResidents!,
            aggCapitalIncome: payload?.aggCapitalIncome!,
            aggAbroadForNonResidents: payload?.aggAbroadForNonResidents!,
            aggOtherIncome: payload?.aggOtherIncome!,
            totalNetIncomeIrs: payload?.totalNetIncomeIrs!,
            aggSalaryOrPensionReceipts: payload?.aggSalaryOrPensionReceipts!,
            aggGreenReceipts: payload?.aggGreenReceipts!,
            aggPropertyIncomeReceipts: payload?.aggPropertyIncomeReceipts!,
            aggResearchInternshipReceipts:
              payload?.aggResearchInternshipReceipts!,
            aggAlimonyReceipts: payload?.aggAlimonyReceipts!,
            totalNetIncomeRec: payload?.totalNetIncomeRec!,
          },
        };
      })
      .addCase(getDocumentThunk.pending, (state) => {
        return state;
      })
      .addCase(getDocumentThunk.rejected, (state) => {
        return state;
      })
      .addCase(getDocumentThunk.fulfilled, (state, { payload }) => {
        window.open(payload.docurl);
        return state;
      }),
});

// actions
export const {
  setInitialState,
  setSimulationId,
  setContext,
  setNumberOfHolders,
  setCurrentHolder,
  increaseCurrentHolder,
  decreaseCurrentHolder,
  toggleCurrentTypeOfIncome,
  setCurrentTypeOfIncome,
  setCleanHolder,
  setArrayHolder,
  setIRSTotal,
  setNameAndNif,
  setReceiptsTotal,
  setIrsOrReceipts,
  setClean,
  setDependentsAndPensions,
  setIndependentWithOrganizedAccounting,
  setIndependentWithoutOrganizedAccounting,
  setTaxTransparency,
  setPropertyIncome,
  setExemptIncomeOrIntellectualProperty,
  setIncomeEarnedAbroadForResidents,
  setCapitalIncome,
  setIncomeEarnedAbroadForNonResidents,
  setOtherIncome,
  setSalaryOrPensionReceipts,
  setGreenReceipts,
  setReiceptsPropertyIncome,
  setResearchScholarshipsInternship,
  setAlimony,
} = slice.actions;

export default slice;
