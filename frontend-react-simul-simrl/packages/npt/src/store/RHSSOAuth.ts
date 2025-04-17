/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import { AxiosRequestConfig } from "axios";
import Keycloak, { KeycloakInstance, KeycloakInitOptions } from "keycloak-js";
import Cockpit from "./NPTCockpit";
import EntitiesCode from "../enums/entities-code";

// Bypass 'Only a void function can be called with the 'new' keyword.' TS error
const KCConstructor: any | typeof Keycloak = Keycloak;

/**
 * Authentication RH-SSO - Hybrid Flow OpenID Connect
 * @class RHSSOAuth
 */

class RHSSOAuth {
  private static instance: RHSSOAuth;

  private _kc: KeycloakInstance;

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   * @memberof I18NSingleton
   */
  private constructor() {
    this._kc = new KCConstructor({
      clientId: window._env_.REACT_APP_API_RHSSO_CLIENT_ID,
      realm: window._env_.REACT_APP_API_RHSSO_REALM,
      url: window._env_.REACT_APP_API_RHSSO_URL,
    });
  }

  /**
   * The static method that controls the access to the singleton instance.
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   * @static
   * @return {*}  {RHSSOAuth}
   * @memberof RHSSOAuth
   */
  public static getInstance = (): RHSSOAuth => {
    if (!RHSSOAuth.instance) {
      RHSSOAuth.instance = new RHSSOAuth();
    }

    return RHSSOAuth.instance;
  };

  /**
   * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
   * @param {{
   *         config?: KeycloakInitOptions;
   *         onError?: () => void;
   *         onSuccess: () => void;
   *     }} {
   *         config = {},
   *         onError = () => {},
   *         onSuccess = () => {},
   *     }
   * @memberof RHSSOAuth
   */
  public initKeycloak = ({
    config = {},
    onError = () => {},
    onSuccess = () => {},
  }: {
    config?: KeycloakInitOptions;
    onError?: () => void;
    onSuccess: () => void;
  }) => {
    try {
      const cockpit = new Cockpit();
      if (!cockpit.get_DadosContexto) {
        throw new Error("Cockpit nao encontrado");
      }
      const dados = cockpit.get_DadosContexto();
      const { Estrutura = "", CodigoBanco = "" } = { ...dados };

      const createURL = this._kc.createLoginUrl;
      this._kc.createLoginUrl = (options) => {
        const url = createURL(options);
        return `${url}&agpEstrutura=${Estrutura}&agpEmpresa=${CodigoBanco}&agpAplicacao=SIM&agpProcesso=PPS0100`;
      };
    } catch (error) {
      // Cockpit não encontrado.

      const createURL = this._kc.createLoginUrl;
      this._kc.createLoginUrl = (options) => {
        const url = createURL(options);
        return `${url}&agpEstrutura=B0210&agpEmpresa=${EntitiesCode.BES}&agpAplicacao=SIM&agpProcesso=PPS0100`;
      };
    }
    this._kc
      .init({
        onLoad: "check-sso",
        silentCheckSsoRedirectUri: [
          window.location.origin,
          process.env.PUBLIC_URL,
          "silent-check-sso.html",
        ].join("/"),
        flow: "hybrid",
        silentCheckSsoFallback: true,
        checkLoginIframe: true,
        checkLoginIframeInterval: 5,
        enableLogging: true,
        ...config,
      })
      .then((authenticated) => (authenticated ? onSuccess() : this.doLogin()))
      .catch(onError);
  };

  /**
   * @readonly
   * @type {KeycloakInstance}
   * @memberof RHSSOAuth
   */
  public get kc(): KeycloakInstance {
    return this._kc;
  }

  /**
   * @memberof RHSSOAuth
   */
  public doLogin = () => this._kc.login();

  /**
   * @memberof RHSSOAuth
   */
  public doLogout = () => this._kc.logout();

  /**
   * @memberof RHSSOAuth
   */
  public getToken = () => this._kc.token;

  /**
   * @memberof RHSSOAuth
   */
  public isLoggedIn = () => !!this._kc.token;

  /**
   * @param {() => Promise<AxiosRequestConfig>} successCallback
   * @param {() => Promise<AxiosRequestConfig>} errorCallback
   * @memberof RHSSOAuth
   */
  public updateToken = (
    successCallback: () => Promise<AxiosRequestConfig>,
    errorCallback: () => Promise<AxiosRequestConfig>
  ) => {
    if (!this._kc.refreshToken) {
      return Promise.resolve(false).then(successCallback);
    }

    return this._kc
      .updateToken(5)
      .then(successCallback)
      .catch(() => {
        errorCallback();
        return this._kc.login;
      });
  };

  /**
   * @memberof RHSSOAuth
   */
  public getUsername = () => {
    const { tokenParsed = {} } = { ...this._kc };
    const { preferred_username: preferredUsername = "" } = {
      ...tokenParsed,
    };
    return preferredUsername;
  };

  /**
   * @param {*} [roles=[]]
   * @memberof RHSSOAuth
   */
  public hasRole = (roles = []) => roles.some(this._kc.hasRealmRole);
}

export default RHSSOAuth.getInstance();
