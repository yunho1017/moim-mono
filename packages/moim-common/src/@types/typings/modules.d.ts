// Remove when https://github.com/reduxjs/redux-thunk/pull/224 is released.
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
declare module "redux" {
  function bindActionCreators<M extends ActionCreatorsMapObject<any>>(
    actionCreators: M,
    dispatch: Dispatch,
  ): {
    [N in keyof M]: ReturnType<M[N]> extends ThunkAction<any, any, any, any>
      ? (...args: Parameters<M[N]>) => ReturnType<ReturnType<M[N]>>
      : M[N];
  };
}

declare module "axios" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface

  interface AxiosError<T = { error: Moim.IErrorResponse }> extends Error {
    config: AxiosRequestConfig;
    code?: string;
    request?: any;
    response?: AxiosResponse<T>;
    isAxiosError: boolean;
    toJSON: () => object;
  }

  interface AxiosStatic extends AxiosInstance {
    create(config?: AxiosRequestConfig): AxiosInstance;
    Cancel: CancelStatic;
    CancelToken: CancelTokenStatic;
    isCancel(value: any): boolean;
    all<T>(values: (T | Promise<T>)[]): Promise<T[]>;
    spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R;
    isAxiosError(
      payload: any,
    ): payload is AxiosError<{ error: Moim.IErrorResponse }>;
  }
}
