import * as React from "react";
import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { sizeMap } from "common/components/userProfileImage/size";
import { H4BoldStyle } from "common/components/designSystem/typos";

const ImageStyle = css<{ shape?: "square" | "round" }>`
  object-fit: cover;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: ${props => (props.shape === "round" ? "50%" : px2rem(4))};
`;

export const Image = styled.img`
  ${ImageStyle};
`;

export const DefaultImage = styled.div`
  ${ImageStyle};
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: ${props =>
    `linear-gradient(to bottom, ${props.theme.colorV2.colorSet.grey50} 1%, ${props.theme.colorV2.colorSet.grey100})`};

  > span {
    ${H4BoldStyle};
    text-transform: uppercase;
    color: ${props => props.theme.colorV2.colorSet.grey300};
  }
`;

export const Wrapper = styled.div<{ size: Moim.DesignSystem.Size }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: ${props => px2rem(sizeMap.get(props.size)!)};
  height: ${props => px2rem(sizeMap.get(props.size)!)};
`;

interface ILetterImageProps {
  letter: string;
  size: Moim.DesignSystem.Size;
  url?: string;
}

const LetterImage: React.FC<ILetterImageProps> = ({ letter, size, url }) => {
  const content = React.useMemo(
    () =>
      url ? (
        <Image src={url} />
      ) : (
        <DefaultImage shape="round">
          <span>{letter}</span>
        </DefaultImage>
      ),
    [url, letter],
  );
  return <Wrapper size={size}>{content}</Wrapper>;
};

export default LetterImage;
