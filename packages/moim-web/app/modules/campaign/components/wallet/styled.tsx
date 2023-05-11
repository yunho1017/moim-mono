import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { DefaultDivider } from "common/components/divider";
import { MEDIA_QUERY } from "common/constants/responsive";
import {
  H9Bold,
  H8BoldStyle,
  H4BoldStyle,
} from "common/components/designSystem/typos";
import { useScrollStyle } from "common/components/designSystem/styles";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    ${useScrollStyle}
  }
`;

export const Inner = styled.div`
  width: 100%;
  max-width: ${px2rem(720)};
`;

export const PageTitle = styled.div`
  padding: ${px2rem(8)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    ${H8BoldStyle}
  }
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    ${H4BoldStyle}
  }
`;

export const DateTimeLabel = styled(H9Bold)`
  padding: ${px2rem(6)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const Divider = styled(DefaultDivider)`
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin: ${px2rem(8)} 0;
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    margin: ${px2rem(8)} ${px2rem(16)};
  }
`;
