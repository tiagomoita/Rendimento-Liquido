/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk } from "@reduxjs/toolkit";

// Enums
import ETypes from "./types";

// Services

export const retrieveApplicationData = createAsyncThunk(
  ETypes.THUNK_RETRIEVE_APPLICATION_DATA,
  (_, { dispatch }) => {}
);
