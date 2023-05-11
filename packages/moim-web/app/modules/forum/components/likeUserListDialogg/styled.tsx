import styled from "styled-components";
import CloseIconBase from "@icon/24-close-b.svg";
import { px2rem } from "common/helpers/rem";

export const CloseButton = styled(CloseIconBase).attrs({
  size: "m",
  touch: 24,
  role: "button",
})``;

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const Header = styled.div`
  margin: ${px2rem(8)} ${px2rem(4)} 0;
`;

export const Contents = styled.div`
  flex: 1;
  width: 100%;
  padding: 0 ${px2rem(24)};
  display: flex;
  flex-direction: column;
`;

export const TabContentWrapper = styled.div`
  flex: 1;
  overflow: scroll;
`;
