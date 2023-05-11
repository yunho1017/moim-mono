import * as React from "react";
import { useHistory } from "react-router-dom";
// helpers
import { MoimURL } from "common/helpers/url";
// hooks
import useIsMobile from "common/hooks/useIsMobile";
import useRedirect from "common/hooks/useRedirect";
// components
import PageUpdater from "common/components/pageUpdater";
// styled
import { Wrapper } from "../../styled";

import { getCertificate_node_Certificate } from "@vingle/cryptobadge-sdk";
import CertificateDetailShowItem from "common/components/cryptobadge/certificate/certificateDetailShowItem";
import { CertificateShowContext } from "../../context";
import CryptobadgeShowHeaderForDesktop from "./header/desktop";
import CryptobadgeShowHeaderForMobile from "./header/mobile";

interface IProps {
  certificate: getCertificate_node_Certificate;
  badge: Moim.Cryptobadge.ICryptobadge;
  isRefreshing: boolean;
  certCount: number;
  onRetryClick: React.MouseEventHandler<HTMLDivElement>;
  winner?: Moim.Community.ICommunityUser;
  profileElements?: any;
}

const CertificateShowComponent: React.FC<IProps> = ({
  certificate,
  badge,
  isRefreshing,
  certCount,
  onRetryClick,
  winner,
  profileElements,
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
            title={certificate.name ?? ""}
            metaObjects={[
              {
                name: "og:title",
                content: certificate.name ?? "",
              },
              {
                name: "og:type",
                content: "website",
              },
              {
                name: "og:description",
                content: certificate.description ?? "",
              },
              {
                name: "og:image",
                content: certificate.imageUri ?? "",
              },
            ]}
          />
          {isMobile ? (
            <CryptobadgeShowHeaderForMobile
              certificate={certificate}
              badge={badge}
              isLoadingRefresh={isRefreshing}
              onRetryClick={onRetryClick}
            />
          ) : (
            <CryptobadgeShowHeaderForDesktop
              certificate={certificate}
              badge={badge}
              isLoadingRefresh={isRefreshing}
              onRetryClick={onRetryClick}
            />
          )}
          <CertificateDetailShowItem
            certificate={certificate}
            badge={badge}
            profileElements={profileElements}
            winner={winner}
            certCount={certCount}
          />
        </React.Fragment>
      </Wrapper>
    </CertificateShowContext.Provider>
  );
};

export default React.memo(CertificateShowComponent);
