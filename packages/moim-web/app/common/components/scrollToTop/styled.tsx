import styled from "styled-components";
import { rgba } from "polished";
import UpArrowIconBase from "@icon/18-uparrow-g.svg";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Wrapper = styled.div`
  position: fixed;
  width: ${px2rem(36)};
  height: ${px2rem(36)};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props =>
    rgba(props.theme.colorV2.colorSet.white1000, 0.9)};
  box-shadow: 0 ${px2rem(2)} ${px2rem(6)} 1px
    ${props => props.theme.colorV2.colorSet.grey50};
  bottom: ${px2rem(24)};
  right: ${px2rem(24)};

  &.animate__animated.animate__slideInUp,
  &.animate__animated.slideOutDown {
    --animate-duration: 300ms;
  }

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    bottom: ${px2rem(16)};
    right: ${px2rem(16)};
  }
`;

export const UpArrowIcon = styled(UpArrowIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;
