import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { B3Regular } from "common/components/designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";
import { SkeletonBox } from "common/components/skeleton";

export const HistoryRow = styled.div`
  min-width: 100%;
  width: fit-content;
  padding: ${px2rem(8)} 0;
  border-radius: ${px2rem(4)};
  background-color: ${props => props.theme.colorV2.colorSet.grey10};

  display: flex;
`;

export const HistorySkeletonRow = styled(HistoryRow)`
  padding: ${px2rem(16)} 0;
  background-color: transparent;
  justify-content: space-around;
`;

export const HistorySkeletonCell = styled(SkeletonBox)`
  background-color: ${props => props.theme.colorV2.colorSet.grey50};
  border-radius: ${px2rem(7)};
`;

export const HistoryCell = styled(B3Regular)`
  flex: 1;
  padding: ${px2rem(8)} ${px2rem(16)};

  color: ${props => props.theme.colorV2.colorSet.grey800};
  word-break: break-all;
  text-align: center;
  min-width: ${px2rem(130)};
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    max-width: ${px2rem(130)};
  }

  & > a {
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const HistoryLinkCell = styled(HistoryCell)`
  text-decoration: underline;
`;

export const HistoryTitleRow = styled(HistoryRow)`
  padding: 0;
  border-radius: 0;
  background-color: transparent;
`;

export const HistoryTitleCell = styled(HistoryCell)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;
