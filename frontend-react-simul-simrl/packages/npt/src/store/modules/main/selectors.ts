import { createSelector } from "@reduxjs/toolkit";

// Store Type
import { RootState } from "../..";

// Types
import ETypes from "./types";

/**
 * Returns the self redux slice
 * @param {RootState} { [ETypes.SLICE_NAME]: Slice }
 */
const selectSelf = ({ [ETypes.SLICE_NAME]: Slice }: RootState) => Slice;

/* Retrieves the root Loading status */
export const isLoading = createSelector(selectSelf, ({ loading }) => loading);

/* Retrieves the exception status */
export const hasException = createSelector(
  selectSelf,
  ({ exception }) => exception
);

export const retrieveAlerts = createSelector(
  selectSelf,
  (state) => state.alerts
);
