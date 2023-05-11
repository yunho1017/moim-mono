import {
  getBadgeMintRequests_badgeMintRequests_edges,
  getBadges_badges_edges_node,
  getBadge_node_Badge,
  getCertificates_certificates_edges_node,
  getCertificate_node_Certificate,
  getUserCertificates_certificates,
} from "@vingle/cryptobadge-sdk";
import { AddEntities, loadEntities } from "app/actions/entity";
import { ActionUnion } from "app/actions/helpers";
import { ActionCreators as SnackBarActionCreators } from "app/actions/snackbar";
import { BADGE_PREVIEW_KEY_STORE_KEY } from "app/common/constants/keys";
import {
  badgeListNormalizer,
  certificateListNormalizer,
  certificationListNormalizer,
} from "app/models/cryptobadge/normalizer";
import { ThunkPromiseResult } from "app/store";
import CryptoBadgeAPI from "common/api/cryptobadge/cryptobadgeClient";
import { errorParseData } from "common/helpers/APIErrorParser";
import { CryptoBadgeTypes } from "./types";

function createAction<T extends { type: CryptoBadgeTypes }>(d: T): T {
  return d;
}

export const ActionCreators = {
  // certifications (by userId)
  startFetchingCertifications: (userId: string) =>
    createAction({
      type: CryptoBadgeTypes.START_FETCHING_CERTIFICATIONS,
      payload: { userId },
    }),

  succeedFetchingCertifications: (
    userId: Moim.Id,
    certificationIds: Moim.User.NormalizedCertificationList,
    certifications: getUserCertificates_certificates | null,
  ) =>
    createAction({
      type: CryptoBadgeTypes.SUCCEED_FETCHING_CERTIFICATIONS,
      payload: {
        userId,
        certificationIds,
        certifications,
      },
    }),

  failedFetchingCertifications: (userId: string) =>
    createAction({
      type: CryptoBadgeTypes.FAILED_FETCHING_CERTIFICATIONS,
      payload: { userId },
    }),
  // certificates (by Issuers)
  succeedFetchingCertificatesByIssuers: (params: {
    issuers: string[];
    certificates: getCertificates_certificates_edges_node[];
  }) =>
    createAction({
      type: CryptoBadgeTypes.SUCCEED_FETCHING_CERTIFICATES_BY_ISSUERS,
      payload: params,
    }),

  // badges
  succeedFetchingBadges: (params: {
    issuers?: string[];
    name?: string;
    badges: getBadges_badges_edges_node[];
  }) =>
    createAction({
      type: CryptoBadgeTypes.SUCCEED_FETCHING_BADGES,
      payload: params,
    }),

  // badge group
  succeedFetchingBadgeGroup: (params: {
    badgeGroupId: string;
    badges: Moim.Cryptobadge.ICryptobadge[];
  }) =>
    createAction({
      type: CryptoBadgeTypes.SUCCEED_FETCHING_BADGE_GROUP,
      payload: params,
    }),

  // mint requests
  succeedFetchingMintRequests: (params: {
    issuers: string[];
    mintRequests: getBadgeMintRequests_badgeMintRequests_edges[];
  }) =>
    createAction({
      type: CryptoBadgeTypes.SUCCEED_FETCHING_MINT_REQUESTS,
      payload: params,
    }),

  // clear data state
  clearDataState: () =>
    createAction({
      type: CryptoBadgeTypes.CLEAR_DATA_STATE,
    }),
};

export type Actions = ActionUnion<typeof ActionCreators>;

export function getCertificatesByUserId(
  userId: Moim.Id,
  params: {
    canId: string;
  },
): ThunkPromiseResult {
  return async (dispatch, getStore) => {
    const state = getStore();
    const cryptoBadgeIssuerIds = state.app.currentGroupId
      ? state.entities.community_communities[state.app.currentGroupId]?.issuers
      : undefined;
    dispatch(ActionCreators.startFetchingCertifications(userId));
    if (cryptoBadgeIssuerIds) {
      try {
        const result = await CryptoBadgeAPI.getUserCryptoBadgeCertificates({
          userId: params.canId,
          issuers: cryptoBadgeIssuerIds,
        });

        const normalizedData = certificationListNormalizer({
          data: result.certificates?.edges ?? [],
        });

        dispatch(loadEntities(normalizedData.entities));
        dispatch(
          ActionCreators.succeedFetchingCertifications(
            userId,
            normalizedData.result,
            result.certificates,
          ),
        );
      } catch (err) {
        dispatch(ActionCreators.failedFetchingCertifications(userId));
        const error = errorParseData(err as any);
        if (error?.message) {
          dispatch(
            SnackBarActionCreators.openSnackbar({
              text: error?.message,
            }),
          );
        }
      }
    } else {
      // eslint-disable-next-line no-console
      console.log("!!!error: no cryptoBadgeIssuerIds");
      dispatch(ActionCreators.failedFetchingCertifications(userId));
    }
  };
}

export function getCertificateItems(
  badgeName?: string,
): ThunkPromiseResult<getCertificates_certificates_edges_node[] | undefined> {
  return async (dispatch, getStore) => {
    const state = getStore();
    const cryptoBadgeIssuerIds = state.app.currentGroupId
      ? state.entities.community_communities[state.app.currentGroupId]?.issuers
      : undefined;

    if (cryptoBadgeIssuerIds) {
      try {
        const certificatesData =
          (
            await CryptoBadgeAPI.getCertificateItems({
              issuers: cryptoBadgeIssuerIds,
              name: badgeName,
            })
          )?.certificates?.edges?.map(certificate => certificate.node) ?? [];

        const normalized = certificateListNormalizer({
          data: certificatesData,
        });

        dispatch(AddEntities(normalized.entities));

        dispatch(
          ActionCreators.succeedFetchingCertificatesByIssuers({
            issuers: cryptoBadgeIssuerIds,
            certificates: certificatesData,
          }),
        );
        return certificatesData;
      } catch (err) {
        const error = errorParseData(err as any);
        if (error?.message) {
          dispatch(
            SnackBarActionCreators.openSnackbar({
              text: error?.message,
            }),
          );
        }
      }
    } else {
      // eslint-disable-next-line no-console
      console.log("!!!error: no cryptoBadgeIssuerIds");
    }
  };
}

interface ICryptobadgeGroupReturn {
  badgeGroupData: Moim.Cryptobadge.ICryptobadgeGroup;
  badgeGroupList: Moim.Cryptobadge.ICryptobadge[];
}

export function getCryptobadgeBadgeGroup(params: {
  badgeGroupId: string;
}): ThunkPromiseResult<ICryptobadgeGroupReturn | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      const badgeGroupData = await apiSelector(
        getState(),
        dispatch,
      ).cryptobadge.getCryptobadgeGroup(params.badgeGroupId);

      const badgeGroupList = await apiSelector(
        getState(),
        dispatch,
      ).cryptobadge.getCryptobadgeItemsByBadgeGroupId(params.badgeGroupId);

      const { result, entities } = badgeListNormalizer({
        data: badgeGroupList,
      });

      sessionStorage.setItem(
        `${BADGE_PREVIEW_KEY_STORE_KEY}_${params.badgeGroupId}`,
        JSON.stringify(result.data),
      );

      dispatch(AddEntities(entities));
      dispatch(
        ActionCreators.succeedFetchingBadgeGroup({
          badgeGroupId: params.badgeGroupId,
          badges: badgeGroupList,
        }),
      );
      return { badgeGroupData, badgeGroupList };
    } catch (err) {
      const error = errorParseData(err as any);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
          }),
        );
      }
    }
  };
}

export function getBadge(params: { badgeId: string }) {
  return async (dispatch: any) => {
    try {
      const result = (await CryptoBadgeAPI.getBadgeItem({ id: params.badgeId }))
        ?.node as getBadge_node_Badge | null;
      return result;
    } catch (err) {
      const error = errorParseData(err as any);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
          }),
        );
      }
    }
  };
}

export function getBadges(
  ids: Moim.Id[],
): ThunkPromiseResult<Moim.Cryptobadge.ICryptobadge[] | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      const badgesData = await apiSelector(
        getState(),
        dispatch,
      ).cryptobadge.getCryptobadges(ids);

      return badgesData;
    } catch (err) {
      const error = errorParseData(err as any);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
          }),
        );
      }
    }
  };
}

export function getCertificateIdByTransactionHash(
  transactionHash: string,
): ThunkPromiseResult<string | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    let retries = 0;
    return new Promise((resolve, reject) => {
      const task = async () => {
        try {
          if (retries++ > 500) {
            throw new Error("max retries");
          }

          const certificateId = (
            await apiSelector(
              getState(),
              dispatch,
            ).cryptobadge.getCertificateIdByTx(transactionHash)
          )?.id;

          if (!certificateId) {
            setTimeout(task, 5000);
          } else {
            resolve(certificateId);
          }
        } catch (err) {
          const error = errorParseData(err as any);
          if (error?.message) {
            dispatch(
              SnackBarActionCreators.openSnackbar({
                text: error?.message,
              }),
            );
          }
          reject(err);
        }
      };
      task();
    });
  };
}

export function claimCertificate(data: {
  network: string;
  badgeName: string;
  address: string;
  callbackUrl: string;
}): ThunkPromiseResult<{ location: string } | undefined> {
  return async (dispatch, getState, { apiSelector }) => {
    try {
      const badgesData = await apiSelector(
        getState(),
        dispatch,
      ).cryptobadge.claimCertificate(data);

      return badgesData;
    } catch (err) {
      const error = errorParseData(err as any);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
          }),
        );
      }
    }
  };
}

export function getCertificate(params: { certificateId: string }) {
  return async (dispatch: any) => {
    try {
      const result = (
        await CryptoBadgeAPI.getCertificateItem({
          id: params.certificateId,
        })
      )?.node as getCertificate_node_Certificate | null;
      return result;
    } catch (err) {
      const error = errorParseData(err as any);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
          }),
        );
      }
    }
  };
}

export function getMintRequests(): ThunkPromiseResult<
  getBadgeMintRequests_badgeMintRequests_edges[] | undefined
> {
  return async (dispatch, getStore) => {
    const state = getStore();
    const cryptoBadgeIssuerIds = state.app.currentGroupId
      ? state.entities.community_communities[state.app.currentGroupId]?.issuers
      : undefined;

    if (cryptoBadgeIssuerIds) {
      try {
        const mintRequestsData =
          (
            await CryptoBadgeAPI.getMintRequests({
              issuers: cryptoBadgeIssuerIds,
            })
          )?.badgeMintRequests?.edges ?? undefined;

        dispatch(
          ActionCreators.succeedFetchingMintRequests({
            issuers: cryptoBadgeIssuerIds,
            mintRequests: mintRequestsData ?? [],
          }),
        );

        return mintRequestsData;
      } catch (err) {
        const error = errorParseData(err as any);
        if (error?.message) {
          dispatch(
            SnackBarActionCreators.openSnackbar({
              text: error?.message,
            }),
          );
        }
      }
    } else {
      // eslint-disable-next-line no-console
      console.log("!!!error: no cryptoBadgeIssuerIds");
    }
  };
}

export function refreshBadgeMetadata(params: { badgeRefreshId: string }) {
  return async (dispatch: any) => {
    try {
      const result = await CryptoBadgeAPI.refreshBadgeMetadata({
        badgeRefreshId: params.badgeRefreshId,
      });
      return result;
    } catch (err) {
      const error = errorParseData(err as any);
      if (error?.message) {
        dispatch(
          SnackBarActionCreators.openSnackbar({
            text: error?.message,
          }),
        );
      }
    }
  };
}
