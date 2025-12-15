import {UserRoleType} from "../common/commonType";

export interface IMyPageTypes {
  userId?: number;
  userName: string;
  name: string;
  birth: string;
  email: string;
  phone: string;
  profileImage?: string;
  isPublic: boolean;
  role: UserRoleType;
  sido: string;
  sigungu: string;
  roadname: string;
  restAddress: string;
  postcode: string;
}
