//
// 이 모듈의 코드는 https://github.com/quilljs/quill/blob/develop/modules/keyboard.js 의 constructor, listen코드를 복사했고,
// passPreventDefault 라는 플래그를 이용해서 constructor 단계에서 넣어둔 handler를 실행하지 못하도록 막아뒀습니다.
// 이 작업은 ios에서 한글+(엔터|Backspace) 조합에서 발생한 문제를 해소하기 위해 적용했습니다.
// Ref issue: https://github.com/quilljs/quill/issues/3036
//

import Quill, { StringMap } from "quill";
import isEqual from "lodash/isEqual";
import { isiOS } from "common/helpers/browserDetect";

const KeyboardModule = Quill.import("modules/keyboard");
const TextBlot = Quill.import("blots/text");

export default class MoimKeyboardModule extends KeyboardModule {
  public constructor(quill: Quill, options: StringMap) {
    super(quill, options);
    this.bindings = {};
    const passPreventDefault = isiOS();
    Object.keys(this.options.bindings).forEach(name => {
      if (this.options.bindings[name]) {
        this.addBinding(this.options.bindings[name]);
      }
    });
    this.addBinding(
      { key: "Enter", shiftKey: null, passPreventDefault },
      this.handleEnter,
    );
    this.addBinding(
      {
        key: "Enter",
        metaKey: null,
        ctrlKey: null,
        altKey: null,
        passPreventDefault,
      },
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      () => {},
    );
    if (/Firefox/i.test(navigator.userAgent)) {
      // Need to handle delete and backspace for Firefox in the general case #1171
      this.addBinding(
        { key: "Backspace" },
        { collapsed: true, passPreventDefault },
        this.handleBackspace,
      );
      this.addBinding(
        { key: "Delete" },
        { collapsed: true, passPreventDefault },
        this.handleDelete,
      );
    } else {
      this.addBinding(
        { key: "Backspace" },
        { collapsed: true, prefix: /^.?$/ },
        this.handleBackspace,
      );
      this.addBinding(
        { key: "Delete" },
        { collapsed: true, suffix: /^.?$/ },
        this.handleDelete,
      );
    }
    this.addBinding(
      { key: "Backspace" },
      { collapsed: false },
      this.handleDeleteRange,
    );
    this.addBinding(
      { key: "Delete" },
      { collapsed: false },
      this.handleDeleteRange,
    );
    this.addBinding(
      {
        key: "Backspace",
        altKey: null,
        ctrlKey: null,
        metaKey: null,
        shiftKey: null,
      },
      { collapsed: true, offset: 0 },
      this.handleBackspace,
    );
    this.listen();
  }

  public listen() {
    this.quill.root.addEventListener("keydown", (evt: KeyboardEvent) => {
      if (evt.defaultPrevented || evt.isComposing) return;
      const bindings: any[] = (this.bindings[evt.key] || []).concat(
        this.bindings[evt.which] || [],
      );
      const matches = bindings.filter(binding =>
        MoimKeyboardModule.match(evt, binding),
      );
      if (matches.length === 0) return;
      const range = this.quill.getSelection();
      if (isNullOrUndefined(range) || !this.quill.hasFocus()) return;
      const [line, offset] = this.quill.getLine(range.index);
      const [leafStart, offsetStart] = this.quill.getLeaf(range.index);
      const [leafEnd, offsetEnd] =
        range.length === 0
          ? [leafStart, offsetStart]
          : // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
            this.quill.getLeaf(range.index + range.length);
      const prefixText =
        leafStart instanceof TextBlot
          ? leafStart.value().slice(0, offsetStart)
          : "";
      const suffixText =
        leafEnd instanceof TextBlot ? leafEnd.value().slice(offsetEnd) : "";
      const curContext = {
        collapsed: range.length === 0,
        empty: range.length === 0 && line.length() <= 1,
        format: this.quill.getFormat(range),
        line,
        offset,
        prefix: prefixText,
        suffix: suffixText,
        event: evt,
      };
      const prevented = matches.some(binding => {
        if (
          !isNullOrUndefined(binding.collapsed) &&
          binding.collapsed !== curContext.collapsed
        ) {
          return false;
        }
        if (
          !isNullOrUndefined(binding.empty) &&
          binding.empty !== curContext.empty
        ) {
          return false;
        }
        if (
          !isNullOrUndefined(binding.offset) &&
          binding.offset !== curContext.offset
        ) {
          return false;
        }
        if (Array.isArray(binding.format)) {
          if (
            binding.format.every((name: string) =>
              isNullOrUndefined(curContext.format[name]),
            )
          ) {
            return false;
          }
        } else if (typeof binding.format === "object") {
          if (
            !Object.keys(binding.format).every(name => {
              if (binding.format[name] === true) {
                return !isNullOrUndefined(curContext.format[name]);
              }
              if (binding.format[name] === false) {
                return isNullOrUndefined(curContext.format[name]);
              }
              return isEqual(binding.format[name], curContext.format[name]);
            })
          ) {
            return false;
          }
        }
        if (
          !isNullOrUndefined(binding.prefix) &&
          !binding.prefix.test(curContext.prefix)
        ) {
          return false;
        }
        if (
          !isNullOrUndefined(binding.suffix) &&
          !binding.suffix.test(curContext.suffix)
        ) {
          return false;
        }

        return (
          !binding.passPreventDefault &&
          binding.handler.call(this, range, curContext, binding) !== true
        );
      });

      if (prevented) {
        evt.preventDefault();
      }
    });
  }
}

MoimKeyboardModule.DEFAULTS = {
  bindings: {
    bold: KeyboardModule.DEFAULTS.bindings.bold,
    italic: KeyboardModule.DEFAULTS.bindings.italic,
    "remove tab": KeyboardModule.DEFAULTS.bindings["remove tab"],
    tab: KeyboardModule.DEFAULTS.bindings.tab,
    "embed left": KeyboardModule.DEFAULTS.bindings["embed left"],
    "embed left shift": KeyboardModule.DEFAULTS.bindings["embed left shift"],
    "embed right": KeyboardModule.DEFAULTS.bindings["embed right"],
    "embed right shift": KeyboardModule.DEFAULTS.bindings["embed right shift"],
  },
};

function isNullOrUndefined(obj: any) {
  return obj === null || obj === undefined;
}
