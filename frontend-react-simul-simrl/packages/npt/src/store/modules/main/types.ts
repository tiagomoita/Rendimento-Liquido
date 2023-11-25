export interface SharedState {
  loading: boolean;
  exception: boolean;
  myExampleProperty: any;
  alerts: any;
}

enum ETypes {
  SLICE_NAME = "Main",
  THUNK_RETRIEVE_APPLICATION_DATA = "Main/retrieveApplicationData",
}

export default ETypes;
