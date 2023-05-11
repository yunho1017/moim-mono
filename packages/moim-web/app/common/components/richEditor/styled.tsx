import styled, { FlattenInterpolation } from "styled-components";
import { rgba } from "polished";
import { pB1RegularStyle } from "common/components/designSystem/typos";
import { px2rem } from "common/helpers/rem";
import { enWordKeepAllStyle } from "../designSystem/styles";

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

    .ql-bold {
      font-weight: 600;
    }
    .ql-italic {
      font-style: italic;
    }
    .ql-link {
      cursor: pointer;
      text-decoration: underline;
      color: ${props => props.theme.color.cobalt800};
      span {
        color: ${props => props.theme.color.cobalt800};
      }
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
  }
`;

export const FileAttachment = styled.input`
  display: none;
`;
