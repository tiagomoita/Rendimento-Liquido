import { configureI18NInstance } from "@nb-omc-xit-frontend/nb-i18n/lib";
import EI18NEntity from "@nb-omc-xit-frontend/nb-base/lib/enums/i18n-entity";
import EI18NLocales from "@nb-omc-xit-frontend/nb-base/lib/enums/i18n-locales";

// Local Default Resources
import NBPT from "./translations/pt/nb.json";
import NBES from "./translations/es/nb.json";
import NBEN from "./translations/en/nb.json";
import NBFR from "./translations/fr/nb.json";

// NBA Specific Resources
import NBAPT from "./translations/pt/nba.json";
import NBAES from "./translations/es/nba.json";
import NBAEN from "./translations/en/nba.json";
import NBAFR from "./translations/fr/nba.json";

export default configureI18NInstance({
  options: {
    resources: {
      [EI18NLocales.PT]: {
        [EI18NEntity.NB]: NBPT,
        [EI18NEntity.NBA]: NBAPT,
      },
      [EI18NLocales.ES]: {
        [EI18NEntity.NB]: NBES,
        [EI18NEntity.NBA]: NBAES,
      },
      [EI18NLocales.EN]: {
        [EI18NEntity.NB]: NBEN,
        [EI18NEntity.NBA]: NBAEN,
      },
      [EI18NLocales.FR]: {
        [EI18NEntity.NB]: NBFR,
        [EI18NEntity.NBA]: NBAFR,
      },
    },
  },
  cdnBaseURL:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_CDN_BASE_URL
      : window.location.origin,
});
