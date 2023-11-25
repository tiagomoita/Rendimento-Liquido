/* eslint-disable no-nested-ternary */
import { useState, useEffect } from "react";
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
  setReiceptsPropertyIncome,
} from "../../../../store/modules/entities/holder/slices";
import { formatToEuroCurrency } from "../../../../utils/utils";
import { color } from "../../../../utils/colors";

type RendimentosPrediaisProps = {
  readOnly?: boolean;
  tabHolder?: number;
};

const RendimentosPrediais = (props: RendimentosPrediaisProps) => {
  const { readOnly, tabHolder } = props;
  const { t } = useTranslation();
  const [isIrregular, setIsIrregular] = useState(false);
  const ReceiptsData = useSelector(retrieveReceiptsData);
  const ReceiptsDataByHolder = useSelector(
    retrieveReceiptsDataByHolder(tabHolder!)
  );
  const dispatch = useDispatch();
  const Taxes = useSelector(retrieveTaxes);

  const handleClean = () => {
    dispatch(setClean("propertyIncomeReceipts2"));
    setIsIrregular(false);
  };

  const checkIsRegular = useDebouncedCallback(() => {
    if (
      ReceiptsData?.propertyIncomeReceipts?.receipt1! > 0 &&
      ReceiptsData?.propertyIncomeReceipts?.receipt2! > 0 &&
      ReceiptsData?.propertyIncomeReceipts?.receipt3! > 0
    ) {
      setIsIrregular(
        calculateIsRegularOrIrregular({
          receipt1Value: ReceiptsData?.propertyIncomeReceipts?.receipt1!,
          receipt2Value: ReceiptsData?.propertyIncomeReceipts?.receipt2!,
          receipt3Value: ReceiptsData?.propertyIncomeReceipts?.receipt3!,
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
    ReceiptsData?.propertyIncomeReceipts?.receipt1!,
    ReceiptsData?.propertyIncomeReceipts?.receipt2!,
    ReceiptsData?.propertyIncomeReceipts?.receipt3!,
  ]);

  const handleFieldChange = (field: string) => {
    return (value: number) => {
      dispatch(
        setReiceptsPropertyIncome({
          propertyIncomeTax: Taxes?.netIncomeReceipts!,
          data: {
            [field]: value,
            isIrregular,
          },
        })
      );
    };
  };

  const summaryIsRegular = () => {
    if (
      ReceiptsDataByHolder?.propertyIncomeReceipts?.receipt4 === 0 &&
      ReceiptsDataByHolder?.propertyIncomeReceipts?.receipt5 === 0 &&
      ReceiptsDataByHolder?.propertyIncomeReceipts?.receipt6 === 0
    ) {
      return true;
    }
    return false;
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
      <TextField
        label={`${t("receipt")} 1`}
        defaultValue={
          ReceiptsData?.propertyIncomeReceipts?.receipt1! === 0
            ? undefined
            : ReceiptsData?.propertyIncomeReceipts?.receipt1!.toString()!
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
      />
      <TextField
        label={`${t("receipt")} 2`}
        defaultValue={
          ReceiptsData?.propertyIncomeReceipts?.receipt2! === 0
            ? undefined
            : ReceiptsData?.propertyIncomeReceipts?.receipt2!.toString()!
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
      />
      <TextField
        label={`${t("receipt")} 3`}
        defaultValue={
          ReceiptsData?.propertyIncomeReceipts?.receipt3! === 0
            ? undefined
            : ReceiptsData?.propertyIncomeReceipts?.receipt3!.toString()!
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
      />

      {readOnly ? (
        summaryIsRegular() ? null : (
          <>
            <TextField
              label={`${t("receipt")} 4`}
              defaultValue={
                ReceiptsData?.propertyIncomeReceipts?.receipt4! === 0
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
              label={`${t("receipt")} 5`}
              defaultValue={
                ReceiptsData?.propertyIncomeReceipts?.receipt5! === 0
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
              label={`${t("receipt")} 6`}
              defaultValue={
                ReceiptsData?.propertyIncomeReceipts?.receipt6! === 0
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
            label={`${t("receipt")} 4`}
            defaultValue={
              ReceiptsData?.propertyIncomeReceipts?.receipt4! === 0
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
            label={`${t("receipt")} 5`}
            defaultValue={
              ReceiptsData?.propertyIncomeReceipts?.receipt5! === 0
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
            label={`${t("receipt")} 6`}
            defaultValue={
              ReceiptsData?.propertyIncomeReceipts?.receipt6! === 0
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
