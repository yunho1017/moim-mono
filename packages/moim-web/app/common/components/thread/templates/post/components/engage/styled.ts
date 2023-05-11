import styled from "styled-components";
import { px2rem } from "common/helpers/rem";

import { B4Regular } from "common/components/designSystem/typos";
import { textAlignStyle } from "common/components/thread/styles";

export const ROW_GAP = 20;
export const COLUMN_GAP = 8;

export const Status = styled(B4Regular)`
  display: flex;
  max-width: 100%;
`;

export const Engage = styled(B4Regular)`
  display: flex;
  align-items: center;
`;

export const EngageWrapper = styled.div`
  display: flex;
  align-items: center;
  ${Engage} + ${Engage} {
    margin-left: ${px2rem(8)};
  }

  & > ${Engage}:first-child {
    margin-left: ${px2rem(-4)};
  }
`;

export const StatusWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;

  ${Status} + ${Status}:before {
    content: "･";
    margin: 0 ${px2rem(2)};
  }
`;

export const Wrapper = styled.div<{
  textAlign?: Moim.Forum.ForumListConfigTextAlignment;
}>`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: ${px2rem(4)};
  color: ${props => props.theme.colorV2.colorSet.grey300};

  ${EngageWrapper} + ${StatusWrapper} {
    margin-top: ${px2rem(COLUMN_GAP)};
  }

  ${EngageWrapper},
  ${StatusWrapper} {
    ${textAlignStyle}
  }
`;
