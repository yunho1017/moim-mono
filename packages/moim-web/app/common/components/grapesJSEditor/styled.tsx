import styled from "styled-components";

export const StyleContainer = styled.div`
  width: 100%;
  height: 100%;

  /* Basic styled of GrapesJS */
  .sp-container {
    position: absolute;
    top: 0;
    left: 0;
    display: inline-block;
    *display: inline;
    *zoom: 1;
    z-index: 9999994;
    overflow: hidden;
  }
  .sp-container.sp-flat {
    position: relative;
  }
  .sp-container,
  .sp-container * {
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
  }
  .sp-top {
    position: relative;
    width: 100%;
    display: inline-block;
  }
  .sp-top-inner {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .sp-color {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 20%;
  }
  .sp-hue {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 84%;
    height: 100%;
  }
  .sp-clear-enabled .sp-hue {
    top: 33px;
    height: 77.5%;
  }
  .sp-fill {
    padding-top: 80%;
  }
  .sp-sat,
  .sp-val {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .sp-alpha-enabled .sp-top {
    margin-bottom: 18px;
  }
  .sp-alpha-enabled .sp-alpha {
    display: block;
  }
  .sp-alpha-handle {
    position: absolute;
    top: -4px;
    bottom: -4px;
    width: 6px;
    left: 50%;
    cursor: pointer;
    border: 1px solid black;
    background: white;
    opacity: 0.8;
  }
  .sp-alpha {
    display: none;
    position: absolute;
    bottom: -14px;
    right: 0;
    left: 0;
    height: 8px;
  }
  .sp-alpha-inner {
    border: solid 1px #333;
  }
  .sp-clear {
    display: none;
  }
  .sp-clear.sp-clear-display {
    background-position: center;
  }
  .sp-clear-enabled .sp-clear {
    display: block;
    position: absolute;
    top: 0px;
    right: 0;
    bottom: 0;
    left: 84%;
    height: 28px;
  }
  .sp-container,
  .sp-replacer,
  .sp-preview,
  .sp-dragger,
  .sp-slider,
  .sp-alpha,
  .sp-clear,
  .sp-alpha-handle,
  .sp-container.sp-dragging .sp-input,
  .sp-container button {
    -webkit-user-select: none;
    -moz-user-select: -moz-none;
    -o-user-select: none;
    user-select: none;
  }
  .sp-container.sp-input-disabled .sp-input-container {
    display: none;
  }
  .sp-container.sp-buttons-disabled .sp-button-container {
    display: none;
  }
  .sp-container.sp-palette-buttons-disabled .sp-palette-button-container {
    display: none;
  }
  .sp-palette-only .sp-picker-container {
    display: none;
  }
  .sp-palette-disabled .sp-palette-container {
    display: none;
  }
  .sp-initial-disabled .sp-initial {
    display: none;
  }
  .sp-sat {
    background-image: -webkit-gradient(
      linear,
      0 0,
      100% 0,
      from(#fff),
      to(rgba(204, 154, 129, 0))
    );
    background-image: -webkit-linear-gradient(
      left,
      #fff,
      rgba(204, 154, 129, 0)
    );
    background-image: -moz-linear-gradient(left, #fff, rgba(204, 154, 129, 0));
    background-image: -o-linear-gradient(left, #fff, rgba(204, 154, 129, 0));
    background-image: -ms-linear-gradient(left, #fff, rgba(204, 154, 129, 0));
    background-image: linear-gradient(to right, #fff, rgba(204, 154, 129, 0));
    -ms-filter: "progid:DXImageTransform.Microsoft.gradient(GradientType = 1, startColorstr=#FFFFFFFF, endColorstr=#00CC9A81)";
    filter: progid:DXImageTransform.Microsoft.gradient(GradientType = 1, startColorstr="#FFFFFFFF", endColorstr="#00CC9A81");
  }
  .sp-val {
    background-image: -webkit-gradient(
      linear,
      0 100%,
      0 0,
      from(#000000),
      to(rgba(204, 154, 129, 0))
    );
    background-image: -webkit-linear-gradient(
      bottom,
      #000000,
      rgba(204, 154, 129, 0)
    );
    background-image: -moz-linear-gradient(
      bottom,
      #000,
      rgba(204, 154, 129, 0)
    );
    background-image: -o-linear-gradient(bottom, #000, rgba(204, 154, 129, 0));
    background-image: -ms-linear-gradient(bottom, #000, rgba(204, 154, 129, 0));
    background-image: linear-gradient(to top, #000, rgba(204, 154, 129, 0));
    -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#00CC9A81, endColorstr=#FF000000)";
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#00CC9A81", endColorstr="#FF000000");
  }
  .sp-hue {
    background: -moz-linear-gradient(
      top,
      #ff0000 0%,
      #ffff00 17%,
      #00ff00 33%,
      #00ffff 50%,
      #0000ff 67%,
      #ff00ff 83%,
      #ff0000 100%
    );
    background: -ms-linear-gradient(
      top,
      #ff0000 0%,
      #ffff00 17%,
      #00ff00 33%,
      #00ffff 50%,
      #0000ff 67%,
      #ff00ff 83%,
      #ff0000 100%
    );
    background: -o-linear-gradient(
      top,
      #ff0000 0%,
      #ffff00 17%,
      #00ff00 33%,
      #00ffff 50%,
      #0000ff 67%,
      #ff00ff 83%,
      #ff0000 100%
    );
    background: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(#ff0000),
      color-stop(0.17, #ffff00),
      color-stop(0.33, #00ff00),
      color-stop(0.5, #00ffff),
      color-stop(0.67, #0000ff),
      color-stop(0.83, #ff00ff),
      to(#ff0000)
    );
    background: -webkit-linear-gradient(
      top,
      #ff0000 0%,
      #ffff00 17%,
      #00ff00 33%,
      #00ffff 50%,
      #0000ff 67%,
      #ff00ff 83%,
      #ff0000 100%
    );
    background: linear-gradient(
      to bottom,
      #ff0000 0%,
      #ffff00 17%,
      #00ff00 33%,
      #00ffff 50%,
      #0000ff 67%,
      #ff00ff 83%,
      #ff0000 100%
    );
  }
  .sp-1 {
    height: 17%;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ff0000", endColorstr="#ffff00");
  }
  .sp-2 {
    height: 16%;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ffff00", endColorstr="#00ff00");
  }
  .sp-3 {
    height: 17%;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#00ff00", endColorstr="#00ffff");
  }
  .sp-4 {
    height: 17%;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#00ffff", endColorstr="#0000ff");
  }
  .sp-5 {
    height: 16%;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#0000ff", endColorstr="#ff00ff");
  }
  .sp-6 {
    height: 17%;
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ff00ff", endColorstr="#ff0000");
  }
  .sp-hidden {
    display: none !important;
  }
  .sp-cf:before,
  .sp-cf:after {
    content: "";
    display: table;
  }
  .sp-cf:after {
    clear: both;
  }
  .sp-cf {
    *zoom: 1;
  }
  @media (max-device-width: 480px) {
    .sp-color {
      right: 40%;
    }
    .sp-hue {
      left: 63%;
    }
    .sp-fill {
      padding-top: 60%;
    }
  }
  .sp-dragger {
    border-radius: 5px;
    height: 5px;
    width: 5px;
    border: 1px solid #fff;
    background: #000;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
  }
  .sp-slider {
    position: absolute;
    top: 0;
    cursor: pointer;
    height: 3px;
    left: -1px;
    right: -1px;
    border: 1px solid #000;
    background: white;
    opacity: 0.8;
  }
  .sp-container {
    border-radius: 0;
    background-color: #ececec;
    border: solid 1px #f0c49b;
    padding: 0;
  }
  .sp-container,
  .sp-container button,
  .sp-container input,
  .sp-color,
  .sp-hue,
  .sp-clear {
    font: normal 12px "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans",
      Geneva, Verdana, sans-serif;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    -ms-box-sizing: border-box;
    box-sizing: border-box;
  }
  .sp-top {
    margin-bottom: 3px;
  }
  .sp-color,
  .sp-hue,
  .sp-clear {
    border: solid 1px #666;
  }
  .sp-input-container {
    float: right;
    width: 100px;
    margin-bottom: 4px;
  }
  .sp-initial-disabled .sp-input-container {
    width: 100%;
  }
  .sp-input {
    font-size: 12px !important;
    border: 1px inset;
    padding: 4px 5px;
    margin: 0;
    width: 100%;
    background: transparent;
    border-radius: 3px;
    color: #222;
  }
  .sp-input:focus {
    border: 1px solid orange;
  }
  .sp-input.sp-validation-error {
    border: 1px solid red;
    background: #fdd;
  }
  .sp-picker-container,
  .sp-palette-container {
    float: left;
    position: relative;
    padding: 10px;
    padding-bottom: 300px;
    margin-bottom: -290px;
  }
  .sp-picker-container {
    width: 172px;
    border-left: solid 1px #fff;
  }
  .sp-palette-container {
    border-right: solid 1px #ccc;
  }
  .sp-palette-only .sp-palette-container {
    border: 0;
  }
  .sp-palette .sp-thumb-el {
    display: block;
    position: relative;
    float: left;
    width: 24px;
    height: 15px;
    margin: 3px;
    cursor: pointer;
    border: solid 2px transparent;
  }
  .sp-palette .sp-thumb-el:hover,
  .sp-palette .sp-thumb-el.sp-thumb-active {
    border-color: orange;
  }
  .sp-thumb-el {
    position: relative;
  }
  .sp-initial {
    float: left;
    border: solid 1px #333;
  }
  .sp-initial span {
    width: 30px;
    height: 25px;
    border: none;
    display: block;
    float: left;
    margin: 0;
  }
  .sp-initial .sp-clear-display {
    background-position: center;
  }
  .sp-palette-button-container,
  .sp-button-container {
    float: right;
  }
  .sp-replacer {
    margin: 0;
    overflow: hidden;
    cursor: pointer;
    padding: 4px;
    display: inline-block;
    *zoom: 1;
    *display: inline;
    border: solid 1px #91765d;
    background: #eee;
    color: #333;
    vertical-align: middle;
  }
  .sp-replacer:hover,
  .sp-replacer.sp-active {
    border-color: #f0c49b;
    color: #111;
  }
  .sp-replacer.sp-disabled {
    cursor: default;
    border-color: silver;
    color: silver;
  }
  .sp-dd {
    padding: 2px 0;
    height: 16px;
    line-height: 16px;
    float: left;
    font-size: 10px;
  }
  .sp-preview {
    position: relative;
    width: 25px;
    height: 20px;
    border: solid 1px #222;
    margin-right: 5px;
    float: left;
    z-index: 0;
  }
  .sp-palette {
    *width: 220px;
    max-width: 220px;
  }
  .sp-palette .sp-thumb-el {
    width: 16px;
    height: 16px;
    margin: 2px 1px;
    border: solid 1px #d0d0d0;
  }
  .sp-container {
    padding-bottom: 0;
  }
  .sp-container button {
    background-color: #eee;
    background-image: -webkit-linear-gradient(top, #eeeeee, #cccccc);
    background-image: -moz-linear-gradient(top, #eeeeee, #cccccc);
    background-image: -ms-linear-gradient(top, #eeeeee, #cccccc);
    background-image: -o-linear-gradient(top, #eeeeee, #cccccc);
    background-image: linear-gradient(to bottom, #eeeeee, #cccccc);
    border: 1px solid #ccc;
    border-bottom: 1px solid #bbb;
    border-radius: 3px;
    color: #333;
    font-size: 14px;
    line-height: 1;
    padding: 5px 4px;
    text-align: center;
    text-shadow: 0 1px 0 #eee;
    vertical-align: middle;
  }
  .sp-container button:hover {
    background-color: #ddd;
    background-image: -webkit-linear-gradient(top, #dddddd, #bbbbbb);
    background-image: -moz-linear-gradient(top, #dddddd, #bbbbbb);
    background-image: -ms-linear-gradient(top, #dddddd, #bbbbbb);
    background-image: -o-linear-gradient(top, #dddddd, #bbbbbb);
    background-image: linear-gradient(to bottom, #dddddd, #bbbbbb);
    border: 1px solid #bbb;
    border-bottom: 1px solid #999;
    cursor: pointer;
    text-shadow: 0 1px 0 #ddd;
  }
  .sp-container button:active {
    border: 1px solid #aaa;
    border-bottom: 1px solid #888;
    -webkit-box-shadow: inset 0 0 5px 2px #aaa, 0 1px 0 0 #eee;
    -moz-box-shadow: inset 0 0 5px 2px #aaa, 0 1px 0 0 #eee;
    -ms-box-shadow: inset 0 0 5px 2px #aaa, 0 1px 0 0 #eee;
    -o-box-shadow: inset 0 0 5px 2px #aaa, 0 1px 0 0 #eee;
    box-shadow: inset 0 0 5px 2px #aaa, 0 1px 0 0 #eee;
  }
  .sp-cancel {
    font-size: 11px;
    color: #d93f3f !important;
    margin: 0;
    padding: 2px;
    margin-right: 5px;
    vertical-align: middle;
    text-decoration: none;
  }
  .sp-cancel:hover {
    color: #d93f3f !important;
    text-decoration: underline;
  }
  .sp-palette span:hover,
  .sp-palette span.sp-thumb-active {
    border-color: #000;
  }
  .sp-preview,
  .sp-alpha,
  .sp-thumb-el {
    position: relative;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==);
  }
  .sp-preview-inner,
  .sp-alpha-inner,
  .sp-thumb-inner {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .sp-palette .sp-thumb-inner {
    background-position: 50% 50%;
    background-repeat: no-repeat;
  }
  .sp-palette .sp-thumb-light.sp-thumb-active .sp-thumb-inner {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAIVJREFUeNpiYBhsgJFMffxAXABlN5JruT4Q3wfi/0DsT64h8UD8HmpIPCWG/KemIfOJCUB+Aoacx6EGBZyHBqI+WsDCwuQ9mhxeg2A210Ntfo8klk9sOMijaURm7yc1UP2RNCMbKE9ODK1HM6iegYLkfx8pligC9lCD7KmRof0ZhjQACDAAceovrtpVBRkAAAAASUVORK5CYII=);
  }
  .sp-palette .sp-thumb-dark.sp-thumb-active .sp-thumb-inner {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAAMdJREFUOE+tkgsNwzAMRMugEAahEAahEAZhEAqlEAZhEAohEAYh81X2dIm8fKpEspLGvudPOsUYpxE2BIJCroJmEW9qJ+MKaBFhEMNabSy9oIcIPwrB+afvAUFoK4H0tMaQ3XtlrggDhOVVMuT4E5MMG0FBbCEYzjYT7OxLEvIHQLY2zWwQ3D+9luyOQTfKDiFD3iUIfPk8VqrKjgAiSfGFPecrg6HN6m/iBcwiDAo7WiBeawa+Kwh7tZoSCGLMqwlSAzVDhoK+6vH4G0P5wdkAAAAASUVORK5CYII=);
  }
  .sp-clear-display {
    background-repeat: no-repeat;
    background-position: center;
    background-image: url(data:image/gif;base64,R0lGODlhFAAUAPcAAAAAAJmZmZ2dnZ6enqKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq/Hx8fLy8vT09PX19ff39/j4+Pn5+fr6+vv7+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAAUABQAAAihAP9FoPCvoMGDBy08+EdhQAIJCCMybCDAAYUEARBAlFiQQoMABQhKUJBxY0SPICEYHBnggEmDKAuoPMjS5cGYMxHW3IiT478JJA8M/CjTZ0GgLRekNGpwAsYABHIypcAgQMsITDtWJYBR6NSqMico9cqR6tKfY7GeBCuVwlipDNmefAtTrkSzB1RaIAoXodsABiZAEFB06gIBWC1mLVgBa0AAOw==);
  }
  .CodeMirror {
    font-family: monospace;
    height: 300px;
    color: black;
    direction: ltr;
  }
  .CodeMirror-lines {
    padding: 4px 0;
  }
  .CodeMirror pre.CodeMirror-line,
  .CodeMirror pre.CodeMirror-line-like {
    padding: 0 4px;
  }
  .CodeMirror-scrollbar-filler,
  .CodeMirror-gutter-filler {
    background-color: white;
  }
  .CodeMirror-gutters {
    border-right: 1px solid #ddd;
    background-color: #f7f7f7;
    white-space: nowrap;
  }
  .CodeMirror-linenumber {
    padding: 0 3px 0 5px;
    min-width: 20px;
    text-align: right;
    color: #999;
    white-space: nowrap;
  }
  .CodeMirror-guttermarker {
    color: black;
  }
  .CodeMirror-guttermarker-subtle {
    color: #999;
  }
  .CodeMirror-cursor {
    border-left: 1px solid black;
    border-right: none;
    width: 0;
  }
  .CodeMirror div.CodeMirror-secondarycursor {
    border-left: 1px solid silver;
  }
  .cm-fat-cursor .CodeMirror-cursor {
    width: auto;
    border: 0 !important;
    background: #7e7;
  }
  .cm-fat-cursor div.CodeMirror-cursors {
    z-index: 1;
  }
  .cm-fat-cursor-mark {
    background-color: rgba(20, 255, 20, 0.5);
    -webkit-animation: blink 1.06s steps(1) infinite;
    -moz-animation: blink 1.06s steps(1) infinite;
    animation: blink 1.06s steps(1) infinite;
  }
  .cm-animate-fat-cursor {
    width: auto;
    border: 0;
    -webkit-animation: blink 1.06s steps(1) infinite;
    -moz-animation: blink 1.06s steps(1) infinite;
    animation: blink 1.06s steps(1) infinite;
    background-color: #7e7;
  }
  @-moz-keyframes blink {
    50% {
      background-color: transparent;
    }
  }
  @-webkit-keyframes blink {
    50% {
      background-color: transparent;
    }
  }
  @keyframes blink {
    50% {
      background-color: transparent;
    }
  }
  .cm-tab {
    display: inline-block;
    text-decoration: inherit;
  }
  .CodeMirror-rulers {
    position: absolute;
    left: 0;
    right: 0;
    top: -50px;
    bottom: 0;
    overflow: hidden;
  }
  .CodeMirror-ruler {
    border-left: 1px solid #ccc;
    top: 0;
    bottom: 0;
    position: absolute;
  }
  .cm-s-default .cm-header {
    color: blue;
  }
  .cm-s-default .cm-quote {
    color: #090;
  }
  .cm-negative {
    color: #d44;
  }
  .cm-positive {
    color: #292;
  }
  .cm-header,
  .cm-strong {
    font-weight: bold;
  }
  .cm-em {
    font-style: italic;
  }
  .cm-link {
    text-decoration: underline;
  }
  .cm-strikethrough {
    text-decoration: line-through;
  }
  .cm-s-default .cm-keyword {
    color: #708;
  }
  .cm-s-default .cm-atom {
    color: #219;
  }
  .cm-s-default .cm-number {
    color: #164;
  }
  .cm-s-default .cm-def {
    color: blue;
  }
  .cm-s-default .cm-variable-2 {
    color: #05a;
  }
  .cm-s-default .cm-variable-3,
  .cm-s-default .cm-type {
    color: #085;
  }
  .cm-s-default .cm-comment {
    color: #a50;
  }
  .cm-s-default .cm-string {
    color: #a11;
  }
  .cm-s-default .cm-string-2 {
    color: #f50;
  }
  .cm-s-default .cm-meta {
    color: #555;
  }
  .cm-s-default .cm-qualifier {
    color: #555;
  }
  .cm-s-default .cm-builtin {
    color: #30a;
  }
  .cm-s-default .cm-bracket {
    color: #997;
  }
  .cm-s-default .cm-tag {
    color: #170;
  }
  .cm-s-default .cm-attribute {
    color: #00c;
  }
  .cm-s-default .cm-hr {
    color: #999;
  }
  .cm-s-default .cm-link {
    color: #00c;
  }
  .cm-s-default .cm-error {
    color: red;
  }
  .cm-invalidchar {
    color: red;
  }
  .CodeMirror-composing {
    border-bottom: 2px solid;
  }
  div.CodeMirror span.CodeMirror-matchingbracket {
    color: #0b0;
  }
  div.CodeMirror span.CodeMirror-nonmatchingbracket {
    color: #a22;
  }
  .CodeMirror-matchingtag {
    background: rgba(255, 150, 0, 0.3);
  }
  .CodeMirror-activeline-background {
    background: #e8f2ff;
  }
  .CodeMirror {
    position: relative;
    overflow: hidden;
    background: white;
  }
  .CodeMirror-scroll {
    overflow: scroll !important;
    margin-bottom: -50px;
    margin-right: -50px;
    padding-bottom: 50px;
    height: 100%;
    outline: none;
    position: relative;
  }
  .CodeMirror-sizer {
    position: relative;
    border-right: 50px solid transparent;
  }
  .CodeMirror-vscrollbar,
  .CodeMirror-hscrollbar,
  .CodeMirror-scrollbar-filler,
  .CodeMirror-gutter-filler {
    position: absolute;
    z-index: 6;
    display: none;
    outline: none;
  }
  .CodeMirror-vscrollbar {
    right: 0;
    top: 0;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .CodeMirror-hscrollbar {
    bottom: 0;
    left: 0;
    overflow-y: hidden;
    overflow-x: scroll;
  }
  .CodeMirror-scrollbar-filler {
    right: 0;
    bottom: 0;
  }
  .CodeMirror-gutter-filler {
    left: 0;
    bottom: 0;
  }
  .CodeMirror-gutters {
    position: absolute;
    left: 0;
    top: 0;
    min-height: 100%;
    z-index: 3;
  }
  .CodeMirror-gutter {
    white-space: normal;
    height: 100%;
    display: inline-block;
    vertical-align: top;
    margin-bottom: -50px;
  }
  .CodeMirror-gutter-wrapper {
    position: absolute;
    z-index: 4;
    background: none !important;
    border: none !important;
  }
  .CodeMirror-gutter-background {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 4;
  }
  .CodeMirror-gutter-elt {
    position: absolute;
    cursor: default;
    z-index: 4;
  }
  .CodeMirror-gutter-wrapper ::selection {
    background-color: transparent;
  }
  .CodeMirror-gutter-wrapper ::-moz-selection {
    background-color: transparent;
  }
  .CodeMirror-lines {
    cursor: text;
    min-height: 1px;
  }
  .CodeMirror pre.CodeMirror-line,
  .CodeMirror pre.CodeMirror-line-like {
    -moz-border-radius: 0;
    -webkit-border-radius: 0;
    border-radius: 0;
    border-width: 0;
    background: transparent;
    font-family: inherit;
    font-size: inherit;
    margin: 0;
    white-space: pre;
    word-wrap: normal;
    line-height: inherit;
    color: inherit;
    z-index: 2;
    position: relative;
    overflow: visible;
    -webkit-tap-highlight-color: transparent;
    -webkit-font-variant-ligatures: contextual;
    font-variant-ligatures: contextual;
  }
  .CodeMirror-wrap pre.CodeMirror-line,
  .CodeMirror-wrap pre.CodeMirror-line-like {
    word-wrap: break-word;
    white-space: pre-wrap;
    word-break: normal;
  }
  .CodeMirror-linebackground {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 0;
  }
  .CodeMirror-linewidget {
    position: relative;
    z-index: 2;
    padding: 0.1px;
  }
  .CodeMirror-rtl pre {
    direction: rtl;
  }
  .CodeMirror-code {
    outline: none;
  }
  .CodeMirror-scroll,
  .CodeMirror-sizer,
  .CodeMirror-gutter,
  .CodeMirror-gutters,
  .CodeMirror-linenumber {
    -moz-box-sizing: content-box;
    box-sizing: content-box;
  }
  .CodeMirror-measure {
    position: absolute;
    width: 100%;
    height: 0;
    overflow: hidden;
    visibility: hidden;
  }
  .CodeMirror-cursor {
    position: absolute;
    pointer-events: none;
  }
  .CodeMirror-measure pre {
    position: static;
  }
  div.CodeMirror-cursors {
    visibility: hidden;
    position: relative;
    z-index: 3;
  }
  div.CodeMirror-dragcursors {
    visibility: visible;
  }
  .CodeMirror-focused div.CodeMirror-cursors {
    visibility: visible;
  }
  .CodeMirror-selected {
    background: #d9d9d9;
  }
  .CodeMirror-focused .CodeMirror-selected {
    background: #d7d4f0;
  }
  .CodeMirror-crosshair {
    cursor: crosshair;
  }
  .CodeMirror-line::selection,
  .CodeMirror-line > span::selection,
  .CodeMirror-line > span > span::selection {
    background: #d7d4f0;
  }
  .CodeMirror-line::-moz-selection,
  .CodeMirror-line > span::-moz-selection,
  .CodeMirror-line > span > span::-moz-selection {
    background: #d7d4f0;
  }
  .cm-searching {
    background-color: #ffa;
    background-color: rgba(255, 255, 0, 0.4);
  }
  .cm-force-border {
    padding-right: 0.1px;
  }
  @media print {
    .CodeMirror div.CodeMirror-cursors {
      visibility: hidden;
    }
  }
  .cm-tab-wrap-hack:after {
    content: "";
  }
  span.CodeMirror-selectedtext {
    background: none;
  }
  .cm-s-hopscotch.CodeMirror {
    background: #322931;
    color: #d5d3d5;
  }
  .cm-s-hopscotch div.CodeMirror-selected {
    background: #433b42 !important;
  }
  .cm-s-hopscotch .CodeMirror-gutters {
    background: #322931;
    border-right: 0px;
  }
  .cm-s-hopscotch .CodeMirror-linenumber {
    color: #797379;
  }
  .cm-s-hopscotch .CodeMirror-cursor {
    border-left: 1px solid #989498 !important;
  }
  .cm-s-hopscotch span.cm-comment {
    color: #b33508;
  }
  .cm-s-hopscotch span.cm-atom {
    color: #c85e7c;
  }
  .cm-s-hopscotch span.cm-number {
    color: #c85e7c;
  }
  .cm-s-hopscotch span.cm-property,
  .cm-s-hopscotch span.cm-attribute {
    color: #8fc13e;
  }
  .cm-s-hopscotch span.cm-keyword {
    color: #dd464c;
  }
  .cm-s-hopscotch span.cm-string {
    color: #fdcc59;
  }
  .cm-s-hopscotch span.cm-variable {
    color: #8fc13e;
  }
  .cm-s-hopscotch span.cm-variable-2 {
    color: #1290bf;
  }
  .cm-s-hopscotch span.cm-def {
    color: #fd8b19;
  }
  .cm-s-hopscotch span.cm-error {
    background: #dd464c;
    color: #989498;
  }
  .cm-s-hopscotch span.cm-bracket {
    color: #d5d3d5;
  }
  .cm-s-hopscotch span.cm-tag {
    color: #dd464c;
  }
  .cm-s-hopscotch span.cm-link {
    color: #c85e7c;
  }
  .cm-s-hopscotch .CodeMirror-matchingbracket {
    text-decoration: underline;
    color: white !important;
  }
  .cm-s-hopscotch .CodeMirror-activeline-background {
    background: #302020;
  }
  @font-face {
    font-family: "font3336";
    src: url("../fonts/main-fonts.eot?v=20");
    src: url("../fonts/main-fonts.woff?v=20") format("woff"),
      url("../fonts/main-fonts.ttf?v=20") format("truetype"),
      url("../fonts/main-fonts.svg?v=20") format("svg"),
      url("../fonts/main-fonts.eot?v=20") format("embedded-opentype");
    font-weight: normal;
    font-style: normal;
  }
  .gjs-is__grab,
  .gjs-is__grab * {
    cursor: grab !important;
  }
  .gjs-is__grabbing,
  .gjs-is__grabbing * {
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
    cursor: grabbing !important;
  }
  .gjs-one-bg {
    background-color: #444;
  }
  .gjs-one-color {
    color: #444;
  }
  .gjs-one-color-h:hover {
    color: #444;
  }
  .gjs-two-bg {
    background-color: #ddd;
  }
  .gjs-two-color {
    color: #ddd;
  }
  .gjs-two-color-h:hover {
    color: #ddd;
  }
  .gjs-three-bg {
    background-color: #804f7b;
  }
  .gjs-three-color {
    color: #804f7b;
  }
  .gjs-three-color-h:hover {
    color: #804f7b;
  }
  .gjs-four-bg {
    background-color: #d278c9;
  }
  .gjs-four-color {
    color: #d278c9;
  }
  .gjs-four-color-h:hover {
    color: #d278c9;
  }
  .gjs-danger-bg {
    background-color: #dd3636;
  }
  .gjs-danger-color {
    color: #dd3636;
  }
  .gjs-danger-color-h:hover {
    color: #dd3636;
  }
  .gjs-bg-main,
  .gjs-sm-sector .gjs-sm-colorp-c,
  .gjs-clm-tags .gjs-sm-colorp-c,
  .gjs-off-prv {
    background-color: #444;
  }
  .gjs-color-main,
  .gjs-sm-sector .gjs-sm-stack #gjs-sm-add,
  .gjs-clm-tags .gjs-sm-stack #gjs-sm-add,
  .gjs-off-prv {
    color: #ddd;
    fill: #ddd;
  }
  .gjs-color-active {
    color: #f8f8f8;
    fill: #f8f8f8;
  }
  .gjs-color-warn {
    color: #ffca6f;
    fill: #ffca6f;
  }
  .gjs-color-hl {
    color: #71b7f1;
    fill: #71b7f1;
  }
  .gjs-fonts::before {
    display: block;
    font: normal normal normal 14px font3336;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 5em;
  }
  .gjs-f-b1::before {
    content: "Q";
  }
  .gjs-f-b2::before {
    content: "W";
  }
  .gjs-f-b3::before {
    content: "E";
  }
  .gjs-f-b37::before {
    content: "R";
  }
  .gjs-f-hero::before {
    content: "T";
  }
  .gjs-f-h1p::before {
    content: "y";
  }
  .gjs-f-3ba::before {
    content: "u";
  }
  .gjs-f-image::before {
    content: "I";
  }
  .gjs-f-text::before {
    content: "o";
  }
  .gjs-f-quo::before {
    content: "p";
  }
  .gjs-f-button::before {
    content: "B";
  }
  .gjs-f-divider::before {
    content: "D";
  }
  .gjs-invis-invis,
  .gjs-clm-tags #gjs-clm-new,
  .gjs-no-app {
    background-color: transparent;
    border: none;
    color: inherit;
  }
  .gjs-no-app {
    height: 10px;
  }
  .gjs-test::btn {
    color: "#fff";
  }
  .opac50 {
    opacity: 0.5;
    filter: alpha(opacity=50);
  }
  .gjs-checker-bg,
  .gjs-field-colorp-c,
  .checker-bg,
  .gjs-sm-sector .gjs-sm-property .gjs-sm-layer > #gjs-sm-preview-box,
  .gjs-clm-tags .gjs-sm-property .gjs-sm-layer > #gjs-sm-preview-box {
    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==");
  }
  .gjs-no-user-select,
  .gjs-rte-toolbar,
  .gjs-layer-name,
  .gjs-grabbing,
  .gjs-grabbing * {
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
  .gjs-no-pointer-events,
  .gjs-margin-v-el,
  .gjs-padding-v-el,
  .gjs-fixedmargin-v-el,
  .gjs-fixedpadding-v-el,
  .gjs-resizer-c {
    pointer-events: none;
  }
  .gjs-bdrag {
    pointer-events: none !important;
    position: absolute !important;
    z-index: 10 !important;
    width: auto;
  }
  .gjs-drag-helper {
    background-color: #3b97e3 !important;
    pointer-events: none !important;
    position: absolute !important;
    z-index: 10 !important;
    transform: scale(0.3) !important;
    transform-origin: top left !important;
    -webkit-transform-origin: top left !important;
    margin: 15px !important;
    transition: none !important;
    outline: none !important;
  }
  .gjs-grabbing,
  .gjs-grabbing * {
    cursor: grabbing !important;
    cursor: -webkit-grabbing !important;
  }
  .gjs-grabbing {
    overflow: hidden;
  }
  .gjs-off-prv {
    position: relative;
    z-index: 10;
    padding: 5px;
    cursor: pointer;
  }
  .gjs-editor-cont ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }
  .gjs-editor-cont ::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
  }
  .gjs-editor-cont ::-webkit-scrollbar {
    width: 8px;
  }
  .clear {
    clear: both;
  }
  .no-select,
  .gjs-clm-tags #gjs-clm-close,
  .gjs-category-title,
  .gjs-layer-title,
  .gjs-block-category .gjs-title,
  .gjs-sm-sector .gjs-sm-title,
  .gjs-clm-tags .gjs-sm-title,
  .gjs-com-no-select,
  .gjs-com-no-select img {
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
  .gjs-no-touch-actions {
    touch-action: none;
  }
  .gjs-disabled {
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
    opacity: 0.5;
    filter: alpha(opacity=50);
  }
  .gjs-editor {
    font-family: Helvetica, sans-serif;
    font-size: 0.75rem;
    position: relative;
    box-sizing: border-box;
    height: 100%;
  }
  .gjs-freezed,
  .gjs-freezed {
    opacity: 0.5;
    filter: alpha(opacity=50);
    pointer-events: none;
  }
  .gjs-traits-label {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    font-weight: lighter;
    margin-bottom: 5px;
    padding: 10px;
    text-align: left;
  }
  .gjs-label-wrp {
    width: 30%;
    min-width: 30%;
  }
  .gjs-field-wrp {
    flex-grow: 1;
  }
  .gjs-trt-header {
    font-weight: lighter;
    padding: 10px;
  }
  .gjs-trt-trait {
    display: flex;
    justify-content: flex-start;
    padding: 5px 10px;
    font-weight: lighter;
    align-items: center;
    text-align: left;
  }
  .gjs-trt-traits {
    font-size: 0.75rem;
  }
  .gjs-trt-trait .gjs-label {
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .gjs-guide-info {
    position: absolute;
  }
  .gjs-guide-info__content {
    position: absolute;
    height: 100%;
    display: flex;
    width: 100%;
    padding: 5px;
  }
  .gjs-guide-info__line {
    position: relative;
    margin: auto;
  }
  .gjs-guide-info__line::before,
  .gjs-guide-info__line::after {
    content: "";
    display: block;
    position: absolute;
    background-color: inherit;
  }
  .gjs-guide-info__y {
    padding: 0 5px;
  }
  .gjs-guide-info__y .gjs-guide-info__content {
    justify-content: center;
  }
  .gjs-guide-info__y .gjs-guide-info__line {
    width: 100%;
    height: 1px;
  }
  .gjs-guide-info__y .gjs-guide-info__line::before,
  .gjs-guide-info__y .gjs-guide-info__line::after {
    width: 1px;
    height: 10px;
    top: 0;
    bottom: 0;
    left: 0;
    margin: auto;
  }
  .gjs-guide-info__y .gjs-guide-info__line::after {
    left: auto;
    right: 0;
  }
  .gjs-guide-info__x {
    padding: 5px 0;
  }
  .gjs-guide-info__x .gjs-guide-info__content {
    align-items: center;
  }
  .gjs-guide-info__x .gjs-guide-info__line {
    height: 100%;
    width: 1px;
  }
  .gjs-guide-info__x .gjs-guide-info__line::before,
  .gjs-guide-info__x .gjs-guide-info__line::after {
    width: 10px;
    height: 1px;
    left: 0;
    right: 0;
    top: 0;
    margin: auto;
    transform: translateX(-50%);
  }
  .gjs-guide-info__x .gjs-guide-info__line::after {
    top: auto;
    bottom: 0;
  }
  .gjs-badge {
    white-space: nowrap;
  }
  .gjs-badge__icon {
    vertical-align: middle;
    display: inline-block;
    width: 15px;
    height: 15px;
  }
  .gjs-badge__icon svg {
    fill: currentColor;
  }
  .gjs-badge__name {
    display: inline-block;
    vertical-align: middle;
  }
  .gjs-frame-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    margin: auto;
  }
  .gjs-frame-wrapper--anim {
    transition: width 0.35s ease, height 0.35s ease;
  }
  .gjs-frame-wrapper__top {
    transform: translateY(-100%) translateX(-50%);
    display: flex;
    padding: 5px 0;
    position: absolute;
    width: 100%;
    left: 50%;
    top: 0;
  }
  .gjs-frame-wrapper__top-r {
    margin-left: auto;
  }
  .gjs-frame-wrapper__left {
    position: absolute;
    left: 0;
    transform: translateX(-100%) translateY(-50%);
    height: 100%;
    top: 50%;
  }
  .gjs-frame-wrapper__bottom {
    position: absolute;
    bottom: 0;
    transform: translateY(100%) translateX(-50%);
    width: 100%;
    left: 50%;
  }
  .gjs-frame-wrapper__right {
    position: absolute;
    right: 0;
    transform: translateX(100%) translateY(-50%);
    height: 100%;
    top: 50%;
  }
  .gjs-frame-wrapper__icon {
    width: 24px;
    cursor: pointer;
  }
  .gjs-frame-wrapper__icon > svg {
    fill: currentColor;
  }
  .gjs-padding-v-top,
  .gjs-fixedpadding-v-top {
    width: 100%;
    top: 0;
    left: 0;
  }
  .gjs-padding-v-right,
  .gjs-fixedpadding-v-right {
    right: 0;
  }
  .gjs-padding-v-bottom,
  .gjs-fixedpadding-v-bottom {
    width: 100%;
    left: 0;
    bottom: 0;
  }
  .gjs-padding-v-left,
  .gjs-fixedpadding-v-left {
    left: 0;
  }
  .gjs-cv-canvas {
    background-color: rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
    width: 85%;
    height: calc(100% - 40px);
    bottom: 0;
    overflow: hidden;
    z-index: 1;
    position: absolute;
    left: 0;
    top: 40px;
  }
  .gjs-cv-canvas.gjs-is__grab .gjs-cv-canvas__frames,
  .gjs-cv-canvas.gjs-is__grabbing .gjs-cv-canvas__frames {
    pointer-events: none;
  }
  .gjs-cv-canvas__frames {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .gjs-cv-canvas .gjs-ghost {
    display: none;
    pointer-events: none;
    background-color: #5b5b5b;
    border: 2px dashed #ccc;
    position: absolute;
    z-index: 10;
    opacity: 0.55;
    filter: alpha(opacity=55);
  }
  .gjs-cv-canvas .gjs-highlighter,
  .gjs-cv-canvas .gjs-highlighter-sel {
    position: absolute;
    outline: 1px solid #3b97e3;
    outline-offset: -1px;
    pointer-events: none;
    width: 100%;
    height: 100%;
  }
  .gjs-cv-canvas .gjs-highlighter-warning {
    outline: 3px solid #ffca6f;
  }
  .gjs-cv-canvas .gjs-highlighter-sel {
    outline: 3px solid #3b97e3;
  }
  .gjs-cv-canvas #gjs-tools,
  .gjs-cv-canvas .gjs-tools {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    outline: none;
    z-index: 1;
  }
  .gjs-cv-canvas * {
    box-sizing: border-box;
  }
  .gjs-frame {
    outline: medium none;
    height: 100%;
    width: 100%;
    border: none;
    margin: auto;
    display: block;
    transition: width 0.35s ease, height 0.35s ease;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .gjs-toolbar {
    position: absolute;
    background-color: #3b97e3;
    white-space: nowrap;
    color: #fff;
    z-index: 10;
    top: 0;
    left: 0;
  }
  .gjs-toolbar-item {
    padding: 5px 7px;
    font-size: 0.8rem;
    cursor: pointer;
    width: 26px;
    vertical-align: middle;
    display: inline-block;
  }
  .gjs-toolbar-item svg {
    fill: currentColor;
    vertical-align: middle;
  }
  .gjs-resizer-c {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
  }
  .gjs-margin-v-el,
  .gjs-padding-v-el,
  .gjs-fixedmargin-v-el,
  .gjs-fixedpadding-v-el {
    opacity: 0.1;
    filter: alpha(opacity=10);
    position: absolute;
    background-color: #ff0;
  }
  .gjs-fixedmargin-v-el,
  .gjs-fixedpadding-v-el {
    opacity: 0.2;
    filter: alpha(opacity=20);
  }
  .gjs-padding-v-el,
  .gjs-fixedpadding-v-el {
    background-color: navy;
  }
  .gjs-resizer-h {
    pointer-events: all;
    position: absolute;
    border: 3px solid #3b97e3;
    width: 10px;
    height: 10px;
    background-color: #fff;
    margin: -5px;
  }
  .gjs-resizer-h-tl {
    top: 0;
    left: 0;
    cursor: nwse-resize;
  }
  .gjs-resizer-h-tr {
    top: 0;
    right: 0;
    cursor: nesw-resize;
  }
  .gjs-resizer-h-tc {
    top: 0;
    margin: -5px auto;
    left: 0;
    right: 0;
    cursor: ns-resize;
  }
  .gjs-resizer-h-cl {
    left: 0;
    margin: auto -5px;
    top: 0;
    bottom: 0;
    cursor: ew-resize;
  }
  .gjs-resizer-h-cr {
    margin: auto -5px;
    top: 0;
    bottom: 0;
    right: 0;
    cursor: ew-resize;
  }
  .gjs-resizer-h-bl {
    bottom: 0;
    left: 0;
    cursor: nesw-resize;
  }
  .gjs-resizer-h-bc {
    bottom: 0;
    margin: -5px auto;
    left: 0;
    right: 0;
    cursor: ns-resize;
  }
  .gjs-resizer-h-br {
    bottom: 0;
    right: 0;
    cursor: nwse-resize;
  }
  .gjs-pn-panel .gjs-resizer-h {
    background-color: rgba(0, 0, 0, 0.2);
    border: none;
    opacity: 0;
    transition: opacity 0.25s;
  }
  .gjs-pn-panel .gjs-resizer-h:hover {
    opacity: 1;
  }
  .gjs-pn-panel .gjs-resizer-h-tc,
  .gjs-pn-panel .gjs-resizer-h-bc {
    margin: 0 auto;
    width: 100%;
  }
  .gjs-pn-panel .gjs-resizer-h-cr,
  .gjs-pn-panel .gjs-resizer-h-cl {
    margin: auto 0;
    height: 100%;
  }
  .gjs-resizing .gjs-highlighter,
  .gjs-resizing .gjs-badge {
    display: none !important;
  }
  .gjs-resizing-tl * {
    cursor: nwse-resize !important;
  }
  .gjs-resizing-tr * {
    cursor: nesw-resize !important;
  }
  .gjs-resizing-tc * {
    cursor: ns-resize !important;
  }
  .gjs-resizing-cl * {
    cursor: ew-resize !important;
  }
  .gjs-resizing-cr * {
    cursor: ew-resize !important;
  }
  .gjs-resizing-bl * {
    cursor: nesw-resize !important;
  }
  .gjs-resizing-bc * {
    cursor: ns-resize !important;
  }
  .gjs-resizing-br * {
    cursor: nwse-resize !important;
  }
  .btn-cl,
  .gjs-am-close,
  .gjs-mdl-btn-close {
    opacity: 0.3;
    filter: alpha(opacity=30);
    font-size: 25px;
    cursor: pointer;
  }
  .btn-cl:hover,
  .gjs-am-close:hover,
  .gjs-mdl-btn-close:hover {
    opacity: 0.7;
    filter: alpha(opacity=70);
  }
  .no-dots,
  .ui-resizable-handle {
    border: none !important;
    margin: 0 !important;
    outline: none !important;
  }
  .gjs-com-dashed * {
    outline: 1px dashed #888;
    outline-offset: -2px;
    box-sizing: border-box;
  }
  .gjs-cv-canvas .gjs-comp-selected {
    outline: 3px solid #3b97e3 !important;
  }
  *.gjs-com-hover,
  div.gjs-com-hover {
    outline: 1px solid #3b97e3;
  }
  *.gjs-com-hover-delete,
  div.gjs-com-hover-delete {
    outline: 2px solid #dd3636;
    opacity: 0.5;
    filter: alpha(opacity=50);
  }
  *.gjs-com-hover-move,
  div.gjs-com-hover-move {
    outline: 3px solid #ffca6f;
  }
  .gjs-com-badge,
  .gjs-com-badge-red,
  .gjs-badge {
    pointer-events: none;
    background-color: #3b97e3;
    color: #fff;
    padding: 2px 5px;
    position: absolute;
    z-index: 1;
    font-size: 12px;
    outline: none;
    display: none;
  }
  .gjs-com-badge-red {
    background-color: #dd3636;
  }
  .gjs-badge-warning {
    background-color: #ffca6f;
  }
  .gjs-placeholder,
  .gjs-com-placeholder,
  .gjs-placeholder {
    position: absolute;
    z-index: 10;
    pointer-events: none;
    display: none;
  }
  .gjs-placeholder,
  .gjs-placeholder {
    border-style: solid !important;
    outline: none;
    box-sizing: border-box;
    transition: top 0.2s, left 0.2s, width 0.2s, height 0.2s;
  }
  .gjs-placeholder.horizontal,
  .gjs-com-placeholder.horizontal,
  .gjs-placeholder.horizontal {
    border-color: transparent #62c462;
    border-width: 3px 5px;
    margin: -3px 0 0;
  }
  .gjs-placeholder.vertical,
  .gjs-com-placeholder.vertical,
  .gjs-placeholder.vertical {
    border-color: #62c462 transparent;
    border-width: 5px 3px;
    margin: 0 0 0 -3px;
  }
  .gjs-placeholder-int,
  .gjs-com-placeholder-int,
  .gjs-placeholder-int {
    background-color: #62c462;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
    height: 100%;
    width: 100%;
    pointer-events: none;
    padding: 1.5px;
    outline: none;
  }
  .gjs-pn-panel {
    display: inline-block;
    position: absolute;
    box-sizing: border-box;
    text-align: center;
    padding: 5px;
    z-index: 3;
  }
  .gjs-pn-panel .icon-undo,
  .gjs-pn-panel .icon-redo {
    font-size: 20px;
    height: 30px;
    width: 25px;
  }
  .gjs-pn-commands {
    width: 85%;
    left: 0;
    top: 0;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
  .gjs-pn-options {
    right: 15%;
    top: 0;
  }
  .gjs-pn-views {
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
    right: 0;
    width: 15%;
    z-index: 4;
  }
  .gjs-pn-views-container {
    height: 100%;
    padding: 42px 0 0;
    right: 0;
    width: 15%;
    overflow: auto;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
  .gjs-pn-buttons {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }
  .gjs-pn-btn {
    box-sizing: border-box;
    min-height: 30px;
    min-width: 30px;
    line-height: 21px;
    background-color: transparent;
    border: none;
    font-size: 18px;
    margin-right: 5px;
    border-radius: 2px;
    padding: 4px;
    position: relative;
    cursor: pointer;
  }
  .gjs-pn-btn.gjs-pn-active {
    background-color: rgba(0, 0, 0, 0.15);
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.25) inset;
  }
  .gjs-pn-btn svg {
    fill: currentColor;
  }
  .gjs-comp-image-placeholder {
    display: block;
    background-color: #f5f5f5;
    color: #777;
    height: 50px;
    width: 50px;
    line-height: 50px;
    outline: 3px solid #ffca6f;
    outline-offset: -3px;
    text-align: center;
    font-size: 16.6666666667px;
    cursor: pointer;
  }
  .gjs-comp-image-placeholder.fa-picture-o::after {
    content: "";
  }
  .gjs-label {
    line-height: 18px;
  }
  .gjs-fields {
    display: flex;
  }
  .gjs-select {
    padding: 0;
    width: 100%;
  }
  .gjs-select select {
    padding-right: 10px;
  }
  .gjs-select:-moz-focusring,
  .gjs-select select:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 rgba(255, 255, 255, 0.7);
  }
  .gjs-input:focus,
  .gjs-button:focus,
  .gjs-btn-prim:focus,
  .gjs-select:focus,
  .gjs-select select:focus {
    outline: none;
  }
  .gjs-field input,
  .gjs-field select,
  .gjs-field textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    color: inherit;
    border: none;
    background-color: transparent;
    box-sizing: border-box;
    width: 100%;
    position: relative;
    padding: 5px;
    z-index: 1;
  }
  .gjs-field input:focus,
  .gjs-field select:focus,
  .gjs-field textarea:focus {
    outline: none;
  }
  .gjs-field input[type="number"] {
    -moz-appearance: textfield;
  }
  .gjs-field input[type="number"]::-webkit-outer-spin-button,
  .gjs-field input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  .gjs-field-range {
    flex: 9 1 auto;
  }
  .gjs-field-integer input {
    padding-right: 30px;
  }
  .gjs-select option,
  .gjs-field-select option,
  .gjs-clm-select option,
  .gjs-sm-select option,
  .gjs-fields option,
  .gjs-sm-unit option {
    background-color: #444;
    color: #ddd;
  }
  .gjs-field {
    background-color: rgba(0, 0, 0, 0.2);
    border: none;
    box-shadow: none;
    border-radius: 2px;
    box-sizing: border-box;
    padding: 0;
    position: relative;
  }
  .gjs-field textarea {
    resize: vertical;
  }
  .gjs-field .gjs-sel-arrow {
    height: 100%;
    width: 9px;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 0;
  }
  .gjs-field .gjs-d-s-arrow {
    bottom: 0;
    top: 0;
    margin: auto;
    right: 5px;
    border-top: 4px solid rgba(255, 255, 255, 0.7);
    position: absolute;
    height: 0;
    width: 0;
    border-left: 3px solid transparent;
    border-right: 4px solid transparent;
    cursor: pointer;
  }
  .gjs-field-arrows {
    position: absolute;
    cursor: ns-resize;
    margin: auto;
    height: 20px;
    width: 9px;
    z-index: 10;
    bottom: 0;
    right: 3px;
    top: 0;
  }
  .gjs-field-color,
  .gjs-field-radio {
    width: 100%;
  }
  .gjs-field-color input {
    padding-right: 22px;
    box-sizing: border-box;
  }
  .gjs-field-colorp {
    border-left: 1px solid rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    height: 100%;
    padding: 2px;
    position: absolute;
    right: 0;
    top: 0;
    width: 22px;
    z-index: 10;
  }
  .gjs-field-colorp .gjs-checker-bg,
  .gjs-field-colorp .gjs-field-colorp-c {
    height: 100%;
    width: 100%;
    border-radius: 1px;
  }
  .gjs-field-colorp-c {
    height: 100%;
    position: relative;
    width: 100%;
  }
  .gjs-field-color-picker {
    background-color: #ddd;
    cursor: pointer;
    height: 100%;
    width: 100%;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
    border-radius: 1px;
    position: absolute;
    top: 0;
  }
  .gjs-field-checkbox {
    padding: 0;
    width: 17px;
    height: 17px;
    display: block;
    cursor: pointer;
  }
  .gjs-field-checkbox input {
    display: none;
  }
  .gjs-field-checkbox input:checked + .gjs-chk-icon {
    border-color: rgba(255, 255, 255, 0.5);
    border-width: 0 2px 2px 0;
    border-style: solid;
  }
  .gjs-radio-item {
    flex: 1 1 auto;
    text-align: center;
    border-left: 1px solid rgba(0, 0, 0, 0.2);
  }
  .gjs-radio-item:first-child {
    border: none;
  }
  .gjs-radio-item:hover {
    background: rgba(0, 0, 0, 0.2);
  }
  .gjs-radio-item input {
    display: none;
  }
  .gjs-radio-item input:checked + .gjs-radio-item-label {
    background-color: rgba(255, 255, 255, 0.2);
  }
  .gjs-radio-items {
    display: flex;
  }
  .gjs-radio-item-label {
    cursor: pointer;
    display: block;
    padding: 5px;
  }
  .gjs-field-units {
    position: absolute;
    margin: auto;
    right: 10px;
    bottom: 0;
    top: 0;
  }
  .gjs-field-unit {
    position: absolute;
    right: 10px;
    top: 3px;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
  }
  .gjs-field-arrow-u,
  .gjs-field-arrow-d {
    position: absolute;
    height: 0;
    width: 0;
    border-left: 3px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid rgba(255, 255, 255, 0.7);
    bottom: 4px;
    cursor: pointer;
  }
  .gjs-field-arrow-u {
    border-bottom: 4px solid rgba(255, 255, 255, 0.7);
    border-top: none;
    top: 4px;
  }
  .gjs-field-select {
    padding: 0;
  }
  .gjs-field-range {
    background-color: transparent;
    border: none;
    box-shadow: none;
    padding: 0;
  }
  .gjs-field-range input {
    margin: 0;
    height: 100%;
  }
  .gjs-field-range input:focus {
    outline: none;
  }
  .gjs-field-range input::-webkit-slider-thumb {
    -webkit-appearance: none;
    margin-top: -4px;
    height: 10px;
    width: 10px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 100%;
    background-color: #ddd;
    cursor: pointer;
  }
  .gjs-field-range input::-moz-range-thumb {
    height: 10px;
    width: 10px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 100%;
    background-color: #ddd;
    cursor: pointer;
  }
  .gjs-field-range input::-ms-thumb {
    height: 10px;
    width: 10px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 100%;
    background-color: #ddd;
    cursor: pointer;
  }
  .gjs-field-range input::-moz-range-track {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 1px;
    margin-top: 3px;
    height: 3px;
  }
  .gjs-field-range input::-webkit-slider-runnable-track {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 1px;
    margin-top: 3px;
    height: 3px;
  }
  .gjs-field-range input::-ms-track {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 1px;
    margin-top: 3px;
    height: 3px;
  }
  .gjs-btn-prim {
    color: inherit;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    padding: 3px 6px;
    padding: 5px;
    cursor: pointer;
    border: none;
  }
  .gjs-btn-prim:active {
    background-color: rgba(255, 255, 255, 0.1);
  }
  .gjs-btn--full {
    width: 100%;
  }
  .gjs-chk-icon {
    -ms-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    transform: rotate(45deg);
    box-sizing: border-box;
    display: block;
    height: 14px;
    margin: 0 5px;
    width: 6px;
  }
  .gjs-add-trasp {
    background: none;
    border: none;
    color: #ddd;
    cursor: pointer;
    font-size: 1em;
    border-radius: 2px;
    opacity: 0.75;
    filter: alpha(opacity=75);
  }
  .gjs-add-trasp:hover {
    opacity: 1;
    filter: alpha(opacity=100);
  }
  .gjs-add-trasp:active {
    background-color: rgba(0, 0, 0, 0.2);
  }
  .gjs-devices-c {
    display: flex;
    align-items: center;
    padding: 3px;
  }
  .gjs-devices-c .gjs-device-label {
    flex-grow: 2;
    text-align: left;
    margin-right: 10px;
  }
  .gjs-devices-c .gjs-select {
    flex-grow: 20;
  }
  .gjs-devices-c .gjs-add-trasp {
    flex-grow: 1;
    margin-left: 5px;
  }
  .gjs-category-open,
  .gjs-block-category.gjs-open,
  .gjs-sm-sector.gjs-sm-open,
  .gjs-sm-open.gjs-clm-tags {
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
  }
  .gjs-category-title,
  .gjs-layer-title,
  .gjs-block-category .gjs-title,
  .gjs-sm-sector .gjs-sm-title,
  .gjs-clm-tags .gjs-sm-title {
    font-weight: lighter;
    background-color: rgba(0, 0, 0, 0.1);
    letter-spacing: 1px;
    padding: 9px 10px 9px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    text-align: left;
    position: relative;
    cursor: pointer;
  }
  .gjs-sm-clear {
    line-height: 0;
    cursor: pointer;
  }
  .gjs-sm-header {
    font-weight: lighter;
    padding: 10px;
  }
  .gjs-sm-properties {
    font-size: 0.75rem;
    padding: 10px 5px;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    box-sizing: border-box;
    width: 100%;
  }
  .gjs-sm-label {
    margin: 5px 5px 3px 0;
  }
  .gjs-sm-close-btn,
  .gjs-sm-sector .gjs-sm-property.gjs-sm-file #gjs-sm-preview-box #gjs-sm-close,
  .gjs-clm-tags .gjs-sm-property.gjs-sm-file #gjs-sm-preview-box #gjs-sm-close {
    display: block;
    font-size: 23px;
    position: absolute;
    cursor: pointer;
    right: 5px;
    top: 0;
    opacity: 0.2;
    filter: alpha(opacity=20);
  }
  .gjs-sm-close-btn:hover,
  .gjs-sm-sector
    .gjs-sm-property.gjs-sm-file
    #gjs-sm-preview-box
    #gjs-sm-close:hover,
  .gjs-clm-tags
    .gjs-sm-property.gjs-sm-file
    #gjs-sm-preview-box
    #gjs-sm-close:hover {
    opacity: 0.7;
    filter: alpha(opacity=70);
  }
  .gjs-sm-sector,
  .gjs-clm-tags {
    clear: both;
    font-weight: lighter;
    text-align: left;
  }
  .gjs-sm-sector #gjs-sm-caret,
  .gjs-clm-tags #gjs-sm-caret {
    padding-right: 5px;
    font-size: 11px;
  }
  .gjs-sm-sector .gjs-sm-field,
  .gjs-clm-tags .gjs-sm-field,
  .gjs-sm-sector .gjs-clm-select,
  .gjs-clm-tags .gjs-clm-select,
  .gjs-sm-sector .gjs-clm-field,
  .gjs-clm-tags .gjs-clm-field {
    width: 100%;
    position: relative;
  }
  .gjs-sm-sector .gjs-sm-field input,
  .gjs-clm-tags .gjs-sm-field input,
  .gjs-sm-sector .gjs-clm-select input,
  .gjs-clm-tags .gjs-clm-select input,
  .gjs-sm-sector .gjs-clm-field input,
  .gjs-clm-tags .gjs-clm-field input,
  .gjs-sm-sector .gjs-sm-field select,
  .gjs-clm-tags .gjs-sm-field select,
  .gjs-sm-sector .gjs-clm-select select,
  .gjs-clm-tags .gjs-clm-select select,
  .gjs-sm-sector .gjs-clm-field select,
  .gjs-clm-tags .gjs-clm-field select {
    background-color: transparent;
    color: rgba(255, 255, 255, 0.7);
    border: none;
    width: 100%;
  }
  .gjs-sm-sector .gjs-sm-field input,
  .gjs-clm-tags .gjs-sm-field input,
  .gjs-sm-sector .gjs-clm-select input,
  .gjs-clm-tags .gjs-clm-select input,
  .gjs-sm-sector .gjs-clm-field input,
  .gjs-clm-tags .gjs-clm-field input {
    box-sizing: border-box;
  }
  .gjs-sm-sector .gjs-sm-field select,
  .gjs-clm-tags .gjs-sm-field select,
  .gjs-sm-sector .gjs-clm-select select,
  .gjs-clm-tags .gjs-clm-select select,
  .gjs-sm-sector .gjs-clm-field select,
  .gjs-clm-tags .gjs-clm-field select {
    position: relative;
    z-index: 1;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  .gjs-sm-sector .gjs-sm-field select::-ms-expand,
  .gjs-clm-tags .gjs-sm-field select::-ms-expand,
  .gjs-sm-sector .gjs-clm-select select::-ms-expand,
  .gjs-clm-tags .gjs-clm-select select::-ms-expand,
  .gjs-sm-sector .gjs-clm-field select::-ms-expand,
  .gjs-clm-tags .gjs-clm-field select::-ms-expand {
    display: none;
  }
  .gjs-sm-sector .gjs-sm-field select:-moz-focusring,
  .gjs-clm-tags .gjs-sm-field select:-moz-focusring,
  .gjs-sm-sector .gjs-clm-select select:-moz-focusring,
  .gjs-clm-tags .gjs-clm-select select:-moz-focusring,
  .gjs-sm-sector .gjs-clm-field select:-moz-focusring,
  .gjs-clm-tags .gjs-clm-field select:-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 rgba(255, 255, 255, 0.7);
  }
  .gjs-sm-sector .gjs-sm-field input:focus,
  .gjs-clm-tags .gjs-sm-field input:focus,
  .gjs-sm-sector .gjs-clm-select input:focus,
  .gjs-clm-tags .gjs-clm-select input:focus,
  .gjs-sm-sector .gjs-clm-field input:focus,
  .gjs-clm-tags .gjs-clm-field input:focus,
  .gjs-sm-sector .gjs-sm-field select:focus,
  .gjs-clm-tags .gjs-sm-field select:focus,
  .gjs-sm-sector .gjs-clm-select select:focus,
  .gjs-clm-tags .gjs-clm-select select:focus,
  .gjs-sm-sector .gjs-clm-field select:focus,
  .gjs-clm-tags .gjs-clm-field select:focus {
    outline: none;
  }
  .gjs-sm-sector .gjs-sm-field .gjs-sm-unit,
  .gjs-clm-tags .gjs-sm-field .gjs-sm-unit,
  .gjs-sm-sector .gjs-clm-select .gjs-sm-unit,
  .gjs-clm-tags .gjs-clm-select .gjs-sm-unit,
  .gjs-sm-sector .gjs-clm-field .gjs-sm-unit,
  .gjs-clm-tags .gjs-clm-field .gjs-sm-unit {
    position: absolute;
    right: 10px;
    top: 3px;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
  }
  .gjs-sm-sector .gjs-sm-field .gjs-clm-sel-arrow,
  .gjs-clm-tags .gjs-sm-field .gjs-clm-sel-arrow,
  .gjs-sm-sector .gjs-clm-select .gjs-clm-sel-arrow,
  .gjs-clm-tags .gjs-clm-select .gjs-clm-sel-arrow,
  .gjs-sm-sector .gjs-clm-field .gjs-clm-sel-arrow,
  .gjs-clm-tags .gjs-clm-field .gjs-clm-sel-arrow,
  .gjs-sm-sector .gjs-sm-field .gjs-sm-int-arrows,
  .gjs-clm-tags .gjs-sm-field .gjs-sm-int-arrows,
  .gjs-sm-sector .gjs-clm-select .gjs-sm-int-arrows,
  .gjs-clm-tags .gjs-clm-select .gjs-sm-int-arrows,
  .gjs-sm-sector .gjs-clm-field .gjs-sm-int-arrows,
  .gjs-clm-tags .gjs-clm-field .gjs-sm-int-arrows,
  .gjs-sm-sector .gjs-sm-field .gjs-sm-sel-arrow,
  .gjs-clm-tags .gjs-sm-field .gjs-sm-sel-arrow,
  .gjs-sm-sector .gjs-clm-select .gjs-sm-sel-arrow,
  .gjs-clm-tags .gjs-clm-select .gjs-sm-sel-arrow,
  .gjs-sm-sector .gjs-clm-field .gjs-sm-sel-arrow,
  .gjs-clm-tags .gjs-clm-field .gjs-sm-sel-arrow {
    height: 100%;
    width: 9px;
    position: absolute;
    right: 0;
    top: 0;
    cursor: ns-resize;
  }
  .gjs-sm-sector .gjs-sm-field .gjs-sm-sel-arrow,
  .gjs-clm-tags .gjs-sm-field .gjs-sm-sel-arrow,
  .gjs-sm-sector .gjs-clm-select .gjs-sm-sel-arrow,
  .gjs-clm-tags .gjs-clm-select .gjs-sm-sel-arrow,
  .gjs-sm-sector .gjs-clm-field .gjs-sm-sel-arrow,
  .gjs-clm-tags .gjs-clm-field .gjs-sm-sel-arrow {
    cursor: pointer;
  }
  .gjs-sm-sector .gjs-sm-field .gjs-clm-d-s-arrow,
  .gjs-clm-tags .gjs-sm-field .gjs-clm-d-s-arrow,
  .gjs-sm-sector .gjs-clm-select .gjs-clm-d-s-arrow,
  .gjs-clm-tags .gjs-clm-select .gjs-clm-d-s-arrow,
  .gjs-sm-sector .gjs-clm-field .gjs-clm-d-s-arrow,
  .gjs-clm-tags .gjs-clm-field .gjs-clm-d-s-arrow,
  .gjs-sm-sector .gjs-sm-field .gjs-sm-d-arrow,
  .gjs-clm-tags .gjs-sm-field .gjs-sm-d-arrow,
  .gjs-sm-sector .gjs-clm-select .gjs-sm-d-arrow,
  .gjs-clm-tags .gjs-clm-select .gjs-sm-d-arrow,
  .gjs-sm-sector .gjs-clm-field .gjs-sm-d-arrow,
  .gjs-clm-tags .gjs-clm-field .gjs-sm-d-arrow,
  .gjs-sm-sector .gjs-sm-field .gjs-sm-d-s-arrow,
  .gjs-clm-tags .gjs-sm-field .gjs-sm-d-s-arrow,
  .gjs-sm-sector .gjs-clm-select .gjs-sm-d-s-arrow,
  .gjs-clm-tags .gjs-clm-select .gjs-sm-d-s-arrow,
  .gjs-sm-sector .gjs-clm-field .gjs-sm-d-s-arrow,
  .gjs-clm-tags .gjs-clm-field .gjs-sm-d-s-arrow,
  .gjs-sm-sector .gjs-sm-field .gjs-sm-u-arrow,
  .gjs-clm-tags .gjs-sm-field .gjs-sm-u-arrow,
  .gjs-sm-sector .gjs-clm-select .gjs-sm-u-arrow,
  .gjs-clm-tags .gjs-clm-select .gjs-sm-u-arrow,
  .gjs-sm-sector .gjs-clm-field .gjs-sm-u-arrow,
  .gjs-clm-tags .gjs-clm-field .gjs-sm-u-arrow {
    position: absolute;
    height: 0;
    width: 0;
    border-left: 3px solid transparent;
    border-right: 4px solid transparent;
    cursor: pointer;
  }
  .gjs-sm-sector .gjs-sm-field .gjs-sm-u-arrow,
  .gjs-clm-tags .gjs-sm-field .gjs-sm-u-arrow,
  .gjs-sm-sector .gjs-clm-select .gjs-sm-u-arrow,
  .gjs-clm-tags .gjs-clm-select .gjs-sm-u-arrow,
  .gjs-sm-sector .gjs-clm-field .gjs-sm-u-arrow,
  .gjs-clm-tags .gjs-clm-field .gjs-sm-u-arrow {
    border-bottom: 4px solid rgba(255, 255, 255, 0.7);
    top: 4px;
  }
  .gjs-sm-sector .gjs-sm-field .gjs-clm-d-s-arrow,
  .gjs-clm-tags .gjs-sm-field .gjs-clm-d-s-arrow,
  .gjs-sm-sector .gjs-clm-select .gjs-clm-d-s-arrow,
  .gjs-clm-tags .gjs-clm-select .gjs-clm-d-s-arrow,
  .gjs-sm-sector .gjs-clm-field .gjs-clm-d-s-arrow,
  .gjs-clm-tags .gjs-clm-field .gjs-clm-d-s-arrow,
  .gjs-sm-sector .gjs-sm-field .gjs-sm-d-arrow,
  .gjs-clm-tags .gjs-sm-field .gjs-sm-d-arrow,
  .gjs-sm-sector .gjs-clm-select .gjs-sm-d-arrow,
  .gjs-clm-tags .gjs-clm-select .gjs-sm-d-arrow,
  .gjs-sm-sector .gjs-clm-field .gjs-sm-d-arrow,
  .gjs-clm-tags .gjs-clm-field .gjs-sm-d-arrow,
  .gjs-sm-sector .gjs-sm-field .gjs-sm-d-s-arrow,
  .gjs-clm-tags .gjs-sm-field .gjs-sm-d-s-arrow,
  .gjs-sm-sector .gjs-clm-select .gjs-sm-d-s-arrow,
  .gjs-clm-tags .gjs-clm-select .gjs-sm-d-s-arrow,
  .gjs-sm-sector .gjs-clm-field .gjs-sm-d-s-arrow,
  .gjs-clm-tags .gjs-clm-field .gjs-sm-d-s-arrow {
    border-top: 4px solid rgba(255, 255, 255, 0.7);
    bottom: 4px;
  }
  .gjs-sm-sector .gjs-sm-field .gjs-clm-d-s-arrow,
  .gjs-clm-tags .gjs-sm-field .gjs-clm-d-s-arrow,
  .gjs-sm-sector .gjs-clm-select .gjs-clm-d-s-arrow,
  .gjs-clm-tags .gjs-clm-select .gjs-clm-d-s-arrow,
  .gjs-sm-sector .gjs-clm-field .gjs-clm-d-s-arrow,
  .gjs-clm-tags .gjs-clm-field .gjs-clm-d-s-arrow,
  .gjs-sm-sector .gjs-sm-field .gjs-sm-d-s-arrow,
  .gjs-clm-tags .gjs-sm-field .gjs-sm-d-s-arrow,
  .gjs-sm-sector .gjs-clm-select .gjs-sm-d-s-arrow,
  .gjs-clm-tags .gjs-clm-select .gjs-sm-d-s-arrow,
  .gjs-sm-sector .gjs-clm-field .gjs-sm-d-s-arrow,
  .gjs-clm-tags .gjs-clm-field .gjs-sm-d-s-arrow {
    bottom: 7px;
  }
  .gjs-sm-sector .gjs-sm-field.gjs-sm-color,
  .gjs-clm-tags .gjs-sm-field.gjs-sm-color,
  .gjs-sm-sector .gjs-sm-color.gjs-clm-field,
  .gjs-clm-tags .gjs-sm-color.gjs-clm-field,
  .gjs-sm-sector .gjs-sm-field.gjs-sm-input,
  .gjs-clm-tags .gjs-sm-field.gjs-sm-input,
  .gjs-sm-sector .gjs-sm-input.gjs-clm-field,
  .gjs-clm-tags .gjs-sm-input.gjs-clm-field,
  .gjs-sm-sector .gjs-sm-field.gjs-sm-integer,
  .gjs-clm-tags .gjs-sm-field.gjs-sm-integer,
  .gjs-sm-sector .gjs-sm-integer.gjs-clm-field,
  .gjs-clm-tags .gjs-sm-integer.gjs-clm-field,
  .gjs-sm-sector .gjs-sm-field.gjs-sm-list,
  .gjs-clm-tags .gjs-sm-field.gjs-sm-list,
  .gjs-sm-sector .gjs-sm-list.gjs-clm-field,
  .gjs-clm-tags .gjs-sm-list.gjs-clm-field,
  .gjs-sm-sector .gjs-sm-field.gjs-sm-select,
  .gjs-clm-tags .gjs-sm-field.gjs-sm-select,
  .gjs-sm-sector .gjs-clm-select,
  .gjs-clm-tags .gjs-clm-select,
  .gjs-sm-sector .gjs-sm-select.gjs-clm-field,
  .gjs-clm-tags .gjs-sm-select.gjs-clm-field {
    background-color: rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 1px 1px 0 rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.7);
    border-radius: 2px;
    box-sizing: border-box;
    padding: 0 5px;
  }
  .gjs-sm-sector .gjs-sm-field.gjs-sm-composite,
  .gjs-clm-tags .gjs-sm-field.gjs-sm-composite,
  .gjs-sm-sector .gjs-sm-composite.gjs-clm-select,
  .gjs-clm-tags .gjs-sm-composite.gjs-clm-select,
  .gjs-sm-sector .gjs-sm-composite.gjs-clm-field,
  .gjs-clm-tags .gjs-sm-composite.gjs-clm-field {
    border-radius: 2px;
  }
  .gjs-sm-sector .gjs-sm-field.gjs-sm-select,
  .gjs-clm-tags .gjs-sm-field.gjs-sm-select,
  .gjs-sm-sector .gjs-clm-select,
  .gjs-clm-tags .gjs-clm-select,
  .gjs-sm-sector .gjs-sm-select.gjs-clm-field,
  .gjs-clm-tags .gjs-sm-select.gjs-clm-field {
    padding: 0;
  }
  .gjs-sm-sector .gjs-sm-field.gjs-sm-select select,
  .gjs-clm-tags .gjs-sm-field.gjs-sm-select select,
  .gjs-sm-sector .gjs-clm-select select,
  .gjs-clm-tags .gjs-clm-select select,
  .gjs-sm-sector .gjs-sm-select.gjs-clm-field select,
  .gjs-clm-tags .gjs-sm-select.gjs-clm-field select {
    height: 20px;
  }
  .gjs-sm-sector .gjs-sm-field.gjs-sm-select option,
  .gjs-clm-tags .gjs-sm-field.gjs-sm-select option,
  .gjs-sm-sector .gjs-clm-select option,
  .gjs-clm-tags .gjs-clm-select option,
  .gjs-sm-sector .gjs-sm-select.gjs-clm-field option,
  .gjs-clm-tags .gjs-sm-select.gjs-clm-field option {
    padding: 3px 0;
  }
  .gjs-sm-sector .gjs-sm-field.gjs-sm-composite,
  .gjs-clm-tags .gjs-sm-field.gjs-sm-composite,
  .gjs-sm-sector .gjs-sm-composite.gjs-clm-select,
  .gjs-clm-tags .gjs-sm-composite.gjs-clm-select,
  .gjs-sm-sector .gjs-sm-composite.gjs-clm-field,
  .gjs-clm-tags .gjs-sm-composite.gjs-clm-field {
    background-color: rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.25);
  }
  .gjs-sm-sector .gjs-sm-field.gjs-sm-list,
  .gjs-clm-tags .gjs-sm-field.gjs-sm-list,
  .gjs-sm-sector .gjs-sm-list.gjs-clm-select,
  .gjs-clm-tags .gjs-sm-list.gjs-clm-select,
  .gjs-sm-sector .gjs-sm-list.gjs-clm-field,
  .gjs-clm-tags .gjs-sm-list.gjs-clm-field {
    width: auto;
    padding: 0;
    overflow: hidden;
    float: left;
  }
  .gjs-sm-sector .gjs-sm-field.gjs-sm-list input,
  .gjs-clm-tags .gjs-sm-field.gjs-sm-list input,
  .gjs-sm-sector .gjs-sm-list.gjs-clm-select input,
  .gjs-clm-tags .gjs-sm-list.gjs-clm-select input,
  .gjs-sm-sector .gjs-sm-list.gjs-clm-field input,
  .gjs-clm-tags .gjs-sm-list.gjs-clm-field input {
    display: none;
  }
  .gjs-sm-sector .gjs-sm-field.gjs-sm-list label,
  .gjs-clm-tags .gjs-sm-field.gjs-sm-list label,
  .gjs-sm-sector .gjs-sm-list.gjs-clm-select label,
  .gjs-clm-tags .gjs-sm-list.gjs-clm-select label,
  .gjs-sm-sector .gjs-sm-list.gjs-clm-field label,
  .gjs-clm-tags .gjs-sm-list.gjs-clm-field label {
    cursor: pointer;
    padding: 5px;
    display: block;
  }
  .gjs-sm-sector .gjs-sm-field.gjs-sm-list .gjs-sm-radio:checked + label,
  .gjs-clm-tags .gjs-sm-field.gjs-sm-list .gjs-sm-radio:checked + label,
  .gjs-sm-sector .gjs-sm-list.gjs-clm-select .gjs-sm-radio:checked + label,
  .gjs-clm-tags .gjs-sm-list.gjs-clm-select .gjs-sm-radio:checked + label,
  .gjs-sm-sector .gjs-sm-list.gjs-clm-field .gjs-sm-radio:checked + label,
  .gjs-clm-tags .gjs-sm-list.gjs-clm-field .gjs-sm-radio:checked + label {
    background-color: rgba(255, 255, 255, 0.2);
  }
  .gjs-sm-sector .gjs-sm-field.gjs-sm-list .gjs-sm-icon,
  .gjs-clm-tags .gjs-sm-field.gjs-sm-list .gjs-sm-icon,
  .gjs-sm-sector .gjs-sm-list.gjs-clm-select .gjs-sm-icon,
  .gjs-clm-tags .gjs-sm-list.gjs-clm-select .gjs-sm-icon,
  .gjs-sm-sector .gjs-sm-list.gjs-clm-field .gjs-sm-icon,
  .gjs-clm-tags .gjs-sm-list.gjs-clm-field .gjs-sm-icon {
    background-repeat: no-repeat;
    background-position: center;
    text-shadow: none;
    line-height: normal;
  }
  .gjs-sm-sector .gjs-sm-field.gjs-sm-integer select,
  .gjs-clm-tags .gjs-sm-field.gjs-sm-integer select,
  .gjs-sm-sector .gjs-sm-integer.gjs-clm-select select,
  .gjs-clm-tags .gjs-sm-integer.gjs-clm-select select,
  .gjs-sm-sector .gjs-sm-integer.gjs-clm-field select,
  .gjs-clm-tags .gjs-sm-integer.gjs-clm-field select {
    width: auto;
    padding: 0;
  }
  .gjs-sm-sector .gjs-sm-list .gjs-sm-el,
  .gjs-clm-tags .gjs-sm-list .gjs-sm-el {
    float: left;
    border-left: 1px solid rgba(0, 0, 0, 0.2);
  }
  .gjs-sm-sector .gjs-sm-list .gjs-sm-el:first-child,
  .gjs-clm-tags .gjs-sm-list .gjs-sm-el:first-child {
    border: none;
  }
  .gjs-sm-sector .gjs-sm-list .gjs-sm-el:hover,
  .gjs-clm-tags .gjs-sm-list .gjs-sm-el:hover {
    background: rgba(0, 0, 0, 0.2);
  }
  .gjs-sm-sector .gjs-sm-slider .gjs-field-integer,
  .gjs-clm-tags .gjs-sm-slider .gjs-field-integer {
    flex: 1 1 65px;
  }
  .gjs-sm-sector .gjs-sm-property,
  .gjs-clm-tags .gjs-sm-property {
    box-sizing: border-box;
    float: left;
    width: 50%;
    margin-bottom: 5px;
    padding: 0 5px;
  }
  .gjs-sm-sector .gjs-sm-property--full,
  .gjs-clm-tags .gjs-sm-property--full,
  .gjs-sm-sector .gjs-sm-property.gjs-sm-composite,
  .gjs-clm-tags .gjs-sm-property.gjs-sm-composite,
  .gjs-sm-sector .gjs-sm-property.gjs-sm-file,
  .gjs-clm-tags .gjs-sm-property.gjs-sm-file,
  .gjs-sm-sector .gjs-sm-property.gjs-sm-list,
  .gjs-clm-tags .gjs-sm-property.gjs-sm-list,
  .gjs-sm-sector .gjs-sm-property.gjs-sm-stack,
  .gjs-clm-tags .gjs-sm-property.gjs-sm-stack,
  .gjs-sm-sector .gjs-sm-property.gjs-sm-slider,
  .gjs-clm-tags .gjs-sm-property.gjs-sm-slider,
  .gjs-sm-sector .gjs-sm-property.gjs-sm-color,
  .gjs-clm-tags .gjs-sm-property.gjs-sm-color {
    width: 100%;
  }
  .gjs-sm-sector .gjs-sm-property .gjs-sm-btn,
  .gjs-clm-tags .gjs-sm-property .gjs-sm-btn {
    background-color: rgba(33, 33, 33, 0.2);
    border-radius: 2px;
    box-shadow: 1px 1px 0 rgba(5, 5, 5, 0.2),
      1px 1px 0 rgba(43, 43, 43, 0.2) inset;
    padding: 5px;
    position: relative;
    text-align: center;
    height: auto;
    width: 100%;
    cursor: pointer;
    color: #ddd;
    box-sizing: border-box;
    text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.2);
    border: none;
    opacity: 0.85;
    filter: alpha(opacity=85);
  }
  .gjs-sm-sector .gjs-sm-property .gjs-sm-btn-c,
  .gjs-clm-tags .gjs-sm-property .gjs-sm-btn-c {
    box-sizing: border-box;
    float: left;
    width: 100%;
  }
  .gjs-sm-sector .gjs-sm-property.gjs-sm-file #gjs-sm-preview-box,
  .gjs-clm-tags .gjs-sm-property.gjs-sm-file #gjs-sm-preview-box {
    background-color: rgba(255, 255, 255, 0.05);
    border-radius: 2px;
    margin-top: 5px;
    position: relative;
    overflow: hidden;
  }
  .gjs-sm-sector .gjs-sm-property.gjs-sm-file #gjs-sm-preview-box.gjs-sm-show,
  .gjs-clm-tags .gjs-sm-property.gjs-sm-file #gjs-sm-preview-box.gjs-sm-show {
    border: 1px solid rgba(252, 252, 252, 0.05);
    padding: 3px 20px;
  }
  .gjs-sm-sector .gjs-sm-property.gjs-sm-file #gjs-sm-preview-box #gjs-sm-close,
  .gjs-clm-tags .gjs-sm-property.gjs-sm-file #gjs-sm-preview-box #gjs-sm-close {
    top: -5px;
    display: block;
  }
  .gjs-sm-sector .gjs-sm-property.gjs-sm-file .gjs-sm-show #gjs-sm-preview-file,
  .gjs-clm-tags .gjs-sm-property.gjs-sm-file .gjs-sm-show #gjs-sm-preview-file {
    height: 50px;
  }
  .gjs-sm-sector .gjs-sm-property.gjs-sm-file #gjs-sm-preview-file,
  .gjs-clm-tags .gjs-sm-property.gjs-sm-file #gjs-sm-preview-file {
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .gjs-sm-sector .gjs-sm-property .gjs-sm-layers,
  .gjs-clm-tags .gjs-sm-property .gjs-sm-layers {
    margin-top: 5px;
    padding: 1px 3px;
    min-height: 30px;
  }
  .gjs-sm-sector .gjs-sm-property .gjs-sm-layer,
  .gjs-clm-tags .gjs-sm-property .gjs-sm-layer {
    background-color: rgba(255, 255, 255, 0.055);
    border-radius: 2px;
    margin: 2px 0;
    padding: 7px;
    position: relative;
    cursor: pointer;
  }
  .gjs-sm-sector .gjs-sm-property .gjs-sm-layer > #gjs-sm-preview-box,
  .gjs-clm-tags .gjs-sm-property .gjs-sm-layer > #gjs-sm-preview-box {
    height: 15px;
    position: absolute;
    right: 27px;
    top: 6px;
    width: 15px;
  }
  .gjs-sm-sector .gjs-sm-property .gjs-sm-layer #gjs-sm-preview,
  .gjs-clm-tags .gjs-sm-property .gjs-sm-layer #gjs-sm-preview,
  .gjs-sm-sector .gjs-sm-property .gjs-sm-layer #gjs-sm-preview-box,
  .gjs-clm-tags .gjs-sm-property .gjs-sm-layer #gjs-sm-preview-box {
    border-radius: 2px;
  }
  .gjs-sm-sector .gjs-sm-property .gjs-sm-layer #gjs-sm-close-layer,
  .gjs-clm-tags .gjs-sm-property .gjs-sm-layer #gjs-sm-close-layer {
    display: block;
    font-size: 23px;
    position: absolute;
    cursor: pointer;
    right: 5px;
    top: 0;
    opacity: 0.5;
    filter: alpha(opacity=50);
  }
  .gjs-sm-sector .gjs-sm-property .gjs-sm-layer #gjs-sm-close-layer:hover,
  .gjs-clm-tags .gjs-sm-property .gjs-sm-layer #gjs-sm-close-layer:hover {
    opacity: 0.8;
    filter: alpha(opacity=80);
  }
  .gjs-sm-sector
    .gjs-sm-property
    .gjs-sm-layer
    > #gjs-sm-preview-box
    #gjs-sm-preview,
  .gjs-clm-tags
    .gjs-sm-property
    .gjs-sm-layer
    > #gjs-sm-preview-box
    #gjs-sm-preview {
    background-color: #fff;
    height: 100%;
    width: 100%;
    background-size: cover !important;
  }
  .gjs-sm-sector .gjs-sm-property .gjs-sm-layer.gjs-sm-active,
  .gjs-clm-tags .gjs-sm-property .gjs-sm-layer.gjs-sm-active {
    background-color: rgba(255, 255, 255, 0.12);
  }
  .gjs-sm-sector
    .gjs-sm-property
    .gjs-sm-layer.gjs-sm-no-preview
    #gjs-sm-preview-box,
  .gjs-clm-tags
    .gjs-sm-property
    .gjs-sm-layer.gjs-sm-no-preview
    #gjs-sm-preview-box {
    display: none;
  }
  .gjs-sm-sector #gjs-sm-text-shadow #gjs-sm-preview::after,
  .gjs-clm-tags #gjs-sm-text-shadow #gjs-sm-preview::after {
    color: #000;
    content: "T";
    font-weight: 900;
    line-height: 17px;
    padding: 0 4px;
  }
  .gjs-sm-sector .gjs-sm-stack .gjs-sm-properties,
  .gjs-clm-tags .gjs-sm-stack .gjs-sm-properties {
    padding: 5px 0 0;
  }
  .gjs-sm-sector .gjs-sm-stack #gjs-sm-add,
  .gjs-clm-tags .gjs-sm-stack #gjs-sm-add {
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
    font-size: 22px;
    line-height: 10px;
    position: absolute;
    right: 0;
    top: -17px;
    opacity: 0.75;
  }
  .gjs-sm-sector .gjs-sm-stack #gjs-sm-add:hover,
  .gjs-clm-tags .gjs-sm-stack #gjs-sm-add:hover {
    opacity: 1;
    filter: alpha(opacity=100);
  }
  .gjs-sm-sector .gjs-sm-colorp-c,
  .gjs-clm-tags .gjs-sm-colorp-c {
    height: 100%;
    width: 20px;
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    border-radius: 2px;
    padding: 2px;
  }
  .gjs-sm-sector .gjs-sm-colorp-c .gjs-checker-bg,
  .gjs-clm-tags .gjs-sm-colorp-c .gjs-checker-bg,
  .gjs-sm-sector .gjs-sm-colorp-c .gjs-field-colorp-c,
  .gjs-clm-tags .gjs-sm-colorp-c .gjs-field-colorp-c {
    height: 100%;
    width: 100%;
    border-radius: 1px;
  }
  .gjs-sm-sector .gjs-sm-color-picker,
  .gjs-clm-tags .gjs-sm-color-picker {
    background-color: #ddd;
    cursor: pointer;
    height: 16px;
    width: 100%;
    margin-top: -16px;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
    border-radius: 1px;
  }
  .gjs-sm-sector .gjs-sm-btn-upload #gjs-sm-upload,
  .gjs-clm-tags .gjs-sm-btn-upload #gjs-sm-upload {
    left: 0;
    top: 0;
    position: absolute;
    width: 100%;
    opacity: 0;
    cursor: pointer;
  }
  .gjs-sm-sector .gjs-sm-btn-upload #gjs-sm-label,
  .gjs-clm-tags .gjs-sm-btn-upload #gjs-sm-label {
    padding: 2px 0;
  }
  .gjs-sm-layer > #gjs-sm-move {
    opacity: 0.7;
    filter: alpha(opacity=70);
    cursor: move;
    font-size: 12px;
    float: left;
    margin: 0 5px 0 0;
  }
  .gjs-sm-layer > #gjs-sm-move:hover {
    opacity: 0.9;
    filter: alpha(opacity=90);
  }
  .gjs-blocks-c {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .gjs-block-categories {
    display: flex;
    flex-direction: column;
  }
  .gjs-block-category {
    width: 100%;
  }
  .gjs-block-category .gjs-caret-icon {
    margin-right: 5px;
  }
  .gjs-block {
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
    width: 45%;
    min-width: 45px;
    padding: 1em;
    box-sizing: border-box;
    min-height: 90px;
    cursor: all-scroll;
    font-size: 11px;
    font-weight: lighter;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    margin: 10px 2.5% 5px;
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.15);
    transition: all 0.2s ease 0s;
    transition-property: box-shadow, color;
  }
  .gjs-block:hover {
    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.15);
  }
  .gjs-block svg {
    fill: currentColor;
  }
  .gjs-block__media {
    margin-bottom: 10px;
  }
  .gjs-block-svg {
    width: 54px;
    fill: currentColor;
  }
  .gjs-block-svg-path {
    fill: currentColor;
  }
  .gjs-block.fa {
    font-size: 2em;
    line-height: 2em;
    padding: 11px;
  }
  .gjs-block-label {
    line-height: normal;
    font-size: 0.65rem;
    font-weight: normal;
    font-family: Helvetica, sans-serif;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .gjs-block.gjs-bdrag {
    width: auto;
    padding: 0;
  }
  .gjs-selected-parent {
    border: 1px solid #ffca6f;
  }
  .gjs-opac50 {
    opacity: 0.5;
    filter: alpha(opacity=50);
  }
  .gjs-layer {
    font-weight: lighter;
    text-align: left;
    position: relative;
    background-color: rgba(0, 0, 0, 0.1);
    font-size: 0.75rem;
  }
  .gjs-layer-hidden {
    opacity: 0.55;
    filter: alpha(opacity=55);
  }
  .gjs-layer-count {
    position: absolute;
    right: 27px;
    top: 9px;
  }
  .gjs-layer-vis {
    height: auto !important;
    width: auto !important;
    left: 0;
    top: 0;
    padding: 7px 5px 7px 10px;
    position: absolute;
    cursor: pointer;
    z-index: 1;
  }
  .gjs-layer-caret {
    font-size: 0.5rem;
    width: 8px;
    padding: 2px;
    cursor: pointer;
    position: absolute;
    left: -9px;
    top: 6px;
    opacity: 0.7;
    filter: alpha(opacity=70);
  }
  .gjs-layer-caret:hover {
    opacity: 1;
    filter: alpha(opacity=100);
  }
  .gjs-layer-title {
    padding: 3px 10px 5px 30px;
    display: flex;
    align-items: center;
  }
  .gjs-layer-title-inn {
    align-items: center;
    position: relative;
    display: flex;
    width: 100%;
  }
  .gjs-layer__icon {
    display: block;
    width: 100%;
    max-width: 15px;
    max-height: 15px;
    padding-left: 5px;
  }
  .gjs-layer__icon svg {
    fill: currentColor;
  }
  .gjs-layer-name {
    padding: 5px 0;
    display: inline-block;
    box-sizing: content-box;
    overflow: hidden;
    white-space: nowrap;
    margin: 0 30px 0 5px;
  }
  .gjs-layer-name--no-edit {
    text-overflow: ellipsis;
  }
  .gjs-layer > .gjs-layer-children {
    display: none;
  }
  .gjs-layer.open > .gjs-layer-children {
    display: block;
  }
  .gjs-layer-no-chld > .gjs-layer-title-inn > .gjs-layer-caret {
    display: none;
  }
  .gjs-layer-move {
    padding: 7px 10px 7px 5px;
    position: absolute;
    font-size: 12px;
    cursor: move;
    right: 0;
    top: 0;
  }
  .gjs-layer.gjs-hovered .gjs-layer-title {
    background-color: rgba(255, 255, 255, 0.015);
  }
  .gjs-layer.gjs-selected .gjs-layer-title {
    background-color: rgba(255, 255, 255, 0.1);
  }
  .gjs-layers {
    position: relative;
    height: 100%;
  }
  .gjs-layers #gjs-placeholder {
    width: 100%;
    position: absolute;
  }
  .gjs-layers #gjs-placeholder #gjs-plh-int {
    height: 100%;
    padding: 1px;
  }
  .gjs-layers #gjs-placeholder #gjs-plh-int.gjs-insert {
    background-color: #62c462;
  }
  #gjs-clm-add-tag,
  .gjs-clm-tags-btn {
    background-color: rgba(255, 255, 255, 0.15);
    border-radius: 2px;
    padding: 3px;
    margin-right: 3px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    width: 24px;
    height: 24px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .gjs-clm-tags-btn svg {
    fill: currentColor;
    display: block;
  }
  .gjs-clm-header {
    display: flex;
    align-items: center;
    margin: 7px 0;
  }
  .gjs-clm-header-status {
    flex-shrink: 1;
    margin-left: auto;
  }
  .gjs-clm-tag {
    display: flex;
    overflow: hidden;
    align-items: center;
    border-radius: 3px;
    margin: 0 3px 3px 0;
    padding: 5px;
    cursor: default;
  }
  .gjs-clm-tag-status,
  .gjs-clm-tag-close {
    width: 12px;
    height: 12px;
    flex-shrink: 1;
  }
  .gjs-clm-tag-status svg,
  .gjs-clm-tag-close svg {
    vertical-align: middle;
    fill: currentColor;
  }
  .gjs-clm-sels-info {
    margin: 7px 0;
  }
  .gjs-clm-sel-id {
    font-size: 0.9em;
    opacity: 0.5;
    filter: alpha(opacity=50);
  }
  .gjs-clm-label-sel {
    float: left;
    padding-right: 5px;
  }
  .gjs-clm-tags {
    font-size: 0.75rem;
    padding: 10px 5px;
  }
  .gjs-clm-tags #gjs-clm-sel {
    padding: 7px 0;
    float: left;
  }
  .gjs-clm-tags #gjs-clm-sel {
    font-style: italic;
    margin-left: 5px;
  }
  .gjs-clm-tags #gjs-clm-tags-field {
    clear: both;
    padding: 5px;
    margin-bottom: 5px;
    display: flex;
    flex-wrap: wrap;
  }
  .gjs-clm-tags #gjs-clm-tags-c {
    display: flex;
    flex-wrap: wrap;
    vertical-align: top;
    overflow: hidden;
  }
  .gjs-clm-tags #gjs-clm-new {
    color: #ddd;
    padding: 5px 6px;
    display: none;
  }
  .gjs-clm-tags #gjs-clm-close {
    opacity: 0.85;
    filter: alpha(opacity=85);
    font-size: 20px;
    line-height: 0;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.9);
  }
  .gjs-clm-tags #gjs-clm-close:hover {
    opacity: 1;
    filter: alpha(opacity=100);
  }
  .gjs-clm-tags #gjs-clm-checkbox {
    color: rgba(255, 255, 255, 0.9);
    vertical-align: middle;
    cursor: pointer;
    font-size: 9px;
  }
  .gjs-clm-tags #gjs-clm-tag-label {
    flex-grow: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 0 3px;
    cursor: text;
  }
  .gjs-mdl-container {
    font-family: Helvetica, sans-serif;
    overflow-y: auto;
    position: fixed;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
  }
  .gjs-mdl-dialog {
    text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.05);
    animation: gjs-slide-down 0.215s;
    margin: auto;
    max-width: 850px;
    width: 90%;
    border-radius: 3px;
    font-weight: lighter;
    position: relative;
    z-index: 2;
  }
  .gjs-mdl-title {
    font-size: 1rem;
  }
  .gjs-mdl-btn-close {
    position: absolute;
    right: 15px;
    top: 5px;
  }
  .gjs-mdl-active .gjs-mdl-dialog {
    animation: gjs-mdl-slide-down 0.216s;
  }
  .gjs-mdl-header,
  .gjs-mdl-content {
    padding: 10px 15px;
    clear: both;
  }
  .gjs-mdl-header {
    position: relative;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding: 15px 15px 7px;
  }
  .gjs-export-dl::after {
    content: "";
    clear: both;
    display: block;
    margin-bottom: 10px;
  }
  .gjs-dropzone {
    display: none;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 11;
    width: 100%;
    height: 100%;
    transition: opacity 0.25s;
    pointer-events: none;
  }
  .gjs-dropzone-active .gjs-dropzone {
    display: block;
    opacity: 1;
  }
  .gjs-am-assets {
    height: 290px;
    overflow: auto;
    clear: both;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
  }
  .gjs-am-assets-header {
    padding: 5px;
  }
  .gjs-am-add-asset .gjs-am-add-field {
    width: 70%;
    float: left;
  }
  .gjs-am-add-asset button {
    width: 25%;
    float: right;
  }
  .gjs-am-preview-cont {
    position: relative;
    height: 70px;
    width: 30%;
    background-color: #444;
    border-radius: 2px;
    float: left;
    overflow: hidden;
  }
  .gjs-am-preview {
    position: absolute;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    height: 100%;
    width: 100%;
    z-index: 1;
  }
  .gjs-am-preview-bg {
    opacity: 0.5;
    filter: alpha(opacity=50);
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 0;
  }
  .gjs-am-dimensions {
    opacity: 0.5;
    filter: alpha(opacity=50);
    font-size: 10px;
  }
  .gjs-am-meta {
    width: 70%;
    float: left;
    font-size: 12px;
    padding: 5px 0 0 5px;
    box-sizing: border-box;
  }
  .gjs-am-meta > div {
    margin-bottom: 5px;
  }
  .gjs-am-close {
    cursor: pointer;
    position: absolute;
    right: 5px;
    top: 0;
    display: none;
  }
  .gjs-am-asset {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding: 5px;
    cursor: pointer;
    position: relative;
    box-sizing: border-box;
    width: 100%;
  }
  .gjs-am-asset:hover .gjs-am-close {
    display: block;
  }
  .gjs-am-highlight {
    background-color: rgba(255, 255, 255, 0.1);
  }
  .gjs-am-assets-cont {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    box-sizing: border-box;
    padding: 10px;
    width: 45%;
    float: right;
    height: 325px;
    overflow: hidden;
  }
  .gjs-am-file-uploader {
    width: 55%;
    float: left;
  }
  .gjs-am-file-uploader > form {
    background-color: rgba(0, 0, 0, 0.1);
    border: 2px dashed;
    border-radius: 3px;
    position: relative;
    text-align: center;
    margin-bottom: 15px;
  }
  .gjs-am-file-uploader > form.gjs-am-hover {
    border: 2px solid #62c462;
    color: #75cb75;
  }
  .gjs-am-file-uploader > form.gjs-am-disabled {
    border-color: red;
  }
  .gjs-am-file-uploader > form #gjs-am-uploadFile {
    opacity: 0;
    filter: alpha(opacity=0);
    padding: 150px 10px;
    width: 100%;
    box-sizing: border-box;
  }
  .gjs-am-file-uploader #gjs-am-title {
    position: absolute;
    padding: 150px 10px;
    width: 100%;
  }
  .gjs-cm-editor-c {
    float: left;
    box-sizing: border-box;
    width: 50%;
  }
  .gjs-cm-editor-c .CodeMirror {
    height: 450px;
  }
  .gjs-cm-editor {
    font-size: 12px;
  }
  .gjs-cm-editor#gjs-cm-htmlmixed {
    padding-right: 10px;
    border-right: 1px solid rgba(0, 0, 0, 0.2);
  }
  .gjs-cm-editor#gjs-cm-htmlmixed #gjs-cm-title {
    color: #a97d44;
  }
  .gjs-cm-editor#gjs-cm-css {
    padding-left: 10px;
  }
  .gjs-cm-editor#gjs-cm-css #gjs-cm-title {
    color: #ddca7e;
  }
  .gjs-cm-editor #gjs-cm-title {
    background-color: rgba(0, 0, 0, 0.2);
    font-size: 12px;
    padding: 5px 10px 3px;
    text-align: right;
  }
  .gjs-rte-toolbar {
    border: 1px solid rgba(0, 0, 0, 0.2);
    position: absolute;
    border-radius: 3px;
    z-index: 10;
  }
  .gjs-rte-actionbar {
    display: flex;
  }
  .gjs-rte-action {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    min-width: 25px;
    border-right: 1px solid rgba(0, 0, 0, 0.2);
    text-align: center;
    cursor: pointer;
    outline: none;
  }
  .gjs-rte-action:last-child {
    border-right: none;
  }
  .gjs-rte-action:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  .gjs-rte-active {
    background-color: rgba(255, 255, 255, 0.1);
  }
  .gjs-rte-disabled {
    color: rgba(255, 255, 255, 0.1);
    cursor: not-allowed;
  }
  .gjs-rte-disabled:hover {
    background-color: unset;
  }
  .gjs-editor-cont .sp-hue,
  .gjs-editor-cont .sp-slider {
    cursor: row-resize;
  }
  .gjs-editor-cont .sp-color,
  .gjs-editor-cont .sp-dragger {
    cursor: crosshair;
  }
  .gjs-editor-cont .sp-alpha-inner,
  .gjs-editor-cont .sp-alpha-handle {
    cursor: col-resize;
  }
  .gjs-editor-cont .sp-hue {
    left: 90%;
  }
  .gjs-editor-cont .sp-color {
    right: 15%;
  }
  .gjs-editor-cont .sp-container {
    border: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 7px rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  .gjs-editor-cont .sp-picker-container {
    border: none;
  }
  .gjs-editor-cont .colpick_dark .colpick_color {
    outline: 1px solid rgba(0, 0, 0, 0.2);
  }
  .gjs-editor-cont .sp-cancel,
  .gjs-editor-cont .sp-cancel:hover {
    bottom: -8px;
    color: #777 !important;
    font-size: 25px;
    left: 0;
    position: absolute;
    text-decoration: none;
  }
  .gjs-editor-cont .sp-alpha-handle {
    background-color: #ccc;
    border: 1px solid #555;
    width: 4px;
  }
  .gjs-editor-cont .sp-color,
  .gjs-editor-cont .sp-hue {
    border: 1px solid #333;
  }
  .gjs-editor-cont .sp-slider {
    background-color: #ccc;
    border: 1px solid #555;
    height: 3px;
    left: -4px;
    width: 22px;
  }
  .gjs-editor-cont .sp-dragger {
    background: transparent;
    box-shadow: 0 0 0 1px #111;
  }
  .gjs-editor-cont .sp-button-container {
    float: none;
    width: 100%;
    position: relative;
    text-align: right;
  }
  .gjs-editor-cont .sp-container button,
  .gjs-editor-cont .sp-container button:hover,
  .gjs-editor-cont .sp-container button:active {
    background: rgba(0, 0, 0, 0.2);
    border-color: rgba(0, 0, 0, 0.2);
    color: #ddd;
    text-shadow: none;
    box-shadow: none;
    padding: 3px 5px;
  }
  .gjs-editor-cont .sp-palette-container {
    border: none;
    float: none;
    margin: 0;
    padding: 5px 10px 0;
  }
  .gjs-editor-cont .sp-palette .sp-thumb-el,
  .gjs-editor-cont .sp-palette .sp-thumb-el:hover {
    border: 1px solid rgba(0, 0, 0, 0.9);
  }
  .gjs-editor-cont .sp-palette .sp-thumb-el:hover,
  .gjs-editor-cont .sp-palette .sp-thumb-el.sp-thumb-active {
    border-color: rgba(0, 0, 0, 0.9);
  }
  .gjs-hidden {
    display: none;
  }
  @keyframes gjs-slide-down {
    0% {
      transform: translate(0, -3rem);
      opacity: 0;
    }
    100% {
      transform: translate(0, 0);
      opacity: 1;
    }
  }
  @keyframes gjs-slide-up {
    0% {
      transform: translate(0, 0);
      opacity: 1;
    }
    100% {
      transform: translate(0, -3rem);
      opacity: 0;
    }
  }
  .cm-s-hopscotch span.cm-error {
    color: #fff;
  }

  /* Basic style of GrapesJS-newsletter */
  /* Class names prefixes */
  /* Colors / Theme */
  .gjs-clm-tags .gjs-sm-title,
  .gjs-sm-sector .gjs-sm-title {
    border-top: none;
  }

  .gjs-clm-tags .gjs-clm-tag {
    background-color: #4c9790;
    border: none;
    box-shadow: none;
    padding: 5px 8px;
    text-shadow: none;
  }

  .gjs-field {
    background-color: rgba(0, 0, 0, 0.15);
    box-shadow: none;
  }

  .gjs-btnt.gjs-pn-active,
  .gjs-pn-btn.gjs-pn-active {
    box-shadow: none;
  }

  .gjs-pn-btn:hover {
    color: rgba(255, 255, 255, 0.75);
  }

  .gjs-btnt.gjs-pn-active,
  .gjs-color-active,
  .gjs-pn-btn.gjs-pn-active,
  .gjs-pn-btn:active,
  .gjs-block:hover {
    color: #35d7bb;
  }

  #gjs-rte-toolbar .gjs-rte-btn,
  .gjs-btn-prim,
  .gjs-btnt,
  .gjs-clm-tags .gjs-sm-composite.gjs-clm-field,
  .gjs-clm-tags .gjs-sm-field.gjs-sm-composite,
  .gjs-clm-tags .gjs-sm-stack #gjs-sm-add,
  .gjs-color-main,
  .gjs-mdl-dialog,
  .gjs-off-prv,
  .gjs-pn-btn,
  .gjs-pn-panel,
  .gjs-sm-sector .gjs-sm-composite.gjs-clm-field,
  .gjs-sm-sector .gjs-sm-field.gjs-sm-composite,
  .gjs-sm-sector .gjs-sm-stack #gjs-sm-add {
    color: #a0aabf;
  }

  #gjs-rte-toolbar,
  .gjs-bg-main,
  .gjs-clm-select option,
  .gjs-clm-tags .gjs-sm-colorp-c,
  .gjs-editor,
  .gjs-mdl-dialog,
  .gjs-nv-item .gjs-nv-title-c,
  .gjs-off-prv,
  .gjs-pn-panel,
  .gjs-block,
  .gjs-select option,
  .gjs-sm-sector .gjs-sm-colorp-c,
  .gjs-sm-select option,
  .gjs-sm-unit option,
  .sp-container {
    background-color: #373d49;
  }

  .gjs-import-label,
  .gjs-export-label {
    margin-bottom: 10px;
    font-size: 13px;
  }

  .gjs-mdl-dialog .gjs-btn-import {
    margin-top: 10px;
  }

  .CodeMirror {
    border-radius: 3px;
    height: 450px;
    font-family: sans-serif, monospace;
    letter-spacing: 0.3px;
    font-size: 12px;
  }

  /* Extra */
  .gjs-block {
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    margin: 10px 2.5% 5px;
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.15);
    transition: box-shadow, color 0.2s ease 0s;
  }

  .gjs-block:hover {
    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.15);
  }

  #gjs-pn-views-container.gjs-pn-panel {
    padding: 39px 0 0;
  }

  #gjs-pn-views.gjs-pn-panel {
    padding: 0;
    border: none;
  }

  #gjs-pn-views .gjs-pn-btn {
    margin: 0;
    height: 40px;
    padding: 10px;
    width: 25%;
    border-bottom: 2px solid rgba(0, 0, 0, 0.3);
  }

  #gjs-pn-views .gjs-pn-active {
    color: rgba(255, 255, 255, 0.9);
    border-bottom: 2px solid #35d7bb;
    border-radius: 0;
  }

  #gjs-pn-devices-c {
    padding-left: 30px;
  }

  #gjs-pn-options {
    padding-right: 30px;
  }

  .gjs-sm-composite .gjs-sm-properties {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }

  #gjs-sm-border-top-left-radius,
  #gjs-sm-border-top-right-radius,
  #gjs-sm-border-bottom-left-radius,
  #gjs-sm-border-bottom-right-radius,
  #gjs-sm-margin-top,
  #gjs-sm-margin-bottom,
  #gjs-sm-margin-right,
  #gjs-sm-margin-left,
  #gjs-sm-padding-top,
  #gjs-sm-padding-bottom,
  #gjs-sm-padding-right,
  #gjs-sm-padding-left {
    flex: 999 1 60px;
  }

  #gjs-sm-border-width,
  #gjs-sm-border-style,
  #gjs-sm-border-color {
    flex: 999 1 80px;
  }

  #gjs-sm-margin-left,
  #gjs-sm-padding-left {
    order: 2;
  }

  #gjs-sm-margin-right,
  #gjs-sm-padding-right {
    order: 3;
  }

  #gjs-sm-margin-bottom,
  #gjs-sm-padding-bottom {
    order: 4;
  }

  .gjs-field-radio {
    width: 100%;
  }

  .gjs-field-radio #gjs-sm-input-holder {
    display: flex;
  }

  .gjs-radio-item {
    flex: 1 0 auto;
    text-align: center;
  }

  .gjs-sm-sector .gjs-sm-property.gjs-sm-list {
    width: 50%;
  }

  .gjs-mdl-content {
    border-top: none;
  }

  .gjs-sm-sector .gjs-sm-property .gjs-sm-layer.gjs-sm-active {
    background-color: rgba(255, 255, 255, 0.09);
  }

  /*

#gjs-pn-views-container,
#gjs-pn-views{
  min-width: 270px;
}
*/
  .gjs-f-button::before {
    content: "B";
  }

  .gjs-f-divider::before {
    content: "D";
  }

  .gjs-mdl-dialog-sm {
    width: 300px;
  }

  .gjs-mdl-dialog form .gjs-sm-property {
    font-size: 12px;
    margin-bottom: 15px;
  }

  .gjs-mdl-dialog form .gjs-sm-label {
    margin-bottom: 5px;
  }

  #gjs-clm-status-c {
    display: none;
  }

  .anim-spin {
    animation: 0.5s linear 0s normal none infinite running spin;
  }

  .form-status {
    float: right;
    font-size: 14px;
  }

  .text-danger {
    color: #f92929;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
