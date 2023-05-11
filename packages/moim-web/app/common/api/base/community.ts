import { getCommunityServiceAPIDomain } from "common/helpers/domainMaker";
import { CustomAxiosRequestConfig, MoimBaseAPI } from "./";

export class MoimCommunityAPI extends MoimBaseAPI {
  public async get(
    url: string,
    data?: any,
    config?: CustomAxiosRequestConfig & Record<string, any>,
  ) {
    return super.get(url, data, { ...config, ...this.getCommunityHeader() });
  }

  public async post(
    url: string,
    data?: any,
    config?: CustomAxiosRequestConfig,
  ) {
    return super.post(url, data, { ...config, ...this.getCommunityHeader() });
  }

  public async put(url: string, data?: any, config?: CustomAxiosRequestConfig) {
    return super.put(url, data, { ...config, ...this.getCommunityHeader() });
  }

  public async delete(
    url: string,
    data?: any,
    config?: CustomAxiosRequestConfig,
  ) {
    return super.delete(url, data, { ...config, ...this.getCommunityHeader() });
  }

  private getCommunityHeader = () => ({
    baseURL: getCommunityServiceAPIDomain(),
    headers: {
      "x-can-user-locale": window.navigator.language,
      "x-can-community-id": this.instance.groupId,
      "x-can-origin-community-id": this.instance.getCurrentHubGroupId(),
    },
  });
}
