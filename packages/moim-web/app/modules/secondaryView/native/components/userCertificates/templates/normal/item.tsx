import React from "react";
import styled from "styled-components";

import { SpacerVertical } from "common/components/designSystem/spacer";
import { B2Regular } from "common/components/designSystem/typos";
import { SkeletonBox } from "common/components/skeleton";

import { px2rem } from "common/helpers/rem";
import { CERTIFICATE_DETAIL_URL } from "common/components/cryptobadge/constants";

const Wrapper = styled.div`
  height: ${px2rem(72)};
  padding: ${px2rem(12)} ${px2rem(16)};
  display: flex;
  align-items: flex-start;
`;

const Image = styled.img`
  width: ${px2rem(48)};
  height: ${px2rem(48)};
  object-fit: cover;
`;

const Texts = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const Name = styled(B2Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

interface PropsType {
  id: Moim.Id;
  name: string;
  imageUri: string;
}

export const CertificateItem: React.FC<PropsType> = React.memo(
  ({ id, name, imageUri }) => {
    const handleClick = React.useCallback(() => {
      window.location.href = `${CERTIFICATE_DETAIL_URL}/${id}`;
    }, [id]);

    return (
      <Wrapper role="button" onClick={handleClick}>
        <Image src={imageUri} alt={name} />
        <SpacerVertical value={12} />
        <Texts>
          <Name>{name}</Name>
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
    </Texts>
  </Wrapper>
);
