import styled, { css } from "styled-components";

// TODO: (mono) fix here
// import CheckMarkIconBase from "@icon/18-checkmark-g.svg";
import { px2rem } from "../../../../helpers/rem";
import { B2Regular, B4Regular } from "../../../typos";

export const MenuItemPrefix = styled.div<{
  touch: number;
  rightMargin: number;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => px2rem(props.touch)};
  height: ${(props) => px2rem(props.touch)};
  margin-right: ${(props) => px2rem(props.rightMargin)};
`;

export const MenuItemContents = styled(B2Regular)`
  flex: 1;
  min-width: 0;
  color: ${(props) => props.theme.colorV2.colorSet.grey800};
`;

export const MenuItemRight = styled(B4Regular)`
  display: flex;
  align-items: center;
  max-width: 50%;
`;

export const MenuItemWrapper = styled.div<{
  selected: boolean;
  disabled?: boolean;
  leftPadding?: number;
}>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-left: ${(props) => px2rem(props.leftPadding ?? 16)};
  padding-right: ${(props) => px2rem(props.selected ? 4 : 16)};
  padding-top: ${(props) => px2rem(props.selected ? 0 : 10)};
  padding-bottom: ${(props) => px2rem(props.selected ? 0 : 10)};

  ${(props) =>
    props.disabled &&
    css`
      ${MenuItemPrefix},
      ${MenuItemContents} {
        opacity: 0.4;
      }
    `}
`;

// TODO: (mono) fix here
// export const CheckMarkIcon = styled(CheckMarkIconBase).attrs((props) => ({
//   size: "xs",
//   touch: 42,
//   iconColor: props.theme.colorV2.colorSet.grey700,
// }))``;
