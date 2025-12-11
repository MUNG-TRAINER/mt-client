import {InputHTMLAttributes, ReactNode} from "react";
import {ZodErrorTree} from "../formResultType";
import {joinSchema} from "@/schemas/joinSchema";

export interface IAuthInputType extends InputHTMLAttributes<HTMLInputElement> {
  labelTxt: string;
  id: string;
  name: string;
  type: string;
  placeholder: string;
  classNames?: string;
  headIcon: ReactNode;
  tailIcon?: ReactNode;
  stateTrueTailIcon?: ReactNode;
  fnState?: boolean;
  fn?: () => void;
  errMsg?: ZodErrorTree<typeof joinSchema>["errors"] | undefined;
}
