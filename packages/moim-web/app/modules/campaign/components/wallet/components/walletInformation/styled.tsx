import styled from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import {
  B4Regular,
  H4Bold,
  B1Regular,
  B3RegularStyle,
  B4RegularStyle,
} from "common/components/designSystem/typos";

export const Wrapper = styled.div`
  width: 100%;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: 0 ${px2rem(16)};
  }
`;

export const Box = styled.div`
  width: 100%;
  padding: ${px2rem(24)} ${px2rem(16)};
  background-color: ${props => props.theme.colorV2.colorSet.grey10};

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    border-radius: ${px2rem(4)};
  }
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  column-gap: ${px2rem(16)};

  .left,
  .right {
    width: 100%;
    flex: 1;
    min-width: 0;
  }
`;

export const Title = styled(H4Bold)`
  padding: ${px2rem(6)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  white-space: pre-wrap;
  word-break: break-all;
`;
export const SubTitle = styled(B1Regular)`
  padding: ${px2rem(6)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey800};
  white-space: pre-wrap;
  word-break: break-all;
`;

export const CaptionLabel = styled(B4Regular)`
  padding: ${px2rem(2)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey300};
`;

export const CaptionToken = styled(B4Regular)`
  padding: ${px2rem(2)} 0;
  color: ${props => props.theme.colorV2.colorSet.grey600};
  white-space: pre-wrap;
  word-break: break-all;
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
