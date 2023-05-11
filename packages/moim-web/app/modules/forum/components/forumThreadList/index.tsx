import * as React from "react";
// hooks
import useIsMobile from "common/hooks/useIsMobile";
import {
  Content,
  UpdateNotificatorWrapper,
  Wrapper,
  ScrollSection,
} from "../../containers/forumThreadList/styledComponents";
// components
import UpdateNotificator from "./components/updateNotificator";
import EmptyThread from "app/modules/postShow/components/emptyThread";
import EmptyFilteredList from "./components/emptyFilteredList";
import ThreadList from "./components/threadList";
import NewPostSnackbar from "./components/newPostSnackbar";
import BlockitRenderer from "common/components/blockitEditorBase/components/blockitRenderer";
import ThreadListHeader from "./components/threadListHeader";
import { BlockitWrapper } from "./styled";
import PermissionChecker, {
  useResourcePermission,
} from "common/components/permissionChecker";
import { useStoreState } from "app/store";
import {
  selectThreadListReOrdering,
  selectCurrentForum,
  selectCurrentForumShowConfig,
  postListLoadingSelector,
} from "app/selectors/forum";
import PageUpdater from "common/components/pageUpdater";
// type
import { PermissionDeniedFallbackType, PostShowTypes } from "app/enums";
import { IAppState } from "app/rootReducer";
import useCurrentGroup from "common/hooks/useCurrentGroup";
import { useVisibleMobileTopTab } from "app/modules/layout/components/controller/hooks";
import ThreadWriteButton from "./components/threadWriteButton";
import MoreButton from "../../containers/channelInfoAppBar/mobile/components/moreButton";
import { AnalyticsClass } from "common/helpers/analytics/analytics";

interface IProps {
  forumId: Moim.Id;
  selectedThreadId: Moim.Id;
  hasFiltered: boolean;
  paging: Moim.IPaging;
  scrollRef?: React.RefObject<HTMLDivElement>;
  onLoadMoreThread(pagingKey: keyof Moim.IPaging): void;
  onRefresh(): void;
  onClickSideBarButton(): void;
}

function ForumThreadList(props: IProps) {
  const {
    forumId,
    selectedThreadId,
    hasFiltered,
    paging,
    scrollRef,
    onLoadMoreThread,
    onRefresh,
    onClickSideBarButton,
  } = props;
  const isMobile = useIsMobile();
  const visibleTopTabNavigation = useVisibleMobileTopTab();
  const currentGroup = useCurrentGroup();
  const threadList = useStoreState((state: IAppState) =>
    selectThreadListReOrdering(state, forumId),
  );
  const { currentForum, isLoading, hasUpdate, postShowType } = useStoreState(
    state => ({
      postShowType: selectCurrentForumShowConfig(state)?.show_type,
      currentForum: selectCurrentForum(state),
      isLoading: postListLoadingSelector(state),
      hasUpdate: state.forumListPage.updated,
    }),
  );

  const textSets = React.useMemo(
    () => currentForum?.text_sets ?? currentGroup?.text_sets,
    [currentForum, currentGroup],
  );

  const {
    hasPermission: hasReadPostListPermission,
    isLoading: isPermissionLoading,
  } = useResourcePermission("READ_POST_LIST", forumId);

  const visibleEmptyState = React.useMemo(
    () => postShowType !== PostShowTypes.DEFAULT || isMobile,
    [isMobile, postShowType],
  );

  const blockitTimer = React.useMemo(
    () => (
      <div>
        {currentForum?.header &&
          currentForum.header.map((block, idx) => {
            const headerBlock = { ...block, textSets } as Moim.Blockit.Blocks;
            return (
              <BlockitRenderer
                key={`list_head_${block.type}_${idx}`}
                block={headerBlock}
              />
            );
          })}
      </div>
    ),
    [currentForum?.header, textSets],
  );

  const contentElement = React.useMemo(() => {
    if (!isLoading && !threadList?.length) {
      if (hasFiltered) return <EmptyFilteredList />;
      if (visibleEmptyState) return <EmptyThread />;

      return null;
    }

    return (
      <ThreadList
        threadList={threadList}
        threadListConfig={currentForum?.list_config}
        selectedThreadId={selectedThreadId}
        paging={paging}
        isLoading={isLoading}
        onLoadMoreThread={onLoadMoreThread}
      />
    );
  }, [
    isLoading,
    threadList,
    currentForum?.list_config,
    selectedThreadId,
    paging,
    onLoadMoreThread,
    hasFiltered,
    visibleEmptyState,
  ]);

  React.useEffect(() => {
    AnalyticsClass.getInstance().formListView({ forumId });
  }, [forumId]);

  return (
    <Wrapper>
      <PageUpdater
        title={currentForum?.name ?? currentGroup?.name ?? ""}
        metaObjects={[
          {
            name: "og:title",
            content: currentForum?.name ?? currentGroup?.name ?? "",
          },
        ]}
      />

      <ThreadListHeader
        forumId={forumId}
        visibleTopTabNavigation={visibleTopTabNavigation}
      />
      <PermissionChecker
        fallbackType={PermissionDeniedFallbackType.SCREEN}
        hasPermission={hasReadPostListPermission}
        isLoading={isPermissionLoading}
        onBackClick={onClickSideBarButton}
      >
        <Content>
          <NewPostSnackbar />
          <ScrollSection
            ref={scrollRef}
            isListModalType={postShowType === "MODAL"}
          >
            <BlockitWrapper>{blockitTimer}</BlockitWrapper>
            {contentElement}

            {hasUpdate && (
              <UpdateNotificatorWrapper>
                <UpdateNotificator onClick={onRefresh} />
              </UpdateNotificatorWrapper>
            )}
          </ScrollSection>
        </Content>
        {visibleTopTabNavigation && (
          <>
            <ThreadWriteButton
              visibleTopTabNavigation={visibleTopTabNavigation}
              forumId={forumId}
            />
            <MoreButton
              forumId={forumId}
              iconSize="24"
              visibleTopTabNavigation={visibleTopTabNavigation}
            />
          </>
        )}
      </PermissionChecker>
    </Wrapper>
  );
}

export default ForumThreadList;
