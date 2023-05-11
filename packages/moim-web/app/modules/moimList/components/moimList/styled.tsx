import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { useScrollStyle } from "common/components/designSystem/styles";
import { H8Bold } from "common/components/designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";

export const MAX_CARD_WIDTH = 343;
export const MIN_CARD_WIDTH = 261;
export const CARD_GAP = 16;

export const Wrapper = styled.div`
  flex: 1;
  min-width: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    overflow: hidden;
  }
`;

export const Content = styled.div<{ column: number }>`
  padding: ${px2rem(16)};
  height: 100%;
  display: grid;
  grid-template-columns: repeat(
    ${props => props.column},
    minmax(${px2rem(MIN_CARD_WIDTH)}, ${px2rem(MAX_CARD_WIDTH)})
  );
  grid-auto-rows: max-content;

  grid-column-gap: ${px2rem(CARD_GAP)};
  grid-row-gap: ${px2rem(CARD_GAP)};
  grid-auto-flow: row;
  justify-content: center;
`;

export const ScrollSection = styled.div`
  flex: 1;
  min-width: 0;

  ${useScrollStyle}
`;

export const EmptyWrapper = styled.div`
  width: 100%;
  min-height: 0;
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin-top: 30%;
  }
`;

export const EmptyEmojiWrapper = styled.div`
  width: ${px2rem(80)};
  height: ${px2rem(120)};
  font-size: ${px2rem(80)};
  line-height: 1.5;
`;

export const EmptyGuideText = styled(H8Bold)`
  margin: ${px2rem(16)};
  text-align: center;
  white-space: pre-line;
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;

export const LargeDivider = styled.div`
  width: 100%;
  height: ${px2rem(4)};
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
`;

export const StickyWrapper = styled.div<{ top: number }>`
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    position: sticky;
    top: ${props => props.top}px;
    left: 0;
    right: 0;
    z-index: ${props => props.theme.zIndexes.gnbSticky};
  }
`;

export const HeaderWrapper = styled.div`
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
`;

export const OptionsWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-end;
  margin-top: ${px2rem(16)};
`;
