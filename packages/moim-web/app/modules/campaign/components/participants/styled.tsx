import styled from "styled-components";
import { DefaultDivider } from "common/components/divider";
import { px2rem } from "common/helpers/rem";
import {
  H9Bold,
  H8BoldStyle,
  H4BoldStyle,
} from "common/components/designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";
import { useScrollStyle } from "common/components/designSystem/styles";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  ${useScrollStyle};

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    max-width: ${px2rem(700)};
    margin: 0 auto;
  }
`;

export const TitleContainer = styled.div`
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: ${px2rem(4)} ${px2rem(16)};
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: ${px2rem(8)} ${px2rem(16)};
  }
`;

export const Title = styled.div`
  color: ${props => props.theme.colorV2.colorSet.grey800};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    ${H8BoldStyle}
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    ${H4BoldStyle}
  }
`;

export const Divider = styled(DefaultDivider)`
  margin: ${px2rem(24)} ${px2rem(16)} 0;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin: ${px2rem(24)} 0 0;
  }
`;

export const Inner = styled.div`
  width: 100%;
  height: fit-content;
`;

export const PositionTitle = styled(H9Bold)`
  padding: ${px2rem(12)} ${px2rem(16)};
  font-weight: ${props => props.theme.font.bold};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const SubTitleWrapper = styled.div`
  display: flex;

  & > * + * {
    &::before {
      content: "･";
      display: inline;
      margin: 0 ${px2rem(4)};
    }
  }
`;
