import styled, { css } from "styled-components";
import { H8Bold } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { IScrollParallaxContainer } from "common/components/appBar";

// export const getAppBarWrapperStyle = (top: number) => css`
//   width: 100%;
//   position: fixed !important;
//   top: ${top}px !important;
// `;

export const AppBarWrapperStickyStyle = css`
  width: 100%;
  position: fixed !important;
  top: 0 !important;
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
  justify-content: center;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  padding-right: ${px2rem(45)};
`;

export const CenterAlignmentWrapper = styled.div<IScrollParallaxContainer>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  opacity: ${props => props.opacity};
`;
