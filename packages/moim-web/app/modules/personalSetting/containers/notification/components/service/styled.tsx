import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import InfoIconBase from "@icon/18-info-g-fill.svg";
import NotiIconOffBase from "@icon/24-noti-off-b.svg";
import NotiIconNothingBase from "@icon/24-noti-nothing-b.svg";
import { pB2BoldStyle } from "common/components/designSystem/typos";
import { DefaultDivider } from "app/common/components/divider/styled";

export const Wrapper = styled.div``;

export const InnerWrapper = styled.div`
  margin-left: ${px2rem(32)};
  margin-right: ${px2rem(16)};
`;

export const WarningWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  margin: 0 ${px2rem(16)};
  background-color: ${props => props.theme.colorV2.colorSet.grey50};
  padding: ${px2rem(16)};
  border-radius: ${px2rem(4)};
  overflow: hidden;
  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: ${px2rem(2)};
    background-color: ${props => props.theme.colorV2.colorSet.grey800};
  }
`;

export const GuideText = styled.span`
  ${pB2BoldStyle}
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const IconWrapper = styled.div`
  display: inline-block;
  width: ${px2rem(18)};
  height: ${px2rem(18)};
  margin: ${px2rem(4)} ${px2rem(12)} 0 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};

  > span {
    width: ${px2rem(18)};
    height: ${px2rem(18)};
  }
`;

export const InfoIcon = styled(InfoIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const NotiIconOff = styled(NotiIconOffBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const NotiIconNothing = styled(NotiIconNothingBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const Divider = styled(DefaultDivider)`
  margin-top: ${px2rem(19)};
`;

export const SettingInputWrapper = styled.div`
  padding-bottom: ${px2rem(16)};
`;
