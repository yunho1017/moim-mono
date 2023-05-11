// vendor
import styled from "styled-components";
// component

import DraftSmallIconBase from "@icon/18-template.svg";
import DraftIconBase from "@icon/24-template-g.svg";

export const DraftSmallIcon = styled(DraftSmallIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;

export const DraftIcon = styled(DraftIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;
