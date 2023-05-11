import styled, { css, FlattenInterpolation } from "styled-components";
import MoreIconBase from "@icon/18-rightcircle-g.svg";
import { px2rem } from "common/helpers/rem";
import { marginToPadding } from "../../helper/blockitStyleHelpers";
import {
  H9Bold,
  H8Regular,
  B4Regular,
  B3RegularStyle,
  B4RegularStyle,
} from "common/components/designSystem/typos";
import { SkeletonBox } from "common/components/skeleton";
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
  padding: ${px2rem(8)} ${px2rem(4)};
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: 100%;
    flex-direction: column;
    padding: ${px2rem(16)};
  }

  ${props => marginToPadding(props.margin)};
  ${props => props.overrideStyle};
`;

export const BoxSkeleton = styled(SkeletonBox).attrs({
  width: px2rem(325),
  height: px2rem(148),
})`
  & + & {
    margin-left: ${px2rem(12)};
  }
`;

export const Box = styled.div`
  width: 100%;
  flex: 1;
  min-width: 0;

  border-radius: ${px2rem(4)};
  background-color: ${props => props.theme.colorV2.colorSet.grey10};

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: ${px2rem(4)} ${px2rem(16)} ${px2rem(16)};
    height: fit-content;
    & + & {
      margin-top: ${px2rem(12)};
    }
  }

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: ${px2rem(4)} ${px2rem(16)};
    min-height: ${px2rem(148)};
    & + & {
      margin-left: ${px2rem(12)};
    }
  }
`;

export const HeaderTitle = styled(H9Bold)`
  width: 100%;
  min-width: 0;
  flex: 1;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  margin-right: ${px2rem(3)};
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const HeaderMore = styled.div`
  width: ${px2rem(18)};
  height: ${px2rem(18)};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BoxHeader = styled.div`
  width: 100%;
  height: ${px2rem(44)};
  padding: ${px2rem(11)} 0;
  display: flex;
  align-items: center;
  margin-bottom: ${px2rem(8)};
`;

export const PositionChipWrapper = styled.div``;

export const PositionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: ${px2rem(8)};
`;

export const InnerTitle = styled(H8Regular)`
  padding: ${px2rem(6)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const InnerTitleDescription = styled(B4Regular)`
  padding: ${px2rem(2)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey300};

  word-break: break-all;
`;

export const TokenCount = styled(B4Regular)`
  padding: ${px2rem(2)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey600};
`;

export const Inner = styled.div`
  flex: 1;
  min-height: 0;
  width: 100%;
  height: 100%;
`;

export const BudgetWrapper = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
`;

export const BudgetInfo = styled.div`
  width: 100%;
  min-width: 0;
  flex: 1;
  margin-right: ${px2rem(8)};
`;

export const chipStyle = css`
  ${B3RegularStyle}
`;

export const CircularBarWrapper = styled.div`
  width: ${px2rem(70)};
  height: ${px2rem(70)};

  .legendTitle {
    color: ${props => props.theme.colorV2.colorSet.grey800};
    ${B3RegularStyle}
  }
  .legendDesc {
    color: ${props => props.theme.colorV2.colorSet.grey300};
    ${B4RegularStyle}
  }

  /*
 * react-circular-progressbar styles
 * All of the styles in this file are configurable!
 */

  .CircularProgressbar {
    /*
   * This fixes an issue where the CircularProgressbar svg has
   * 0 width inside a "display: flex" container, and thus not visible.
   */
    width: 100%;
    /*
   * This fixes a centering issue with CircularProgressbarWithChildren:
   * https://github.com/kevinsqi/react-circular-progressbar/issues/94
   */
    vertical-align: middle;
  }

  .CircularProgressbar .CircularProgressbar-path {
    stroke: ${props => props.theme.colorV2.colorSet.grey800};
    stroke-linecap: round;
    transition: stroke-dashoffset 0.5s ease 0s;
  }

  .CircularProgressbar .CircularProgressbar-trail {
    stroke: ${props => props.theme.colorV2.colorSet.grey50};
    /* Used when trail is not full diameter, i.e. when props.circleRatio is set */
    stroke-linecap: round;
  }

  .CircularProgressbar .CircularProgressbar-text {
    fill: ${props => props.theme.colorV2.colorSet.grey800};
    font-size: 20px;
    dominant-baseline: middle;
    text-anchor: middle;
  }

  .CircularProgressbar .CircularProgressbar-background {
    fill: ${props => props.theme.colorV2.colorSet.grey50};
  }

  .CircularProgressbar.CircularProgressbar-inverted
    .CircularProgressbar-background {
    fill: ${props => props.theme.colorV2.colorSet.grey800};
  }

  .CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-text {
    fill: #fff;
  }

  .CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-path {
    stroke: #fff;
  }

  .CircularProgressbar.CircularProgressbar-inverted .CircularProgressbar-trail {
    stroke: transparent;
  }
`;

export const MoreIcon = styled(MoreIconBase).attrs({ size: "xs" })``;
