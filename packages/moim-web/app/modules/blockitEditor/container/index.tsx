import * as React from "react";
import * as QueryString from "querystring";
import { goBack } from "connected-react-router";
import { FormattedMessage } from "react-intl";
import { MoimURL } from "common/helpers/url";
// actions
import {
  ActionCreators as DraftActionCreators,
  saveDraft as saveDraftAction,
  updateDraft as updateDraftAction,
  getAllDraftCount as getAllDraftCountAction,
  getDraftData as getDraftDataAction,
} from "app/actions/draft";
import { ActionCreators as SnackBarActionCreators } from "app/actions/snackbar";
import {
  getThreadShow as getThreadAction,
  postThread as postThreadAction,
  updateThread as updateThreadAction,
} from "app/actions/forum";
import useOpenState from "common/hooks/useOpenState";
import useRedirect from "common/hooks/useRedirect";
import useNextAction from "common/hooks/useNextAction";
import { useStoreState, useActions, arrayEqual } from "app/store";
import { useCancelTokenWithCancelHandler } from "common/hooks/useCancelToken";
import { tagSetsSelector } from "app/selectors/forum";
import AlertDialog from "common/components/alertDialog";
import BlockitEditorComponent, { IRefHandler } from "../component";
import { channelIdTemplateSelector } from "app/modules/forum/containers/forumShow/selector";

interface IProps {}

const EMPTY_ARRAY: any[] = [];

const BlockitEditor: React.FC<IProps> = () => {
  const {
    channel: fromChannelId,
    thread: fromThreadId,
    draft: fromDraftId,
    blockPageEdit = false,
  } = (QueryString.parse(location.search.replace("?", "")) as unknown) as {
    channel: string | undefined;
    thread: string | undefined;
    draft: string | undefined;
    blockPageEdit: boolean;
  };
  const {
    cancelTokenSource: getThreadCancelSource,
    handleCancel: handleGetThreadCancel,
  } = useCancelTokenWithCancelHandler();
  const {
    cancelTokenSource: postThreadCancelSource,
  } = useCancelTokenWithCancelHandler();
  const {
    isOpen: isOpenChannelSelectAlert,
    open: openChannelSelectAlert,
    close: closeChannelSelectAlert,
  } = useOpenState();
  const {
    isOpen: isOpenUploadLoadingAlert,
    open: openUploadLoadingAlert,
    close: closeUploadLoadingAlert,
  } = useOpenState();

  const [isThreadLoading, setLoadStatus] = React.useState<boolean | undefined>(
    undefined,
  );

  const [selectedTagItem, setTagItem] = React.useState<Moim.TagSet.ITagItem[]>(
    [],
  );
  const isEditDraft = Boolean(!blockPageEdit && fromChannelId && fromDraftId);
  const isEditThread = Boolean(!blockPageEdit && fromChannelId && fromThreadId);

  const refComponent = React.useRef<IRefHandler>(null);
  const [selectedChannel, setSelectedChannel] = React.useState<Moim.Id | null>(
    fromChannelId ?? null,
  );
  const redirect = useRedirect();

  const {
    dispatchGoBack,
    dispatchOpenSnackBar,
    postThread,
    updateThread,
    getThread,
    getAllDraftCount,
    openDraftList,
    softDeleteDraft,
    updateDraft,
    saveDraft,
    getDraftData,
  } = useActions({
    dispatchGoBack: goBack,
    dispatchOpenSnackBar: SnackBarActionCreators.openSnackbar,
    postThread: postThreadAction,
    updateThread: updateThreadAction,
    getThread: getThreadAction,
    saveDraft: saveDraftAction,
    updateDraft: updateDraftAction,
    softDeleteDraft: DraftActionCreators.softDelete,
    openDraftList: DraftActionCreators.openDraftListModal,
    getAllDraftCount: getAllDraftCountAction,
    getDraftData: getDraftDataAction,
  });

  const fileEntities = useStoreState(state => state.entities.files);
  const draftState = useStoreState(state => state.draftState);
  const preLinkMeeting = useStoreState(state => state.meeting.preLinkMeeting);
  const locationHistory = useStoreState(state => state.app.history);
  const nextAction = useNextAction();

  const tagSets = useStoreState(state => {
    const targetForum = selectedChannel
      ? (state.entities.channels[
          selectedChannel
        ] as Moim.Channel.IForumSimpleChannel)
      : null;

    return targetForum?.list_config.tag_sets
      ? tagSetsSelector(state, targetForum?.list_config.tag_sets)
      : [];
  });
  const targetThreadId = fromThreadId ?? fromDraftId ?? undefined;

  const isAnonymousReaction = useStoreState(state =>
    selectedChannel
      ? Boolean(
          (state.entities.channels[
            selectedChannel
          ] as Moim.Channel.IForumSimpleChannel)?.anonymous_config?.reaction,
        )
      : false,
  );

  // #region immutable safe thread data spread.
  const templateContent = useStoreState(state =>
    selectedChannel
      ? channelIdTemplateSelector(state, selectedChannel)
      : undefined,
  );
  const thread = useStoreState(state =>
    targetThreadId ? state.entities.threads[targetThreadId] : undefined,
  );
  const threadTitle = React.useMemo(() => thread?.title, [thread?.title]);
  const threadContent = useStoreState(state => {
    const thrd = targetThreadId
      ? state.entities.threads[targetThreadId]
      : undefined;
    return thrd?.content;
  }, arrayEqual);
  // #endregion

  const checkUploadDone = React.useCallback(() => {
    const ids = refComponent.current?.editorRef?.getUploadQueue();
    if (!ids) return true;
    const files = ids.map(fid => fileEntities[fid]);
    return !files
      .map(f => f?.status.name ?? "WAITING_FOR_UPLOAD")
      .some(statusName => statusName !== "AVAILABLE");
  }, [fileEntities]);

  // #region 불변성 문제로 tagSetBlockExtractor에서 분리했습니다.
  const contentsTagSet = React.useMemo(() => {
    if (threadContent) {
      const flattenTagSetBlockitItemIds = threadContent
        .filter(block => block.type === "tagSet")
        .map((block: Moim.Blockit.ITagSetBlock) => block.valueId);
      const tagItemIds: Moim.Id[] = [];

      tagSets.forEach((set: Moim.TagSet.ITagSet) =>
        set.items?.forEach(itemId => {
          if (flattenTagSetBlockitItemIds.includes(itemId)) {
            tagItemIds.push(itemId);
          }
        }),
      );

      return tagItemIds;
    }
    return EMPTY_ARRAY;
  }, [tagSets, threadContent]);

  const tagSetFreeContents = React.useMemo(
    () =>
      threadContent?.filter(block => block.type !== "tagSet") ?? EMPTY_ARRAY,
    [threadContent],
  );
  // #endregion

  const handleDraftList = React.useCallback(() => {
    openDraftList();
  }, []);

  const handleClose = React.useCallback(() => {
    if (history.length <= 2) {
      redirect(new MoimURL.MoimAppHome().toString());
    } else {
      const latestHistory =
        locationHistory.locations[locationHistory.locations.length - 2];
      if (
        latestHistory &&
        !MoimURL.BlockitEditor.isSame(latestHistory.pathname)
      ) {
        redirect(latestHistory);
      } else {
        if (fromChannelId) {
          redirect(new MoimURL.Forum({ forumId: fromChannelId }).toString());
        } else {
          dispatchGoBack();
        }
      }
    }
  }, [redirect, locationHistory, fromChannelId, dispatchGoBack]);

  const makeCombinedContents = React.useCallback(
    (contents: Moim.Blockit.Blocks[]) => {
      const combinedContents = contents;
      if (selectedTagItem.length) {
        selectedTagItem.forEach(tagItem => {
          combinedContents.push({
            type: "tagSet",
            setId: tagItem.parentId,
            valueId: tagItem.id,
            content: `${tagItem.set}:${tagItem.value}`,
          });
        });
      }

      return combinedContents;
    },
    [selectedTagItem],
  );

  const handleSaveDraft = React.useCallback(
    async (content: Moim.Blockit.Blocks[], title: string) => {
      const allUploadDone = checkUploadDone();
      if (!allUploadDone) {
        openUploadLoadingAlert();
        return;
      }
      if (!selectedChannel) {
        openChannelSelectAlert();
        return;
      }
      if (!title) {
        dispatchOpenSnackBar({
          textKey: "post_editor/error_no_title",
          type: "error",
        });
        return;
      }

      if (isEditDraft) {
        try {
          await updateDraft({
            channelId: selectedChannel,
            threadId: fromDraftId as string,
            title,
            content: makeCombinedContents(content),
          });
          dispatchOpenSnackBar({
            textKey: "post_editor/save_draft",
            type: "success",
          });
          // eslint-disable-next-line no-empty
        } catch {}
      } else {
        try {
          await saveDraft({
            channelId: selectedChannel,
            title,
            content: makeCombinedContents(content),
          });
          dispatchOpenSnackBar({
            textKey: "post_editor/save_draft",
            type: "success",
          });
          // eslint-disable-next-line no-empty
        } catch {}
      }
    },
    [
      checkUploadDone,
      dispatchOpenSnackBar,
      fromDraftId,
      isEditDraft,
      makeCombinedContents,
      openChannelSelectAlert,
      openUploadLoadingAlert,
      saveDraft,
      selectedChannel,
      updateDraft,
    ],
  );

  const handleSave = React.useCallback(
    async (content: Moim.Blockit.Blocks[], title: string) => {
      if (!blockPageEdit) {
        const allUploadDone = checkUploadDone();
        if (!allUploadDone) {
          openUploadLoadingAlert();
          return;
        }
        if (!selectedChannel) {
          openChannelSelectAlert();
          return;
        }
        if (!title) {
          dispatchOpenSnackBar({
            textKey: "post_editor/error_no_title",
            type: "error",
          });
          return;
        }

        if (isEditThread) {
          // updateThread
          await updateThread({
            channelId: selectedChannel,
            threadId: fromThreadId as string,
            title,
            content: makeCombinedContents(content),
            cancelToken: postThreadCancelSource.current.token,
          });
        } else {
          const newThreadId = await postThread(preLinkMeeting, {
            channelId: selectedChannel,
            title,
            content: makeCombinedContents(content),
            cancelToken: postThreadCancelSource.current.token,
            draftId: fromDraftId ? fromDraftId : undefined,
          });

          if (newThreadId) {
            let redirectUrl = new MoimURL.Forum({
              forumId: selectedChannel ?? "",
            }).toString();

            if (selectedChannel && newThreadId) {
              redirectUrl = new MoimURL.ShowForumThread({
                forumId: selectedChannel,
                threadId: newThreadId,
              }).toString();
            }

            nextAction.trigger("write-post");
            setTimeout(() => {
              redirect(redirectUrl);
            }, 100);
          }

          if (fromDraftId) {
            softDeleteDraft(fromDraftId);
          }
        }
      } else {
        // blockChannel edit mode
      }
    },
    [
      blockPageEdit,
      checkUploadDone,
      selectedChannel,
      isEditThread,
      openUploadLoadingAlert,
      openChannelSelectAlert,
      dispatchOpenSnackBar,
      updateThread,
      fromThreadId,
      makeCombinedContents,
      postThreadCancelSource,
      postThread,
      preLinkMeeting,
      fromDraftId,
      nextAction,
      redirect,
      softDeleteDraft,
    ],
  );

  React.useEffect(() => {
    // common initial call
    getAllDraftCount();
  }, []);

  React.useEffect(() => {
    // thread edit initial call
    if (fromThreadId) {
      setLoadStatus(true);
      getThread(fromThreadId, getThreadCancelSource.current.token).finally(
        () => {
          setLoadStatus(false);
        },
      );
    }

    return () => {
      handleGetThreadCancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromThreadId]);

  React.useEffect(() => {
    if (fromDraftId && fromChannelId) {
      setLoadStatus(true);
      getDraftData({
        channelId: fromChannelId,
        threadId: fromDraftId,
        cancelToken: getThreadCancelSource.current.token,
      }).finally(() => {
        setLoadStatus(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromDraftId, fromChannelId]);

  return (
    <>
      <BlockitEditorComponent
        ref={refComponent}
        id={`blockit-editor-${fromChannelId ?? "ch"}-${fromThreadId ??
          "thr"}-${fromDraftId ?? "dr"}`}
        from={fromChannelId}
        draftCount={draftState.draftCount}
        tagSets={tagSets}
        title={threadTitle}
        contents={
          targetThreadId
            ? tagSetFreeContents
            : templateContent?.content ?? EMPTY_ARRAY
        }
        isLoading={Boolean(isThreadLoading)}
        isEditMode={Boolean(fromThreadId)}
        selectedTagSetItemIds={
          Boolean(selectedTagItem.length)
            ? selectedTagItem.map(item => item.id)
            : contentsTagSet
        }
        disableMention={isAnonymousReaction}
        disableDraftButton={blockPageEdit}
        disableTitleInput={blockPageEdit}
        onClickSaveDraft={handleSaveDraft}
        onClickDraftDialog={handleDraftList}
        onClickSave={handleSave}
        onClickClose={handleClose}
        onChangeSelectChannel={setSelectedChannel}
        onChangeTagItem={setTagItem}
      />
      <AlertDialog
        open={isOpenChannelSelectAlert}
        content={<FormattedMessage id="post_editor_channel_select_alert" />}
        rightButtons={[
          {
            text: <FormattedMessage id="ok_button" />,
            onClick: closeChannelSelectAlert,
          },
        ]}
        onClose={closeChannelSelectAlert}
      />
      <AlertDialog
        key="uploadLoadingAlert"
        open={isOpenUploadLoadingAlert}
        content={<FormattedMessage id="review_write/upload_working_alert" />}
        rightButtons={[
          {
            text: <FormattedMessage id="ok_button" />,
            onClick: closeUploadLoadingAlert,
          },
        ]}
        onClose={closeUploadLoadingAlert}
      />
    </>
  );
};

export default React.memo(BlockitEditor);
