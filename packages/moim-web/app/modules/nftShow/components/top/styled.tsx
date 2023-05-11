import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  padding: 0 ${px2rem(12)} 0 ${px2rem(16)};
  gap: ${px2rem(32)};
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    gap: ${px2rem(24)};
    padding: 0 ${px2rem(16)};
    flex-direction: column;
  }
`;

export const Left = styled.div`
  width: 60%;
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: 100%;
  }
`;

export const Right = styled.div`
  width: 40%;
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: 100%;
  }
`;

export const BoxWrapper = styled.div<{ minHeight?: number }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: ${px2rem(134)};
  padding: 0 ${px2rem(16)} ${px2rem(16)};
  border-radius: ${px2rem(8)};
  border: solid 1px ${props => props.theme.colorV2.colorSet.grey50};
`;
