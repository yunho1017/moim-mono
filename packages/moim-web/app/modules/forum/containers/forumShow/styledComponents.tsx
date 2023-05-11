import styled, { css } from "styled-components";
import { useScrollStyle } from "common/components/designSystem/styles";
import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";

export const ForumShowWrapper = styled.div<{ hasCopyPostPermission: boolean }>`
  ${props =>
    !props.hasCopyPostPermission &&
    css`
      -ms-user-select: none;
      -moz-user-select: -moz-none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      user-select: none;
    `}
`;

export const Wrapper = styled.div<{
  disableScrollStyle: boolean;
  postShowModalView: boolean;
}>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  ${props =>
    props.postShowModalView &&
    css`
      border-top-right-radius: ${px2rem(8)};
      border-top-left-radius: ${px2rem(8)};
      & ${ForumShowWrapper} {
        border-top-right-radius: ${px2rem(8)};
        border-top-left-radius: ${px2rem(8)};
      }
    `};
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    ${props => !props.disableScrollStyle && useScrollStyle};
  }
`;
