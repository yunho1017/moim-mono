import styled from "styled-components";
import { H8Bold } from "common/components/designSystem/typos";
import CloseIconBase from "@icon/24-close-b.svg";
import { px2rem } from "common/helpers/rem";
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
  height: 100%;
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    max-width: ${px2rem(455)};
    padding-bottom: ${px2rem(24)};
  }
`;
