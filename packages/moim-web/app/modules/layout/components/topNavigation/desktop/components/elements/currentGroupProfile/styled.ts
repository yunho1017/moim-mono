import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { H8Bold } from "common/components/designSystem/typos";

export const LogoImageWrapper = styled.div`
  width: ${px2rem(194)};
  padding: 0 ${px2rem(16)};
  display: flex;
  align-items: center;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: ${px2rem(119)};
    padding: 0;
  }
`;
export const LogoImage = styled.img`
  max-width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const MoimNameWrapper = styled.div<{ visibleMoimName: boolean }>`
  display: flex;
  align-items: center;
  padding: 0 ${px2rem(16)};
  width: ${props => (props.visibleMoimName ? px2rem(230) : px2rem(68))};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: ${px2rem(68)};
    padding: 0;
  }
`;
export const MoimName = styled(H8Bold)`
  flex: 1;
  min-width: 0;
  color: ${props => {
    const palette = props.theme.getTopAreaElementPalette("moimNameText");
    return palette.color ?? palette.fog800;
  }};
  margin-left: ${px2rem(12)};
`;
