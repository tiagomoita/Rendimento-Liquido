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
  const ReceiptsData = useSelector(retrieveReceiptsData);

  const [isIrregular, setIsIrregular] = useState(
    !!ReceiptsData?.salaryOrPensionReceipts?.receipt4 ||
      !!ReceiptsData?.salaryOrPensionReceipts?.receipt5 ||
      !!ReceiptsData?.salaryOrPensionReceipts?.receipt6
  );
  const ReceiptsDataByHolder = useSelector(
    retrieveReceiptsDataByHolder(tabHolder!)
  );

  const Taxes = useSelector(retrieveTaxes);

  const dispatch = useDispatch();

  const handleClean = () => {
    dispatch(setClean("salaryOrPensionReceipts2"));
    setIsIrregular(false);
  };

  const handleCleanIrregularReceipts = (isRegularOrIrregular: boolean) => {
    dispatch(
      setSalaryOrPensionReceipts({
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
      ReceiptsData?.salaryOrPensionReceipts?.receipt1! > 0 ||
      ReceiptsData?.salaryOrPensionReceipts?.receipt2! > 0 ||
      ReceiptsData?.salaryOrPensionReceipts?.receipt3! > 0
    ) {
      const isRegularOrIrregular = calculateIsRegularOrIrregular({
        receipt1Value: ReceiptsData?.salaryOrPensionReceipts?.receipt1!,
        receipt2Value: ReceiptsData?.salaryOrPensionReceipts?.receipt2!,
        receipt3Value: ReceiptsData?.salaryOrPensionReceipts?.receipt3!,
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
    return !calculateIsRegularOrIrregular({
      receipt1Value: ReceiptsDataByHolder?.salaryOrPensionReceipts?.receipt1!,
      receipt2Value: ReceiptsDataByHolder?.salaryOrPensionReceipts?.receipt2!,
      receipt3Value: ReceiptsDataByHolder?.salaryOrPensionReceipts?.receipt3!,
      valueOfRegularReceipts:
        Taxes?.recParams.percVarAvgIncRecAboveIrreg.parameterValue!,
    });
  };

  return (
    <div>
      {!readOnly && (
        <div className="info-wrapper">
          <img src={info} alt="img" width="18px" />
          <Text
            text={t("salaryOrPensionText")}
            fontSize="11px"
            margin="0px 0px 0px 10px"
            color={color.nb_bluegray}
            alignSelf="center"
          />
        </div>
      )}
      <TextField
        id="salaryOrPensionReceipt1"
        defaultValue={
          ReceiptsData?.salaryOrPensionReceipts?.receipt1!.toString()!
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
        infoIcon
        textInfo={t("fieldEmptyIsZero")}
      />
      <TextField
        id="salaryOrPensionReceipt2"
        defaultValue={
          ReceiptsData?.salaryOrPensionReceipts?.receipt2!.toString()!
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
        infoIcon
        textInfo={t("fieldEmptyIsZero")}
      />
      <TextField
        id="salaryOrPensionReceipt3"
        defaultValue={
          ReceiptsData?.salaryOrPensionReceipts?.receipt3!.toString()!
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
        infoIcon
        textInfo={t("fieldEmptyIsZero")}
      />
      {readOnly ? (
        summaryIsRegular() ? null : (
          <>
            <TextField
              id="salaryOrPensionReceipt4"
              defaultValue={
                !isIrregular
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
              id="salaryOrPensionReceipt5"
              defaultValue={
                !isIrregular
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
              id="salaryOrPensionReceipt6"
              defaultValue={
                !isIrregular
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
            id="salaryOrPensionReceipt4"
            defaultValue={
              !isIrregular
                ? undefined
                : ReceiptsData?.salaryOrPensionReceipts?.receipt4!.toString()
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
            infoIcon
            textInfo={t("fieldEmptyIsZero")}
          />
          <TextField
            id="salaryOrPensionReceipt5"
            defaultValue={
              !isIrregular
                ? undefined
                : ReceiptsData?.salaryOrPensionReceipts?.receipt5!.toString()
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
            infoIcon
            textInfo={t("fieldEmptyIsZero")}
          />
          <TextField
            id="salaryOrPensionReceipt6"
            defaultValue={
              !isIrregular
                ? undefined
                : ReceiptsData?.salaryOrPensionReceipts?.receipt6!.toString()
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
