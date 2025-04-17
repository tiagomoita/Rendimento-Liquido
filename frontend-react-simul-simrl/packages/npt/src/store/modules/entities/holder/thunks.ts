import { createAsyncThunk } from "@reduxjs/toolkit";

// Enums
import ETypes, { Context, holderData, ReceiptsData } from "./types";

// Services
import {
  retrieveCreateContextService,
  retrieveGetContextService,
  retrieveSimulateService,
  retrievefindBySimulationIdAndHolderService,
  retrieveSimulateReceiptsService,
  retrievefindBySimulationIdAndHolderReceiptsService,
  retrieveSimulationResultsService,
  retrieveGetTaxesService,
  retrieveGetDocumentService,
  retrieveGetContextWFService,
} from "./services";
import {
  retrieveContext,
  retrieveCurrentHolder,
  retrieveIRSData,
  retrieveIrsOrReceipts,
  retrieveReceiptsData,
  retrieveSimulationId,
} from "./selectors";
import {
  getQueryParams,
  mapMostRepresentativeCheckBokToValues,
} from "../../../../utils/utils";

export const createContextThunk = createAsyncThunk(
  ETypes.THUNK_CREATE_CONTEXT,
  async (_, { rejectWithValue, getState }) => {
    try {
      const state: any = getState();
      const context: Context = retrieveContext(state);
      const response = await retrieveCreateContextService({
        context,
      });
      return response;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const getContextThunk = createAsyncThunk(
  ETypes.THUNK_GET_CONTEXT,
  async (_, { rejectWithValue }) => {
    try {
      const { simulationId } = getQueryParams();
      const response = await retrieveGetContextService({
        simulationId,
      });
      return response;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const getContextWFThunk = createAsyncThunk(
  ETypes.THUNK_GET_CONTEXT_WF,
  async (_, { rejectWithValue }) => {
    try {
      const { referenceWF } = getQueryParams();
      const response = await retrieveGetContextWFService({
        referenceWF,
      });
      return response;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const simulateThunk = createAsyncThunk(
  ETypes.THUNK_SIMULATE,
  async (options: any, { rejectWithValue, getState }) => {
    try {
      const { referenceWF } = getQueryParams();
      const state: any = getState();
      const simulationId: string = retrieveSimulationId(state);
      const holder: number = options?.holder || retrieveCurrentHolder(state);
      const holderName: string = options?.holderName;
      const holderNif: string = options?.holderNif;
      const body: holderData = options?.bodyIRS || retrieveIRSData(state);
      const response = await retrieveSimulateService({
        simulationId,
        referenceWF,
        holder,
        holderName,
        holderNif,
        body,
      });
      return response;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const findBySimulationIdAndHolderThunk = createAsyncThunk(
  ETypes.THUNK_FIND_BY_SIMULATION_ID_AND_HOLDER,
  async (options: any, { rejectWithValue, getState }) => {
    try {
      const state: any = getState();
      const { simulationId } = getQueryParams();
      const holder: number = options?.index || retrieveCurrentHolder(state);
      const response = await retrievefindBySimulationIdAndHolderService({
        simulationId,
        holder,
      });
      return response;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const simulateReceiptsThunk = createAsyncThunk(
  ETypes.THUNK_SIMULATE_RECEIPTS,
  async (options: any, { rejectWithValue, getState }) => {
    try {
      const { referenceWF } = getQueryParams();
      const state: any = getState();
      const simulationId: string = retrieveSimulationId(state);
      const holder: number = options?.holder || retrieveCurrentHolder(state);
      const holderName: string = options?.holderName;
      const holderNif: string = options?.holderNif;
      const mostRepresentativeCheckBok: boolean | null =
        options?.mostRepresentativeCheckBok !== undefined
          ? options?.mostRepresentativeCheckBok
          : retrieveIrsOrReceipts(state);
      const body: ReceiptsData =
        options?.bodyReceipts || retrieveReceiptsData(state);
      const response = await retrieveSimulateReceiptsService({
        simulationId,
        referenceWF,
        holder,
        holderName,
        holderNif,
        mostRepresentativeCheckBok: mapMostRepresentativeCheckBokToValues(
          mostRepresentativeCheckBok
        ),
        body,
      });
      return response;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const findBySimulationIdAndHolderReceiptsThunk = createAsyncThunk(
  ETypes.THUNK_FIND_BY_SIMULATION_ID_AND_HOLDER_RECEIPTS,
  async (_, { rejectWithValue, getState }) => {
    try {
      const state: any = getState();
      const { simulationId } = getQueryParams();
      const holder: number = retrieveCurrentHolder(state);
      const response = await retrievefindBySimulationIdAndHolderReceiptsService(
        {
          simulationId,
          holder,
        }
      );
      return response;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const simulationResultsThunk = createAsyncThunk(
  ETypes.THUNK_SIMULATION_RESULTS,
  async (options: any, { rejectWithValue }) => {
    try {
      const response = await retrieveSimulationResultsService({
        toView: options.toView,
      });
      return response;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const getTaxesThunk = createAsyncThunk(
  ETypes.THUNK_GET_TAXES,
  async (_, { rejectWithValue }) => {
    try {
      const response = await retrieveGetTaxesService();
      return response;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);

export const getDocumentThunk = createAsyncThunk(
  ETypes.THUNK_GET_DOCUMENT,
  async (_, { rejectWithValue }) => {
    try {
      const { simulationId } = getQueryParams();
      const response = await retrieveGetDocumentService({
        simulationId,
      });
      return response;
    } catch (error) {
      throw rejectWithValue(error);
    }
  }
);
