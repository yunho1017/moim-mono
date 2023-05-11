import * as React from "react";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
// constant
import { MEDIA_QUERY } from "common/constants/responsive";
// helpers
import { px2rem } from "common/helpers/rem";
// hooks
import { useIntlShort } from "common/hooks/useIntlShort";
// components
import { SkeletonBox } from "common/components/skeleton";
import { Spacer } from "common/components/designSystem/spacer";
import BlockchainExternalLink from "app/modules/nft/components/blockchainExternalLink";
import { Desc, DescWrapper } from "../description";
import { DetailItem } from "./item";
// styled
import { SectionTitle, WideDivider } from "../styled";

const Wrapper = styled.div`
  width: 100%;
`;

const DetailList = styled.div`
  width: 100%;
  padding: ${px2rem(8)} 0;
  border-radius: ${px2rem(4)};
  border: solid 1px ${props => props.theme.colorV2.colorSet.grey50};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  display: flex;
  flex-direction: column;
`;

const DetailListWrapper = styled.div`
  width: 100%;
  padding: ${px2rem(16)} ${px2rem(16)} 0;
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: ${px2rem(8)} ${px2rem(16)};
  }
`;

interface PropsType {
  contractAddress: string;
  tokenId: number;
  tokenStandard?: string;
  blockchain: Moim.Community.IBlockchainType;
}

const Detail: React.FC<PropsType> = ({
  contractAddress,
  tokenId,
  tokenStandard,
  blockchain,
}) => {
  const intl = useIntlShort();

  return (
    <Wrapper>
      <WideDivider />
      <SectionTitle>
        <FormattedMessage id="nft_show_details_title" />
      </SectionTitle>
      <DetailListWrapper>
        <DetailList>
          <DetailItem
            label={intl("nft_show_details_contract_address")}
            value={
              <BlockchainExternalLink
                network={blockchain}
                address={contractAddress}
              />
            }
          />
          <DetailItem
            label={intl("nft_show_details_token_id")}
            value={tokenId}
          />
          <DetailItem
            label={intl("nft_show_details_token_standard")}
            value={tokenStandard}
          />
          <DetailItem
            label={intl("nft_show_details_block_chain")}
            value={blockchain}
          />
        </DetailList>
      </DetailListWrapper>
    </Wrapper>
  );
};

export default React.memo(Detail);

export const DetailSkeleton = React.memo(() => (
  <Wrapper>
    <SectionTitle>
      <FormattedMessage id="nft_show_details_title" />
    </SectionTitle>
    <DescWrapper>
      <Desc>
        <Spacer value={10} />
        <SkeletonBox height={px2rem(20)} width="60%" />
        <Spacer value={10} />
        <SkeletonBox height={px2rem(20)} width="90%" />
        <Spacer value={10} />
        <SkeletonBox height={px2rem(20)} width="30%" />
      </Desc>
    </DescWrapper>
  </Wrapper>
));
