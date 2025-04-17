// Polyfills
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";

import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import cssVars from "css-vars-ponyfill";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import { Container } from "@mui/material";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { NBLoader } from "@nb-omc-xit-frontend/nb-shared/lib/NBLoader";

// Fw Packages Styles
import "@nb-omc-xit-frontend/nb-base/lib/styles/index.scss";
import "@nb-omc-xit-frontend/nb-feedback/lib/index.css";
// import "@nb-omc-xit-frontend/nb-shared/lib/";
// Redux Store Provider
import { Provider } from "react-redux";

import RHSSOAuth from "./store/RHSSOAuth";

// Root Styles
import "./index.scss";

// I18N
import i18next from "./i18n";

import reportWebVitals from "./reportWebVitals";

// Entry Component
import Ecosystem from "./ecosystem";

// Redux Store

import store from "./store";

cssVars();

const onSuccess = () => {
  ReactDOM.render(
    <React.StrictMode>
      <I18nextProvider i18n={i18next}>
        <StyledEngineProvider injectFirst>
          <Provider store={store}>
            <Suspense fallback={<NBLoader />}>
              <BrowserRouter basename={window._env_.REACT_APP_BASE_DIRECTORY}>
                <Container classes={{ root: "nb-body" }}>
                  <Ecosystem />
                </Container>
              </BrowserRouter>
            </Suspense>
          </Provider>
        </StyledEngineProvider>
      </I18nextProvider>
    </React.StrictMode>,
    document.getElementById("root")
  );
};

if (window.location.href.includes("localhost")) {
  onSuccess();
} else {
  RHSSOAuth.initKeycloak({ onSuccess });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
