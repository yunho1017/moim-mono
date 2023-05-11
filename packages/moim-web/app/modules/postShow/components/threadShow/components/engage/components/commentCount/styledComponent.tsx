import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B3Regular } from "common/components/designSystem/typos";
import MessageIconBase from "@icon/24-message-1";

export const MessgaeIcon = styled(MessageIconBase).attrs(props => ({
  size: "s",
  touch: 24,
  iconColor: props.theme.colorV2.colorSet.grey800,
}))``;

export const WriteCommentButton = styled.button.attrs({
  role: "button",
})`
  display: flex;
  align-items: center;
`;

export const Text = styled(B3Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey600};
  margin-left: ${px2rem(4)};
  transition: opacity 200ms ease-in;
  line-height: 1;

  &:hover {
    opacity: 0.6;
  }
`;
