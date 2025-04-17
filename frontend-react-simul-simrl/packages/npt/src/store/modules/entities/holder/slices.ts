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
} from "npm-pkg-simul-simrl";
import {
  createContextThunk,
  findBySimulationIdAndHolderReceiptsThunk,
  findBySimulationIdAndHolderThunk,
  getContextThunk,
  getContextWFThunk,
  getDocumentThunk,
  getTaxesThunk,
  simulationResultsThunk,
} from "./thunks";
import ETypes, {
  aggEachTypeOfIncome,
  AgriYieldsSilvLivstck,
  Context,
  holder,
  holderContext,
  holderData,
  IndComProIncome,
  ReceiptsData,
  ReceiptsDataAux,
  Taxes,
} from "./types";
import { mapValueToMostRepresentativeCheckBok } from "../../../../utils/utils";

export const holderDataInitialStateIndComProIncome: IndComProIncome = {
  saleOfMerchAndProducts: 0,
  provisionHotelServ2015And2016: 0,
  provisionCateringAndBeverageServ: 0,
  provisionHotelAndSimilarServ: 0,
  provisionLocalAccommodationServ: 0,
  incomeProfActivitiesArt151CIRS: 0,
  incomeFromUnforcastedServProv: 0,
  intellectualPropertyNotArt58EBF: 0,
  intellectualPropertyIncomeArt58EBFNonExempt: 0,
  positiveBalanceGainsLossesEquityInc: 0,
  incomeFromFinancialActivitiesCAE: 0,
  servicesProvidedByPartnersProfCo: 0,
  positiveResultPropertyIncome: 0,
  buildingIncomeAttribCatBActivity: 0,
  explorationSubsidies: 0,
  otherSubsidies: 0,
  catBIncomeNotInPrevFields: 0,
  servicesProvidedByPartnersToCompanies: 0,
};

export const holderDataInitialStateAgriYieldsSilvLivstck: AgriYieldsSilvLivstck =
  {
    salesOfOtherProducts: 0,
    serviceProvision: 0,
    incomeFromCapPropAttribCatB: 0,
    positiveResultPropertyIncome: 0,
    operatingSubsidiesRelatedSales: 0,
    otherSubsidies: 0,
    incomeFromSalesMultiAnnualForestry: 0,
    catBIncomeNotInPrevFields: 0,
    servicesProvidedByPartnersToCompanies: 0,
  };

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
    indComProIncome: holderDataInitialStateIndComProIncome,
    agriYieldsSilvLivstck: holderDataInitialStateAgriYieldsSilvLivstck,
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
      grossIncomes: {
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
      },
      grossIncomeValue: 0,
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
      taxPaidAbroad: 0,
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

export const holderReceiptsDataInitialStateAux: ReceiptsDataAux = {
  receipt1: 0,
  receipt2: 0,
  receipt3: 0,
  receipt4: 0,
  receipt5: 0,
  receipt6: 0,
};

export const holderReceiptsDataInitialState: ReceiptsData = {
  salaryOrPensionReceipts: {
    salaryOrPensionReceiptsCheckBox: false,
    ...holderReceiptsDataInitialStateAux,
    averageNetIncome: 0,
  },
  greenReceipts: {
    greenReceiptsCheckBox: false,
    greenReceiptsIncomes1: {
      grossIncomes: {
        indComProIncome: holderDataInitialStateIndComProIncome,
        agriYieldsSilvLivstck: holderDataInitialStateAgriYieldsSilvLivstck,
      },
      receiptValue: 0,
    },
    greenReceiptsIncomes2: {
      grossIncomes: {
        indComProIncome: holderDataInitialStateIndComProIncome,
        agriYieldsSilvLivstck: holderDataInitialStateAgriYieldsSilvLivstck,
      },
      receiptValue: 0,
    },
    greenReceiptsIncomes3: {
      grossIncomes: {
        indComProIncome: holderDataInitialStateIndComProIncome,
        agriYieldsSilvLivstck: holderDataInitialStateAgriYieldsSilvLivstck,
      },
      receiptValue: 0,
    },
    greenReceiptsIncomes4: {
      grossIncomes: {
        indComProIncome: holderDataInitialStateIndComProIncome,
        agriYieldsSilvLivstck: holderDataInitialStateAgriYieldsSilvLivstck,
      },
      receiptValue: 0,
    },
    greenReceiptsIncomes5: {
      grossIncomes: {
        indComProIncome: holderDataInitialStateIndComProIncome,
        agriYieldsSilvLivstck: holderDataInitialStateAgriYieldsSilvLivstck,
      },
      receiptValue: 0,
    },
    greenReceiptsIncomes6: {
      grossIncomes: {
        indComProIncome: holderDataInitialStateIndComProIncome,
        agriYieldsSilvLivstck: holderDataInitialStateAgriYieldsSilvLivstck,
      },
      receiptValue: 0,
    },
    averageNetIncome: 0,
  },
  propertyIncomeReceipts: {
    propertyIncomeRecCheckBox: false,
    ...holderReceiptsDataInitialStateAux,
    averageNetIncome: 0,
  },
  researchScholarshipsInternshipReceipts: {
    researchScholarReceiptsCheckBox: false,
    ...holderReceiptsDataInitialStateAux,
    averageNetIncome: 0,
  },
  alimonyReceipts: {
    almonyReceiptsCheckBox: false,
    ...holderReceiptsDataInitialStateAux,
    averageNetIncome: 0,
  },
};

export const simulationAndContextFulfilledData: any = (holders: any) => {
  return holders.map((elem: any) => {
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
        mapValueToMostRepresentativeCheckBok(
          simulationInputsRec?.mostRepresentative!
        ),
      IRSTotal: simulationInputsIRS?.totalNetIncome!,
      ReceiptsTotal: simulationInputsRec?.totalNetIncome!,
      IRSData: {
        dependentsAndPensions: simulationInputsIRS?.dependentsAndPensions!,
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
        salaryOrPensionReceipts: simulationInputsRec?.salaryOrPensionReceipts!,
        greenReceipts: simulationInputsRec?.greenReceipts!,
        propertyIncomeReceipts: simulationInputsRec?.propertyIncomeReceipts!,
        researchScholarshipsInternshipReceipts:
          simulationInputsRec?.researchScholarshipsInternshipReceipts!,
        alimonyReceipts: simulationInputsRec?.alimonyReceipts!,
      },
    };
  });
};

export const getContextFulfilledData: any = (payload: any) => {
  return {
    SimulationId: payload?.simulationId,
    Holders: payload?.numberOfHolders,
    currentHolder: payload?.currentHolder,
    currentTypeOfIncome: payload?.currentTypeOfIncome,
    cleanHolder: payload?.cleanHolder,
    arrayHolders: simulationAndContextFulfilledData(payload?.holders),
  };
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
  irsParams: {
    taxIncOnIndWorkOrgAcc: {
      parameterValue: 0,
      visible: true,
      parameterCode: "",
      lastUpdate: "",
    },
    taxIncOnIndWorkNoOrgAcc: {
      parameterValue: 0,
      visible: true,
      parameterCode: "",
      lastUpdate: "",
    },
    taxFreeIncEarnedAbroadNonRes: {
      parameterValue: 0,
      visible: true,
      parameterCode: "",
      lastUpdate: "",
    },
  },
  recParams: {
    percVarAvgIncRecAboveIrreg: {
      parameterValue: 0,
      visible: true,
      parameterCode: "",
      lastUpdate: "",
    },
    realEstateIncome: {
      parameterValue: 0,
      visible: true,
      parameterCode: "",
      lastUpdate: "",
    },
  },
  anexxBParams: {
    profCommIndIncomes: {
      saleOfMerchAndProducts: {
        parameterValue: 0,
        visible: true,
        parameterCode: "",
        lastUpdate: "",
      },
      provisionHotelServ2015And2016: {
        parameterValue: 0,
        visible: true,
        parameterCode: "",
        lastUpdate: "",
      },
      provisionCateringAndBeverageServ: {
        parameterValue: 0,
        visible: true,
        parameterCode: "",
        lastUpdate: "",
      },
      provisionHotelAndSimilarServ: {
        parameterValue: 0,
        visible: true,
        parameterCode: "",
        lastUpdate: "",
      },
      provisionLocalAccommodationServ: {
        parameterValue: 0,
        visible: true,
        parameterCode: "",
        lastUpdate: "",
      },
      incomeProfActivitiesArt151CIRS: {
        parameterValue: 0,
        visible: true,
        parameterCode: "",
        lastUpdate: "",
      },
      incomeFromUnforcastedServProv: {
        parameterValue: 0,
        visible: true,
        parameterCode: "",
        lastUpdate: "",
      },
      intellectualPropertyNotArt58EBF: {
        parameterValue: 0,
        visible: true,
        parameterCode: "",
        lastUpdate: "",
      },
      intellectualPropertyIncomeArt58EBFNonExempt: {
        parameterValue: 0,
        visible: true,
        parameterCode: "",
        lastUpdate: "",
      },
      positiveBalanceGainsLossesEquityInc: {
        parameterValue: 0,
        visible: true,
        parameterCode: "",
        lastUpdate: "",
      },
      incomeFromFinancialActivitiesCAE: {
        parameterValue: 0,
        visible: true,
        parameterCode: "",
        lastUpdate: "",
      },
      servicesProvidedByPartnersProfCo: {
        parameterValue: 0,
        visible: true,
        parameterCode: "",
        lastUpdate: "",
      },
      positiveResultPropertyIncome: {
        parameterValue: 0,
        visible: true,
        parameterCode: "",
        lastUpdate: "",
      },
      buildingIncomeAttribCatBActivity: {
        parameterValue: 0,
        visible: true,
        parameterCode: "",
        lastUpdate: "",
      },
      explorationSubsidies: {
        parameterValue: 0,
        visible: true,
        parameterCode: "",
        lastUpdate: "",
      },
      otherSubsidies: {
        parameterValue: 0,
        visible: true,
        parameterCode: "",
        lastUpdate: "",
      },
      catBIncomeNotInPrevFields: {
        parameterValue: 0,
        visible: true,
        parameterCode: "",
        lastUpdate: "",
      },
      servicesProvidedByPartnersToCompanies: {
        parameterValue: 0,
        visible: true,
        parameterCode: "",
        lastUpdate: "",
      },
    },
    agriSilvPecuIncomes: {
      salesOfOtherProducts: {
        parameterValue: 0,
        visible: true,
        parameterCode: "",
        lastUpdate: "",
      },
      serviceProvision: {
        parameterValue: 0,
        visible: true,
        parameterCode: "",
        lastUpdate: "",
      },
      incomeFromCapPropAttribCatB: {
        parameterValue: 0,
        visible: true,
        parameterCode: "",
        lastUpdate: "",
      },
      positiveResultPropertyIncome: {
        parameterValue: 0,
        visible: true,
        parameterCode: "",
        lastUpdate: "",
      },
      operatingSubsidiesRelatedSales: {
        parameterValue: 0,
        visible: true,
        parameterCode: "",
        lastUpdate: "",
      },
      otherSubsidies: {
        parameterValue: 0,
        visible: true,
        parameterCode: "",
        lastUpdate: "",
      },
      incomeFromSalesMultiAnnualForestry: {
        parameterValue: 0,
        visible: true,
        parameterCode: "",
        lastUpdate: "",
      },
      catBIncomeNotInPrevFields: {
        parameterValue: 0,
        visible: true,
        parameterCode: "",
        lastUpdate: "",
      },
      servicesProvidedByPartnersToCompanies: {
        parameterValue: 0,
        visible: true,
        parameterCode: "",
        lastUpdate: "",
      },
    },
  },
  anexxJParams: {
    commIndIncome: {
      parameterValue: 0,
      visible: true,
      parameterCode: "",
      lastUpdate: "",
    },
    agriForestryLivestockIncome: {
      parameterValue: 0,
      visible: true,
      parameterCode: "",
      lastUpdate: "",
    },
    incomeFromProfActSpecProv: {
      parameterValue: 0,
      visible: true,
      parameterCode: "",
      lastUpdate: "",
    },
    incomeFromServNotPrevCodes: {
      parameterValue: 0,
      visible: true,
      parameterCode: "",
      lastUpdate: "",
    },
    incomeFromIntelOrIndusProp: {
      parameterValue: 0,
      visible: true,
      parameterCode: "",
      lastUpdate: "",
    },
    incomeFromIntelPropNonExempt: {
      parameterValue: 0,
      visible: true,
      parameterCode: "",
      lastUpdate: "",
    },
    incomeFromIntelPropExempt: {
      parameterValue: 0,
      visible: true,
      parameterCode: "",
      lastUpdate: "",
    },
    incomeOfArtistsSportsmenPrev: {
      parameterValue: 0,
      visible: true,
      parameterCode: "",
      lastUpdate: "",
    },
    incomeAttrToBusiProfAct: {
      parameterValue: 0,
      visible: true,
      parameterCode: "",
      lastUpdate: "",
    },
    artistIncomePost2018: {
      parameterValue: 0,
      visible: true,
      parameterCode: "",
      lastUpdate: "",
    },
    incomeOfAthletesPost2018: {
      parameterValue: 0,
      visible: true,
      parameterCode: "",
      lastUpdate: "",
    },
  },
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
  ReferenceWF: "",
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
    setInitialStateWF(state) {
      return {
        ...initialState,
        ReferenceWF: state.ReferenceWF,
        Holders: state.Holders,
        arrayHolders: state.arrayHolders.map((elem) => {
          return {
            ...holderInitialState,
            holderNumber: elem.holderNumber,
            Name: elem.Name,
            Nif: elem.Nif,
          };
        }),
      };
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
    setNamesAndNifs(state, { payload }) {
      return {
        ...state,
        arrayHolders: state.arrayHolders.map((e) => {
          if (e.holderNumber === payload[e.holderNumber - 1].currentHolder) {
            return {
              ...e,
              Name: payload[e.holderNumber - 1].Nome,
              Nif: payload[e.holderNumber - 1].Nif,
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
                    dependentsAndPensions:
                      holderIRSDataInitialState.dependentsAndPensions,
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
                    independentWithOrganizedAccounting:
                      holderIRSDataInitialState.independentWithOrganizedAccounting,
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
                    independentWithoutOrganizedAccounting:
                      holderIRSDataInitialState.independentWithoutOrganizedAccounting,
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
                      indComProIncome:
                        holderIRSDataInitialState
                          .independentWithoutOrganizedAccounting
                          .indComProIncome,
                      agriYieldsSilvLivstck:
                        holderIRSDataInitialState
                          .independentWithoutOrganizedAccounting
                          .agriYieldsSilvLivstck,
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
                    taxTransparency: holderIRSDataInitialState.taxTransparency,
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
                    propertyIncome: holderIRSDataInitialState.propertyIncome,
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
                    exemptIncomeOrIntellectualProperty:
                      holderIRSDataInitialState.exemptIncomeOrIntellectualProperty,
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
                    incomeEarnedAbroadForResidents:
                      holderIRSDataInitialState.incomeEarnedAbroadForResidents,
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
                    capitalIncome: holderIRSDataInitialState.capitalIncome,
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
                    incomeEarnedAbroadForNonResidents:
                      holderIRSDataInitialState.incomeEarnedAbroadForNonResidents,
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
                    otherIncome: holderIRSDataInitialState.otherIncome,
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
                    salaryOrPensionReceipts:
                      holderReceiptsDataInitialState.salaryOrPensionReceipts,
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
                    greenReceipts: holderReceiptsDataInitialState.greenReceipts,
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
                    propertyIncomeReceipts:
                      holderReceiptsDataInitialState.propertyIncomeReceipts,
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
                    researchScholarshipsInternshipReceipts:
                      holderReceiptsDataInitialState.researchScholarshipsInternshipReceipts,
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
                    alimonyReceipts:
                      holderReceiptsDataInitialState.alimonyReceipts,
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
                      indComProIncome:
                        holderIRSDataInitialState
                          .independentWithoutOrganizedAccounting
                          .indComProIncome,
                      agriYieldsSilvLivstck:
                        holderIRSDataInitialState
                          .independentWithoutOrganizedAccounting
                          .agriYieldsSilvLivstck,
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
                      indComProIncome:
                        holderIRSDataInitialState
                          .independentWithoutOrganizedAccounting
                          .indComProIncome,
                      agriYieldsSilvLivstck:
                        holderIRSDataInitialState
                          .independentWithoutOrganizedAccounting
                          .agriYieldsSilvLivstck,
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
                      societies:
                        holderIRSDataInitialState.taxTransparency.societies,
                      complementaryGrouping:
                        holderIRSDataInitialState.taxTransparency
                          .complementaryGrouping,
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
                      earnedIncome:
                        holderIRSDataInitialState.propertyIncome.earnedIncome,
                      sublease:
                        holderIRSDataInitialState.propertyIncome.sublease,
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
                      exemptIncomeSubjectToAggregation:
                        holderIRSDataInitialState
                          .exemptIncomeOrIntellectualProperty
                          .exemptIncomeSubjectToAggregation,
                      incomeFromIntellectualPropertyPartiallyExempted:
                        holderIRSDataInitialState
                          .exemptIncomeOrIntellectualProperty
                          .incomeFromIntellectualPropertyPartiallyExempted,
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
                      incomeFromDependentWork:
                        holderIRSDataInitialState.incomeEarnedAbroadForResidents
                          .incomeFromDependentWork,
                      pensionIncome:
                        holderIRSDataInitialState.incomeEarnedAbroadForResidents
                          .pensionIncome,
                      businessAndProfessionalIncome:
                        holderIRSDataInitialState.incomeEarnedAbroadForResidents
                          .businessAndProfessionalIncome,
                      propertyIncome:
                        holderIRSDataInitialState.incomeEarnedAbroadForResidents
                          .propertyIncome,
                      capitalIncome:
                        holderIRSDataInitialState.incomeEarnedAbroadForResidents
                          .capitalIncome,
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
                        holderIRSDataInitialState.capitalIncome
                          .incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal,
                      incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal:
                        holderIRSDataInitialState.capitalIncome
                          .incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal,
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
                      incomeNotExemptFromTax:
                        holderIRSDataInitialState
                          .incomeEarnedAbroadForNonResidents
                          .incomeNotExemptFromTax,
                      taxFreeIncome:
                        holderIRSDataInitialState
                          .incomeEarnedAbroadForNonResidents.taxFreeIncome,
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
                      greenReceiptsIncomes1:
                        holderReceiptsDataInitialState.greenReceipts
                          .greenReceiptsIncomes1,
                      greenReceiptsIncomes2:
                        holderReceiptsDataInitialState.greenReceipts
                          .greenReceiptsIncomes2,
                      greenReceiptsIncomes3:
                        holderReceiptsDataInitialState.greenReceipts
                          .greenReceiptsIncomes3,
                      greenReceiptsIncomes4:
                        holderReceiptsDataInitialState.greenReceipts
                          .greenReceiptsIncomes4,
                      greenReceiptsIncomes5:
                        holderReceiptsDataInitialState.greenReceipts
                          .greenReceiptsIncomes5,
                      greenReceiptsIncomes6:
                        holderReceiptsDataInitialState.greenReceipts
                          .greenReceiptsIncomes6,
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
                    grossIncomeNetTaxRate:
                      state.taxes.irsParams.taxFreeIncEarnedAbroadNonRes
                        .parameterValue,
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
        return {
          ...state,
          ...getContextFulfilledData(payload),
        };
      })
      .addCase(getContextWFThunk.pending, (state) => {
        return state;
      })
      .addCase(getContextWFThunk.rejected, (state) => {
        return state;
      })
      .addCase(getContextWFThunk.fulfilled, (state, { payload }) => {
        return {
          ...state,
          ...getContextFulfilledData(payload),
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
            ReferenceWF: payload.referenceWF,
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
            ReferenceWF: payload.referenceWF,
            arrayHolders: state.arrayHolders.map((e) => {
              if (e.holderNumber === data.currentHolder) {
                return {
                  ...e,
                  irsOrReceipts: mapValueToMostRepresentativeCheckBok(
                    payload.mostRepresentative
                  ),
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
        return {
          ...state,
          arrayHolders: simulationAndContextFulfilledData(payload?.holders),
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
  setInitialStateWF,
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
  setNamesAndNifs,
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
