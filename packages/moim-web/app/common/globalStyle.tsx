import { createGlobalStyle, css } from "styled-components";
import { px2rem } from "common/helpers/rem";
import { MEDIA_QUERY } from "./constants/responsive";
import { ZIGGLE_GROUP_ID } from "app/boot/constants";

export default createGlobalStyle<{ groupId?: string | null }>`
  html {
    -webkit-overflow-scrolling: touch;
    font-size: 10px;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;

  }
  
  // bottom sheet style
  [data-rsbs-overlay], [data-rsbs-backdrop], [data-rsbs-root]:after {
    z-index: 1400;
  }
  [data-rsbs-content] {
    overflow: initial;
  }

  [data-rsbs-header]:before {
    display: none;
  }

  [data-rsbs-overlay] {
    border-top-left-radius: ${px2rem(4)};
    border-top-right-radius: ${px2rem(4)};
  }

  * {
    &,
    &::before,
    &::after {
      box-sizing: inherit;
    }
    &:focus {
      outline: 0;
    }
    -webkit-tap-highlight-color:transparent;
  }

  .freezed {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;
  }

  .clearfix {
    &:before,
    &:after {
      content: " ";
      display: table;
    }

    &:after {
      clear: both;
    }
  }

  body > #__react-alert__ {
    z-index: 99999;
  }

  img,
  video,
  canvas {
    max-width: 100%;
  }

  progress,
  sub,
  sup {
    vertical-align: baseline;
  }
  button,
  hr,
  input {
    overflow: visible;
  }
  html {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
  }
  body {
    margin: 0;
    -webkit-overflow-scrolling: touch;
    font-family: -apple-system, BlinkMacSystemFont, "AppleSDGothicNeo",
      "Noto sans KR", "Malgun Gothic", "맑은 고딕", dotum, "돋움", system-ui, Roboto,
      arial, "Helvetica Neue", sans-serif;
  }
  html,
  body,
  #vingle-app {
    width: 100%;

    @media ${MEDIA_QUERY.EXCEPT_MOBILE} {
      height: 100%;
    }

    @media ${MEDIA_QUERY.ONLY_MOBILE} {
      min-height: 100%;
    }
    // NOTE: ziggleziggle
    ${props =>
      props.groupId === ZIGGLE_GROUP_ID &&
      css`
        letter-spacing: -0.45px;
      `}
  }

  p,
  figcaption,
  menu,
  article,
  aside,
  details,
  figure,
  footer,
  header,
  main,
  nav,
  section,
  summary {
    display: block;
    margin: 0;
  }
  audio,
  canvas,
  progress,
  video {
    display: inline-block;
  }
  audio:not([controls]) {
    display: none;
    height: 0;
  }
  [hidden],
  template {
    display: none;
  }
  a {
    -webkit-text-decoration-skip: objects;
    text-decoration: inherit;
    color: inherit;
  }
  a:active,
  a:hover {
    outline-width: 0;
  }
  abbr[title] {
    border-bottom: none;
    text-decoration: underline;
  }
  b,
  strong {
    font-weight: bolder;
  }
  dfn {
    font-style: italic;
  }
  h1, h2, h3, h4, h5, h6 {
    font-size: 100%;
    margin: 0;
    // NOTE: ziggleziggle
    ${props =>
      props.groupId === ZIGGLE_GROUP_ID &&
      css`
        letter-spacing: -0.5px;
      `}
  }
  mark {
    background-color: #ff0;
    color: #000;
  }
  small {
    font-size: 80%;
  }
  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
  }
  sub {
    bottom: -0.25em;
  }
  sup {
    top: -0.5em;
  }
  img {
    border-style: none;
  }
  svg:not(:root) {
    overflow: hidden;
  }
  code,
  kbd,
  pre,
  samp {
    font-family: monospace, monospace;
    font-size: 1em;
  }
  hr {
    box-sizing: content-box;
    height: 0;
  }
  button,
  input,
  select,
  textarea {
    font: inherit;
    margin: 0;
    padding: 0;
    background-color: transparent;
  }
  optgroup {
    font-weight: 700;
  }
  button,
  select {
    text-transform: none;
  }
  button {
    -webkit-appearance: none;
    background-color: transparent;
    border: 0;
  }

  [type="submit"],
  [type="reset"],
  button,
  label,
  [role="button"],
  [type="button"],
  a {
    cursor: pointer;
  }

  [type="submit"][disabled],
  [type="reset"][disabled],
  button[disabled],
  label[disabled],
  [type="button"][disabled],
  [role="button"][disabled] {
    cursor: not-allowed;
  }

  button::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }
  button:-moz-focusing {
    outline: dotted ${px2rem(1)};
  }
  fieldset {
    border: 0;
    margin: 0;
    padding: 0;
  }
  legend {
    box-sizing: border-box;
    color: inherit;
    display: table;
    max-width: 100%;
    padding: 0;
    white-space: normal;
  }
  textarea {
    overflow: auto;
  }
  ul, ol {
    margin: 0;
    padding: 0;
  }
  li {
    list-style: none;
  }
  [type="checkbox"],
  [type="radio"] {
    padding: 0;
  }
  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }
  [type="search"] {
    -webkit-appearance: textfield;
    outline-offset: ${px2rem(-2)};
  }
  [type="search"]::-webkit-search-cancel-button,
  [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-input-placeholder {
    color: inherit;
    opacity: 0.54;
  }
  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }

  .accessibility {
    position: absolute;
    display: block;
    left: -${px2rem(9999)};
    top: -${px2rem(99999)};
    width: ${px2rem(1)};
    height: ${px2rem(1)};
    overflow: hidden;
  }
`;
