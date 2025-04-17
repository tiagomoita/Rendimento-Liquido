// Utils
import { asyncCompose } from "../../../../../utils/utils";

// Http Client
import {
  requestService,
  retrieveResponsePayload,
} from "../../../../http-client";

// Models
import {
  retrieveCreateContextModel,
  retrieveGetContextModel,
  retrievefindBySimulationIdAndHolderModel,
  retrieveGetSimulationIdModel,
  retrieveSimulateModel,
  retrieveSimulateReceiptsModel,
  retrievefindBySimulationIdAndHolderReceiptsModel,
  retrieveSimulationResultsModel,
  retrieveGetTaxesModel,
  retrieveGetDocumentModel,
  retrieveGetContextWFModel,
} from "./models";

// Requests
import {
  retrieveCreateContext,
  retrieveGetContext,
  retrieveGetSimulationId,
  retrieveSimulate,
  retrieveFindBySimulationIdAndHolder,
  retrieveSimulateReceipts,
  retrievefindBySimulationIdAndHolderReceipts,
  retrieveSimulationResults,
  retrieveGetTaxes,
  retrieveGetDocument,
  retrieveGetContextWF,
} from "./requests";

export const retrieveCreateContextService = asyncCompose(
  retrieveCreateContextModel,
  retrieveResponsePayload,
  requestService(retrieveCreateContext)
);

export const retrieveGetContextService = asyncCompose(
  retrieveGetContextModel,
  retrieveResponsePayload,
  requestService(retrieveGetContext)
);

export const retrieveGetContextWFService = asyncCompose(
  retrieveGetContextWFModel,
  retrieveResponsePayload,
  requestService(retrieveGetContextWF)
);

export const retrieveGetSimulationIdService = asyncCompose(
  retrieveGetSimulationIdModel,
  retrieveResponsePayload,
  requestService(retrieveGetSimulationId)
);

export const retrieveSimulateService = asyncCompose(
  retrieveSimulateModel,
  retrieveResponsePayload,
  requestService(retrieveSimulate)
);

export const retrievefindBySimulationIdAndHolderService = asyncCompose(
  retrievefindBySimulationIdAndHolderModel,
  retrieveResponsePayload,
  requestService(retrieveFindBySimulationIdAndHolder)
);

export const retrieveSimulateReceiptsService = asyncCompose(
  retrieveSimulateReceiptsModel,
  retrieveResponsePayload,
  requestService(retrieveSimulateReceipts)
);

export const retrievefindBySimulationIdAndHolderReceiptsService = asyncCompose(
  retrievefindBySimulationIdAndHolderReceiptsModel,
  retrieveResponsePayload,
  requestService(retrievefindBySimulationIdAndHolderReceipts)
);

export const retrieveSimulationResultsService = asyncCompose(
  retrieveSimulationResultsModel,
  retrieveResponsePayload,
  requestService(retrieveSimulationResults)
);

export const retrieveGetTaxesService = asyncCompose(
  retrieveGetTaxesModel,
  retrieveResponsePayload,
  requestService(retrieveGetTaxes)
);

export const retrieveGetDocumentService = asyncCompose(
  retrieveGetDocumentModel,
  retrieveResponsePayload,
  requestService(retrieveGetDocument)
);
