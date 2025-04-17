/* eslint-disable max-len */
// Http Client
import RHSSOAuth from "../../../../RHSSOAuth";
import httpClient from "../../../../http-client";

// Enums
import EServiceUrls from "../../../../../enums/service-urls";
import { simulateInterface, simulateReceiptsInterface } from "./interfaces";
import { getQueryParams } from "../../../../../utils/utils";

let token: string | undefined = "";
if (window.location.href.includes("localhost")) {
  token =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlNDOWZwOGZZa2RIcXBBb1plQnJuOUUyT2lFMlE4SXVBZ2hVb29rYXVDWVUifQ.eyJqdGkiOiI0ZTdjZTk4Ny0yYTUyLTQwNGEtODI1NC1mMWNjMWM0MDI2NWUiLCJleHAiOjE4MTcxMjU4MDQsIm5iZiI6MCwiaWF0IjoxNjE3MTE4NjA0LCJpc3MiOiJodHRwczovL3Joc3NvcG9jLXJoc3NvLXBvYy5hcHBzLmJkc28ubG9jYWwvYXV0aC9yZWFsbXMvSW50ZXJuYWwiLCJhdWQiOiJzaW11bC1sZWFzaW5nIiwic3ViIjoiOTZlOWEzMDYtODdkMy00YjA1LTljYTktMzVhODlkMTA2MTkwIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoic2ltdWwtbGVhc2luZyIsImF1dGhfdGltZSI6MCwic2Vzc2lvbl9zdGF0ZSI6IjA2YWQ4NDIyLTRhYTctNGM5Mi1hNDViLWQ1MjU4ZTUyOTBhOSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsib3V0c3BsdC1mdGVkLmJkc28ubG9jYWwiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsib3JpZ2luYWRvci1kZS1saW1pdGVzIjp7InJvbGVzIjpbIlAxIiwiU1RGX0lBRCIsIklBRF9FRElUIiwiU1RGX0JBU0UiLCJTVEZfT0wiLCJPTF9CQVNFIiwiU1RGX1AxIiwiT0xfQURNSU4iLCJTVEZfR0wiLCJTVEZfU0lNVUxBIiwiT0FDX0JBU0UiXX0sImJ1c2luZXNzLWxvZ3MiOnsicm9sZXMiOlsiQkxfQkFTRSJdfSwic2ltdWwtbGVhc2luZyI6eyJyb2xlcyI6WyJVU0VSIiwiUFNfUkwiLCJQU19MRUFTSU5HIl19fSwicmVhbG1pZCI6IkludGVybmFsIiwibmFtZSI6Ikdlc3RvciBIdWdvIiwiZ2l2ZW5fbmFtZSI6Ikdlc3RvciIsIm9wZXJhdG9yaWQiOiJQMDc0MTIiLCJmYW1pbHlfbmFtZSI6Ikh1Z28iLCJlbWFpbCI6InAwNzQxMkBub3ZvYmFuY28ucHQiLCJ1c2VybmFtZSI6IlAwNzQxMiJ9.HQPwWQ91QD4Hs5OQq1II9rt27Osw6YBABrcfm8Y-nCjV1eNX89BeaDHXuygO_ahekWNYGcEY4-2g91T3v2vde44f8qcjDC5np-Mejij8gxavznPewUmUEmcDn_9uwq3lVMcPi-meb-oRhowOwUCFVQyOlRYXOw90njK7cnLa5JFGZXeCpzvj_vhxll-Ub4W7Gx07J0AIk6BF5dJvazRgQ1GNwpNZcmKpSBCqW3YGdHvnEOV7PVnkvFCXqskpJOrvJgY-eJIBOzCo_gjCWUR8MsYRAa5VfXEuVwJJxdFOEoSEgVC8LVwSzs4bKrqCr-Ilx3GvUd5VQuLt6cBMSUl4Zg";
} else {
  token = RHSSOAuth.getToken();
}

export const retrieveCreateContext = async ([options]: [any]) => {
  const { simulationId, numberOfHolders, Entity } = getQueryParams();
  return httpClient.POST(EServiceUrls.RETRIEVE_CREATE_CONTEXT, {
    headers: {
      Authorization: `Bearer ${token}`,
      "x-idempotency-key": "123",
      CodigoBanco: Entity,
      ...options.context,
    },
    body: {
      payload: {
        simulationId: simulationId === "" ? null : simulationId,
        numberOfHolders,
      },
    },
  });
};

export const retrieveGetContext = async ([params]: [any]) => {
  return httpClient.GET(EServiceUrls.RETRIEVE_GET_CONTEXT, {
    headers: {
      Authorization: `Bearer ${token}`,
      "x-idempotency-key": "123",
    },
    params,
  });
};

export const retrieveGetContextWF = async ([params]: [any]) => {
  return httpClient.GET(EServiceUrls.RETRIEVE_GET_CONTEXT_WF, {
    headers: {
      Authorization: `Bearer ${token}`,
      "x-idempotency-key": "123",
    },
    params,
  });
};

export const retrieveGetSimulationId = async () => {
  return httpClient.GET(EServiceUrls.RETRIEVE_GET_SIMULATION_ID, {
    headers: {
      Authorization: `Bearer ${token}`,
      "x-idempotency-key": "123",
    },
  });
};

export const retrieveSimulate = async ([options]: [simulateInterface]) => {
  const { simulationId, referenceWF, holderName, holderNif, holder } = options;
  return httpClient.POST(EServiceUrls.RETRIEVE_SIMULATE, {
    headers: {
      Authorization: `Bearer ${token}`,
      "x-idempotency-key": "123",
    },
    body: {
      payload: {
        simulationId,
        referenceWF,
        holder,
        holderName,
        holderNif,
        ...options.body,
      },
    },
  });
};

export const retrieveFindBySimulationIdAndHolder = async ([params]: [any]) => {
  return httpClient.GET(
    EServiceUrls.RETRIEVE_FIND_BY_SIMULATION_ID_AND_HOLDER,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "x-idempotency-key": "123",
      },
      params,
    }
  );
};

export const retrieveSimulateReceipts = async ([options]: [
  simulateReceiptsInterface
]) => {
  const {
    simulationId,
    referenceWF,
    holder,
    holderName,
    holderNif,
    mostRepresentativeCheckBok,
  } = options;
  return httpClient.POST(EServiceUrls.RETRIEVE_SIMULATE_RECEIPTS, {
    headers: {
      Authorization: `Bearer ${token}`,
      "x-idempotency-key": "123",
    },
    body: {
      payload: {
        simulationId,
        referenceWF,
        holder,
        holderName,
        holderNif,
        mostRepresentativeCheckBok,
        ...options.body,
      },
    },
  });
};

export const retrievefindBySimulationIdAndHolderReceipts = async ([params]: [
  any
]) => {
  return httpClient.GET(
    EServiceUrls.RETRIEVE_FIND_BY_SIMULATION_ID_AND_HOLDER_RECEIPTS,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "x-idempotency-key": "123",
      },
      params,
    }
  );
};

export const retrieveSimulationResults = async ([options]: [any]) => {
  const { toView } = options;
  const { simulationId } = getQueryParams();
  return httpClient.POST(EServiceUrls.RETRIEVE_SIMULATION_RESULTS, {
    headers: {
      Authorization: `Bearer ${token}`,
      "x-idempotency-key": "123",
    },
    body: {
      payload: {
        simulationId,
        toView,
      },
    },
  });
};

export const retrieveGetTaxes = async () => {
  const { Entity } = getQueryParams();
  return httpClient.GET(`${EServiceUrls.RETRIEVE_GET_TAXES}/${Entity}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "x-idempotency-key": "123",
    },
  });
};

export const retrieveGetDocument = async ([params]: [any]) => {
  return httpClient.GET(EServiceUrls.RETRIEVE_GET_DOCUMENT, {
    headers: {
      Authorization: `Bearer ${token}`,
      "x-idempotency-key": "123",
    },
    params,
  });
};
