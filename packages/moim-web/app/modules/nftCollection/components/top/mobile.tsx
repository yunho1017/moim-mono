import * as React from "react";
import { FormattedMessage } from "react-intl";
// components
import Banner from "./components/banner";
import Owner from "./components/owner";
import Description from "app/modules/nftCollection/components/description";
import HeaderButtons from "./components/buttons";
import HolderList from "../holderList";
// style
import {
  CollectionName,
  SymbolName,
  TopWrapper,
  InfoItem,
  InfoCnt,
  InfoTitle,
  InfoWrapper,
  TopContainer,
} from "./styled";
import { NFT_COLLECTION_MAX_TOTAL } from "../../context";

interface IProps {
  contract: Moim.NFT.IContract;
  totalOwnersCnt: number;
  totalItemsCnt: number;
  contractAddress?: Moim.Id;
  contractName?: string;
  symbol?: string;
  name?: string;
  createdBy?: Moim.NFT.IContractOwner;
  ownedByAddress?: string;
  banner?: Moim.NFT.IResource;
  representResources?: Moim.NFT.IResource[];
  network?: Moim.Community.IBlockchainType;
  onSelectOwnersTab(): void;
  onSelectItemsTab(): void;
}

const MobileTop: React.FC<IProps> = ({
  contract,
  totalOwnersCnt,
  totalItemsCnt,
  contractAddress,
  contractName,
  symbol,
  name,
  createdBy,
  ownedByAddress,
  banner,
  representResources,
  network,
  onSelectOwnersTab,
  onSelectItemsTab,
}) => (
  <TopWrapper>
    <TopContainer>
      <Banner
        bannerUrl={banner?.url}
        representImgUrl={representResources?.[0].previewUrl}
        headerButtonElement={
          <HeaderButtons
            contractName={contractName}
            contractAddress={contractAddress}
            network={network}
          />
        }
      />
      <InfoWrapper>
        <InfoItem role="button" onClick={onSelectOwnersTab}>
          <InfoCnt>
            {/* Currently, max 10000 is supported by backend */}
            {totalOwnersCnt > NFT_COLLECTION_MAX_TOTAL
              ? `${NFT_COLLECTION_MAX_TOTAL}+`
              : `${totalOwnersCnt}`}
          </InfoCnt>
          <InfoTitle>
            <FormattedMessage id="nft_collection_show_info_owners" />
          </InfoTitle>
        </InfoItem>
        <InfoItem role="button" onClick={onSelectItemsTab}>
          <InfoCnt>{totalItemsCnt}</InfoCnt>
          <InfoTitle>
            <FormattedMessage
              id="nft_collection_show_info_items"
              values={{ count: totalItemsCnt ?? 0 }}
            />
          </InfoTitle>
        </InfoItem>
      </InfoWrapper>
    </TopContainer>
    <SymbolName>{symbol ?? ""}</SymbolName>
    <CollectionName>{name ?? ""}</CollectionName>
    {(createdBy || ownedByAddress) && network && (
      <Owner
        ownerId={createdBy?.profileId ?? createdBy?.userId}
        ownerAddress={ownedByAddress}
        network={network}
      />
    )}
    <Description value={contract?.description ?? ""} />
    <HolderList />
  </TopWrapper>
);

export default MobileTop;
