import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { FlatButton } from "common/components/designSystem/buttons";

import { ThemeColorScaleTypes } from "app/enums";
const ButtonStyle = css`
  display: block;
  width: 100%;
  border-radius: ${px2rem(4)};
`;

export const FlatJoinButton = styled(FlatButton)<{
  joinButtonScale: Moim.Enums.ThemeColorScaleType;
}>`
  ${props => {
    const palette = props.theme.getSideAreaElementPalette("childMoimNameText");

    return css`
      background-color: ${palette.color ?? palette.fog800};

      color: ${_ => {
        if (palette.color) {
          return palette.fog800;
        }

        switch (props.joinButtonScale) {
          case ThemeColorScaleTypes.BLACK:
            return palette.white800;

          case ThemeColorScaleTypes.WHITE:
            return palette.grey800;
        }
      }};
    `;
  }}

  ${ButtonStyle}
`;
