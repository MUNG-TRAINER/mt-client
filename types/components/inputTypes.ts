import {HTMLAttributes, ReactNode} from "react";

export interface IAuthInputType extends HTMLAttributes<HTMLInputElement> {
  labelTxt: string;
  id: string;
  name: string;
  placeholder: string;
  classNames?: string;
  headIcon: ReactNode;
  tailIcon?: ReactNode;
  stateTrueTailIcon?: ReactNode;
  fnState?: boolean;
  fn?: () => void;
}
