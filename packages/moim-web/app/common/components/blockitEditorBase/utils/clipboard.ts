import Quill, { RangeStatic } from "quill";
import Delta from "quill-delta";
const { overload } = require("quill/core/quill");
import { addLinkPreviewLoader } from "app/common/components/richEditor/utils/linkpreview";
import parser from "common/helpers/moimDown/tokenizer";
import convertHTML from "./convertHTML";
import {
  getGlobalUrlMatches,
  getSingleUrlMatches,
  pasteAutoLinkify,
} from "./link";

const Clipboard = Quill.import("modules/clipboard");

function matchElement(_: Node, delta: Delta) {
  return delta.compose(
    new Delta().retain(delta.length(), {
      header: false,
      color: false,
      size: false,
      background: false,
      strike: false,
    }),
  );
}

function textElement(node: Node, _: Delta) {
  const text = node.nodeValue ?? "";
  const isLinkPaste = Boolean(getGlobalUrlMatches(text));
  const newDelta = new Delta();

  parser(text).forEach(token => {
    switch (token.type) {
      case "emoji": {
        if (!isLinkPaste) {
          newDelta.push({
            insert: {
              emoji: {
                colons: token.data.value,
              },
            },
          });
          break;
        }
      }

      default: {
        const value = (token.data as any).value;
        if (value) {
          newDelta.push({ insert: value });
        }
        break;
      }
    }
  });
  return newDelta;
}

function imageElement() {
  return new Delta(); // Note: for ignoring
}

class PlainClipboard extends Clipboard {
  private constructor(quill: Quill, config: any) {
    super(quill, config);
    this.addMatcher(Node.TEXT_NODE, textElement);
    this.addMatcher(Node.ELEMENT_NODE, matchElement);
    this.addMatcher("img", imageElement);
  }

  // NOTE: hard copy from Quill.js modules/clipboard
  public onCapturePaste(e: React.ClipboardEvent) {
    if (e.defaultPrevented || !this.quill.isEnabled()) return;
    e.preventDefault();
    const range: RangeStatic | undefined | null = this.quill.getSelection(true);
    if (range === null || range === undefined) return;
    const html = e.clipboardData.getData("text/html");
    const text =
      e.clipboardData.getData("text/plain") ||
      e.clipboardData.getData("text/uri-list");
    const files = Array.from(e.clipboardData.files || []);
    if (!html && files.length > 0) {
      this.quill.uploader.customUploader(files).then(() => {
        this.quill.setSelection(range.index + 1, "silent");
        this.quill.scrollIntoView();
      });
    } else {
      this.onPaste(range, { html, text });
    }
  }

  public onPaste(
    range: RangeStatic,
    { text, html }: { text: string; html?: any },
  ) {
    let delta = new Delta();
    let addLinkPreview = "";
    const alreadyLinkBlot = this.quill.getFormat(range).hasOwnProperty("link");
    const matches = getGlobalUrlMatches(text);
    const singleUrlMatches = getSingleUrlMatches(text);

    if (matches && Boolean(matches.length)) {
      delta.retain(range.index).delete(range.length);
      if (
        !alreadyLinkBlot &&
        range.length &&
        singleUrlMatches &&
        Boolean(singleUrlMatches.length)
      ) {
        const targetText = this.quill.getText(range.index, range.length);
        delta.insert(targetText, {
          link: {
            link: singleUrlMatches[0],
            needLinkPreview: false,
            hasLinkPreview: false,
          },
        });
      } else {
        if (Boolean(html)) {
          delta = this.regularPasteLogic(range, { text, html });
        } else {
          delta = pasteAutoLinkify(text, delta);
          addLinkPreview = text;
        }
      }
    } else {
      delta = this.regularPasteLogic(range, { text, html });
    }

    if (delta.ops[0].insert === "\n") {
      const tmpOps = delta.ops;
      tmpOps.shift();
      delta = new Delta(tmpOps);
    }
    if (delta.ops[delta.ops.length - 1].insert === "\n") {
      const tmpOps = delta.ops;
      tmpOps.pop();
      delta = new Delta(tmpOps);
    }

    this.quill.updateContents(delta, "api");
    this.quill.setSelection(delta.length() - range.length, "silent");
    if (Boolean(addLinkPreview)) {
      addLinkPreviewLoader(this.quill, addLinkPreview);
    }
    this.quill.scrollIntoView();
  }

  public onCopy(range: RangeStatic) {
    const text = this.quill.getText(range);
    const [index, length] = overload(range);
    const html = this.getHTML(index, length);

    return { html, text };
  }

  private regularPasteLogic(
    range: RangeStatic,
    { text, html }: { text: string; html?: any },
  ) {
    const formats = this.quill.getFormat(range.index);
    const pastedDelta = this.convert({ text, html }, formats);

    return new Delta()
      .retain(range.index)
      .delete(range.length)
      .concat(pastedDelta);
  }

  private getHTML(index: number, length: number) {
    const [line, lineOffset]: [any, number] = this.quill.scroll.line(index);

    if (line.length() >= lineOffset + length) {
      return convertHTML(line, lineOffset, length, true);
    }
    return convertHTML(this.quill.scroll, index, length, true);
  }
}

export default PlainClipboard;
