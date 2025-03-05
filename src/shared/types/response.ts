export interface Response<T> {
  isSuccess: boolean;
  data: T;
  error: null | {
    code: number;
    message: string;
  };
}
