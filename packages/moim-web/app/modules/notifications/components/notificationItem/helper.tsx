import * as React from "react";
import { Emoji } from "emoji-mart";
import { createSelector } from "reselect";

import {
  parseServerSpecMention,
  serverSpecMentionReplace,
} from "common/helpers/moimDown";
import { selectMentionWithEntities } from "common/components/richEditor/selector";
import { regexTokenizer } from "common/helpers/moimDown/tokenizer";
import { userSelector } from "app/selectors/user";

import { IAppState } from "app/rootReducer";

import { HighLightedText, MentionText, LinkText, EmojiWrapper } from "./styled";
import { NativeEmojiSafeText } from "common/components/designSystem/texts";
import { serverSpecMentionReplaceSelector } from "common/helpers/moimDown/replace";

export const displayNotificationBodyWithStyleSelector = createSelector(
  (state: IAppState) => state.entities.users,
  (_: IAppState, originalText: string) => originalText,
  (users, originalText) => {
    const renderSpecMentionText = serverSpecMentionReplaceSelector(
      users,
      originalText,
    );

    return regexTokenizer(renderSpecMentionText).reduce(
      (result, current, index) => {
        const [preview, ...rest] = [...result].reverse();
        const offset = preview.indexOf(current.origin);
        const [prev, nextPreview] = [
          preview.slice(0, offset),
          preview.slice(offset + current.length),
        ];

        if (current.type === "mention") {
          return [
            ...rest.reverse(),
            prev,
            <MentionText
              key={`${current.type}${current.data.display}_${index}`}
            >
              {current.data.display}
            </MentionText>,
            nextPreview,
          ];
        } else if (current.type === "link") {
          return [
            ...rest.reverse(),
            prev,
            <LinkText key={`${current.type}${current.data.href}_${index}`}>
              {current.data.href}
            </LinkText>,
            nextPreview,
          ];
        } else if (current.type === "emoji") {
          return [
            ...rest.reverse(),
            prev,
            <EmojiWrapper>
              <Emoji
                native={true}
                emoji={current.data.value}
                size={16}
                key={`${current.type}${current.data.value}_${index}`}
              />
            </EmojiWrapper>,
            nextPreview,
          ];
        } else if (current.type === "nativeEmoji") {
          return [
            ...rest.reverse(),
            prev,
            <NativeEmojiSafeText value={current.data.value} />,
            nextPreview,
          ];
        } else if (current.type === "bold" || current.type === "italic") {
          return [...rest.reverse(), prev, current.data.value, nextPreview];
        } else {
          return result;
        }
      },
      [renderSpecMentionText],
    );
  },
);

export const displayNotificationBodyWithStyle = (
  state: IAppState,
  originalText: string,
): React.ReactNode => {
  const mentions = parseServerSpecMention(originalText);
  const mappedMentionData = selectMentionWithEntities(
    state.entities.users,
    mentions,
  );
  const renderSpecMentionText = serverSpecMentionReplace(
    originalText,
    mappedMentionData,
  );

  return regexTokenizer(renderSpecMentionText).reduce(
    (result, current, index) => {
      const [preview, ...rest] = [...result].reverse();
      const offset = preview.indexOf(current.origin);
      const [prev, nextPreview] = [
        preview.slice(0, offset),
        preview.slice(offset + current.length),
      ];

      if (current.type === "mention") {
        const userData = userSelector(state, current.data.id);
        const username =
          userData?.name === current.data.id
            ? current.data.fallback
            : userData?.name;
        return [
          ...rest.reverse(),
          prev,
          <MentionText key={`${current.type}${current.data.display}_${index}`}>
            {username
              ? `${current.data.type === "channel" ? "#" : "@"}${username}`
              : ""}
          </MentionText>,
          nextPreview,
        ];
      } else if (current.type === "link") {
        return [
          ...rest.reverse(),
          prev,
          <LinkText key={`${current.type}${current.data.href}_${index}`}>
            {current.data.href}
          </LinkText>,
          nextPreview,
        ];
      } else if (current.type === "emoji") {
        return [
          ...rest.reverse(),
          prev,
          <EmojiWrapper>
            <Emoji
              native={true}
              emoji={current.data.value}
              size={16}
              key={`${current.type}${current.data.value}_${index}`}
            />
          </EmojiWrapper>,
          nextPreview,
        ];
      } else if (current.type === "nativeEmoji") {
        return [
          ...rest.reverse(),
          prev,
          <NativeEmojiSafeText value={current.data.value} />,
          nextPreview,
        ];
      } else if (current.type === "bold" || current.type === "italic") {
        return [...rest.reverse(), prev, current.data.value, nextPreview];
      } else {
        return result;
      }
    },
    [renderSpecMentionText],
  );
};

export const displayHighlightedTextWithStyle = (
  previewStr: string,
  state: IAppState,
): React.ReactNode => {
  const mentions = parseServerSpecMention(previewStr);
  const mappedMentionData = selectMentionWithEntities(
    state.entities.users,
    mentions,
  );
  const renderSpecMentionText = serverSpecMentionReplace(
    previewStr,
    mappedMentionData,
  );

  return regexTokenizer(renderSpecMentionText).reduce(
    (result, current, index) => {
      const [preview, ...rest] = [...result].reverse();
      const offset = preview.indexOf(current.origin);
      const [prev, nextPreview] = [
        preview.slice(0, offset),
        preview.slice(offset + current.length),
      ];

      if (current.type === "mention") {
        const userData = userSelector(state, current.data.id);
        const username =
          userData?.name === current.data.id
            ? current.data.fallback
            : userData?.name;
        return [
          ...rest.reverse(),
          prev,
          <MentionText key={`${current.type}${current.data.display}_${index}`}>
            {username
              ? `${current.data.type === "channel" ? "#" : "@"}${username}`
              : ""}
          </MentionText>,
          nextPreview,
        ];
      } else if (current.type === "link") {
        return [
          ...rest.reverse(),
          prev,
          <LinkText key={`${current.type}${current.data.href}_${index}`}>
            {current.data.href}
          </LinkText>,
          nextPreview,
        ];
      } else if (current.type === "emoji") {
        return [
          ...rest.reverse(),
          prev,
          <EmojiWrapper>
            <Emoji
              native={true}
              emoji={current.data.value}
              size={16}
              key={`${current.type}${current.data.value}_${index}`}
            />
          </EmojiWrapper>,
          nextPreview,
        ];
      } else if (current.type === "nativeEmoji") {
        return [
          ...rest.reverse(),
          prev,
          <NativeEmojiSafeText value={current.data.value} />,
          nextPreview,
        ];
      } else if (current.type === "bold" || current.type === "italic") {
        return [...rest.reverse(), prev, current.data.value, nextPreview];
      } else if (current.type === "highlight") {
        return [
          ...rest.reverse(),
          prev,
          <HighLightedText
            key={`highlighted_text_${current.type}${current.data.value}_${index}`}
          >
            {current.data.value}
          </HighLightedText>,
          nextPreview,
        ];
      } else {
        return result;
      }
    },
    [renderSpecMentionText],
  );
};
