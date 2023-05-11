// vendor
import * as React from "react";
import axios, { CancelTokenSource } from "axios";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { bindActionCreators } from "redux";
import {
  replace as replaceAction,
  push as pushAction,
} from "connected-react-router";
import { injectIntl, WrappedComponentProps } from "react-intl";
// interfaces
import { IAppState } from "app/rootReducer";
import { AppDispatch } from "app/store";
// actions
import {
  ActionCreators as DraftActionCreators,
  saveDraft as saveDraftAction,
  updateDraft as updateDraftAction,
  getAllDraftCount as getAllDraftCountAction,
  getDraftData as getDraftDataAction,
} from "app/actions/draft";
import {
  ActionCreators as ForumActionCreators,
  postThread,
  getThread as getThreadAction,
  updateThread,
} from "app/actions/forum";
// utils
import isEmpty from "common/components/richEditor/helpers/isEmpty";
import { tagSetBlockExtractor } from "./helper";
// components
import ForumEditor from "../../components/editor";
import { MoimURL } from "common/helpers/url";
import { LoadingIcon } from "common/components/loading";
import { EmptyWrapper } from "./styled";
import IsMobileViewport, {
  IRefHandler,
} from "common/components/isMobileViewport";
// reselect
import { PermissionDeniedFallbackType, ItemIdTypes } from "app/enums";
import {
  currentChannelTemplateSelector,
  currentDraftSelector,
  currentThreadLoadingSelector,
  currentThreadSelector,
} from "app/modules/forum/containers/forumShow/selector";
import { selectCurrentForum, tagSetsSelector } from "app/selectors/forum";
import PermissionChecker from "common/components/permissionChecker";
import {
  hasPermissionSelector,
  permissionLoadingSelector,
} from "app/selectors/permission";
import { AnalyticsClass } from "common/helpers/analytics/analytics";
import { withRedirect, RedirectHOCProps } from "common/hooks/useRedirect";
import { withNextAction, NextActionHOCProps } from "common/hooks/useNextAction";

function mapStateToProps(state: IAppState) {
  const forum = selectCurrentForum(state);
  const currentThread = currentThreadSelector(state);
  return {
    hasForum: Boolean(forum),
    hasTemplate: Boolean(forum?.thread_template_ids?.length),
    tagSets: forum?.list_config.tag_sets
      ? tagSetsSelector(state, forum?.list_config.tag_sets)
      : [],
    locationHistory: state.app.history,
    forumEditorPage: state.forumEditorPage,
    currentUserId: state.app.currentUserId,
    currentForumDatum: currentThread,
    postTemplate: currentChannelTemplateSelector(state),
    isLoadingForumShow: currentThreadLoadingSelector(state),
    isDraftLoading: state.draftState.isLoading,
    hasWritePostPermission: hasPermissionSelector(
      state,
      state.forumData.currentForumId,
      "WRITE_POST",
      currentThread?.author,
    ),
    hasManagePostPermission: hasPermissionSelector(
      state,
      state.forumData.currentForumId,
      "MANAGE_POST",
      currentThread?.author,
    ),
    isPermissionLoading: permissionLoadingSelector(
      state,
      state.forumData.currentForumId,
      "MANAGE_POST",
    ),
    draftState: state.draftState,
    currentDraft: currentDraftSelector(state),
    preLinkMeeting: state.meeting.preLinkMeeting,
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return bindActionCreators(
    {
      postThread,
      updateThread,
      getThread: getThreadAction,
      clearCurrentThread: ForumActionCreators.clearCurrentThread,
      replace: replaceAction,
      push: pushAction,
      saveDraft: saveDraftAction,
      updateDraft: updateDraftAction,
      softDeleteDraft: DraftActionCreators.softDelete,
      openDraftList: DraftActionCreators.openDraftListModal,
      setCurrentDraft: DraftActionCreators.setCurrentDraft,
      getAllDraftCount: getAllDraftCountAction,
      getDraftData: getDraftDataAction,
    },
    dispatch,
  );
}

interface IProps
  extends RouteComponentProps<Moim.IMatchParams>,
    WrappedComponentProps,
    ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps>,
    RedirectHOCProps,
    NextActionHOCProps {
  mode: "new" | "edit";
  isModal?: boolean;
  onBackClick(): void;
}

interface IState {
  hasContent: boolean;
  hasError: boolean;
  tempTitle: string;
  isPermissionLoading?: boolean;
  tempContent: Moim.Blockit.Blocks[];
}

class ForumEditorContainer extends React.Component<IProps, IState> {
  public state: IState = {
    hasContent: false,
    hasError: false,
    tempTitle: "",
    tempContent: [{ type: "text", content: "" }],
    isPermissionLoading: this.props.isPermissionLoading,
  };
  private readonly refIsMobile = React.createRef<IRefHandler>();
  private readonly cancelToken: CancelTokenSource = axios.CancelToken.source();

  public static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  public componentDidMount() {
    const { mode, getAllDraftCount } = this.props;
    getAllDraftCount();

    if (mode === "edit") {
      if (this.isDraftPost()) {
        this.setDraftPost();
      } else {
        this.fetchThread();
      }
    }

    this.setState({});
  }

  public componentDidUpdate(prevProps: IProps, prevState: IState) {
    const {
      mode,
      currentForumDatum,
      currentUserId,
      isPermissionLoading,
      getAllDraftCount,
      match,
      currentDraft,
      replace,
    } = this.props;
    const { hasError } = this.state;

    if (
      mode === "edit" &&
      this.isDraftPost() &&
      prevProps.currentDraft &&
      !currentDraft &&
      match.params.forumId
    ) {
      replace(
        new MoimURL.CreateForumThread({
          forumId: match.params.forumId,
        }).toString(),
      );
    }

    if (
      mode === "edit" &&
      (match.params.forumId !== prevProps.match.params.forumId ||
        match.params.threadId !== prevProps.match.params.threadId)
    ) {
      if (this.isDraftPost()) {
        this.setDraftPost();
      } else {
        this.fetchThread();
      }
    }

    if (mode !== prevProps.mode && mode === "new") {
      this.props.clearCurrentThread();
      this.setState({
        hasContent: false,
        tempTitle: "",
        tempContent: [{ type: "text", content: "" }],
      });
    }

    if (!prevState.hasError && hasError) {
      this.setState({ hasError: false });
    }

    if (
      currentForumDatum?.id !== prevProps.currentForumDatum?.id ||
      currentUserId !== prevProps.currentUserId
    ) {
      getAllDraftCount();
    }

    if (isPermissionLoading !== prevProps.isPermissionLoading) {
      this.setState({
        isPermissionLoading,
      });
    }
  }

  public componentWillUnmount() {
    this.cancelToken.cancel();
  }

  public render() {
    const {
      hasForum,
      hasTemplate,
      intl,
      mode,
      forumEditorPage,
      isLoadingForumShow,
      isDraftLoading,
      postTemplate,
      currentForumDatum,
      tagSets,
      isModal,
      draftState,
      preLinkMeeting,
      onBackClick,
    } = this.props;
    const { hasContent, isPermissionLoading } = this.state;
    const hasPermission = this.hasPermission();
    const isDraftPost = this.isDraftPost();

    if (
      !hasForum ||
      (hasTemplate && !postTemplate) ||
      (mode === "edit" && (isDraftPost ? isDraftLoading : isLoadingForumShow))
    ) {
      return (
        <EmptyWrapper>
          <LoadingIcon />
        </EmptyWrapper>
      );
    }
    const { title, contents } = this.getTitleAndContents();
    const { contentsWithoutTagSet, selectedTagItemIds } = tagSetBlockExtractor(
      tagSets,
      contents,
    );

    return (
      <>
        <PermissionChecker
          fallbackType={PermissionDeniedFallbackType.SCREEN}
          hasPermission={hasPermission}
          isLoading={isPermissionLoading}
          onBackClick={onBackClick}
        >
          <ForumEditor
            id={currentForumDatum?.id || mode}
            isNewPost={this.isNewPost()}
            isDraftPost={isDraftPost}
            isModal={isModal}
            title={title}
            contents={contentsWithoutTagSet}
            tagSets={tagSets}
            selectedTagSetItemIds={selectedTagItemIds}
            hasContent={hasContent}
            titlePlaceholder={intl.formatMessage({
              id: "post_editor/title_input_field_placeholder",
            })}
            contentPlaceholder={intl.formatMessage({
              id: "post_editor/body_input_field_placeholder",
            })}
            draftCount={draftState.draftCount}
            isDraftSaving={draftState.isSaving}
            isPosting={forumEditorPage.isLoading}
            preLinkMeeting={preLinkMeeting}
            hasError={this.state.hasError}
            onChange={this.handleContentChange}
            onSave={this.handleSave}
            onDiscard={this.handleDiscard}
            onSaveDraft={this.handleSaveDraft}
            onOpenDraftList={this.handleOpenDraftList}
          />
        </PermissionChecker>
        <IsMobileViewport ref={this.refIsMobile} />
      </>
    );
  }

  private readonly isMobile = () => Boolean(this.refIsMobile.current?.isMobile);

  private readonly handleOpenDraftList = () => {
    setTimeout(() => {
      this.props.openDraftList();
    }, 300);
  };

  private readonly handleSaveDraft = (param: {
    title: string;
    content: Moim.Blockit.Blocks[];
  }) => {
    const forumId = this.getForumId();
    const threadId = this.getThreadId();
    const { mode, updateDraft, saveDraft } = this.props;

    AnalyticsClass.getInstance().forumListWritePostSave({
      forumId: forumId ?? "",
    });

    if (forumId) {
      if (threadId && mode === "edit") {
        updateDraft({
          channelId: forumId,
          threadId,
          title: param.title,
          content: param.content,
        });
      } else {
        saveDraft({
          channelId: forumId,
          title: param.title,
          content: param.content,
        });
      }
    }
  };

  private readonly handleContentChange = ({
    title,
    content,
  }: {
    title?: string;
    content?: Moim.Blockit.Blocks[];
  }) => {
    if (title) {
      this.setState({
        tempTitle: title,
      });
    }
    if (content) {
      const { isEmptyText, isEmptyFile, isEmptyLinkPreview } = isEmpty(content);

      this.setState({
        hasContent: !isEmptyText || !isEmptyFile || !isEmptyLinkPreview,
      });
    }
  };

  private readonly getTitleAndContents = (): {
    title: string;
    contents: Moim.Blockit.Blocks[];
  } => {
    const { mode, currentForumDatum, postTemplate, currentDraft } = this.props;
    if (mode === "edit" && !this.state.hasError) {
      if (this.isDraftPost() && currentDraft) {
        return {
          title: currentDraft.title,
          contents: currentDraft.content,
        };
      } else if (currentForumDatum) {
        return {
          title: currentForumDatum.title,
          contents: currentForumDatum.content,
        };
      }
    }

    if (mode === "new" && postTemplate) {
      return {
        title: this.state.tempTitle,
        contents: postTemplate.content,
      };
    }

    return {
      title: this.state.tempTitle,
      contents: this.state.tempContent,
    };
  };

  private readonly getForumId = () => this.props.match.params.forumId;
  private readonly getThreadId = () => this.props.match.params.threadId;
  private readonly hasPermission = () => {
    const {
      hasWritePostPermission,
      hasManagePostPermission,
      mode,
      currentUserId,
      currentForumDatum,
    } = this.props;

    return (
      (mode === "new" || this.isDraftPost()
        ? hasWritePostPermission
        : hasManagePostPermission) ||
      currentUserId === currentForumDatum?.user.id
    );
  };

  private readonly handleSave = (params: {
    title: string;
    content: Moim.Blockit.Blocks[];
  }) => {
    const forumId = this.getForumId();
    const threadId = this.getThreadId();
    const isDraftPost = this.isDraftPost();

    if (this.props.mode === "new" || isDraftPost) {
      if (forumId) {
        this.props
          .postThread(this.props.preLinkMeeting, {
            channelId: forumId,
            title: params.title,
            content: params.content,
            cancelToken: this.cancelToken.token,
            draftId: isDraftPost ? threadId : undefined,
          })
          .then(newThreadId => {
            if (newThreadId) {
              let redirectUrl = new MoimURL.Forum({
                forumId: forumId ?? "",
              }).toString();

              if (forumId && newThreadId) {
                redirectUrl = new MoimURL.ShowForumThread({
                  forumId,
                  threadId: newThreadId,
                }).toString();
              }
              this.props.nextAction.trigger("write-post");
              setTimeout(() => {
                this.props.redirect(redirectUrl);
              }, 100);
            }
          });
        if (isDraftPost && threadId) {
          this.props.softDeleteDraft(threadId);
        }
      }
    } else {
      if (forumId && threadId) {
        this.props.updateThread({
          channelId: forumId,
          threadId,
          title: params.title,
          content: params.content,
          cancelToken: this.cancelToken.token,
        });
      }
    }

    AnalyticsClass.getInstance().forumListWritePostPublish({
      forumId: forumId ?? "",
    });
  };

  private readonly handleDiscard = () => {
    const isMobile = this.isMobile();
    const forumId = this.getForumId();
    this.props.onBackClick();
    if (forumId) {
      const latestHistory = this.props.locationHistory.locations[
        this.props.locationHistory.locations.length - 2
      ];

      if (!isMobile && latestHistory) {
        this.props.replace(latestHistory.pathname);
      } else {
        this.props.push(
          new MoimURL.Forum({
            forumId,
          }).toString(),
        );
      }
    }
  };

  private readonly fetchThread = () => {
    const { getThread } = this.props;
    const forumId = this.getForumId();
    const threadId = this.getThreadId();
    getThread(
      {
        parentId: forumId || "",
        threadId: threadId || "",
      },
      this.cancelToken.token,
    );
  };

  private readonly isNewPost = () => this.props.mode === "new";

  private readonly isDraftPost = () => {
    const threadId = this.getThreadId();
    return Boolean(threadId?.startsWith(ItemIdTypes.DRAFT));
  };

  private readonly setDraftPost = () => {
    const { getDraftData } = this.props;
    const channelId = this.getForumId();
    const threadId = this.getThreadId();

    if (channelId && threadId && this.isDraftPost()) {
      getDraftData({
        channelId,
        threadId,
        cancelToken: this.cancelToken.token,
      });
    }
  };
}

export default withNextAction(
  withRedirect(
    injectIntl(
      withRouter(
        connect(mapStateToProps, mapDispatchToProps)(ForumEditorContainer),
      ),
    ),
  ),
);
