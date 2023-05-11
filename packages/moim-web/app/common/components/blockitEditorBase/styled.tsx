import styled, { css, FlattenInterpolation } from "styled-components";
import { rgba } from "polished";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "common/constants/responsive";
import { enWordKeepAllStyle } from "../designSystem/styles";
import {
  pB1RegularStyle,
  B2RegularStyle,
} from "common/components/designSystem/typos";

export const Container = styled.div<{
  readonly: boolean;
  enableSingleLine: boolean;
  containerStyle?: FlattenInterpolation<any>;
}>`
  width: 100%;
  height: 100%;

  .ql-container {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    margin: 0;
    position: relative;

    ${pB1RegularStyle}
    color: ${props => props.theme.colorV2.colorSet.grey800};
    font-weight: normal;

    ${props => props.containerStyle};

    &.ql-disabled .ql-tooltip {
      visibility: hidden;
    }
    &:not(.ql-disabled) li[data-list="checked"] > .ql-ui,
    &:not(.ql-disabled) li[data-list="unchecked"] > .ql-ui {
      cursor: pointer;
    }


  }

  .ql-clipboard {
    left: -100000px;
    height: 1px;
    overflow-y: hidden;
    position: absolute;
    top: 50%;
    & p {
      margin: 0;
      padding: 0;
    }
  }

  .ql-editor {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    outline: none;
    padding: 0;
    tab-size: 4;
    -moz-tab-size: 4;
    white-space: pre-wrap;
    word-wrap: break-word;
    word-break: break-word;
    ${enWordKeepAllStyle}

    > * {
      cursor: text;
    }

    .ql-ui {
      position: absolute;
    }

    p {
      padding: 0;
    }


    .ql-blockit-render {
      line-height: 0;
    }

    .ql-custom {
      line-height: 0;
      padding: ${px2rem(8)} 0;
    }

    .ql-blockit-render {
      line-height: 0;
    }

    p:first-child {
      padding-top: ${px2rem(8)};
    }

    p:last-child {
      padding-bottom: ${px2rem(8)};
    }

    p + .ql-custom {
      padding-top: ${px2rem(16)};
    }
    .ql-custom + p {
      padding-top: ${px2rem(8)};
    }

    .ql-custom-emoji {}

    .ql-attr-inline {
      display: inline;
      padding: 0 ${px2rem(2)};
      border-radius: ${px2rem(2)};
      margin: 0 ${px2rem(2)};
      background-color: ${props =>
        props.theme.colorV2.colorSet.grey50} !important;
      color: ${props => props.theme.color.red700} !important;
      border: 1px solid ${props =>
        props.theme.colorV2.colorSet.grey50} !important;
      font-family : "SFMono-Regular", Menlo, Consolas, "PT Mono", "Liberation Mono", Courier;
      ${B2RegularStyle}
    }

    .ql-bold {
      font-weight: 600 !important;
      > * {
        font-weight: 600 !important;
      }
    }
    .ql-italic {
      font-style: italic;
    }
    .ql-link {
      cursor: pointer;
      text-decoration: underline;
      color: ${props => props.theme.color.cobalt800};
    }
    .ql-mention {
      cursor: pointer;
      color: ${props => props.theme.color.cobalt800} !important;
      span {
        color: ${props => props.theme.color.cobalt800} !important;
      }
    }

    .ql-mark {
      color: ${props => props.theme.colorV2.colorSet.grey800};
      background-color: ${props => rgba(props.theme.colorV2.accent, 0.14)};
    }

    &.ql-blank {
      position: relative;
    }

    &.ql-blank::before {
      color: ${props => props.theme.colorV2.colorSet.grey300};
      content: attr(data-placeholder);
      top: ${px2rem(8)};
      width: 100%;
      pointer-events: none;
      position: absolute;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }

    .ql-attr {
    }

    .ql-attr-32 {
      font-size: ${px2rem(32)};
      line-height: ${px2rem(48)};
      font-weight: ${props => props.theme.font.regular};
    }
    .ql-attr-24 {
      font-size: ${px2rem(24)};
      line-height: ${px2rem(36)};
      font-weight: ${props => props.theme.font.regular};
    }
    .ql-attr-16 {
      font-size: ${px2rem(16)};
      line-height: ${px2rem(26)};
    }
    .ql-attr-14 {
      font-size: ${px2rem(14)};
      line-height: ${px2rem(22)};
    }
    .ql-attr-12 {
      font-size: ${px2rem(12)};
      line-height: ${px2rem(18)};
    }

  }
`;

export const FileAttachment = styled.input`
  display: none;
`;

export const SectionMarginTopBottom = css`
  margin-top: ${px2rem(32)};
  margin-bottom: ${px2rem(32)};
  @media ${MEDIA_QUERY.ONLY_MOBILE} {
    margin-top: ${px2rem(20)};
    margin-bottom: ${px2rem(20)};
  }
`;

export const ArrowContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  > div > div {
    margin-left: ${px2rem(8)};
  }
`;
