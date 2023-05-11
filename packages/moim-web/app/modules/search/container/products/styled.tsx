import styled from "styled-components";
import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";
import { Wrapper } from "../styled";
import {
  B3RegularStyle,
  H8BoldStyle,
} from "common/components/designSystem/typos";

export const SearchedProductContainer = styled.div`
  width: 100%;
  display: grid;
  place-content: center;
  padding: 0 ${px2rem(16)};
  column-gap: ${px2rem(12)};
  row-gap: ${px2rem(24)};
  grid-template-columns: repeat(4, minmax(0, 1fr));

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const WhiteBackgroundWrapper = styled(Wrapper)`
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
`;

export const SearchResultTitle = styled.div`
  width: 100%;
  padding: ${px2rem(12)} ${px2rem(16)};
  margin-bottom: ${px2rem(12)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${B3RegularStyle}
`;

export const PageIndexContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RelatedProductTitle = styled.div`
  width: 100%;
  padding: ${px2rem(10)} ${px2rem(16)};
  margin-bottom: ${px2rem(12)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${H8BoldStyle}
`;
