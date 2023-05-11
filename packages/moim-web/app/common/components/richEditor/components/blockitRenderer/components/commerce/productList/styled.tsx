import { px2rem } from "common/helpers/rem";
import styled from "styled-components";
import LoadingIconBase from "common/components/loading/icon";
import {
  H4BoldStyle,
  H8BoldStyle,
  B3RegularStyle,
  B4RegularStyle,
} from "common/components/designSystem/typos";
import { useSingleLineStyle } from "common/components/designSystem/styles";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Divider = styled.div`
  width: 100%;
  height: ${px2rem(4)};
  margin: 0;
  border: none;
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
  border-bottom: 1px solid ${props => props.theme.colorV2.colorSet.grey50};
`;

export const LoadWrapper = styled.div`
  width: 100%;
  height: ${px2rem(42)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Loading = styled(LoadingIconBase)``;

export const Inner = styled.div`
  width: 100%;
  padding: 0 ${px2rem(16)};
`;

export const List = styled.div`
  width: 100%;
  display: grid;
  place-content: center;
  column-gap: ${px2rem(12)};
  row-gap: ${px2rem(24)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`;

export const BreadCrumbs = styled.div`
  color: ${props => props.theme.colorV2.colorSet.grey600};
  padding: ${px2rem(2)} 0;
  ${B4RegularStyle};
  ${useSingleLineStyle};
`;

export const Title = styled.div`
  position: relative;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  padding: ${px2rem(4)} 0;
  ${useSingleLineStyle};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    ${H8BoldStyle}
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    ${H4BoldStyle}
  }
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
    margin: ${px2rem(16)} 0 ${px2rem(16)};
  }
`;

export const DividerWrapper = styled.div`
  padding-bottom: ${px2rem(4)};
`;
