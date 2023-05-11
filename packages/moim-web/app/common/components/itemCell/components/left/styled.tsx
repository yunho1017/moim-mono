import styled, { css } from "styled-components";
import memoize from "lodash/memoize";
import { px2rem } from "common/helpers/rem";
import { leftContentsSizeMap } from "./type";
import { IProps } from "./";

const getMargin = memoize(
  ({ touchArea, leftContentsSize: itemSize, margin }: IProps) => {
    const padding = Math.floor(
      (touchArea - leftContentsSizeMap[itemSize]?.size!) / 2,
    );
    const leftMargin = margin.left - padding;
    const rightMargin = margin.right - padding;

    return {
      marginLeft: leftMargin && leftMargin > 0 ? px2rem(leftMargin) : 0,
      marginRight: rightMargin && rightMargin > 0 ? px2rem(rightMargin) : 0,
    };
  },
);

export const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div<IProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => px2rem(props.touchArea)};
  height: ${props => px2rem(props.touchArea)};
  ${props =>
    Boolean(props.onClick) &&
    css`
      cursor: pointer;
    `};

  ${({ touchArea, leftContentsSize: itemSize, margin }) =>
    getMargin({ touchArea, leftContentsSize: itemSize, margin })}

  ${Item} {
    width: ${props =>
      px2rem(leftContentsSizeMap[props.leftContentsSize]?.size!)};
    height: ${props =>
      px2rem(leftContentsSizeMap[props.leftContentsSize]?.size!)};
  }
`;
