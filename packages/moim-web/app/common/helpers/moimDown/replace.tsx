import { IMention, parseServerSpecMention } from ".";
import escapeRegExp from "common/helpers/escapeRegexp";
import { createSelector } from "reselect";

export interface IMappedMention extends IMention {
  display: string;
  fallback?: string;
}

export const serverSpecMentionReplace = (
  originalText: string,
  mentions: IMappedMention[],
) => {
  let newText = originalText;
  mentions.forEach(mention => {
    let replacedText = `<${mention.type}${mention.id}>`;

    if (mention.fallback && mention.display) {
      replacedText = `<${mention.type}${mention.id}|${mention.fallback}:${mention.display}>`;
    } else if (mention.fallback && !mention.display) {
      replacedText = `<${mention.type}${mention.id}|${mention.fallback}:${mention.fallback}>`;
    } else if (!mention.fallback && mention.display) {
      replacedText = `<${mention.type}${mention.id}:${mention.display}>`;
    }

    newText = newText.replace(
      new RegExp(escapeRegExp(mention.origin), "g"),
      replacedText,
    );
  });

  return newText;
};

export const serverSpecMentionReplaceSelector = createSelector(
  (state: Moim.User.INormalizedData) => state,
  (_: Moim.User.INormalizedData, originalText: string) => originalText,
  (_: Moim.User.INormalizedData, originalText: string) =>
    parseServerSpecMention(originalText),
  (users, originalText, mentions) => {
    let renderSpecMentionText = originalText;
    mentions.forEach(data => {
      const mentionItem = data.id.split("|");

      const mention = {
        ...data,
        id: mentionItem[0],
        display: users[mentionItem[0]]?.name || "",
        fallback: mentionItem[1],
      };
      let replacedText = `<${mention.type}${mention.id}>`;

      if (mention.fallback && mention.display) {
        replacedText = `<${mention.type}${mention.id}|${mention.fallback}:${mention.display}>`;
      } else if (mention.fallback && !mention.display) {
        replacedText = `<${mention.type}${mention.id}|${mention.fallback}:${mention.fallback}>`;
      } else if (!mention.fallback && mention.display) {
        replacedText = `<${mention.type}${mention.id}:${mention.display}>`;
      }

      renderSpecMentionText = renderSpecMentionText.replace(
        new RegExp(escapeRegExp(mention.origin), "g"),
        replacedText,
      );
    });

    return renderSpecMentionText;
  },
);

export const renderSpecMentionReplace = (
  originalText: string,
  mentions: IMention[],
) => {
  let newText = originalText;
  mentions.forEach(mention => {
    newText = newText.replace(
      new RegExp(mention.origin, "g"),
      `<${mention.type}${mention.id}>`,
    );
  });

  return newText;
};

export const displayMention = (
  originalText: string,
  mentions: IMappedMention[],
) => {
  let newText = originalText;
  mentions.forEach(mention => {
    newText = newText.replace(
      new RegExp(mention.origin, "g"),
      mention.display ? `${mention.type}${mention.display}` : "",
    );
  });

  return newText;
};
