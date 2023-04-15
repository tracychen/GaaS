export type Operator = "==" | "!=" | ">" | ">=" | "<" | "<=";

export type Period = "hour" | "day" | "week" | "month" | "year";

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
   * Number of periods to evaluate
   */
  evaluationPeriod: number;
  /**
   * Unit for periods (e.g. "year", "month", "day")
   */
  period: Period;
  /**
   * The configuration for the gate based on the gate type
   * Currently only supports "CONTRACT_INTERACTION"
   */
  gateConfiguration: ContractInteractionGateConfiguration;
  /**
   * The type of gate (e.g. "CONTRACT_INTERACTION")
   */
  gateType: GateType;
}

export interface ContractInteractionGateConfiguration {
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
  criteria: Criteria[];

  /**
   * The number of interactions required to pass the gate
   */
  requiredInteractions: number;
}

export enum GateType {
  CONTRACT_INTERACTION = "CONTRACT_INTERACTION",
}
