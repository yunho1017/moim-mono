import styled, { css } from "styled-components";
import { rgba } from "polished";
import BigDeleteIcon from "@icon/36-delete.svg";
import { px2rem } from "common/helpers/rem";
import { Box } from "../../blockitRenderer/components/section";
import { MEDIA_QUERY } from "common/constants/responsive";

export const DeleteButtonWrapper = styled.div<{
  isSmallDeleteButton?: boolean;
}>`
  position: absolute;
  z-index: ${props => props.theme.zIndexes.wrapper};
  width: ${px2rem(36)};
  height: ${px2rem(36)};
  top: 0;
  right: 0;
  background-color: ${props => rgba(props.theme.colorV2.colorSet.grey800, 0.4)};
  border-bottom-left-radius: ${px2rem(2)};
`;

export const EditableWrapperStyle = css`
  padding-left: 0;
  padding-right: 0;
  pointer-events: none;

  ${Box}+${Box} {
    margin-left: ${px2rem(32)};
  }
`;

export const WrapperStyle = css`
  padding-left: 0;
  padding-right: 0;

  ${Box}+${Box} {
    margin-left: ${px2rem(32)};
  }
`;

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
`;

export const GridWrapperStyle = css<{
  backgroundColor?: string;
  borderColor?: string;
}>`
  width: initial;
  margin: ${px2rem(8)} ${px2rem(-16)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};

  ${props => {
    if (props.backgroundColor || props.borderColor) {
      return css`
        width: initial;
        padding: ${px2rem(8)} 0;
        @media ${MEDIA_QUERY.ONLY_MOBILE} {
          margin: ${px2rem(8)} ${px2rem(-12)};
        }
      `;
    }
  }}

  & & {
    ${props => {
      if (!props.backgroundColor && !props.borderColor) {
        return css`
          margin: initial;
        `;
      }

      return css`
        margin: ${px2rem(8)} ${px2rem(4)};
      `;
    }}
  }
`;

export const DeleteButton = styled(BigDeleteIcon).attrs({
  role: "button",
  size: "m",
})``;
