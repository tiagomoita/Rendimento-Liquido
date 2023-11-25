import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../..";

// Types
import ETypes, { holder, holderData, ReceiptsData, Taxes } from "./types";

/**
 * Returns the self redux slice
 * @param {RootState} { [ETypes.SLICE_NAME]: Slice }
 */
const selectSelf = ({ [ETypes.SLICE_NAME]: Slice }: RootState) => Slice;

export const retrieveState = createSelector(selectSelf, (state) => state);

export const retrieveSimulationId = createSelector(
  selectSelf,
  (state) => state.SimulationId
);

export const retrieveContext = createSelector(
  selectSelf,
  (state) => state.context
);

export const retrieveNumberOfHolders = createSelector(
  selectSelf,
  (state) => state.Holders
);

export const retrieveCurrentHolder = createSelector(
  selectSelf,
  (state) => state.currentHolder
);

export const retrieveCurrentTypeOfIncome = createSelector(
  selectSelf,
  (state) => state.currentTypeOfIncome
);

export const retrieveCleanHolder = createSelector(
  selectSelf,
  (state) => state.cleanHolder
);

export const retrieveArrayHolders = createSelector(
  selectSelf,
  (state) => state.arrayHolders
);

export const retrieveName = createSelector(selectSelf, (state: any): string => {
  const data = state.arrayHolders.find(
    (e: holder) => e.holderNumber === state.currentHolder
  );
  return data?.Name!;
});

export const retrieveNIF = createSelector(selectSelf, (state: any): string => {
  const data = state.arrayHolders.find(
    (e: holder) => e.holderNumber === state.currentHolder
  );
  return data?.Nif!;
});

export const retrieveIrsOrReceipts = createSelector(
  selectSelf,
  (state: any): boolean | null => {
    const data = state.arrayHolders.find(
      (e: holder) => e.holderNumber === state.currentHolder
    );
    return data?.irsOrReceipts!;
  }
);

export const retrieveIRSTotal = createSelector(
  selectSelf,
  (state: any): number => {
    const data = state.arrayHolders.find(
      (e: holder) => e.holderNumber === state.currentHolder
    );
    return data?.IRSTotal!;
  }
);

export const retrieveReceiptsTotal = createSelector(
  selectSelf,
  (state: any): number => {
    const data = state.arrayHolders.find(
      (e: holder) => e.holderNumber === state.currentHolder
    );
    return data?.ReceiptsTotal!;
  }
);

export const retrieveIRSData = createSelector(
  selectSelf,
  (state: any): holderData => {
    const data = state.arrayHolders.find(
      (e: holder) => e.holderNumber === state.currentHolder
    );
    return data?.IRSData!;
  }
);

export const retrieveIRSDataByHolder = (tabHolder: number) =>
  createSelector(selectSelf, (state: any): holderData => {
    const data = state.arrayHolders.find(
      (e: holder) => e.holderNumber === tabHolder
    );
    return data?.IRSData!;
  });

export const retrieveReceiptsData = createSelector(
  selectSelf,
  (state: any): ReceiptsData => {
    const data = state.arrayHolders.find(
      (e: holder) => e.holderNumber === state.currentHolder
    );
    return data?.ReceiptsData!;
  }
);

export const retrieveReceiptsDataByHolder = (tabHolder: number) =>
  createSelector(selectSelf, (state: any): ReceiptsData => {
    const data = state.arrayHolders.find(
      (e: holder) => e.holderNumber === tabHolder
    );
    return data?.ReceiptsData!;
  });

export const retrieveTaxes = createSelector(selectSelf, (state): Taxes => {
  return state?.taxes!;
});

export const retrieveAggregator = createSelector(selectSelf, (state): any => {
  return state?.aggregator!;
});
