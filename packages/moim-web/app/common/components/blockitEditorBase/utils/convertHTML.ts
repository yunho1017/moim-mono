const { convertListHTML } = require("quill/core/editor");
const { escapeText } = require("quill/blots/text");

// NOTE: This function hard copied from https://github.com/quilljs/quill/blob/9cf0285caa6514356a7bba9db132ec7229eb254c/core/editor.js#L269
// just is added emoji check.
export default function convertHTML(
  blot: any,
  index: number,
  length: number,
  isRoot: boolean = false,
) {
  if (typeof blot.html === "function") {
    return blot.html(index, length);
  }
  if (blot.statics.blotName === "text") {
    return escapeText(blot.value().slice(index, index + length));
  }

  if (blot.statics.blotName === "emoji") {
    return blot.data.colons ?? blot.data.native;
  }

  if (blot.children) {
    // TODO fix API
    if (blot.statics.blotName === "list-container") {
      const items: any[] = [];
      blot.children.forEachAt(
        index,
        length,
        (child: any, offset: number, childLength: number) => {
          const formats = child.formats();
          items.push({
            child,
            offset,
            length: childLength,
            indent: formats.indent || 0,
            type: formats.list,
          });
        },
      );
      return convertListHTML(items, -1, []);
    }

    const parts: any[] = [];
    blot.children.forEachAt(
      index,
      length,
      (child: any, offset: number, childLength: number) => {
        parts.push(convertHTML(child, offset, childLength));
      },
    );
    if (isRoot || blot.statics.blotName === "list") {
      return parts.join("");
    }
    const { outerHTML, innerHTML } = blot.domNode;
    const [start, end] = outerHTML.split(`>${innerHTML}<`);
    // TODO cleanup
    if (start === "<table") {
      return `<table style="border: 1px solid #000;">${parts.join("")}<${end}`;
    }
    return `${start}>${parts.join("")}<${end}`;
  }
  return blot.domNode.outerHTML;
}
