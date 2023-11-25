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
} from "./services";
import {
  retrieveContext,
  retrieveCurrentHolder,
  retrieveIRSData,
  retrieveIrsOrReceipts,
  retrieveName,
  retrieveNIF,
  retrieveReceiptsData,
  retrieveSimulationId,
} from "./selectors";
import { getQueryParams } from "../../../../utils/utils";

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

export const simulateThunk = createAsyncThunk(
  ETypes.THUNK_SIMULATE,
  async (options: any, { rejectWithValue, getState }) => {
    try {
      const state: any = getState();
      const simulationId: string = retrieveSimulationId(state);
      const holder: number = options?.holder || retrieveCurrentHolder(state);
      const holderName: string = options?.holderName || retrieveName(state);
      const holderNif: string = options?.holderNif || retrieveNIF(state);
      const body: holderData = options?.bodyIRS || retrieveIRSData(state);
      const response = await retrieveSimulateService({
        simulationId,
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
      const state: any = getState();
      const simulationId: string = retrieveSimulationId(state);
      const holder: number = options?.holder || retrieveCurrentHolder(state);
      const holderName: string = options?.holderName || retrieveName(state);
      const holderNif: string = options?.holderNif || retrieveNIF(state);
      const mostRepresentativeCheckBok: boolean | null =
        options?.mostRepresentativeCheckBok || retrieveIrsOrReceipts(state);
      const body: ReceiptsData =
        options?.bodyReceipts || retrieveReceiptsData(state);
      const response = await retrieveSimulateReceiptsService({
        simulationId,
        holder,
        holderName,
        holderNif,
        mostRepresentativeCheckBok,
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
