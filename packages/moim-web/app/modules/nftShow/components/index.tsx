import * as React from "react";
import { useHistory } from "react-router-dom";
// helpers
import { MoimURL } from "common/helpers/url";
// hooks
import useIsMobile from "common/hooks/useIsMobile";
import useRedirect from "common/hooks/useRedirect";
// components
import PageUpdater from "common/components/pageUpdater";
import NFTShowDesktopLayout from "./layout/desktop";
import NFTShowMobileLayout from "./layout/mobile";
// styled
import { Wrapper } from "../styled";
import { NFTShowContext } from "../context";

interface IProps {
  token: Moim.NFT.INftDetail | undefined;
  contract: Moim.NFT.IContract | undefined;
  schedule: Moim.NFT.ISchedule | undefined;
  transferList: Moim.NFT.IGetTokenTransferListResponseBody | undefined | null;
  onLoadMoreTransferList(paging?: Moim.IPaging): void;
}

const NFTShowComponent: React.FC<IProps> = ({
  token,
  contract,
  schedule,
  transferList,
  onLoadMoreTransferList,
}) => {
  const history = useHistory();
  const redirect = useRedirect();
  const isMobile = useIsMobile();
  const NFTShowContainerRef = React.useRef<HTMLDivElement>(null);

  const goBack = React.useCallback(() => {
    if (history.length > 2) {
      history.goBack();
    } else {
      redirect(new MoimURL.MoimAppHome().toString());
    }
  }, [history, redirect]);

  const contextValue = React.useMemo(
    () => ({
      containerRef: NFTShowContainerRef,
      onBack: goBack,
    }),
    [goBack],
  );

  React.useLayoutEffect(() => {
    if (isMobile) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <NFTShowContext.Provider value={contextValue}>
      <Wrapper ref={NFTShowContainerRef}>
        <React.Fragment>
          <PageUpdater
            title={token?.name ?? ""}
            metaObjects={[
              {
                name: "og:title",
                content: token?.name ?? "",
              },
              {
                name: "og:type",
                content: "website",
              },
              {
                name: "og:description",
                content: token?.description ?? "",
              },
              {
                name: "og:image",
                content: token?.itemUrl ?? "",
              },
            ]}
          />

          {!isMobile ? (
            <NFTShowDesktopLayout
              token={token}
              contract={contract}
              schedule={schedule}
              transferList={transferList}
              onLoadMoreTransferList={onLoadMoreTransferList}
            />
          ) : (
            <NFTShowMobileLayout
              token={token}
              contract={contract}
              schedule={schedule}
              transferList={transferList}
              onLoadMoreTransferList={onLoadMoreTransferList}
            />
          )}
        </React.Fragment>
      </Wrapper>
    </NFTShowContext.Provider>
  );
};

export default React.memo(NFTShowComponent);
