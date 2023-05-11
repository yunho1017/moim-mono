import styled, { FlattenInterpolation } from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  H2BoldStyle,
  H4BoldStyle,
  H8BoldStyle,
  H8RegularStyle,
  H9BoldStyle,
  H10BoldStyle,
  B1RegularStyle,
  B2RegularStyle,
  B3RegularStyle,
  B4RegularStyle,
} from "common/components/designSystem/typos";
import { CommonBadge } from "common/components/alertBadge";
import { useHoverStyle } from "common/components/designSystem/styles";
import RightArrow from "@icon/18-rightarrow-g.svg";
import { marginToPadding } from "../helper/blockitStyleHelpers";

export const Wrapper = styled.div<{
  overrideStyle?: FlattenInterpolation<any>;
  margin?: Moim.Blockit.IBlockitMargin;
}>`
  width: 100%;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  ${props => marginToPadding(props.margin)};
  ${props => props.overrideStyle};
`;

export const Left = styled.div.attrs({ role: "button" })`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${px2rem(42)};
  height: ${px2rem(42)};

  margin-left: ${px2rem(7)};

  > img {
    width: ${px2rem(24)};
    height: ${px2rem(24)};
  }
`;

export const MoreIcon = styled(RightArrow).attrs({
  role: "button",
  size: "xs",
  touch: 42,
})``;

export const MoreIconWrapper = styled.div`
  margin-right: ${px2rem(3)};
`;

export const Caption = styled.div`
  ${B4RegularStyle};
  color: ${props => props.theme.colorV2.colorSet.grey300};
  margin-left: ${px2rem(8)};
`;

export const BadgeCount = styled(CommonBadge).attrs(props => ({
  backgroundColor: props.theme.color.blue900,
  textColor: props.theme.colorV2.colorSet.white1000,
}))`
  margin-right: ${px2rem(16)};
  margin-left: ${px2rem(9)};
`;

export const Center = styled.div<{ textStyle?: Moim.Blockit.TEXT_SUB_TYPE }>`
  width: 100%;
  flex: 1;
  min-width: 0;
  margin-left: ${px2rem(16)};
  ${props => {
    switch (props.textStyle) {
      case "h1": {
        return H2BoldStyle;
      }
      case "h2": {
        return H4BoldStyle;
      }
      case "h3": {
        return H8BoldStyle;
      }
      case "h4": {
        return H8RegularStyle;
      }
      case "h5": {
        return H8BoldStyle;
      }
      case "h6": {
        return H9BoldStyle;
      }
      case "h7": {
        return H10BoldStyle;
      }

      case "body1": {
        return B1RegularStyle;
      }
      case "body3": {
        return B3RegularStyle;
      }

      case "caption": {
        return B4RegularStyle;
      }

      case "body2":
      default:
        return B2RegularStyle;
    }
  }}
`;

export const MenuWrapper = styled.div`
  width: 100%;
  height: ${px2rem(42)};
  display: flex;
  align-items: center;

  ${Left} + ${Center} {
    margin-left: ${px2rem(3)};
  }

  ${useHoverStyle};
`;
