import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { ContentWrapper } from "app/modules/postShow/components/threadShow/styledComponent";
import { useSingleLineStyle } from "common/components/designSystem/styles";
import {
  B3RegularStyle,
  H4BoldStyle,
} from "common/components/designSystem/typos";
import { MediaWrapper } from "./components/media";

export const Wrapper = styled.div<{}>`
  width: 100%;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: ${px2rem(16)} 0;
  }
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding-bottom: ${px2rem(24)};
    ${ContentWrapper} & {
      padding: 0;
    }
  }
`;

export const Inner = styled.div`
  width: 100%;
  padding: ${px2rem(16)};

  ${ContentWrapper} & {
    padding: ${px2rem(16)} 0;
  }
`;

export const NftSummaryWrapper = styled.div`
  width: 100%;
  height: fit-content;
  border-radius: ${px2rem(8)};
  border: solid ${px2rem(1)} ${props => props.theme.colorV2.colorSet.grey50};
  padding: ${px2rem(16)};
  box-sizing: border-box;
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    display: flex;
    gap: ${px2rem(16)};
    flex-direction: row;
    flex-wrap: nowrap;
  }
  @media ${MEDIA_QUERY.ONLY_DESKTOP} {
    ${MediaWrapper} img {
      transform: scale(1);
      will-change: transform;
      transition: transform 120ms ease-in-out 0ms;
    }
    &:hover ${MediaWrapper} img {
      transform: scale(1.1);
    }
  }
`;

export const Left = styled.div`
  width: calc(100% / 5 * 2);
`;

export const Right = styled.div`
  width: calc(100% / 5 * 3);
`;

export const NftSummaryHeader = styled.div`
  width: 100%;
  margin: ${px2rem(40)} 0 0;
  padding: 0 ${px2rem(16)};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin: ${px2rem(8)} 0;
  }
`;

export const NftSummaryTitle = styled.span.attrs({ role: "button" })`
  display: inline-block;
  padding: ${px2rem(4)} 0;
  min-width: 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${useSingleLineStyle}
  ${H4BoldStyle}
`;

export const NftSummaryDesciption = styled.div`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  padding: ${px2rem(4)} 0;
  ${B3RegularStyle}
  ${useSingleLineStyle}
`;
