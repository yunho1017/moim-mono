import * as qs from "query-string";
import * as React from "react";
import _ from "lodash";
import { Redirect, useRouteMatch } from "react-router";
import { FormattedMessage } from "react-intl";
import {
  BadgeMintRequestStatus,
  getCertificates_certificates_edges_node,
} from "@vingle/cryptobadge-sdk";
// action
import {
  claimCertificate as claimCertificateAction,
  getBadges as getBadgesAction,
  getCertificateItems as getCertificateItemsAction,
  refreshBadgeMetadata as refreshBadgeMetadataAction,
} from "app/actions/cryptobadge";
import { fetchQuestSearchForCryptoBadge } from "app/actions/dquest";
// helper
import { useActions } from "app/store";
import { refreshTokenAction } from "common/helpers/tokenRefreshManager";
import CryptoBadgeClient from "common/helpers/cryptobadgeHelper";
import { MoimURL } from "common/helpers/url";
import { useMintRequests } from "common/components/cryptobadge/hooks/useMintRequests";
import useRedirect from "common/hooks/useRedirect";
// component
import { useSnackbar } from "common/components/alertTemplates/alerts/globalSnackbar/useGlobalSnackbar";
import { getNetworkNameByChainId } from "common/components/cryptobadge/utils";
import CryptobadgeShowComponent from "./components";
import { CryptobadgeShowSkeleton } from "./skeleton";

import { WhiteFormattedMassage } from "./styled";

function CryptobadgeShow() {
  const match = useRouteMatch<Moim.IMatchParams>();
  const {
    dispatchGetBadges,
    dispatchFetchQuestSearchForCryptoBadge,
    dispatchGetCertificateItems,
    dispatchRefreshBadgeMetadata,
    dispatchClaimCertificate,
    dispatchRefreshToken,
  } = useActions({
    dispatchGetBadges: getBadgesAction,
    dispatchFetchQuestSearchForCryptoBadge: fetchQuestSearchForCryptoBadge,
    dispatchGetCertificateItems: getCertificateItemsAction,
    dispatchRefreshBadgeMetadata: refreshBadgeMetadataAction,
    dispatchClaimCertificate: claimCertificateAction,
    dispatchRefreshToken: refreshTokenAction,
  });

  const {
    currentUserMintRequests: mintRequests,
    currentUserAddress,
    refreshMintRequestData,
  } = useMintRequests();

  const { badgeId } = match.params;
  const queryString = qs.parse(location.search);
  const { open: openFailClaimSnackbar } = useSnackbar({
    timeout: 5000,
    type: "error",
  });

  const [isLoading, setLoadingStatus] = React.useState<boolean | null>(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [badgeItem, setBadgeItem] = React.useState<
    Moim.Cryptobadge.ICryptobadge | undefined
  >(undefined);
  const [isUserInWhiteList, setIsUserInWhiteList] = React.useState<boolean>(
    false,
  );
  const [questIds, setQuestIds] = React.useState<Moim.Id[] | undefined>(
    undefined,
  );
  const [certificates, setCertificates] = React.useState<
    getCertificates_certificates_edges_node[] | undefined
  >(undefined);
  const [mintRequestStatus, setMintRequestStatus] = React.useState<
    BadgeMintRequestStatus | "NONE" | undefined
  >(undefined);

  const redirect = useRedirect();

  const handleGetBadgeItem = React.useCallback(
    async (id: string) => {
      const badge = (await dispatchGetBadges([id]))?.[0];
      badge && setBadgeItem(badge);
    },
    [dispatchGetBadges],
  );

  const handleGetBadgeDQuestData = React.useCallback(
    async (badge: Moim.Cryptobadge.ICryptobadge) => {
      const questResult = await dispatchFetchQuestSearchForCryptoBadge(
        badge.id,
      );
      setQuestIds(questResult?.data ?? []);
    },
    [dispatchFetchQuestSearchForCryptoBadge],
  );

  const handleGetCertificatesData = React.useCallback(
    async (badge: Moim.Cryptobadge.ICryptobadge) => {
      const certificatesResult = await dispatchGetCertificateItems(
        badge.name ?? undefined,
      );
      setCertificates(certificatesResult ?? []);
    },
    [dispatchGetCertificateItems],
  );

  const handleBadgeInfoData = React.useCallback(
    async (badge: Moim.Cryptobadge.ICryptobadge) => {
      setLoadingStatus(true);
      try {
        await handleGetBadgeDQuestData(badge);
        await handleGetCertificatesData(badge);
        setLoadingStatus(false);
      } catch {
        setLoadingStatus(null);
      }
    },
    [handleGetBadgeDQuestData, handleGetCertificatesData],
  );

  const handleFindMintStatus = React.useCallback(
    (badge: Moim.Cryptobadge.ICryptobadge) => {
      const mintStatus =
        mintRequests && mintRequests.length > 0
          ? mintRequests.find(mint => mint.badge.name === badge.name)?.status ??
            "NONE"
          : "NONE";
      setMintRequestStatus(mintStatus);
    },
    [mintRequests],
  );

  const getUserInWhiteList = React.useCallback(
    (whiteListAddresses: string[]) => {
      if (currentUserAddress) {
        const filteredArray = whiteListAddresses.filter(
          address => address === currentUserAddress,
        );

        filteredArray && filteredArray.length > 0
          ? setIsUserInWhiteList(true)
          : setIsUserInWhiteList(false);
      } else {
        setIsUserInWhiteList(false);
      }
    },
    [currentUserAddress],
  );

  const handleClaim = React.useCallback(
    async (badge: Moim.Cryptobadge.ICryptobadge) => {
      await dispatchRefreshToken();
      const callbackUrl = window.location.href;
      const callbackUrlCleaned = callbackUrl.split("?")[0];

      const result = await dispatchClaimCertificate({
        network: getNetworkNameByChainId(badge.chainId) ?? "",
        badgeName: badge.name ?? "",
        address: badge.contract ?? "",
        callbackUrl: callbackUrlCleaned,
      });

      if (result?.location) {
        window.location.href = result.location;
      }

      return result;
    },
    [dispatchClaimCertificate, dispatchRefreshToken],
  );

  const handleRetry = React.useCallback(async () => {
    if (badgeId && badgeItem) {
      await dispatchRefreshBadgeMetadata({
        badgeRefreshId: `${badgeItem.chainId}/${badgeItem.contract}/Badge`,
      });
      await CryptoBadgeClient.queryClient.clearStore();
      handleGetBadgeItem(badgeId);
      refreshMintRequestData();
    }
  }, [
    badgeId,
    badgeItem,
    dispatchRefreshBadgeMetadata,
    handleGetBadgeItem,
    refreshMintRequestData,
  ]);

  const handleClickRetry: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
    e => {
      e.stopPropagation();
      setIsRefreshing(true);
      handleRetry();
      setTimeout(() => {
        setIsRefreshing(false);
      }, 1000);
    },
    [handleRetry],
  );

  const redirectToCertificateMetadataShow = React.useCallback(
    (id: string, query: string) => {
      const metadataShowUrl = new MoimURL.CertificateMetadataShow({
        badgeId: id,
      }).toString();

      const urlWithQuery = `${metadataShowUrl}${query}`;
      redirect(urlWithQuery);
    },
    [redirect],
  );

  React.useEffect(() => {
    if (queryString && badgeItem) {
      if (!_.isEmpty(queryString)) {
        if (!!queryString.error) {
          openFailClaimSnackbar({
            textElement: (
              <WhiteFormattedMassage>
                <FormattedMessage id="error_badge_user_mint_failure_return" />
              </WhiteFormattedMassage>
            ),
          });
        }

        if (queryString.transactionHash) {
          redirectToCertificateMetadataShow(badgeItem?.id, location.search);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [badgeItem]);

  React.useEffect(() => {
    setLoadingStatus(true);
    if (badgeId) {
      handleGetBadgeItem(badgeId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [badgeId]);

  React.useEffect(() => {
    setLoadingStatus(true);
    if (badgeId && badgeItem) {
      handleBadgeInfoData(badgeItem);
      setLoadingStatus(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [badgeItem]);

  React.useEffect(() => {
    if (badgeItem) {
      handleFindMintStatus(badgeItem);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [badgeItem, mintRequests]);

  React.useEffect(() => {
    if (badgeItem) {
      if (badgeItem?.claimCondition?.whiteList?.displayingAddresses) {
        getUserInWhiteList(
          badgeItem.claimCondition.whiteList?.displayingAddresses,
        );
      } else {
        setIsUserInWhiteList(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [badgeItem]);

  if (
    isLoading ||
    !badgeItem ||
    !(badgeItem?.certificateImageUri ?? badgeItem?.certificateAnimationUri) ||
    questIds === undefined ||
    !certificates
  ) {
    return <CryptobadgeShowSkeleton />;
  }

  if (isLoading === null) {
    return <Redirect to={new MoimURL.NotFound().toString()} />;
  }

  return (
    <CryptobadgeShowComponent
      item={badgeItem}
      isRefreshing={isRefreshing}
      mintRequestStatus={mintRequestStatus}
      profileElements={<></>}
      certCount={certificates ? certificates.length : 0}
      questIds={questIds}
      onClickClaim={handleClaim}
      isUserInWhiteList={isUserInWhiteList}
      onRetryClick={handleClickRetry}
    />
  );
}

export default CryptobadgeShow;
