import styled, { css } from "styled-components";
import CloseIconBase from "@icon/24-close-b.svg";
import { px2rem } from "common/helpers/rem";

import { TextButton } from "common/components/designSystem/buttons";
import { useScrollStyle } from "common/components/designSystem/styles";

export const CloseButton = styled(CloseIconBase).attrs({
  size: "m",
  touch: 24,
  role: "button",
})``;

export const GuideDialogButtonContainer = styled.div`
  width: 100%;
  position: sticky;
  bottom: 0;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
`;

export const GuideDialogCloseButton = styled(TextButton).attrs({ size: "l" })`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: ${px2rem(8)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const dialogContentStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${px2rem(12)} 0 ${px2rem(24)};
`;

export const DialogContent = styled.div`
  flex: 1;
  min-width: 0;
  ${useScrollStyle}
`;
