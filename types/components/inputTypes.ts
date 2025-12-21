import { InputHTMLAttributes, ReactNode } from "react";
import { ZodErrorTree } from "../formResultType";
import { joinUserSchema, joinTrainerSchema } from "@/schemas/joinSchema";

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
  errMsg?:
    | ZodErrorTree<typeof joinUserSchema>["errors"]
    | ZodErrorTree<typeof joinTrainerSchema>["errors"]
    | undefined;
}

export interface IDogInputType extends InputHTMLAttributes<HTMLInputElement> {
  labelTxt: string;
  id: string;
  name: string;
  type: string;
  placeholder?: string;
  classNames?: string;
  headIcon?: ReactNode;
  tailIcon?: ReactNode;
  stateTrueTailIcon?: ReactNode;
  fnState?: boolean;
  fn?: () => void;
  errMsg?: string[];
  required?: boolean;
}
