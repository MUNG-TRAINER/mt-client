import {UserRoleType} from "../common/commonType";

export interface ILoginDataType {
  userName: string;
  password: string;
}

export interface ICheckLoggedInType {
  userId: number;
  role: UserRoleType;
  username: string;
}
