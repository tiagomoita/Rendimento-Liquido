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
  setResearchScholarshipsInternship,
} from "../../../../store/modules/entities/holder/slices";
import { formatToEuroCurrency } from "../../../../utils/utils";
import { color } from "../../../../utils/colors";

type BolsasInvestigacaoEstagioProps = {
  readOnly?: boolean;
  tabHolder?: number;
};

const BolsasInvestigacaoEstagio = (props: BolsasInvestigacaoEstagioProps) => {
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
    dispatch(setClean("researchScholarshipsInternshipReceipts2"));
    setIsIrregular(false);
  };

  const checkIsRegular = useDebouncedCallback(() => {
    if (
      ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt1! > 0 &&
      ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt2! > 0 &&
      ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt3! > 0
    ) {
      setIsIrregular(
        calculateIsRegularOrIrregular({
          receipt1Value:
            ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt1!,
          receipt2Value:
            ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt2!,
          receipt3Value:
            ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt3!,
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
    ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt1!,
    ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt2!,
    ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt3!,
  ]);

  const handleFieldChange = (field: string) => {
    return (value: number) => {
      dispatch(
        setResearchScholarshipsInternship({
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
      ReceiptsDataByHolder?.researchScholarshipsInternshipReceipts?.receipt4 ===
        0 &&
      ReceiptsDataByHolder?.researchScholarshipsInternshipReceipts?.receipt5 ===
        0 &&
      ReceiptsDataByHolder?.researchScholarshipsInternshipReceipts?.receipt6 ===
        0
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
          ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt1! === 0
            ? undefined
            : ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt1!.toString()!
        }
        valueCallback={handleFieldChange("receipt1")}
        placeholder={
          readOnly
            ? formatToEuroCurrency(
                ReceiptsDataByHolder?.researchScholarshipsInternshipReceipts
                  ?.receipt1
              )
            : ""
        }
        isDisabled={readOnly}
      />
      <TextField
        label={`${t("receipt")} 2`}
        defaultValue={
          ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt2! === 0
            ? undefined
            : ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt2!.toString()!
        }
        valueCallback={handleFieldChange("receipt2")}
        placeholder={
          readOnly
            ? formatToEuroCurrency(
                ReceiptsDataByHolder?.researchScholarshipsInternshipReceipts
                  ?.receipt2
              )
            : ""
        }
        isDisabled={readOnly}
      />
      <TextField
        label={`${t("receipt")} 3`}
        defaultValue={
          ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt3! === 0
            ? undefined
            : ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt3!.toString()!
        }
        valueCallback={handleFieldChange("receipt3")}
        placeholder={
          readOnly
            ? formatToEuroCurrency(
                ReceiptsDataByHolder?.researchScholarshipsInternshipReceipts
                  ?.receipt3
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
                ReceiptsData?.researchScholarshipsInternshipReceipts
                  ?.receipt4! === 0
                  ? undefined
                  : ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt4!.toString()!
              }
              valueCallback={handleFieldChange("receipt4")}
              placeholder={
                readOnly
                  ? formatToEuroCurrency(
                      ReceiptsDataByHolder
                        ?.researchScholarshipsInternshipReceipts?.receipt4
                    )
                  : ""
              }
              isDisabled={!isIrregular || readOnly}
            />
            <TextField
              label={`${t("receipt")} 5`}
              defaultValue={
                ReceiptsData?.researchScholarshipsInternshipReceipts
                  ?.receipt5! === 0
                  ? undefined
                  : ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt5!.toString()!
              }
              valueCallback={handleFieldChange("receipt5")}
              placeholder={
                readOnly
                  ? formatToEuroCurrency(
                      ReceiptsDataByHolder
                        ?.researchScholarshipsInternshipReceipts?.receipt5
                    )
                  : ""
              }
              isDisabled={!isIrregular || readOnly}
            />
            <TextField
              label={`${t("receipt")} 6`}
              defaultValue={
                ReceiptsData?.researchScholarshipsInternshipReceipts
                  ?.receipt6! === 0
                  ? undefined
                  : ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt6!.toString()!
              }
              valueCallback={handleFieldChange("receipt6")}
              placeholder={
                readOnly
                  ? formatToEuroCurrency(
                      ReceiptsDataByHolder
                        ?.researchScholarshipsInternshipReceipts?.receipt6
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
              ReceiptsData?.researchScholarshipsInternshipReceipts
                ?.receipt4! === 0
                ? undefined
                : ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt4!.toString()!
            }
            valueCallback={handleFieldChange("receipt4")}
            placeholder={
              readOnly
                ? formatToEuroCurrency(
                    ReceiptsDataByHolder?.researchScholarshipsInternshipReceipts
                      ?.receipt4
                  )
                : ""
            }
            isDisabled={!isIrregular || readOnly}
          />
          <TextField
            label={`${t("receipt")} 5`}
            defaultValue={
              ReceiptsData?.researchScholarshipsInternshipReceipts
                ?.receipt5! === 0
                ? undefined
                : ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt5!.toString()!
            }
            valueCallback={handleFieldChange("receipt5")}
            placeholder={
              readOnly
                ? formatToEuroCurrency(
                    ReceiptsDataByHolder?.researchScholarshipsInternshipReceipts
                      ?.receipt5
                  )
                : ""
            }
            isDisabled={!isIrregular || readOnly}
          />
          <TextField
            label={`${t("receipt")} 6`}
            defaultValue={
              ReceiptsData?.researchScholarshipsInternshipReceipts
                ?.receipt6! === 0
                ? undefined
                : ReceiptsData?.researchScholarshipsInternshipReceipts?.receipt6!.toString()!
            }
            valueCallback={handleFieldChange("receipt6")}
            placeholder={
              readOnly
                ? formatToEuroCurrency(
                    ReceiptsDataByHolder?.researchScholarshipsInternshipReceipts
                      ?.receipt6
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
                  ReceiptsDataByHolder?.researchScholarshipsInternshipReceipts
                    ?.averageNetIncome!
                )
              : formatToEuroCurrency(
                  ReceiptsData?.researchScholarshipsInternshipReceipts
                    ?.averageNetIncome!
                )
          }
          isReceipts
        />
      </div>
    </div>
  );
};

export default BolsasInvestigacaoEstagio;
