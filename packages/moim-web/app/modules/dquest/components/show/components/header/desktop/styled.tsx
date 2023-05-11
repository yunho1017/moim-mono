import styled from "styled-components";
import CloseIconBase from "@icon/36-close.svg";

import { px2rem } from "common/helpers/rem";

export const ModalShowHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  position: sticky;
  top: 0;
  z-index: ${props => props.theme.zIndexes.default};
`;

export const RightWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: ${px2rem(10)} ${px2rem(10)} 0 0;
`;

export const CloseButton = styled(CloseIconBase).attrs({
  size: "m",
  touch: 36,
  role: "button",
})``;
