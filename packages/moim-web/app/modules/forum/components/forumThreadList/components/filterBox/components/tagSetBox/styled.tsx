import styled, { css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import {
  LeftArrowButton,
  RightArrowButton,
  ExpandButton,
  LabelList,
} from "common/components/horizontalLabelList/styledComponents";
import { MEDIA_QUERY } from "common/constants/responsive";

const BOX_HEIGHT = 42;

export const Container = styled.div<{ visibleTopTabNavigation?: boolean }>`
  width: 100%;
  min-height: ${px2rem(BOX_HEIGHT)};
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    ${props =>
      props.visibleTopTabNavigation
        ? css`
            border-top: 1px solid ${props.theme.colorV2.colorSet.grey50};
          `
        : css`
            border-bottom: 1px solid ${props.theme.colorV2.colorSet.grey50};
          `};
  }
`;

export const TagItemWrapper = styled.div`
  width: ${px2rem(320)};
  min-height: ${px2rem(53)};
  max-height: ${px2rem(251)};
  padding: ${px2rem(16)} ${px2rem(8)} ${px2rem(4)};
`;

export const LabelListSectionStyle = css<{ expanded: boolean }>`
  min-height: ${px2rem(BOX_HEIGHT)};
  ${props => !props.expanded && `overflow: hidden;`};
`;
export const LabelListWrapperStyle = css<{ expanded: boolean }>`
  min-height: ${px2rem(BOX_HEIGHT)};
  padding: ${px2rem(8)};

  ${LeftArrowButton},
  ${RightArrowButton} {
    top: ${px2rem(10)};
  }

  ${ExpandButton} {
    top: ${px2rem(6)};
  }

  ${props =>
    props.expanded &&
    css`
      position: relative;
      box-shadow: none;

      ${LabelList} {
        min-height: auto;
        max-height: ${px2rem(97)};
      }

      ${ExpandButton} {
        top: ${px2rem(7)};
        right: ${px2rem(9)};
      }
    `}
`;
