import styled, { css } from "styled-components";
import { rgba } from "polished";
import { H8Bold } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { IScrollParallaxContainer } from "common/components/appBar";

export const getAppBarWrapperStyle = (top: number) => css`
  width: 100%;
  position: fixed !important;
  top: ${top}px !important;
`;

export const AppBarWrapperStickedStyle = css`
  width: 100%;
  background-color: ${props =>
    rgba(props.theme.colorV2.colorSet.white1000, 0.95)};
`;

export const RightWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const MoreMenuWrapper = styled.div`
  display: inline-block;
`;

export const Title = styled(H8Bold)`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  & > * + * {
    margin-left: ${px2rem(4)};
  }
`;

export const CenterAlignmentWrapper = styled.div<IScrollParallaxContainer>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: ${props => props.opacity};
`;
