import styled from "styled-components";
import {
  H4BoldStyle,
  B3RegularStyle,
} from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { useSingleLineStyle } from "common/components/designSystem/styles";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Wrapper = styled.div`
  width: 100%;
  position: relative;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: 100%;
    padding: ${px2rem(16)} 0;
  }
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding-bottom: ${px2rem(24)};
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: ${px2rem(4)};
  margin: 0;
  border: none;
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
  border-bottom: 1px solid ${props => props.theme.colorV2.colorSet.grey50};
`;

export const Inner = styled.div`
  width: 100%;
  padding: 0 ${px2rem(16)};
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    ${H4BoldStyle}
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    ${H4BoldStyle}
  }
`;

export const Title = styled.span`
  display: inline-block;
  padding: ${px2rem(4)} 0;
  width: 100%;
  flex: 1;
  min-width: 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${useSingleLineStyle};
`;

export const Description = styled.div`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  padding: ${px2rem(4)} 0;
  ${B3RegularStyle}
  ${useSingleLineStyle};
`;

export const Header = styled.div`
  width: 100%;
  margin: ${px2rem(40)} 0 ${px2rem(24)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin: ${px2rem(8)} 0;
  }
`;

export const DividerWrapper = styled.div`
  padding-bottom: ${px2rem(4)};
`;
