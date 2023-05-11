import { H9Bold } from "common/components/designSystem/typos";
import { DefaultDivider } from "common/components/divider";
import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";
import styled from "styled-components";

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
