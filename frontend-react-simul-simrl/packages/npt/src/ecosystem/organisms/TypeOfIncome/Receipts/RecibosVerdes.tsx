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
  holderDataInitialStateAgriYieldsSilvLivstck,
  holderDataInitialStateIndComProIncome,
  setClean,
  setGreenReceipts,
} from "../../../../store/modules/entities/holder/slices";
import {
  formatNumber2DecimalPlaces,
  formatToEuroCurrency,
  roundValue,
} from "../../../../utils/utils";
import { Model3Data } from "../../../../store/modules/entities/holder/types";
import { color } from "../../../../utils/colors";

const initialGreenReceipt = {
  receiptValue: 0,
  grossIncomes: {
    indComProIncome: holderDataInitialStateIndComProIncome,
    agriYieldsSilvLivstck: holderDataInitialStateAgriYieldsSilvLivstck,
  },
};

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
    if (setModel3Data)
      setModel3Data({ show: false, title: "", isAttachmentJ: false });
  };

  const handleCleanIrregularReceipts = (isRegularOrIrregular: boolean) => {
    dispatch(
      setGreenReceipts({
        data: {
          greenReceiptsIncomes4: initialGreenReceipt,
          greenReceiptsIncomes5: initialGreenReceipt,
          greenReceiptsIncomes6: initialGreenReceipt,
          isIrregular: isRegularOrIrregular,
        },
      })
    );
  };

  const checkIsRegular = useDebouncedCallback(() => {
    if (
      ReceiptsData?.greenReceipts.greenReceiptsIncomes1?.receiptValue! > 0 &&
      ReceiptsData?.greenReceipts.greenReceiptsIncomes2?.receiptValue! > 0 &&
      ReceiptsData?.greenReceipts.greenReceiptsIncomes3?.receiptValue! > 0
    ) {
      const isRegularOrIrregular = calculateIsRegularOrIrregular({
        receipt1Value:
          ReceiptsData?.greenReceipts?.greenReceiptsIncomes1?.receiptValue!,
        receipt2Value:
          ReceiptsData?.greenReceipts?.greenReceiptsIncomes2?.receiptValue!,
        receipt3Value:
          ReceiptsData?.greenReceipts?.greenReceiptsIncomes3?.receiptValue!,
        valueOfRegularReceipts:
          Taxes?.recParams.percVarAvgIncRecAboveIrreg.parameterValue!,
      });
      if (isRegularOrIrregular === false) {
        handleCleanIrregularReceipts(isRegularOrIrregular);
      }
      setIsIrregular(isRegularOrIrregular);
    } else {
      setIsIrregular(false);
      handleCleanIrregularReceipts(false);
      dispatch(
        setGreenReceipts({
          data: {
            isIrregular: false,
          },
        })
      );
    }
  }, 1000);

  useEffect(() => {
    checkIsRegular();
  }, [
    ReceiptsData?.greenReceipts?.greenReceiptsIncomes1.receiptValue!,
    ReceiptsData?.greenReceipts?.greenReceiptsIncomes2.receiptValue!,
    ReceiptsData?.greenReceipts?.greenReceiptsIncomes3.receiptValue!,
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
    field: string
  ) => {
    dispatch(
      setGreenReceipts({
        data: {
          [field]: {
            receiptValue: valueTotal,
            grossIncomes: {
              indComProIncome: { ...indComProIncomeClone },
              agriYieldsSilvLivstck: { ...agriYieldsSilvLivstckClone },
            },
          },
          isIrregular,
        },
      })
    );
    if (setModel3Data)
      setModel3Data({ show: false, title: "", isAttachmentJ: false });
  };

  const saveValues = (
    valueTotal: any,
    indComProIncomeClone: any,
    agriYieldsSilvLivstckClone: any,
    field: string
  ) => {
    dispatch(
      setGreenReceipts({
        data: {
          [field]: {
            receiptValue: valueTotal,
            grossIncomes: {
              indComProIncome: { ...indComProIncomeClone },
              agriYieldsSilvLivstck: { ...agriYieldsSilvLivstckClone },
            },
          },
          isIrregular,
        },
      })
    );
  };

  const handleCleanModel = (field: string) => {
    dispatch(
      setGreenReceipts({
        data: {
          [field]: initialGreenReceipt,
          isIrregular,
        },
      })
    );
  };

  const commonReceiptComponent = (receiptNumber: string) => {
    let receiptValue1: any = 0;
    let indComProIncome1: any = 0;
    let agriYieldsSilvLivstck1: any = 0;

    let receiptValue2: any = 0;
    let indComProIncome2: any = 0;
    let agriYieldsSilvLivstck2: any = 0;
    switch (receiptNumber) {
      case "4":
        receiptValue1 =
          ReceiptsData?.greenReceipts?.greenReceiptsIncomes4?.receiptValue!;
        indComProIncome1 =
          ReceiptsData?.greenReceipts?.greenReceiptsIncomes4?.grossIncomes
            ?.indComProIncome;
        agriYieldsSilvLivstck1 =
          ReceiptsData?.greenReceipts?.greenReceiptsIncomes4?.grossIncomes
            ?.agriYieldsSilvLivstck;
        receiptValue2 =
          ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes4
            ?.receiptValue!;
        indComProIncome2 =
          ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes4
            ?.grossIncomes?.indComProIncome;
        agriYieldsSilvLivstck2 =
          ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes4
            ?.grossIncomes?.agriYieldsSilvLivstck;
        break;
      case "5":
        receiptValue1 =
          ReceiptsData?.greenReceipts?.greenReceiptsIncomes5?.receiptValue!;
        indComProIncome1 =
          ReceiptsData?.greenReceipts?.greenReceiptsIncomes5?.grossIncomes
            ?.indComProIncome;
        agriYieldsSilvLivstck1 =
          ReceiptsData?.greenReceipts?.greenReceiptsIncomes5?.grossIncomes
            ?.agriYieldsSilvLivstck;
        receiptValue2 =
          ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes5
            ?.receiptValue!;
        indComProIncome2 =
          ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes5
            ?.grossIncomes?.indComProIncome;
        agriYieldsSilvLivstck2 =
          ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes5
            ?.grossIncomes?.agriYieldsSilvLivstck;
        break;
      case "6":
        receiptValue1 =
          ReceiptsData?.greenReceipts?.greenReceiptsIncomes6?.receiptValue!;
        indComProIncome1 =
          ReceiptsData?.greenReceipts?.greenReceiptsIncomes6?.grossIncomes
            ?.indComProIncome;
        agriYieldsSilvLivstck1 =
          ReceiptsData?.greenReceipts?.greenReceiptsIncomes6?.grossIncomes
            ?.agriYieldsSilvLivstck;
        receiptValue2 =
          ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes6
            ?.receiptValue!;
        indComProIncome2 =
          ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes6
            ?.grossIncomes?.indComProIncome;
        agriYieldsSilvLivstck2 =
          ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes6
            ?.grossIncomes?.agriYieldsSilvLivstck;
        break;
      default:
    }

    return (
      <span style={{ position: "relative" }}>
        <TextField
          id={`greenReceiptsIncomes${receiptNumber}`}
          label={`${t("baseReceiptAmount")} ${receiptNumber}`}
          defaultValue={
            roundValue(receiptValue1) === 0
              ? undefined
              : formatNumber2DecimalPlaces(roundValue(receiptValue1))
          }
          placeholder={readOnly ? formatToEuroCurrency(receiptValue2) : ""}
          isDisabled={!isIrregular || readOnly}
          infoIcon
          textInfo={t("fieldEmptyIsZero")}
        />
        {!(!isIrregular || readOnly) && (
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
                  isAttachmentJ: false,
                  indComProIncome: {
                    ...indComProIncome1,
                  },
                  agriYieldsSilvLivstck: {
                    ...agriYieldsSilvLivstck1,
                  },
                  indComProIncomeByHolder: {
                    ...indComProIncome2,
                  },
                  agriYieldsSilvLivstckByHolder: {
                    ...agriYieldsSilvLivstck2,
                  },
                  totalGrossIncomeByHolder: receiptValue2,
                  applyTotalValue: (
                    valueTotal: any,
                    indComProIncomeClone: any,
                    agriYieldsSilvLivstckClone: any
                  ) => {
                    applyTotalValue(
                      valueTotal,
                      indComProIncomeClone,
                      agriYieldsSilvLivstckClone,
                      `greenReceiptsIncomes${receiptNumber}`
                    );
                  },
                  handleCleanModel: () => {
                    handleCleanModel(`greenReceiptsIncomes${receiptNumber}`);
                  },
                  saveValues: (
                    indComProIncomeClone: any,
                    agriYieldsSilvLivstckClone: any
                  ) => {
                    const valueTotal =
                      receiptValue1 === 0
                        ? 0
                        : +formatNumber2DecimalPlaces(
                            roundValue(receiptValue1)
                          );
                    saveValues(
                      valueTotal,
                      indComProIncomeClone,
                      agriYieldsSilvLivstckClone,
                      `greenReceiptsIncomes${receiptNumber}`
                    );
                  },
                });
              }
            }}
          />
        )}
      </span>
    );
  };

  useEffect(() => {
    if (ReceiptsData?.greenReceipts?.greenReceiptsCheckBox! === false) {
      if (setModel3Data)
        setModel3Data({ show: false, title: "", isAttachmentJ: false });
    }
  }, [ReceiptsData?.greenReceipts?.greenReceiptsCheckBox!]);

  return (
    <div>
      {!readOnly && (
        <div className="info-wrapper">
          <img src={info} alt="img" width="18px" />
          <Text
            text={t("greenReceiptsText")}
            fontSize="11px"
            margin="0px 0px 0px 10px"
            color={color.nb_bluegray}
            alignSelf="center"
          />
        </div>
      )}
      <span style={{ position: "relative" }}>
        <TextField
          id="greenReceiptsIncomes1"
          label={`${t("baseReceiptAmount")} 1`}
          defaultValue={
            roundValue(
              ReceiptsData?.greenReceipts?.greenReceiptsIncomes1?.receiptValue!
            ) === 0
              ? undefined
              : formatNumber2DecimalPlaces(
                  roundValue(
                    ReceiptsData?.greenReceipts?.greenReceiptsIncomes1
                      ?.receiptValue!
                  )
                )
          }
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes1
                    ?.receiptValue
                )
              : ""
          }
          isDisabled={readOnly}
          infoIcon
          textInfo={t("fieldEmptyIsZero")}
        />
        {!readOnly && (
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
                  isAttachmentJ: false,
                  indComProIncome: {
                    ...ReceiptsData?.greenReceipts?.greenReceiptsIncomes1
                      ?.grossIncomes?.indComProIncome,
                  },
                  agriYieldsSilvLivstck: {
                    ...ReceiptsData?.greenReceipts?.greenReceiptsIncomes1
                      ?.grossIncomes?.agriYieldsSilvLivstck,
                  },
                  indComProIncomeByHolder: {
                    ...ReceiptsDataByHolder?.greenReceipts
                      ?.greenReceiptsIncomes1?.grossIncomes?.indComProIncome,
                  },
                  agriYieldsSilvLivstckByHolder: {
                    ...ReceiptsDataByHolder?.greenReceipts
                      ?.greenReceiptsIncomes1?.grossIncomes
                      ?.agriYieldsSilvLivstck,
                  },
                  totalGrossIncomeByHolder:
                    ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes1
                      ?.receiptValue,
                  applyTotalValue: (
                    valueTotal: any,
                    indComProIncomeClone: any,
                    agriYieldsSilvLivstckClone: any
                  ) => {
                    applyTotalValue(
                      valueTotal,
                      indComProIncomeClone,
                      agriYieldsSilvLivstckClone,
                      "greenReceiptsIncomes1"
                    );
                  },
                  handleCleanModel: () => {
                    handleCleanModel("greenReceiptsIncomes1");
                  },
                  saveValues: (
                    indComProIncomeClone: any,
                    agriYieldsSilvLivstckClone: any
                  ) => {
                    const valueTotal =
                      ReceiptsData?.greenReceipts?.greenReceiptsIncomes1
                        ?.receiptValue! === 0
                        ? 0
                        : +formatNumber2DecimalPlaces(
                            roundValue(
                              ReceiptsData?.greenReceipts?.greenReceiptsIncomes1
                                ?.receiptValue!
                            )
                          );
                    saveValues(
                      valueTotal,
                      indComProIncomeClone,
                      agriYieldsSilvLivstckClone,
                      "greenReceiptsIncomes1"
                    );
                  },
                });
              }
            }}
          />
        )}
      </span>
      <span style={{ position: "relative" }}>
        <TextField
          id="greenReceiptsIncomes2"
          label={`${t("baseReceiptAmount")} 2`}
          defaultValue={
            roundValue(
              ReceiptsData?.greenReceipts?.greenReceiptsIncomes2?.receiptValue!
            ) === 0
              ? undefined
              : formatNumber2DecimalPlaces(
                  roundValue(
                    ReceiptsData?.greenReceipts?.greenReceiptsIncomes2
                      ?.receiptValue!
                  )
                )
          }
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes2
                    ?.receiptValue
                )
              : ""
          }
          isDisabled={readOnly}
          infoIcon
          textInfo={t("fieldEmptyIsZero")}
        />
        {!readOnly && (
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
                  isAttachmentJ: false,
                  indComProIncome: {
                    ...ReceiptsData?.greenReceipts?.greenReceiptsIncomes2
                      ?.grossIncomes?.indComProIncome,
                  },
                  agriYieldsSilvLivstck: {
                    ...ReceiptsData?.greenReceipts?.greenReceiptsIncomes2
                      ?.grossIncomes?.agriYieldsSilvLivstck,
                  },
                  indComProIncomeByHolder: {
                    ...ReceiptsDataByHolder?.greenReceipts
                      ?.greenReceiptsIncomes2?.grossIncomes?.indComProIncome,
                  },
                  agriYieldsSilvLivstckByHolder: {
                    ...ReceiptsDataByHolder?.greenReceipts
                      ?.greenReceiptsIncomes2?.grossIncomes
                      ?.agriYieldsSilvLivstck,
                  },
                  totalGrossIncomeByHolder:
                    ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes2
                      ?.receiptValue,
                  applyTotalValue: (
                    valueTotal: any,
                    indComProIncomeClone: any,
                    agriYieldsSilvLivstckClone: any
                  ) => {
                    applyTotalValue(
                      valueTotal,
                      indComProIncomeClone,
                      agriYieldsSilvLivstckClone,
                      "greenReceiptsIncomes2"
                    );
                  },
                  handleCleanModel: () => {
                    handleCleanModel("greenReceiptsIncomes2");
                  },
                  saveValues: (
                    indComProIncomeClone: any,
                    agriYieldsSilvLivstckClone: any
                  ) => {
                    const valueTotal =
                      ReceiptsData?.greenReceipts?.greenReceiptsIncomes2
                        ?.receiptValue! === 0
                        ? 0
                        : +formatNumber2DecimalPlaces(
                            roundValue(
                              ReceiptsData?.greenReceipts?.greenReceiptsIncomes2
                                ?.receiptValue!
                            )
                          );
                    saveValues(
                      valueTotal,
                      indComProIncomeClone,
                      agriYieldsSilvLivstckClone,
                      "greenReceiptsIncomes2"
                    );
                  },
                });
              }
            }}
          />
        )}
      </span>
      <span style={{ position: "relative" }}>
        <TextField
          id="greenReceiptsIncomes3"
          label={`${t("baseReceiptAmount")} 3`}
          defaultValue={
            roundValue(
              ReceiptsData?.greenReceipts?.greenReceiptsIncomes3?.receiptValue!
            ) === 0
              ? undefined
              : formatNumber2DecimalPlaces(
                  roundValue(
                    ReceiptsData?.greenReceipts?.greenReceiptsIncomes3
                      ?.receiptValue!
                  )
                )
          }
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes3
                    ?.receiptValue
                )
              : ""
          }
          isDisabled={readOnly}
          infoIcon
          textInfo={t("fieldEmptyIsZero")}
        />
        {!readOnly && (
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
                  isAttachmentJ: false,
                  indComProIncome: {
                    ...ReceiptsData?.greenReceipts?.greenReceiptsIncomes3
                      ?.grossIncomes?.indComProIncome,
                  },
                  agriYieldsSilvLivstck: {
                    ...ReceiptsData?.greenReceipts?.greenReceiptsIncomes3
                      ?.grossIncomes?.agriYieldsSilvLivstck,
                  },
                  indComProIncomeByHolder: {
                    ...ReceiptsDataByHolder?.greenReceipts
                      ?.greenReceiptsIncomes3?.grossIncomes?.indComProIncome,
                  },
                  agriYieldsSilvLivstckByHolder: {
                    ...ReceiptsDataByHolder?.greenReceipts
                      ?.greenReceiptsIncomes3?.grossIncomes
                      ?.agriYieldsSilvLivstck,
                  },
                  totalGrossIncomeByHolder:
                    ReceiptsDataByHolder?.greenReceipts?.greenReceiptsIncomes3
                      ?.receiptValue,
                  applyTotalValue: (
                    valueTotal: any,
                    indComProIncomeClone: any,
                    agriYieldsSilvLivstckClone: any
                  ) => {
                    applyTotalValue(
                      valueTotal,
                      indComProIncomeClone,
                      agriYieldsSilvLivstckClone,
                      "greenReceiptsIncomes3"
                    );
                  },
                  handleCleanModel: () => {
                    handleCleanModel("greenReceiptsIncomes3");
                  },
                  saveValues: (
                    indComProIncomeClone: any,
                    agriYieldsSilvLivstckClone: any
                  ) => {
                    const valueTotal =
                      ReceiptsData?.greenReceipts?.greenReceiptsIncomes3
                        ?.receiptValue! === 0
                        ? 0
                        : +formatNumber2DecimalPlaces(
                            roundValue(
                              ReceiptsData?.greenReceipts?.greenReceiptsIncomes3
                                ?.receiptValue!
                            )
                          );
                    saveValues(
                      valueTotal,
                      indComProIncomeClone,
                      agriYieldsSilvLivstckClone,
                      "greenReceiptsIncomes3"
                    );
                  },
                });
              }
            }}
          />
        )}
      </span>
      {readOnly ? (
        summaryIsRegular() ? null : (
          <>
            {commonReceiptComponent("4")}
            {commonReceiptComponent("5")}
            {commonReceiptComponent("6")}
          </>
        )
      ) : (
        <>
          {commonReceiptComponent("4")}
          {commonReceiptComponent("5")}
          {commonReceiptComponent("6")}
        </>
      )}
      <div className="buttons">
        {!readOnly && (
          <NBButton variant="outlined" onClick={handleClean}>
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
