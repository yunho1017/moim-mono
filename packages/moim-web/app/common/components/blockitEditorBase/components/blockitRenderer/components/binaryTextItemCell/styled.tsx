import styled, { css, FlattenInterpolation } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { marginToPadding } from "../helper/blockitStyleHelpers";
import { MEDIA_QUERY } from "common/constants/responsive";

export const PlacementRootContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const PlacementWrapper = styled.div<{
  contentWidth?: "fit-container" | number;
}>`
  width: ${props => {
    if (!props.contentWidth || props.contentWidth === "fit-container") {
      return "100%";
    }
    return `${props.contentWidth}%`;
  }};
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: 100%;
  }
`;

export const Wrapper = styled.div<{
  sectionWidth?: "fit-container" | number;
  overrideStyle?: FlattenInterpolation<any>;
  margin?: Moim.Blockit.IBlockitMargin;
}>`
  width: ${props => {
    if (!props.sectionWidth || props.sectionWidth === "fit-container") {
      return "100%";
    }
    return `${props.sectionWidth}%`;
  }};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: ${px2rem(6)} 0;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: 100%;
  }

  ${props => marginToPadding(props.margin)};
  ${props => props.overrideStyle};
`;

export const Container = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
`;
export const Left = styled.div<{ ratio: number }>`
  width: 100%;
  flex: ${props => props.ratio};
  min-width: 0;
`;
export const Right = styled.div<{ ratio: number }>`
  width: 100%;
  flex: ${props => props.ratio};
  min-width: 0;
  margin-left: ${px2rem(4)};
`;

export const TextBlockWrapperStyle = css`
  padding: 0;
`;
