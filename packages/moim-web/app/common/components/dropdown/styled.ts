import styled, { css } from "styled-components";
import { Popover as BasePopover } from "@material-ui/core";
import { px2rem } from "common/helpers/rem";
import { B3RegularStyle } from "../designSystem/typos";
import ExpandIconBase from "@icon/24-spread-arrow-g.svg";

export const Popover = styled(BasePopover).attrs({
  classes: { paper: "paper" },
})`
  .paper {
    border-radius: ${px2rem(2)};
    box-shadow: ${props => props.theme.shadow.whiteElevated};
  }
`;

export const SmallDropDownInputWrapper = styled.div`
  display: flex;
  align-items: center;
  height: ${px2rem(48)};
`;

export const SmallOptionLabel = styled.span`
  ${B3RegularStyle};
  color: ${props => props.theme.colorV2.colorSet.grey600};
`;

export const ArrowIcon = styled(ExpandIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const CollapseIconButton = styled.button<{
  open: boolean;
}>`
  margin-left: ${px2rem(6)};
  width: ${px2rem(24)};
  height: ${px2rem(24)};

  ${ArrowIcon} {
    transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
    ${props =>
      props.open
        ? css`
            transform: rotate(180deg);
          `
        : css`
            transform: rotate(0deg);
          `}
  }
`;
