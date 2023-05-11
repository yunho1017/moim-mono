import * as qs from "query-string";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import { getApiDomain, getOriginDomain } from "common/helpers/domainMaker";
import { getMoimAccessTokenToCookie } from "common/helpers/authentication";
import deepMerge from "common/helpers/merge/deepMerge";

import { MoimAPI } from "../..";
import { MoimURL } from "app/common/helpers/url";
import { CustomAxiosRequestConfig } from "..";

const defaultHeaders: Record<string, string> = {
  "Content-Type": "application/json",
};

const defaultOptions: CustomAxiosRequestConfig = {
  headers: defaultHeaders,
  timeout: 10000,
  withCredentials: false,
  skipTimeoutRetry: false,
};

export class MoimBaseAPI {
  private readonly axiosInstance: AxiosInstance;
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
      throw err;
    }
  }

  public async put(url: string, data?: any, config?: CustomAxiosRequestConfig) {
    try {
      return this.axiosInstance.put(url, data, this.getConfig(config));
    } catch (err) {
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
      throw err;
    }
  }

  public getCurrentGroupId() {
    return this.instance.getCurrentGroupId();
  }

  public getCurrentHubGroupId() {
    return this.instance.getCurrentHubGroupId();
  }
}
