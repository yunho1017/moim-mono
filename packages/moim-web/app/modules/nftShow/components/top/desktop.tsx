import React from "react";

import { useActions } from "app/store";
import { ActionCreators as NftActionCreators } from "app/actions/nft";
// hooks
import useRedirect from "common/hooks/useRedirect";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useCurrentHubGroup from "common/hooks/useCurrentHubGroup";
// helpers
import { mintNft } from "app/common/helpers/nft";
import { MoimURL } from "common/helpers/url";
// components
import Media from "./components/media";
import SubMedia from "./components/subMedia";
import { Spacer } from "common/components/designSystem/spacer";
import CollectionName from "./components/collectionName";
import Name from "./components/name";
import Owner from "./components/owner";
import Price from "./components/price";
import Period from "./components/period";
import Button from "./components/button";
// style
import { BoxWrapper, Left, Right, Wrapper } from "./styled";

interface PropsType {
  contractId?: Moim.Id;
  tokenId: string;
  collectionName: string;
  name: string;
  ownerId: string;
  ownerUserId?: string;
  price?: number;
  currency?: string;
  network: Moim.Community.IBlockchainType;
  scheduleMintable: boolean;
  mintable: boolean;
  status: Moim.NFT.INftStatus;
  startAt?: number;
  endAt?: number;
  mediaUrl?: string;
  mediaMetadata?: Moim.NFT.INftMetaData;
  mediaPreviewUrl?: string;
  subMediaMetadata?: Moim.NFT.IResource[];
  subMediaTitle?: Moim.NFT.ISubMediaTitle[];
}

const Top: React.FC<PropsType> = ({
  contractId,
  tokenId,
  collectionName,
  name,
  ownerId,
  ownerUserId,
  price,
  currency,
  network,
  scheduleMintable,
  mintable,
  status,
  startAt,
  endAt,
  mediaUrl,
  mediaMetadata,
  mediaPreviewUrl,
  subMediaMetadata,
  subMediaTitle,
}) => {
  const currentGroup = useCurrentGroup();
  const currentHubGroup = useCurrentHubGroup();
  const { open } = useActions({
    open: NftActionCreators.openMintRedirectLoadingDialog,
  });
  const redirect = useRedirect();

  const handleRedirectCollection = React.useCallback(() => {
    if (contractId) {
      redirect(
        new MoimURL.NftCollectionShow({
          contractId,
        }).toString(),
      );
    }
  }, [redirect, contractId]);

  const handleClickMint = React.useCallback(() => {
    open();
    if (currentGroup?.id && currentHubGroup?.id) {
      mintNft(
        currentHubGroup?.id,
        currentGroup?.id,
        window.location.href,
        tokenId,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentGroup?.id, currentHubGroup?.id, open, tokenId]);

  return (
    <Wrapper>
      <Left>
        <Media
          key={mediaUrl}
          src={mediaUrl}
          alt={tokenId}
          metaData={mediaMetadata}
          poster={mediaPreviewUrl}
        />
      </Left>
      <Right>
        <CollectionName
          value={collectionName}
          onClick={handleRedirectCollection}
        />
        <Spacer value={8} />
        <Name value={name} />
        {ownerId && (
          <Owner
            ownerId={ownerId}
            ownerUserId={ownerUserId}
            network={network}
          />
        )}
        {price !== undefined && (
          <div>
            <Spacer value={16} />
            <BoxWrapper>
              <Price network={network} price={price} currency={currency} />
              <Button
                itemMintable={mintable}
                itemStatus={status ?? "CANDIDATE"}
                scheduleMintable={scheduleMintable}
                mintingStartAt={startAt ?? 0}
                mintingEndAt={endAt ?? 0}
                onMint={handleClickMint}
              />
              <Spacer value={9} />
              <Period startAt={startAt} endAt={endAt} />
            </BoxWrapper>
          </div>
        )}

        <SubMedia
          subItemMetadata={subMediaMetadata}
          subMediaTitle={subMediaTitle}
        />
      </Right>
    </Wrapper>
  );
};

export default React.memo(Top);
