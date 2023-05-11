import styled from "styled-components";
import { H8Bold } from "common/components/designSystem/typos";
import DividerBase from "common/components/divider";
import CloseIconBase from "@icon/24-close-b.svg";

import { px2rem } from "common/helpers/rem";
import { useScrollStyle } from "common/components/designSystem/styles";

import { MEDIA_QUERY } from "common/constants/responsive";

export const ModalTitle = styled(H8Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const CloseButton = styled(CloseIconBase).attrs({
  size: "m",
  touch: 24,
  role: "button",
})``;

export const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: 0 ${px2rem(24)} ${px2rem(24)};
  }
`;

export const ScrollSection = styled.div`
  width: 100%;
  height: 100%;
  ${useScrollStyle}
`;

export const Divider = styled(DividerBase).attrs(props => ({
  color: props.theme.colorV2.colorSet.grey50,
  height: px2rem(1),
}))`
  margin: ${px2rem(8)} 0;
`;
