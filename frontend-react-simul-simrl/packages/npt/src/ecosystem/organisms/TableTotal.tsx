import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import Text from "../atoms/Text";
import "./TableTotal.scss";
import {
  retrieveAggregator,
  retrieveArrayHolders,
} from "../../store/modules/entities/holder/selectors";
import { holder } from "../../store/modules/entities/holder/types";
import main from "../../store/modules/main";
import { color } from "../../utils/colors";

const TableTotal = () => {
  const { t } = useTranslation();
  const isLoading = useSelector(main.selectors.isLoading);
  const arrayHolders = useSelector(retrieveArrayHolders);
  const aggregator = useSelector(retrieveAggregator);
  const [irsRows, setIrsRows]: any = useState([]);
  const [receiptsRows, setReceiptsRows]: any = useState([]);

  const createData = (name: any, value: string[]) => {
    return { name, value };
  };

  function formatToEuroCurrency(number: number): string {
    const formatter = new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
    });

    return formatter.format(number);
  }

  useEffect(() => {
    setIrsRows([
      createData(t("attachmentA"), [
        formatToEuroCurrency(aggregator?.aggDependentsPensions!),
        ...arrayHolders.map((elem: holder) => {
          return formatToEuroCurrency(
            elem?.IRSData?.dependentsAndPensions?.netIncome
          );
        }),
      ]),
      createData(t("attachmentB"), [
        formatToEuroCurrency(aggregator?.aggIndependentWithout!),
        ...arrayHolders.map((elem: holder) => {
          return formatToEuroCurrency(
            elem?.IRSData?.independentWithoutOrganizedAccounting?.netIncome
          );
        }),
      ]),
      createData(t("attachmentC"), [
        formatToEuroCurrency(aggregator?.aggIndependentWith!),
        ...arrayHolders.map((elem: holder) => {
          return formatToEuroCurrency(
            elem?.IRSData?.independentWithOrganizedAccounting?.netIncome
          );
        }),
      ]),
      createData(t("attachmentD"), [
        formatToEuroCurrency(aggregator?.aggTaxTransparency!),
        ...arrayHolders.map((elem: holder) => {
          return formatToEuroCurrency(
            elem?.IRSData?.taxTransparency?.netIncome
          );
        }),
      ]),
      createData(t("attachmentE"), [
        formatToEuroCurrency(aggregator?.aggCapitalIncome!),
        ...arrayHolders.map((elem: holder) => {
          return formatToEuroCurrency(elem?.IRSData?.capitalIncome?.netIncome);
        }),
      ]),
      createData(t("attachmentF"), [
        formatToEuroCurrency(aggregator?.aggPropertyIncome!),
        ...arrayHolders.map((elem: holder) => {
          return formatToEuroCurrency(elem?.IRSData?.propertyIncome?.netIncome);
        }),
      ]),
      createData(t("attachmentH"), [
        formatToEuroCurrency(aggregator?.aggIntellectualProper!),
        ...arrayHolders.map((elem: holder) => {
          return formatToEuroCurrency(
            elem?.IRSData?.exemptIncomeOrIntellectualProperty?.netIncome
          );
        }),
      ]),
      createData(t("attachmentJ"), [
        formatToEuroCurrency(aggregator?.aggAbroadForResidents!),
        ...arrayHolders.map((elem: holder) => {
          return formatToEuroCurrency(
            elem?.IRSData?.incomeEarnedAbroadForResidents?.netIncome
          );
        }),
      ]),
      createData(t("incomeEarnedAbroadForNonResidents"), [
        formatToEuroCurrency(aggregator?.aggAbroadForNonResidents!),
        ...arrayHolders.map((elem: holder) => {
          return formatToEuroCurrency(
            elem.IRSData.incomeEarnedAbroadForNonResidents.netIncome
          );
        }),
      ]),
      createData(t("otherIncome"), [
        formatToEuroCurrency(aggregator?.aggOtherIncome!),
        ...arrayHolders.map((elem: holder) => {
          return formatToEuroCurrency(elem?.IRSData?.otherIncome?.netIncome);
        }),
      ]),
      createData(<b>{t("total")}</b>, [
        formatToEuroCurrency(aggregator?.totalNetIncomeIrs!),
        ...arrayHolders.map((elem: holder) => {
          return formatToEuroCurrency(elem?.IRSTotal);
        }),
      ]),
    ]);

    setReceiptsRows([
      createData(t("salaryOrPensionReceipts"), [
        formatToEuroCurrency(aggregator?.aggSalaryOrPensionReceipts!),
        ...arrayHolders.map((elem: holder) => {
          return formatToEuroCurrency(
            elem?.ReceiptsData?.salaryOrPensionReceipts?.averageNetIncome
          );
        }),
      ]),
      createData(t("greenReceipts"), [
        formatToEuroCurrency(aggregator?.aggGreenReceipts!),
        ...arrayHolders.map((elem: holder) => {
          return formatToEuroCurrency(
            elem?.ReceiptsData?.greenReceipts?.averageNetIncome
          );
        }),
      ]),
      createData(t("propertyIncomeReceipts"), [
        formatToEuroCurrency(aggregator?.aggPropertyIncomeReceipts!),
        ...arrayHolders.map((elem: holder) => {
          return formatToEuroCurrency(
            elem?.ReceiptsData?.propertyIncomeReceipts?.averageNetIncome
          );
        }),
      ]),
      createData(t("researchScholarshipsInternshipReceipts"), [
        formatToEuroCurrency(aggregator?.aggResearchInternshipReceipts!),
        ...arrayHolders.map((elem: holder) => {
          return formatToEuroCurrency(
            elem?.ReceiptsData?.researchScholarshipsInternshipReceipts
              ?.averageNetIncome
          );
        }),
      ]),
      createData(t("alimonyReceipts"), [
        formatToEuroCurrency(aggregator?.aggAlimonyReceipts!),
        ...arrayHolders.map((elem: holder) => {
          return formatToEuroCurrency(
            elem?.ReceiptsData?.alimonyReceipts?.averageNetIncome
          );
        }),
      ]),
      createData(<b>{t("total")}</b>, [
        formatToEuroCurrency(aggregator?.totalNetIncomeRec!),
        ...arrayHolders.map((elem: holder) => {
          return formatToEuroCurrency(elem?.ReceiptsTotal);
        }),
      ]),
    ]);
  }, [arrayHolders, aggregator]);

  return (
    <>
      {isLoading ? (
        <Skeleton variant="rectangular" className="skeleton-4" />
      ) : (
        <div className="table-wrapper-irs">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <Text
                      className="text-holder"
                      text={<b>{t("annualIncomes")}</b>}
                      fontSize="20px"
                      color={color.nb_green}
                    />
                  </TableCell>
                  <TableCell align="right">{t("aggregator")}</TableCell>
                  {arrayHolders.map((elem: holder) => {
                    return (
                      <TableCell key={elem.holderNumber} align="right">
                        {elem.holderNumber}
                        {t("holderNumber")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {irsRows.map((row: any) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        borderBottom:
                          row.name === "Outros Rendimentos"
                            ? "1px solid black"
                            : "1px solid rgba(224, 224, 224, 1)",
                      }}
                    >
                      {row.name}
                    </TableCell>
                    {row.value.map((val: number, index: any) => {
                      return (
                        <TableCell
                          key={(row.name, index)}
                          align="right"
                          style={{
                            borderBottom:
                              row.name === "Outros Rendimentos"
                                ? "1px solid black"
                                : "1px solid rgba(224, 224, 224, 1)",
                          }}
                        >
                          {val}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      {isLoading ? (
        <Skeleton variant="rectangular" className="skeleton-5" />
      ) : (
        <div className="table-wrapper-receipts">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    <Text
                      className="text-holder"
                      text={<b>{t("monthlyIncome")}</b>}
                      fontSize="20px"
                      color={color.nb_green}
                    />
                  </TableCell>
                  <TableCell align="right">{t("aggregator")}</TableCell>
                  {arrayHolders.map((elem: holder) => {
                    return (
                      <TableCell key={elem.holderNumber} align="right">
                        {elem.holderNumber}
                        {t("holderNumber")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {receiptsRows.map((row: any) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        borderBottom:
                          row.name === "Pensões de alimentos"
                            ? "1px solid black"
                            : "1px solid rgba(224, 224, 224, 1)",
                      }}
                    >
                      {row.name}
                    </TableCell>
                    {row.value.map((val: number, index: any) => {
                      return (
                        <TableCell
                          key={(row.name, index)}
                          align="right"
                          style={{
                            borderBottom:
                              row.name === "Pensões de alimentos"
                                ? "1px solid black"
                                : "1px solid rgba(224, 224, 224, 1)",
                          }}
                        >
                          {val}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
};

export default TableTotal;
