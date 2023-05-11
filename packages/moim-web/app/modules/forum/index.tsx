// vendor
import * as React from "react";
import { Route, Switch } from "react-router";
import ReactResizeDetector from "react-resize-detector";
// component
import ForumShowContainer from "./containers/forumShow";
import ForumEditorContainer from "./containers/forumEditor";
import ForumThreadListContainer from "./containers/forumThreadList";
import ChannelInfoAppBar from "./containers/channelInfoAppBar";
import { Container, Wrapper, ListAndModalLayoutWrapper } from "./styled";
import ListAndModalLayout from "common/layouts/listAndModal";
import ListAndDetailLayout from "common/layouts/listAndDetail";
import { DefaultLoader } from "common/components/loading";
import EditPinnedPostDialog, {
  useForumProps as useEditPinnedPostDialogProps,
} from "common/components/editPinnedItemDialog";
// helper
import { MoimURL } from "common/helpers/url";
import { useHooks } from "./hooks/useHooks";
import { PostShowTypes } from "app/enums";
import { ForumContext } from "./context";

const MAIN_PANEL_URLS = [
  MoimURL.FocusedShowForumThread.pattern,
  MoimURL.EditForumThread.pattern,
  MoimURL.CreateForumThread.pattern,
  MoimURL.ShowForumThread.pattern,
];

function Forum() {
  const [containerHeight, setContainerHeight] = React.useState<
    number | undefined
  >();
  const {
    refContainer,
    refBody,
    isMobile,
    postShowType,
    threadListColumnCount,
    visibleTopTabNavigation,
    handleMainBackClick,
  } = useHooks();
  const {
    pinnedPostList,
    isLoadingArrangePinnedPostList,
    isLoadingGetPinnedPostList,
    open: editPinnedPostDialogOpen,
    handleClose: handleCloseEditPinnedPostDialog,
    handleArrange: handleArrangePinnedPostLit,
    handleGetPinnedPostList,
  } = useEditPinnedPostDialogProps();

  const handleRootContainerScroll = React.useCallback(
    (initialNumber?: number) => {
      refContainer.current?.scrollTo(0, initialNumber ?? 0);
    },
    [],
  );

  const postListElement = React.useMemo(
    () => <ForumThreadListContainer postShowType={postShowType} />,
    [postShowType],
  );
  const postShowElement = React.useMemo(
    () => (
      <Switch>
        <Route path={MoimURL.CreateForumThread.pattern}>
          <ForumEditorContainer
            mode="new"
            isModal={postShowType !== PostShowTypes.DEFAULT}
            onBackClick={handleMainBackClick}
          />
        </Route>
        <Route path={MoimURL.EditForumThread.pattern}>
          <ForumEditorContainer
            mode="edit"
            isModal={postShowType !== PostShowTypes.DEFAULT}
            onBackClick={handleMainBackClick}
          />
        </Route>
        <Route
          path={[
            MoimURL.FocusedShowForumThread.pattern,
            MoimURL.ShowForumThread.pattern,
            MoimURL.Forum.pattern,
          ]}
        >
          <ForumShowContainer
            isMobile={isMobile}
            isModal={postShowType !== PostShowTypes.DEFAULT}
            onMainBackClick={handleMainBackClick}
            onDesktopRootLayoutScroll={handleRootContainerScroll}
          />
        </Route>
      </Switch>
    ),
    [handleMainBackClick, isMobile, postShowType, handleRootContainerScroll],
  );

  const forumElement = React.useMemo(() => {
    switch (postShowType) {
      case PostShowTypes.MODAL:
        return (
          <ListAndModalLayoutWrapper>
            <ListAndModalLayout
              onClose={handleMainBackClick}
              listElement={postListElement}
              detailElement={postShowElement}
              mainPanelUrls={MAIN_PANEL_URLS}
            />
          </ListAndModalLayoutWrapper>
        );

      case PostShowTypes.DEFAULT:
        return (
          <ListAndDetailLayout
            minHeight={containerHeight}
            disableListWrapperRightBorder={true}
            listElement={postListElement}
            detailElement={postShowElement}
            mainPanelUrls={MAIN_PANEL_URLS}
          />
        );
      default:
        return <DefaultLoader />;
    }
  }, [
    postShowType,
    containerHeight,
    handleMainBackClick,
    postListElement,
    postShowElement,
  ]);

  const handleResizeContainer = React.useCallback(
    (_width: number, height: number) => {
      setContainerHeight(height);
    },
    [],
  );

  const contextValues = React.useMemo(
    () => ({ showType: postShowType, refBody }),
    [postShowType],
  );

  React.useEffect(() => {
    if (editPinnedPostDialogOpen) {
      handleGetPinnedPostList();
    }
  }, [editPinnedPostDialogOpen]);

  return (
    <ForumContext.Provider value={contextValues}>
      <ReactResizeDetector
        handleHeight={true}
        refreshMode="debounce"
        onResize={handleResizeContainer}
      >
        <Container ref={refContainer}>
          <Wrapper
            isModalShow={postShowType === "MODAL"}
            column={threadListColumnCount}
          >
            <ChannelInfoAppBar
              visibleTopTabNavigation={visibleTopTabNavigation}
            />
            <div ref={refBody}>{forumElement}</div>
          </Wrapper>
        </Container>
      </ReactResizeDetector>
      <EditPinnedPostDialog
        open={editPinnedPostDialogOpen}
        pinnedItems={pinnedPostList}
        isActive={true}
        isLoading={isLoadingArrangePinnedPostList}
        isLoadingGetPinnedPostList={isLoadingGetPinnedPostList}
        onSave={handleArrangePinnedPostLit}
        onClose={handleCloseEditPinnedPostDialog}
      />
    </ForumContext.Provider>
  );
}

export default Forum;
