import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { H8Bold } from "common/components/designSystem/typos";

export const LogoImageWrapper = styled.div`
  width: 100%;
  min-width: ${px2rem(100)};
  max-width: ${px2rem(160)};
  display: flex;
  align-items: center;
`;
export const LogoImage = styled.div<{ src: string }>`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: left;
  background-image: url(${props => props.src});
`;

export const MoimProfileWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const MoimName = styled(H8Bold)`
  color: ${props =>
    props.theme.getThemeElementColor({
      targetColor: "fog800",
      elementPalette: { type: "topArea", key: "moimNameText" },
      fallback: props.theme.colorV2.colorSet.grey800,
    })};
`;
