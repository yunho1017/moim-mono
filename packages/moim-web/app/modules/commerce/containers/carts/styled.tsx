import styled, { css } from "styled-components";
import BackIconBase from "@icon/24-back-b.svg";
import { MEDIA_QUERY } from "common/constants/responsive";
import RoutedMoimTab from "common/components/tab/routed";

export const AppBarStickyWrapperStyle = css`
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
`;

export const LeftButtonWrapper = styled.div``;

export const BackIcon = styled(BackIconBase).attrs({
  role: "button",
  size: "s",
  touch: 24,
})``;

export const StyledRoutedMoimTab = styled(RoutedMoimTab)`
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    width: 100%;
    height: fit-content;
    min-height: 100%;
  }
`;
