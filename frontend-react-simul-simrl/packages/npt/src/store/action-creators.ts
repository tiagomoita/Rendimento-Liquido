import EOperationStatus from "../enums/operation-status";

/**
 *  Creates a Simple Action
 *  Given a type and a payload (optional)
 * @param {string} type
 * @param {*} [payload={}]
 * @param {*} [metadata={}]
 */
export const createSimpleAction = (
  type: string,
  payload: any = {},
  metadata: any = {}
) => ({
  type,
  payload,
  metadata,
});

export const createTypedAction = <T>(type: string, payload?: T) => ({
  type,
  payload,
});

/**
 *  Creates a routine based on the given type
 *  Creates 4 actions:
 *  a request to notify the request has been sent,
 *  a success, when the request is successfull
 *  a failure, when the request fails
 *  a finalize, when the request finishes regardless of the operation status
 * @param {string} type
 */
export const createActionRoutine = (type: string) => ({
  type,
  REQUEST: `${type}_REQUEST`,
  SUCCESS: `${type}_SUCCESS`,
  FAILURE: `${type}_FAILURE`,
  FINALIZE: `${type}_FINALIZE`,
  request: (payload: any = {}) =>
    createSimpleAction(`${type}_REQUEST`, payload, {
      type,
      status: EOperationStatus.REQUEST,
    }),
  success: (payload: any = {}) =>
    createSimpleAction(`${type}_SUCCESS`, payload, {
      type,
      status: EOperationStatus.SUCCESS,
    }),
  failure: (payload: any = {}) =>
    createSimpleAction(`${type}_FAILURE`, payload, {
      type,
      status: EOperationStatus.FAILURE,
    }),
  finalize: (payload: any = {}) =>
    createSimpleAction(`${type}_FINALIZE`, payload),
});
