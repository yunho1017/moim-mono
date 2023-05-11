import styled, { css } from "styled-components";
import WriteIconBase from "@icon/24-write-b.svg";
import { px2rem } from "common/helpers/rem";

export const Wrapper = styled.div<{ visibleTopTabNavigation?: boolean }>`
  ${props =>
    props?.visibleTopTabNavigation &&
    css`
      position: fixed;
      width: ${px2rem(48)};
      height: ${px2rem(48)};
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${props.theme.colorV2.accent};
      box-shadow: 0 ${px2rem(2)} ${px2rem(6)} 1px
        ${props.theme.colorV2.colorSet.grey50};
      bottom: ${px2rem(76)};
      right: ${px2rem(16)};
    `}
`;

export const WriteIcon = styled(WriteIconBase).attrs((props): {
  isMobile?: boolean;
  visibleTopTabNavigation?: boolean;
  size: string;
  touch: number;
  iconColor: any;
} => ({
  size: "s",
  touch: 42,
  iconColor:
    props?.isMobile && props?.visibleTopTabNavigation
      ? props.theme.colorV2.colorSet.white1000
      : props.theme.colorV2.colorSet.grey800,
}))``;
