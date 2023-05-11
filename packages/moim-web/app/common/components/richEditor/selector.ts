import { IMention, IMappedMention } from "common/helpers/moimDown";

export const selectMentionWithEntities = (
  userEntities: Moim.User.INormalizedData,
  mentions: IMention[],
): IMappedMention[] =>
  mentions.map(data => {
    const mentionItem = data.id.split("|");

    return {
      ...data,
      id: mentionItem[0],
      display: userEntities[mentionItem[0]]?.name ?? mentionItem[0],
      fallback: mentionItem[1],
    };
  });
