import styled, { css } from "styled-components";
import { TextButton } from "common/components/designSystem/buttons";
import { px2rem } from "common/helpers/rem";
import CloseIcon from "@icon/24-close-b.svg";

import { useHoverStyle } from "common/components/designSystem/styles";
import { MEDIA_QUERY } from "common/constants/responsive";
import DividerBase from "common/components/divider";
import { B1Regular } from "common/components/designSystem/typos";

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;

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

export const NextButton = styled(TextButton).attrs({
  size: "m",
  direction: "right",
})``;

export const ListWrapper = styled.div`
  background-color: ${props => props.theme.colorV2.colorSet.white1000};

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: 0 ${px2rem(24)};
  }
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

export const TagItemWrapper = styled.div`
  width: 100%;
  height: ${px2rem(60)};
  padding: 0 ${px2rem(16)};
  display: flex;
  align-items: center;
  ${useHoverStyle}
`;

export const TagTitle = styled(B1Regular)`
  flex: 1;
`;
