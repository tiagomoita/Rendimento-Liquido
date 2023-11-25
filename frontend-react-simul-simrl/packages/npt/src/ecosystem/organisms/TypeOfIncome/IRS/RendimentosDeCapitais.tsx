/* eslint-disable max-len */
import { useState } from "react";
import { NBButton } from "@nb-omc-xit-frontend/nb-shared/lib/NBButton";
import { useDispatch, useSelector } from "react-redux";
import { NBDropdown } from "@nb-omc-xit-frontend/nb-shared/lib/NBDropdown";
import { useTranslation } from "react-i18next";
import TextField from "../../../atoms/TextField";
import Accordion from "../../../atoms/Accordion";
import Text from "../../../atoms/Text";
import info from "../../../../assets/images/info.svg";
import "./TypeOfIncome.scss";
import Total from "../../../atoms/Total";
import {
  retrieveIRSData,
  retrieveIRSDataByHolder,
} from "../../../../store/modules/entities/holder/selectors";

import {
  setCapitalIncome,
  setClean,
} from "../../../../store/modules/entities/holder/slices";
import { formatToEuroCurrency } from "../../../../utils/utils";
import { color } from "../../../../utils/colors";

type RendimentosDeCapitaisProps = {
  readOnly?: boolean;
  tabHolder?: number;
};

const RendimentosDeCapitais = (props: RendimentosDeCapitaisProps) => {
  const { readOnly, tabHolder } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const IRSData = useSelector(retrieveIRSData);
  const IRSDataByHolder = useSelector(retrieveIRSDataByHolder(tabHolder!));
  const [currentYear] = useState(new Date().getFullYear());

  const handleClean = () => {
    dispatch(setClean("capitalIncome2"));
  };

  const handleFieldChange = (field: string, subfield: string) => {
    return (value: number) => {
      if (
        field === "incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal"
      ) {
        dispatch(
          setCapitalIncome({
            data: {
              [field]: {
                ...IRSData?.capitalIncome
                  .incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal,
                [subfield]: value,
              },
            },
          })
        );
      }
      if (
        field ===
        "incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal"
      ) {
        dispatch(
          setCapitalIncome({
            data: {
              [field]: {
                ...IRSData?.capitalIncome
                  .incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal,
                [subfield]: value,
              },
            },
          })
        );
      }
    };
  };

  return (
    <div>
      {!readOnly && (
        <div className="info-wrapper">
          <img src={info} alt="img" width="18px" />

          <Text
            text={t("capitalIncomeInfo")}
            fontSize="11px"
            margin="0px 0px 0px 10px"
            color={color.nb_bluegray}
            alignSelf="center"
          />
        </div>
      )}
      <Accordion
        title={t(
          "incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal"
        )}
      >
        <NBDropdown
          id="select-years-number-entitiesBasedInPortugal"
          label={t("declarationsNumber")}
          options={[
            {
              label: "2",
              value: "2",
            },
            {
              label: "3",
              value: "3",
            },
          ]}
          placeholder={t("select")}
          value={IRSData?.capitalIncome?.incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal.declarationsNumber?.toString()}
          onChange={(value: string) =>
            dispatch(
              setCapitalIncome({
                data: {
                  incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal:
                    {
                      ...IRSData?.capitalIncome
                        .incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal,
                      declarationsNumber: Number(value),
                    },
                },
              })
            )
          }
        />

        <TextField
          margin="18px 0px 18px 0px"
          label={`${t("capitalNetIncome")} ${currentYear - 1}`}
          defaultValue={
            IRSData?.capitalIncome
              ?.incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal
              ?.grossIncomeYear1 === 0
              ? undefined
              : IRSData?.capitalIncome?.incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal?.grossIncomeYear1?.toString()!
          }
          valueCallback={handleFieldChange(
            "incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal",
            "grossIncomeYear1"
          )}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.capitalIncome
                    ?.incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal
                    ?.grossIncomeYear1
                )
              : ""
          }
          isDisabled={
            readOnly ||
            !IRSData?.capitalIncome
              ?.incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal
              .declarationsNumber
          }
        />
        <TextField
          label={`${t("capitalNetIncome")} ${currentYear - 2}`}
          defaultValue={
            IRSData?.capitalIncome
              ?.incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal
              ?.grossIncomeYear2 === 0
              ? undefined
              : IRSData?.capitalIncome?.incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal?.grossIncomeYear2?.toString()!
          }
          valueCallback={handleFieldChange(
            "incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal",
            "grossIncomeYear2"
          )}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.capitalIncome
                    ?.incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal
                    ?.grossIncomeYear2
                )
              : ""
          }
          isDisabled={
            readOnly ||
            !IRSData?.capitalIncome
              ?.incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal
              .declarationsNumber
          }
        />
        <TextField
          label={`${t("capitalNetIncome")} ${currentYear - 3}`}
          defaultValue={
            IRSData?.capitalIncome
              ?.incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal
              ?.grossIncomeYear3 === 0
              ? undefined
              : IRSData?.capitalIncome?.incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal?.grossIncomeYear3?.toString()!
          }
          valueCallback={handleFieldChange(
            "incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal",
            "grossIncomeYear3"
          )}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.capitalIncome
                    ?.incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal
                    ?.grossIncomeYear3
                )
              : ""
          }
          isDisabled={
            readOnly ||
            !IRSData?.capitalIncome
              ?.incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal
              .declarationsNumber ||
            IRSData?.capitalIncome
              ?.incomeObtainedInPortugueseTerritoryByEntitiesBasedInPortugal
              .declarationsNumber !== 3
          }
        />
      </Accordion>
      <Accordion
        title={t(
          "incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal"
        )}
      >
        <NBDropdown
          id="select-years-number-entitiesWithoutHeadquartersInPortugal"
          label={t("declarationsNumber")}
          options={[
            {
              label: "2",
              value: "2",
            },
            {
              label: "3",
              value: "3",
            },
          ]}
          placeholder={t("select")}
          value={IRSData?.capitalIncome?.incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal.declarationsNumber?.toString()}
          onChange={(value: string) =>
            dispatch(
              setCapitalIncome({
                data: {
                  incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal:
                    {
                      ...IRSData?.capitalIncome
                        .incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal,
                      declarationsNumber: Number(value),
                    },
                },
              })
            )
          }
        />
        <TextField
          margin="18px 0px 18px 0px"
          label={`${t("capitalNetIncome")} ${currentYear - 1}`}
          defaultValue={
            IRSData?.capitalIncome
              ?.incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal
              ?.grossIncomeYear1 === 0
              ? undefined
              : IRSData?.capitalIncome?.incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal?.grossIncomeYear1?.toString()!
          }
          valueCallback={handleFieldChange(
            "incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal",
            "grossIncomeYear1"
          )}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.capitalIncome
                    ?.incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal
                    ?.grossIncomeYear1
                )
              : ""
          }
          isDisabled={
            readOnly ||
            !IRSData?.capitalIncome
              ?.incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal
              .declarationsNumber
          }
        />
        <TextField
          label={`${t("capitalNetIncome")} ${currentYear - 2}`}
          defaultValue={
            IRSData?.capitalIncome
              ?.incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal
              ?.grossIncomeYear2 === 0
              ? undefined
              : IRSData?.capitalIncome?.incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal?.grossIncomeYear2?.toString()!
          }
          valueCallback={handleFieldChange(
            "incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal",
            "grossIncomeYear2"
          )}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.capitalIncome
                    ?.incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal
                    ?.grossIncomeYear2
                )
              : ""
          }
          isDisabled={
            readOnly ||
            !IRSData?.capitalIncome
              ?.incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal
              .declarationsNumber
          }
        />
        <TextField
          label={`${t("capitalNetIncome")} ${currentYear - 3}`}
          defaultValue={
            IRSData?.capitalIncome
              ?.incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal
              ?.grossIncomeYear3 === 0
              ? undefined
              : IRSData?.capitalIncome?.incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal?.grossIncomeYear3?.toString()!
          }
          valueCallback={handleFieldChange(
            "incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal",
            "grossIncomeYear3"
          )}
          placeholder={
            readOnly
              ? formatToEuroCurrency(
                  IRSDataByHolder?.capitalIncome
                    ?.incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal
                    ?.grossIncomeYear3
                )
              : ""
          }
          isDisabled={
            readOnly ||
            !IRSData?.capitalIncome
              ?.incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal
              .declarationsNumber ||
            IRSData?.capitalIncome
              ?.incomeObtainedInPortugueseTerritoryByEntitiesWithoutHeadquartersInPortugal
              .declarationsNumber !== 3
          }
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
              ? formatToEuroCurrency(IRSDataByHolder?.capitalIncome?.netIncome!)
              : formatToEuroCurrency(IRSData?.capitalIncome?.netIncome!)
          }
        />
      </div>
    </div>
  );
};

export default RendimentosDeCapitais;
