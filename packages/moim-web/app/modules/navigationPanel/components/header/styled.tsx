import styled, { css } from "styled-components";
import { B4Regular } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.header`
  width: 100%;
`;

const MemberCountMessage = styled(B4Regular).attrs({
  role: "button",
})``;

export const GroupInfoMemberCountMessage = styled(MemberCountMessage)<{
  visibleTopNavigation: boolean;
}>`
  padding: ${px2rem(8)} ${px2rem(16)};
  ${props => {
    let palette = props.theme.getTopAreaElementPalette("menuText");
    if (props.visibleTopNavigation) {
      palette = props.theme.getSideAreaElementPalette("menuText");
    }

    return css`
      background-color: ${palette.color};
      color: ${palette.fog600};
      ${props.theme.getSideAreaElementPalette("background").color ===
        "rgba(255,255,255,1.00)" &&
        css`
          border-right: ${px2rem(1)} solid
            ${props.theme.colorV2.colorSet.grey50};
        `}
    `;
  }}
`;

export const JoinButtonWrapper = styled.div<{
  visibleTopNavigation: boolean;
}>`
  padding: ${px2rem(4)} ${px2rem(16)};
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
