import React from "react";
import axios, { AxiosInstance } from "axios";
import AgentKeepAlive from "agentkeepalive";
import { getApiDomain, getOriginDomain } from "common/helpers/domainMaker";
import { getInMemoryCurrentHubGroupId } from "common/api";
import { isHubDomain } from "common/helpers/envChecker";
import { getMoimAccessTokenToCookie } from "./authentication";

const getToken = () => {
  if (isHubDomain()) {
    return getMoimAccessTokenToCookie("hub");
  }
  return getMoimAccessTokenToCookie(getInMemoryCurrentHubGroupId());
};

const useKeepAliveAxiosInstance = () => {
  const refInstance = React.useRef<AxiosInstance | undefined>(undefined);
  const getInstance = React.useCallback(() => {
    if (!refInstance.current) {
      refInstance.current = axios.create({
        baseURL: getApiDomain(),
        headers: {
          "x-moim-origin": getOriginDomain(),
          Authorization: `Bearer ${getToken()}`,
        },
        httpAgent: new AgentKeepAlive(),
        httpsAgent: new AgentKeepAlive(),
      });
    }

    return refInstance.current;
  }, []);

  return getInstance;
};

export default useKeepAliveAxiosInstance;
