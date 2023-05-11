import * as React from "react";
// helper
import { MoimURL } from "common/helpers/url";
import useRedirect from "common/hooks/useRedirect";
// components
import ShavedText from "common/components/shavedText";
import Owner from "./components/owner";
import Period from "./components/period";
import Price from "./components/price";
// style
import {
  NFTItemCellBody,
  NFTItemCellCollection,
  NFTItemCellName,
  TopWrapper,
  BottomWrapper,
  BottomContainer,
} from "./styled";
import Button from "../button";

interface IProps {
  alignItems?: "flex-start" | "center" | "flex-end";
  item: Moim.NFT.INftDetail;
  config?: Moim.NFT.INftItemShowConfig;
  schedule?: Moim.NFT.ISchedule;
  contract?: Moim.NFT.IContract;
  disableClickCollectionName: boolean;
  onMint(): void;
}

const Body: React.FC<IProps> = ({
  alignItems = "flex-start",
  item,
  config,
  schedule,
  contract,
  disableClickCollectionName,
  onMint,
}: IProps) => {
  const redirect = useRedirect();

  const handleRedirectCollection: React.MouseEventHandler<HTMLDivElement> = React.useCallback(
    e => {
      if (contract?.id && !disableClickCollectionName) {
        e.stopPropagation();
        redirect(
          new MoimURL.NftCollectionShow({
            contractId: contract?.id,
          }).toString(),
        );
      }
    },
    [contract?.id, disableClickCollectionName, redirect],
  );

  if (!contract) return null;

  return (
    <NFTItemCellBody
      alignItems={alignItems}
      textAlignment={config?.textAlignment?.toLowerCase() ?? "LEFT"}
    >
      <TopWrapper>
        {config?.showCollectionName && (
          <NFTItemCellCollection onClick={handleRedirectCollection}>
            {contract?.name}
          </NFTItemCellCollection>
        )}
        {config?.showName && (
          <NFTItemCellName>
            <ShavedText value={item?.name} line={2} />
          </NFTItemCellName>
        )}
      </TopWrapper>
      <BottomWrapper>
        <BottomContainer>
          {config?.showPrice && schedule && (
            <Price
              network={contract?.network}
              price={schedule?.price}
              currency={contract?.currency}
              justifyContent={alignItems}
            />
          )}
          {config?.showOwner && (
            <Owner
              ownerId={item?.ownedBy?.userId}
              ownedByAddress={item?.ownedByAddress}
              justifyContent={alignItems}
            />
          )}
          {config?.showPeriod && schedule && (
            <Period
              mintingStartAt={schedule?.mintingStartAt}
              mintingEndAt={schedule?.mintingEndAt}
            />
          )}
          {schedule && (
            <Button
              showMintButton={config?.showMintButton}
              itemMintable={item.mintable}
              itemStatus={item.status}
              scheduleMintable={schedule?.mintable}
              mintingStartAt={schedule?.mintingStartAt}
              mintingEndAt={schedule?.mintingEndAt}
              onMint={onMint}
            />
          )}
        </BottomContainer>
      </BottomWrapper>
    </NFTItemCellBody>
  );
};

export default React.memo(Body);
