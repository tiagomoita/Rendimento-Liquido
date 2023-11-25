/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { NBButton } from "@nb-omc-xit-frontend/nb-shared/lib/NBButton";
import { useDispatch, useSelector } from "react-redux";
import "./TypeOfIncome.scss";
import { calculateNetIncomeIndependentWithoutOrganizedAccounting } from "npm-pkg-simul-simrl";
import { useTranslation } from "react-i18next";
import TextField from "../../../atoms/TextField";
import Total from "../../../atoms/Total";
import Text from "../../../atoms/Text";
import info from "../../../../assets/images/info.svg";
import {
  retrieveIRSData,
  retrieveIRSDataByHolder,
  retrieveTaxes,
} from "../../../../store/modules/entities/holder/selectors";
import {
  formatNumber2DecimalPlaces,
  formatToEuroCurrency,
  roundValue,
} from "../../../../utils/utils";

import {
  setClean,
  setIndependentWithoutOrganizedAccounting,
} from "../../../../store/modules/entities/holder/slices";
import { Model3Data } from "../../../../store/modules/entities/holder/types";
import { color } from "../../../../utils/colors";

type IndependenteSemContabilidadeOrganizadaProps = {
  setModel3Data?: Dispatch<SetStateAction<Model3Data>>;
  readOnly?: boolean;
  tabHolder?: number;
};

const IndependenteSemContabilidadeOrganizada = (
  props: IndependenteSemContabilidadeOrganizadaProps
) => {
  const { readOnly, tabHolder, setModel3Data } = props;
  const { t } = useTranslation();

  const IRSData = useSelector(retrieveIRSData);
  const IRSDataByHolder = useSelector(retrieveIRSDataByHolder(tabHolder!));
  const Taxes = useSelector(retrieveTaxes);
  const dispatch = useDispatch();

  const [taxIncidenceRate] = useState<number>(
    Taxes?.valueToCalculateTaxIncidence!
  );

  const handleCleanAll = () => {
    dispatch(setClean("independentWithoutOrganizedAccountingAll2"));
  };

  const handleCleanModel = () => {
    const charges = IRSData?.independentWithoutOrganizedAccounting?.charges;
    dispatch(
      setIndependentWithoutOrganizedAccounting({
        data: {
          charges,
          totalGrossIncome: 0,
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
          netIncome: calculateNetIncomeIndependentWithoutOrganizedAccounting({
            totalGrossIncome: 0,
            charges: charges!,
            taxIncidence:
              0 - charges! > 0 ? (0 - charges!) * taxIncidenceRate : 0,
          }),
          taxIncidence:
            0 - charges! > 0 ? (0 - charges!) * taxIncidenceRate : 0,
        },
      })
    );
  };

  const handleFieldChange = (field: string, value: number) => {
    if (field === "charges") {
      dispatch(
        setIndependentWithoutOrganizedAccounting({
          data: {
            [field]: value,
          },
        })
      );
    }
  };

  const handleChange = (key: string, val: number) => {
    switch (key) {
      case "charges": {
        handleFieldChange("charges", val);
        break;
      }

      default:
    }
  };

  useEffect(() => {
    const totalGrossIncome =
      IRSData?.independentWithoutOrganizedAccounting?.totalGrossIncome;
    const charges = IRSData?.independentWithoutOrganizedAccounting?.charges!;
    dispatch(
      setIndependentWithoutOrganizedAccounting({
        data: {
          charges,
          totalGrossIncome,
          netIncome: calculateNetIncomeIndependentWithoutOrganizedAccounting({
            totalGrossIncome,
            charges,
            taxIncidence:
              totalGrossIncome - charges > 0
                ? (totalGrossIncome - charges) * taxIncidenceRate
                : 0,
          }),
          taxIncidence:
            totalGrossIncome - charges > 0
              ? (totalGrossIncome - charges) * taxIncidenceRate
              : 0,
        },
      })
    );
  }, [IRSData?.independentWithoutOrganizedAccounting?.charges!]);

  useEffect(() => {
    if (
      IRSData?.independentWithoutOrganizedAccounting
        ?.independentWithoutOrganizedAccountingCheckBox! === false
    ) {
      handleCleanAll();
    }
  }, [
    IRSData?.independentWithoutOrganizedAccounting
      ?.independentWithoutOrganizedAccountingCheckBox!,
  ]);

  const applyTotalValue = (
    valueTotal: any,
    indComProIncomeClone: any,
    agriYieldsSilvLivstckClone: any,
    otherIncomeClone: any
  ) => {
    const charges = IRSData?.independentWithoutOrganizedAccounting?.charges;
    dispatch(
      setIndependentWithoutOrganizedAccounting({
        data: {
          charges,
          totalGrossIncome: valueTotal,
          indComProIncome: { ...indComProIncomeClone },
          agriYieldsSilvLivstck: { ...agriYieldsSilvLivstckClone },
          otherIncome: { ...otherIncomeClone },
          netIncome: calculateNetIncomeIndependentWithoutOrganizedAccounting({
            totalGrossIncome: valueTotal,
            charges: charges!,
            taxIncidence:
              valueTotal - charges! > 0
                ? (valueTotal - charges!) * taxIncidenceRate
                : 0,
          }),
          taxIncidence:
            valueTotal - charges! > 0
              ? (valueTotal - charges!) * taxIncidenceRate
              : 0,
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
            text={t("independentWithoutOrganizedAccountingInfo")}
            fontSize="11px"
            margin="0px 0px 0px 10px"
            color={color.nb_bluegray}
            alignSelf="center"
          />
        </div>
      )}
      <span style={{ position: "relative" }}>
        <TextField
          label={`${t("grossIncome")}*`}
          defaultValue={
            IRSData?.independentWithoutOrganizedAccounting
              ?.totalGrossIncome! === 0
              ? undefined
              : readOnly
              ? IRSData?.independentWithoutOrganizedAccounting
                  ?.totalGrossIncome!
              : formatNumber2DecimalPlaces(
                  roundValue(
                    IRSData?.independentWithoutOrganizedAccounting
                      ?.totalGrossIncome!
                  )
                )
          }
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.independentWithoutOrganizedAccounting
                    ?.totalGrossIncome
                )
              : IRSData?.independentWithoutOrganizedAccounting
                  ?.totalGrossIncome! === 0
              ? ""
              : `${formatNumber2DecimalPlaces(
                  roundValue(
                    IRSData?.independentWithoutOrganizedAccounting
                      ?.totalGrossIncome! || 0
                  )
                )} €`
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
                  ...IRSData?.independentWithoutOrganizedAccounting
                    ?.indComProIncome,
                },
                agriYieldsSilvLivstck: {
                  ...IRSData?.independentWithoutOrganizedAccounting
                    ?.agriYieldsSilvLivstck,
                },
                otherIncome: {
                  ...IRSData?.independentWithoutOrganizedAccounting
                    ?.otherIncome,
                },
                indComProIncomeByHolder: {
                  ...IRSDataByHolder?.independentWithoutOrganizedAccounting
                    ?.indComProIncome,
                },
                agriYieldsSilvLivstckByHolder: {
                  ...IRSDataByHolder?.independentWithoutOrganizedAccounting
                    ?.agriYieldsSilvLivstck,
                },
                otherIncomeByHolder: {
                  ...IRSDataByHolder?.independentWithoutOrganizedAccounting
                    ?.otherIncome,
                },
                totalGrossIncomeByHolder:
                  IRSDataByHolder?.independentWithoutOrganizedAccounting
                    ?.totalGrossIncome,
                applyTotalValue,
                handleCleanModel,
              });
            }
          }}
        />
      </span>

      <TextField
        label={t("charges")}
        defaultValue={
          IRSData?.independentWithoutOrganizedAccounting?.charges === 0
            ? undefined
            : IRSData?.independentWithoutOrganizedAccounting?.charges?.toString()
        }
        valueCallback={(val: number) => handleChange("charges", val)}
        placeholder={
          readOnly
            ? formatToEuroCurrency(
                IRSDataByHolder?.independentWithoutOrganizedAccounting?.charges
              )
            : ""
        }
        isDisabled={readOnly}
      />
      <TextField
        label={t("taxIncidence")}
        defaultValue={
          IRSData?.independentWithoutOrganizedAccounting?.taxIncidence! === 0
            ? undefined
            : readOnly
            ? IRSData?.independentWithoutOrganizedAccounting?.taxIncidence!
            : formatNumber2DecimalPlaces(
                roundValue(
                  IRSData?.independentWithoutOrganizedAccounting?.taxIncidence!
                )
              )
        }
        placeholder={
          readOnly
            ? formatToEuroCurrency(
                IRSDataByHolder?.independentWithoutOrganizedAccounting
                  ?.taxIncidence
              )
            : IRSData?.independentWithoutOrganizedAccounting?.taxIncidence! ===
              0
            ? ""
            : `${formatNumber2DecimalPlaces(
                roundValue(
                  IRSData?.independentWithoutOrganizedAccounting
                    ?.taxIncidence! || 0
                )
              )} €`
        }
        isDisabled
      />
      <div className="buttons">
        {!readOnly && (
          <NBButton nbtype="Secondary" onClick={handleCleanAll}>
            {t("clean")}
          </NBButton>
        )}
        <Total
          value={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.independentWithoutOrganizedAccounting
                    ?.netIncome!
                )
              : formatToEuroCurrency(
                  IRSData?.independentWithoutOrganizedAccounting?.netIncome!
                )
          }
        />
      </div>
    </div>
  );
};

export default IndependenteSemContabilidadeOrganizada;
