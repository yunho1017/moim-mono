// vendor
import styled from "styled-components";
// component

import MoimListIconBase from "@icon/24-dotmenu-b.svg";
import SmallMoimListIconBase from "@icon/18-dotmenu-b.svg";

export const MoimListIcon = styled(MoimListIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const SmallMoimListIcon = styled(SmallMoimListIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;
