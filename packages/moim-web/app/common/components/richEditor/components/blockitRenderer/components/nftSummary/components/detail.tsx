import * as React from "react";
import { CompactWrapper, CollectionName, ItemName } from "./styled";
import { useActions } from "app/store";
import { ActionCreators as NftActionCreators } from "app/actions/nft";
// helpers
import { mintNft } from "app/common/helpers/nft";
import { MoimURL } from "common/helpers/url";
import useCurrentHubGroup from "common/hooks/useCurrentHubGroup";
// hooks
import useCurrentGroup from "common/hooks/useCurrentGroup";
import useRedirect from "common/hooks/useRedirect";
// components
import ShavedText from "common/components/shavedText";
import Price from "./price";
import Owner from "./owner";
import Period from "./period";
import Button from "./button";

interface IProps {
  contractId: Moim.Id;
  collectionName: string;
  itemId: Moim.Id;
  itemName: string;
  itemStatus: Moim.NFT.INftStatus;
  ownerAddress?: string;
  ownerId?: Moim.Id;
  price: number;
  currency: string;
  network: Moim.Community.IBlockchainType;
  mintable: boolean;
  scheduleMintable: boolean;
  startAt: number;
  endAt: number;
  config: Moim.NFT.INftSummaryShowConfig;
}

const Compact = ({
  contractId,
  collectionName,
  itemId,
  itemName,
  itemStatus,
  ownerId,
  ownerAddress,
  price,
  currency,
  network,
  mintable,
  scheduleMintable,
  startAt,
  endAt,
  config,
}: IProps) => {
  const currentGroup = useCurrentGroup();
  const currentHubGroup = useCurrentHubGroup();

  const redirect = useRedirect();
  const { open } = useActions({
    open: NftActionCreators.openMintRedirectLoadingDialog,
  });

  const handleRedirectCollection: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
    e => {
      e.preventDefault();
      e.stopPropagation();
      redirect(
        new MoimURL.NftCollectionShow({
          contractId,
        }).toString(),
      );
    },
    [redirect, contractId],
  );

  const handleClickMint: React.MouseEventHandler<
    HTMLButtonElement | HTMLAnchorElement
  > = React.useCallback(
    async e => {
      e.preventDefault();
      e.stopPropagation();
      open();
      if (currentGroup?.id && currentHubGroup?.id) {
        mintNft(
          currentHubGroup?.id,
          currentGroup?.id,
          window.location.href,
          itemId,
        );
      }
    },
    [currentGroup?.id, currentHubGroup?.id, itemId, open],
  );

  return (
    <CompactWrapper>
      <CollectionName onClick={handleRedirectCollection}>
        {config.showCollectionName && (
          <ShavedText value={collectionName} line={1} />
        )}
      </CollectionName>
      <ItemName>
        {config.showName && <ShavedText value={itemName} line={1} />}
      </ItemName>
      {config.showOwner && (
        <Owner
          ownerId={ownerId}
          ownerAddress={ownerAddress}
          network={network}
        />
      )}
      {config.showPrice && (
        <Price network={network} price={price} currency={currency} />
      )}
      {config?.showMintButton && (
        <Button
          itemMintable={mintable}
          itemStatus={itemStatus}
          scheduleMintable={scheduleMintable}
          mintingStartAt={startAt}
          mintingEndAt={endAt}
          onMint={handleClickMint}
        />
      )}
      {config.showPeriod && <Period startAt={startAt} endAt={endAt} />}
    </CompactWrapper>
  );
};

export default React.memo(Compact);
