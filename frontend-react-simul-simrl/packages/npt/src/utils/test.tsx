// Material Theme
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
  adaptV4Theme,
} from "@mui/material";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../store";
import i18next from "../i18n";

const muiTheme = createTheme(
  adaptV4Theme({
    props: { MuiWithWidth: { initialWidth: "md" } },
  } as any)
);

/**
 * @param {*} { children = null, theme = {} }
 */

export const ComponentTestWrapper = ({ children = null, theme = {} }: any) => (
  <I18nextProvider i18n={i18next}>
    <StyledEngineProvider injectFirst>
      <Provider store={store}>
        <ThemeProvider theme={{ ...muiTheme, ...theme }}>
          <BrowserRouter>{children} </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </StyledEngineProvider>
  </I18nextProvider>
);
