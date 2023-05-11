import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  B3RegularStyle,
  B4Regular,
  H10BoldStyle,
} from "common/components/designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";

export const ScheduleWrapper = styled.div`
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
  border-radius: ${px2rem(4)};
  padding: ${px2rem(4)} ${px2rem(16)} ${px2rem(22)};
`;

export const ScheduleTitle = styled.div`
  display: flex;
  align-items: center;
  height: ${px2rem(44)};
  font-weight: ${props => props.theme.font.bold};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const ScheduleGridTemplate = styled.div`
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: auto;
  }
`;

export const ScheduleStartAt = styled.div`
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    grid-area: 1 / 1 / 2 / 2;
  }
`;

export const ScheduleEndAt = styled.div`
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    grid-area: 1 / 2 / 2 / 3;
  }
`;

export const ScheduleRange = styled.div`
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    grid-area: 2 / 1 / 3 / 2;
  }
`;

export const ScheduleMaxAmount = styled.div`
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    grid-area: 2 / 2 / 3 / 3;
  }
`;

export const ScheduleDetailTitle = styled.div`
  height: ${px2rem(27)};
  ${B3RegularStyle}
  color: ${props => props.theme.colorV2.colorSet.grey300};
  line-height: ${px2rem(27)};
  margin-bottom: ${px2rem(4)};
`;

export const ScheduleDetailDesc = styled.div<{ oneLineText?: boolean }>`
  display: flex;
  align-items: center;
  font-weight: ${props => props.theme.font.bold};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${H10BoldStyle}
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    max-width: ${px2rem(100)};
    min-height: ${props => (props.oneLineText ? px2rem(32) : px2rem(68))};
  }
`;

export const BlockNumberDesc = styled(B4Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;
