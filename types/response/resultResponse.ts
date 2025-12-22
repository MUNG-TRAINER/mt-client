export interface IResultResponse {
  status: string;
  code: number;
  message: string;
  timestamp?: string;
}

export interface IResultResponseData<T> {
  data: T;
}
