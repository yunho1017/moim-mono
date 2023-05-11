// Zeplin https://app.zeplin.io/project/5db7ff7b7ef2d22c5191d3cb/screen/5f5c3692145e177a62492dd2
import * as React from "react";
import styled, { css, FlattenInterpolation } from "styled-components";
import { useActions, useStoreState } from "app/store";
import { doBlockAction as doBlockActionDispatch } from "app/actions/referenceBlock";
import {
  H2BoldStyle,
  H4BoldStyle,
  H8BoldStyle,
  H8RegularStyle,
  H9BoldStyle,
  H10BoldStyle,
  B1RegularStyle,
  B2RegularStyle,
  B3RegularStyle,
  B4RegularStyle,
  LabelStyle,
} from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { PluginPanelContext } from "app/modules/secondaryView/plugin/context";
import {
  getBGColorStyle,
  marginToPadding,
  getMarginStyle,
} from "../helper/blockitStyleHelpers";
import { parseCommonFormat } from "common/helpers/moimDown";
import { browserLocale } from "app/intl";

interface IFontStyle {
  color?: string;
  align?: Moim.Blockit.IBlockAlignment;
  background?: Moim.Blockit.BlockitBackgroundType;
  padding?: Moim.Blockit.IBlockitMargin;
  overrideStyle?: FlattenInterpolation<any>;
  margin?: Moim.Blockit.IBlockitMargin;
  border?: Moim.Blockit.IBlockitBorder;
}

const baseWrapperStyle = css<IFontStyle>`
  display: inline-block;
  width: ${props => {
    const margin = (props.margin?.left ?? 0) + (props.margin?.right ?? 0);
    return margin ? `calc(100% - ${px2rem(margin)})` : "100%";
  }};
  ${props => marginToPadding(props.padding)};
  ${props => getMarginStyle(props.margin)};
  ${props => getBGColorStyle(props.background)}

  ${props =>
    props.align &&
    css`
      text-align: ${props.align};
    `};
  ${props =>
    props.color
      ? css`
          color: ${props.theme.getColorByAlias(props.color)};
        `
      : undefined};

  ${props =>
    props.border?.radius
      ? css`
          border-radius: ${px2rem(props.border.radius)};
        `
      : undefined};

  ${props =>
    props.border?.thickness
      ? css`
          border-width: ${px2rem(props.border.thickness)};
        `
      : undefined};

  ${props =>
    props.border?.color
      ? css`
          border-color: ${props.theme.getColorByAlias(props.border.color)};
        `
      : undefined};

  &[role="button"]:hover {
    text-decoration: underline;
  }

  ${props => props.overrideStyle};
`;

const headerWrapOneStyle = css`
  padding: ${px2rem(8)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${baseWrapperStyle};
`;

// NOTE: BODY랑 동일하지만 디자인가이드상 분리된 스타일이이라서 별개로 취급
const headerWrapTwoStyle = css`
  padding: ${px2rem(6)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${baseWrapperStyle};
`;

const bodyWrapStyle = css`
  padding: ${px2rem(4)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey800};
  ${baseWrapperStyle};
`;
const captionWrapStyle = css`
  padding: ${px2rem(2)} ${px2rem(16)};
  color: ${props => props.theme.colorV2.colorSet.grey300};
  ${baseWrapperStyle};
`;

export const H1 = styled.h1<IFontStyle>`
  ${H2BoldStyle};
  ${headerWrapOneStyle};
`;

export const H2 = styled.h2<IFontStyle>`
  ${H4BoldStyle};
  ${headerWrapOneStyle};
`;

export const H3 = styled.h3<IFontStyle>`
  ${H8BoldStyle};
  ${headerWrapOneStyle};
`;

export const H4 = styled.h4<IFontStyle>`
  ${H8RegularStyle};
  ${headerWrapTwoStyle};
`;

export const H5 = styled.h5<IFontStyle>`
  ${H8BoldStyle};
  ${headerWrapTwoStyle};
`;

export const H6 = styled.h6<IFontStyle>`
  ${H9BoldStyle};
  ${headerWrapTwoStyle};
`;

export const H7 = styled.span<IFontStyle>`
  ${H10BoldStyle};
  ${headerWrapTwoStyle};
`;

export const Body1 = styled.div<IFontStyle>`
  ${B1RegularStyle};
  ${bodyWrapStyle};
`;

export const Body2 = styled.div<IFontStyle>`
  ${B2RegularStyle};
  ${bodyWrapStyle};
`;

export const Body3 = styled.div<IFontStyle>`
  ${B3RegularStyle};
  ${bodyWrapStyle};
`;

export const Caption = styled.div<IFontStyle>`
  ${B4RegularStyle};
  ${captionWrapStyle};
`;

export const Label = styled.div<IFontStyle>`
  ${LabelStyle};
  ${captionWrapStyle};
`;

export const PlainText = styled.span<IFontStyle>`
  ${bodyWrapStyle};
`;

interface IProps
  extends Omit<Moim.Blockit.ITextBlock, "type" | "style" | "content"> {
  fontStyle?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "h7"
    | "body1"
    | "body2"
    | "body3"
    | "caption"
    | "label";
  wrapperStyle?: FlattenInterpolation<any>;
  content: React.ReactNode;
}

const Texts: React.FC<IProps> = ({
  botId,
  content,
  color,
  align,
  fontStyle,
  wrapperStyle,
  actionId,
  margin,
  params,
  background,
  padding,
  border,
  textSets,
}) => {
  const isInPluginPanel = React.useContext(PluginPanelContext);
  const { defaultLocale } = useStoreState(storeState => ({
    defaultLocale: storeState.app.locale,
  }));
  const { doBlockAction } = useActions({
    doBlockAction: doBlockActionDispatch,
  });
  const locale = browserLocale(defaultLocale ?? undefined);
  const role = React.useMemo(() => (actionId ? "button" : undefined), [
    actionId,
  ]);
  const displayContent = React.useMemo(() => {
    if (typeof content === "string") {
      let newText = content;
      const parsedResult = parseCommonFormat(content);
      parsedResult.forEach(item => {
        let replaceData = item.fallback;

        switch (item.type) {
          case "text_sets": {
            const textSet = textSets?.[item.value];
            if (textSet) {
              replaceData = textSet[locale].singular;
            }
            break;
          }
        }

        newText = newText.replace(item.origin, replaceData);
      });

      return newText;
    }

    return content;
  }, [content, locale, textSets]);

  const handleClick = React.useCallback(
    e => {
      if (botId && actionId) {
        e.preventDefault();
        e.stopPropagation();
        doBlockAction(
          {
            botId,
            data: {
              actionId,
              params,
            },
          },
          isInPluginPanel,
        );
      }
    },
    [actionId, botId, doBlockAction, isInPluginPanel, params],
  );

  if (!fontStyle) {
    return <PlainText>{displayContent}</PlainText>;
  }

  switch (fontStyle) {
    case "h1": {
      return (
        <H1
          role={role}
          color={color}
          align={align}
          overrideStyle={wrapperStyle}
          margin={margin}
          padding={padding}
          background={background}
          border={border}
          onClick={handleClick}
        >
          {displayContent}
        </H1>
      );
    }
    case "h2": {
      return (
        <H2
          role={role}
          color={color}
          align={align}
          overrideStyle={wrapperStyle}
          margin={margin}
          padding={padding}
          background={background}
          border={border}
          onClick={handleClick}
        >
          {displayContent}
        </H2>
      );
    }
    case "h3": {
      return (
        <H3
          role={role}
          color={color}
          align={align}
          overrideStyle={wrapperStyle}
          margin={margin}
          padding={padding}
          background={background}
          border={border}
          onClick={handleClick}
        >
          {displayContent}
        </H3>
      );
    }
    case "h4": {
      return (
        <H4
          role={role}
          color={color}
          align={align}
          overrideStyle={wrapperStyle}
          margin={margin}
          padding={padding}
          background={background}
          border={border}
          onClick={handleClick}
        >
          {displayContent}
        </H4>
      );
    }
    case "h5": {
      return (
        <H5
          role={role}
          color={color}
          align={align}
          overrideStyle={wrapperStyle}
          margin={margin}
          padding={padding}
          background={background}
          border={border}
          onClick={handleClick}
        >
          {displayContent}
        </H5>
      );
    }
    case "h6": {
      return (
        <H6
          role={role}
          color={color}
          align={align}
          overrideStyle={wrapperStyle}
          margin={margin}
          padding={padding}
          background={background}
          border={border}
          onClick={handleClick}
        >
          {displayContent}
        </H6>
      );
    }
    case "h7": {
      return (
        <H7
          role={role}
          color={color}
          align={align}
          overrideStyle={wrapperStyle}
          margin={margin}
          padding={padding}
          background={background}
          border={border}
          onClick={handleClick}
        >
          {displayContent}
        </H7>
      );
    }
    case "body1": {
      return (
        <Body1
          role={role}
          color={color}
          align={align}
          overrideStyle={wrapperStyle}
          margin={margin}
          padding={padding}
          background={background}
          border={border}
          onClick={handleClick}
        >
          {displayContent}
        </Body1>
      );
    }
    case "body2": {
      return (
        <Body2
          role={role}
          color={color}
          align={align}
          overrideStyle={wrapperStyle}
          margin={margin}
          padding={padding}
          background={background}
          border={border}
          onClick={handleClick}
        >
          {displayContent}
        </Body2>
      );
    }
    case "body3": {
      return (
        <Body3
          role={role}
          color={color}
          align={align}
          overrideStyle={wrapperStyle}
          margin={margin}
          padding={padding}
          background={background}
          border={border}
          onClick={handleClick}
        >
          {displayContent}
        </Body3>
      );
    }
    case "caption": {
      return (
        <Caption
          role={role}
          color={color}
          align={align}
          overrideStyle={wrapperStyle}
          margin={margin}
          padding={padding}
          background={background}
          border={border}
          onClick={handleClick}
        >
          {displayContent}
        </Caption>
      );
    }
    case "label": {
      return (
        <Label
          role={role}
          color={color}
          align={align}
          overrideStyle={wrapperStyle}
          margin={margin}
          padding={padding}
          background={background}
          border={border}
          onClick={handleClick}
        >
          {displayContent}
        </Label>
      );
    }
  }
};

export default Texts;
