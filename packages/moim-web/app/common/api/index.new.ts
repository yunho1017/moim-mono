import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from "axios";
import { Severity } from "@sentry/types";
import { push } from "connected-react-router";
import * as qs from "query-string";
import { logException } from "../helpers/errorLogger";
import ErrorRequestManager from "./errorRequestManager";
import { setTaskManagerInAxios } from "common/helpers/tokenRefreshManager";
import { AppDispatch } from "app/store";
import { GROUP_ID, HUB_GROUP_ID } from "common/constants/keys";
import { ActionCreators as SnackBarActionCreators } from "app/actions/snackbar";
import { MoimURL } from "app/common/helpers/url";
import { isTest } from "common/helpers/envChecker";
import { ERROR_CODE } from "common/constants/axios";
import { getApiDomain, getOriginDomain } from "common/helpers/domainMaker";
import * as ExpiredInMemoryHelper from "common/helpers/expiredInMemoryHelper";
import deepMerge from "common/helpers/merge/deepMerge";
import { getMoimAccessTokenToCookie } from "common/helpers/authentication";

export function getInMemoryCurrentGroupId() {
  if (isTest()) {
    return "testGId";
  }

  let groupId = ExpiredInMemoryHelper.get<Moim.Id>(GROUP_ID);

  if (MoimURL.ExternalMoimBlockitEditor.isSameExact(location.pathname)) {
    const queryParams = qs.parse(location.search);
    groupId = queryParams.groupId as string;
  }
  if (!groupId) throw new Error("Group Id isn't prepared.");
  return groupId;
}

export function getInMemoryCurrentHubGroupId() {
  if (isTest()) {
    return "testHubGId";
  }
  let groupId = ExpiredInMemoryHelper.get<Moim.Id>(HUB_GROUP_ID);

  if (MoimURL.ExternalMoimBlockitEditor.isSameExact(location.pathname)) {
    const queryParams = qs.parse(location.search);
    groupId = queryParams.hubGroupId as string;
  }

  if (!groupId) throw new Error("Hub Group Id isn't prepared.");
  return groupId;
}
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
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

export class MoimAPI {
  public groupId: string | null | undefined;

  private readonly axiosInstance: AxiosInstance;
  private errorRequestManager: ErrorRequestManager;
  private config: CustomAxiosRequestConfig = defaultOptions;

  protected getEndpoint() {
    return getApiDomain();
  }
  protected getDefaultHeaders() {
    const headers: any = { "x-moim-origin": getOriginDomain() };
    if (this.groupId) {
      headers["x-moim-group-id"] = this.groupId;
    }
  }
  public constructor(dispatch?: AppDispatch, groupId?: string | null) {
    const headers: any = { "x-moim-origin": getOriginDomain() };
    if (groupId) {
      headers["x-moim-group-id"] = groupId;
      this.groupId = groupId;
    }
    this.extendConfig({
      headers: this.getDefaultHeaders(),
      baseURL: this.getEndpoint(),
    });
    this.axiosInstance = axios.create();
    this.errorRequestManager = new ErrorRequestManager();

    this.setInterceptor(dispatch);
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
    if (this.groupId) {
      return this.groupId;
    }
    return getInMemoryCurrentGroupId();
  }

  public getCurrentHubGroupId() {
    return getInMemoryCurrentHubGroupId();
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
