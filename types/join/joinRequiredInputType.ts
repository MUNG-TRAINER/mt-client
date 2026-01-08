import {joinTrainerSchema, joinUserSchema} from "@/schemas/joinSchema";
import {IFormResultType} from "../formResultType";
import {Dispatch, SetStateAction} from "react";

export type IJoinRequiredInputStateProps = {
  state:
    | IFormResultType<typeof joinTrainerSchema>
    | IFormResultType<typeof joinUserSchema>;
  checkUserName: boolean;
  checkEmail: boolean;
  togglePwd: boolean;
  toggleCheckPwd: boolean;
  isTrainer: boolean;
};
export type IJoinRequiredInputFnProps = {
  handleCheckUserName: () => Promise<void>;
  handleCheckEmail: () => Promise<void>;
  setTogglePwd: Dispatch<SetStateAction<boolean>>;
  setToggleCheckPwd: Dispatch<SetStateAction<boolean>>;
};
export interface IJoinRequiredInputProps
  extends IJoinRequiredInputStateProps, IJoinRequiredInputFnProps {}
export type TErrorStates =
  | "userName"
  | "email"
  | "phone"
  | "password"
  | "passwordCheck"
  | "name"
  | "birth"
  | "registCode"
  | null;
