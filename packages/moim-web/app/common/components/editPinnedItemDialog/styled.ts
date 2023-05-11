import styled, { css } from "styled-components";
import CloseIcon from "@icon/24-close-b.svg";
import { TextButton } from "common/components/designSystem/buttons";
import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";

export const CloseButton = styled(CloseIcon).attrs({
  role: "button",
  size: "s",
  touch: 44,
})``;

export const NextButton = styled(TextButton).attrs({
  size: "s",
  direction: "center",
})<{ isActive: boolean; isLoading: boolean }>`
  ${props =>
    !props.isActive &&
    css`
      opacity: 0.4;
      cursor: not-allowed;
    `};
  ${props =>
    props.isLoading &&
    css`
      opacity: 0.4;
      cursor: progress;
    `};
`;

export const Wrapper = styled.div`
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: 0 ${px2rem(24)} ${px2rem(24)};
  }
`;
