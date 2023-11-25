import { NBButton } from "@nb-omc-xit-frontend/nb-shared/lib/NBButton";
import { useDispatch, useSelector } from "react-redux";
import "./TypeOfIncome.scss";
import { Dispatch, SetStateAction } from "react";
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
import { formatToEuroCurrency } from "../../../../utils/utils";
import { Model3Data } from "../../../../store/modules/entities/holder/types";
import { color } from "../../../../utils/colors";

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
  };

  const handleCleanModel = () => {
    dispatch(
      setIncomeEarnedAbroadForResidents({
        data: {
          businessAndProfessionalIncome: {
            ...IRSData?.incomeEarnedAbroadForResidents
              ?.businessAndProfessionalIncome!,
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
            grossIncome: 0,
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
    indComProIncomeClone: any,
    agriYieldsSilvLivstckClone: any,
    otherIncomeClone: any
  ) => {
    dispatch(
      setIncomeEarnedAbroadForResidents({
        data: {
          businessAndProfessionalIncome: {
            ...IRSData?.incomeEarnedAbroadForResidents
              ?.businessAndProfessionalIncome!,
            indComProIncome: { ...indComProIncomeClone },
            agriYieldsSilvLivstck: { ...agriYieldsSilvLivstckClone },
            otherIncome: { ...otherIncomeClone },
            grossIncome: valueTotal,
          },
        },
      })
    );
    if (setModel3Data) setModel3Data({ show: false, title: "" });
  };

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
                ?.businessAndProfessionalIncome?.grossIncome! === 0
                ? undefined
                : IRSData?.incomeEarnedAbroadForResidents?.businessAndProfessionalIncome?.grossIncome?.toString()!
            }
            valueCallback={handleFieldChange(
              "businessAndProfessionalIncome",
              "grossIncome"
            )}
            placeholder={
              readOnly
                ? formatToEuroCurrency(
                    IRSDataByHolder?.incomeEarnedAbroadForResidents
                      ?.businessAndProfessionalIncome?.grossIncome
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
                  title: `${t("attachment")} J`,
                  show: true,
                  indComProIncome: {
                    ...IRSData?.incomeEarnedAbroadForResidents
                      ?.businessAndProfessionalIncome?.indComProIncome,
                  },
                  agriYieldsSilvLivstck: {
                    ...IRSData?.incomeEarnedAbroadForResidents
                      ?.businessAndProfessionalIncome?.agriYieldsSilvLivstck,
                  },
                  otherIncome: {
                    ...IRSData?.incomeEarnedAbroadForResidents
                      ?.businessAndProfessionalIncome?.otherIncome,
                  },
                  indComProIncomeByHolder: {
                    ...IRSDataByHolder?.incomeEarnedAbroadForResidents
                      ?.businessAndProfessionalIncome?.indComProIncome,
                  },
                  agriYieldsSilvLivstckByHolder: {
                    ...IRSDataByHolder?.incomeEarnedAbroadForResidents
                      ?.businessAndProfessionalIncome?.agriYieldsSilvLivstck,
                  },
                  otherIncomeByHolder: {
                    ...IRSDataByHolder?.incomeEarnedAbroadForResidents
                      ?.businessAndProfessionalIncome?.otherIncome,
                  },
                  totalGrossIncomeByHolder:
                    IRSDataByHolder?.incomeEarnedAbroadForResidents
                      ?.businessAndProfessionalIncome?.grossIncome,
                  applyTotalValue,
                  handleCleanModel,
                });
              }
            }}
          />
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
      </Accordion>
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
