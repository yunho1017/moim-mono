import styled from "styled-components";
import CloseIconBase from "@icon/24-close-b.svg";
import { FixedHeightSmallModalLayout } from "common/components/modalLayout";

import { px2rem } from "common/helpers/rem";

export const LeftWrapper = styled.div`
  margin-right: ${px2rem(13)};
  display: flex;
  align-items: center;
`;

export const CloseButton = styled(CloseIconBase).attrs({
  size: "m",
  touch: 24,
  role: "button",
})``;

export const StyledFixedHeightSmallModalLayout = styled(
  FixedHeightSmallModalLayout,
)`
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
`;
