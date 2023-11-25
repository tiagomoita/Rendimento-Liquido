import {
  calculateNetIncomeDependentsAndPensionsInterface,
  calculateNetIncomeIndependentWithOrganizedAccountingInterface,
  calculateNetIncomeIndependentWithoutOrganizedAccountingTotalInterface,
  calculateTaxTransparencyInterface,
  calculateNetIncomePropertyIncomeInterface,
  calculateExemptIncomeOrIntellectualPropertyInterface,
  calculateIncomeEarnedAbroadForResidentsInterface,
  calculateIncomeEarnedAbroadForNonResidentsInterface,
  calculateCapitalIncomeInterface,
  calculateOtherIncomeInterface,
  calculateNetIncomeIndependentWithoutOrganizedAccountingInterface,
  calculateIsRegularOrIrregularInterface,
  calculateReceiptsAverageTotalInterface,
  calculateGreenReceiptsAverageTotalInterface,
} from "./interface";

import { round } from "./helpers";

const calculateNetIncomeDependentsAndPensions = (
  params: calculateNetIncomeDependentsAndPensionsInterface
) => {
  const {
    grossIncome,
    irsWithholdingTax,
    surchargeWithholding,
    mandatoryContributionsToSecSocial,
  } = params;
  const calc =
    grossIncome -
    irsWithholdingTax -
    surchargeWithholding -
    mandatoryContributionsToSecSocial;
  return round(calc);
};

const calculateNetIncomeIndependentWithOrganizedAccounting = (
  params: calculateNetIncomeIndependentWithOrganizedAccountingInterface
) => {
  const { calculatedProfit, calculatedLoss, taxIncidence } = params;
  if (calculatedProfit !== 0) {
    return round(calculatedProfit - taxIncidence);
  }
  if (calculatedLoss) {
    return round(-1 * calculatedLoss);
  }
  return 0;
};

const calculateNetIncomeIndependentWithoutOrganizedAccountingTotal = (
  params: calculateNetIncomeIndependentWithoutOrganizedAccountingTotalInterface
) => {
  const {
    saleOfGoodsAndProductsTotal,
    provisionOfHotelAndSimilarServicesCateringAndBeverageTotal,
    provisionOfCateringAndBeverageActivitiesServicesTotal,
    provisionOfHotelServicesAndSimilarActivitiesTotal,
    provisionOfServRelatedToTheExploOfLocalAccEstablishmentsTotal,
    incomeFromProActivitiesSpecifArticle151OfTheCIRSTotal,
    incomeFromServicesRenderedNotForeseenInThePreviousFieldsTotal,
    intellPropertyNotCoveByArtic58OfTheEBFIndOrInforPropertyTotal,
    intellPropertyIncoCoveredByArtic58OfTheEBFNonExemptPartTotal,
    positiveBalanOfCapGainsAndLossesAndOtherEquityIncrementsTotal,
    incomeFromFinancialActivitiesCAECodesStartWith6465or66Total,
    servicProvidedByMembToProSocOfTheFiscalTransparencRegimeTotal,
    positiveResultOfPropertyIncomeTotal,
    propertyIncomeAttributableToCatBIncomeGeneratingActivityTotal,
    operatingSubsidiesTotal,
    otherSubsidiesTotal,
    categoryBIncomeNotIncludedInPreviousFieldsTotal,
    salesProductsOtherThanThoseIncludField7Total,
    servicesRenderedTotal,
    incomeFromCapitalAndRealEstateTotal,
    agriYieldsSilvLivstckPositiveResultOfPropertyIncomeTotal,
    operatingSubsidiesRelatedToSalesTotal,
    agriYieldsSilvLivstckOtherSubsidiesTotal,
    incomeFromSalesMultiannualTotal,
    categoryBIncomeTotal,
    otherIncomeTotal,
  } = params;
  return round(
    saleOfGoodsAndProductsTotal +
      provisionOfHotelAndSimilarServicesCateringAndBeverageTotal +
      provisionOfCateringAndBeverageActivitiesServicesTotal +
      provisionOfHotelServicesAndSimilarActivitiesTotal +
      provisionOfServRelatedToTheExploOfLocalAccEstablishmentsTotal +
      incomeFromProActivitiesSpecifArticle151OfTheCIRSTotal +
      incomeFromServicesRenderedNotForeseenInThePreviousFieldsTotal +
      intellPropertyNotCoveByArtic58OfTheEBFIndOrInforPropertyTotal +
      intellPropertyIncoCoveredByArtic58OfTheEBFNonExemptPartTotal +
      positiveBalanOfCapGainsAndLossesAndOtherEquityIncrementsTotal +
      incomeFromFinancialActivitiesCAECodesStartWith6465or66Total +
      servicProvidedByMembToProSocOfTheFiscalTransparencRegimeTotal +
      positiveResultOfPropertyIncomeTotal +
      propertyIncomeAttributableToCatBIncomeGeneratingActivityTotal +
      operatingSubsidiesTotal +
      otherSubsidiesTotal +
      categoryBIncomeNotIncludedInPreviousFieldsTotal +
      salesProductsOtherThanThoseIncludField7Total +
      servicesRenderedTotal +
      incomeFromCapitalAndRealEstateTotal +
      agriYieldsSilvLivstckPositiveResultOfPropertyIncomeTotal +
      operatingSubsidiesRelatedToSalesTotal +
      agriYieldsSilvLivstckOtherSubsidiesTotal +
      incomeFromSalesMultiannualTotal +
      categoryBIncomeTotal +
      otherIncomeTotal
  );
};

const calculateNetIncomeIndependentWithoutOrganizedAccounting = (
  params: calculateNetIncomeIndependentWithoutOrganizedAccountingInterface
) => {
  const { totalGrossIncome, charges, taxIncidence } = params;
  return round(totalGrossIncome - charges - taxIncidence);
};

const calculateTaxTransparency = (
  params: calculateTaxTransparencyInterface
) => {
  const { societies, complementaryGrouping } = params;
  return round(
    societies.netIncome -
      societies.withholdingTax +
      (complementaryGrouping.profit -
        complementaryGrouping.losses -
        complementaryGrouping.withholdingTax)
  );
};

const calculateNetIncomePropertyIncome = (
  params: calculateNetIncomePropertyIncomeInterface
) => {
  const { earnedIncome, sublease } = params;
  return round(
    earnedIncome.grossIncome -
      earnedIncome.withholdingTax -
      earnedIncome.supportedAndPaidExpenses +
      (sublease.incomeReceivedByTheSublessor -
        sublease.irsWithholdingTax -
        sublease.rentPaidToLandlord)
  );
};

const calculateExemptIncomeOrIntellectualProperty = (
  params: calculateExemptIncomeOrIntellectualPropertyInterface
) => {
  const {
    exemptIncomeSubjectToAggregation,
    incomeFromIntellectualPropertyPartiallyExempted,
  } = params;
  return round(
    exemptIncomeSubjectToAggregation.grossIncome -
      exemptIncomeSubjectToAggregation.irsWithholdingTax +
      incomeFromIntellectualPropertyPartiallyExempted.income
  );
};

const calculateIncomeEarnedAbroadForResidents = (
  params: calculateIncomeEarnedAbroadForResidentsInterface
) => {
  const {
    incomeFromDependentWork,
    pensionIncome,
    businessAndProfessionalIncome,
    propertyIncome,
    capitalIncome,
  } = params;
  return round(
    incomeFromDependentWork.grossIncome -
      incomeFromDependentWork.taxPaidAbroad -
      incomeFromDependentWork.withholding -
      incomeFromDependentWork.surchargeWithholding -
      incomeFromDependentWork.contributionsToSocialProtectionSchemes +
      (pensionIncome.grossIncome -
        pensionIncome.taxPaidAbroad -
        pensionIncome.contributionsToSocialProtectionSchemes) +
      (businessAndProfessionalIncome.grossIncome -
        businessAndProfessionalIncome.taxPaidAbroad -
        businessAndProfessionalIncome.contributionsToSocialProtectionSchemes -
        businessAndProfessionalIncome.withholding) +
      (propertyIncome.netIncome - propertyIncome.taxPaidAbroad) +
      (capitalIncome.grossIncome - capitalIncome.eithholdingTaxInPortugal)
  );
};

const calculateCapitalIncome = (params: calculateCapitalIncomeInterface) => {
  const {
    incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal,
    incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal,
  } = params;
  let basedInPortugal = 0;
  let withoutHeadquartersInPortugalInPortugal = 0;

  if (
    incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal.declarationsNumber ===
    3
  ) {
    if (
      incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal.grossIncomeYear1 >
        0 ||
      incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal.grossIncomeYear2 >
        0 ||
      incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal.grossIncomeYear3 >
        0
    ) {
      basedInPortugal =
        (incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal.grossIncomeYear1 +
          incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal.grossIncomeYear2 +
          incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal.grossIncomeYear3) /
        3;
    }
  } else if (
    incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal.declarationsNumber ===
    2
  ) {
    if (
      incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal.grossIncomeYear1 >
        0 &&
      incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal.grossIncomeYear2 >
        0
    ) {
      basedInPortugal =
        (incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal.grossIncomeYear1 +
          incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal.grossIncomeYear2) /
        2;
    }
  }

  if (
    incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal.declarationsNumber ===
    3
  ) {
    if (
      incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal.grossIncomeYear1 >
        0 ||
      incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal.grossIncomeYear2 >
        0 ||
      incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal.grossIncomeYear3 >
        0
    ) {
      withoutHeadquartersInPortugalInPortugal =
        (incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal.grossIncomeYear1 +
          incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal.grossIncomeYear2 +
          incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal.grossIncomeYear3) /
        3;
    }
  } else if (
    incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal.declarationsNumber ===
    2
  ) {
    if (
      incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal.grossIncomeYear1 >
        0 &&
      incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal.grossIncomeYear2 >
        0
    ) {
      withoutHeadquartersInPortugalInPortugal =
        (incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal.grossIncomeYear1 +
          incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal.grossIncomeYear2) /
        2;
    }
  }
  return round(basedInPortugal + withoutHeadquartersInPortugalInPortugal);
};

const calculateIncomeEarnedAbroadForNonResidents = (
  params: calculateIncomeEarnedAbroadForNonResidentsInterface
) => {
  const { incomeNotExemptFromTax, taxFreeIncome, grossIncomeNetTaxRate } =
    params;
  return round(
    incomeNotExemptFromTax.grossIncome -
      incomeNotExemptFromTax.taxPaidAbroad -
      incomeNotExemptFromTax.taxWithheldAbroad -
      incomeNotExemptFromTax.chargesForSocialSecurityorEquivalent +
      taxFreeIncome.grossIncome * grossIncomeNetTaxRate
  );
};

const calculateOtherIncome = (params: calculateOtherIncomeInterface) => {
  const { otherNetIncome } = params;
  return round(otherNetIncome);
};

const calculateIsRegularOrIrregular = (
  params: calculateIsRegularOrIrregularInterface
) => {
  const {
    receipt1Value,
    receipt2Value,
    receipt3Value,
    valueOfRegularReceipts,
  } = params;
  const avg = (receipt1Value + receipt2Value + receipt3Value) / 3;
  const a = 1 - avg / receipt1Value;
  const b = 1 - avg / receipt2Value;
  const c = 1 - avg / receipt3Value;
  if (
    a > valueOfRegularReceipts ||
    a < -valueOfRegularReceipts ||
    b > valueOfRegularReceipts ||
    b < -valueOfRegularReceipts ||
    c > valueOfRegularReceipts ||
    c < -valueOfRegularReceipts
  ) {
    return true;
  }
  return false;
};

const calculateReceiptsAverageTotal = (
  params: calculateReceiptsAverageTotalInterface
) => {
  const {
    receipt1,
    receipt2,
    receipt3,
    receipt4,
    receipt5,
    receipt6,
    isIrregular,
    propertyIncomeTax,
  } = params;

  if (isIrregular) {
    if (propertyIncomeTax) {
      return round(
        ((receipt1 + receipt2 + receipt3 + receipt4 + receipt5 + receipt6) *
          propertyIncomeTax) /
          6
      );
    }
    return round(
      (receipt1 + receipt2 + receipt3 + receipt4 + receipt5 + receipt6) / 6
    );
  }
  if (!isIrregular) {
    if (propertyIncomeTax) {
      return round(((receipt1 + receipt2 + receipt3) * propertyIncomeTax) / 3);
    }
    return round((receipt1 + receipt2 + receipt3) / 3);
  }
  return 0;
};

const calculateGreenReceiptsAverageTotal = (
  params: calculateGreenReceiptsAverageTotalInterface
) => {
  const {
    receipt1,
    receipt2,
    receipt3,
    receipt4,
    receipt5,
    receipt6,
    isIrregular,
    propertyIncomeTax,
  } = params;
  if (isIrregular) {
    if (propertyIncomeTax) {
      return round(
        ((receipt1.receiptValue +
          receipt2.receiptValue +
          receipt3.receiptValue +
          receipt4.receiptValue +
          receipt5.receiptValue +
          receipt6.receiptValue) *
          propertyIncomeTax) /
          6
      );
    }
    return round(
      (receipt1.receiptValue +
        receipt2.receiptValue +
        receipt3.receiptValue +
        receipt4.receiptValue +
        receipt5.receiptValue +
        receipt6.receiptValue) /
        6
    );
  }
  if (!isIrregular) {
    if (propertyIncomeTax) {
      return round(
        ((receipt1.receiptValue +
          receipt2.receiptValue +
          receipt3.receiptValue) *
          propertyIncomeTax) /
          3
      );
    }
    return round(
      (receipt1.receiptValue + receipt2.receiptValue + receipt3.receiptValue) /
        3
    );
  }
  return 0;
};

export {
  calculateNetIncomeDependentsAndPensions,
  calculateNetIncomeIndependentWithOrganizedAccounting,
  calculateNetIncomeIndependentWithoutOrganizedAccountingTotal,
  calculateNetIncomeIndependentWithoutOrganizedAccounting,
  calculateTaxTransparency,
  calculateNetIncomePropertyIncome,
  calculateExemptIncomeOrIntellectualProperty,
  calculateIncomeEarnedAbroadForResidents,
  calculateCapitalIncome,
  calculateIncomeEarnedAbroadForNonResidents,
  calculateOtherIncome,
  calculateIsRegularOrIrregular,
  calculateReceiptsAverageTotal,
  calculateGreenReceiptsAverageTotal,
};
