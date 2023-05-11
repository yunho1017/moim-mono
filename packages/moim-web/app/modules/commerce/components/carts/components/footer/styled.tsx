import styled, { css } from "styled-components";
import CoinIconBase from "@icon/24-coin.svg";
import { px2rem } from "common/helpers/rem";
import {
  B3RegularStyle,
  H4BoldStyle,
  H8BoldStyle,
  H10BoldStyle,
  H8Bold,
} from "common/components/designSystem/typos";
import { DefaultDivider } from "app/common/components/divider/styled";
import ChipBase from "common/components/chips";
import { FlatButton } from "common/components/designSystem/buttons";
import { MEDIA_QUERY } from "common/constants/responsive";

const MOBILE_BOTTOM_STICKY_HEIGHT = 68;

export const Divider = styled(DefaultDivider)`
  margin: ${px2rem(8)} 0;
`;

export const FooterWrapper = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};

  padding: 0 ${px2rem(16)} ${px2rem(24)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: ${px2rem(8)} ${px2rem(16)} ${px2rem(16)};
    margin-bottom: ${px2rem(MOBILE_BOTTOM_STICKY_HEIGHT)};
  }
`;

export const TextWrap = styled.div`
  display: flex;
  padding: ${px2rem(6)} 0;

  .left {
    align-self: flex-start;
    flex: 1;
    width: 100%;
    min-width: 0;
    color: ${props => props.theme.colorV2.colorSet.grey600};
    ${B3RegularStyle}
  }

  .right {
    align-self: flex-end;
    color: ${props => props.theme.colorV2.colorSet.grey800};
    ${H10BoldStyle}
    font-weight: ${props => props.theme.font.bolder};
  }
`;

export const TotalPrice = styled.div`
    display: flex;
    align-items: center;
    padding: ${px2rem(12)} 0 ${px2rem(6)};
    color: ${props => props.theme.colorV2.colorSet.grey800};

    .left {
      ${H8BoldStyle};
      flex: 1;
      min-width: 0;
      color: ${props => props.theme.colorV2.colorSet.grey800};
    }

    .right {
      color: ${props => props.theme.colorV2.colorSet.grey800};
      ${H4BoldStyle}
      font-weight: ${props => props.theme.font.bolder};
    }
`;

export const PointWrapper = styled.div`
  ${TextWrap} {
    padding: ${px2rem(8)} 0;
  }
`;

const PointChipStyle = css`
  color: ${props => props.theme.colorV2.colorSet.grey600};
  background-color: ${props => props.theme.colorV2.colorSet.grey50};
  border-radius: ${px2rem(10)};
  text-transform: uppercase;
  margin: ${px2rem(2)} 0;
  ${B3RegularStyle}
`;

export const PointContainer = styled(ChipBase).attrs({
  size: "small",
  shape: "round",
  overrideStyle: PointChipStyle,
})``;

export const CoinIcon = styled(CoinIconBase).attrs({ size: "xs" })`
  margin-right: ${px2rem(2)};
`;

export const BuyNowButton = styled(FlatButton).attrs({ size: "l" })`
  width: 100%;
`;

export const BottomStickyContainer = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  box-shadow: ${props => props.theme.shadow.whiteElevated};
  width: 100%;
  height: ${px2rem(MOBILE_BOTTOM_STICKY_HEIGHT)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  z-index: ${props => props.theme.zIndexes.default};
  padding: ${px2rem(10)} ${px2rem(16)};
  bottom: 0;
  left: 0;
  right: 0;
`;

export const Shell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  width: 100%;
  height: 100%;
  flex: 1;
  min-width: 0;
`;

export const MobileTotalPrice = styled(H8Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};

  &.small {
    ${H10BoldStyle}
  }
`;
