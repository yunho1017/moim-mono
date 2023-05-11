import * as qs from "query-string";
import { Severity } from "@sentry/types";
import { ActionCreators as SnackBarActionCreators } from "app/actions/snackbar";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { push } from "connected-react-router";

import { AppDispatch } from "app/store";
import { getApiDomain, getOriginDomain } from "common/helpers/domainMaker";
import { setTaskManagerInAxios } from "common/helpers/tokenRefreshManager";
import { getMoimAccessTokenToCookie } from "common/helpers/authentication";
import deepMerge from "common/helpers/merge/deepMerge";
import { logException } from "../../helpers/errorLogger";
import ErrorRequestManager from "../errorRequestManager";

import { MoimAPI } from "..";
import { ERROR_CODE } from "common/constants/axios";
import { MoimURL } from "app/common/helpers/url";

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipTimeoutRetry?: boolean;
  passthrough?: boolean;
  withoutToken?: boolean;
}

const errorLogger = (error: AxiosError) => {
  if (error.response) {
    if (error.response.status >= 400) {
      logException({ error, level: Severity.Info });
    } else if (error.response.status >= 500) {
      logException({ error, level: Severity.Error });
    }
  } else {
    logException({ error, level: Severity.Log });
  }
};

const defaultHeaders: Record<string, string> = {
  "Content-Type": "application/json",
};

const defaultOptions: CustomAxiosRequestConfig = {
  headers: defaultHeaders,
  timeout: 10000,
  withCredentials: false,
  skipTimeoutRetry: false,
};

const MAX_TIMEOUT_RETRY_COUNT = 3;

export class MoimBaseAPI {
  private readonly axiosInstance: AxiosInstance;
  private errorRequestManager: ErrorRequestManager;
  private config: CustomAxiosRequestConfig = defaultOptions;

  public constructor(protected instance: MoimAPI) {
    const headers: any = { "x-moim-origin": getOriginDomain() };
    if (instance.groupId) {
      headers["x-moim-group-id"] = instance.groupId;
    }
    this.extendConfig({
      headers,
      baseURL: getApiDomain(),
    });
    this.axiosInstance = axios.create();
    this.errorRequestManager = new ErrorRequestManager();
    this.setInterceptor(instance.dispatch);
  }

  public extendConfig(newConfig: AxiosRequestConfig) {
    this.config = deepMerge(this.config, newConfig);
  }

  public getConfig(
    overwriteConfig?: CustomAxiosRequestConfig,
    paramData?: any,
  ) {
    let config = this.config;
    let token = !overwriteConfig?.withoutToken
      ? getMoimAccessTokenToCookie(this.getCurrentHubGroupId())
      : null;
    if (MoimURL.ExternalMoimBlockitEditor.isSameExact(location.pathname)) {
      const queryParams = qs.parse(location.search);
      token = queryParams.moimToken as string;
    }
    if (token) {
      config = deepMerge(config, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return overwriteConfig || paramData
      ? deepMerge(config, {
          ...overwriteConfig,
          params: {
            ...overwriteConfig?.params,
            ...paramData,
          },
        })
      : config;
  }

  public async get(
    url: string,
    data?: any,
    config?: CustomAxiosRequestConfig & Record<string, any>,
  ) {
    try {
      return this.axiosInstance.get(
        url,
        this.getConfig(
          {
            paramsSerializer: iParams =>
              qs.stringify(iParams, { arrayFormat: "index" }),
            ...config,
          },
          data,
        ),
      );
    } catch (err) {
      errorLogger(err as any);
      throw err;
    }
  }

  public async post(
    url: string,
    data?: any,
    config?: CustomAxiosRequestConfig,
  ) {
    try {
      return this.axiosInstance.post(url, data, this.getConfig(config));
    } catch (err) {
      errorLogger(err as any);
      throw err;
    }
  }

  public async put(url: string, data?: any, config?: CustomAxiosRequestConfig) {
    try {
      return this.axiosInstance.put(url, data, this.getConfig(config));
    } catch (err) {
      errorLogger(err as any);
      throw err;
    }
  }

  public async delete(
    url: string,
    data?: any,
    config?: CustomAxiosRequestConfig,
  ) {
    try {
      return this.axiosInstance.delete(url, this.getConfig(config, data));
    } catch (err) {
      errorLogger(err as any);
      throw err;
    }
  }

  public getCurrentGroupId() {
    return this.instance.getCurrentGroupId();
  }

  public getCurrentHubGroupId() {
    return this.instance.getCurrentHubGroupId();
  }

  private setInterceptor(dispatch?: AppDispatch): void {
    setTaskManagerInAxios({
      instance: this.axiosInstance,
      dispatch,
    });

    if (dispatch) {
      this.axiosInstance.interceptors.response.use(
        res => {
          const errorCount = this.errorRequestManager.getErrorCount(
            res.config.url!,
            res.config.method!,
          );

          if (errorCount) {
            this.errorRequestManager.remove(
              res.config.url!,
              res.config.method!,
            );
          }

          return res;
        },
        async (error: AxiosError) => {
          if (!error.config) return Promise.reject(error);
          const {
            url,
            method,
            skipTimeoutRetry,
          } = error.config as CustomAxiosRequestConfig;
          const errorCount = this.errorRequestManager.getErrorCount(
            url!,
            method!,
          );

          const isOffline = !navigator.onLine;
          const isTimeOutError = error.code === ERROR_CODE.TIMEOUT;
          const isRetryTimeoutRequest =
            isTimeOutError && MAX_TIMEOUT_RETRY_COUNT > errorCount;
          const isEndMaxTimeoutRetry =
            isTimeOutError && MAX_TIMEOUT_RETRY_COUNT <= errorCount;

          if (isOffline || isRetryTimeoutRequest) {
            dispatch(
              SnackBarActionCreators.openSnackbar({
                text: "timeout Error ! check your network",
              }),
            );
          } else if (isEndMaxTimeoutRetry) {
            dispatch(
              push({
                pathname: new MoimURL.ServerError().toString(),
              }),
            );
          }

          if (isRetryTimeoutRequest && !skipTimeoutRetry) {
            this.errorRequestManager.add(url!, method!);
            return axios.request(error.config);
          }

          return Promise.reject(error);
        },
      );
    }
  }
}
