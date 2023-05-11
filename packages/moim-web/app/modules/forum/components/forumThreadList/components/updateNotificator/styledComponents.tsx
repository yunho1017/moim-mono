import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B1Regular } from "common/components/designSystem/typos";
import LoadIconBase from "@icon/18-chat-g.svg";

export const Wrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${px2rem(8)} ${px2rem(16)};
  border-radius: ${px2rem(4)};
  background-color: ${props => props.theme.colorV2.accent};
`;

export const Text = styled(B1Regular)`
  color: ${props => props.theme.colorV2.colorSet.white1000};
  margin-right: ${px2rem(6)};
`;

export const LoadIcon = styled(LoadIconBase).attrs({
  size: "s",
  touch: 18,
})``;
