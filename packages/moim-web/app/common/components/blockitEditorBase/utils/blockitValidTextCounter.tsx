import { parseServerSpecMention } from "common/helpers/moimDown";
import { selectMentionWithEntities } from "common/components/richEditor/selector";
import { serverSpecMentionReplace } from "common/helpers/moimDown/replace";
import tokenizer from "common/helpers/moimDown/tokenizer";

export default function blockitValidTextCounter(
  blockit: Moim.Blockit.Blocks[],
  userEntities: Moim.User.INormalizedData,
  userBatchCallback: (args: any) => void,
): number {
  let count = 0;

  blockit.forEach(content => {
    if (content.type === "text") {
      const mentions = parseServerSpecMention(content.content);
      const mappedMentionData = selectMentionWithEntities(
        userEntities,
        mentions,
      );
      const batchQueue = mappedMentionData
        .filter(item => item.id === item.display)
        .map(item => item.id);

      if (batchQueue.length) {
        userBatchCallback({
          users: batchQueue,
        });
      }
      const renderSpecMentionText = serverSpecMentionReplace(
        content.content,
        mappedMentionData,
      );

      tokenizer(renderSpecMentionText).forEach(token => {
        switch (token.type) {
          case "codeBlock":
          case "inlineCode":
          case "bold":
          case "italic":
          case "text": {
            const value = token.data.value
              .replace(/&gt;/g, ">")
              .replace(/&lt;/g, "<")
              .replace(/&#42;/g, "*")
              .replace(/&#95;/g, "_");
            count += value.length;
            break;
          }

          case "mark":
          case "link": {
            count += token.data.value.length;
            break;
          }

          case "emoji":
          case "nativeEmoji": {
            count += 1;
            break;
          }

          case "mention": {
            count += (token.data.display ?? token.data.fallback).length;
            break;
          }
        }
      });
    } else {
      count++;
    }
  });
  return count;
}
