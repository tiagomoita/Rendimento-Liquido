enum EServiceUrls {
  RETRIEVE_CREATE_CONTEXT = "/api/net-income/simulationcontext/create",
  RETRIEVE_GET_CONTEXT = "/api/net-income/simulationcontext/getsimulationcontextbysimulationid",
  RETRIEVE_GET_SIMULATION_ID = "/api/net-income/simulationirs/getsimulationid",
  RETRIEVE_SIMULATE = "/api/net-income/simulationirs/simulate",
  RETRIEVE_FIND_BY_SIMULATION_ID_AND_HOLDER = "/api/net-income/simulationirs/getsimulationbysimulationid",
  RETRIEVE_SIMULATE_RECEIPTS = "/api/net-income/simulationrec/simulate",
  RETRIEVE_FIND_BY_SIMULATION_ID_AND_HOLDER_RECEIPTS = "/api/net-income/simulationrec/getsimulationbysimulationid",
  RETRIEVE_SIMULATION_RESULTS = "/api/net-income/simulationresults/simulate",
  RETRIEVE_GET_TAXES = "/api/net-income/bo/current-online-active-values",
  RETRIEVE_GET_DOCUMENT = "/api/net-income/simulationresults/getresultsdocument",
}

export default EServiceUrls;
