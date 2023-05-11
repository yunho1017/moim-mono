import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { B2Regular } from "common/components/designSystem/typos";

export const Wrapper = styled.div<{ mobileHeight: number }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    overflow: hidden;
  }
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    min-height: ${props => props.mobileHeight}px;
  }
`;

export const ThreadInputWrapper = styled.div<{
  visibility: boolean;
}>`
  position: relative;
  width: 100%;
  margin-top: ${px2rem(12)};
  padding: 0 ${px2rem(16)} ${px2rem(23)};
  transition-property: opacity, visibility;
  transition-duration: 200ms, 0s;
  transition-delay: 0s, 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  opacity: ${props => (props.visibility ? 1 : 0)};
  visibility: ${props => (props.visibility ? "visible" : "hidden")};
  ${props => !props.visibility && `height: 0;`};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: ${props => props.theme.zIndexes.gnbSticky + 1};
  }
`;

export const NoRightTextWrapper = styled(B2Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
  height: ${px2rem(44)};
  line-height: ${px2rem(44)};
  border-radius: ${px2rem(4)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  z-index: ${props => props.theme.zIndexes.gnbSticky};
`;

export const BackgroundLayer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 ${px2rem(16)};
  background-color: ${props => props.theme.colorV2.colorSet.grey10};
`;
