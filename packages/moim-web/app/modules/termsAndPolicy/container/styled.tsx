import styled from "styled-components";
import { px2rem } from "common/helpers/rem";

import { Tab, TabItem } from "common/components/tab";
import { useScrollStyle } from "common/components/designSystem/styles";

export const StyledTab = styled(Tab)`
  position: sticky;
  margin-top: 0;
  padding-top: ${px2rem(10)};
  box-sizing: content-box;
  top: 0;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  z-index: ${props => props.theme.zIndexes.default + 1};
`;

export const StyledTabItem = styled(TabItem)`
  padding: ${px2rem(10)} ${px2rem(16)};

  &::after {
    bottom: 0;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  max-width: ${px2rem(700)};
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
`;

export const Contents = styled.div`
  width: 100%;
  flex: 1;
  min-height: 0;
`;

export const TabContentsWrapper = styled.div`
  padding-top: ${px2rem(24)};
  width: 100%;
  height: 100%;
`;

export const ScrollableContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 ${px2rem(16)};
  /* ${useScrollStyle}; */

  &::after {
    content: "";
    display: block;
    width: 100%;
    height: calc(${px2rem(47)} + env(safe-area-inset-bottom));
  }
`;

export const LoadWrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;
