export interface IFirebaseMsgTypes {
  userId: number;
  title: string;
  desc: string;
  url: string;
}
export interface IFirebaseSendMsgTypes extends IFirebaseMsgTypes {
  msgBody: string;
  token: string;
}
export interface IFirebaseSendMsgHookTypes extends IFirebaseMsgTypes {
  msgBody: string;
}
