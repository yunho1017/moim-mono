import styled from "styled-components";
import { px2rem } from "common/helpers/rem";

export const MAX_HEIGHT = 64;

export const Wrapper = styled.div`
  padding: ${px2rem(4)} ${px2rem(16)};
  max-height: ${px2rem(87)};
  overflow: hidden;
`;

export const PositionListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: ${px2rem(4)};
  margin-bottom: -${px2rem(4)};
`;

export const PositionCell = styled.span`
  display: inline-flex;
  max-width: ${px2rem(270)};
  margin: 0 ${px2rem(8)} ${px2rem(8)} 0;

  &:hover {
    opacity: 0.6;
    transition: opacity 200ms ease-in;
  }
`;
