import styled from "styled-components";
import RetryIconResource from "@icon/24-retry-g.svg";

export const RetryIcon = styled(RetryIconResource).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.fog800,
}))``;
