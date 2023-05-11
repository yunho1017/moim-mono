import styled from "styled-components";
import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";
import { H8Bold } from "common/components/designSystem/typos";
import { BG_LEVEL_BACKGROUND_CLASS_NAME } from "common/components/designSystem/BGLevel";

export const MobileWrapper = styled.div.attrs({
  className: BG_LEVEL_BACKGROUND_CLASS_NAME,
})`
  width: 100%;
  padding: ${px2rem(10)} ${px2rem(16)};
  display: flex;
  align-items: center;
  gap: ${px2rem(8)};
  position: sticky;
  top: 0;
`;

export const DesktopWrapper = styled.div`
  width: 100%;
  padding: 0 ${px2rem(8)};
  display: flex;
  align-items: center;
  gap: ${px2rem(8)};
`;

export const CoinName = styled(H8Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const CoinPreviewImage = styled.img`
  width: ${px2rem(18)};
  height: ${px2rem(18)};
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: ${px2rem(24)};
    height: ${px2rem(24)};
  }
`;
