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
  setAlimony,
  setClean,
} from "../../../../store/modules/entities/holder/slices";
import { formatToEuroCurrency } from "../../../../utils/utils";
import { color } from "../../../../utils/colors";

type PensoesAlimentosProps = {
  readOnly?: boolean;
  tabHolder?: number;
};
const PensoesAlimentos = (props: PensoesAlimentosProps) => {
  const { readOnly, tabHolder } = props;
  const { t } = useTranslation();
  const ReceiptsData = useSelector(retrieveReceiptsData);
  const [isIrregular, setIsIrregular] = useState(
    !!ReceiptsData?.alimonyReceipts?.receipt4 ||
      !!ReceiptsData?.alimonyReceipts?.receipt5 ||
      !!ReceiptsData?.alimonyReceipts?.receipt6
  );
  const ReceiptsDataByHolder = useSelector(
    retrieveReceiptsDataByHolder(tabHolder!)
  );
  const Taxes = useSelector(retrieveTaxes);
  const dispatch = useDispatch();

  const handleClean = () => {
    dispatch(setClean("alimonyReceipts2"));
    setIsIrregular(false);
  };

  const handleCleanIrregularReceipts = (isRegularOrIrregular: boolean) => {
    dispatch(
      setAlimony({
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
      ReceiptsData?.alimonyReceipts?.receipt1! > 0 ||
      ReceiptsData?.alimonyReceipts?.receipt2! > 0 ||
      ReceiptsData?.alimonyReceipts?.receipt3! > 0
    ) {
      const isRegularOrIrregular = calculateIsRegularOrIrregular({
        receipt1Value: ReceiptsData?.alimonyReceipts?.receipt1!,
        receipt2Value: ReceiptsData?.alimonyReceipts?.receipt2!,
        receipt3Value: ReceiptsData?.alimonyReceipts?.receipt3!,
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
    ReceiptsData?.alimonyReceipts?.receipt1!,
    ReceiptsData?.alimonyReceipts?.receipt2!,
    ReceiptsData?.alimonyReceipts?.receipt3!,
  ]);

  const handleFieldChange = (field: string) => {
    return (value: number) => {
      dispatch(
        setAlimony({
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
      receipt1Value: ReceiptsDataByHolder?.alimonyReceipts?.receipt1!,
      receipt2Value: ReceiptsDataByHolder?.alimonyReceipts?.receipt2!,
      receipt3Value: ReceiptsDataByHolder?.alimonyReceipts?.receipt3!,
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
            text={t("alimonyReceiptText")}
            fontSize="11px"
            margin="0px 0px 0px 10px"
            color={color.nb_bluegray}
            alignSelf="center"
          />
        </div>
      )}
      <TextField
        id="alimonyReceipt1"
        label={`${t("receipt")} 1`}
        defaultValue={ReceiptsData?.alimonyReceipts?.receipt1!.toString()!}
        valueCallback={handleFieldChange("receipt1")}
        placeholder={
          readOnly
            ? formatToEuroCurrency(
                ReceiptsDataByHolder?.alimonyReceipts?.receipt1
              )
            : ""
        }
        isDisabled={readOnly}
        infoIcon
        textInfo={t("fieldEmptyIsZero")}
      />
      <TextField
        id="alimonyReceipt2"
        label={`${t("receipt")} 2`}
        defaultValue={ReceiptsData?.alimonyReceipts?.receipt2!.toString()!}
        valueCallback={handleFieldChange("receipt2")}
        placeholder={
          readOnly
            ? formatToEuroCurrency(
                ReceiptsDataByHolder?.alimonyReceipts?.receipt2
              )
            : ""
        }
        isDisabled={readOnly}
        infoIcon
        textInfo={t("fieldEmptyIsZero")}
      />
      <TextField
        id="alimonyReceipt3"
        label={`${t("receipt")} 3`}
        defaultValue={ReceiptsData?.alimonyReceipts?.receipt3!.toString()!}
        valueCallback={handleFieldChange("receipt3")}
        placeholder={
          readOnly
            ? formatToEuroCurrency(
                ReceiptsDataByHolder?.alimonyReceipts?.receipt3
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
              id="alimonyReceipt4"
              label={`${t("receipt")} 4`}
              defaultValue={
                !isIrregular
                  ? undefined
                  : ReceiptsData?.alimonyReceipts?.receipt4!.toString()!
              }
              valueCallback={handleFieldChange("receipt4")}
              placeholder={
                readOnly
                  ? formatToEuroCurrency(
                      ReceiptsDataByHolder?.alimonyReceipts?.receipt4
                    )
                  : ""
              }
              isDisabled={!isIrregular || readOnly}
            />
            <TextField
              id="alimonyReceipt5"
              label={`${t("receipt")} 5`}
              defaultValue={
                !isIrregular
                  ? undefined
                  : ReceiptsData?.alimonyReceipts?.receipt5!.toString()!
              }
              valueCallback={handleFieldChange("receipt5")}
              placeholder={
                readOnly
                  ? formatToEuroCurrency(
                      ReceiptsDataByHolder?.alimonyReceipts?.receipt5
                    )
                  : ""
              }
              isDisabled={!isIrregular || readOnly}
            />
            <TextField
              id="alimonyReceipt6"
              label={`${t("receipt")} 6`}
              defaultValue={
                !isIrregular
                  ? undefined
                  : ReceiptsData?.alimonyReceipts?.receipt6!.toString()!
              }
              valueCallback={handleFieldChange("receipt6")}
              placeholder={
                readOnly
                  ? formatToEuroCurrency(
                      ReceiptsDataByHolder?.alimonyReceipts?.receipt6
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
            id="alimonyReceipt4"
            label={`${t("receipt")} 4`}
            defaultValue={
              !isIrregular
                ? undefined
                : ReceiptsData?.alimonyReceipts?.receipt4!.toString()
            }
            valueCallback={handleFieldChange("receipt4")}
            placeholder={
              readOnly
                ? formatToEuroCurrency(
                    ReceiptsDataByHolder?.alimonyReceipts?.receipt4
                  )
                : ""
            }
            isDisabled={!isIrregular || readOnly}
            infoIcon
            textInfo={t("fieldEmptyIsZero")}
          />
          <TextField
            id="alimonyReceipt5"
            label={`${t("receipt")} 5`}
            defaultValue={
              !isIrregular
                ? undefined
                : ReceiptsData?.alimonyReceipts?.receipt5!.toString()
            }
            valueCallback={handleFieldChange("receipt5")}
            placeholder={
              readOnly
                ? formatToEuroCurrency(
                    ReceiptsDataByHolder?.alimonyReceipts?.receipt5
                  )
                : ""
            }
            isDisabled={!isIrregular || readOnly}
            infoIcon
            textInfo={t("fieldEmptyIsZero")}
          />
          <TextField
            id="alimonyReceipt6"
            label={`${t("receipt")} 6`}
            defaultValue={
              !isIrregular
                ? undefined
                : ReceiptsData?.alimonyReceipts?.receipt6!.toString()
            }
            valueCallback={handleFieldChange("receipt6")}
            placeholder={
              readOnly
                ? formatToEuroCurrency(
                    ReceiptsDataByHolder?.alimonyReceipts?.receipt6
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
                  ReceiptsDataByHolder?.alimonyReceipts?.averageNetIncome!
                )
              : formatToEuroCurrency(
                  ReceiptsData?.alimonyReceipts?.averageNetIncome!
                )
          }
          isReceipts
        />
      </div>
    </div>
  );
};
export default PensoesAlimentos;
