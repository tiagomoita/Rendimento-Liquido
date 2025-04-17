export interface holderContext {
  SimulationId: string;
  ReferenceWF: string;
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

export interface BusinessAndProfessionalIncome {
  commercialAndIndustrialIncome: number;
  agriculturalIncomeFromForestryOrLivestock: number;
  incomeTableArticle151: number;
  incomeFromUnforeseenInstallments: number;
  intellectualOrIndustrialPropertyIncome: number;
  incomeIntellectualPropertyArt58NonExempt: number;
  incomeIntellectualPropertyArt58Exempt: number;
  incomeOfArtistsAndSportsmen2017AndPrevious: number;
  incomeAttributableBusinessIndIncomeGeneratingActivities: number;
  incomeOfArtists2018AndLater: number;
  incomeOfSportsmen2018AndLater: number;
}

export interface IndComProIncome {
  saleOfMerchAndProducts: number;
  provisionHotelServ2015And2016: number;
  provisionCateringAndBeverageServ: number;
  provisionHotelAndSimilarServ: number;
  provisionLocalAccommodationServ: number;
  incomeProfActivitiesArt151CIRS: number;
  incomeFromUnforcastedServProv: number;
  intellectualPropertyNotArt58EBF: number;
  intellectualPropertyIncomeArt58EBFNonExempt: number;
  positiveBalanceGainsLossesEquityInc: number;
  incomeFromFinancialActivitiesCAE: number;
  servicesProvidedByPartnersProfCo: number;
  positiveResultPropertyIncome: number;
  buildingIncomeAttribCatBActivity: number;
  explorationSubsidies: number;
  otherSubsidies: number;
  catBIncomeNotInPrevFields: number;
  servicesProvidedByPartnersToCompanies: number;
}

export interface AgriYieldsSilvLivstck {
  salesOfOtherProducts: number;
  serviceProvision: number;
  incomeFromCapPropAttribCatB: number;
  positiveResultPropertyIncome: number;
  operatingSubsidiesRelatedSales: number;
  otherSubsidies: number;
  incomeFromSalesMultiAnnualForestry: number;
  catBIncomeNotInPrevFields: number;
  servicesProvidedByPartnersToCompanies: number;
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
      grossIncomes: {
        commercialAndIndustrialIncome: number;
        agriculturalIncomeFromForestryOrLivestock: number;
        incomeTableArticle151: number;
        incomeFromUnforeseenInstallments: number;
        intellectualOrIndustrialPropertyIncome: number;
        incomeIntellectualPropertyArt58NonExempt: number;
        incomeIntellectualPropertyArt58Exempt: number;
        incomeOfArtistsAndSportsmen2017AndPrevious: number;
        incomeAttributableBusinessIndIncomeGeneratingActivities: number;
        incomeOfArtists2018AndLater: number;
        incomeOfSportsmen2018AndLater: number;
      };
      grossIncomeValue: number;
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
      taxPaidAbroad: number;
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
  receiptValue: number;
  grossIncomes: {
    indComProIncome: IndComProIncome;
    agriYieldsSilvLivstck: AgriYieldsSilvLivstck;
  };
}

export interface ReceiptsDataAux {
  receipt1: number;
  receipt2: number;
  receipt3: number;
  receipt4: number;
  receipt5: number;
  receipt6: number;
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

export interface TaxeDetails {
  parameterValue?: number;
  visible?: boolean;
  parameterCode?: string;
  parameterName?: string;
  lastUpdate?: string;
}

export interface Taxes {
  irsParams: {
    taxIncOnIndWorkOrgAcc: TaxeDetails;
    taxIncOnIndWorkNoOrgAcc: TaxeDetails;
    taxFreeIncEarnedAbroadNonRes: TaxeDetails;
  };
  recParams: {
    percVarAvgIncRecAboveIrreg: TaxeDetails;
    realEstateIncome: TaxeDetails;
  };
  anexxBParams: {
    profCommIndIncomes: {
      saleOfMerchAndProducts: TaxeDetails;
      provisionHotelServ2015And2016: TaxeDetails;
      provisionCateringAndBeverageServ: TaxeDetails;
      provisionHotelAndSimilarServ: TaxeDetails;
      provisionLocalAccommodationServ: TaxeDetails;
      incomeProfActivitiesArt151CIRS: TaxeDetails;
      incomeFromUnforcastedServProv: TaxeDetails;
      intellectualPropertyNotArt58EBF: TaxeDetails;
      intellectualPropertyIncomeArt58EBFNonExempt: TaxeDetails;
      positiveBalanceGainsLossesEquityInc: TaxeDetails;
      incomeFromFinancialActivitiesCAE: TaxeDetails;
      servicesProvidedByPartnersProfCo: TaxeDetails;
      positiveResultPropertyIncome: TaxeDetails;
      buildingIncomeAttribCatBActivity: TaxeDetails;
      explorationSubsidies: TaxeDetails;
      otherSubsidies: TaxeDetails;
      catBIncomeNotInPrevFields: TaxeDetails;
      servicesProvidedByPartnersToCompanies: TaxeDetails;
    };
    agriSilvPecuIncomes: {
      salesOfOtherProducts: TaxeDetails;
      serviceProvision: TaxeDetails;
      incomeFromCapPropAttribCatB: TaxeDetails;
      positiveResultPropertyIncome: TaxeDetails;
      operatingSubsidiesRelatedSales: TaxeDetails;
      otherSubsidies: TaxeDetails;
      incomeFromSalesMultiAnnualForestry: TaxeDetails;
      catBIncomeNotInPrevFields: TaxeDetails;
      servicesProvidedByPartnersToCompanies: TaxeDetails;
    };
  };
  anexxJParams: {
    commIndIncome: TaxeDetails;
    agriForestryLivestockIncome: TaxeDetails;
    incomeFromProfActSpecProv: TaxeDetails;
    incomeFromServNotPrevCodes: TaxeDetails;
    incomeFromIntelOrIndusProp: TaxeDetails;
    incomeFromIntelPropNonExempt: TaxeDetails;
    incomeFromIntelPropExempt: TaxeDetails;
    incomeOfArtistsSportsmenPrev: TaxeDetails;
    incomeAttrToBusiProfAct: TaxeDetails;
    artistIncomePost2018: TaxeDetails;
    incomeOfAthletesPost2018: TaxeDetails;
  };
  lastUpdate?: string;
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
  businessAndProfessionalIncome?: BusinessAndProfessionalIncome;
  indComProIncomeByHolder?: IndComProIncome;
  agriYieldsSilvLivstckByHolder?: AgriYieldsSilvLivstck;
  otherIncomeByHolder?: {
    otherIncome: number;
  };
  businessAndProfessionalIncomeByHolder?: BusinessAndProfessionalIncome;
  totalGrossIncomeByHolder?: number;
  readOnly?: boolean;
  tabHolder?: number;
  applyTotalValue?: any;
  show?: boolean;
  handleCleanModel?: any;
  isAttachmentJ?: boolean;
  saveValues?: any;
}

// irsOrReceipts:  true -> IRS, false -> recibos de vencimento
// currentTypeOfIncome: true -> IRS , false -> recibos de vencimento

enum ETypes {
  SLICE_NAME = "holderContext",
  THUNK_CREATE_CONTEXT = "holder/createContext",
  THUNK_GET_CONTEXT = "holder/getContext",
  THUNK_GET_CONTEXT_WF = "holder/getContextWF",
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
