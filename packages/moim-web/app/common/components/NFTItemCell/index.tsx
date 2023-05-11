import React from "react";
import { useActions, useStoreState } from "app/store";
import useRedirect from "common/hooks/useRedirect";
import useIsMobile from "common/hooks/useIsMobile";
// action
import { ActionCreators as NftActionCreators } from "app/actions/nft";
// helper
import { MoimURL } from "common/helpers/url";
import { mintNft } from "app/common/helpers/nft";
// components
import Thumbnail from "./components/thumbnail";
import Body from "./components/body";
import { NFTItemCellBodySkeleton } from "./skeleton";
// style
import { NFTItemCellWrapper } from "./styled";
import { NFTItemCellBody } from "./components/body/styled";

interface IProps {
  item: Moim.NFT.INftDetail;
  config?: Moim.NFT.INftItemShowConfig;
  groupId?: Moim.Id;
  hubGroupId?: Moim.Id;
  disableClickCollectionName?: boolean;
}

function getTextAlign(type?: Moim.NFT.NftItemShowConfigTextAlignment) {
  switch (type) {
    case "LEFT":
      return "flex-start";
    case "CENTER":
      return "center";
    case "RIGHT":
      return "flex-end";
  }
}

export const NFTItemCell: React.FC<IProps> = ({
  item,
  groupId,
  hubGroupId,
  config,
  disableClickCollectionName = false,
}) => {
  const redirect = useRedirect();
  const isMobile = useIsMobile();
  const alignItems = getTextAlign(config?.textAlignment ?? "LEFT");
  const contract = useStoreState(
    state => state.entities.nftContracts[item.contractId],
  );
  const schedule = useStoreState(
    state => state.entities.nftSchedules[item.scheduleId],
  );
  const isLoading = !contract;
  const { open } = useActions({
    open: NftActionCreators.openMintRedirectLoadingDialog,
  });

  const handleClick: React.MouseEventHandler<HTMLDivElement> = React.useCallback(() => {
    redirect(
      new MoimURL.NftShow({
        nftItemId: item.id,
      }).toString(),
    );
  }, [item.id, redirect]);

  const handleClickMint = React.useCallback(() => {
    open();
    if (groupId && hubGroupId) {
      mintNft(hubGroupId, groupId, window.location.href, item?.id);
    }
  }, [groupId, hubGroupId, item.id, open]);

  if (!item) {
    return null;
  }

  return (
    <NFTItemCellWrapper role="button" onClick={handleClick}>
      <Thumbnail
        id={item.id}
        thumbnailUrl={
          !isMobile ? item.itemPreviewUrl : item.itemStaticPreviewUrl
        }
      />
      {isLoading ? (
        <>
          <NFTItemCellBody>
            <NFTItemCellBodySkeleton />
          </NFTItemCellBody>
        </>
      ) : (
        <Body
          alignItems={alignItems}
          item={item}
          config={config}
          schedule={schedule}
          contract={contract}
          disableClickCollectionName={disableClickCollectionName}
          onMint={handleClickMint}
        />
      )}
    </NFTItemCellWrapper>
  );
};
