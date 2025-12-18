import {UserRoleType} from "../common/commonType";

export interface ILoginDataType {
  userName: string;
  password: string;
}

export interface ILoginResponse {
  status: number;
  code: string;
  message: string;
}

export interface ICheckLoggedInType {
  userId: number;
  role: UserRoleType;
  username: string;
}

export interface IFailedCheckLoggedInType {
  code: string;
  message: string;
}
