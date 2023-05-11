import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  H10Bold,
  H2BoldStyle,
  H4BoldStyle,
  H8BoldStyle,
  B3RegularStyle,
} from "common/components/designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";

export const TopWrapper = styled.div``;

export const TopContainer = styled.div`
  position: relative;
`;

export const CollectionInfo = styled.div`
  display: flex;
  padding: 0 ${px2rem(16)};
  justify-content: space-between;
  margin-bottom: ${px2rem(18)};
`;

export const Left = styled.div`
  max-width: 80%;
`;

export const Right = styled.div<{ isSkeleton?: boolean }>`
  max-width: 20%;
  ${props =>
    props.isSkeleton &&
    css`
      max-width: unset;
    `};
`;

export const SymbolName = styled(H10Bold)`
  display: block;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  height: ${px2rem(32)};
  line-height: ${px2rem(32)};
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: 0 ${px2rem(16)};
  }
`;

export const CollectionName = styled.div`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  font-weight: ${props => props.theme.font.bold};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    ${H2BoldStyle}
    height: ${px2rem(58)};
    line-height: ${px2rem(58)};
  }
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: 0 ${px2rem(16)};
    ${H4BoldStyle}
    height: ${px2rem(50)};
    line-height: ${px2rem(50)};
  }
`;
export const InfoWrapper = styled.div`
  display: flex;
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    position: absolute;
    bottom: 0;
    right: 0;
    padding-right: ${px2rem(16)};
  }
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    position: relative;
    bottom: ${4};
  }
`;
export const InfoItem = styled.div`
  text-align: center;
  &:first-child {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      width: ${px2rem(1)};
      top: ${px2rem(9)};
      right: 0;
      background-color: ${props => props.theme.colorV2.colorSet.grey50};
    }
  }
  &:last-child {
    padding-right: 0;
  }
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    min-width: ${px2rem(52)};
    padding: 0 ${px2rem(20)};
    box-sizing: content-box;
    &:first-child::after {
      height: ${px2rem(24)};
    }
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: 0 ${px2rem(17)};
    &:first-child::after {
      height: ${px2rem(37)};
    }
  }
`;
export const InfoCnt = styled.div`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  font-weight: ${props => props.theme.font.bold};
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    ${H8BoldStyle}
  }
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    ${H4BoldStyle}
  }
`;
export const InfoTitle = styled.div`
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${B3RegularStyle}
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    margin-top: ${px2rem(4)};
  }
`;
