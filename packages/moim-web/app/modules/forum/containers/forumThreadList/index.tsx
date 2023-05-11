// vendor
import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router";
import Axios, { CancelTokenSource } from "axios";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { isEqual } from "lodash";

import { AppDispatch } from "app/store";
import {
  ActionCreators as ForumActionCreators,
  getPinnedPostList,
  getThreadList as getThreadListAction,
  getThreadListWithOne as getThreadListWithOneAction,
  getThreadListWithRedirect as getThreadListWithRedirectAction,
} from "app/actions/forum";
import { ActionCreators as SideNavigationActionCreators } from "app/actions/sideNavigation";
import { IAppState } from "app/rootReducer";
import { selectCurrentForumWithId } from "app/selectors/forum";
import IsMobileViewport, {
  IRefHandler,
} from "common/components/isMobileViewport";
import ForumThreadList from "app/modules/forum/components/forumThreadList";
import { MoimURL } from "common/helpers/url";
import ForumThreadListHelmet from "./helmet";

import { PostShowTypes, ItemIdTypes } from "app/enums";

interface IBaseProps extends RouteComponentProps<Moim.IMatchParams> {
  postShowType?: Moim.Enums.PostShowType;
}

function mapStateToProps(state: IAppState, ownProps: IBaseProps) {
  const currentForum = selectCurrentForumWithId(
    state,
    ownProps.match.params.forumId ?? "",
  );

  return {
    currentUserId: state.app.currentUserId,
    paging: state.thread.threadIds[state.forumData.currentForumId]?.paging,
    firstThreadId: state.thread.threadIds[currentForum?.id ?? ""]?.data[0],
    sortingOptions: currentForum?.sorting_options,
    filterOption: state.forumListPage.filterOption,
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return bindActionCreators(
    {
      getThreadList: getThreadListAction,
      getThreadListWithRedirect: getThreadListWithRedirectAction,
      getThreadListWithOne: getThreadListWithOneAction,
      dispatchGetPinnedPostList: getPinnedPostList,
      clearThreadList: ForumActionCreators.clearThreadList,
      expandSideNavigation: SideNavigationActionCreators.expandSideNavigation,
    },
    dispatch,
  );
}

interface IProps
  extends IBaseProps,
    ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps> {}

class ForumThreadListContainer extends React.PureComponent<IProps> {
  private readonly refIsMobileViewport = React.createRef<IRefHandler>();
  private readonly childScrollRef = React.createRef<HTMLDivElement>();
  private readonly cancelToken: CancelTokenSource;

  public constructor(props: IProps) {
    super(props);
    this.cancelToken = Axios.CancelToken.source();
  }

  public componentDidMount() {
    const { match } = this.props;
    const { threadId } = match.params;

    if (threadId && !threadId.startsWith(ItemIdTypes.DRAFT)) {
      this.getThreadListWithOne();
    } else {
      this.getThreadList({
        redirect: !this.getHidePostShow(),
        withoutBefore: true,
      });
    }
  }

  public componentDidUpdate(prevProps: IProps) {
    const { match, currentUserId, filterOption, sortingOptions } = this.props;
    const { threadId, forumId: currentForumId } = match.params;
    const isDiffForumId =
      currentForumId &&
      (currentForumId !== prevProps.match.params.forumId ||
        currentUserId !== prevProps.currentUserId);

    if (!currentForumId) return;

    if (currentForumId !== prevProps.match.params.forumId) {
      this.resetScrollPosition();
    }

    if (isDiffForumId) {
      if (threadId) {
        this.getThreadListWithOne();
      } else {
        this.getThreadList({
          redirect: !this.getHidePostShow(),
          withoutBefore: true,
        });
      }
    } else {
      if (
        !isDiffForumId &&
        !this.getHidePostShow() &&
        prevProps.match.params.threadId &&
        threadId === undefined &&
        !this.isWritingFormUrl()
      ) {
        this.getThreadList({ redirect: true, withoutBefore: true });
        return;
      }

      if (sortingOptions?.[0] && prevProps.sortingOptions?.[0]) {
        const prevSorting = prevProps.sortingOptions[0].sort;
        const prevOrder = prevProps.sortingOptions[0].order;
        const sorting = sortingOptions[0].sort;
        const order = sortingOptions[0].order;

        if (prevSorting !== sorting || prevOrder !== order) {
          this.getThreadList({
            redirect: !this.getHidePostShow(),
            withoutBefore: true,
          });
          return;
        }
      }

      if (!isEqual(prevProps.filterOption, filterOption)) {
        this.getThreadList({
          newFilter: true,
          redirect: !this.getHidePostShow(),
          withoutBefore: true,
        });
        return;
      }
    }
  }

  public componentWillUnmount() {
    this.cancelToken.cancel();
  }

  public render() {
    const { paging, filterOption } = this.props;
    const forumId = this.getForumIdFromUrl();
    const threadId = this.getThreadIdFromUrl();
    const hasFiltered =
      Boolean(filterOption.searchDateRange) ||
      Boolean(filterOption.tagSets?.selectedTags.length);

    return (
      <>
        <ForumThreadListHelmet />
        <ForumThreadList
          forumId={forumId!}
          selectedThreadId={threadId!}
          paging={paging}
          hasFiltered={hasFiltered}
          scrollRef={this.childScrollRef}
          onLoadMoreThread={this.handleLoadMoreThread}
          onRefresh={this.handleRefresh}
          onClickSideBarButton={this.handleClickExpandSideNavigationButton}
        />
        <IsMobileViewport ref={this.refIsMobileViewport} />
      </>
    );
  }

  private readonly handleLoadMoreThread = (pagingKey: keyof Moim.IPaging) => {
    const { paging, sortingOptions, filterOption, getThreadList } = this.props;
    const forumId = this.getForumIdFromUrl();
    if (forumId) {
      const params = {
        [pagingKey]: paging[pagingKey],
        channelId: forumId,
        threadId: forumId,
        sort:
          sortingOptions && sortingOptions.length > 0
            ? sortingOptions[0].sort
            : undefined,
        order:
          sortingOptions && sortingOptions.length > 0
            ? sortingOptions[0].order
            : undefined,
        tagSets: filterOption.tagSets?.query,
      };
      getThreadList(params, this.cancelToken.token, pagingKey);
    }
  };

  private readonly getForumIdFromUrl = () => this.props.match.params.forumId;
  private readonly getThreadIdFromUrl = () => this.props.match.params.threadId;

  private readonly getThreadListWithOne = () => {
    const {
      sortingOptions,
      filterOption,
      getThreadListWithOne,
      dispatchGetPinnedPostList,
    } = this.props;
    const forumId = this.getForumIdFromUrl();
    const threadId = this.getThreadIdFromUrl();

    if (forumId && threadId) {
      getThreadListWithOne(
        {
          channelId: forumId,
          sort:
            sortingOptions && sortingOptions.length > 0
              ? sortingOptions[0].sort
              : undefined,
          order:
            sortingOptions && sortingOptions.length > 0
              ? sortingOptions[0].order
              : undefined,
          tagSets: filterOption.tagSets?.query,
        },
        this.cancelToken.token,
        threadId,
      );
      dispatchGetPinnedPostList(
        {
          channelId: forumId,
        },
        this.cancelToken.token,
      );
    }
  };

  private readonly getThreadList = (
    options: {
      redirect?: boolean;
      newFilter?: boolean;
      withoutBefore?: boolean;
    } = {
      redirect: false,
      newFilter: false,
      withoutBefore: false,
    },
  ) => {
    const {
      sortingOptions,
      filterOption,
      firstThreadId,
      getThreadList,
      clearThreadList,
      getThreadListWithRedirect,
      dispatchGetPinnedPostList,
    } = this.props;
    const forumId = this.getForumIdFromUrl();
    if (forumId) {
      const params: Moim.Forum.IGetThreadsRequest = {
        before: options.withoutBefore ? undefined : firstThreadId || undefined,
        channelId: forumId,
        sort:
          sortingOptions && sortingOptions.length > 0
            ? sortingOptions[0].sort
            : undefined,
        order:
          sortingOptions && sortingOptions.length > 0
            ? sortingOptions[0].order
            : undefined,
        tagSets: filterOption.tagSets?.query,
      };
      const isMobile = this.isMobile();

      if (options.newFilter) {
        clearThreadList({ channelId: forumId });
      }

      if (options.redirect && !this.isWritingFormUrl() && !isMobile) {
        getThreadListWithRedirect(params, this.cancelToken.token);
      } else {
        getThreadList(params, this.cancelToken.token);
        dispatchGetPinnedPostList(
          {
            channelId: forumId,
          },
          this.cancelToken.token,
        );
      }
    }
  };

  private readonly isWritingFormUrl = () => {
    const { match } = this.props;

    return (
      MoimURL.CreateForumThread.isSameExact(match.path) ||
      MoimURL.EditForumThread.isSameExact(match.path)
    );
  };

  private readonly refreshThreadList = () => {
    const { getThreadList, paging, sortingOptions, filterOption } = this.props;
    const forumId = this.getForumIdFromUrl();

    if (forumId) {
      getThreadList(
        {
          ...paging,
          channelId: forumId,
          sort:
            sortingOptions && sortingOptions.length > 0
              ? sortingOptions[0].sort
              : undefined,
          order:
            sortingOptions && sortingOptions.length > 0
              ? sortingOptions[0].order
              : undefined,
          tagSets: filterOption.tagSets?.query,
        },
        this.cancelToken.token,
      );
    }
  };

  private readonly handleRefresh = () => {
    this.refreshThreadList();
  };

  private readonly handleClickExpandSideNavigationButton = () => {
    const { expandSideNavigation } = this.props;

    expandSideNavigation();
  };

  private readonly isMobile = () =>
    Boolean(this.refIsMobileViewport.current?.isMobile);

  private readonly getHidePostShow = () =>
    this.props.postShowType !== PostShowTypes.DEFAULT && !this.isMobile();

  private readonly resetScrollPosition = () => {
    requestAnimationFrame(() => {
      if (this.isMobile()) {
        window.scrollTo(0, 0);
      } else {
        this.childScrollRef.current?.scrollTo(0, 0);
      }
    });
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ForumThreadListContainer),
);
