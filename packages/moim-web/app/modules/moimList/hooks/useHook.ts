// vendor
import * as React from "react";
// hooks
import useCancelToken, {
  useCancelTokenWithCancelHandler,
} from "common/hooks/useCancelToken";
import { useActions, useStoreState } from "app/store";
import { useQuickJoinDialog } from "common/components/quickJoinDialog";
import useCurrentUser from "common/hooks/useCurrentUser";
import useCurrentGroup from "common/hooks/useCurrentGroup";
// action
import {
  getTags,
  ActionCreators as SubgroupTagActionCreators,
  getSubgroups,
} from "app/actions/tag";
// helper
import {
  subgroupSelector,
  tagSelector,
  tagsSelector,
  recommendMoimsSelector,
} from "app/selectors/tagAndSubgroup";
import { getRecommendMoims } from "app/actions/group";
import { IRouteComponentProps } from "app/routes/client";
import { ILabel } from "common/components/horizontalLabelList";
import { channelByIdSelector } from "app/selectors/channel";

export default function useHooks(props: IRouteComponentProps) {
  const [initialFetched, setInitialFetchedStatus] = React.useState(false);
  const state = useStoreState(storeState => ({
    subMoims: subgroupSelector(storeState),
    currentTag: props.match.params.tag
      ? tagSelector(storeState, props.match.params.tag)
      : undefined,
    tags: tagsSelector(storeState),
    channelData: props.match.params.tag
      ? (channelByIdSelector(
          storeState,
          props.match.params.tag,
        ) as Moim.Channel.ITagSimpleChannel)
      : undefined,
    myJoinedMoims: storeState.group.myJoinedMoims.data,
    recommendMoims: recommendMoimsSelector(storeState),
    isLoading: storeState.subgroupsData.isSubGroupsLoading,
    isRecommendMoimsLoading: storeState.subgroupsData.isRecommendMoimsLoading,
  }));
  const {
    dispatchGetTags,
    dispatchSubgroups,
    dispatchClearSubGroups,
    dispatchRecommendMoims,
  } = useActions({
    dispatchGetTags: getTags,
    dispatchSubgroups: getSubgroups,
    dispatchClearSubGroups: SubgroupTagActionCreators.clearTagSubGroups,
    dispatchRecommendMoims: getRecommendMoims,
  });
  const [currentOption, setCurrentOption] = React.useState<Partial<
    Moim.Group.IGroupSortingOption
  > | null>(null);
  const [currentMoimTagId, setCurrentMoimTagId] = React.useState("");
  const [selectedMoimTagIds, setSelectedMoimTagIds] = React.useState<ILabel[]>(
    [],
  );
  const cancelToken = useCancelToken();
  const {
    cancelTokenSource: cancelTokenForBatchSearch,
    handleCancel: cancelBatchSearch,
  } = useCancelTokenWithCancelHandler();
  const currentGroup = useCurrentGroup();
  const currentUser = useCurrentUser();
  const {
    targetMoimUrl,
    targetMoimId,
    handleOpen,
    open: quickJoinOpenStatus,
    username: targetUsername,
    handleClose: handleCloseQuickJoin,
  } = useQuickJoinDialog();

  const sortingOptions: Partial<
    Moim.Group.IGroupSortingOption
  >[] = React.useMemo(
    () =>
      currentGroup?.sorting_options ?? [
        {
          sort: undefined,
          order: undefined,
        },
      ],
    [currentGroup],
  );

  const handleGetMoimList = React.useCallback(
    (paging?: Moim.IPaging) => {
      if (state.channelData && initialFetched) {
        const { sort, order } = currentOption ?? sortingOptions[0];
        const currentTagIds =
          !state.channelData.tags || state.channelData.tags.length === 0
            ? undefined
            : state.channelData.tags;
        dispatchSubgroups(
          {
            tags: currentTagIds,
            paging,
            sort,
            order,
          },
          cancelToken.current.token,
        );
      }
    },
    [
      cancelToken,
      currentOption,
      dispatchSubgroups,
      initialFetched,
      sortingOptions,
      state.channelData,
    ],
  );

  const handleOpenQuickJoinDialog = React.useCallback(
    (moimUrl: string, moimId: Moim.Id) => {
      if (currentUser) {
        handleOpen(moimUrl, moimId, currentUser.name);
      }
    },
    [currentUser, handleOpen],
  );

  const handleSelectedTagsChange = React.useCallback(
    (tags: ILabel[]) => {
      cancelBatchSearch();
      dispatchClearSubGroups();
      if (tags.length === 0) {
        setSelectedMoimTagIds([]);
        handleGetMoimList();
      } else {
        const { sort, order } = currentOption ?? sortingOptions[0];
        const tagIds = tags.map(tag => tag.id);
        setSelectedMoimTagIds(tags);

        dispatchSubgroups(
          {
            tags: tagIds,
            sort,
            order,
          },
          cancelTokenForBatchSearch.current.token,
        );
      }
    },
    [
      cancelBatchSearch,
      dispatchClearSubGroups,
      handleGetMoimList,
      currentOption,
      sortingOptions,
      dispatchSubgroups,
      cancelTokenForBatchSearch,
    ],
  );

  const handleChangeOption = React.useCallback(
    (option: Partial<Moim.Group.IGroupSortingOption>) => {
      const { sort, order } = option;
      setCurrentOption(option);
      if (state.channelData) {
        dispatchClearSubGroups();
        dispatchSubgroups(
          {
            tags: selectedMoimTagIds.length
              ? selectedMoimTagIds.map(tag => tag.id)
              : undefined,
            sort,
            order,
          },
          cancelTokenForBatchSearch.current.token,
        );
      }
    },
    [
      cancelTokenForBatchSearch,
      dispatchClearSubGroups,
      dispatchSubgroups,
      selectedMoimTagIds,
      state.channelData,
    ],
  );

  React.useEffect(() => {
    if (props.match.params.tag !== currentMoimTagId && props.match.params.tag) {
      dispatchClearSubGroups();
      setCurrentOption(null);
      setSelectedMoimTagIds([]);
      setCurrentMoimTagId(props.match.params.tag);
      setInitialFetchedStatus(false);
    }
  }, [
    currentMoimTagId,
    dispatchClearSubGroups,
    handleGetMoimList,
    props.match.params.tag,
  ]);

  React.useEffect(() => {
    if (currentOption === null) {
      setCurrentOption(sortingOptions[0]);
    }
  }, [currentOption, sortingOptions]);

  React.useEffect(() => {
    if (!initialFetched) {
      dispatchClearSubGroups();
      dispatchGetTags({ limit: 100 });
      dispatchRecommendMoims();
      handleGetMoimList();
      const currentTagIds =
        !state.channelData?.tags || state.channelData.tags.length === 0
          ? undefined
          : state.channelData.tags;
      const { sort, order } = currentOption ?? sortingOptions[0];
      dispatchSubgroups(
        {
          tags: currentTagIds,
          sort,
          order,
        },
        cancelToken.current.token,
      );
      setInitialFetchedStatus(true);
    }
  }, [
    dispatchClearSubGroups,
    dispatchGetTags,
    handleGetMoimList,
    initialFetched,
    sortingOptions,
    dispatchRecommendMoims,
    dispatchSubgroups,
    cancelToken,
    currentOption,
    state.channelData,
  ]);

  return {
    ...state,
    sortingOptions,
    handleGetMoimList,
    quickJoinOpenStatus,
    targetMoimUrl,
    targetMoimId,
    targetUsername,
    selectedMoimTagIds,
    handleCloseQuickJoin,
    handleOpenQuickJoinDialog,
    handleSelectedTagsChange,
    handleChangeOption,
  };
}
