export interface IResultResponse {
  status: string;
  code: number;
  message: string;
}

export interface IResultResponseData<T> {
  data: T;
}
