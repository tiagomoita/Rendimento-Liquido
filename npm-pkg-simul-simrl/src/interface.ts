interface calculateNetIncomeDependentsAndPensionsInterface {
  grossIncome: number;
  irsWithholdingTax: number;
  surchargeWithholding: number;
  mandatoryContributionsToSecSocial: number;
}

interface calculateNetIncomeIndependentWithOrganizedAccountingInterface {
  calculatedProfit: number;
  calculatedLoss: number;
  taxIncidence: number;
}

interface calculateNetIncomeIndependentWithoutOrganizedAccountingTotalInterface {
  saleOfGoodsAndProductsTotal: number;
  provisionOfHotelAndSimilarServicesCateringAndBeverageTotal: number;
  provisionOfCateringAndBeverageActivitiesServicesTotal: number;
  provisionOfHotelServicesAndSimilarActivitiesTotal: number;
  provisionOfServRelatedToTheExploOfLocalAccEstablishmentsTotal: number;
  incomeFromProActivitiesSpecifArticle151OfTheCIRSTotal: number;
  incomeFromServicesRenderedNotForeseenInThePreviousFieldsTotal: number;
  intellPropertyNotCoveByArtic58OfTheEBFIndOrInforPropertyTotal: number;
  intellPropertyIncoCoveredByArtic58OfTheEBFNonExemptPartTotal: number;
  positiveBalanOfCapGainsAndLossesAndOtherEquityIncrementsTotal: number;
  incomeFromFinancialActivitiesCAECodesStartWith6465or66Total: number;
  servicProvidedByMembToProSocOfTheFiscalTransparencRegimeTotal: number;
  positiveResultOfPropertyIncomeTotal: number;
  propertyIncomeAttributableToCatBIncomeGeneratingActivityTotal: number;
  operatingSubsidiesTotal: number;
  otherSubsidiesTotal: number;
  categoryBIncomeNotIncludedInPreviousFieldsTotal: number;
  salesProductsOtherThanThoseIncludField7Total: number;
  servicesRenderedTotal: number;
  incomeFromCapitalAndRealEstateTotal: number;
  agriYieldsSilvLivstckPositiveResultOfPropertyIncomeTotal: number;
  operatingSubsidiesRelatedToSalesTotal: number;
  agriYieldsSilvLivstckOtherSubsidiesTotal: number;
  incomeFromSalesMultiannualTotal: number;
  categoryBIncomeTotal: number;
  otherIncomeTotal: number;
}

interface calculateNetIncomeEarnedAbroadForResidentsTotalInterface {
  commercialAndIndustrialIncomeTotal: number;
  agriculturalIncomeFromForestryOrLivestockTotal: number;
  incomeTableArticle151Total: number;
  incomeFromUnforeseenInstallmentsTotal: number;
  intellectualOrIndustrialPropertyIncomeTotal: number;
  incomeIntellectualPropertyArt58NonExemptTotal: number;
  incomeIntellectualPropertyArt58ExemptTotal: number;
  incomeOfArtistsAndSportsmen2017AndPreviousTotal: number;
  incomeAttributableBusinessIndIncomeGeneratingActivitiesTotal: number;
  incomeOfArtists2018AndLaterTotal: number;
  incomeOfSportsmen2018AndLaterTotal: number;
}

interface calculateNetIncomeIndependentWithoutOrganizedAccountingInterface {
  totalGrossIncome: number;
  charges: number;
  taxIncidence: number;
}

interface calculateTaxTransparencyInterface {
  societies: {
    netIncome: number;
    withholdingTax: number;
  };
  complementaryGrouping: {
    profit: number;
    losses: number;
    withholdingTax: number;
  };
}

interface calculateNetIncomePropertyIncomeInterface {
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
}

interface calculateExemptIncomeOrIntellectualPropertyInterface {
  exemptIncomeSubjectToAggregation: {
    grossIncome: number;
    irsWithholdingTax: number;
  };
  incomeFromIntellectualPropertyPartiallyExempted: {
    income: number;
  };
}

interface calculateIncomeEarnedAbroadForResidentsInterface {
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
}

interface calculateCapitalIncomeInterface {
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
}

interface calculateIncomeEarnedAbroadForNonResidentsInterface {
  incomeNotExemptFromTax: {
    grossIncome: number;
    taxPaidAbroad: number;
    taxWithheldAbroad: number;
    chargesForSocialSecurityorEquivalent: number;
  };
  taxFreeIncome: {
    grossIncome: number;
  };
  grossIncomeNetTaxRate: number;
}

interface calculateOtherIncomeInterface {
  otherNetIncome: number;
}

interface calculateIsRegularOrIrregularInterface {
  receipt1Value: number;
  receipt2Value: number;
  receipt3Value: number;
  valueOfRegularReceipts: number;
}

interface calculateReceiptsAverageTotalInterface {
  receipt1: number;
  receipt2: number;
  receipt3: number;
  receipt4: number;
  receipt5: number;
  receipt6: number;
  isIrregular: boolean;
  propertyIncomeTax?: number;
}

interface GreenReceiptInterface {
  receiptValue: number;
}
interface calculateGreenReceiptsAverageTotalInterface {
  greenReceiptsIncomes1: GreenReceiptInterface;
  greenReceiptsIncomes2: GreenReceiptInterface;
  greenReceiptsIncomes3: GreenReceiptInterface;
  greenReceiptsIncomes4: GreenReceiptInterface;
  greenReceiptsIncomes5: GreenReceiptInterface;
  greenReceiptsIncomes6: GreenReceiptInterface;
  isIrregular: boolean;
  propertyIncomeTax?: number;
}

export {
  calculateNetIncomeDependentsAndPensionsInterface,
  calculateNetIncomeIndependentWithOrganizedAccountingInterface,
  calculateNetIncomeIndependentWithoutOrganizedAccountingTotalInterface,
  calculateNetIncomeIndependentWithoutOrganizedAccountingInterface,
  calculateTaxTransparencyInterface,
  calculateNetIncomePropertyIncomeInterface,
  calculateExemptIncomeOrIntellectualPropertyInterface,
  calculateIncomeEarnedAbroadForResidentsInterface,
  calculateCapitalIncomeInterface,
  calculateIncomeEarnedAbroadForNonResidentsInterface,
  calculateOtherIncomeInterface,
  calculateIsRegularOrIrregularInterface,
  calculateReceiptsAverageTotalInterface,
  calculateGreenReceiptsAverageTotalInterface,
  calculateNetIncomeEarnedAbroadForResidentsTotalInterface,
};
