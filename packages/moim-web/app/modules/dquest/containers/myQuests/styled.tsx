import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { IScrollParallaxContainer } from "common/components/appBar";
import { H4BoldStyle, H8BoldStyle } from "common/components/designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";
import BackIconBase from "@icon/24-back-b.svg";
import { TextGeneralButton } from "common/components/designSystem/buttons";

export const ParallaxWrapper = styled.div<IScrollParallaxContainer>`
  opacity: ${props => props.opacity};
  transition: opacity 200ms ease-in-out;
`;

export const ParallaxTitle = styled.div`
  margin: ${px2rem(16)} 0 ${px2rem(8)};
  padding: ${px2rem(8)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${H4BoldStyle}
`;

export const AppBarTitleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const AppBarStickyWrapperStyle = css`
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
`;

export const RoutedTapContainerStyle = css`
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    width: 100%;
    height: 100%;
  }
`;

export const DefaultLayoutBodyStyle = css`
  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    width: 100%;
    height: 100%;
  }
`;

export const LeftButtonWrapper = styled.div``;

export const BackIcon = styled(BackIconBase).attrs({
  role: "button",
  size: "s",
  touch: 24,
})``;

export const ViewAllButtonContainer = styled.div.attrs({ role: "button" })`
  cursor: pointer;
  width: 100%;
  height: ${px2rem(48)};
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 ${px2rem(2)} ${px2rem(8)} 0 rgba(31, 38, 42, 0.2);

  border-top: 1px solid ${props => props.theme.colorV2.colorSet.grey50};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  z-index: ${props => props.theme.zIndexes.toast};
`;

export const ViewAllTextButton = styled(TextGeneralButton).attrs({ size: "l" })`
  width: 100%;
  height: 100%;
  padding: ${px2rem(8)} ${px2rem(16)};
  border-radius: 0;
  ${H8BoldStyle}
  color: ${props => props.theme.colorV2.colorSet.grey800};
`;
