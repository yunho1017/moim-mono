import * as React from "react";
import axios from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
// actions
import {
  getThread as getThreadAction,
  ActionCreators as ForumActionCreator,
} from "app/actions/forum";
// utils
// selector
import {
  selectThreadList,
  selectCurrentForum,
  postListLoadingSelector,
} from "app/selectors/forum";
import {
  currentThreadLoadingSelector,
  currentThreadSelector,
} from "./selector";
import {
  hasPermissionSelector,
  permissionLoadingSelector,
} from "app/selectors/permission";
import { getIsForumShow } from "../../helpers";
// interfaces
import { IAppState } from "app/rootReducer";
import { AppDispatch } from "app/store";
import { PermissionDeniedFallbackType, PostShowTypes } from "app/enums";
// components
import PermissionChecker from "common/components/permissionChecker";
import Empty from "app/modules/postShow/components/emptyThread";
import { Wrapper } from "./styledComponents";
import ForumThreadShowHelmet from "./helmet";
import PostShow from "app/modules/postShow";
import { ForumShowSkeleton } from "./skeleton";

function mapStateToProps(state: IAppState) {
  const forum = selectCurrentForum(state);
  const currentThread = currentThreadSelector(state);
  return {
    tagSets: forum?.list_config.tag_sets ?? [],
    currentForumDatum: currentThread,

    forumShowConfig: forum?.show_config,
    isLoadingForumShow: currentThreadLoadingSelector(state),
    isLoadingThreadList: postListLoadingSelector(state),
    forumId: state.forumData.currentForumId,
    threadList: selectThreadList(state),
    hasReadPostPermission: hasPermissionSelector(
      state,
      state.forumData.currentForumId,
      "READ_POST",
      currentThread?.author,
    ),

    isPermissionLoading: permissionLoadingSelector(
      state,
      state.forumData.currentForumId,
      "READ_POST",
    ),
    postShowType: forum?.show_config.show_type,
    currentThreadId: state.forumData.currentThreadId,
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return bindActionCreators(
    {
      clearThread: ForumActionCreator.clearCurrentThread,
      clearCommentEditState: ForumActionCreator.clearCommentEditState,
      changeForumListFilterOption: ForumActionCreator.changeFilterOption,
      getThread: getThreadAction,
    },
    dispatch,
  );
}

interface IMatchParams {
  forumId: string;
  threadId: string;
}

interface IProps
  extends RouteComponentProps<IMatchParams>,
    ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps> {
  isMobile: boolean;
  isModal?: boolean;
  onMainBackClick(): void;
  onDesktopRootLayoutScroll?(initialNumber?: number): void;
}

class ForumShowContainer extends React.PureComponent<IProps> {
  private readonly forumShowContainerRef: React.RefObject<
    HTMLDivElement
  > = React.createRef();

  private cancelTokenSource = axios.CancelToken.source();

  public componentDidMount() {
    const { match } = this.props;
    if (match.params.forumId && match.params.threadId) {
      this.getThread();
    }
  }

  public componentDidUpdate(prevProps: IProps) {
    const { match, location } = this.props;
    if (match.params.forumId !== prevProps.match.params.forumId) {
      this.props.clearThread();
    }

    if (
      match.params.threadId &&
      prevProps.match.params.threadId &&
      match.params.threadId !== prevProps.match.params.threadId
    ) {
      this.resetScrollPosition();
    }

    if (
      getIsForumShow(location.pathname) &&
      (match.params.forumId !== prevProps.match.params.forumId ||
        match.params.threadId !== prevProps.match.params.threadId)
    ) {
      this.props.clearCommentEditState();
      this.cancelAndRenewalCancelToken();
      this.getThread();
    }
  }

  public componentWillUnmount() {
    this.cancelTokenSource.cancel();
    this.props.clearThread();
    this.props.clearCommentEditState();
  }

  public render() {
    const {
      tagSets,
      currentThreadId,
      forumShowConfig,
      isLoadingForumShow,
      isLoadingThreadList,
      threadList,
      currentForumDatum,
      hasReadPostPermission,
      isPermissionLoading,
      isMobile,
      isModal,
      onMainBackClick,
    } = this.props;
    const postShowModalView = this.getPostShowModalView();
    if (
      (!isLoadingThreadList &&
        (isMobile
          ? threadList?.data.length === 0
          : !threadList?.data.length)) ||
      (currentThreadId && !currentForumDatum && !isLoadingForumShow)
    ) {
      return (
        <PermissionChecker
          fallbackType={PermissionDeniedFallbackType.SCREEN}
          hasPermission={hasReadPostPermission}
          isLoading={isPermissionLoading}
          onBackClick={onMainBackClick}
        >
          <Empty />
        </PermissionChecker>
      );
    }

    if ((isLoadingForumShow && !currentForumDatum) || !currentThreadId) {
      return (
        <Wrapper
          ref={this.forumShowContainerRef}
          postShowModalView={postShowModalView}
          disableScrollStyle={Boolean(this.getDisableScrollStyle())}
        >
          <ForumShowSkeleton />
        </Wrapper>
      );
    }

    if (!currentForumDatum) {
      return (
        <PermissionChecker
          fallbackType={PermissionDeniedFallbackType.SCREEN}
          hasPermission={hasReadPostPermission}
          isLoading={isPermissionLoading}
          onBackClick={onMainBackClick}
        >
          <Empty />
        </PermissionChecker>
      );
    }

    return (
      <>
        <PermissionChecker
          fallbackType={PermissionDeniedFallbackType.SCREEN}
          hasPermission={hasReadPostPermission}
          isLoading={isPermissionLoading}
          onBackClick={onMainBackClick}
        >
          <ForumThreadShowHelmet
            threadTitle={
              currentForumDatum.preview?.title ?? currentForumDatum.title
            }
            threadDescription={currentForumDatum.preview?.description}
            threadContent={currentForumDatum.content}
          />
          <PostShow
            isModalShow={Boolean(isModal && !isMobile)}
            post={currentForumDatum}
            tagSetIds={tagSets}
            showConfig={forumShowConfig}
            onBack={onMainBackClick}
            onClickTagItem={this.handleClickTagItem}
          />
        </PermissionChecker>
      </>
    );
  }

  private readonly cancelAndRenewalCancelToken = () => {
    this.cancelTokenSource.cancel();
    this.cancelTokenSource = axios.CancelToken.source();
  };

  private readonly getThread = () => {
    const { getThread, match } = this.props;
    getThread(
      {
        parentId: this.getChannelIdFromURL(),
        threadId: match.params.threadId,
      },
      this.cancelTokenSource.token,
    );
  };

  private readonly handleClickTagItem = (tagItem: Moim.TagSet.ITagItem) => {
    const {
      match,
      isMobile,
      changeForumListFilterOption,
      onMainBackClick,
    } = this.props;
    changeForumListFilterOption(match.params.forumId, {
      filterOption: {
        tagSets: {
          query: { [tagItem.set]: [tagItem.value] },
          selectedTags: [tagItem.id],
        },
      },
    });

    if (isMobile) {
      onMainBackClick();
    }
  };

  private readonly getChannelIdFromURL = () => this.props.match.params.forumId;

  private readonly getDisableScrollStyle = () =>
    this.props.postShowType !== PostShowTypes.DEFAULT;

  private readonly getPostShowModalView = () =>
    this.props.postShowType !== PostShowTypes.DEFAULT && !this.props.isMobile;

  private readonly resetScrollPosition = () => {
    requestAnimationFrame(() => {
      if (this.props.isMobile) {
        window.scrollTo(0, 0);
      } else {
        this.props.onDesktopRootLayoutScroll?.(130);
      }
    });
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ForumShowContainer),
);
