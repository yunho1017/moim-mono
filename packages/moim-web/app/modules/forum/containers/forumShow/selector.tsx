import { createSelector } from "reselect";
import { IAppState } from "app/rootReducer";
import { threadDenormalizer, channelDenormalizer } from "app/models";

export const currentThreadSelector = createSelector(
  (state: IAppState) => state.forumData.currentThreadId,
  (state: IAppState) => state.entities,
  (
    currentThreadId: string,
    entities: Moim.Entity.INormalizedData,
  ): Moim.Forum.IDenormalizedThread | undefined =>
    threadDenormalizer(currentThreadId, entities),
);

export const currentChannelTemplateSelector = createSelector(
  (state: IAppState) => state.forumData.currentForumId,
  (state: IAppState) => state.entities,
  (
    currentForumId: string,
    entities: Moim.Entity.INormalizedData,
  ): Moim.Forum.IPostTemplate | undefined => {
    const channel = channelDenormalizer(currentForumId, entities);

    if (!channel || channel.type !== "forum") {
      return undefined;
    }

    return channel.thread_templates?.[0];
  },
);
export const channelIdTemplateSelector = createSelector(
  (state: IAppState, _: Moim.Id) => state.entities,
  (_: IAppState, channelId: Moim.Id) => channelId,
  (
    entities: Moim.Entity.INormalizedData,
    channelId: string,
  ): Moim.Forum.INormalizedPostTemplate | undefined => {
    const channel = entities.channels[channelId];

    if (!channel || channel.type !== "forum") {
      return undefined;
    }
    const templates = (channel.thread_template_ids ?? [])
      .map(id => entities.postTemplates[id])
      .filter(i => Boolean(i));

    return templates[0];
  },
);

export const currentDraftSelector = createSelector(
  (state: IAppState) => state.entities,
  (state: IAppState) => state.draftState.currentDraftId,
  (entities, currentDraftId): Moim.Forum.IDenormalizedThread | undefined =>
    currentDraftId ? threadDenormalizer(currentDraftId, entities) : undefined,
);

export const currentThreadLoadingSelector = createSelector(
  (state: IAppState) => state.forumData.currentThreadId,
  (state: IAppState) => state.forumData.isLoadingForumShow,
  (currentThreadId: string, isLoading): boolean =>
    isLoading[currentThreadId] !== undefined
      ? isLoading[currentThreadId]
      : true,
);

export const reactionTypeSelector = createSelector(
  (state: IAppState) => state.forumData.currentForumId,
  (state: IAppState) => state.entities,
  (
    currentForumId: string,
    entities: Moim.Entity.INormalizedData,
  ): Moim.Forum.PostReactionType =>
    (channelDenormalizer(currentForumId, entities) as
      | Moim.Channel.IForumSimpleChannel
      | undefined)?.show_config.reaction_type ?? "up",
);

export const commentReactionTypeSelector = createSelector(
  (state: IAppState) => state.forumData.currentForumId,
  (state: IAppState) => state.entities,
  (
    currentForumId: string,
    entities: Moim.Entity.INormalizedData,
  ): Moim.Forum.PostReactionType =>
    (channelDenormalizer(currentForumId, entities) as
      | Moim.Channel.IForumSimpleChannel
      | undefined)?.show_config.comment_reaction_type ?? "up",
);
