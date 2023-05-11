import { createSelector } from "reselect";
import { IAppState } from "app/rootReducer";
import { threadListDenormalizer, userDenormalizer } from "../models";
import { entitiesSelector } from ".";
import { forumDenormalizer } from "../models/forum";
import { threadDenormalizer } from "../models/thread";

const selectForumData = (state: IAppState) => state.forumData;

export const threadSelector = createSelector(
  entitiesSelector,
  (_state: IAppState, threadId: string) => threadId,
  (entities, threadId: string) => threadDenormalizer(threadId, entities),
);

export const selectCurrentForumId = createSelector(
  selectForumData,
  forumData => forumData.currentForumId,
);

const DEFAULT_REPLY_SORTING_OPTION: Moim.Forum.IForumSortingOption = {
  order: "ASC",
  sort: "createdAt",
};

export const forumReplySortingOptionSelector = createSelector(
  (state: IAppState, channelId: Moim.Id) => state.entities.channels[channelId],
  channel => {
    if (channel && channel.type === "forum") {
      return channel.reply_sorting_options?.[0] ?? DEFAULT_REPLY_SORTING_OPTION;
    }

    return DEFAULT_REPLY_SORTING_OPTION;
  },
);

export const threadReplySortingOptionSelector = (
  state: IAppState,
  threadId: Moim.Id,
) => {
  const threadEntity = state.entities.threads[threadId];

  if (!threadEntity) {
    return DEFAULT_REPLY_SORTING_OPTION;
  }

  if (
    threadEntity.reply_sorting_options &&
    threadEntity.reply_sorting_options.length
  ) {
    return threadEntity.reply_sorting_options[0];
  }

  return forumReplySortingOptionSelector(state, threadEntity.parent_id);
};

export const selectThreadList = createSelector(
  (state: IAppState) => state.entities.threads,
  (state: IAppState) => state.thread.threadIds[state.forumData.currentForumId],
  (entities, threadIds) =>
    threadIds
      ? {
          data: threadIds.data.map(id => entities[id]),
          paging: threadIds.paging,
        }
      : undefined,
);

export const selectThreadListById = createSelector(
  (_: IAppState, ids: Moim.Id[]) => ids,
  (state: IAppState) => state.entities.threads,
  (ids, threadEntity) => ids.map(id => threadEntity[id]),
);

export const postListLoadingSelector = createSelector(
  (state: IAppState) => state.forumListPage.isLoading,
  (state: IAppState) => state.forumData.currentForumId,
  (isLoading, currentForumId): boolean =>
    isLoading[currentForumId] !== undefined ? isLoading[currentForumId] : true,
);

const sortAndCombineCommentIdsData = createSelector(
  (state: IAppState, threadId: string) =>
    state.thread.threadIds[threadId] ?? { data: [], paging: {} },
  (state: IAppState, threadId: string) =>
    state.forumData.postedCommentIds[threadId] ?? [],
  (state: IAppState, threadId: string) =>
    threadReplySortingOptionSelector(state, threadId),
  (storedCommentData, postedCommentIds, replySortOption) => {
    const storedCommentIds = storedCommentData?.data ?? [];
    const sortedUniqCommentIds = Array.from(
      new Set(
        replySortOption.order === "ASC" && replySortOption.sort !== "voteScore"
          ? storedCommentIds.concat(postedCommentIds)
          : postedCommentIds.concat(storedCommentIds),
      ),
    );

    return {
      data: sortedUniqCommentIds,
      paging: storedCommentData?.paging ?? {},
    };
  },
);

export const selectCommentList = createSelector(
  (state: IAppState, threadId: string) =>
    sortAndCombineCommentIdsData(state, threadId),
  (state: IAppState, _: string) => state.entities.threads,
  (sortedCommentIdsData, threadEntities) => {
    const commentList = sortedCommentIdsData.data.map(
      id => threadEntities[id] as Moim.Forum.IThread | undefined,
    );

    return {
      data: commentList.filter(item => item && !item.deleted),
      paging: sortedCommentIdsData?.paging ?? {},
    };
  },
);

export const selectCurrentForum = createSelector(
  selectCurrentForumId,
  (state: IAppState) => state.entities.channels,
  (forumId, entities): Moim.Channel.IForumSimpleChannel | undefined => {
    const channel = entities[forumId];

    if (channel && channel.type === "forum") {
      return channel;
    }
    return undefined;
  },
);

export const selectCurrentForumWithId = createSelector(
  (state: IAppState) => state.entities.channels,
  (_state: IAppState, forumId: Moim.Id) => forumId,
  (entities, forumId): Moim.Channel.IForumSimpleChannel | undefined => {
    const channel = entities[forumId];

    if (channel && channel.type === "forum") {
      return channel;
    }
    return undefined;
  },
);

export const selectCurrentForumShowConfig = createSelector(
  selectCurrentForum,
  channel => channel?.show_config,
);

export const threadVotesSelector = createSelector(
  (state: IAppState, threadId: Moim.Id, type: Moim.Enums.VoteStatus) => {
    if (
      type !== null &&
      state.forumData.threadVotes[threadId] &&
      state.forumData.threadVotes[threadId][type]
    ) {
      return state.forumData.threadVotes[threadId][type];
    }
    return null;
  },
  entitiesSelector,
  (
    votes,
    entities,
  ): Moim.IPaginatedListResponse<Moim.Forum.IDenormalizedVote> => {
    if (!votes) {
      return {
        data: [],
        paging: {},
      };
    }

    const denormalizedVoteList = votes.data.map(
      (vote): Moim.Forum.IDenormalizedVote => ({
        ...vote,
        user: userDenormalizer(vote.user_id, entities),
      }),
    );
    return {
      ...votes,
      data: denormalizedVoteList,
    };
  },
);

export const getForumByIdSelector = createSelector(
  entitiesSelector,
  (_state: IAppState, forumId: Moim.Id) => forumId,
  (entities, forumId: Moim.Id) => forumDenormalizer(forumId, entities),
);

export const getThreadVotesLoadingSelector = (
  state: IAppState,
  threadId: Moim.Id,
) => Boolean(state.forumData.threadVotesLoading[threadId] ?? true);

export const tagSetsSelector = createSelector(
  (state: IAppState) => state.entities.tagset,
  (_: any, tagSets: Moim.Id[]) => tagSets,
  (entities, tagSets) =>
    tagSets
      .map(tagId => entities[tagId])
      .filter(i => Boolean(i))
      .sort((a, b) =>
        a.sortKey < b.sortKey ? -1 : a.sortKey > b.sortKey ? 1 : 0,
      ),
);

export const firstThreadIdSelector = (state: IAppState, channelId: string) =>
  state.thread.threadIds[channelId]?.data[0];

export const lastCommentIdSelector = (
  state: IAppState,
  threadId: string,
  sort: Moim.Forum.IForumSortingOption | undefined,
) =>
  sort?.order === "DESC"
    ? [...(state.thread.threadIds[threadId]?.data || [])][0]
    : [...(state.thread.threadIds[threadId]?.data || [])].reverse()[0];

export const pinnedPostListSelector = createSelector(
  (state: IAppState) => state.entities.threads,
  (state: IAppState, channelId: Moim.Id) =>
    state.forumData.pinnedPostList[channelId] ?? [],
  (entities, pinnedPostList) => pinnedPostList.map(id => entities[id]),
);

const forumSortingOptionsSelector = createSelector(
  selectCurrentForumWithId,
  currentForum => {
    if (!currentForum || !currentForum?.sorting_options?.[0]) {
      return {
        order: "DESC",
        sort: "createdAt",
      } as Moim.Forum.IForumSortingOption;
    }
    return currentForum.sorting_options[0];
  },
);

export const selectThreadListReOrdering = createSelector(
  (
    state: IAppState,
    forumId: string,
  ): Moim.IPaginatedListResponse<Moim.Forum.IThread> => {
    const { data, paging } = state.thread.threadIds[forumId] ?? {
      data: [],
      paging: {},
    };

    return {
      data: data.map(id => state.entities.threads[id]),
      paging,
    };
  },
  forumSortingOptionsSelector,
  (threadList, forumSortingOptions): Moim.Forum.IThread[] => {
    return threadList?.data.sort((x, y) => {
      switch (forumSortingOptions?.sort) {
        case "createdAt": {
          return forumSortingOptions.order === "ASC"
            ? x.created_at - y.created_at
            : y.created_at - x.created_at;
        }
        case "editedAt": {
          return forumSortingOptions.order === "ASC"
            ? x.edited_at - y.edited_at
            : y.edited_at - x.edited_at;
        }
        default:
        case "voteScore": {
          return 0;
        }
      }
    });
  },
);

export const threadReplies = createSelector(
  (state: IAppState, threadId: string) =>
    threadListDenormalizer(
      state.thread.threadIds[threadId] ?? {
        data: [],
        paging: {},
      },
      state.entities,
    ),
  (state: IAppState, threadId: string) =>
    threadListDenormalizer(
      { data: state.forumData.postedCommentIds[threadId] },
      state.entities,
    ),
  (savedComments, postedComments) => {
    if (savedComments === undefined) {
      return undefined;
    }

    const savedCommentsData = savedComments?.data ?? [];
    const postedCommentsData = postedComments?.data ?? [];

    return {
      data: savedCommentsData
        .concat(postedCommentsData)
        .filter(item => Boolean(item) && !item.deleted),
      paging: savedComments?.paging ?? {},
    };
  },
);
