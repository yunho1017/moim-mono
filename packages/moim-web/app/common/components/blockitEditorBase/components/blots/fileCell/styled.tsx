import styled, { css } from "styled-components";
import { MEDIA_QUERY } from "common/constants/responsive";
import { px2rem } from "common/helpers/rem";

const FILE_CELL_MOBILE_MARGIN = 16;

export const FileContainer = styled.div<{
  isSelected: boolean;
}>`
  ${props => props.isSelected && css``}
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin: 0 -${px2rem(16)};
  }
`;

export const FileCellWrapperStyle = css`
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    width: calc(100% - ${px2rem(FILE_CELL_MOBILE_MARGIN * 2)});
    margin: 0 ${px2rem(FILE_CELL_MOBILE_MARGIN)};
  }
`;

export const FilePreviewWrapperStyle = css`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FilePreviewContentWrapperStyle = css`
  width: 100%;
  max-height: 100%;
  height: auto;
`;

export const FilePreviewFullWidthContentWrapperStyle = css`
  ${FilePreviewContentWrapperStyle};
  width: 100%;
`;
