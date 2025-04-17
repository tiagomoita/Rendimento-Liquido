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
        return;
      }
    } else {
      setIsButton(true);
      return;
    }
  }

  // Anexo B
  if (
    IRSData?.independentWithoutOrganizedAccounting
      .independentWithoutOrganizedAccountingCheckBox === true
  ) {
    if (
      IRSData?.independentWithoutOrganizedAccounting?.indComProIncome
        ?.saleOfMerchAndProducts > 0 ||
      IRSData?.independentWithoutOrganizedAccounting?.indComProIncome
        ?.provisionHotelServ2015And2016 > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.indComProIncome
        ?.provisionCateringAndBeverageServ > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.indComProIncome
        ?.provisionHotelAndSimilarServ > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.indComProIncome
        ?.provisionLocalAccommodationServ > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.indComProIncome
        ?.incomeProfActivitiesArt151CIRS > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.indComProIncome
        ?.incomeFromUnforcastedServProv > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.indComProIncome
        ?.intellectualPropertyNotArt58EBF > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.indComProIncome
        ?.intellectualPropertyIncomeArt58EBFNonExempt > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.indComProIncome
        ?.positiveBalanceGainsLossesEquityInc > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.indComProIncome
        ?.incomeFromFinancialActivitiesCAE > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.indComProIncome
        ?.servicesProvidedByPartnersProfCo > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.indComProIncome
        ?.positiveResultPropertyIncome > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.indComProIncome
        ?.buildingIncomeAttribCatBActivity > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.indComProIncome
        ?.explorationSubsidies > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.indComProIncome
        ?.otherSubsidies > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.indComProIncome
        ?.catBIncomeNotInPrevFields > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.indComProIncome
        ?.servicesProvidedByPartnersToCompanies > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.agriYieldsSilvLivstck
        ?.salesOfOtherProducts > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.agriYieldsSilvLivstck
        ?.serviceProvision > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.agriYieldsSilvLivstck
        ?.incomeFromCapPropAttribCatB > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.agriYieldsSilvLivstck
        ?.positiveResultPropertyIncome > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.agriYieldsSilvLivstck
        ?.operatingSubsidiesRelatedSales > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.agriYieldsSilvLivstck
        ?.otherSubsidies > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.agriYieldsSilvLivstck
        ?.incomeFromSalesMultiAnnualForestry > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.agriYieldsSilvLivstck
        ?.catBIncomeNotInPrevFields > 0 ||
      IRSData?.independentWithoutOrganizedAccounting.agriYieldsSilvLivstck
        ?.servicesProvidedByPartnersToCompanies > 0
    ) {
      setIsButton(false);
    } else {
      setIsButton(true);
      return;
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
      return;
    }
  }

  // Anexo D
  if (IRSData?.taxTransparency?.taxTransparencyCheckBox === true) {
    if (
      IRSData?.taxTransparency.societies.netIncome > 0 ||
      IRSData?.taxTransparency.complementaryGrouping.profit > 0 ||
      IRSData?.taxTransparency.complementaryGrouping.losses > 0
    ) {
      setIsButton(false);
    } else {
      setIsButton(true);
      return;
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
          .declarationsNumber === 0 &&
        IRSData?.capitalIncome
          ?.incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal
          .declarationsNumber === 0
      ) &&
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
      return;
    }
  }

  // Anexo F
  if (IRSData?.propertyIncome.propertyIncomeCheckBox === true) {
    if (
      (IRSData?.propertyIncome.earnedIncome.grossIncome > 0 &&
        IRSData?.propertyIncome.sublease.incomeReceivedByTheSublessor === 0 &&
        IRSData?.propertyIncome.sublease.irsWithholdingTax === 0 &&
        IRSData?.propertyIncome.sublease.rentPaidToLandlord === 0) ||
      (IRSData?.propertyIncome.sublease.incomeReceivedByTheSublessor > 0 &&
        IRSData?.propertyIncome.sublease.rentPaidToLandlord > 0 &&
        IRSData?.propertyIncome.earnedIncome.grossIncome === 0 &&
        IRSData?.propertyIncome.earnedIncome.supportedAndPaidExpenses === 0 &&
        IRSData?.propertyIncome.earnedIncome.withholdingTax === 0) ||
      (IRSData?.propertyIncome.earnedIncome.grossIncome > 0 &&
        IRSData?.propertyIncome.sublease.incomeReceivedByTheSublessor > 0 &&
        IRSData?.propertyIncome.sublease.rentPaidToLandlord > 0)
    ) {
      setIsButton(false);
      if (
        (IRSData?.propertyIncome.earnedIncome.grossIncome > 0 &&
          IRSData?.propertyIncome.sublease.incomeReceivedByTheSublessor > 0 &&
          IRSData?.propertyIncome.sublease.rentPaidToLandlord > 0 &&
          IRSData?.propertyIncome.earnedIncome.withholdingTax <
            IRSData?.propertyIncome.earnedIncome.grossIncome &&
          IRSData?.propertyIncome.sublease.irsWithholdingTax <
            IRSData?.propertyIncome.sublease.incomeReceivedByTheSublessor) ||
        (IRSData?.propertyIncome.earnedIncome.grossIncome > 0 &&
          IRSData?.propertyIncome.sublease.incomeReceivedByTheSublessor === 0 &&
          IRSData?.propertyIncome.sublease.rentPaidToLandlord === 0 &&
          IRSData?.propertyIncome.sublease.irsWithholdingTax === 0 &&
          IRSData?.propertyIncome.earnedIncome.withholdingTax <
            IRSData?.propertyIncome.earnedIncome.grossIncome) ||
        (IRSData?.propertyIncome.sublease.incomeReceivedByTheSublessor > 0 &&
          IRSData?.propertyIncome.sublease.rentPaidToLandlord > 0 &&
          IRSData?.propertyIncome.earnedIncome.grossIncome === 0 &&
          IRSData?.propertyIncome.earnedIncome.withholdingTax === 0 &&
          IRSData?.propertyIncome.earnedIncome.supportedAndPaidExpenses === 0 &&
          IRSData?.propertyIncome.sublease.irsWithholdingTax <
            IRSData?.propertyIncome.sublease.incomeReceivedByTheSublessor)
      ) {
        setIsButtonTaxesGreaterGrossIncome(false);
      } else {
        setIsButtonTaxesGreaterGrossIncome(true);
        return;
      }
    } else {
      setIsButton(true);
      return;
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
        return;
      }
    } else {
      setIsButton(true);
      return;
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
        .grossIncomeValue > 0 ||
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
          .grossIncomeValue > 0 &&
          (IRSData?.incomeEarnedAbroadForResidents.businessAndProfessionalIncome
            .contributionsToSocialProtectionSchemes || 0) +
            (IRSData?.incomeEarnedAbroadForResidents
              .businessAndProfessionalIncome.taxPaidAbroad || 0) +
            (IRSData?.incomeEarnedAbroadForResidents
              .businessAndProfessionalIncome.withholding || 0) <
            IRSData?.incomeEarnedAbroadForResidents
              .businessAndProfessionalIncome.grossIncomeValue) ||
          (IRSData?.incomeEarnedAbroadForResidents.businessAndProfessionalIncome
            .grossIncomeValue === 0 &&
            (IRSData?.incomeEarnedAbroadForResidents
              .businessAndProfessionalIncome
              .contributionsToSocialProtectionSchemes || 0) +
              (IRSData?.incomeEarnedAbroadForResidents
                .businessAndProfessionalIncome.taxPaidAbroad || 0) +
              (IRSData?.incomeEarnedAbroadForResidents
                .businessAndProfessionalIncome.withholding || 0) ===
              IRSData?.incomeEarnedAbroadForResidents
                .businessAndProfessionalIncome.grossIncomeValue)) &&
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
        return;
      }
    } else {
      setIsButton(true);
      return;
    }
  }

  // Rendimentos obtidos no estrangeiro para não residentes
  if (
    IRSData?.incomeEarnedAbroadForNonResidents
      .incomeEarnedAbroadForNonResidentsCheckBok === true
  ) {
    if (
      (IRSData?.incomeEarnedAbroadForNonResidents.incomeNotExemptFromTax
        .grossIncome > 0 &&
        (IRSData?.incomeEarnedAbroadForNonResidents.incomeNotExemptFromTax
          .taxPaidAbroad > 0 ||
          IRSData?.incomeEarnedAbroadForNonResidents.incomeNotExemptFromTax
            .taxWithheldAbroad > 0)) ||
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
      return;
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
      ((ReceiptsData?.salaryOrPensionReceipts?.receipt1! > 0 ||
        ReceiptsData?.salaryOrPensionReceipts?.receipt2! > 0 ||
        ReceiptsData?.salaryOrPensionReceipts?.receipt3! > 0) &&
        calculateIsRegularOrIrregular({
          receipt1Value: ReceiptsData?.salaryOrPensionReceipts?.receipt1!,
          receipt2Value: ReceiptsData?.salaryOrPensionReceipts?.receipt2!,
          receipt3Value: ReceiptsData?.salaryOrPensionReceipts?.receipt3!,
          valueOfRegularReceipts:
            Taxes?.recParams.percVarAvgIncRecAboveIrreg.parameterValue!,
        }) === false) ||
      ((ReceiptsData?.salaryOrPensionReceipts?.receipt1! > 0 ||
        ReceiptsData?.salaryOrPensionReceipts?.receipt2! > 0 ||
        ReceiptsData?.salaryOrPensionReceipts?.receipt3! > 0 ||
        ReceiptsData?.salaryOrPensionReceipts?.receipt4! > 0 ||
        ReceiptsData?.salaryOrPensionReceipts?.receipt5! > 0 ||
        ReceiptsData?.salaryOrPensionReceipts?.receipt6! > 0) &&
        calculateIsRegularOrIrregular({
          receipt1Value: ReceiptsData?.salaryOrPensionReceipts?.receipt1!,
          receipt2Value: ReceiptsData?.salaryOrPensionReceipts?.receipt2!,
          receipt3Value: ReceiptsData?.salaryOrPensionReceipts?.receipt3!,
          valueOfRegularReceipts:
            Taxes?.recParams.percVarAvgIncRecAboveIrreg.parameterValue!,
        }) === true)
    ) {
      setIsButton(false);
    } else {
      setIsButton(true);
      return;
    }
  }
  if (ReceiptsData?.greenReceipts?.greenReceiptsCheckBox! === true) {
    if (
      (ReceiptsData?.greenReceipts.greenReceiptsIncomes1?.receiptValue! > 0 &&
        ReceiptsData?.greenReceipts.greenReceiptsIncomes2?.receiptValue! > 0 &&
        ReceiptsData?.greenReceipts.greenReceiptsIncomes3?.receiptValue! > 0 &&
        calculateIsRegularOrIrregular({
          receipt1Value:
            ReceiptsData?.greenReceipts?.greenReceiptsIncomes1?.receiptValue!,
          receipt2Value:
            ReceiptsData?.greenReceipts?.greenReceiptsIncomes2?.receiptValue!,
          receipt3Value:
            ReceiptsData?.greenReceipts?.greenReceiptsIncomes3?.receiptValue!,
          valueOfRegularReceipts:
            Taxes?.recParams.percVarAvgIncRecAboveIrreg.parameterValue!,
        }) === false) ||
      (ReceiptsData?.greenReceipts.greenReceiptsIncomes1?.receiptValue! > 0 &&
        ReceiptsData?.greenReceipts.greenReceiptsIncomes2?.receiptValue! > 0 &&
        ReceiptsData?.greenReceipts.greenReceiptsIncomes3?.receiptValue! > 0 &&
        ReceiptsData?.greenReceipts.greenReceiptsIncomes4?.receiptValue! > 0 &&
        ReceiptsData?.greenReceipts.greenReceiptsIncomes5?.receiptValue! > 0 &&
        ReceiptsData?.greenReceipts.greenReceiptsIncomes6?.receiptValue! > 0 &&
        calculateIsRegularOrIrregular({
          receipt1Value:
            ReceiptsData?.greenReceipts?.greenReceiptsIncomes1?.receiptValue!,
          receipt2Value:
            ReceiptsData?.greenReceipts?.greenReceiptsIncomes2?.receiptValue!,
          receipt3Value:
            ReceiptsData?.greenReceipts?.greenReceiptsIncomes3?.receiptValue!,
          valueOfRegularReceipts:
            Taxes?.recParams.percVarAvgIncRecAboveIrreg.parameterValue!,
        }) === true)
    ) {
      setIsButton(false);
    } else {
      setIsButton(true);
      return;
    }
  }
  if (
    ReceiptsData?.propertyIncomeReceipts?.propertyIncomeRecCheckBox! === true
  ) {
    if (
      ((ReceiptsData?.propertyIncomeReceipts?.receipt1! > 0 ||
        ReceiptsData?.propertyIncomeReceipts?.receipt2! > 0 ||
        ReceiptsData?.propertyIncomeReceipts?.receipt3! > 0) &&
        calculateIsRegularOrIrregular({
          receipt1Value: ReceiptsData?.propertyIncomeReceipts?.receipt1!,
          receipt2Value: ReceiptsData?.propertyIncomeReceipts?.receipt2!,
          receipt3Value: ReceiptsData?.propertyIncomeReceipts?.receipt3!,
          valueOfRegularReceipts:
            Taxes?.recParams.percVarAvgIncRecAboveIrreg.parameterValue!,
        }) === false) ||
      ((ReceiptsData?.propertyIncomeReceipts?.receipt1! > 0 ||
        ReceiptsData?.propertyIncomeReceipts?.receipt2! > 0 ||
        ReceiptsData?.propertyIncomeReceipts?.receipt3! > 0 ||
        ReceiptsData?.propertyIncomeReceipts?.receipt4! > 0 ||
        ReceiptsData?.propertyIncomeReceipts?.receipt5! > 0 ||
        ReceiptsData?.propertyIncomeReceipts?.receipt6! > 0) &&
        calculateIsRegularOrIrregular({
          receipt1Value: ReceiptsData?.propertyIncomeReceipts?.receipt1!,
          receipt2Value: ReceiptsData?.propertyIncomeReceipts?.receipt2!,
          receipt3Value: ReceiptsData?.propertyIncomeReceipts?.receipt3!,
          valueOfRegularReceipts:
            Taxes?.recParams.percVarAvgIncRecAboveIrreg.parameterValue!,
        }) === true)
    ) {
      setIsButton(false);
    } else {
      setIsButton(true);
      return;
    }
  }
  if (
    ReceiptsData?.researchScholarshipsInternshipReceipts
      ?.researchScholarReceiptsCheckBox! === true
  ) {
    if (
      ((ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt1! > 0 ||
        ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt2! > 0 ||
        ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt3! > 0) &&
        calculateIsRegularOrIrregular({
          receipt1Value:
            ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt1!,
          receipt2Value:
            ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt2!,
          receipt3Value:
            ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt3!,
          valueOfRegularReceipts:
            Taxes?.recParams.percVarAvgIncRecAboveIrreg.parameterValue!,
        }) === false) ||
      ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt1! > 0 ||
      ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt2! > 0 ||
      ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt3! > 0 ||
      ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt4! > 0 ||
      ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt5! > 0 ||
      ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt6! > 0 ||
      calculateIsRegularOrIrregular({
        receipt1Value:
          ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt1!,
        receipt2Value:
          ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt2!,
        receipt3Value:
          ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt3!,
        valueOfRegularReceipts:
          Taxes?.recParams.percVarAvgIncRecAboveIrreg.parameterValue!,
      }) === true
    ) {
      setIsButton(false);
    } else {
      setIsButton(true);
      return;
    }
  }
  if (ReceiptsData?.alimonyReceipts?.almonyReceiptsCheckBox! === true) {
    if (
      ((ReceiptsData?.alimonyReceipts?.receipt1! > 0 ||
        ReceiptsData?.alimonyReceipts?.receipt2! > 0 ||
        ReceiptsData?.alimonyReceipts?.receipt3! > 0) &&
        calculateIsRegularOrIrregular({
          receipt1Value: ReceiptsData?.alimonyReceipts?.receipt1!,
          receipt2Value: ReceiptsData?.alimonyReceipts?.receipt2!,
          receipt3Value: ReceiptsData?.alimonyReceipts?.receipt3!,
          valueOfRegularReceipts:
            Taxes?.recParams.percVarAvgIncRecAboveIrreg.parameterValue!,
        }) === false) ||
      ((ReceiptsData?.alimonyReceipts?.receipt1! > 0 ||
        ReceiptsData?.alimonyReceipts?.receipt2! > 0 ||
        ReceiptsData?.alimonyReceipts?.receipt3! > 0 ||
        ReceiptsData?.alimonyReceipts?.receipt4! > 0 ||
        ReceiptsData?.alimonyReceipts?.receipt5! > 0 ||
        ReceiptsData?.alimonyReceipts?.receipt6! > 0) &&
        calculateIsRegularOrIrregular({
          receipt1Value: ReceiptsData?.alimonyReceipts?.receipt1!,
          receipt2Value: ReceiptsData?.alimonyReceipts?.receipt2!,
          receipt3Value: ReceiptsData?.alimonyReceipts?.receipt3!,
          valueOfRegularReceipts:
            Taxes?.recParams.percVarAvgIncRecAboveIrreg.parameterValue!,
        }) === true)
    ) {
      setIsButton(false);
    } else {
      setIsButton(true);
    }
  }
};

const formatValue2DecimalPlaces = (formatedValue: string) => {
  const fValue = formatedValue === "NaN" ? "0" : formatedValue.toString();
  const floatValue = parseFloat(fValue?.replace(",", ".")).toFixed(2);
  return floatValue.replace(".", ",");
};

export {
  validateMandatoryFieldsIRS,
  validateMandatoryFieldsReceipts,
  formatValue2DecimalPlaces,
};
