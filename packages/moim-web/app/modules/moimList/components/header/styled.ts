import styled from "styled-components";

import MoimListIconBase from "@icon/18-moimlist.svg";
import MenuIconBase from "@icon/24-menu-b.svg";
import AddIconBase from "@icon/24-add-b.svg";

import { H8Bold } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

import { useHoverStyle } from "common/components/designSystem/styles";

const HORIZONTAL_MARGIN = 13;

export const LeftButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: ${px2rem(HORIZONTAL_MARGIN)};
`;

export const RightButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-right: ${px2rem(HORIZONTAL_MARGIN)};
`;

export const MoimListIcon = styled(MoimListIconBase).attrs({
  size: "xs",
  touch: 18,
})``;

export const MenuIcon = styled(MenuIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const AddIcon = styled(AddIconBase).attrs({
  size: "s",
  role: "button",
})``;

export const Title = styled(H8Bold)``;

export const IconWrapper = styled.div`
  ${useHoverStyle}
`;

export const SmallDivider = styled.div`
  width: 100%;
  height: ${px2rem(1)};
  background-color: ${props => props.theme.colorV2.colorSet.grey50};
`;

export const LargeDivider = styled.div`
  width: 100%;
  height: ${px2rem(4)};
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
`;

export const OptionsLabelsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
`;

export const LabelsWrapper = styled.div`
  flex: 1;
  width: 100%;
  min-width: 0;
  > div {
    position: inherit;
  }
`;
