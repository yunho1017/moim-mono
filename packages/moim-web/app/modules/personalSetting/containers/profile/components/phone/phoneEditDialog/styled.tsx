import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import CloseIconBase from "@icon/24-close-b.svg";

export const Wrapper = styled.div`
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    min-width: ${px2rem(455)};
    padding: 0 ${px2rem(24)} ${px2rem(20)};
  }
`;

export const Contents = styled.div`
  padding: 0 ${px2rem(16)};
`;

export const AppBarWrapper = styled.div`
  padding: ${px2rem(8)} ${px2rem(4)} ${px2rem(0)};
`;

export const CloseButtonWrapper = styled.div`
  margin-left: ${px2rem(13)};
  display: flex;
  align-items: center;
`;

export const CloseButton = styled(CloseIconBase).attrs({
  size: "s",
  touch: 24,
  role: "button",
})``;
