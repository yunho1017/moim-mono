import axios from "axios";
import { qs } from "url-parse";
import { push, replace } from "connected-react-router";

import { storeMoimTokenToCookie } from "common/helpers/authentication";
import { ActionCreators as CampaignActionCreators } from "app/actions/campaign";
import { ActionCreators as GroupActionCreators } from "app/actions/group";
import {
  getRemitExecutionFundRequest,
  removeRemitExecutionFundRequest,
} from "app/actions/campaign/index";
import {
  restoreRedirectBlocks,
  restoreRedirectMint,
} from "app/actions/referenceBlock";
import {
  getStoreRedirectRequest,
  getStoreRedirectMintRequest,
} from "app/actions/referenceBlock/cookieHelper";

import {
  getPaymentRedirectLastSeen,
  getPaymentRedirectRequest,
  removePaymentRedirectLastSeen,
  removePaymentRedirectRequest,
} from "app/modules/commerce/components/checkoutRedirectDialog/helpers";

import { IAppState } from "app/rootReducer";
import { AppDispatch } from "app/store";
import {
  OAUTH_REQUESTED,
  OAUTH_REQUESTED_LAST_SEEN,
} from "common/constants/keys";
import {
  getAccessToken,
  IOptions,
} from "common/helpers/authentication/handlers/moim/helpers";
import { getAccessToken as getCryptoBadgeAccessToken } from "common/helpers/authentication/handlers/cryptobadge/helpers";
import * as CookieHandler from "common/helpers/cookieHandler";
import {
  setCryptoBadgeToken,
  setOAuthTokenForGroup,
} from "common/helpers/cryptoBadgeHandlerWithInMemory";
import selectHubMoimId from "common/helpers/selectHubMoimId";
import { MoimURL } from "common/helpers/url";
import safeParseJSON from "common/helpers/safeParseJSON";
import { getInMemoryCurrentHubGroupId } from "common/api";
import {
  getApiDomain,
  getCanPassAPIDomain,
  getOriginDomain,
} from "common/helpers/domainMaker";
import { openSnackbar } from "app/actions/snackbar";

export async function isRedirectFromOAuth(
  dispatch: AppDispatch,
  state: IAppState,
) {
  const oauthRequested = CookieHandler.get(OAUTH_REQUESTED);

  const oAuthRequestParams:
    | { options: IOptions; verifier: string }
    | undefined = oauthRequested ? JSON.parse(oauthRequested) : undefined;
  const from = qs.parse(location.search) as {
    [key: string]: any;
  };
  if (oAuthRequestParams) {
    const hubGroupId = selectHubMoimId(state);
    const currentGroupId = state.app.currentGroupId;

    try {
      // error 핸들링
      if (from.error) {
        switch (from.error) {
          case "invalid_request": {
            if (from.error_description) {
              const [code, token, refreshToken] = from.error_description.split(
                ";",
              );

              // hub moim 가입안한 유저
              if (code === "linked_user_not_found") {
                setOAuthTokenForGroup({
                  group: getInMemoryCurrentHubGroupId(),
                  provider: "cryptobadge",
                  token,
                });
                if (hubGroupId && currentGroupId === hubGroupId) {
                  dispatch(
                    GroupActionCreators.openJoinGroupDialog(
                      "current",
                      undefined,
                      { token, refreshToken },
                    ),
                  );
                } else {
                  dispatch(
                    GroupActionCreators.openJoinGroupDialog(
                      "parent",
                      "username",
                      { token, refreshToken },
                    ),
                  );
                }
              } else {
                dispatch(
                  openSnackbar({
                    text: `${from.error}: ${from.error_description}`,
                    type: "error",
                  }),
                );
              }
            }
          }
        }
      }

      // 정상 루트
      if (from.code) {
        if (!hubGroupId) {
          const result = await getCryptoBadgeAccessToken({
            ...oAuthRequestParams.options,
            verifier: oAuthRequestParams.verifier,
            code: from.code,
          });

          setCryptoBadgeToken(result.access_token);
          return;
        }
        const result = await getAccessToken({
          ...oAuthRequestParams.options,
          verifier: oAuthRequestParams.verifier,
          code: from.code,
        });

        storeMoimTokenToCookie(hubGroupId, result);

        const queryState = safeParseJSON(from.state, {});
        // child moim 가입이 안되어 있는데 openJoinGroupDialogAfterGetParentUser 가 true일 경우에 join Dialog 오픈
        if (queryState?.openJoinGroupDialogAfterGetParentUser) {
          try {
            await axios({
              method: "GET",
              url: `${getApiDomain()}/me`,
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${result.access_token}`,
                "x-moim-group-id": currentGroupId,
                "x-moim-origin": getOriginDomain(),
              },
            });
          } catch (err) {
            if (
              axios.isAxiosError(err) &&
              err.response &&
              (err.response.status === 401 || err.response.status === 404)
            ) {
              // 현재 moim 가입 안한유저
              dispatch(GroupActionCreators.openJoinGroupDialog("current"));
            }
          }
        }
      }

      // url 업데이트
      const queryState = safeParseJSON(from.state, {});
      const locationSearch = queryState?.search;
      let lastSeen: string =
        CookieHandler.get(OAUTH_REQUESTED_LAST_SEEN, "/") ?? "/";
      if (
        MoimURL.CoverPage.isSameExact(lastSeen) ||
        MoimURL.MoimLogin.isSameExact(lastSeen)
      ) {
        lastSeen = "/";
      }

      CookieHandler.remove(OAUTH_REQUESTED_LAST_SEEN);
      CookieHandler.remove(OAUTH_REQUESTED);

      setTimeout(() => {
        dispatch(
          replace({
            pathname: lastSeen,
          }),
        );
        if (locationSearch) {
          dispatch(
            push({
              pathname: lastSeen,
              search: locationSearch,
            }),
          );
        }
      }, 100);
    } catch (e) {
      console.error("error in redirect from oauth ", e);
    }
  }
}

export async function isRedirectFromPlugin(dispatch: AppDispatch) {
  const pluginRequested = getStoreRedirectRequest(false);
  if (pluginRequested) {
    dispatch(restoreRedirectBlocks());
  }
}

export async function isRedirectFromMint(dispatch: AppDispatch) {
  const mintRequested = getStoreRedirectMintRequest(false);
  if (mintRequested) {
    dispatch(restoreRedirectMint());
  }
}

export function isRedirectFromPayment(dispatch: AppDispatch) {
  const requested = getPaymentRedirectRequest(false);
  const lastSeen = getPaymentRedirectLastSeen();

  if (
    requested &&
    document.referrer.includes("https://payment-web") &&
    !(
      Boolean(MoimURL.AboutPolicy.matchExact(location.pathname)?.isExact) ||
      Boolean(MoimURL.AboutTerms.matchExact(location.pathname)?.isExact) ||
      Boolean(MoimURL.About.matchExact(location.pathname)?.isExact) ||
      Boolean(MoimURL.CommerceCheckoutComplete.match(location.pathname))
    )
  ) {
    const queryParams: any = qs.parse(location.search);
    removePaymentRedirectRequest();
    removePaymentRedirectLastSeen();

    setTimeout(() => {
      dispatch(
        replace({
          pathname: lastSeen,
          search: (queryParams.pr_tag as string) ?? undefined,
        }),
      );
    }, 100);
  }
}

export function isRedirectFromExecutionRemit(dispatch: AppDispatch) {
  const requested = getRemitExecutionFundRequest();
  if (requested !== null && document.referrer.includes(getCanPassAPIDomain())) {
    const queryParams: any = qs.parse(location.search);

    removeRemitExecutionFundRequest();
    const hasError =
      Object.keys(queryParams).filter(
        key => key === "errorCode" || key === "errorMessage",
      ).length > 0;

    setTimeout(() => {
      dispatch(
        CampaignActionCreators.openRemitResultDialog(
          requested.campaignId,
          requested.executionId,
          !hasError ? "succeed" : "failed",
        ),
      );
    }, 100);
  }
}
