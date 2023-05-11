import * as React from "react";
import { Link } from "react-router-dom";
import ReactResizeDetector from "react-resize-detector";
import styled, { css } from "styled-components";
import { px2rem } from "app/common/helpers/rem";
import { H10BoldStyle } from "common/components/designSystem/typos";
import { MEDIA_QUERY } from "common/constants/responsive";
import ShavedText from "common/components/shavedText";
import { useSingleLineStyle } from "common/components/designSystem/styles";
import { AnalyticsClass } from "common/helpers/analytics/analytics";

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Wrapper = styled.div<{
  width?: number;
}>`
  width: ${props => `${props.width ?? 100}%`};
`;

export const GridLayout = styled.div<{
  rowCount: number;
  columnCount: number;
  gapSize?: number;
}>`
  width: 100%;
  display: grid;
  grid-gap: ${props => px2rem(props.gapSize ?? 8)};
  grid-template-columns: ${props =>
    `repeat(${props.columnCount}, minmax(0, 1fr))`};
  grid-template-rows: ${props => `repeat(${props.rowCount}, minmax(0, 1fr))`};
  place-content: center;

  @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
    padding: ${px2rem(8)} 0;
  }
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    padding: ${px2rem(8)} ${px2rem(16)};
  }
`;

const TextWrapper = styled.div<{ isSingleLine: boolean }>`
  width: 100%;
  text-align: center;
  padding: ${props => (props.isSingleLine ? px2rem(4) : px2rem(8))}};
  ${H10BoldStyle};
  ${props =>
    props.isSingleLine &&
    css`
      height: ${px2rem(27)};

      > span {
        display: inline-block;
        width: 100%;
        ${useSingleLineStyle}
      }
    `};
`;

const ImageWrapper = styled.div<{ containerWidth?: number }>`
  padding: ${px2rem(4)} ${px2rem(16)} 0;
  ${props => {
    if (props.containerWidth) {
      const w = props.containerWidth - 32;
      return css`
        > img {
          width: ${px2rem(w)};
          height: ${px2rem(w)};
        }
      `;
    }
  }}
`;

const ItemContainer = styled.div<{
  withImage: boolean;
  adjustHeight?: number;
  selected?: boolean;
  itemStyle?: Moim.Blockit.IBlockitStyle;
}>`
  position: relative;
  width: 100%;
  height: ${({ adjustHeight }) =>
    adjustHeight ? px2rem(adjustHeight) : "100%"};
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &::after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: border 200ms ease-in-out;
    ${props =>
      !props.withImage &&
      css`
        border: ${px2rem(props.itemStyle?.border?.width || 1)} solid
          ${props.theme.getColorByAlias(
            props.itemStyle?.border?.color,
            props.theme.colorV2.colorSet.grey50,
          )};
        border-radius: ${px2rem(props.itemStyle?.border?.radius || 0)};
      `};
    ${props =>
      props.selected &&
      css`
        border: ${px2rem(2)} solid ${props.theme.colorV2.accent};
      `};
  }

  &:hover {
    &::after {
      border: 1px solid ${props => props.theme.colorV2.colorSet.grey300};
    }
  }
`;

interface IItemProps {
  categoryId: string;
  text: string;
  href: string;
  selected?: boolean;
  imageSrc?: string;
  itemStyle?: Moim.Blockit.IBlockitStyle;
}

export const Item: React.FC<IItemProps> = React.memo(
  ({ text, imageSrc, href, selected, itemStyle, categoryId }) => {
    const [itemWidth, setItemWidth] = React.useState<number | undefined>();
    const textElement = React.useMemo(() => {
      if (imageSrc) {
        return (
          <TextWrapper isSingleLine={true}>
            <span>{text}</span>
          </TextWrapper>
        );
      }
      return (
        <TextWrapper isSingleLine={false}>
          <ShavedText line={3} value={text} />
        </TextWrapper>
      );
    }, [imageSrc, text]);

    const handleResize = React.useCallback(w => {
      setItemWidth(w);
    }, []);

    return (
      <Link
        to={href}
        onClick={() => {
          AnalyticsClass.getInstance().blockCategoryNavigationSelect({
            categoryId,
          });
        }}
      >
        <ReactResizeDetector handleWidth={true} onResize={handleResize}>
          <ItemContainer
            adjustHeight={itemWidth}
            withImage={Boolean(imageSrc)}
            selected={selected}
            itemStyle={itemStyle}
          >
            {imageSrc && (
              <ImageWrapper containerWidth={itemWidth}>
                <img src={imageSrc} />
              </ImageWrapper>
            )}
            {textElement}
          </ItemContainer>
        </ReactResizeDetector>
      </Link>
    );
  },
);
