import * as React from "react";
import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B3RegularStyle } from "common/components/designSystem/typos";
import { FormattedMessage } from "react-intl";
import { NFT_COLLECTION_MAX_TOTAL } from "app/modules/nftCollection/context";

const StatisticsWrapper = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${B3RegularStyle}
`;

const StatisticsItem = styled.div`
  &:first-child::after {
    content: "";
    display: inline;
    padding-right: ${px2rem(4)};
  }
`;

type IProps = Omit<Moim.NFT.IContractStatistics, "mintedItemCount">;

const Statistics: React.FC<IProps> = ({ itemCount, ownerCount }: IProps) => (
  <StatisticsWrapper>
    <StatisticsItem>
      {ownerCount > NFT_COLLECTION_MAX_TOTAL
        ? `${NFT_COLLECTION_MAX_TOTAL}+`
        : `${ownerCount}`}{" "}
      <FormattedMessage
        id="nft_collection_show_info_owners"
        values={{ count: ownerCount ?? 0 }}
      />
    </StatisticsItem>
    <StatisticsItem>
      {`・ ${itemCount}`}{" "}
      <FormattedMessage
        id="nft_collection_show_info_items"
        values={{ count: itemCount ?? 0 }}
      />
    </StatisticsItem>
  </StatisticsWrapper>
);

export default React.memo(Statistics);
