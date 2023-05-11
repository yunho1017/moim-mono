import React from "react";
import styled from "styled-components";
import { B4Regular } from "common/components/designSystem/typos";
import { Spacer } from "common/components/designSystem/spacer";
import ShavedText from "common/components/shavedText";
import { SkeletonRatioBox } from "common/components/skeleton";

import { px2rem } from "common/helpers/rem";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  transition: opacity 200ms ease-in;
  &:hover {
    opacity: 0.6;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%;
  border-radius: ${px2rem(2)};
  overflow: hidden;
`;

const StyledImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Text = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey600};
  text-align: center;
`;

interface PropsType {
  id: Moim.Id;
  contractName: string;
  name: string;
  image: string;
  groupId: string;
}

export const NFTItem: React.FC<PropsType> = React.memo(
  ({ id, contractName, name, image, groupId }) => {
    const handleClick = React.useCallback(() => {
      window.location.href = `/communities/${groupId}/nft/${id}`;
    }, [groupId, id]);

    return (
      <Wrapper role="button" onClick={handleClick}>
        <ImageWrapper>
          <StyledImage src={image} alt={name} />
        </ImageWrapper>
        <Spacer value={6} />
        <Text>
          <ShavedText value={name} line={1} />
        </Text>

        <Text>
          <ShavedText value={contractName} line={1} />
        </Text>
      </Wrapper>
    );
  },
);

export const Skeleton: React.FC = React.memo(() => (
  <Wrapper>
    <SkeletonRatioBox ratio="1:1" />
  </Wrapper>
));
