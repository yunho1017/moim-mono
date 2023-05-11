import { signOut } from "app/actions/app";

import { AppDispatch, ThunkPromiseResult } from "app/store";
import axios, { AxiosError, AxiosInstance } from "axios";

import { TokenRefreshTaskManager } from "./taskManager";
import { getIsExpiredToken, refreshAccessToken } from "./helpers";
import {
  getInMemoryCurrentGroupId,
  getInMemoryCurrentHubGroupId,
} from "common/api";

export function setTaskManagerInAxios({
  instance,
  dispatch,
}: {
  instance: AxiosInstance;
  dispatch?: AppDispatch;
}) {
  instance.interceptors.request.use(async req => {
    const token = req.headers.Authorization;

    try {
      if (token) {
        const isExpired = getIsExpiredToken(token);

        if (isExpired) {
          const taskManager = TokenRefreshTaskManager.getInstance();

          const promise = new Promise(resolve => {
            taskManager.pushTask(accessToken => {
              if (accessToken) {
                resolve(accessToken);
              }

              resolve(undefined);
            });
          });

          refreshToken(dispatch);

          const token = await promise;
          if (token) {
            req.headers.Authorization = `Bearer ${token}`;
          } else {
            delete req.headers.Authorization;
          }
        }
      }
    } catch (_error) {
      console.log("ERROR!!!", _error);
    }
    return req;
  });
  instance.interceptors.response.use(undefined, async (error: AxiosError) => {
    const { config, response } = error;

    if (response && response.status === 401 && config.headers.Authorization) {
      const taskManager = TokenRefreshTaskManager.getInstance();
      const originalRequest = config;

      const promise = new Promise((resolve, reject) => {
        taskManager.pushTask(accessToken => {
          if (accessToken) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            resolve(axios(originalRequest));
          }

          reject(error);
        });
      });
      refreshToken(dispatch);

      return promise;
    }

    return Promise.reject(error);
  });
}

async function refreshToken(dispatch?: AppDispatch) {
  const taskManager = TokenRefreshTaskManager.getInstance();
  try {
    if (!taskManager.getIsRefreshing()) {
      taskManager.startRefreshing();
      const token = dispatch
        ? await dispatch(refreshTokenAction())
        : await refreshAccessToken({
            groupId: getInMemoryCurrentGroupId(),
            hubMoimId: getInMemoryCurrentHubGroupId(),
          });
      taskManager.finishRefreshing(token);
    }
  } catch (_error) {
    taskManager.finishRefreshing();
    if (dispatch) {
      dispatch(signOut());
    }
    console.log("ERROR!!!", _error);
  }
}

export function refreshTokenAction(): ThunkPromiseResult<string | undefined> {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const groupId = state.app.currentGroupId;
      const hubMoimId = state.app.currentHubGroupId;

      return refreshAccessToken({ groupId, hubMoimId });
    } catch (err) {
      console.log("Error !!", err);
      if (err instanceof Error && axios.isAxiosError(err)) {
        if (
          err.response?.status === 400 &&
          (err.response?.data.error as any) === "invalid_grant"
        ) {
          dispatch(signOut());
          return undefined;
        }
      }
      throw err;
    }
  };
}
