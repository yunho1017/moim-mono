import styled, { css, FlattenInterpolation } from "styled-components";
import { px2rem } from "../../../../helpers/rem";
import { useSingleLineStyle } from "../../../styles";
import { B3RegularStyle } from "../../../typos";

export type SIZE = "l" | "s";
export const DEFAULT_LARGE_ICON_SIZE = 24;
export const DEFAULT_SMALL_ICON_SIZE = 18;

export const OptionLabel = styled.div`
  ${B3RegularStyle}
  min-width: 0;
  display: inline-block;
  text-align: left;
  user-select: none;
  color: ${(props) => props.theme.colorV2.colorSet.grey800};
  ${useSingleLineStyle}
`;

export const paperStyle = css`
  min-width: inherit;
  padding: 0;
  margin: 0;
`;

export const PlaceholderSpan = styled.span`
  color: ${(props) => props.theme.colorV2.colorSet.grey300};
`;

export const Inner = styled.ul<{ overrideStyle?: FlattenInterpolation<any> }>`
  ${(props) => props.overrideStyle}
`;

export const IconButton = styled.button<{
  open: boolean;
  iconSize: number;
}>`
  width: ${(props) => px2rem(props.iconSize)};
  height: ${(props) => px2rem(props.iconSize)};
  margin-left: ${px2rem(2)};

  & > * {
    transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
    ${(props) =>
      props.open
        ? css`
            transform: rotate(180deg);
          `
        : css`
            transform: rotate(0deg);
          `}
  }
`;

// TODO: (mono) fix here
// export const ArrowIcon = styled(ExpandIconBase).attrs<{ iconSize: number }>(
//   (props) => ({
//     size: "xs",
//     touch: props.iconSize,
//     iconColor: props.theme.colorV2.colorSet.grey800,
//   })
// )``;

export const OptionLI = styled.li`
  cursor: pointer;
`;

export const Wrapper = styled.button<{
  size: SIZE;
  disabled?: boolean;
  overrideStyle?: FlattenInterpolation<any>;
}>`
  width: fit-content;
  display: flex;
  align-items: center;
  padding: ${px2rem(6)} 0;
  padding-left: ${px2rem(8)};
  cursor: pointer;

  ${(props) =>
    props.disabled &&
    css`
      cursor: not-allowed;
      pointer-events: none;

      ${OptionLabel} {
        color: ${props.theme.colorV2.colorSet.grey300};
      }

      // TODO: (mono) fix here
      /* ${ArrowIcon} {
        path {
          fill: ${props.theme.colorV2.colorSet.grey300};
        }
      } */
    `}

  ${(props) => {
    switch (props.size) {
      case "l": {
        return css`
          min-width: ${px2rem(120)};
          min-height: ${px2rem(DEFAULT_LARGE_ICON_SIZE)};
          ${OptionLabel} {
            line-height: ${px2rem(DEFAULT_LARGE_ICON_SIZE)};
          }
        `;
      }
      case "s": {
        return css`
          min-width: ${px2rem(80)};
          min-height: ${px2rem(DEFAULT_SMALL_ICON_SIZE)};
          ${OptionLabel} {
            line-height: ${px2rem(DEFAULT_SMALL_ICON_SIZE)};
          }
        `;
      }
    }
  }}

  :hover {
    background-color: ${(props) => props.theme.colorV2.colorSet.grey50};
    border-radius: ${px2rem(2)};
  }

  ${(props) => props.overrideStyle}
`;
