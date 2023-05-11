import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { AlertBadge } from "common/components/alertBadge/index";
// icons

import FilterEmptyIconBase from "@icon/24-label-filter.svg";
import FilterHasIconBase from "@icon/24-label-filter-copy.svg";
import { MEDIA_QUERY } from "common/constants/responsive";

export const BOX_HEIGHT = 42;

export const FilterBoxContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: ${px2rem(BOX_HEIGHT)};
  background-color: ${props => props.theme.colorV2.colorSet.white1000};
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    border-bottom: 1px solid ${props => props.theme.colorV2.colorSet.grey50};
  }
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 0;
  flex: 1;
`;
export const Right = styled.div`
  display: flex;
  align-items: center;
`;

export const TagSelectedCountBadge = styled(AlertBadge)`
  border: 1px solid ${props => props.theme.colorV2.colorSet.grey300};
  color: ${props => props.theme.colorV2.colorSet.grey600};
  user-select: none;
`;

export const FilterSetIconHolder = styled.button<{
  onlyOneMenuWithCountBadge?: boolean;
}>`
  display: flex;
  align-items: center;
  width: ${px2rem(42)};
  height: ${px2rem(42)};
  ${props =>
    Boolean(props.onlyOneMenuWithCountBadge)
      ? `margin-right: ${px2rem(14)};`
      : null}

  &:hover {
    background-color: ${props => props.theme.colorV2.colorSet.grey10};
  }
`;

export const FilterEmptyIcon = styled(FilterEmptyIconBase).attrs({
  size: "s",
  touch: 42,
})``;
export const FilterHasIcon = styled(FilterHasIconBase).attrs({
  size: "s",
  touch: 42,
})``;

export const OrderMenuBoxStyle = css`
  height: ${px2rem(BOX_HEIGHT)};
  padding-left: ${px2rem(8)};

  &:hover {
    background-color: ${props => props.theme.colorV2.colorSet.grey10};
  }
`;
