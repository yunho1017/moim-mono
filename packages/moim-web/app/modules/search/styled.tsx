import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { Tab as TabBase } from "common/components/tab";
import { useScrollStyle } from "common/components/designSystem/styles";
import { MEDIA_QUERY } from "common/constants/responsive";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: ${px2rem(1)} solid
    ${props => props.theme.colorV2.colorSet.grey50};
`;

export const TabsWrapper = styled.div`
  display: flex;
  width: 100%;
  height: ${px2rem(53)};
  ${useScrollStyle};
  overflow-y: visible;
  overflow-x: scroll;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    max-width: ${px2rem(700)};
  }
`;

export const Tab = styled(TabBase)`
  border-bottom: none;

  & > div {
    margin-left: ${px2rem(16)};
    margin-right: ${px2rem(16)};
    white-space: nowrap;
    word-break: keep-all;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  min-height: 0;

  display: flex;
  justify-content: center;
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
`;

export const Content = styled.div`
  width: ${px2rem(700)};
  height: 100%;

  ${useScrollStyle};
`;
