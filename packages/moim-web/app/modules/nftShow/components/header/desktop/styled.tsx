import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
// icons
import ShareIconBase from "@icon/24-shareios-b.svg";
import BlackMoreIcon from "@icon/24-more-b.svg";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${px2rem(12)};
  padding: ${px2rem(24)} ${px2rem(16)} ${px2rem(16)};
`;

export const IconWrapper = styled.div`
  width: ${px2rem(48)};
  height: ${px2rem(48)};
  border-radius: 100%;
  border: ${px2rem(1)} solid ${props => props.theme.colorV2.colorSet.grey50};
  transition: opacity 200ms ease-in;

  &:hover {
    opacity: 0.6;
  }
`;

export const MoreIcon = styled(BlackMoreIcon).attrs(props => ({
  size: "s",
  role: "button",
  touch: 45,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const ShareIcon = styled(ShareIconBase).attrs(props => ({
  size: "s",
  role: "button",
  touch: 45,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;
