import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import {
  setIRSTotal,
  setReceiptsTotal,
} from "../../store/modules/entities/holder/slices";
import "./HolderTotal.scss";
import Text from "../atoms/Text";
import { color } from "../../utils/colors";

type HolderTotalProps = {
  title?: number;
  irsValue?: number;
  receiptValue?: number;
};

const HolderTotal = (props: HolderTotalProps) => {
  const { title, irsValue, receiptValue } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(setIRSTotal({ currentHolder: title, total: irsValue }));
  }, [irsValue]);

  useEffect(() => {
    dispatch(setReceiptsTotal({ currentHolder: title, total: receiptValue }));
  }, [receiptValue]);

  function formatToEuroCurrency(number: number | undefined): string {
    if (number === undefined) {
      return "0,00 €";
    }
    const euroValue = new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(number);

    return euroValue;
  }

  return (
    <div className="holder-total-container">
      <div className="holder-total-context">
        <Text
          className="title-secondary"
          text={
            <b>
              {title}
              {t("holderNumber")}
            </b>
          }
          color={color.nb_green}
        />
      </div>
      <span
        style={{
          display: "flex",
          width: "100%",
          height: "0.5px",
          backgroundColor: "#e0e7e8",
        }}
      />
      <div className="holder-total-wrapper">
        <div>
          <Text
            className="title-secondary"
            text={t("annualIncome")}
            color={color.nb_bluegray}
          />
          <Text
            className="title-secondary"
            text={<b>{formatToEuroCurrency(irsValue)}</b>}
            color="black"
          />
        </div>
        <div>
          <Text
            className="title-secondary"
            text={t("averageMonthlyIncome")}
            color={color.nb_bluegray}
          />
          <Text
            className="title-secondary"
            text={<b>{formatToEuroCurrency(receiptValue)}</b>}
            color="black"
          />
        </div>
      </div>
      <span
        style={{
          display: "flex",
          width: "100%",
          height: "0.5px",
          backgroundColor: "#e0e7e8",
        }}
      />
    </div>
  );
};

export default HolderTotal;
