export type ApiResponse<T> = {
  code: number;
  message?: string;
  data: T;
};

export type ApiErrorBody = {
  code: string;
  message: string;
};

export type ApiErrorResponse = ApiResponse<ApiErrorBody>;
