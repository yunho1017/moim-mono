import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";

const InfoStyle = css<{ sizeHeight?: number }>`
  width: 100%;
  height: ${props => px2rem(props?.sizeHeight ?? 44)};
  display: flex;
  align-items: center;

  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    height: ${px2rem(34)};
  }
`;

export const InfoLinkWrapper = styled(Link)`
  ${InfoStyle};
`;

export const InfoAnchorWrapper = styled.a`
  ${InfoStyle};
`;
