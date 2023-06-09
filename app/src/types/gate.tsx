export const operators = ["==", "!=", ">", ">=", "<", "<="] as const;

export type Operator = (typeof operators)[number];

export const periods = ["hour", "day", "week", "month", "year"] as const;

export type Period = (typeof periods)[number];

export interface EventArgument {
  /**
   * The name of the argument in the event (e.g. "amount" for event "Transfer(address from, address to, uint amount)")
   */
  argumentName: string;
  /**
   * The index of the argument if it is indexed (e.g. 0 for "address from" for event "Transfer(address from, address to, uint amount)")
   */
  indexed?: number;
}

export interface Comparison {
  operator: Operator;
  value: number | string;
}

export interface Criteria {
  /**
   * The argument to get values from
   */
  argument: EventArgument;
  /**
   *
   */
  /**
   * The comparison to make against the sum of argument values
   */
  comparison: Comparison;
}
export interface Gate {
  /**
   * The address of the contract to check logs for
   */
  contractAddress: string;
  /**
   * Optional name to identify gate
   */
  gateName?: string;
  /**
   * The chain ID of the network to check logs for
   */
  chainId: number;
  /**
   * The configuration for the gate based on the gate type
   * Currently only supports "EVENTS_EMITTED"
   */
  gateConfiguration:
    | EventsEmittedGateConfiguration
    | ReadContractInfoGateConfiguration;
  /**
   * The type of gate (e.g. "EVENTS_EMITTED")
   */
  gateType: GateType;
}

export interface EventsEmittedGateConfiguration {
  /**
   * Events to check for
   */
  event: string;

  /**
   * Where the address is passed in as an argument to the event
   */
  addressArgument: EventArgument;

  /**
   * List of criteria to check against
   */
  criteria?: Criteria[];

  /**
   * Number of periods to evaluate
   */
  evaluationPeriod: number;
  /**
   * Unit for periods (e.g. "year", "month", "day")
   */
  period: Period;
  /**
   * The number of matching events required to pass the gate
   */
  requiredCount: number;
}

export interface ReadContractInfoGateConfiguration {
  /**
   * Method to call
   */
  method: string;
  /**
   * Comparison to make against the result of the method call, for now
   * only supports a single comparison
   */
  comparison: Comparison;
  /**
   * If provided, get the value associated with this key from
   * the result of the method call
   */
  resultKey?: string;
}

export enum GateType {
  /**
   * Check if there are events emitted from a contract that pertain
   * to the address being evaluated (e.g. there are > 50 transfers
   * to/from the address)
   */
  EVENTS_EMITTED = "EVENTS_EMITTED",
  /**
   * Check that the results from calling a read-only contract method
   * for the address being evaluated match criteria (e.g. total staked
   * by address > 50)
   */
  READ_CONTRACT_INFO = "READ_CONTRACT_INFO",
}
