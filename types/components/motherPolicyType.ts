import {ReactNode} from "react";

export interface IMotherPolicyType {
  name: string;
  radioState: number;
  radioStateFn: (index: number) => void;
  policyState: boolean;
  policyStateFn: () => void;
  children: ReactNode;
}
