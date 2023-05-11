import styled, { css } from "styled-components";
import { TextButton } from "common/components/designSystem/buttons";
import { px2rem } from "common/helpers/rem";
import CloseIcon from "@icon/24-close-b.svg";

import { MEDIA_QUERY } from "common/constants/responsive";
import DividerBase from "common/components/divider";
import { B1Regular } from "common/components/designSystem/typos";

export const Wrapper = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  min-height: 100%;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    width: ${px2rem(455)};
  }
`;

export const StickyWrapper = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  z-index: ${props => props.theme.zIndexes.wrapper};
  width: 100%;
`;
export const SearchInputWrapper = styled.div`
  z-index: ${props => props.theme.zIndexes.wrapper};
  width: 100%;
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: 0 ${px2rem(24)};
  }
`;

export const NextButton = styled(TextButton).attrs({
  size: "m",
  direction: "right",
})<{ isActive: boolean; isLoading: boolean }>`
  ${props =>
    !props.isActive &&
    css`
      opacity: 0.4;
      cursor: not-allowed;
    `};
  ${props =>
    props.isLoading &&
    css`
      opacity: 0.4;
      cursor: progress;
    `};
`;

export const CloseButton = styled(CloseIcon).attrs({
  role: "button",
  size: "s",
  touch: 24,
})``;

export const appBarStyle = css`
  margin-top: ${px2rem(8)};
`;

export const Divider = styled(DividerBase).attrs(props => ({
  color: props.theme.colorV2.colorSet.grey10,
  height: px2rem(4),
}))``;

export const EmptyWrapper = styled.div`
  min-width: 0;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EmptyText = styled(B1Regular)`
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;
