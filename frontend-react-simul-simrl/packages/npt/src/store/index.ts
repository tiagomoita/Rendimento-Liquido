import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

// All Application Reducers
import modules from "./modules";

// Only enable the redux extension plugin for development
const { NODE_ENV } = process.env;
const isDevelopment = NODE_ENV === "development";

// Returns the store configured with the provided settings
const store = configureStore({
  reducer: combineReducers({ ...modules }),
  devTools: isDevelopment,
});

// Redux Store Type
export type RootState = ReturnType<typeof store.getState>;

export default store;
