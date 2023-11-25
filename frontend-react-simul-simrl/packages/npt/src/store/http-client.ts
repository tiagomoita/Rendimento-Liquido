import httpClient from "@nb-omc-xit-frontend/nb-http/lib/http-client";
import IClientResponse from "@nb-omc-xit-frontend/nb-http/lib/interfaces/client-response.v2";
import { IHttpResponse } from "@nb-omc-xit-frontend/nb-base/lib/interfaces";
import RHSSOAuth from "./RHSSOAuth";
// Utils
import Exception from "../utils/exception";

/**
 * Only returns the data object from the service response
 * @param {(IHttpResponse | IClientResponse)} { data }
 */
export const retrieveResponseData = ({
  data,
}: IHttpResponse | IClientResponse) => data;

export const retrieveResponsePayload = ({ payload }: any) => payload;

/**
 * Validates the response JSON and send the data downstream
 * Throws an error if the response is not an object (object or array)
 * Throws an error if the response status is set to fail
 * @param {((...args: any[]) => Promise<IHttpResponse | IClientResponse>)} service
 */
export const requestService =
  (service: (...args: any[]) => Promise<IHttpResponse | IClientResponse>) =>
  async (...args: any[]) => {
    try {
      return await service(...args);
    } catch (error: any) {
      throw new Exception({ ...error });
    }
  };

// Creates an instante of the http client to communicate with the BE APIs
httpClient.configure(
  {
    env: process.env.NODE_ENV,
    baseUrl: String(window._env_.REACT_APP_API_BASE_URL),
    appMedia: "045.CCC",
  },
  RHSSOAuth
);

export default httpClient.httpClient;
