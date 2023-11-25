import { createSlice } from "@reduxjs/toolkit";

// Enums
import ETypes, { SharedState } from "./types";

// Thunks
import { retrieveApplicationData } from "./thunks";

const initialState: SharedState = {
  loading: false,
  exception: false,
  myExampleProperty: "",
  alerts: [],
};

const slice = createSlice({
  name: ETypes.SLICE_NAME,
  initialState,
  reducers: {
    setIsLoadingTrue(state: any) {
      return { ...state, loading: true };
    },
    setIsLoadingFalse(state: any) {
      return { ...state, loading: false };
    },
    addAlert(state: any, { payload }) {
      return { ...state, alerts: [payload, ...state.alerts] };
    },
    removeAlert(state: any, { payload }) {
      const updatedAlerts = state.alerts.filter(
        (e: any) => e.id !== payload.id
      );
      return { ...state, alerts: updatedAlerts };
    },
    resetAlert(state: any) {
      return { ...state, alerts: [] };
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(retrieveApplicationData.pending, (state) => ({
        ...state,
        loading: true,
        exception: false,
      }))
      .addCase(retrieveApplicationData.rejected, (state) => ({
        ...state,
        loading: false,
        exception: true,
      }))
      .addCase(retrieveApplicationData.fulfilled, (state) => ({
        ...state,
        loading: false,
        exception: false,
      })),
});

export const {
  setIsLoadingTrue,
  setIsLoadingFalse,
  addAlert,
  removeAlert,
  resetAlert,
} = slice.actions;

export default slice;
