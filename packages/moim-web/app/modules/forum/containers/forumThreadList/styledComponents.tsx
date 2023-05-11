import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { useScrollStyle } from "common/components/designSystem/styles";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  height: 100%;
`;

export const Header = styled.header`
  z-index: 1;
  position: sticky;
  top: 0;
`;

export const Content = styled.div`
  flex: 1;
  position: relative;
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    overflow: hidden;
  }
`;

export const ScrollSection = styled.div<{ isListModalType: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  ${props =>
    !props.isListModalType &&
    css`
      @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
        ${useScrollStyle};
        overscroll-behavior: auto;
      }
    `}
`;

export const UpdateNotificatorWrapper = styled.div`
  position: absolute;
  top: ${px2rem(12)};
  left: 50%;
  transform: translateX(-50%);
`;
