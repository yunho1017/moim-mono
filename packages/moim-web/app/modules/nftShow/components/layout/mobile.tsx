import * as React from "react";
// components
import Top from "../top/mobile";
import Properties from "../properties";
import History from "../history";
import Detail from "../detail";
import { Spacer } from "common/components/designSystem/spacer";
import Description from "../description";
import NFTShowHeader from "../header/mobile";
import Bottom from "../bottom";
// styled
import { MaxWidthWrapper } from "../styled";
import { TopWrapper } from "../../styled";

interface IProps {
  token: Moim.NFT.INftDetail | undefined;
  contract: Moim.NFT.IContract | undefined;
  schedule: Moim.NFT.ISchedule | undefined;
  transferList: Moim.NFT.IGetTokenTransferListResponseBody | undefined | null;
  onLoadMoreTransferList(paging?: Moim.IPaging): void;
}

const NFTShowMobileLayout: React.FC<IProps> = ({
  token,
  contract,
  schedule,
  transferList,
  onLoadMoreTransferList,
}) => {
  const descTxt = React.useMemo(
    () => token?.description?.split("\\n").join("<br />"),
    [token],
  );

  return (
    <>
      <NFTShowHeader
        network={contract?.network ?? "POLYGON"}
        symbol={contract?.symbol ?? ""}
        tokenNumber={token?.tokenId}
        contractAddress={contract?.address}
      />
      <TopWrapper>
        <MaxWidthWrapper>
          <Top
            contractId={contract?.id}
            tokenId={token?.id ?? ""}
            collectionName={contract?.name ?? ""}
            name={token?.name ?? ""}
            ownerId={token?.ownedByAddress ?? ""}
            ownerUserId={token?.ownedBy?.userId}
            price={schedule?.price}
            currency={contract?.currency}
            network={contract?.network ?? "POLYGON"}
            scheduleMintable={schedule?.mintable ?? false}
            mintable={token?.mintable ?? false}
            status={token?.status ?? "CANDIDATE"}
            startAt={schedule?.mintingStartAt}
            endAt={schedule?.mintingEndAt}
            mediaUrl={token?.itemUrlProcessed ?? token?.itemUrl}
            mediaMetadata={token?.itemMetadata}
            mediaPreviewUrl={token?.itemStaticPreviewUrl}
            subMediaMetadata={token?.subItemMetadata}
            subMediaTitle={contract?.subMediaTitle}
          />
        </MaxWidthWrapper>
      </TopWrapper>
      <MaxWidthWrapper>
        {descTxt?.length && (
          <Description value={descTxt} itemName={token?.name ?? ""} />
        )}
        <Spacer value={16} />
        <Properties attributes={token?.attributes ?? []} />
        <Spacer value={24} />
        <Detail
          contractAddress={contract?.address ?? ""}
          tokenId={token?.tokenId ?? 0}
          blockchain={contract?.network ?? "POLYGON"}
          tokenStandard={contract?.standard}
        />
        <Spacer value={16} />
        <History
          network={contract?.network ?? "POLYGON"}
          transferList={transferList}
          onLoadMore={onLoadMoreTransferList}
        />
      </MaxWidthWrapper>
      <Spacer value={42} />
      {schedule && (
        <Bottom
          tokenId={token?.id ?? ""}
          scheduleMintable={schedule?.mintable ?? false}
          mintable={token?.mintable ?? false}
          status={token?.status ?? "CANDIDATE"}
          startAt={schedule?.mintingStartAt}
          endAt={schedule?.mintingEndAt}
        />
      )}
    </>
  );
};

export default React.memo(NFTShowMobileLayout);
