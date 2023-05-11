import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { px2rem } from "./rem";

interface IMultiLineEllipsisOption {
  fontSize: number;
  lineHeight: number;
}

export const multiLineEllipsis = (
  line: number,
  options?: IMultiLineEllipsisOption,
) => css`
  display: block;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: ${line};
  -webkit-box-orient: vertical;
  word-break: break-all;
  ${options &&
    css`
      font-size: ${px2rem(options.fontSize)};
      line-height: ${px2rem(options.lineHeight)};
      max-height: ${px2rem(line * options.lineHeight)};
    `};
`;

export const LinkBlock = styled(Link)`
  display: block;
`;

export const LinkFull = styled(LinkBlock)`
  height: 100%;
  width: 100%;
`;
