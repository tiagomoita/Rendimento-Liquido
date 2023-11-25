import { holderData, ReceiptsData } from "../types";

interface simulateInterface {
  referenceWF?: string;
  simulationId: string;
  holder: number;
  holderName?: string;
  holderNif?: string;
  body: holderData;
}

interface simulateReceiptsInterface {
  referenceWF?: string;
  simulationId: string;
  holder: number;
  holderName?: string;
  holderNif?: string;
  mostRepresentativeCheckBok?: boolean | null;
  body: ReceiptsData;
}

interface findBySimulationIdAndHolderInterface {
  simulationId?: string;
  holder?: string;
}

export type {
  simulateInterface,
  findBySimulationIdAndHolderInterface,
  simulateReceiptsInterface,
};
