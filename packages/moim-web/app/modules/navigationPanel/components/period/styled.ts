import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B3Regular } from "common/components/designSystem/typos";
import ExpandIconBase from "@icon/18-downarrow-g.svg";

export const Header = styled(B3Regular)`
  ${props => {
    const palette = props.theme.getSideAreaElementPalette("categoryTitleText");
    return css`
      color: ${palette.color ?? palette.fog400};
    `;
  }};

  & > * + * {
    &::before {
      content: "|";
      margin: 0 ${px2rem(2)};
    }
  }
`;

export const boxWrapperStyle = css`
  width: 100%;
`;

export const boxHeaderWrapperStyle = css`
  width: 100%;
  height: ${px2rem(42)};
  padding: 0 ${px2rem(4)} 0 ${px2rem(16)};
`;

export const boxBodyWrapperStyle = css`
  width: 100%;
  padding: 0 ${px2rem(16)} ${px2rem(16)};
`;

export const ArrowIcon = styled(ExpandIconBase).attrs<{ iconSize?: number }>(
  props => {
    const palette = props.theme.getSideAreaElementPalette("categoryTitleText");
    return {
      size: "s",
      touch: 42,
      iconColor: palette.color ?? palette.fog400,
    };
  },
)``;

export const Wrapper = styled.div`
  width: 100%;
  ${props =>
    props.theme.getSideAreaElementPalette("background").color ===
      "rgba(255,255,255,1.00)" &&
    css`
      border-right: ${px2rem(1)} solid ${props.theme.colorV2.colorSet.grey50};
    `}
`;

export const DisableSchedulerWrapper = styled.div`
  padding: ${px2rem(8)} ${px2rem(16)} 0;
`;
