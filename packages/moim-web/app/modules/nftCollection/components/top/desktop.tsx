import * as React from "react";
import { FormattedMessage } from "react-intl";
// components
import Banner from "./components/banner";
import Owner from "./components/owner";
import { Spacer } from "common/components/designSystem/spacer";
import HeaderButtons from "./components/buttons";
// style
import {
  CollectionName,
  SymbolName,
  TopWrapper,
  Left,
  Right,
  CollectionInfo,
  InfoItem,
  InfoCnt,
  InfoTitle,
  InfoWrapper,
} from "./styled";
import { NFT_COLLECTION_MAX_TOTAL } from "../../context";

interface IProps {
  totalOwnersCnt: number;
  totalItemsCnt: number;
  contractAddress?: Moim.Id;
  contractName?: string;
  symbol?: string;
  name?: string;
  ownedByAddress?: string;
  createdBy?: Moim.NFT.IContractOwner;
  banner?: Moim.NFT.IResource;
  representResources?: Moim.NFT.IResource[];
  network?: Moim.Community.IBlockchainType;
  onSelectOwnersTab(): void;
  onSelectItemsTab(): void;
}

const DesktopTop: React.FC<IProps> = ({
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
    <Spacer value={16} />
    <Banner
      bannerUrl={banner?.url}
      representImgUrl={representResources?.[0].previewUrl}
    />
    <Spacer value={20} />
    <CollectionInfo>
      <Left>
        <SymbolName>{symbol ?? ""}</SymbolName>
        <CollectionName>{name ?? ""}</CollectionName>
        {(createdBy || ownedByAddress) && network && (
          <Owner
            ownerId={createdBy?.profileId ?? createdBy?.userId}
            ownerAddress={ownedByAddress}
            network={network}
          />
        )}
      </Left>
      <Right>
        <HeaderButtons
          contractName={contractName}
          contractAddress={contractAddress}
          network={network}
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
              <FormattedMessage
                id="nft_collection_show_info_owners"
                values={{ count: totalOwnersCnt ?? 0 }}
              />
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
      </Right>
    </CollectionInfo>
  </TopWrapper>
);

export default DesktopTop;
