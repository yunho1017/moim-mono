import styled from "styled-components";
import { rgba } from "polished";
import { px2rem } from "common/helpers/rem";
import { H4Bold, B1Regular } from "common/components/designSystem/typos";
import { useSingleLineStyle } from "common/components/designSystem/styles";

export const BackgroundColor = styled.div<{ color?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: ${props =>
    props.color
      ? props.theme.getColorByAlias(props.color)
      : props.theme.colorV2.accent};
  z-index: ${props => props.theme.zIndexes.default};
`;

export const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: ${props => props.theme.zIndexes.default + 1};
  object-fit: cover;
`;

export const ImageDim = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-image: ${props => `linear-gradient(
    to bottom right,
    ${rgba(props.theme.colorV2.colorSet.white1000, 0.5)} 0%,
    ${rgba(props.theme.colorV2.colorSet.white1000, 0.2)} 80%,
    transparent 100%
  )`};
  z-index: ${props => props.theme.zIndexes.default + 2};
  object-fit: cover;
`;

export const Title = styled(H4Bold)`
  color: ${props => rgba(props.theme.colorV2.colorSet.white1000, 0.86)};
  ${useSingleLineStyle}
`;
export const Description = styled(B1Regular)`
  white-space: pre-line;
  color: ${props => rgba(props.theme.colorV2.colorSet.white1000, 0.86)};
`;

export const HeadContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  padding: ${px2rem(25)} ${px2rem(16)} 0;
  z-index: ${props => props.theme.zIndexes.default + 3};

  ${Title} + ${Description} {
    margin-top: ${px2rem(8)};
  }
`;

export const Head = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3/1;
`;
