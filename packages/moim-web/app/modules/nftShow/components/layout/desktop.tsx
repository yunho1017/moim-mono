import * as React from "react";
// components
import Top from "../top/desktop";
import Properties from "../properties";
import History from "../history";
import Detail from "../detail";
import { MaxWidthWrapper } from "../styled";
import { Spacer } from "common/components/designSystem/spacer";
import Description from "../description";
import HeaderButtons from "../header/desktop";
// styled
import { TopWrapper, ContentsWrapper } from "../../styled";

interface IProps {
  token?: Moim.NFT.INftDetail;
  contract?: Moim.NFT.IContract;
  schedule?: Moim.NFT.ISchedule;
  transferList?: Moim.NFT.IGetTokenTransferListResponseBody | null;
  onLoadMoreTransferList(paging?: Moim.IPaging): void;
}

const NFTShowDesktopLayout: React.FC<IProps> = ({
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
      <TopWrapper>
        <MaxWidthWrapper>
          <HeaderButtons
            tokenNumber={token?.tokenId}
            contractAddress={contract?.address}
            network={contract?.network ?? "POLYGON"}
          />
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

      <Spacer value={50} />

      <MaxWidthWrapper>
        <ContentsWrapper>
          {descTxt?.length && (
            <Description value={descTxt} itemName={token?.name ?? ""} />
          )}
          <Detail
            contractAddress={contract?.address ?? ""}
            tokenId={token?.tokenId ?? 0}
            blockchain={contract?.network ?? "POLYGON"}
            tokenStandard={contract?.standard}
          />
        </ContentsWrapper>
        <Properties attributes={token?.attributes ?? []} />
        <Spacer value={50} />
        <History
          network={contract?.network ?? "POLYGON"}
          transferList={transferList}
          onLoadMore={onLoadMoreTransferList}
        />
      </MaxWidthWrapper>
      <Spacer value={120} />
    </>
  );
};

export default React.memo(NFTShowDesktopLayout);
