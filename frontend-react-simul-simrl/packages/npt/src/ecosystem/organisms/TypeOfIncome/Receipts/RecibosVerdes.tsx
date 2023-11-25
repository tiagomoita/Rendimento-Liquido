/* eslint-disable no-nested-ternary */
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NBButton } from "@nb-omc-xit-frontend/nb-shared/lib/NBButton";
import { calculateIsRegularOrIrregular } from "npm-pkg-simul-simrl";
import { useDebouncedCallback } from "use-debounce";
import { useTranslation } from "react-i18next";
import TextField from "../../../atoms/TextField";
import Total from "../../../atoms/Total";
import Text from "../../../atoms/Text";
import info from "../../../../assets/images/info.svg";
import {
  retrieveReceiptsData,
  retrieveReceiptsDataByHolder,
  retrieveTaxes,
} from "../../../../store/modules/entities/holder/selectors";
import {
  setClean,
  setGreenReceipts,
} from "../../../../store/modules/entities/holder/slices";
import { formatToEuroCurrency } from "../../../../utils/utils";
import { Model3Data } from "../../../../store/modules/entities/holder/types";
import { color } from "../../../../utils/colors";

type RecibosVerdesProps = {
  setModel3Data?: Dispatch<SetStateAction<Model3Data>>;
  readOnly?: boolean;
  tabHolder?: number;
};

const RecibosVerdes = (props: RecibosVerdesProps) => {
  const { readOnly, tabHolder, setModel3Data } = props;
  const { t } = useTranslation();

  const [isIrregular, setIsIrregular] = useState(false);
  const ReceiptsData = useSelector(retrieveReceiptsData);
  const ReceiptsDataByHolder = useSelector(
    retrieveReceiptsDataByHolder(tabHolder!)
  );
  const Taxes = useSelector(retrieveTaxes);
  const dispatch = useDispatch();

  const handleClean = () => {
    dispatch(setClean("greenReceipts2"));
    setIsIrregular(false);
  };

  const checkIsRegular = useDebouncedCallback(() => {
    if (
      ReceiptsData?.greenReceipts?.greenReceiptsIncomes1?.receiptValue! > 0 &&
      ReceiptsData?.greenReceipts?.greenReceiptsIncomes2?.receiptValue! > 0 &&
      ReceiptsData?.greenReceipts?.greenReceiptsIncomes3?.receiptValue! > 0
    ) {
      setIsIrregular(
        calculateIsRegularOrIrregular({
          receipt1Value:
            ReceiptsData?.greenReceipts?.greenReceiptsIncomes1?.receiptValue!,
          receipt2Value:
            ReceiptsData?.greenReceipts?.greenReceiptsIncomes2?.receiptValue!,
          receipt3Value:
            ReceiptsData?.greenReceipts?.greenReceiptsIncomes3?.receiptValue!,
          valueOfRegularReceipts: Taxes?.valueOfRegularReceipts!,
        })
      );
    } else {
      setIsIrregular(false);
    }
  }, 1000);

  useEffect(() => {
    checkIsRegular();
  }, [
    ReceiptsData?.greenReceipts?.greenReceiptsIncomes1?.receiptValue!,
    ReceiptsData?.greenReceipts?.greenReceiptsIncomes2?.receiptValue!,
    ReceiptsData?.greenReceipts?.greenReceiptsIncomes3?.receiptValue!,
  ]);

  const summaryIsRegular = () => {
    if (
      ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes4
        ?.receiptValue === 0 &&
      ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes5
        ?.receiptValue === 0 &&
      ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes6
        ?.receiptValue === 0
    ) {
      return true;
    }
    return false;
  };

  const applyTotalValue = (
    valueTotal: any,
    indComProIncomeClone: any,
    agriYieldsSilvLivstckClone: any,
    otherIncomeClone: any,
    field: string
  ) => {
    dispatch(
      setGreenReceipts({
        data: {
          [field]: {
            receiptValue: valueTotal,
            indComProIncome: { ...indComProIncomeClone },
            agriYieldsSilvLivstck: { ...agriYieldsSilvLivstckClone },
            otherIncome: { ...otherIncomeClone },
          },
          isIrregular,
        },
      })
    );
    if (setModel3Data) setModel3Data({ show: false, title: "" });
  };

  const handleCleanModel = (field: string) => {
    dispatch(
      setGreenReceipts({
        data: {
          [field]: {
            receiptValue: 0,
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
            otherIncome: { otherIncome: 0 },
          },
          isIrregular,
        },
      })
    );
  };

  return (
    <div>
      {!readOnly && (
        <div className="info-wrapper">
          <img src={info} alt="img" width="18px" />
          <Text
            text={t("fieldEmptyIsZero")}
            fontSize="11px"
            margin="0px 0px 0px 10px"
            color={color.nb_bluegray}
            alignSelf="center"
          />
        </div>
      )}
      <span style={{ position: "relative" }}>
        <TextField
          label={`${t("receipt")} 1`}
          defaultValue={
            ReceiptsData?.greenReceipts?.greenReceiptsIncomes1
              ?.receiptValue! === 0
              ? undefined
              : ReceiptsData?.greenReceipts?.greenReceiptsIncomes1?.receiptValue?.toString()!
          }
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes1
                    ?.receiptValue
                )
              : ""
          }
          isDisabled
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            cursor: "pointer",
          }}
          role="presentation"
          onClick={() => {
            if (setModel3Data) {
              setModel3Data({
                title: `${t("attachment")} B`,
                show: true,
                indComProIncome: {
                  ...ReceiptsData?.greenReceipts?.greenReceiptsIncomes1
                    ?.indComProIncome,
                },
                agriYieldsSilvLivstck: {
                  ...ReceiptsData?.greenReceipts?.greenReceiptsIncomes1
                    ?.agriYieldsSilvLivstck,
                },
                otherIncome: {
                  ...ReceiptsData?.greenReceipts?.greenReceiptsIncomes1
                    ?.otherIncome,
                },
                indComProIncomeByHolder: {
                  ...ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes1
                    ?.indComProIncome,
                },
                agriYieldsSilvLivstckByHolder: {
                  ...ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes1
                    ?.agriYieldsSilvLivstck,
                },
                otherIncomeByHolder: {
                  ...ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes1
                    ?.otherIncome,
                },
                totalGrossIncomeByHolder:
                  ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes1
                    ?.receiptValue,
                applyTotalValue: (
                  valueTotal: any,
                  indComProIncomeClone: any,
                  agriYieldsSilvLivstckClone: any,
                  otherIncomeClone: any
                ) => {
                  applyTotalValue(
                    valueTotal,
                    indComProIncomeClone,
                    agriYieldsSilvLivstckClone,
                    otherIncomeClone,
                    "greenReceiptsIncomes1"
                  );
                },
                handleCleanModel: () => {
                  handleCleanModel("greenReceiptsIncomes1");
                },
              });
            }
          }}
        />
      </span>
      <span style={{ position: "relative" }}>
        <TextField
          label={`${t("receipt")} 2`}
          defaultValue={
            ReceiptsData?.greenReceipts?.greenReceiptsIncomes2
              ?.receiptValue! === 0
              ? undefined
              : ReceiptsData?.greenReceipts?.greenReceiptsIncomes2?.receiptValue?.toString()!
          }
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes2
                    ?.receiptValue
                )
              : ""
          }
          isDisabled
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            cursor: "pointer",
          }}
          role="presentation"
          onClick={() => {
            if (setModel3Data) {
              setModel3Data({
                title: `${t("attachment")} B`,
                show: true,
                indComProIncome: {
                  ...ReceiptsData?.greenReceipts?.greenReceiptsIncomes2
                    ?.indComProIncome,
                },
                agriYieldsSilvLivstck: {
                  ...ReceiptsData?.greenReceipts?.greenReceiptsIncomes2
                    ?.agriYieldsSilvLivstck,
                },
                otherIncome: {
                  ...ReceiptsData?.greenReceipts?.greenReceiptsIncomes2
                    ?.otherIncome,
                },
                indComProIncomeByHolder: {
                  ...ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes2
                    ?.indComProIncome,
                },
                agriYieldsSilvLivstckByHolder: {
                  ...ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes2
                    ?.agriYieldsSilvLivstck,
                },
                otherIncomeByHolder: {
                  ...ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes2
                    ?.otherIncome,
                },
                totalGrossIncomeByHolder:
                  ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes2
                    ?.receiptValue,
                applyTotalValue: (
                  valueTotal: any,
                  indComProIncomeClone: any,
                  agriYieldsSilvLivstckClone: any,
                  otherIncomeClone: any
                ) => {
                  applyTotalValue(
                    valueTotal,
                    indComProIncomeClone,
                    agriYieldsSilvLivstckClone,
                    otherIncomeClone,
                    "greenReceiptsIncomes2"
                  );
                },
                handleCleanModel: () => {
                  handleCleanModel("greenReceiptsIncomes2");
                },
              });
            }
          }}
        />
      </span>
      <span style={{ position: "relative" }}>
        <TextField
          label={`${t("receipt")} 3`}
          defaultValue={
            ReceiptsData?.greenReceipts?.greenReceiptsIncomes3
              ?.receiptValue! === 0
              ? undefined
              : ReceiptsData?.greenReceipts?.greenReceiptsIncomes3?.receiptValue?.toString()!
          }
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes3
                    ?.receiptValue
                )
              : ""
          }
          isDisabled
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            cursor: "pointer",
          }}
          role="presentation"
          onClick={() => {
            if (setModel3Data) {
              setModel3Data({
                title: `${t("attachment")} B`,
                show: true,
                indComProIncome: {
                  ...ReceiptsData?.greenReceipts?.greenReceiptsIncomes3
                    ?.indComProIncome,
                },
                agriYieldsSilvLivstck: {
                  ...ReceiptsData?.greenReceipts?.greenReceiptsIncomes3
                    ?.agriYieldsSilvLivstck,
                },
                otherIncome: {
                  ...ReceiptsData?.greenReceipts?.greenReceiptsIncomes3
                    ?.otherIncome,
                },
                indComProIncomeByHolder: {
                  ...ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes3
                    ?.indComProIncome,
                },
                agriYieldsSilvLivstckByHolder: {
                  ...ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes3
                    ?.agriYieldsSilvLivstck,
                },
                otherIncomeByHolder: {
                  ...ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes3
                    ?.otherIncome,
                },
                totalGrossIncomeByHolder:
                  ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes3
                    ?.receiptValue,
                applyTotalValue: (
                  valueTotal: any,
                  indComProIncomeClone: any,
                  agriYieldsSilvLivstckClone: any,
                  otherIncomeClone: any
                ) => {
                  applyTotalValue(
                    valueTotal,
                    indComProIncomeClone,
                    agriYieldsSilvLivstckClone,
                    otherIncomeClone,
                    "greenReceiptsIncomes3"
                  );
                },
                handleCleanModel: () => {
                  handleCleanModel("greenReceiptsIncomes3");
                },
              });
            }
          }}
        />
      </span>
      {readOnly ? (
        summaryIsRegular() ? null : (
          <>
            <span style={{ position: "relative" }}>
              <TextField
                label={`${t("receipt")} 4`}
                defaultValue={
                  ReceiptsData?.greenReceipts?.greenReceiptsIncomes4
                    ?.receiptValue! === 0
                    ? undefined
                    : ReceiptsData?.greenReceipts?.greenReceiptsIncomes4?.receiptValue?.toString()!
                }
                placeholder={
                  readOnly
                    ? formatToEuroCurrency(
                        ReceiptsDataByHolder?.greenReceipts
                          ?.greenReceiptsIncomes4?.receiptValue
                      )
                    : ""
                }
                isDisabled
              />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  cursor: "pointer",
                }}
                role="presentation"
                onClick={() => {
                  if (setModel3Data) {
                    setModel3Data({
                      title: `${t("attachment")} B`,
                      show: true,
                      indComProIncome: {
                        ...ReceiptsData?.greenReceipts?.greenReceiptsIncomes4
                          ?.indComProIncome,
                      },
                      agriYieldsSilvLivstck: {
                        ...ReceiptsData?.greenReceipts?.greenReceiptsIncomes4
                          ?.agriYieldsSilvLivstck,
                      },
                      otherIncome: {
                        ...ReceiptsData?.greenReceipts?.greenReceiptsIncomes4
                          ?.otherIncome,
                      },
                      indComProIncomeByHolder: {
                        ...ReceiptsDataByHolder?.greenReceipts
                          ?.greenReceiptsIncomes4?.indComProIncome,
                      },
                      agriYieldsSilvLivstckByHolder: {
                        ...ReceiptsDataByHolder?.greenReceipts
                          ?.greenReceiptsIncomes4?.agriYieldsSilvLivstck,
                      },
                      otherIncomeByHolder: {
                        ...ReceiptsDataByHolder?.greenReceipts
                          ?.greenReceiptsIncomes4?.otherIncome,
                      },
                      totalGrossIncomeByHolder:
                        ReceiptsDataByHolder?.greenReceipts
                          ?.greenReceiptsIncomes4?.receiptValue,
                      applyTotalValue: (
                        valueTotal: any,
                        indComProIncomeClone: any,
                        agriYieldsSilvLivstckClone: any,
                        otherIncomeClone: any
                      ) => {
                        applyTotalValue(
                          valueTotal,
                          indComProIncomeClone,
                          agriYieldsSilvLivstckClone,
                          otherIncomeClone,
                          "greenReceiptsIncomes4"
                        );
                      },
                      handleCleanModel: () => {
                        handleCleanModel("greenReceiptsIncomes4");
                      },
                    });
                  }
                }}
              />
            </span>
            <span style={{ position: "relative" }}>
              <TextField
                label={`${t("receipt")} 5`}
                defaultValue={
                  ReceiptsData?.greenReceipts?.greenReceiptsIncomes5
                    ?.receiptValue! === 0
                    ? undefined
                    : ReceiptsData?.greenReceipts?.greenReceiptsIncomes5?.receiptValue?.toString()!
                }
                placeholder={
                  readOnly
                    ? formatToEuroCurrency(
                        ReceiptsDataByHolder?.greenReceipts
                          ?.greenReceiptsIncomes5?.receiptValue
                      )
                    : ""
                }
                isDisabled
              />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  cursor: "pointer",
                }}
                role="presentation"
                onClick={() => {
                  if (setModel3Data) {
                    setModel3Data({
                      title: `${t("attachment")} B`,
                      show: true,
                      indComProIncome: {
                        ...ReceiptsData?.greenReceipts?.greenReceiptsIncomes5
                          ?.indComProIncome,
                      },
                      agriYieldsSilvLivstck: {
                        ...ReceiptsData?.greenReceipts?.greenReceiptsIncomes5
                          ?.agriYieldsSilvLivstck,
                      },
                      otherIncome: {
                        ...ReceiptsData?.greenReceipts?.greenReceiptsIncomes5
                          ?.otherIncome,
                      },
                      indComProIncomeByHolder: {
                        ...ReceiptsDataByHolder?.greenReceipts
                          ?.greenReceiptsIncomes5?.indComProIncome,
                      },
                      agriYieldsSilvLivstckByHolder: {
                        ...ReceiptsDataByHolder?.greenReceipts
                          ?.greenReceiptsIncomes5?.agriYieldsSilvLivstck,
                      },
                      otherIncomeByHolder: {
                        ...ReceiptsDataByHolder?.greenReceipts
                          ?.greenReceiptsIncomes5?.otherIncome,
                      },
                      totalGrossIncomeByHolder:
                        ReceiptsDataByHolder?.greenReceipts
                          ?.greenReceiptsIncomes5?.receiptValue,
                      applyTotalValue: (
                        valueTotal: any,
                        indComProIncomeClone: any,
                        agriYieldsSilvLivstckClone: any,
                        otherIncomeClone: any
                      ) => {
                        applyTotalValue(
                          valueTotal,
                          indComProIncomeClone,
                          agriYieldsSilvLivstckClone,
                          otherIncomeClone,
                          "greenReceiptsIncomes5"
                        );
                      },
                      handleCleanModel: () => {
                        handleCleanModel("greenReceiptsIncomes5");
                      },
                    });
                  }
                }}
              />
            </span>
            <span style={{ position: "relative" }}>
              <TextField
                label={`${t("receipt")} 6`}
                defaultValue={
                  ReceiptsData?.greenReceipts?.greenReceiptsIncomes6
                    ?.receiptValue! === 0
                    ? undefined
                    : ReceiptsData?.greenReceipts?.greenReceiptsIncomes6?.receiptValue?.toString()!
                }
                placeholder={
                  readOnly
                    ? formatToEuroCurrency(
                        ReceiptsDataByHolder?.greenReceipts
                          ?.greenReceiptsIncomes6?.receiptValue
                      )
                    : ""
                }
                isDisabled
              />
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  cursor: "pointer",
                }}
                role="presentation"
                onClick={() => {
                  if (setModel3Data) {
                    setModel3Data({
                      title: `${t("attachment")} B`,
                      show: true,
                      indComProIncome: {
                        ...ReceiptsData?.greenReceipts?.greenReceiptsIncomes6
                          ?.indComProIncome,
                      },
                      agriYieldsSilvLivstck: {
                        ...ReceiptsData?.greenReceipts?.greenReceiptsIncomes6
                          ?.agriYieldsSilvLivstck,
                      },
                      otherIncome: {
                        ...ReceiptsData?.greenReceipts?.greenReceiptsIncomes6
                          ?.otherIncome,
                      },
                      indComProIncomeByHolder: {
                        ...ReceiptsDataByHolder?.greenReceipts
                          ?.greenReceiptsIncomes6?.indComProIncome,
                      },
                      agriYieldsSilvLivstckByHolder: {
                        ...ReceiptsDataByHolder?.greenReceipts
                          ?.greenReceiptsIncomes6?.agriYieldsSilvLivstck,
                      },
                      otherIncomeByHolder: {
                        ...ReceiptsDataByHolder?.greenReceipts
                          ?.greenReceiptsIncomes6?.otherIncome,
                      },
                      totalGrossIncomeByHolder:
                        ReceiptsDataByHolder?.greenReceipts
                          ?.greenReceiptsIncomes6?.receiptValue,
                      applyTotalValue: (
                        valueTotal: any,
                        indComProIncomeClone: any,
                        agriYieldsSilvLivstckClone: any,
                        otherIncomeClone: any
                      ) => {
                        applyTotalValue(
                          valueTotal,
                          indComProIncomeClone,
                          agriYieldsSilvLivstckClone,
                          otherIncomeClone,
                          "greenReceiptsIncomes6"
                        );
                      },
                      handleCleanModel: () => {
                        handleCleanModel("greenReceiptsIncomes6");
                      },
                    });
                  }
                }}
              />
            </span>
          </>
        )
      ) : (
        <>
          <span style={{ position: "relative" }}>
            <TextField
              label={`${t("receipt")} 4`}
              defaultValue={
                ReceiptsData?.greenReceipts?.greenReceiptsIncomes4
                  ?.receiptValue! === 0
                  ? undefined
                  : ReceiptsData?.greenReceipts?.greenReceiptsIncomes4?.receiptValue?.toString()!
              }
              placeholder={
                readOnly
                  ? formatToEuroCurrency(
                      ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes4
                        ?.receiptValue
                    )
                  : ""
              }
              isDisabled
            />
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                cursor: "pointer",
              }}
              role="presentation"
              onClick={() => {
                if (setModel3Data) {
                  setModel3Data({
                    title: `${t("attachment")} B`,
                    show: true,
                    indComProIncome: {
                      ...ReceiptsData?.greenReceipts?.greenReceiptsIncomes4
                        ?.indComProIncome,
                    },
                    agriYieldsSilvLivstck: {
                      ...ReceiptsData?.greenReceipts?.greenReceiptsIncomes4
                        ?.agriYieldsSilvLivstck,
                    },
                    otherIncome: {
                      ...ReceiptsData?.greenReceipts?.greenReceiptsIncomes4
                        ?.otherIncome,
                    },
                    indComProIncomeByHolder: {
                      ...ReceiptsDataByHolder?.greenReceipts
                        ?.greenReceiptsIncomes4?.indComProIncome,
                    },
                    agriYieldsSilvLivstckByHolder: {
                      ...ReceiptsDataByHolder?.greenReceipts
                        ?.greenReceiptsIncomes4?.agriYieldsSilvLivstck,
                    },
                    otherIncomeByHolder: {
                      ...ReceiptsDataByHolder?.greenReceipts
                        ?.greenReceiptsIncomes4?.otherIncome,
                    },
                    totalGrossIncomeByHolder:
                      ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes4
                        ?.receiptValue,
                    applyTotalValue: (
                      valueTotal: any,
                      indComProIncomeClone: any,
                      agriYieldsSilvLivstckClone: any,
                      otherIncomeClone: any
                    ) => {
                      applyTotalValue(
                        valueTotal,
                        indComProIncomeClone,
                        agriYieldsSilvLivstckClone,
                        otherIncomeClone,
                        "greenReceiptsIncomes4"
                      );
                    },
                    handleCleanModel: () => {
                      handleCleanModel("greenReceiptsIncomes4");
                    },
                  });
                }
              }}
            />
          </span>
          <span style={{ position: "relative" }}>
            <TextField
              label={`${t("receipt")} 5`}
              defaultValue={
                ReceiptsData?.greenReceipts?.greenReceiptsIncomes5
                  ?.receiptValue! === 0
                  ? undefined
                  : ReceiptsData?.greenReceipts?.greenReceiptsIncomes5?.receiptValue?.toString()!
              }
              placeholder={
                readOnly
                  ? formatToEuroCurrency(
                      ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes5
                        ?.receiptValue
                    )
                  : ""
              }
              isDisabled
            />
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                cursor: "pointer",
              }}
              role="presentation"
              onClick={() => {
                if (setModel3Data) {
                  setModel3Data({
                    title: `${t("attachment")} B`,
                    show: true,
                    indComProIncome: {
                      ...ReceiptsData?.greenReceipts?.greenReceiptsIncomes5
                        ?.indComProIncome,
                    },
                    agriYieldsSilvLivstck: {
                      ...ReceiptsData?.greenReceipts?.greenReceiptsIncomes5
                        ?.agriYieldsSilvLivstck,
                    },
                    otherIncome: {
                      ...ReceiptsData?.greenReceipts?.greenReceiptsIncomes5
                        ?.otherIncome,
                    },
                    indComProIncomeByHolder: {
                      ...ReceiptsDataByHolder?.greenReceipts
                        ?.greenReceiptsIncomes5?.indComProIncome,
                    },
                    agriYieldsSilvLivstckByHolder: {
                      ...ReceiptsDataByHolder?.greenReceipts
                        ?.greenReceiptsIncomes5?.agriYieldsSilvLivstck,
                    },
                    otherIncomeByHolder: {
                      ...ReceiptsDataByHolder?.greenReceipts
                        ?.greenReceiptsIncomes5?.otherIncome,
                    },
                    totalGrossIncomeByHolder:
                      ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes5
                        ?.receiptValue,
                    applyTotalValue: (
                      valueTotal: any,
                      indComProIncomeClone: any,
                      agriYieldsSilvLivstckClone: any,
                      otherIncomeClone: any
                    ) => {
                      applyTotalValue(
                        valueTotal,
                        indComProIncomeClone,
                        agriYieldsSilvLivstckClone,
                        otherIncomeClone,
                        "greenReceiptsIncomes5"
                      );
                    },
                    handleCleanModel: () => {
                      handleCleanModel("greenReceiptsIncomes5");
                    },
                  });
                }
              }}
            />
          </span>
          <span style={{ position: "relative" }}>
            <TextField
              label={`${t("receipt")} 6`}
              defaultValue={
                ReceiptsData?.greenReceipts?.greenReceiptsIncomes6
                  ?.receiptValue! === 0
                  ? undefined
                  : ReceiptsData?.greenReceipts?.greenReceiptsIncomes6?.receiptValue?.toString()!
              }
              placeholder={
                readOnly
                  ? formatToEuroCurrency(
                      ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes6
                        ?.receiptValue
                    )
                  : ""
              }
              isDisabled
            />
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                cursor: "pointer",
              }}
              role="presentation"
              onClick={() => {
                if (setModel3Data) {
                  setModel3Data({
                    title: `${t("attachment")} B`,
                    show: true,
                    indComProIncome: {
                      ...ReceiptsData?.greenReceipts?.greenReceiptsIncomes6
                        ?.indComProIncome,
                    },
                    agriYieldsSilvLivstck: {
                      ...ReceiptsData?.greenReceipts?.greenReceiptsIncomes6
                        ?.agriYieldsSilvLivstck,
                    },
                    otherIncome: {
                      ...ReceiptsData?.greenReceipts?.greenReceiptsIncomes6
                        ?.otherIncome,
                    },
                    indComProIncomeByHolder: {
                      ...ReceiptsDataByHolder?.greenReceipts
                        ?.greenReceiptsIncomes6?.indComProIncome,
                    },
                    agriYieldsSilvLivstckByHolder: {
                      ...ReceiptsDataByHolder?.greenReceipts
                        ?.greenReceiptsIncomes6?.agriYieldsSilvLivstck,
                    },
                    otherIncomeByHolder: {
                      ...ReceiptsDataByHolder?.greenReceipts
                        ?.greenReceiptsIncomes6?.otherIncome,
                    },
                    totalGrossIncomeByHolder:
                      ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes6
                        ?.receiptValue,
                    applyTotalValue: (
                      valueTotal: any,
                      indComProIncomeClone: any,
                      agriYieldsSilvLivstckClone: any,
                      otherIncomeClone: any
                    ) => {
                      applyTotalValue(
                        valueTotal,
                        indComProIncomeClone,
                        agriYieldsSilvLivstckClone,
                        otherIncomeClone,
                        "greenReceiptsIncomes6"
                      );
                    },
                    handleCleanModel: () => {
                      handleCleanModel("greenReceiptsIncomes6");
                    },
                  });
                }
              }}
            />
          </span>
        </>
      )}
      <div className="buttons">
        {!readOnly && (
          <NBButton nbtype="Secondary" onClick={handleClean}>
            {t("clean")}
          </NBButton>
        )}
        <Total
          value={
            readOnly
              ? formatToEuroCurrency(
                  ReceiptsDataByHolder?.greenReceipts?.averageNetIncome!
                )
              : formatToEuroCurrency(
                  ReceiptsData?.greenReceipts?.averageNetIncome!
                )
          }
          isReceipts
        />
      </div>
    </div>
  );
};

export default RecibosVerdes;
