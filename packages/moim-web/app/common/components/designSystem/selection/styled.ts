import styled, { css, FlattenInterpolation } from "styled-components";
import Select from "react-select";
import { px2rem } from "common/helpers/rem";
import { B1RegularStyle, B4Regular } from "../typos";

import DownArrowIconBase from "@icon/18-spread-arrow-g.svg";
import BadgeIconBase from "@icon/18-badge.svg";
import MemberIconBase from "@icon/18-member-solid-g.svg";
import PositionIconBase from "@icon/18-position.svg";

export const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Wrapper = styled.div<{
  overrideStyle?: FlattenInterpolation<any>;
}>`
  padding: ${px2rem(4)} ${px2rem(16)} 0;

  ${props => props.overrideStyle}
`;

export const HelperText = styled(B4Regular)<{
  state: "error" | "disabled" | "normal";
}>`
  padding-top: ${px2rem(4)};
  padding-left: ${px2rem(16)};
  ${props => {
    switch (props.state) {
      case "error":
        return css`
          color: ${props.theme.color.red700};
        `;
      case "normal":
        return css`
          color: ${props.theme.colorV2.colorSet.grey200};
        `;
    }
  }};
`;

export const DownArrowIcon = styled(DownArrowIconBase).attrs(props => ({
  size: "xs",
  touch: 30,
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;
export const MemberIcon = styled(MemberIconBase).attrs(props => ({
  size: "xs",
  touch: 30,
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;
export const PositionIcon = styled(PositionIconBase).attrs(props => ({
  size: "xs",
  touch: 30,
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;
export const BadgeIcon = styled(BadgeIconBase).attrs(props => ({
  size: "xs",
  touch: 30,
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const ReactSelectWithStyle = styled(Select)<{
  size: "l" | "s";
  isMultiple: boolean;
  hasSelectedOption: boolean;
  useChip: boolean;
  width: number;
  height: number;
  state: "error" | "disabled" | "normal";
}>`
  .rs__control {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    box-shadow: none;
    width: 100%;
    min-height: ${props => px2rem(props.size === "l" ? 42 : 32)};
    padding: 0 ${px2rem(10)} 0
      ${props => px2rem(props.useChip && props.hasSelectedOption ? 8 : 16)};
    border-radius: ${px2rem(4)};

    background: none !important;
    ${props => {
      switch (props.state) {
        case "error":
          return css`
            border: ${px2rem(1)} solid ${props.theme.color.red700} !important;
          `;
        case "disabled":
          return css`
            border: ${px2rem(1)} solid ${props.theme.colorV2.colorSet.grey200} !important;
            opacity: 0.4;
          `;

        default:
          return css`
            border: ${px2rem(1)} solid ${props.theme.colorV2.colorSet.grey200} !important;
          `;
      }
    }}

    &:focus,
    &:hover {
      ${props => {
        switch (props.state) {
          case "error":
            return css`
              border: ${px2rem(1)} solid ${props.theme.color.red700};
            `;
          case "disabled":
            return css`
              opacity: 0.4;
            `;

          default:
            return css`
              border: ${px2rem(1)} solid ${props.theme.colorV2.colorSet.grey200};
            `;
        }
      }}
    }
  }

  .rs__control--menu-is-open {
    border: ${px2rem(1)} solid ${props => props.theme.colorV2.colorSet.grey600} !important;
  }

  .rs__value-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: ${px2rem(-2)};
    margin-left: ${px2rem(-2)};
    padding-top: ${px2rem(2)};
    padding: 0;
  }
  .rs__dropdown-indicator {
    padding: 0;
  }

  .rs__placeholder {
    top: 55%; // for manual adjust :( no good,
  }

  .rs__value-container {
    ${props =>
      !props.isMultiple &&
      css`
        height: ${px2rem(24)};
      `};

    * {
      color: ${props => props.theme.colorV2.colorSet.grey300};
    }
    ${B1RegularStyle};
    > div:last-child {
      padding: 0;
    }
  }
  .rs__single-value,
  .rs__multi-value {
    margin: ${px2rem(2)};
    background: none;
  }

  .rs__multi-value__label {
    padding: 0;
  }

  .rs__multi-value__remove {
    display: none;
  }

  .rs__clear-indicator {
    display: none;
  }

  .rs__indicator-separator {
    display: none;
  }
`;
