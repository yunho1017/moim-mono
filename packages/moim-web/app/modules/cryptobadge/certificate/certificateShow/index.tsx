import * as React from "react";
import { useActions } from "app/store";
import { useRouteMatch } from "react-router";
// action
import {
  getBadges as getBadgesAction,
  getCertificate as getCertificateAction,
  getCertificateItems as getCertificateItemsAction,
  refreshBadgeMetadata as refreshBadgeMetadataAction,
} from "app/actions/cryptobadge";
import { getUsersBatch as getUsersBatchAction } from "app/actions/community";
// helper
import CryptoBadgeClient from "common/helpers/cryptobadgeHelper";
// component
import {
  getCertificates_certificates_edges_node,
  getCertificate_node_Certificate,
} from "@vingle/cryptobadge-sdk";
import CertificateShowComponent from "./components";
import { CertificateShowSkeleton } from "../skeleton";

function CertificateShow() {
  const [isLoading, setLoadingStatus] = React.useState<boolean | null>(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [certificateItem, setCertificateItem] = React.useState<
    getCertificate_node_Certificate | undefined | null
  >(undefined);
  const [badgeItem, setBadgeItem] = React.useState<
    Moim.Cryptobadge.ICryptobadge | undefined | null
  >(undefined);
  const [winner, setWinner] = React.useState<
    Moim.Community.ICommunityUser | undefined
  >(undefined);
  const [sameBadgeCertificates, setSameBadgeCertificates] = React.useState<
    getCertificates_certificates_edges_node[] | undefined
  >(undefined);

  const match = useRouteMatch<Moim.IMatchParams>();
  const {
    dispatchGetBadges,
    dispatchGetCertificate,
    dispatchGetCertificateItems,
    dispatchRefreshBadgeMetadata,
    dispatchGetUsersBatchAction,
  } = useActions({
    dispatchGetBadges: getBadgesAction,
    dispatchGetCertificate: getCertificateAction,
    dispatchGetCertificateItems: getCertificateItemsAction,
    dispatchRefreshBadgeMetadata: refreshBadgeMetadataAction,
    dispatchGetUsersBatchAction: getUsersBatchAction,
  });

  const { certificateId } = match.params;

  const handleGetCertificateItem = React.useCallback(
    async (id: string) => {
      const certificate = await dispatchGetCertificate({
        certificateId: id,
      });
      setCertificateItem(certificate);
      setLoadingStatus(false);
    },
    [dispatchGetCertificate],
  );

  const handleGetSameBadgeCertificates = React.useCallback(
    async (badge: Moim.Cryptobadge.ICryptobadge) => {
      const certificatesResult = await dispatchGetCertificateItems(
        badge.name ?? undefined,
      );
      setSameBadgeCertificates(certificatesResult ?? []);
      setLoadingStatus(false);
    },
    [dispatchGetCertificateItems],
  );

  const handleGetBadgeItem = React.useCallback(
    async (certificate: getCertificate_node_Certificate) => {
      if (certificate && certificate.badge?.id) {
        const badge = (await dispatchGetBadges([certificate.badge.id]))?.[0];
        badge && setBadgeItem(badge);
      }
    },
    [dispatchGetBadges],
  );

  const handleGetWinnerUser = React.useCallback(
    async (certificate: getCertificate_node_Certificate) => {
      if (certificate && certificate.winnerAddress) {
        const winnerUser = await dispatchGetUsersBatchAction({
          addresses: [certificate.winnerAddress],
        });

        if (winnerUser && winnerUser.length > 0) {
          setWinner(winnerUser?.[0]);
        }
      }
    },
    [dispatchGetUsersBatchAction],
  );

  const handleRetry = React.useCallback(async () => {
    if (certificateId && certificateItem) {
      if (badgeItem) {
        await dispatchRefreshBadgeMetadata({
          badgeRefreshId: `${badgeItem.chainId}/${badgeItem.contract}/Badge`,
        });
      }
      await CryptoBadgeClient.queryClient.clearStore();
      await handleGetCertificateItem(certificateId);
    }
  }, [
    badgeItem,
    certificateId,
    certificateItem,
    dispatchRefreshBadgeMetadata,
    handleGetCertificateItem,
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

  React.useEffect(() => {
    setLoadingStatus(true);
    if (certificateId) {
      try {
        handleGetCertificateItem(certificateId);
      } catch {
        setLoadingStatus(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [certificateId]);

  React.useEffect(() => {
    setLoadingStatus(true);
    if (certificateItem) {
      try {
        handleGetBadgeItem(certificateItem);
        handleGetWinnerUser(certificateItem);
      } catch {
        setLoadingStatus(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [certificateItem]);

  React.useEffect(() => {
    setLoadingStatus(true);
    if (badgeItem) {
      try {
        handleGetSameBadgeCertificates(badgeItem);
      } catch {
        setLoadingStatus(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [badgeItem]);

  if (isLoading || !certificateItem || !badgeItem) {
    return <CertificateShowSkeleton />;
  }

  return (
    <CertificateShowComponent
      isRefreshing={isRefreshing}
      badge={badgeItem}
      certificate={certificateItem}
      winner={winner}
      profileElements={<></>}
      certCount={sameBadgeCertificates ? sameBadgeCertificates?.length : 0}
      onRetryClick={handleClickRetry}
    />
  );
}

export default React.memo(CertificateShow);
