import {HTMLAttributes, ReactNode} from "react";

export interface IAuthInputType {
  labelTxt: string;
  id: string;
  name: string;
  placeholder: string;
  classNames: string;
  headIcon: ReactNode;
  tailIcon?: ReactNode;
  stateTrueTailIcon?: ReactNode;
  fnState: boolean;
  fn?: () => void;
  props?: HTMLAttributes<HTMLInputElement>;
}
