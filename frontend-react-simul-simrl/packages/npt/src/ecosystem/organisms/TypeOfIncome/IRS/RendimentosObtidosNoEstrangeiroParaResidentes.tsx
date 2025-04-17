/* eslint-disable no-nested-ternary */
import { NBButton } from "@nb-omc-xit-frontend/nb-shared/lib/NBButton";
import { useDispatch, useSelector } from "react-redux";
import "./TypeOfIncome.scss";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Total from "../../../atoms/Total";
import Accordion from "../../../atoms/Accordion";
import TextField from "../../../atoms/TextField";
import Text from "../../../atoms/Text";
import info from "../../../../assets/images/info.svg";
import {
  retrieveIRSData,
  retrieveIRSDataByHolder,
} from "../../../../store/modules/entities/holder/selectors";

import {
  setClean,
  setIncomeEarnedAbroadForResidents,
} from "../../../../store/modules/entities/holder/slices";
import {
  formatNumber2DecimalPlaces,
  formatToEuroCurrency,
  roundValue,
} from "../../../../utils/utils";
import { Model3Data } from "../../../../store/modules/entities/holder/types";
import { color } from "../../../../utils/colors";
import { agriYieldsSilvLivstck, indComProIncome } from "../Common/dataAuxiliar";

type RendimentosObtidosNoEstrangeiroParaResidentesProps = {
  setModel3Data?: Dispatch<SetStateAction<Model3Data>>;
  readOnly?: boolean;
  tabHolder?: number;
};

const RendimentosObtidosNoEstrangeiroParaResidentes = (
  props: RendimentosObtidosNoEstrangeiroParaResidentesProps
) => {
  const { readOnly, tabHolder, setModel3Data } = props;
  const { t } = useTranslation();
  const IRSData = useSelector(retrieveIRSData);
  const IRSDataByHolder = useSelector(retrieveIRSDataByHolder(tabHolder!));
  const dispatch = useDispatch();

  const handleClean = () => {
    dispatch(setClean("incomeEarnedAbroadForResidents2"));
    if (setModel3Data)
      setModel3Data({ show: false, title: "", isAttachmentJ: false });
  };

  const handleCleanModel = () => {
    dispatch(
      setIncomeEarnedAbroadForResidents({
        data: {
          businessAndProfessionalIncome: {
            ...IRSData?.incomeEarnedAbroadForResidents
              ?.businessAndProfessionalIncome!,
            grossIncomes: {
              indComProIncome,
              agriYieldsSilvLivstck,
            },
            grossIncomeValue: 0,
          },
        },
      })
    );
  };

  const handleFieldChange = (field: string, subfield: string) => {
    return (value: number) => {
      if (field === "incomeFromDependentWork") {
        dispatch(
          setIncomeEarnedAbroadForResidents({
            data: {
              [field]: {
                ...IRSData?.incomeEarnedAbroadForResidents
                  ?.incomeFromDependentWork!,
                [subfield]: value,
              },
            },
          })
        );
      }
      if (field === "pensionIncome") {
        dispatch(
          setIncomeEarnedAbroadForResidents({
            data: {
              [field]: {
                ...IRSData?.incomeEarnedAbroadForResidents?.pensionIncome!,
                [subfield]: value,
              },
            },
          })
        );
      }
      if (field === "businessAndProfessionalIncome") {
        dispatch(
          setIncomeEarnedAbroadForResidents({
            data: {
              [field]: {
                ...IRSData?.incomeEarnedAbroadForResidents
                  ?.businessAndProfessionalIncome!,
                [subfield]: value,
              },
            },
          })
        );
      }
      if (field === "propertyIncome") {
        dispatch(
          setIncomeEarnedAbroadForResidents({
            data: {
              [field]: {
                ...IRSData?.incomeEarnedAbroadForResidents?.propertyIncome!,
                [subfield]: value,
              },
            },
          })
        );
      }
      if (field === "capitalIncome") {
        dispatch(
          setIncomeEarnedAbroadForResidents({
            data: {
              [field]: {
                ...IRSData?.incomeEarnedAbroadForResidents?.capitalIncome!,
                [subfield]: value,
              },
            },
          })
        );
      }
    };
  };

  const applyTotalValue = (
    valueTotal: any,
    businessAndProfessionalIncomeClone: any
  ) => {
    dispatch(
      setIncomeEarnedAbroadForResidents({
        data: {
          businessAndProfessionalIncome: {
            ...IRSData?.incomeEarnedAbroadForResidents
              ?.businessAndProfessionalIncome!,
            grossIncomes: {
              ...businessAndProfessionalIncomeClone,
            },
            grossIncomeValue: valueTotal,
          },
        },
      })
    );
    if (setModel3Data)
      setModel3Data({ show: false, title: "", isAttachmentJ: false });
  };

  const saveValues = (businessAndProfessionalIncomeClone: any) => {
    dispatch(
      setIncomeEarnedAbroadForResidents({
        data: {
          businessAndProfessionalIncome: {
            ...IRSData?.incomeEarnedAbroadForResidents
              ?.businessAndProfessionalIncome!,
            grossIncomes: {
              ...businessAndProfessionalIncomeClone,
            },
          },
        },
      })
    );
  };

  useEffect(() => {
    if (
      IRSData?.incomeEarnedAbroadForResidents
        ?.incomeEarnedAbroadForResidentsCheckBox! === false
    ) {
      if (setModel3Data)
        setModel3Data({ show: false, title: "", isAttachmentJ: false });
    }
  }, [
    IRSData?.incomeEarnedAbroadForResidents
      ?.incomeEarnedAbroadForResidentsCheckBox!,
  ]);

  return (
    <div>
      {!readOnly && (
        <div className="info-wrapper">
          <img src={info} alt="img" width="18px" />

          <Text
            text={t("incomeEarnedAbroadForResidentsInfo")}
            fontSize="11px"
            margin="0px 0px 0px 10px"
            color={color.nb_bluegray}
            alignSelf="center"
          />
        </div>
      )}
      <Accordion title={t("incomeFromDependentWork")}>
        <TextField
          label={`${t("grossIncome")}*`}
          defaultValue={
            IRSData?.incomeEarnedAbroadForResidents?.incomeFromDependentWork
              ?.grossIncome! === 0
              ? undefined
              : IRSData?.incomeEarnedAbroadForResidents?.incomeFromDependentWork?.grossIncome?.toString()!
          }
          valueCallback={handleFieldChange(
            "incomeFromDependentWork",
            "grossIncome"
          )}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.incomeEarnedAbroadForResidents
                    ?.incomeFromDependentWork?.grossIncome
                )
              : ""
          }
          isDisabled={readOnly}
        />
        <TextField
          label={t("taxPaidAbroad")}
          defaultValue={
            IRSData?.incomeEarnedAbroadForResidents?.incomeFromDependentWork
              ?.taxPaidAbroad === 0
              ? undefined
              : IRSData?.incomeEarnedAbroadForResidents?.incomeFromDependentWork?.taxPaidAbroad?.toString()!
          }
          valueCallback={handleFieldChange(
            "incomeFromDependentWork",
            "taxPaidAbroad"
          )}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.incomeEarnedAbroadForResidents
                    ?.incomeFromDependentWork?.taxPaidAbroad
                )
              : ""
          }
          isDisabled={readOnly}
        />
        <TextField
          label={t("withholding")}
          defaultValue={
            IRSData?.incomeEarnedAbroadForResidents?.incomeFromDependentWork
              ?.withholding === 0
              ? undefined
              : IRSData?.incomeEarnedAbroadForResidents?.incomeFromDependentWork?.withholding?.toString()!
          }
          valueCallback={handleFieldChange(
            "incomeFromDependentWork",
            "withholding"
          )}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.incomeEarnedAbroadForResidents
                    ?.incomeFromDependentWork?.withholding
                )
              : ""
          }
          isDisabled={readOnly}
        />
        <TextField
          label={t("surchargeWithholding")}
          defaultValue={
            IRSData?.incomeEarnedAbroadForResidents?.incomeFromDependentWork
              ?.surchargeWithholding === 0
              ? undefined
              : IRSData?.incomeEarnedAbroadForResidents?.incomeFromDependentWork?.surchargeWithholding?.toString()!
          }
          valueCallback={handleFieldChange(
            "incomeFromDependentWork",
            "surchargeWithholding"
          )}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.incomeEarnedAbroadForResidents
                    ?.incomeFromDependentWork?.surchargeWithholding
                )
              : ""
          }
          isDisabled={readOnly}
        />
        <TextField
          label={t("contributionsToSocialProtectionSchemes")}
          defaultValue={
            IRSData?.incomeEarnedAbroadForResidents?.incomeFromDependentWork
              ?.contributionsToSocialProtectionSchemes === 0
              ? undefined
              : IRSData?.incomeEarnedAbroadForResidents?.incomeFromDependentWork?.contributionsToSocialProtectionSchemes?.toString()!
          }
          valueCallback={handleFieldChange(
            "incomeFromDependentWork",
            "contributionsToSocialProtectionSchemes"
          )}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.incomeEarnedAbroadForResidents
                    ?.incomeFromDependentWork
                    ?.contributionsToSocialProtectionSchemes
                )
              : ""
          }
          isDisabled={readOnly}
        />
      </Accordion>
      <Accordion title={t("pensionIncome")}>
        <TextField
          label={`${t("grossIncome")}*`}
          defaultValue={
            IRSData?.incomeEarnedAbroadForResidents?.pensionIncome
              ?.grossIncome! === 0
              ? undefined
              : IRSData?.incomeEarnedAbroadForResidents?.pensionIncome?.grossIncome?.toString()!
          }
          valueCallback={handleFieldChange("pensionIncome", "grossIncome")}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.incomeEarnedAbroadForResidents?.pensionIncome
                    ?.grossIncome
                )
              : ""
          }
          isDisabled={readOnly}
        />
        <TextField
          label={t("taxPaidAbroad")}
          defaultValue={
            IRSData?.incomeEarnedAbroadForResidents?.pensionIncome
              ?.taxPaidAbroad === 0
              ? undefined
              : IRSData?.incomeEarnedAbroadForResidents?.pensionIncome?.taxPaidAbroad?.toString()!
          }
          valueCallback={handleFieldChange("pensionIncome", "taxPaidAbroad")}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.incomeEarnedAbroadForResidents?.pensionIncome
                    ?.taxPaidAbroad
                )
              : ""
          }
          isDisabled={readOnly}
        />
        <TextField
          label={t("contributionsToSocialProtectionSchemes")}
          defaultValue={
            IRSData?.incomeEarnedAbroadForResidents?.pensionIncome
              ?.contributionsToSocialProtectionSchemes === 0
              ? undefined
              : IRSData?.incomeEarnedAbroadForResidents?.pensionIncome?.contributionsToSocialProtectionSchemes?.toString()!
          }
          valueCallback={handleFieldChange(
            "pensionIncome",
            "contributionsToSocialProtectionSchemes"
          )}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.incomeEarnedAbroadForResidents?.pensionIncome
                    ?.contributionsToSocialProtectionSchemes
                )
              : ""
          }
          isDisabled={readOnly}
        />
      </Accordion>
      <Accordion title={t("businessAndProfessionalIncome")}>
        <span style={{ position: "relative" }}>
          <TextField
            label={`${t("grossIncome")}*`}
            defaultValue={
              IRSData?.incomeEarnedAbroadForResidents
                ?.businessAndProfessionalIncome?.grossIncomeValue! === 0
                ? undefined
                : readOnly
                ? IRSData?.incomeEarnedAbroadForResidents?.businessAndProfessionalIncome?.grossIncomeValue?.toString()!
                : formatNumber2DecimalPlaces(
                    roundValue(
                      IRSData?.incomeEarnedAbroadForResidents
                        ?.businessAndProfessionalIncome?.grossIncomeValue!
                    )
                  )
            }
            placeholder={
              readOnly
                ? formatToEuroCurrency(
                    IRSDataByHolder?.incomeEarnedAbroadForResidents
                      ?.businessAndProfessionalIncome?.grossIncomeValue
                  )
                : ""
            }
            isDisabled={readOnly}
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
                    title: `${t("attachmentJGrossIncome")}`,
                    show: true,
                    isAttachmentJ: true,
                    businessAndProfessionalIncome: {
                      ...IRSData?.incomeEarnedAbroadForResidents
                        ?.businessAndProfessionalIncome?.grossIncomes,
                    },
                    businessAndProfessionalIncomeByHolder: {
                      ...IRSDataByHolder?.incomeEarnedAbroadForResidents
                        ?.businessAndProfessionalIncome?.grossIncomes,
                    },
                    totalGrossIncomeByHolder:
                      IRSDataByHolder?.incomeEarnedAbroadForResidents
                        ?.businessAndProfessionalIncome?.grossIncomeValue,
                    applyTotalValue,
                    handleCleanModel,
                    saveValues,
                  });
                }
              }}
            />
          )}
        </span>
        <TextField
          label={t("taxPaidAbroad")}
          defaultValue={
            IRSData?.incomeEarnedAbroadForResidents
              ?.businessAndProfessionalIncome?.taxPaidAbroad === 0
              ? undefined
              : IRSData?.incomeEarnedAbroadForResidents?.businessAndProfessionalIncome?.taxPaidAbroad?.toString()!
          }
          valueCallback={handleFieldChange(
            "businessAndProfessionalIncome",
            "taxPaidAbroad"
          )}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.incomeEarnedAbroadForResidents
                    ?.businessAndProfessionalIncome?.taxPaidAbroad
                )
              : ""
          }
          isDisabled={readOnly}
        />
        <TextField
          label={t("contributionsToSocialProtectionSchemes")}
          defaultValue={
            IRSData?.incomeEarnedAbroadForResidents
              ?.businessAndProfessionalIncome
              ?.contributionsToSocialProtectionSchemes === 0
              ? undefined
              : IRSData?.incomeEarnedAbroadForResidents?.businessAndProfessionalIncome?.contributionsToSocialProtectionSchemes?.toString()!
          }
          valueCallback={handleFieldChange(
            "businessAndProfessionalIncome",
            "contributionsToSocialProtectionSchemes"
          )}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.incomeEarnedAbroadForResidents
                    ?.businessAndProfessionalIncome
                    ?.contributionsToSocialProtectionSchemes
                )
              : ""
          }
          isDisabled={readOnly}
        />
        <TextField
          label={t("withholding")}
          defaultValue={
            IRSData?.incomeEarnedAbroadForResidents
              ?.businessAndProfessionalIncome?.withholding === 0
              ? undefined
              : IRSData?.incomeEarnedAbroadForResidents?.businessAndProfessionalIncome?.withholding?.toString()!
          }
          valueCallback={handleFieldChange(
            "businessAndProfessionalIncome",
            "withholding"
          )}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.incomeEarnedAbroadForResidents
                    ?.businessAndProfessionalIncome?.withholding
                )
              : ""
          }
          isDisabled={readOnly}
        />
      </Accordion>
      <Accordion title={t("propertyIncome")}>
        <TextField
          label={`${t("netIncome")}*`}
          defaultValue={
            IRSData?.incomeEarnedAbroadForResidents?.propertyIncome
              ?.netIncome! === 0
              ? undefined
              : IRSData?.incomeEarnedAbroadForResidents?.propertyIncome?.netIncome?.toString()!
          }
          valueCallback={handleFieldChange("propertyIncome", "netIncome")}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.incomeEarnedAbroadForResidents
                    ?.propertyIncome?.netIncome
                )
              : ""
          }
          isDisabled={readOnly}
        />
        <TextField
          label={t("taxPaidAbroad")}
          defaultValue={
            IRSData?.incomeEarnedAbroadForResidents?.propertyIncome
              ?.taxPaidAbroad === 0
              ? undefined
              : IRSData?.incomeEarnedAbroadForResidents?.propertyIncome?.taxPaidAbroad?.toString()!
          }
          valueCallback={handleFieldChange("propertyIncome", "taxPaidAbroad")}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.incomeEarnedAbroadForResidents
                    ?.propertyIncome?.taxPaidAbroad
                )
              : ""
          }
          isDisabled={readOnly}
        />
      </Accordion>
      <Accordion title="Rendimentos de capitais (categoria E)">
        <TextField
          label={`${t("grossIncome")}*`}
          defaultValue={
            IRSData?.incomeEarnedAbroadForResidents?.capitalIncome
              ?.grossIncome! === 0
              ? undefined
              : IRSData?.incomeEarnedAbroadForResidents?.capitalIncome?.grossIncome?.toString()!
          }
          valueCallback={handleFieldChange("capitalIncome", "grossIncome")}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.incomeEarnedAbroadForResidents?.capitalIncome
                    ?.grossIncome
                )
              : ""
          }
          isDisabled={readOnly}
        />
        <TextField
          label={t("eithholdingTaxInPortugal")}
          defaultValue={
            IRSData?.incomeEarnedAbroadForResidents?.capitalIncome
              ?.eithholdingTaxInPortugal === 0
              ? undefined
              : IRSData?.incomeEarnedAbroadForResidents?.capitalIncome?.eithholdingTaxInPortugal?.toString()!
          }
          valueCallback={handleFieldChange(
            "capitalIncome",
            "eithholdingTaxInPortugal"
          )}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.incomeEarnedAbroadForResidents?.capitalIncome
                    ?.eithholdingTaxInPortugal
                )
              : ""
          }
          isDisabled={readOnly}
        />
        <TextField
          label={t("taxPaidAbroad")}
          defaultValue={
            IRSData?.incomeEarnedAbroadForResidents?.capitalIncome
              ?.taxPaidAbroad === 0
              ? undefined
              : IRSData?.incomeEarnedAbroadForResidents?.capitalIncome?.taxPaidAbroad?.toString()!
          }
          valueCallback={handleFieldChange("capitalIncome", "taxPaidAbroad")}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.incomeEarnedAbroadForResidents?.capitalIncome
                    ?.taxPaidAbroad
                )
              : ""
          }
          isDisabled={readOnly}
        />
      </Accordion>
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
                  IRSDataByHolder?.incomeEarnedAbroadForResidents?.netIncome!
                )
              : formatToEuroCurrency(
                  IRSData?.incomeEarnedAbroadForResidents?.netIncome!
                )
          }
        />
      </div>
    </div>
  );
};

export default RendimentosObtidosNoEstrangeiroParaResidentes;
