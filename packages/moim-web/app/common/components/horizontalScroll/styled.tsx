import { px2rem } from "common/helpers/rem";
import styled, { FlattenInterpolation } from "styled-components";

export const ArrowBottomPlace = styled.div`
  .react-horizontal-scrolling-menu--wrapper {
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .react-horizontal-scrolling-menu--scroll-container {
    flex-basis: 100%;
    flex-shrink: 0;
  }

  /* Change position of container so arrows will be at top/bottom */
  .react-horizontal-scrolling-menu--scroll-container {
    order: -1; /* order: 1; for top position, -1; for bottom position */
  }
`;

export const ArrowTopPlace = styled.div`
  .react-horizontal-scrolling-menu--wrapper {
    flex-wrap: wrap;
    justify-content: flex-end;
  }

  .react-horizontal-scrolling-menu--scroll-container {
    flex-basis: 100%;
    flex-shrink: 0;
  }

  /* Change position of container so arrows will be at top/bottom */
  .react-horizontal-scrolling-menu--scroll-container {
    order: 1; /* order: 1; for top position, -1; for bottom position */
  }
`;

export const ItemContainer = styled.div<{
  itemId?: Moim.Id;
  overrideStyle?: FlattenInterpolation<any>;
}>`
  ${props => props.overrideStyle}
`;

export const Wrapper = styled.div<{
  showArrow: boolean;
}>`
  width: 100%;
  margin-top: ${props => (props.showArrow ? px2rem(8) : 0)};
`;
