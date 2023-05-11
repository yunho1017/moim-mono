import React from "react";
import styled from "styled-components";

import { Spacer, SpacerVertical } from "common/components/designSystem/spacer";
import { B2Regular, B4Regular } from "common/components/designSystem/typos";
import { SkeletonBox } from "common/components/skeleton";

import { px2rem } from "common/helpers/rem";

const Wrapper = styled.div`
  padding: ${px2rem(14)} ${px2rem(16)};
  display: flex;
  align-items: flex-start;
`;

const Image = styled.img`
  width: ${px2rem(36)};
  height: ${px2rem(36)};
  border-radius: ${px2rem(2)};
  object-fit: cover;
`;

const Texts = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
`;

const Name = styled(B2Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;
const ContractName = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

interface PropsType {
  tokenId: string;
  name: string;
  previewUrl: string;
  contractName: Moim.Id;
  groupId: string;
}

export const NftItem: React.FC<PropsType> = React.memo(
  ({ contractName, tokenId, name, previewUrl, groupId }) => {
    const handleClick = React.useCallback(() => {
      window.location.href = `/communities/${groupId}/nft/${tokenId}`;
    }, [groupId, tokenId]);

    return (
      <Wrapper role="button" onClick={handleClick}>
        <Image src={previewUrl} alt={name} />
        <SpacerVertical value={12} />
        <Texts>
          <Name>{name}</Name>
          <Spacer value={2} />
          <ContractName>{contractName}</ContractName>
        </Texts>
      </Wrapper>
    );
  },
);

export const Skeleton = () => (
  <Wrapper>
    <SkeletonBox width={px2rem(36)} height={px2rem(36)} />
    <SpacerVertical value={12} />
    <Texts>
      <SkeletonBox width="40%" height={px2rem(22)} />
      <Spacer value={2} />
      <SkeletonBox width="45%" height={px2rem(16)} />
    </Texts>
  </Wrapper>
);
