import { css } from "styled-components";
import { px2rem } from "common/helpers/rem";

export const marginToPadding = (margin?: Moim.Blockit.IBlockitMargin) => {
  let style = css``;
  if (!margin) return style;

  if (margin.top !== undefined) {
    style = style.concat(
      css`
        padding-top: ${px2rem(margin.top)};
      `,
    );
  }

  if (margin.bottom !== undefined) {
    style = style.concat(
      css`
        padding-bottom: ${px2rem(margin.bottom)};
      `,
    );
  }

  if (margin.left !== undefined) {
    style = style.concat(
      css`
        padding-left: ${px2rem(margin.left)};
      `,
    );
  }

  if (margin.right !== undefined) {
    style = style.concat(
      css`
        padding-right: ${px2rem(margin.right)};
      `,
    );
  }

  return style;
};

export const getMarginStyle = (margin?: Moim.Blockit.IBlockitMargin) => {
  let style = css``;
  if (!margin) return style;

  if (margin.top !== undefined) {
    style = style.concat(
      css`
        margin-top: ${px2rem(margin.top)};
      `,
    );
  }

  if (margin.bottom !== undefined) {
    style = style.concat(
      css`
        margin-bottom: ${px2rem(margin.bottom)};
      `,
    );
  }

  if (margin.left !== undefined) {
    style = style.concat(
      css`
        margin-left: ${px2rem(margin.left)};
      `,
    );
  }

  if (margin.right !== undefined) {
    style = style.concat(
      css`
        margin-right: ${px2rem(margin.right)};
      `,
    );
  }

  return style;
};

export function getBGColorStyle(
  background?: Moim.Blockit.BlockitBackgroundType,
) {
  if (background === "default") {
    return css`
      border: solid 1px ${props => props.theme.colorV2.colorSet.grey50};
      box-shadow: 0 ${px2rem(2)} ${px2rem(6)} 1px
        ${props => props.theme.colorV2.colorSet.grey50};
      background-color: ${props => props.theme.colorV2.colorSet.white1000};
      color: ${props => props.theme.colorV2.colorSet.grey800};
    `;
  } else if (background === "brand-colored") {
    return css`
      background-image: linear-gradient(
        106deg,
        ${props => props.theme.colorV2.secondary.main},
        ${props => props.theme.colorV2.primary.main} 76%
      );

      color: ${props => props.theme.colorV2.colorSet.fog900};
    `;
  }
}
