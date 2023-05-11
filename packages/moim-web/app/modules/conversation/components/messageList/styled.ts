import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { useScrollStyle } from "common/components/designSystem/styles";
import { MEDIA_QUERY } from "common/constants/responsive";

export const MessageGroupWrapper = styled.div`
  position: relative;

  & > * + * {
    margin-top: ${px2rem(16)};
  }
`;

export const MessageEnd = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: -1;
`;

export const Header = styled.div`
  margin-top: ${px2rem(16)};
`;

export const ScrollSection = styled.div`
  display: flex;
  flex-flow: column nowrap;
  margin-top: auto;
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    ${useScrollStyle}
  }
`;

export const Contents = styled.div``;
