import React from "react";

// hooks
import useRedirect from "common/hooks/useRedirect";
// helpers
import { MoimURL } from "common/helpers/url";
// components
import Media from "./components/media";
import SubMedia from "./components/subMedia";
import { Spacer } from "common/components/designSystem/spacer";
import CollectionName from "./components/collectionName";
import Name from "./components/name";
import Owner from "./components/owner";
import Price from "./components/price";
import { DefaultDivider } from "common/components/divider";
// style
import { Left, Right, Wrapper } from "./styled";

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
  mediaUrl,
  mediaMetadata,
  mediaPreviewUrl,
  subMediaMetadata,
  subMediaTitle,
}) => {
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
        {ownerId ? (
          <Owner
            ownerId={ownerId}
            ownerUserId={ownerUserId}
            network={network}
          />
        ) : (
          <Spacer value={16} />
        )}
        {price !== undefined && (
          <div>
            <DefaultDivider />
            <Spacer value={8} />
            <Price network={network} price={price} currency={currency} />
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
