import styled from "styled-components";
// iconsg.svg";
import PinIconBase from "@icon/18-pinsolid.svg";
import CloseIconBase from "@icon/36-close.svg";

import { enWordKeepAllStyle } from "common/components/designSystem/styles";
import { B3Regular, H2Bold } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";

export const PinnedPostWrapper = styled.div`
  display: flex;
`;

export const PinnedPostText = styled(B3Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  margin-left: ${px2rem(4)};
`;

export const Title = styled(H2Bold)`
  padding: ${px2rem(8)} ${px2rem(16)};
  white-space: pre-line;
  word-break: break-all;
  ${enWordKeepAllStyle}
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const ModalShowHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  position: sticky;
  top: 0;
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

export const PinIcon = styled(PinIconBase).attrs(props => ({
  size: "xs",
  iconColor: props.theme.colorV2.colorSet.grey300,
}))``;
