export type Operator = "==" | "!=" | ">" | ">=" | "<" | "<=";

export type Period = "hour" | "day" | "week" | "month" | "year";

export interface Criteria {
  event: string;
  operator: Operator;
  evaluationPeriod: number;
  period: Period;
  threshold: number;
}
export interface Gate {
  contractAddress: string;
  gateName?: string;
  chainId: number;
  criteria: Criteria[];
}
