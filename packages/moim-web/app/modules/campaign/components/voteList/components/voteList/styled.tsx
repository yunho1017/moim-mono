import styled from "styled-components";
import { Tab, TabItem } from "common/components/tab";
import { useScrollStyle } from "common/components/designSystem/styles";
import { px2rem } from "common/helpers/rem";
import { H8Bold, B3Regular } from "common/components/designSystem/typos";
import { DefaultDivider } from "common/components/divider";

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`;

export const StyledTabWrapper = styled(Tab)`
  width: 100%;
  display: flex;
`;

export const StyledTabItem = styled(TabItem)`
  width: 100%;
  flex: 1;
  min-width: 0;

  &::after {
    background-color: ${props => props.theme.colorV2.accent};
  }
`;

export const SingleLineText = styled.div`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Inner = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  min-height: 0;
  padding: ${px2rem(32)} 0 ${px2rem(8)};
  ${useScrollStyle}
`;

export const VoteCountTitle = styled(H8Bold)`
  padding: ${px2rem(2)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const Divider = styled(DefaultDivider)`
  margin: ${px2rem(4)} 0;
`;

export const VoteItemContainer = styled.div`
  padding: 0 ${px2rem(16)};
`;

export const MiddleDot = styled.span`
  display: inline-block;
  margin: 0 ${px2rem(4)};
`;

export const EmptyWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 ${px2rem(16)};
`;

export const EmptyGuideText = styled(B3Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;
