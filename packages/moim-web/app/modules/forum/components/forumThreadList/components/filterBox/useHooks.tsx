import * as React from "react";
import useIsMobile from "common/hooks/useIsMobile";
import { ActionCreators as ForumActionCreators } from "app/actions/forum";
import { useStoreState, useActions } from "app/store";
import { tagSetsSelector, selectCurrentForumWithId } from "app/selectors/forum";
import {
  IRefHandler as IFilterDialogRefHandler,
  IFilterOption,
} from "./components/filterDialog";
import { memoize } from "lodash";

export interface IProps {
  channelId: Moim.Id;
  visibleTopTabNavigation?: boolean;
}

export function useProps(props: IProps) {
  const { forumData, filterOption } = useStoreState(state => {
    const forum = selectCurrentForumWithId(state, props.channelId);
    return {
      forumData: forum,
      filterOption: state.forumListPage.filterOption,
    };
  });
  const tagSets = useStoreState(state =>
    forumData?.list_config.tag_sets
      ? tagSetsSelector(state, forumData?.list_config.tag_sets)
      : [],
  );
  const tagsetEntities = useStoreState(state => state.entities.tagset);

  const actions = useActions({
    changeFilterOption: ForumActionCreators.changeFilterOption,
  });

  const refFilterDialog = React.useRef<IFilterDialogRefHandler>(null);
  const isMobile = useIsMobile();
  const tagSetFilterBoxType: boolean = React.useMemo(
    () => forumData?.list_config.tag_set_filter_type === "NAVIGATION",
    [forumData],
  );

  return {
    ...props,
    ...actions,
    forumData,
    filterOption,
    tagSets,
    isMobile,
    refFilterDialog,
    tagSetFilterBoxType,
    tagsetEntities,
  };
}

export function useHandlers(props: ReturnType<typeof useProps>) {
  const {
    channelId,
    refFilterDialog,
    tagSets,
    filterOption,
    isMobile,
    tagSetFilterBoxType,
    changeFilterOption,
    tagsetEntities,
  } = props;

  const handleDialogResetClick = React.useCallback(() => {}, []);
  const handleDialogApplyClick = React.useCallback(
    (option: IFilterOption) => {
      changeFilterOption(channelId, {
        filterOption: {
          tagSets: {
            query: tagSetItemsOptionConvertToPlainText(option.selectedTags),
            selectedTags: option.selectedTags.map(item => item.id),
          },
        },
      });
      refFilterDialog.current?.close();
    },
    [changeFilterOption, channelId, refFilterDialog],
  );
  const handleDialogClose = React.useCallback(
    (option: IFilterOption) => {
      if (!tagSetFilterBoxType && isMobile) {
        changeFilterOption(channelId, {
          filterOption: {
            tagSets: {
              query: tagSetItemsOptionConvertToPlainText(option.selectedTags),
              selectedTags: option.selectedTags.map(item => item.id),
            },
          },
        });
      }
    },
    [changeFilterOption, channelId, isMobile, tagSetFilterBoxType],
  );

  const handleFilterSetClick = React.useCallback(() => {
    refFilterDialog.current?.open();
  }, [refFilterDialog]);
  const handleOrderClick = React.useCallback(() => {
    // TBD
  }, []);

  const selectedTagItems = React.useMemo(() => {
    const selectedTagIds = filterOption.tagSets?.selectedTags || [];
    return tagSets.reduce<Moim.TagSet.ITagItem[]>(
      (items, set) =>
        items.concat(
          (
            (set as Moim.TagSet.ITagSet).items?.filter(itemId =>
              selectedTagIds.includes(itemId),
            ) ?? []
          ).map(id => tagsetEntities[id] as Moim.TagSet.ITagItem),
        ),
      [],
    );
  }, [tagSets, tagsetEntities, filterOption.tagSets]);

  const menus = React.useMemo(
    () => ({
      filterSet: {
        // NOTE: enable should consider dateRange & tagSet
        enable: !tagSetFilterBoxType && Boolean(tagSets.length > 0),
        active:
          Boolean(
            filterOption.tagSets &&
              filterOption.tagSets.selectedTags.length > 0,
          ) || Boolean(filterOption.searchDateRange),
        selectedTagCount: filterOption.tagSets?.selectedTags.length || 0,
        onClick: handleFilterSetClick,
      },
      order: {
        enable: false,
        currentValue: "",
        onClick: handleOrderClick,
      },
    }),
    [
      tagSetFilterBoxType,
      tagSets.length,
      filterOption.tagSets,
      filterOption.searchDateRange,
      handleFilterSetClick,
      handleOrderClick,
    ],
  );

  return {
    ...props,
    menus,
    selectedTagItems,
    handleDialogResetClick,
    handleDialogApplyClick,
    handleDialogClose,
  };
}

const tagSetItemsOptionConvertToPlainText = memoize(
  (tagItems: Moim.TagSet.ITagItem[]): { [key: string]: string[] } => {
    if (tagItems.length === 0) return {};
    const tagSetHeap: { [key: string]: string[] } = {};

    tagItems.forEach(item => {
      if (!tagSetHeap[item.set]) {
        tagSetHeap[item.set] = [];
      }
      tagSetHeap[item.set].push(item.value);
    });

    return tagSetHeap;
  },
);
