import {
  holderData,
  ReceiptsData as receiptsData,
  Taxes as taxes,
} from "../../store/modules/entities/holder/types";

const validateMandatoryFieldsIRS = (
  IRSData: holderData,
  setIsButton: any,
  setIsButtonTaxesGreaterGrossIncome: any
) => {
  setIsButton(false);
  setIsButtonTaxesGreaterGrossIncome(false);
  // Anexo A
  if (IRSData?.dependentsAndPensions.dependentsAndPensionsCheckBox === true) {
    if (IRSData?.dependentsAndPensions.grossIncome > 0) {
      setIsButton(false);
      if (
        (IRSData?.dependentsAndPensions?.irsWithholdingTax || 0) +
          (IRSData?.dependentsAndPensions?.mandatoryContributionsToSecSocial ||
            0) +
          (IRSData?.dependentsAndPensions?.surchargeWithholding || 0) <
        IRSData?.dependentsAndPensions?.grossIncome
      ) {
        setIsButtonTaxesGreaterGrossIncome(false);
      } else {
        setIsButtonTaxesGreaterGrossIncome(true);
      }
    } else {
      setIsButton(true);
    }
  }

  // Anexo B
  if (
    IRSData?.independentWithoutOrganizedAccounting
      .independentWithoutOrganizedAccountingCheckBox === true
  ) {
    if (
      IRSData?.independentWithoutOrganizedAccounting?.indComProIncome
        ?.categoryBIncomeNotIncludedInPreviousFields > 0 ||
      IRSData?.independentWithoutOrganizedAccounting?.indComProIncome
        ?.incomeFromFinancialActivitiesCAECodesStartWith6465or66 > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.indComProIncome
        ?.incomeFromProActivitiesSpecifArticle151OfTheCIRS > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.indComProIncome
        ?.incomeFromServicesRenderedNotForeseenInThePreviousFields > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.indComProIncome
        ?.intellPropertyIncoCoveredByArtic58OfTheEBFNonExemptPart > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.indComProIncome
        ?.intellPropertyNotCoveByArtic58OfTheEBFIndOrInforProperty > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.indComProIncome
        ?.operatingSubsidies > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.indComProIncome
        ?.otherSubsidies > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.indComProIncome
        ?.positiveBalanOfCapGainsAndLossesAndOtherEquityIncrements > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.indComProIncome
        ?.positiveResultOfPropertyIncome > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.indComProIncome
        ?.propertyIncomeAttributableToCatBIncomeGeneratingActivity > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.indComProIncome
        ?.provisionOfCateringAndBeverageActivitiesServices > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.indComProIncome
        ?.provisionOfHotelAndSimilarServicesCateringAndBeverage > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.indComProIncome
        ?.provisionOfHotelServicesAndSimilarActivities > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.indComProIncome
        ?.provisionOfServRelatedToTheExploOfLocalAccEstablishments > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.indComProIncome
        ?.saleOfGoodsAndProducts > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.indComProIncome
        ?.servicProvidedByMembToProSocOfTheFiscalTransparencRegime > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.agriYieldsSilvLivstck
        ?.categoryBIncome > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.agriYieldsSilvLivstck
        ?.incomeFromCapitalAndRealEstate > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.agriYieldsSilvLivstck
        ?.incomeFromSalesMultiannual > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.agriYieldsSilvLivstck
        ?.operatingSubsidiesRelatedToSales > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.agriYieldsSilvLivstck
        ?.otherSubsidies > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.agriYieldsSilvLivstck
        ?.positiveResultOfPropertyIncome > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.agriYieldsSilvLivstck
        ?.salesProductsOtherThanThoseIncludField7 > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.agriYieldsSilvLivstck
        ?.servicesRendered > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.otherIncome?.otherIncome >
        0
    ) {
      setIsButton(false);
    } else {
      setIsButton(true);
    }
  }

  // Anexo C
  if (
    IRSData?.independentWithOrganizedAccounting
      .independentWithOrganizedAccountingCheckBox === true
  ) {
    if (
      IRSData?.independentWithOrganizedAccounting.calculatedProfit > 0 ||
      IRSData?.independentWithOrganizedAccounting.calculatedLoss > 0
    ) {
      setIsButton(false);
    } else {
      setIsButton(true);
    }
  }

  // Anexo D
  if (IRSData?.taxTransparency.taxTransparencyCheckBox === true) {
    if (
      IRSData?.taxTransparency.societies.netIncome > 0 ||
      IRSData?.taxTransparency.complementaryGrouping.profit > 0 ||
      IRSData?.taxTransparency.complementaryGrouping.losses > 0
    ) {
      setIsButton(false);
    } else {
      setIsButton(true);
    }
  }

  // Anexo E
  if (IRSData?.capitalIncome.capitalIncomeCheckBox === true) {
    // Com duas declarações é obrigatório que os dois campos de rendimento bruto tenha o valor > 0.
    // Com três declarações é obrigatório que pelo menos um dos campos de rendimento bruto tenha o valor > 0.
    if (
      !(
        IRSData?.capitalIncome
          ?.incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal
          .declarationsNumber === 2 &&
        (IRSData?.capitalIncome
          ?.incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal
          .grossIncomeYear1 === 0 ||
          IRSData?.capitalIncome
            ?.incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal
            .grossIncomeYear2 === 0)
      ) &&
      !(
        IRSData?.capitalIncome
          ?.incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal
          .declarationsNumber === 2 &&
        (IRSData?.capitalIncome
          ?.incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal
          .grossIncomeYear1 === 0 ||
          IRSData?.capitalIncome
            ?.incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal
            .grossIncomeYear2 === 0)
      ) &&
      !(
        IRSData?.capitalIncome
          ?.incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal
          .declarationsNumber === 3 &&
        IRSData?.capitalIncome
          ?.incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal
          .grossIncomeYear1 === 0 &&
        IRSData?.capitalIncome
          ?.incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal
          .grossIncomeYear2 === 0 &&
        IRSData?.capitalIncome
          ?.incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal
          .grossIncomeYear3 === 0
      ) &&
      !(
        IRSData?.capitalIncome
          ?.incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal
          .declarationsNumber === 3 &&
        IRSData?.capitalIncome
          ?.incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal
          .grossIncomeYear1 === 0 &&
        IRSData?.capitalIncome
          ?.incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal
          .grossIncomeYear2 === 0 &&
        IRSData?.capitalIncome
          ?.incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal
          .grossIncomeYear3 === 0
      )
    ) {
      setIsButton(false);
    } else {
      setIsButton(true);
    }
  }

  // Anexo F
  if (IRSData?.propertyIncome.propertyIncomeCheckBox === true) {
    if (
      IRSData?.propertyIncome.earnedIncome.grossIncome > 0 ||
      IRSData?.propertyIncome.sublease.incomeReceivedByTheSublessor > 0
    ) {
      setIsButton(false);
      if (
        (IRSData?.propertyIncome.earnedIncome.grossIncome > 0 &&
          IRSData?.propertyIncome.earnedIncome.withholdingTax > 0 &&
          IRSData?.propertyIncome.sublease.incomeReceivedByTheSublessor > 0 &&
          IRSData?.propertyIncome.sublease.rentPaidToLandlord > 0 &&
          IRSData?.propertyIncome.sublease.irsWithholdingTax > 0 &&
          IRSData?.propertyIncome.earnedIncome.withholdingTax <
            IRSData?.propertyIncome.earnedIncome.grossIncome &&
          IRSData?.propertyIncome.sublease.irsWithholdingTax <
            IRSData?.propertyIncome.sublease.incomeReceivedByTheSublessor) ||
        (IRSData?.propertyIncome.earnedIncome.grossIncome > 0 &&
          IRSData?.propertyIncome.earnedIncome.withholdingTax > 0 &&
          IRSData?.propertyIncome.sublease.incomeReceivedByTheSublessor === 0 &&
          IRSData?.propertyIncome.sublease.rentPaidToLandlord === 0 &&
          IRSData?.propertyIncome.sublease.irsWithholdingTax === 0 &&
          IRSData?.propertyIncome.earnedIncome.withholdingTax <
            IRSData?.propertyIncome.earnedIncome.grossIncome) ||
        (IRSData?.propertyIncome.earnedIncome.grossIncome === 0 &&
          IRSData?.propertyIncome.earnedIncome.withholdingTax === 0 &&
          IRSData?.propertyIncome.sublease.incomeReceivedByTheSublessor > 0 &&
          IRSData?.propertyIncome.sublease.rentPaidToLandlord > 0 &&
          IRSData?.propertyIncome.sublease.irsWithholdingTax > 0 &&
          IRSData?.propertyIncome.sublease.irsWithholdingTax <
            IRSData?.propertyIncome.sublease.incomeReceivedByTheSublessor)
      ) {
        setIsButtonTaxesGreaterGrossIncome(false);
      } else {
        setIsButtonTaxesGreaterGrossIncome(true);
      }
    } else {
      setIsButton(true);
    }
  }

  // Anexo H
  if (
    IRSData?.exemptIncomeOrIntellectualProperty
      .exemptIncomeOrIntellectualPropertCheckBox === true
  ) {
    if (
      IRSData?.exemptIncomeOrIntellectualProperty
        .exemptIncomeSubjectToAggregation.grossIncome > 0 ||
      IRSData?.exemptIncomeOrIntellectualProperty
        .incomeFromIntellectualPropertyPartiallyExempted.income > 0
    ) {
      setIsButton(false);
      if (
        (IRSData?.exemptIncomeOrIntellectualProperty
          .exemptIncomeSubjectToAggregation.grossIncome > 0 &&
          IRSData?.exemptIncomeOrIntellectualProperty
            .exemptIncomeSubjectToAggregation.irsWithholdingTax <
            IRSData?.exemptIncomeOrIntellectualProperty
              .exemptIncomeSubjectToAggregation.grossIncome) ||
        (IRSData?.exemptIncomeOrIntellectualProperty
          .exemptIncomeSubjectToAggregation.grossIncome === 0 &&
          IRSData?.exemptIncomeOrIntellectualProperty
            .exemptIncomeSubjectToAggregation.irsWithholdingTax ===
            IRSData?.exemptIncomeOrIntellectualProperty
              .exemptIncomeSubjectToAggregation.grossIncome)
      ) {
        setIsButtonTaxesGreaterGrossIncome(false);
      } else {
        setIsButtonTaxesGreaterGrossIncome(true);
      }
    } else {
      setIsButton(true);
    }
  }

  // Anexo J - Rendimentos obtidos no estrangeiro para residentes
  if (
    IRSData?.incomeEarnedAbroadForResidents
      .incomeEarnedAbroadForResidentsCheckBox === true
  ) {
    if (
      // Categoria A
      IRSData?.incomeEarnedAbroadForResidents.incomeFromDependentWork
        .grossIncome > 0 ||
      // Categoria H
      IRSData?.incomeEarnedAbroadForResidents.pensionIncome.grossIncome > 0 ||
      // Categoria B
      IRSData?.incomeEarnedAbroadForResidents.businessAndProfessionalIncome
        .grossIncome > 0 ||
      // Categoria F
      IRSData?.incomeEarnedAbroadForResidents.propertyIncome.netIncome > 0 ||
      // Categoria E
      IRSData?.incomeEarnedAbroadForResidents.capitalIncome.grossIncome > 0
    ) {
      setIsButton(false);
      if (
        // Categoria A
        ((IRSData?.incomeEarnedAbroadForResidents.incomeFromDependentWork
          .grossIncome > 0 &&
          (IRSData?.incomeEarnedAbroadForResidents.incomeFromDependentWork
            .taxPaidAbroad || 0) +
            (IRSData?.incomeEarnedAbroadForResidents.incomeFromDependentWork
              .withholding || 0) +
            (IRSData?.incomeEarnedAbroadForResidents.incomeFromDependentWork
              .surchargeWithholding || 0) +
            (IRSData?.incomeEarnedAbroadForResidents.incomeFromDependentWork
              .contributionsToSocialProtectionSchemes || 0) <
            IRSData?.incomeEarnedAbroadForResidents.incomeFromDependentWork
              .grossIncome) ||
          (IRSData?.incomeEarnedAbroadForResidents.incomeFromDependentWork
            .grossIncome === 0 &&
            (IRSData?.incomeEarnedAbroadForResidents.incomeFromDependentWork
              .taxPaidAbroad || 0) +
              (IRSData?.incomeEarnedAbroadForResidents.incomeFromDependentWork
                .withholding || 0) +
              (IRSData?.incomeEarnedAbroadForResidents.incomeFromDependentWork
                .surchargeWithholding || 0) +
              (IRSData?.incomeEarnedAbroadForResidents.incomeFromDependentWork
                .contributionsToSocialProtectionSchemes || 0) ===
              IRSData?.incomeEarnedAbroadForResidents.incomeFromDependentWork
                .grossIncome)) &&
        // Categoria H
        ((IRSData?.incomeEarnedAbroadForResidents.pensionIncome.grossIncome >
          0 &&
          (IRSData?.incomeEarnedAbroadForResidents.pensionIncome
            .taxPaidAbroad || 0) +
            (IRSData?.incomeEarnedAbroadForResidents.pensionIncome
              .contributionsToSocialProtectionSchemes || 0) <
            IRSData?.incomeEarnedAbroadForResidents.pensionIncome
              .grossIncome) ||
          (IRSData?.incomeEarnedAbroadForResidents.pensionIncome.grossIncome ===
            0 &&
            (IRSData?.incomeEarnedAbroadForResidents.pensionIncome
              .taxPaidAbroad || 0) +
              (IRSData?.incomeEarnedAbroadForResidents.pensionIncome
                .contributionsToSocialProtectionSchemes || 0) ===
              IRSData?.incomeEarnedAbroadForResidents.pensionIncome
                .grossIncome)) &&
        // Categoria B
        ((IRSData?.incomeEarnedAbroadForResidents.businessAndProfessionalIncome
          .grossIncome > 0 &&
          (IRSData?.incomeEarnedAbroadForResidents.businessAndProfessionalIncome
            .contributionsToSocialProtectionSchemes || 0) +
            (IRSData?.incomeEarnedAbroadForResidents
              .businessAndProfessionalIncome.taxPaidAbroad || 0) +
            (IRSData?.incomeEarnedAbroadForResidents
              .businessAndProfessionalIncome.withholding || 0) <
            IRSData?.incomeEarnedAbroadForResidents
              .businessAndProfessionalIncome.grossIncome) ||
          (IRSData?.incomeEarnedAbroadForResidents.businessAndProfessionalIncome
            .grossIncome === 0 &&
            (IRSData?.incomeEarnedAbroadForResidents
              .businessAndProfessionalIncome
              .contributionsToSocialProtectionSchemes || 0) +
              (IRSData?.incomeEarnedAbroadForResidents
                .businessAndProfessionalIncome.taxPaidAbroad || 0) +
              (IRSData?.incomeEarnedAbroadForResidents
                .businessAndProfessionalIncome.withholding || 0) ===
              IRSData?.incomeEarnedAbroadForResidents
                .businessAndProfessionalIncome.grossIncome)) &&
        // Categoria F
        ((IRSData?.incomeEarnedAbroadForResidents.propertyIncome.netIncome >
          0 &&
          IRSData?.incomeEarnedAbroadForResidents.propertyIncome.taxPaidAbroad <
            IRSData?.incomeEarnedAbroadForResidents.propertyIncome.netIncome) ||
          (IRSData?.incomeEarnedAbroadForResidents.propertyIncome.netIncome ===
            0 &&
            IRSData?.incomeEarnedAbroadForResidents.propertyIncome
              .taxPaidAbroad ===
              IRSData?.incomeEarnedAbroadForResidents.propertyIncome
                .netIncome)) &&
        // Categoria E
        ((IRSData?.incomeEarnedAbroadForResidents.capitalIncome.grossIncome >
          0 &&
          IRSData?.incomeEarnedAbroadForResidents.capitalIncome
            .eithholdingTaxInPortugal <
            IRSData?.incomeEarnedAbroadForResidents.capitalIncome
              .grossIncome) ||
          (IRSData?.incomeEarnedAbroadForResidents.capitalIncome.grossIncome ===
            0 &&
            IRSData?.incomeEarnedAbroadForResidents.capitalIncome
              .eithholdingTaxInPortugal ===
              IRSData?.incomeEarnedAbroadForResidents.capitalIncome
                .grossIncome))
      ) {
        setIsButtonTaxesGreaterGrossIncome(false);
      } else {
        setIsButtonTaxesGreaterGrossIncome(true);
      }
    } else {
      setIsButton(true);
    }
  }

  // Rendimentos obtidos no estrangeiro para não residentes
  if (
    IRSData?.incomeEarnedAbroadForNonResidents
      .incomeEarnedAbroadForNonResidentsCheckBok === true
  ) {
    if (
      IRSData?.incomeEarnedAbroadForNonResidents.incomeNotExemptFromTax
        .grossIncome > 0 ||
      IRSData?.incomeEarnedAbroadForNonResidents.taxFreeIncome.grossIncome > 0
    ) {
      setIsButton(false);
      if (
        (IRSData?.incomeEarnedAbroadForNonResidents.incomeNotExemptFromTax
          .grossIncome > 0 &&
          (IRSData?.incomeEarnedAbroadForNonResidents.incomeNotExemptFromTax
            .taxPaidAbroad || 0) +
            (IRSData?.incomeEarnedAbroadForNonResidents.incomeNotExemptFromTax
              .taxWithheldAbroad || 0) <
            IRSData?.incomeEarnedAbroadForNonResidents.incomeNotExemptFromTax
              .grossIncome) ||
        (IRSData?.incomeEarnedAbroadForNonResidents.incomeNotExemptFromTax
          .grossIncome === 0 &&
          (IRSData?.incomeEarnedAbroadForNonResidents.incomeNotExemptFromTax
            .taxPaidAbroad || 0) +
            (IRSData?.incomeEarnedAbroadForNonResidents.incomeNotExemptFromTax
              .taxWithheldAbroad || 0) ===
            IRSData?.incomeEarnedAbroadForNonResidents.incomeNotExemptFromTax
              .grossIncome)
      ) {
        setIsButtonTaxesGreaterGrossIncome(false);
      } else {
        setIsButtonTaxesGreaterGrossIncome(true);
      }
    } else {
      setIsButton(true);
    }
  }

  // Outros Rendimentos
  if (IRSData?.otherIncome.otherIncomeCheckBox === true) {
    if (IRSData?.otherIncome.otherNetIncome > 0) {
      setIsButton(false);
    } else {
      setIsButton(true);
    }
  }
};

const validateMandatoryFieldsReceipts = (
  ReceiptsData: receiptsData,
  setIsButton: any,
  calculateIsRegularOrIrregular: any,
  Taxes: taxes
) => {
  setIsButton(false);
  if (
    ReceiptsData?.salaryOrPensionReceipts?.salaryOrPensionReceiptsCheckBox! ===
    true
  ) {
    if (
      (ReceiptsData?.salaryOrPensionReceipts?.receipt1! > 0 &&
        ReceiptsData?.salaryOrPensionReceipts?.receipt2! > 0 &&
        ReceiptsData?.salaryOrPensionReceipts?.receipt3! > 0 &&
        calculateIsRegularOrIrregular({
          receipt1Value: ReceiptsData?.salaryOrPensionReceipts?.receipt1!,
          receipt2Value: ReceiptsData?.salaryOrPensionReceipts?.receipt2!,
          receipt3Value: ReceiptsData?.salaryOrPensionReceipts?.receipt3!,
          valueOfRegularReceipts: Taxes?.valueOfRegularReceipts!,
        }) === false) ||
      (ReceiptsData?.salaryOrPensionReceipts?.receipt1! > 0 &&
        ReceiptsData?.salaryOrPensionReceipts?.receipt2! > 0 &&
        ReceiptsData?.salaryOrPensionReceipts?.receipt3! > 0 &&
        ReceiptsData?.salaryOrPensionReceipts?.receipt4! > 0 &&
        ReceiptsData?.salaryOrPensionReceipts?.receipt5! > 0 &&
        ReceiptsData?.salaryOrPensionReceipts?.receipt6! > 0 &&
        calculateIsRegularOrIrregular({
          receipt1Value: ReceiptsData?.salaryOrPensionReceipts?.receipt1!,
          receipt2Value: ReceiptsData?.salaryOrPensionReceipts?.receipt2!,
          receipt3Value: ReceiptsData?.salaryOrPensionReceipts?.receipt3!,
          valueOfRegularReceipts: Taxes?.valueOfRegularReceipts!,
        }) === true)
    ) {
      setIsButton(false);
    } else {
      setIsButton(true);
    }
  }
  if (ReceiptsData?.greenReceipts?.greenReceiptsCheckBox! === true) {
    if (
      (ReceiptsData?.greenReceipts?.greenReceiptsIncomes1?.receiptValue! > 0 &&
        ReceiptsData?.greenReceipts?.greenReceiptsIncomes2?.receiptValue! > 0 &&
        ReceiptsData?.greenReceipts?.greenReceiptsIncomes3?.receiptValue! > 0 &&
        calculateIsRegularOrIrregular({
          receipt1Value:
            ReceiptsData?.greenReceipts?.greenReceiptsIncomes1?.receiptValue!,
          receipt2Value:
            ReceiptsData?.greenReceipts?.greenReceiptsIncomes2?.receiptValue!,
          receipt3Value:
            ReceiptsData?.greenReceipts?.greenReceiptsIncomes3?.receiptValue!,
          valueOfRegularReceipts: Taxes?.valueOfRegularReceipts!,
        }) === false) ||
      (ReceiptsData?.greenReceipts?.greenReceiptsIncomes1?.receiptValue! > 0 &&
        ReceiptsData?.greenReceipts?.greenReceiptsIncomes2?.receiptValue! > 0 &&
        ReceiptsData?.greenReceipts?.greenReceiptsIncomes3?.receiptValue! > 0 &&
        ReceiptsData?.greenReceipts?.greenReceiptsIncomes4?.receiptValue! > 0 &&
        ReceiptsData?.greenReceipts?.greenReceiptsIncomes5?.receiptValue! > 0 &&
        ReceiptsData?.greenReceipts?.greenReceiptsIncomes6?.receiptValue! > 0 &&
        calculateIsRegularOrIrregular({
          receipt1Value:
            ReceiptsData?.greenReceipts?.greenReceiptsIncomes1?.receiptValue!,
          receipt2Value:
            ReceiptsData?.greenReceipts?.greenReceiptsIncomes2?.receiptValue!,
          receipt3Value:
            ReceiptsData?.greenReceipts?.greenReceiptsIncomes3?.receiptValue!,
          valueOfRegularReceipts: Taxes?.valueOfRegularReceipts!,
        }) === true)
    ) {
      setIsButton(false);
    } else {
      setIsButton(true);
    }
  }
  if (
    ReceiptsData?.propertyIncomeReceipts?.propertyIncomeRecCheckBox! === true
  ) {
    if (
      (ReceiptsData?.propertyIncomeReceipts?.receipt1! > 0 &&
        ReceiptsData?.propertyIncomeReceipts?.receipt2! > 0 &&
        ReceiptsData?.propertyIncomeReceipts?.receipt3! > 0 &&
        calculateIsRegularOrIrregular({
          receipt1Value: ReceiptsData?.propertyIncomeReceipts?.receipt1!,
          receipt2Value: ReceiptsData?.propertyIncomeReceipts?.receipt2!,
          receipt3Value: ReceiptsData?.propertyIncomeReceipts?.receipt3!,
          valueOfRegularReceipts: Taxes?.valueOfRegularReceipts!,
        }) === false) ||
      (ReceiptsData?.propertyIncomeReceipts?.receipt1! > 0 &&
        ReceiptsData?.propertyIncomeReceipts?.receipt2! > 0 &&
        ReceiptsData?.propertyIncomeReceipts?.receipt3! > 0 &&
        ReceiptsData?.propertyIncomeReceipts?.receipt4! > 0 &&
        ReceiptsData?.propertyIncomeReceipts?.receipt5! > 0 &&
        ReceiptsData?.propertyIncomeReceipts?.receipt6! > 0 &&
        calculateIsRegularOrIrregular({
          receipt1Value: ReceiptsData?.propertyIncomeReceipts?.receipt1!,
          receipt2Value: ReceiptsData?.propertyIncomeReceipts?.receipt2!,
          receipt3Value: ReceiptsData?.propertyIncomeReceipts?.receipt3!,
          valueOfRegularReceipts: Taxes?.valueOfRegularReceipts!,
        }) === true)
    ) {
      setIsButton(false);
    } else {
      setIsButton(true);
    }
  }
  if (
    ReceiptsData?.researchScholarshipsInternshipReceipts
      ?.researchScholarReceiptsCheckBox! === true
  ) {
    if (
      (ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt1! > 0 &&
        ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt2! > 0 &&
        ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt3! > 0 &&
        calculateIsRegularOrIrregular({
          receipt1Value:
            ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt1!,
          receipt2Value:
            ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt2!,
          receipt3Value:
            ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt3!,
          valueOfRegularReceipts: Taxes?.valueOfRegularReceipts!,
        }) === false) ||
      (ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt1! > 0 &&
        ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt2! > 0 &&
        ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt3! > 0 &&
        ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt4! > 0 &&
        ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt5! > 0 &&
        ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt6! > 0 &&
        calculateIsRegularOrIrregular({
          receipt1Value:
            ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt1!,
          receipt2Value:
            ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt2!,
          receipt3Value:
            ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt3!,
          valueOfRegularReceipts: Taxes?.valueOfRegularReceipts!,
        }) === true)
    ) {
      setIsButton(false);
    } else {
      setIsButton(true);
    }
  }
  if (ReceiptsData?.alimonyReceipts?.almonyReceiptsCheckBox! === true) {
    if (
      (ReceiptsData?.alimonyReceipts?.receipt1! > 0 &&
        ReceiptsData?.alimonyReceipts?.receipt2! > 0 &&
        ReceiptsData?.alimonyReceipts?.receipt3! > 0 &&
        calculateIsRegularOrIrregular({
          receipt1Value: ReceiptsData?.alimonyReceipts?.receipt1!,
          receipt2Value: ReceiptsData?.alimonyReceipts?.receipt2!,
          receipt3Value: ReceiptsData?.alimonyReceipts?.receipt3!,
          valueOfRegularReceipts: Taxes?.valueOfRegularReceipts!,
        }) === false) ||
      (ReceiptsData?.alimonyReceipts?.receipt1! > 0 &&
        ReceiptsData?.alimonyReceipts?.receipt2! > 0 &&
        ReceiptsData?.alimonyReceipts?.receipt3! > 0 &&
        ReceiptsData?.alimonyReceipts?.receipt4! > 0 &&
        ReceiptsData?.alimonyReceipts?.receipt5! > 0 &&
        ReceiptsData?.alimonyReceipts?.receipt6! > 0 &&
        calculateIsRegularOrIrregular({
          receipt1Value: ReceiptsData?.alimonyReceipts?.receipt1!,
          receipt2Value: ReceiptsData?.alimonyReceipts?.receipt2!,
          receipt3Value: ReceiptsData?.alimonyReceipts?.receipt3!,
          valueOfRegularReceipts: Taxes?.valueOfRegularReceipts!,
        }) === true)
    ) {
      setIsButton(false);
    } else {
      setIsButton(true);
    }
  }
};

export { validateMandatoryFieldsIRS, validateMandatoryFieldsReceipts };
