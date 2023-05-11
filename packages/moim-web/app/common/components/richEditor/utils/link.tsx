import Quill, { RangeStatic } from "quill";
import Delta from "quill-delta";
import { addLinkPreviewLoader } from "app/common/components/richEditor/utils/linkpreview";

const REGEXP_GLOBAL_URL = /https?:\/\/[^\s]+/g;
const REGEXP_ONLY_URL = /^https?:\/\/[^\s]+$/g;
export const REGEXP_WITH_PRECEDING_WS = /(?:\s|^)(https?:\/\/[^\s]+)/;

export function insertLink(
  quill: Quill | null | undefined,
  dialogMessage: string,
  storedRange?: RangeStatic,
) {
  if (!quill) return;
  let result = window.prompt(dialogMessage);
  const range = quill.getSelection() || storedRange || { index: 0, length: 0 };
  const isCollapse = Boolean(range?.length);
  const isSingleLine = (quill as any).options.isSingleLine;

  if (result && !/^https?:\/\/[^\s]+/.test(result)) {
    result = `http://${result}`;
  }

  if (result) {
    if (isCollapse) {
      quill.format(
        "link",
        {
          link: result,
          needLinkPreview: false,
          hasLinkPreview: false,
        },
        "user",
      );
      quill.setSelection(range, "silent");
    } else {
      quill.insertText(range?.index || 0, result, "link", {
        link: result,
        needLinkPreview: true,
        hasLinkPreview: false,
      });
      const next = (range?.index || 0) + result.length;
      quill.setSelection(next, 0, "silent");

      if (!isSingleLine) {
        addLinkPreviewLoader(quill, result);
      }
    }
  }
}

const sliceFromLastWhitespace = (str: string) => {
  const whitespaceI = str.lastIndexOf(" ");
  const sliceI = whitespaceI === -1 ? 0 : whitespaceI + 1;
  return str.slice(sliceI);
};

export const linkify = (quill: Quill, range: RangeStatic, context: any) => {
  if (!context.format.link) {
    const url = sliceFromLastWhitespace(context.prefix);
    const retain = range.index - url.length;
    const ops: any[] = retain ? [{ retain }] : [];
    const isSingleLine = (quill as any).options.isSingleLine;

    ops.push(
      { delete: url.length },
      {
        insert: url,
        attributes: {
          link: { link: url, needLinkPreview: true, hasLinkPreview: false },
        },
      },
    );
    quill.updateContents(new Delta(ops));
    if (!isSingleLine) {
      addLinkPreviewLoader(quill, url);
    }
  }
};

export const getGlobalUrlMatches = (text: string) => {
  const matches = text.match(REGEXP_GLOBAL_URL);
  return matches;
};

export const getSingleUrlMatches = (text: string) => {
  const matches = text.match(REGEXP_ONLY_URL);
  return matches;
};

export const pasteAutoLinkify = (text: string, delta: Delta) => {
  const matches = getGlobalUrlMatches(text);

  if (matches && matches.length > 0) {
    let str: string = text;
    matches.forEach((match: string) => {
      const split = str.split(match);
      const beforeLink = split.shift();
      if (beforeLink) {
        delta.insert(beforeLink);
      }
      delta.insert(match, {
        link: { link: match, needLinkPreview: true, hasLinkPreview: false },
      });
      str = split.join(match);
    });
    if (str) {
      delta.insert(str);
    }
  }

  return delta;
};
