import * as React from "react";
import { useHistory } from "react-router-dom";
// helpers
import { MoimURL } from "common/helpers/url";
// hooks
import useIsMobile from "common/hooks/useIsMobile";
import useRedirect from "common/hooks/useRedirect";
import { CryptobadgeShowContext } from "../context";
// components
import BadgeDetailShowItem from "common/components/cryptobadge/badgeDetailShowItem";
import CryptobadgeShowHeaderForDesktop from "./header/desktop";
import CryptobadgeShowHeaderForMobile from "./header/mobile";
import PageUpdater from "common/components/pageUpdater";
// styled
import { Wrapper } from "../styled";

interface IProps {
  item: Moim.Cryptobadge.ICryptobadge;
  isRefreshing: boolean;
  mintRequestStatus?: string;
  profileElements?: any;
  certCount: number;
  isUserInWhiteList: boolean;
  questIds?: Moim.Id[];
  onRetryClick: React.MouseEventHandler<HTMLDivElement>;
  onClickClaim: (
    badge: Moim.Cryptobadge.ICryptobadge,
  ) => Promise<
    | {
        location: string;
      }
    | undefined
  >;
}

const CryptobadgeShowComponent: React.FC<IProps> = ({
  item,
  isRefreshing,
  questIds,
  mintRequestStatus,
  profileElements,
  certCount,
  isUserInWhiteList,
  onRetryClick,
  onClickClaim,
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
    <CryptobadgeShowContext.Provider value={contextValue}>
      <Wrapper ref={CryptobadgeShowContainerRef}>
        <React.Fragment>
          <PageUpdater
            title={item.name}
            metaObjects={[
              {
                name: "og:title",
                content: item.name,
              },
              {
                name: "og:type",
                content: "website",
              },
              {
                name: "og:description",
                content: item.description,
              },
              {
                name: "og:image",
                content: item.certificateImageUri,
              },
            ]}
          />
          {isMobile ? (
            <CryptobadgeShowHeaderForMobile
              badge={item}
              isLoadingRefresh={isRefreshing}
              onRetryClick={onRetryClick}
            />
          ) : (
            <CryptobadgeShowHeaderForDesktop
              badge={item}
              isLoadingRefresh={isRefreshing}
              onRetryClick={onRetryClick}
            />
          )}
          <BadgeDetailShowItem
            badge={item}
            mintRequestStatus={mintRequestStatus}
            isUserInWhiteList={isUserInWhiteList}
            questIds={questIds}
            profileElements={profileElements}
            certCount={certCount}
            onClickClaim={onClickClaim}
          />
        </React.Fragment>
      </Wrapper>
    </CryptobadgeShowContext.Provider>
  );
};

export default React.memo(CryptobadgeShowComponent);
