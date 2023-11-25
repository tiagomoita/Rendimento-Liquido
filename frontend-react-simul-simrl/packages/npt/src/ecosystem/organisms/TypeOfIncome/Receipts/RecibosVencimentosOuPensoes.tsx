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
  setClean,
  setSalaryOrPensionReceipts,
} from "../../../../store/modules/entities/holder/slices";
import {
  retrieveReceiptsData,
  retrieveReceiptsDataByHolder,
  retrieveTaxes,
} from "../../../../store/modules/entities/holder/selectors";
import { formatToEuroCurrency } from "../../../../utils/utils";
import { color } from "../../../../utils/colors";

type RecibosVencimentosOuPensoesProps = {
  readOnly?: boolean;
  tabHolder?: number;
};

const RecibosVencimentosOuPensoes = (
  props: RecibosVencimentosOuPensoesProps
) => {
  const { readOnly, tabHolder } = props;
  const { t } = useTranslation();

  const [isIrregular, setIsIrregular] = useState(false);
  const ReceiptsData = useSelector(retrieveReceiptsData);
  const ReceiptsDataByHolder = useSelector(
    retrieveReceiptsDataByHolder(tabHolder!)
  );
  const Taxes = useSelector(retrieveTaxes);

  const dispatch = useDispatch();

  const handleClean = () => {
    dispatch(setClean("salaryOrPensionReceipts2"));
    setIsIrregular(false);
  };

  const checkIsRegular = useDebouncedCallback(() => {
    if (
      ReceiptsData?.salaryOrPensionReceipts?.receipt1! > 0 &&
      ReceiptsData?.salaryOrPensionReceipts?.receipt2! > 0 &&
      ReceiptsData?.salaryOrPensionReceipts?.receipt3! > 0
    ) {
      setIsIrregular(
        calculateIsRegularOrIrregular({
          receipt1Value: ReceiptsData?.salaryOrPensionReceipts?.receipt1!,
          receipt2Value: ReceiptsData?.salaryOrPensionReceipts?.receipt2!,
          receipt3Value: ReceiptsData?.salaryOrPensionReceipts?.receipt3!,
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
    ReceiptsData?.salaryOrPensionReceipts?.receipt1!,
    ReceiptsData?.salaryOrPensionReceipts?.receipt2!,
    ReceiptsData?.salaryOrPensionReceipts?.receipt3!,
  ]);

  const handleFieldChange = (field: string) => {
    return (value: number) => {
      dispatch(
        setSalaryOrPensionReceipts({
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
      ReceiptsDataByHolder?.salaryOrPensionReceipts?.receipt4 === 0 &&
      ReceiptsDataByHolder?.salaryOrPensionReceipts?.receipt5 === 0 &&
      ReceiptsDataByHolder?.salaryOrPensionReceipts?.receipt6 === 0
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
        defaultValue={
          ReceiptsData?.salaryOrPensionReceipts?.receipt1! === 0
            ? undefined
            : ReceiptsData?.salaryOrPensionReceipts?.receipt1!.toString()!
        }
        label={`${t("receipt")} 1`}
        valueCallback={handleFieldChange("receipt1")}
        placeholder={
          readOnly
            ? formatToEuroCurrency(
                ReceiptsDataByHolder?.salaryOrPensionReceipts?.receipt1
              )
            : ""
        }
        isDisabled={readOnly}
      />
      <TextField
        defaultValue={
          ReceiptsData?.salaryOrPensionReceipts?.receipt2! === 0
            ? undefined
            : ReceiptsData?.salaryOrPensionReceipts?.receipt2!.toString()!
        }
        label={`${t("receipt")} 2`}
        valueCallback={handleFieldChange("receipt2")}
        placeholder={
          readOnly
            ? formatToEuroCurrency(
                ReceiptsDataByHolder?.salaryOrPensionReceipts?.receipt2
              )
            : ""
        }
        isDisabled={readOnly}
      />
      <TextField
        defaultValue={
          ReceiptsData?.salaryOrPensionReceipts?.receipt3! === 0
            ? undefined
            : ReceiptsData?.salaryOrPensionReceipts?.receipt3!.toString()!
        }
        label={`${t("receipt")} 3`}
        valueCallback={handleFieldChange("receipt3")}
        placeholder={
          readOnly
            ? formatToEuroCurrency(
                ReceiptsDataByHolder?.salaryOrPensionReceipts?.receipt3
              )
            : ""
        }
        isDisabled={readOnly}
      />
      {readOnly ? (
        summaryIsRegular() ? null : (
          <>
            <TextField
              defaultValue={
                ReceiptsData?.salaryOrPensionReceipts?.receipt4! === 0
                  ? undefined
                  : ReceiptsData?.salaryOrPensionReceipts?.receipt4!.toString()!
              }
              label={`${t("receipt")} 4`}
              valueCallback={handleFieldChange("receipt4")}
              placeholder={
                readOnly
                  ? formatToEuroCurrency(
                      ReceiptsDataByHolder?.salaryOrPensionReceipts?.receipt4
                    )
                  : ""
              }
              isDisabled={!isIrregular || readOnly}
            />
            <TextField
              defaultValue={
                ReceiptsData?.salaryOrPensionReceipts?.receipt5! === 0
                  ? undefined
                  : ReceiptsData?.salaryOrPensionReceipts?.receipt5!.toString()!
              }
              label={`${t("receipt")} 5`}
              valueCallback={handleFieldChange("receipt5")}
              placeholder={
                readOnly
                  ? formatToEuroCurrency(
                      ReceiptsDataByHolder?.salaryOrPensionReceipts?.receipt5
                    )
                  : ""
              }
              isDisabled={!isIrregular || readOnly}
            />
            <TextField
              defaultValue={
                ReceiptsData?.salaryOrPensionReceipts?.receipt6! === 0
                  ? undefined
                  : ReceiptsData?.salaryOrPensionReceipts?.receipt6!.toString()!
              }
              label={`${t("receipt")} 6`}
              valueCallback={handleFieldChange("receipt6")}
              placeholder={
                readOnly
                  ? formatToEuroCurrency(
                      ReceiptsDataByHolder?.salaryOrPensionReceipts?.receipt6
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
            defaultValue={
              ReceiptsData?.salaryOrPensionReceipts?.receipt4! === 0
                ? undefined
                : ReceiptsData?.salaryOrPensionReceipts?.receipt4!.toString()!
            }
            label={`${t("receipt")} 4`}
            valueCallback={handleFieldChange("receipt4")}
            placeholder={
              readOnly
                ? ReceiptsDataByHolder?.salaryOrPensionReceipts?.receipt4
                    ?.toString()!
                    .concat(" €")
                : ""
            }
            isDisabled={!isIrregular || readOnly}
          />
          <TextField
            defaultValue={
              ReceiptsData?.salaryOrPensionReceipts?.receipt5! === 0
                ? undefined
                : ReceiptsData?.salaryOrPensionReceipts?.receipt5!.toString()!
            }
            label={`${t("receipt")} 5`}
            valueCallback={handleFieldChange("receipt5")}
            placeholder={
              readOnly
                ? formatToEuroCurrency(
                    ReceiptsDataByHolder?.salaryOrPensionReceipts?.receipt5
                  )
                : ""
            }
            isDisabled={!isIrregular || readOnly}
          />
          <TextField
            defaultValue={
              ReceiptsData?.salaryOrPensionReceipts?.receipt6! === 0
                ? undefined
                : ReceiptsData?.salaryOrPensionReceipts?.receipt6!.toString()!
            }
            label={`${t("receipt")} 6`}
            valueCallback={handleFieldChange("receipt6")}
            placeholder={
              readOnly
                ? formatToEuroCurrency(
                    ReceiptsDataByHolder?.salaryOrPensionReceipts?.receipt6
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
                  ReceiptsDataByHolder?.salaryOrPensionReceipts
                    ?.averageNetIncome!
                )
              : formatToEuroCurrency(
                  ReceiptsData?.salaryOrPensionReceipts?.averageNetIncome!
                )
          }
          isReceipts
        />
      </div>
    </div>
  );
};

export default RecibosVencimentosOuPensoes;
