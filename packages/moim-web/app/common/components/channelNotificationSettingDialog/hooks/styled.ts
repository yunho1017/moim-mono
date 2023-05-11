import styled from "styled-components";
// icons
import NotiOnIconBase from "@icon/24-noti-on-b.svg";
import NotiOffIconBase from "@icon/24-noti-off-b.svg";
import NotiNothingIconBase from "@icon/24-noti-nothing-b.svg";
import NotiIconBase from "@icon/24-noti-b.svg";

export const NotiOnIcon = styled(NotiOnIconBase).attrs(props => ({
  size: "s",
  touch: props.size ?? 42,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;
export const NotiOffIcon = styled(NotiOffIconBase).attrs(props => ({
  size: "s",
  touch: props.size ?? 42,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;
export const NotiNothingIcon = styled(NotiNothingIconBase).attrs(props => ({
  size: "s",
  touch: props.size ?? 42,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;
export const NotiDefaultIcon = styled(NotiIconBase).attrs(props => ({
  size: "s",
  touch: props.size ?? 42,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;
