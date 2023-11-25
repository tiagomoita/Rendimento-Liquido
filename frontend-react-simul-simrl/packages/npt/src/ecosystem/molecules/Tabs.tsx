import { NBTabs } from "@nb-omc-xit-frontend/nb-navigation/lib/NBTabs";
import Tab from "@mui/material/Tab";
import { SyntheticEvent, useState } from "react";
import "./Tabs.scss";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { retrieveArrayHolders } from "../../store/modules/entities/holder/selectors";
import { holder } from "../../store/modules/entities/holder/types";

type TabsProps = {
  callback?: Function;
};

const Tabs = (props: TabsProps) => {
  const { callback } = props;
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);
  const arrayHolders = useSelector(retrieveArrayHolders);

  const createTabs = () => {
    return (
      arrayHolders &&
      arrayHolders.map((elem: holder) => {
        return (
          <Tab
            key={elem.holderNumber}
            label={`${elem.holderNumber}${t("holderNumber")}`}
          />
        );
      })
    );
  };

  return (
    <NBTabs
      onChange={(event: SyntheticEvent, newValue) => {
        setTab(newValue);
        callback!(newValue);
      }}
      value={tab}
      key={tab}
    >
      <Tab key={tab} label={t("totalAggregator")} />;{createTabs()}
    </NBTabs>
  );
};

export default Tabs;
