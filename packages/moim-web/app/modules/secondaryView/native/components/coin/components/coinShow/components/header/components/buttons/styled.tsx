import styled from "styled-components";
import { rgba } from "polished";
import { FlatButton } from "common/components/designSystem/buttons";
import { px2rem } from "common/helpers/rem";
import RightArrow from "@icon/18-rightarrow-g.svg";
import { DefaultDivider } from "common/components/divider";
import { B4Regular } from "common/components/designSystem/typos";

export const HeaderButtonWrapper = styled.div<{ hexCode?: string }>`
  width: 100%;
  height: fit-content;
  background-color: ${props =>
    rgba(props.hexCode ? props.hexCode : props.theme.color.yellow900, 0.1)};
  border-radius: 0 0 ${px2rem(12)} ${px2rem(12)};
`;

export const ExpirableWrapperDivider = styled(DefaultDivider)`
  background-color: ${props =>
    rgba(props.theme.colorV2.colorSet.grey200, 0.02)};
`;

export const SendButtonWrapper = styled.div`
  padding: 0 ${px2rem(16)} ${px2rem(16)};
`;

export const SendButton = styled(FlatButton).attrs({ size: "s" })<{
  hexCode?: string;
}>`
  width: 100%;
  background-color: ${props =>
    rgba(props.hexCode ? props.hexCode : props.theme.color.yellow900, 0.2)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const PointButtonWrapper = styled.div.attrs({ role: "button" })`
  height: ${px2rem(38)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey300};
  ${B4Regular} {
    flex: 1;
    word-break: break-all;
  }
`;

export const PointRightContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const MoreIcon = styled(RightArrow).attrs(props => ({
  role: "button",
  size: "xs",
  touch: 18,
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;
