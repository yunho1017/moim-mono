import styled, { css } from "styled-components";
import MoreIconBase from "@icon/24-more-b.svg";
import InfoIconBase from "@icon/24-info-b.svg";
import ShareIconBase from "@icon/24-share-1.svg";
import PinIconBase from "@icon/24-pin-g.svg";
import { px2rem } from "common/helpers/rem";

export const MoreIcon = styled(MoreIconBase).attrs({ size: "s", touch: 24 })``;
export const InfoIcon = styled(InfoIconBase).attrs({ size: "s", touch: 24 })``;
export const ShareIcon = styled(ShareIconBase).attrs(props => ({
  size: "s",
  touch: 24,
  iconColor: props.theme.colorV2.colorSet.grey900,
}))``;
export const PinIcon = styled(PinIconBase).attrs(props => ({
  size: "s",
  iconColor: props.theme.colorV2.colorSet.grey900,
}))``;

export const Button = styled.button<{
  isSelected: boolean;
  visibleTopTabNavigation?: boolean;
}>`
  width: ${px2rem(42)};
  height: ${px2rem(42)};

  ${props =>
    props.isSelected &&
    css`
      background-color: ${props.theme.colorV2.colorSet.grey10};
    `};
  ${props =>
    props.visibleTopTabNavigation &&
    css`
      position: fixed;
      width: ${px2rem(48)};
      height: ${px2rem(48)};
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: ${props.theme.colorV2.colorSet.white900};
      box-shadow: 0 ${px2rem(2)} ${px2rem(6)} 1px
        ${props.theme.colorV2.colorSet.grey50};
      bottom: ${px2rem(16)};
      right: ${px2rem(16)};
    `}
`;
