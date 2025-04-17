/* eslint-disable no-nested-ternary */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NBButton } from "@nb-omc-xit-frontend/nb-shared/lib/NBButton";
import { calculateIsRegularOrIrregular } from "npm-pkg-simul-simrl";
import { useDebouncedCallback } from "use-debounce";
import { useTranslation } from "react-i18next";
import TextField from "../../../atoms/TextField";
import Total from "../../../atoms/Total";
import {
  retrieveReceiptsData,
  retrieveReceiptsDataByHolder,
  retrieveTaxes,
} from "../../../../store/modules/entities/holder/selectors";
import {
  setClean,
  setReiceptsPropertyIncome,
} from "../../../../store/modules/entities/holder/slices";
import { formatToEuroCurrency } from "../../../../utils/utils";

type RendimentosPrediaisProps = {
  readOnly?: boolean;
  tabHolder?: number;
};

const RendimentosPrediais = (props: RendimentosPrediaisProps) => {
  const { readOnly, tabHolder } = props;
  const { t } = useTranslation();
  const ReceiptsData = useSelector(retrieveReceiptsData);
  const [isIrregular, setIsIrregular] = useState(
    !!ReceiptsData?.propertyIncomeReceipts?.receipt4 ||
      !!ReceiptsData?.propertyIncomeReceipts?.receipt5 ||
      !!ReceiptsData?.propertyIncomeReceipts?.receipt6
  );
  const ReceiptsDataByHolder = useSelector(
    retrieveReceiptsDataByHolder(tabHolder!)
  );
  const dispatch = useDispatch();
  const Taxes = useSelector(retrieveTaxes);

  const handleClean = () => {
    dispatch(setClean("propertyIncomeReceipts2"));
    setIsIrregular(false);
  };

  const handleCleanIrregularReceipts = (isRegularOrIrregular: boolean) => {
    dispatch(
      setReiceptsPropertyIncome({
        data: {
          receipt4: 0,
          receipt5: 0,
          receipt6: 0,
          isIrregular: isRegularOrIrregular,
        },
      })
    );
  };

  const checkIsRegular = useDebouncedCallback(() => {
    if (
      ReceiptsData?.propertyIncomeReceipts?.receipt1! > 0 ||
      ReceiptsData?.propertyIncomeReceipts?.receipt2! > 0 ||
      ReceiptsData?.propertyIncomeReceipts?.receipt3! > 0
    ) {
      const isRegularOrIrregular = calculateIsRegularOrIrregular({
        receipt1Value: ReceiptsData?.propertyIncomeReceipts?.receipt1!,
        receipt2Value: ReceiptsData?.propertyIncomeReceipts?.receipt2!,
        receipt3Value: ReceiptsData?.propertyIncomeReceipts?.receipt3!,
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
    }
  }, 1000);

  useEffect(() => {
    checkIsRegular();
  }, [
    ReceiptsData?.propertyIncomeReceipts?.receipt1!,
    ReceiptsData?.propertyIncomeReceipts?.receipt2!,
    ReceiptsData?.propertyIncomeReceipts?.receipt3!,
  ]);

  const handleFieldChange = (field: string) => {
    return (value: number) => {
      dispatch(
        setReiceptsPropertyIncome({
          propertyIncomeTax: Taxes?.recParams.realEstateIncome.parameterValue!,
          data: {
            [field]: value,
            isIrregular,
          },
        })
      );
    };
  };

  const summaryIsRegular = () => {
    return !calculateIsRegularOrIrregular({
      receipt1Value: ReceiptsDataByHolder?.propertyIncomeReceipts?.receipt1!,
      receipt2Value: ReceiptsDataByHolder?.propertyIncomeReceipts?.receipt2!,
      receipt3Value: ReceiptsDataByHolder?.propertyIncomeReceipts?.receipt3!,
      valueOfRegularReceipts:
        Taxes?.recParams.percVarAvgIncRecAboveIrreg.parameterValue!,
    });
  };

  return (
    <div>
      <TextField
        id="propertyIncomeReceipt1"
        label={`${t("grossReceiptValue")} 1`}
        defaultValue={
          ReceiptsData?.propertyIncomeReceipts?.receipt1!.toString()!
        }
        valueCallback={handleFieldChange("receipt1")}
        placeholder={
          readOnly
            ? formatToEuroCurrency(
                ReceiptsDataByHolder?.propertyIncomeReceipts?.receipt1
              )
            : ""
        }
        isDisabled={readOnly}
        infoIcon
        textInfo={t("fieldEmptyIsZero")}
      />
      <TextField
        id="propertyIncomeReceipt2"
        label={`${t("grossReceiptValue")} 2`}
        defaultValue={
          ReceiptsData?.propertyIncomeReceipts?.receipt2!.toString()!
        }
        valueCallback={handleFieldChange("receipt2")}
        placeholder={
          readOnly
            ? formatToEuroCurrency(
                ReceiptsDataByHolder?.propertyIncomeReceipts?.receipt2
              )
            : ""
        }
        isDisabled={readOnly}
        infoIcon
        textInfo={t("fieldEmptyIsZero")}
      />
      <TextField
        id="propertyIncomeReceipt3"
        label={`${t("grossReceiptValue")} 3`}
        defaultValue={
          ReceiptsData?.propertyIncomeReceipts?.receipt3!.toString()!
        }
        valueCallback={handleFieldChange("receipt3")}
        placeholder={
          readOnly
            ? formatToEuroCurrency(
                ReceiptsDataByHolder?.propertyIncomeReceipts?.receipt3
              )
            : ""
        }
        isDisabled={readOnly}
        infoIcon
        textInfo={t("fieldEmptyIsZero")}
      />

      {readOnly ? (
        summaryIsRegular() ? null : (
          <>
            <TextField
              id="propertyIncomeReceipt4"
              label={`${t("grossReceiptValue")} 4`}
              defaultValue={
                !isIrregular
                  ? undefined
                  : ReceiptsData?.propertyIncomeReceipts?.receipt4!.toString()!
              }
              valueCallback={handleFieldChange("receipt4")}
              placeholder={
                readOnly
                  ? formatToEuroCurrency(
                      ReceiptsDataByHolder?.propertyIncomeReceipts?.receipt4
                    )
                  : ""
              }
              isDisabled={!isIrregular || readOnly}
            />
            <TextField
              id="propertyIncomeReceipt5"
              label={`${t("grossReceiptValue")} 5`}
              defaultValue={
                !isIrregular
                  ? undefined
                  : ReceiptsData?.propertyIncomeReceipts?.receipt5!.toString()!
              }
              valueCallback={handleFieldChange("receipt5")}
              placeholder={
                readOnly
                  ? formatToEuroCurrency(
                      ReceiptsDataByHolder?.propertyIncomeReceipts?.receipt5
                    )
                  : ""
              }
              isDisabled={!isIrregular || readOnly}
            />
            <TextField
              id="propertyIncomeReceipt6"
              label={`${t("grossReceiptValue")} 6`}
              defaultValue={
                !isIrregular
                  ? undefined
                  : ReceiptsData?.propertyIncomeReceipts?.receipt6!.toString()!
              }
              valueCallback={handleFieldChange("receipt6")}
              placeholder={
                readOnly
                  ? formatToEuroCurrency(
                      ReceiptsDataByHolder?.propertyIncomeReceipts?.receipt6
                    )
                  : ""
              }
              isDisabled={!isIrregular || readOnly}
            />
          </>
        )
      ) : (
        <>
          <TextField
            id="propertyIncomeReceipt4"
            label={`${t("grossReceiptValue")} 4`}
            defaultValue={
              !isIrregular
                ? undefined
                : ReceiptsData?.propertyIncomeReceipts?.receipt4!.toString()
            }
            valueCallback={handleFieldChange("receipt4")}
            placeholder={
              readOnly
                ? formatToEuroCurrency(
                    ReceiptsDataByHolder?.propertyIncomeReceipts?.receipt4
                  )
                : ""
            }
            isDisabled={!isIrregular || readOnly}
            infoIcon
            textInfo={t("fieldEmptyIsZero")}
          />
          <TextField
            id="propertyIncomeReceipt5"
            label={`${t("grossReceiptValue")} 5`}
            defaultValue={
              !isIrregular
                ? undefined
                : ReceiptsData?.propertyIncomeReceipts?.receipt5!.toString()
            }
            valueCallback={handleFieldChange("receipt5")}
            placeholder={
              readOnly
                ? formatToEuroCurrency(
                    ReceiptsDataByHolder?.propertyIncomeReceipts?.receipt5
                  )
                : ""
            }
            isDisabled={!isIrregular || readOnly}
            infoIcon
            textInfo={t("fieldEmptyIsZero")}
          />
          <TextField
            id="propertyIncomeReceipt6"
            label={`${t("grossReceiptValue")} 6`}
            defaultValue={
              !isIrregular
                ? undefined
                : ReceiptsData?.propertyIncomeReceipts?.receipt6!.toString()
            }
            valueCallback={handleFieldChange("receipt6")}
            placeholder={
              readOnly
                ? formatToEuroCurrency(
                    ReceiptsDataByHolder?.propertyIncomeReceipts?.receipt6
                  )
                : ""
            }
            isDisabled={!isIrregular || readOnly}
            infoIcon
            textInfo={t("fieldEmptyIsZero")}
          />
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
                  ReceiptsDataByHolder?.propertyIncomeReceipts
                    ?.averageNetIncome!
                )
              : formatToEuroCurrency(
                  ReceiptsData?.propertyIncomeReceipts?.averageNetIncome!
                )
          }
          isReceipts
        />
      </div>
    </div>
  );
};

export default RendimentosPrediais;
