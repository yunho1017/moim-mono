import * as React from "react";
import { useRouteMatch } from "react-router";

import { Wrapper, EmptyComment, Container } from "./styled";
import ListComponent from "./list";
import PermissionChecker from "common/components/permissionChecker";

import { usePostShowPermission } from "app/modules/postShow/hooks";
import { useActions, useStoreState } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";
import { useIsEmptyCommentList } from "./hooks/useIsEmptyCommentList";

// actions
import { getCommentList, getCommentListWithOne } from "app/actions/forum";
import { lastCommentIdSelector } from "app/selectors/forum";

import { PermissionDeniedFallbackType } from "app/enums";
import { PostShowContext } from "app/modules/postShow/context";

export default function CommentList() {
  const { post } = React.useContext(PostShowContext);

  const match = useRouteMatch<Moim.IMatchParams>();
  const cancelToken = useCancelToken();
  const isEmpty = useIsEmptyCommentList();

  const commentIds = useStoreState(
    state => state.thread.threadIds[post.id]?.data,
  );
  const { lastCommentId, replySortingOption } = useStoreState(state => {
    const sort = (state.entities.channels[post.parent_id] as
      | Moim.Channel.IForumSimpleChannel
      | undefined)?.reply_sorting_options?.[0];
    return {
      lastCommentId: lastCommentIdSelector(state, post.id, sort),
      replySortingOption: sort,
    };
  });

  const { dispatchGetCommentList, dispatchGetCommentListWithOne } = useActions({
    dispatchGetCommentList: getCommentList,
    dispatchGetCommentListWithOne: getCommentListWithOne,
  });

  const handleGetFocusedInitialData = React.useCallback(async () => {
    const focusedId = match.params.focusedId;
    const reply_sorting_options = replySortingOption;
    if (focusedId) {
      await dispatchGetCommentListWithOne(
        {
          channelId: post.parent_id,
          threadId: post.id,
          inclusive: true,
          sort: reply_sorting_options?.sort ?? "createdAt",
          order: reply_sorting_options?.order ?? "ASC",
        },
        cancelToken.current.token,
        focusedId,
        post.groupId,
      );
    }
  }, [
    post.id,
    post.parent_id,
    post.groupId,
    match.params.focusedId,
    replySortingOption,
  ]);

  const handleGetCommentList = React.useCallback(
    (
      paging?: Moim.IPaging,
      inclusive?: boolean,
      pagingKey?: keyof Moim.IPaging,
    ) => {
      const reply_sorting_options = replySortingOption;
      dispatchGetCommentList(
        {
          ...paging,
          channelId: post.parent_id,
          threadId: post.id,
          inclusive,
          sort: reply_sorting_options?.sort ?? "createdAt",
          order: reply_sorting_options?.order ?? "ASC",
        },
        cancelToken.current.token,
        pagingKey,
      );
    },
    [post.id, post.parent_id, replySortingOption],
  );

  const {
    hasPermission: hasReadCommentPermission,
    isLoading: isPermissionLoading,
  } = usePostShowPermission("READ_COMMENT");

  React.useEffect(() => {
    const focusedId = match.params.focusedId;
    if (focusedId) {
      handleGetFocusedInitialData();
    } else {
      if (!commentIds) {
        handleGetCommentList();
      } else {
        const pagingKey =
          replySortingOption?.order === "DESC" ? "before" : "after";
        handleGetCommentList(
          {
            [pagingKey]: lastCommentId,
          },
          false,
          pagingKey,
        );
      }
    }
  }, [match.params.focusedId, post.id]);

  return (
    <Container>
      <PermissionChecker
        fallbackType={PermissionDeniedFallbackType.SCREEN}
        hasPermission={hasReadCommentPermission}
        isLoading={isPermissionLoading}
      >
        {isEmpty ? (
          <EmptyComment />
        ) : (
          <Wrapper>
            <ListComponent sortingOptions={replySortingOption} />
          </Wrapper>
        )}
      </PermissionChecker>
    </Container>
  );
}
