import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { H9Bold } from "common/components/designSystem/typos";

export const Wrapper = styled.div`
  padding: ${px2rem(60)} 0 ${px2rem(36)};
`;

export const TagSetTitle = styled(H9Bold)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  margin-bottom: ${px2rem(8)};
`;

export const TagSetWrapper = styled.div`
  & + & {
    margin-top: ${px2rem(16)};
  }
`;

export const ChipList = styled.div`
  margin-left: -${px2rem(8)};
`;

export const ChipWrapper = styled.div`
  display: inline-flex;
  margin-left: ${px2rem(8)};
  & + & {
    margin-bottom: ${px2rem(8)};
  }
`;
