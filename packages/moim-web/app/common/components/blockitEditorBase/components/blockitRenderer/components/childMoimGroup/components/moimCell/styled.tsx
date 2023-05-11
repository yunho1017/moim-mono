import styled from "styled-components";
import PinnedIconBase from "@icon/18-pinsolid.svg";

export const ExtraElementWrapper = styled.div``;

export const PinnedIcon = styled(PinnedIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;
