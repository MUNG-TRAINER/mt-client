import {HTMLAttributes, ReactNode} from "react";

export interface IRoundBorderBoxBtnProps
  extends HTMLAttributes<HTMLButtonElement> {
  txt: string;
  icon: ReactNode;
  fnState?: () => void;
}
export interface IRoundBoxColorBtnProps
  extends HTMLAttributes<HTMLButtonElement> {
  txt: string;
  btnColor?: string;
  btnTxtColor?: string;
  btnIcon?: ReactNode;
  states?: boolean;
  fnState?: () => void;
}
