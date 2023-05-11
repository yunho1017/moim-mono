import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B4RegularStyle } from "common/components/designSystem/typos";

const alertBadgeHeight = px2rem(18);

export const useAlertThemeStyle = css<{
  backgroundColor?: string;
  textColor?: string;
}>`
  ${props => {
    const palette = props.theme.getAlertElementPalette("alertBadge");

    return css`
      background-color: ${props.backgroundColor ??
        palette.color ??
        props.theme.color.red700};
      color: ${props.textColor ??
        (palette.color
          ? palette.fog900
          : props.theme.colorV2.colorSet.white900)};
    `;
  }}
`;

export const AlertBadge = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: ${px2rem(18)};
  height: ${alertBadgeHeight};
  border-radius: ${px2rem(10)};
  padding: 0 ${px2rem(6)};

  ${B4RegularStyle};
`;

export const CommonBadge = styled(AlertBadge)<{
  backgroundColor?: string;
  textColor?: string;
}>`
  ${useAlertThemeStyle};
`;

export const CommonUnreadMark = styled.div<{
  backgroundColor?: string;
  textColor?: string;
}>`
  ${useAlertThemeStyle};

  width: ${px2rem(6)};
  height: ${px2rem(6)};
  border-radius: 50%;
`;
