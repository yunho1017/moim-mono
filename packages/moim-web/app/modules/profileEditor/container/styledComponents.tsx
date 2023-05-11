import styled, { css } from "styled-components";
import CloseIcon from "@icon/24-close-b.svg";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { TextButton } from "common/components/designSystem/buttons";

export const SaveButton = styled(TextButton).attrs({ size: "s" })`
  width: ${px2rem(76)};
`;

export const CloseButton = styled(CloseIcon).attrs({
  size: "s",
  role: "button",
})``;

export const Container = styled.div`
  position: relative;
  padding: 0 ${px2rem(20)};
  width: 100%;
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    width: ${px2rem(455)};
  }
`;

export const appBarStyle = css`
  margin-top: ${px2rem(8)};
`;
