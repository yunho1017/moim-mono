import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { px2rem } from "common/helpers/rem";
import { H8Bold } from "common/components/designSystem/typos";

export const Wrapper = styled.div<{
  visibleTopNavigation: boolean;
}>`
  display: flex;
  align-items: center;
  min-height: ${px2rem(44)};

  padding: ${px2rem(10)} ${px2rem(16)};

  ${props => {
    let palette = props.theme.getTopAreaElementPalette("background");
    if (props.visibleTopNavigation) {
      palette = props.theme.getSideAreaElementPalette("background");
    }

    return css`
      background-color: ${palette.color};
      ${palette.color === "rgba(255,255,255,1.00)" &&
        css`
          border-right: ${px2rem(1)} solid
            ${props.theme.colorV2.colorSet.grey50};
        `}
    `;
  }}
`;

export const Right = styled.div`
  margin-left: ${px2rem(10)};
`;

export const Left = styled.div`
  width: ${px2rem(24)};
  height: ${px2rem(24)};
`;

export const MoimName = styled(H8Bold)<{
  visibleTopNavigation: boolean;
  isChildMoimText: boolean;
}>`
  margin-left: ${px2rem(14)};
  flex: 1;
  min-width: 0;

  ${props => {
    let moimNamePalette = props.theme.getTopAreaElementPalette("moimNameText");
    if (props.isChildMoimText) {
      moimNamePalette = props.theme.getSideAreaElementPalette(
        "childMoimNameText",
      );
    }

    return css`
      color: ${moimNamePalette.color ?? moimNamePalette.fog800};
    `;
  }}
`;

const moimNameWrapperStyle = css`
  flex: 1;
  min-width: 0;
`;

export const LinkWrapper = styled(Link)`
  ${moimNameWrapperStyle}
`;
