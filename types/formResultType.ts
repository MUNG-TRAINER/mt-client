export interface ZodErrorTree<T> {
  errors: string[];
  properties?: Record<string, ZodErrorTree<T>>;
}

export interface IFormResultType<T> {
  errMsg: ZodErrorTree<T> | undefined;
  resMsg: string | undefined;
}
