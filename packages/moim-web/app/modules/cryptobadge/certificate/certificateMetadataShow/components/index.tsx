import * as React from "react";
import { useHistory } from "react-router-dom";
// helpers
import { MoimURL } from "common/helpers/url";
import { CertificateShowContext } from "../../context";
// hooks
import useIsMobile from "common/hooks/useIsMobile";
import useRedirect from "common/hooks/useRedirect";
// components
import PageUpdater from "common/components/pageUpdater";
import CertificateMetadataDetailShowItem from "common/components/cryptobadge/certificate/certificateMetadataDetailShowItem";
import CryptobadgeShowHeaderForDesktop from "../../certificateMetadataShow/components/header/desktop";
import CryptobadgeShowHeaderForMobile from "../../certificateMetadataShow/components/header/mobile";
// styled
import { Wrapper } from "../../styled";

interface IProps {
  badge: Moim.Cryptobadge.ICryptobadge;
  tokenId?: string;
  isRefreshing: boolean;
  profileElements?: any;
  certCount: number;
  onRetryClick: React.MouseEventHandler<HTMLDivElement>;
}

const CertificateMetadataShowComponent: React.FC<IProps> = ({
  badge,
  tokenId,
  isRefreshing,
  profileElements,
  certCount,
  onRetryClick,
}) => {
  const history = useHistory();
  const redirect = useRedirect();
  const isMobile = useIsMobile();
  const CryptobadgeShowContainerRef = React.useRef<HTMLDivElement>(null);

  const goBack = React.useCallback(() => {
    if (history.length > 2) {
      history.goBack();
    } else {
      redirect(new MoimURL.MoimAppHome().toString());
    }
  }, [history, redirect]);

  const contextValue = React.useMemo(
    () => ({
      containerRef: CryptobadgeShowContainerRef,
      onBack: goBack,
    }),
    [goBack],
  );

  React.useLayoutEffect(() => {
    if (isMobile) {
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CertificateShowContext.Provider value={contextValue}>
      <Wrapper ref={CryptobadgeShowContainerRef}>
        <React.Fragment>
          <PageUpdater
            title={badge.name ?? ""}
            metaObjects={[
              {
                name: "og:title",
                content: badge.name ?? "",
              },
              {
                name: "og:type",
                content: "website",
              },
              {
                name: "og:description",
                content: badge.description ?? "",
              },
              {
                name: "og:image",
                content: badge.certificateImageUri ?? "",
              },
            ]}
          />
          {isMobile ? (
            <CryptobadgeShowHeaderForMobile
              badge={badge}
              tokenId={tokenId}
              isLoadingRefresh={isRefreshing}
              onRetryClick={onRetryClick}
            />
          ) : (
            <CryptobadgeShowHeaderForDesktop
              badge={badge}
              tokenId={tokenId}
              isLoadingRefresh={isRefreshing}
              onRetryClick={onRetryClick}
            />
          )}
          <CertificateMetadataDetailShowItem
            badge={badge}
            tokenId={tokenId}
            profileElements={profileElements}
            certCount={certCount}
          />
        </React.Fragment>
      </Wrapper>
    </CertificateShowContext.Provider>
  );
};

export default React.memo(CertificateMetadataShowComponent);
