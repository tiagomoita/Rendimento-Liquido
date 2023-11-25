export interface holderContext {
  SimulationId: string;
  Holders: number;
  currentHolder: number;
  currentTypeOfIncome: boolean;
  cleanHolder: boolean;
  taxes: Taxes;
  aggregator: aggEachTypeOfIncome;
  context: Context;
  arrayHolders: holder[];
}

export interface holder {
  holderNumber: number;
  Name: string | null;
  Nif: string | null;
  irsOrReceipts: boolean | null;
  IRSTotal: number;
  ReceiptsTotal: number;
  IRSData: holderData;
  ReceiptsData: ReceiptsData;
}

export interface aggEachTypeOfIncome {
  aggDependentsPensions: number;
  aggIndependentWith: number;
  aggIndependentWithout: number;
  aggTaxTransparency: number;
  aggPropertyIncome: number;
  aggIntellectualProper: number;
  aggAbroadForResidents: number;
  aggCapitalIncome: number;
  aggAbroadForNonResidents: number;
  aggOtherIncome: number;
  totalNetIncomeIrs: number;
  aggSalaryOrPensionReceipts: number;
  aggGreenReceipts: number;
  aggPropertyIncomeReceipts: number;
  aggResearchInternshipReceipts: number;
  aggAlimonyReceipts: number;
  totalNetIncomeRec: number;
}

export interface IndComProIncome {
  saleOfGoodsAndProducts: number;
  provisionOfHotelAndSimilarServicesCateringAndBeverage: number;
  provisionOfCateringAndBeverageActivitiesServices: number;
  provisionOfHotelServicesAndSimilarActivities: number;
  provisionOfServRelatedToTheExploOfLocalAccEstablishments: number;
  incomeFromProActivitiesSpecifArticle151OfTheCIRS: number;
  incomeFromServicesRenderedNotForeseenInThePreviousFields: number;
  intellPropertyNotCoveByArtic58OfTheEBFIndOrInforProperty: number;
  intellPropertyIncoCoveredByArtic58OfTheEBFNonExemptPart: number;
  positiveBalanOfCapGainsAndLossesAndOtherEquityIncrements: number;
  incomeFromFinancialActivitiesCAECodesStartWith6465or66: number;
  servicProvidedByMembToProSocOfTheFiscalTransparencRegime: number;
  positiveResultOfPropertyIncome: number;
  propertyIncomeAttributableToCatBIncomeGeneratingActivity: number;
  operatingSubsidies: number;
  otherSubsidies: number;
  categoryBIncomeNotIncludedInPreviousFields: number;
}

export interface AgriYieldsSilvLivstck {
  salesProductsOtherThanThoseIncludField7: number;
  servicesRendered: number;
  incomeFromCapitalAndRealEstate: number;
  positiveResultOfPropertyIncome: number;
  operatingSubsidiesRelatedToSales: number;
  otherSubsidies: number;
  incomeFromSalesMultiannual: number;
  categoryBIncome: number;
}
export interface holderData {
  dependentsAndPensions: {
    dependentsAndPensionsCheckBox: boolean;
    grossIncome: number;
    irsWithholdingTax: number;
    surchargeWithholding: number;
    mandatoryContributionsToSecSocial: number;
    netIncome: number;
  };
  independentWithOrganizedAccounting: {
    independentWithOrganizedAccountingCheckBox: boolean;
    calculatedProfit: number;
    calculatedLoss: number;
    taxIncidence: number;
    netIncome: number;
  };
  independentWithoutOrganizedAccounting: {
    independentWithoutOrganizedAccountingCheckBox: boolean;
    indComProIncome: IndComProIncome;
    agriYieldsSilvLivstck: AgriYieldsSilvLivstck;
    otherIncome: {
      otherIncome: number;
    };
    charges: number;
    taxIncidence: number;
    netIncome: number;
    totalGrossIncome: number;
  };
  taxTransparency: {
    taxTransparencyCheckBox: boolean;
    societies: {
      netIncome: number;
      withholdingTax: number;
    };
    complementaryGrouping: {
      profit: number;
      losses: number;
      withholdingTax: number;
    };
    netIncome: number;
  };
  propertyIncome: {
    propertyIncomeCheckBox: boolean;
    earnedIncome: {
      grossIncome: number;
      withholdingTax: number;
      supportedAndPaidExpenses: number;
    };
    sublease: {
      incomeReceivedByTheSublessor: number;
      rentPaidToLandlord: number;
      irsWithholdingTax: number;
    };
    netIncome: number;
  };
  exemptIncomeOrIntellectualProperty: {
    exemptIncomeOrIntellectualPropertCheckBox: boolean;
    exemptIncomeSubjectToAggregation: {
      grossIncome: number;
      irsWithholdingTax: number;
    };
    incomeFromIntellectualPropertyPartiallyExempted: {
      income: number;
    };
    netIncome: number;
  };
  incomeEarnedAbroadForResidents: {
    incomeEarnedAbroadForResidentsCheckBox: boolean;
    incomeFromDependentWork: {
      grossIncome: number;
      taxPaidAbroad: number;
      withholding: number;
      surchargeWithholding: number;
      contributionsToSocialProtectionSchemes: number;
    };
    pensionIncome: {
      grossIncome: number;
      taxPaidAbroad: number;
      contributionsToSocialProtectionSchemes: number;
    };
    businessAndProfessionalIncome: {
      indComProIncome: IndComProIncome;
      agriYieldsSilvLivstck: AgriYieldsSilvLivstck;
      otherIncome: {
        otherIncome: number;
      };
      grossIncome: number;
      taxPaidAbroad: number;
      contributionsToSocialProtectionSchemes: number;
      withholding: number;
    };
    propertyIncome: {
      netIncome: number;
      taxPaidAbroad: number;
    };
    capitalIncome: {
      grossIncome: number;
      eithholdingTaxInPortugal: number;
    };
    netIncome: number;
  };
  capitalIncome: {
    capitalIncomeCheckBox: boolean;
    incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal: {
      grossIncomeYear1: number;
      grossIncomeYear2: number;
      grossIncomeYear3: number;
      declarationsNumber: number;
    };
    incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal: {
      grossIncomeYear1: number;
      grossIncomeYear2: number;
      grossIncomeYear3: number;
      declarationsNumber: number;
    };
    netIncome: number;
  };
  incomeEarnedAbroadForNonResidents: {
    incomeEarnedAbroadForNonResidentsCheckBok: boolean;
    incomeNotExemptFromTax: {
      grossIncome: number;
      taxPaidAbroad: number;
      taxWithheldAbroad: number;
      chargesForSocialSecurityorEquivalent: number;
    };
    taxFreeIncome: {
      grossIncome: number;
    };
    netIncome: number;
  };
  otherIncome: {
    otherIncomeCheckBox: boolean;
    otherNetIncome: number;
    netIncome: number;
  };
}

interface GreenReceiptData {
  indComProIncome: IndComProIncome;
  agriYieldsSilvLivstck: AgriYieldsSilvLivstck;
  otherIncome: {
    otherIncome: number;
  };
  receiptValue: number;
}

export interface ReceiptsData {
  salaryOrPensionReceipts: {
    salaryOrPensionReceiptsCheckBox: boolean;
    receipt1: number;
    receipt2: number;
    receipt3: number;
    receipt4: number;
    receipt5: number;
    receipt6: number;
    averageNetIncome: number;
  };
  greenReceipts: {
    greenReceiptsCheckBox: boolean;
    greenReceiptsIncomes1: GreenReceiptData;
    greenReceiptsIncomes2: GreenReceiptData;
    greenReceiptsIncomes3: GreenReceiptData;
    greenReceiptsIncomes4: GreenReceiptData;
    greenReceiptsIncomes5: GreenReceiptData;
    greenReceiptsIncomes6: GreenReceiptData;
    averageNetIncome: number;
  };
  propertyIncomeReceipts: {
    propertyIncomeRecCheckBox: boolean;
    receipt1: number;
    receipt2: number;
    receipt3: number;
    receipt4: number;
    receipt5: number;
    receipt6: number;
    averageNetIncome: number;
  };
  researchScholarshipsInternshipReceipts: {
    researchScholarReceiptsCheckBox: boolean;
    receipt1: number;
    receipt2: number;
    receipt3: number;
    receipt4: number;
    receipt5: number;
    receipt6: number;
    averageNetIncome: number;
  };
  alimonyReceipts: {
    almonyReceiptsCheckBox: boolean;
    receipt1: number;
    receipt2: number;
    receipt3: number;
    receipt4: number;
    receipt5: number;
    receipt6: number;
    averageNetIncome: number;
  };
}

export interface Taxes {
  indWorkWtoCalcTaxIncidence: number;
  saleOfGoodsAndProducts: number;
  provisionOfHotelAndSimilarServicesCateringAndBeverage: number;
  provisionOfCateringAndBeverageActivitiesServices: number;
  provisionOfHotelServicesAndSimilarActivities: number;
  provisionOfServRelatedToTheExploOfLocalAccEstablishments: number;
  incomeFromProActivitiesSpecifArticle151OfTheCIRS: number;
  incomeFromServicesRenderedNotForeseenInThePreviousFields: number;
  intellPropertyNotCoveByArtic58OfTheEBFIndOrInforProperty: number;
  intellPropertyIncoCoveredByArtic58OfTheEBFNonExemptPart: number;
  positiveBalanOfCapGainsAndLossesAndOtherEquityIncrements: number;
  incomeFromFinancialActivitiesCAECodesStartWith6465or66: number;
  servicProvidedByMembToProSocOfTheFiscalTransparencRegime: number;
  positiveResultOfPropertyIncome: number;
  propertyIncomeAttributableToCatBIncomeGeneratingActivity: number;
  operatingSubsidies: number;
  otherSubsidies: number;
  categoryBIncomeNotIncludedInPreviousFields: number;
  salesProductsOtherThanThoseIncludField7: number;
  servicesRendered: number;
  incomeFromCapitalAndRealEstate: number;
  positiveResultOfPropertyIncomeAgri: number;
  operatingSubsidiesRelatedToSales: number;
  otherSubsidiesAgri: number;
  incomeFromSalesMultiannual: number;
  categoryBIncome: number;
  otherIncome: number;
  valueToCalculateTaxIncidence: number;
  valueEntitiesBasedInPortugal: number;
  valueEntiWithoutHeadPortugal: number;
  taxFreeIncomeValue: number;
  valueOfRegularReceipts: number;
  netIncomeReceipts: number;
  saleOfGoodsAndProductsVisibility: boolean;
  provisionOfHotelAndSimilarServicesCateringAndBeverageVisibility: boolean;
  provisionOfCateringAndBeverageActivitiesServicesVisibility: boolean;
  provisionOfHotelServicesAndSimilarActivitiesVisibility: boolean;
  provisionOfServRelatedToTheExploOfLocalAccEstablishmentsVisibility: boolean;
  incomeFromProActivitiesSpecifArticle151OfTheCIRSVisibility: boolean;
  incomeFromServicesRenderedNotForeseenInThePreviousFieldsVisibility: boolean;
  intellPropertyNotCoveByArtic58OfTheEBFIndOrInforPropertyVisibility: boolean;
  intellPropertyIncoCoveredByArtic58OfTheEBFNonExemptPartVisibility: boolean;
  positiveBalanOfCapGainsAndLossesAndOtherEquityIncrementsVisibility: boolean;
  incomeFromFinancialActivitiesCAECodesStartWith6465or66Visibility: boolean;
  servicProvidedByMembToProSocOfTheFiscalTransparencRegimeVisibility: boolean;
  positiveResultOfPropertyIncomeVisibility: boolean;
  propertyIncomeAttributableToCatBIncomeGeneratingActivityVisibility: boolean;
  operatingSubsidiesVisibility: boolean;
  otherSubsidiesVisibility: boolean;
  categoryBIncomeNotIncludedInPreviousFieldsVisibility: boolean;
  salesProductsOtherThanThoseIncludField7Visibility: boolean;
  servicesRenderedVisibility: boolean;
  incomeFromCapitalAndRealEstateVisibility: boolean;
  positiveResultOfPropertyIncomeAgriVisibility: boolean;
  operatingSubsidiesRelatedToSalesVisibility: boolean;
  otherSubsidiesAgriVisibility: boolean;
  incomeFromSalesMultiannualVisibility: boolean;
  categoryBIncomeVisibility: boolean;
  otherIncomeVisibility: boolean;
}

export interface Context {
  NomeOperador: string | undefined;
  Operador: string | undefined;
  Estrutura: string | undefined;
  NomeEstrutura: string | undefined;
  IDPN: string | undefined;
  Conta: string | undefined;
  IdSessaoNPT: string | undefined;
  CodigoBanco: string | undefined;
  Entidade: string | undefined;
  Abreviado: string | undefined;
  Nome: string | undefined;
  Nif: string | undefined;
}

export interface Model3Data {
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
  tabHolder?: number;
  applyTotalValue?: any;
  show?: boolean;
  handleCleanModel?: any;
}

// irsOrReceipts:  true -> IRS, false -> recibos de vencimento
// currentTypeOfIncome: true -> IRS , false -> recibos de vencimento

enum ETypes {
  SLICE_NAME = "holderContext",
  THUNK_CREATE_CONTEXT = "holder/createContext",
  THUNK_GET_CONTEXT = "holder/getContext",
  THUNK_GET_SIMULATION_ID = "holder/getSimulationId",
  THUNK_SIMULATE = "holder/simulate",
  THUNK_FIND_BY_SIMULATION_ID_AND_HOLDER = "holder/findBySimulationIdAndHolder",
  THUNK_SIMULATE_RECEIPTS = "holder/simulateReceipts",
  THUNK_FIND_BY_SIMULATION_ID_AND_HOLDER_RECEIPTS = "holder/findBySimulationIdAndHolderReceipts",
  THUNK_SIMULATION_RESULTS = "holder/simulationResults",
  THUNK_GET_TAXES = "holder/getTaxes",
  THUNK_GET_DOCUMENT = "holder/getDocument",
}

export default ETypes;
