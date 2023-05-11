import { useActions } from "app/store";
import * as qs from "query-string";
import * as React from "react";
import { useRouteMatch } from "react-router";
// action
import {
  getBadges as getBadgesAction,
  getCertificate,
  getCertificateIdByTransactionHash as getCertificateIdByTransactionHashAction,
  getCertificateItems as getCertificateItemsAction,
  refreshBadgeMetadata as refreshBadgeMetadataAction,
} from "app/actions/cryptobadge";
// helper
import CryptoBadgeClient from "common/helpers/cryptobadgeHelper";
// component
import { getCertificates_certificates_edges_node } from "@vingle/cryptobadge-sdk";
import { useSnackbar } from "common/components/alertTemplates/alerts/globalSnackbar/useGlobalSnackbar";
import { MoimURL } from "common/helpers/url";
import useRedirect from "common/hooks/useRedirect";
import { FormattedMessage } from "react-intl";
import CertificateMetadataShowComponent from "../certificateMetadataShow/components";
import { CertificateShowSkeleton } from "../skeleton";

function CertificateMetadataShow() {
  const [isLoading, setLoadingStatus] = React.useState<boolean | null>(false);
  const [isRefreshing, setIsRefreshing] = React.useState<boolean>(false);
  const [badgeItem, setBadgeItem] = React.useState<
    Moim.Cryptobadge.ICryptobadge | undefined | null
  >(undefined);
  const [sameBadgeCertificates, setSameBadgeCertificates] = React.useState<
    getCertificates_certificates_edges_node[] | undefined
  >(undefined);
  const [certificateTokenId, setCertificateTokenId] = React.useState<
    string | undefined
  >(undefined);

  const match = useRouteMatch<Moim.IMatchParams>();
  const {
    dispatchGetBadges,
    dispatchGetCertificateItems,
    dispatchRefreshBadgeMetadata,
    dispatchGetCertificateIdByTX,
  } = useActions({
    dispatchGetBadges: getBadgesAction,
    dispatchGetCertificate: getCertificate,
    dispatchGetCertificateItems: getCertificateItemsAction,
    dispatchRefreshBadgeMetadata: refreshBadgeMetadataAction,
    dispatchGetCertificateIdByTX: getCertificateIdByTransactionHashAction,
  });

  const { badgeId } = match.params;

  const redirect = useRedirect();

  const queryString = qs.parse(location.search);
  const txHash = queryString?.transactionHash;

  const { open } = useSnackbar({
    textElement: (
      <FormattedMessage id="banner_certificate_issued_by_user_mint_body" />
    ),
  });

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
    async (id: string) => {
      const badge = (await dispatchGetBadges([id]))?.[0];
      badge && setBadgeItem(badge);
    },
    [dispatchGetBadges],
  );

  const redirectToCertificateShow = React.useCallback(
    (id: string) => {
      const url = new MoimURL.CertificateShow({
        certificateId: id,
      }).toString();
      redirect(url);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [redirect],
  );

  const handleRedirectCertificateShow = React.useCallback(
    (
      certId: string,
      certificates: getCertificates_certificates_edges_node[],
    ) => {
      if (certificates && certificates.length > 0) {
        certificates.map(cert => {
          if (cert.tokenId === certId) {
            redirectToCertificateShow(cert.id);
          }
        });
      }
    },
    [redirectToCertificateShow],
  );

  const handleGetCertId = React.useCallback(
    async (tx: string) => {
      try {
        const certId = await dispatchGetCertificateIdByTX(tx);
        setCertificateTokenId(certId);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log("error", e);
      }
    },
    [dispatchGetCertificateIdByTX],
  );

  const handleRetry = React.useCallback(async () => {
    await handleGetCertId(txHash as string);
    if (badgeItem) {
      await dispatchRefreshBadgeMetadata({
        badgeRefreshId: `${badgeItem.chainId}/${badgeItem.contract}/Badge`,
      });
    }
    await CryptoBadgeClient.queryClient.clearStore();
  }, [badgeItem, dispatchRefreshBadgeMetadata, handleGetCertId, txHash]);

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
    if (badgeId) {
      try {
        handleGetBadgeItem(badgeId);
        if (txHash) {
          handleGetCertId(txHash as string);
        }
      } catch {
        setLoadingStatus(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [badgeId]);

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

  React.useEffect(() => {
    if (txHash) {
      handleGetCertId(txHash as string);
      open();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [txHash]);

  React.useEffect(() => {
    if (certificateTokenId && sameBadgeCertificates) {
      handleRedirectCertificateShow(certificateTokenId, sameBadgeCertificates);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [certificateTokenId, sameBadgeCertificates]);

  if (isLoading || !badgeItem) {
    return <CertificateShowSkeleton />;
  }

  return (
    <CertificateMetadataShowComponent
      isRefreshing={isRefreshing}
      badge={badgeItem}
      profileElements={<></>}
      certCount={sameBadgeCertificates ? sameBadgeCertificates?.length : 0}
      onRetryClick={handleClickRetry}
    />
  );
}

export default React.memo(CertificateMetadataShow);
