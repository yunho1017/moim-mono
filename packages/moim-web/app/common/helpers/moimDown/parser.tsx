import {
  SERVER_SPEC_MENTION,
  RENDER_SPEC_MENTION,
  HIGHLIGHTED_TEXT_REGEX,
  COMMON_REGEX,
} from "./regexp";

export interface IMention {
  origin: string;
  type: string;
  id: string;
}

export interface IHighlightedText {
  origin: string;
  type: string;
  text: string;
  length: number;
}

export function parseServerSpecMention(text: string) {
  const mentions: IMention[] = [];
  let match;
  do {
    if (match) {
      const [origin, type, id] = match;
      const newMentionObject: IMention = {
        origin,
        type,
        id,
      };
      mentions.push(newMentionObject);
    }
    match = SERVER_SPEC_MENTION.exec(text);
  } while (match !== null);

  return mentions;
}

export function parseRenderSpecMention(text: string) {
  const mentions: IMention[] = [];
  let match;
  do {
    if (match) {
      const [origin, type, id] = match;
      const newMentionObject: IMention = {
        origin,
        type,
        id,
      };
      mentions.push(newMentionObject);
    }
    match = RENDER_SPEC_MENTION.exec(text);
  } while (match !== null);

  return mentions;
}

export function parseServerSpecHighlight(text: string) {
  const highlightedTexts: IHighlightedText[] = [];
  let match;
  do {
    if (match) {
      const [origin, type, highlightedText] = match;
      const newHighlightedTextObject: IHighlightedText = {
        origin,
        type,
        text: highlightedText,
        length: origin.length,
      };
      highlightedTexts.push(newHighlightedTextObject);
    }
    match = HIGHLIGHTED_TEXT_REGEX.exec(text);
  } while (match !== null);

  return highlightedTexts;
}

export function parseCommonFormat(text: string) {
  const result: {
    type: string;
    value: string;
    fallback: string;
    origin: string;
  }[] = [];
  let match;
  do {
    if (match) {
      const [origin, type, value, fallback] = match;

      result.push({ origin, type, value, fallback });
    }
    match = COMMON_REGEX.exec(text);
  } while (match !== null);

  return result;
}
