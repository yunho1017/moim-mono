import { useCallback } from "react";
import { useActions, useStoreState } from "app/store";
import useCancelToken from "./useCancelToken";
import useRedirect from "./useRedirect";

import {
  ActionCreators as DirectMessageDialogActionCreators,
  createDirectMessage,
} from "app/actions/directMessage";
import { MoimURL } from "common/helpers/url";
import useSideNavigationPanel from "./useSideNavigationPanel";

function useNewDirectMessageDialog() {
  const { open } = useStoreState(state => ({
    open: state.newDirectMessageDialog.open,
  }));

  const {
    openNewDirectMessageDialog,
    closeNewDirectMessageDialog,
    dispatchCreateDirectMessage,
  } = useActions({
    openNewDirectMessageDialog:
      DirectMessageDialogActionCreators.openNewDirectMessageDialog,
    closeNewDirectMessageDialog:
      DirectMessageDialogActionCreators.closeNewDirectMessageDialog,
    dispatchCreateDirectMessage: createDirectMessage,
  });
  const cancelToken = useCancelToken();
  const redirect = useRedirect();
  const { collapseSideNavigation } = useSideNavigationPanel();
  const handleCreateDirectMessage = useCallback(
    async (userIds: Moim.Id[]) => {
      try {
        const createdDirectMessageId = await dispatchCreateDirectMessage(
          { direct_message: { invitees: userIds } },
          cancelToken.current.token,
        );
        redirect(
          new MoimURL.DirectMessageShow({
            directMessageId: createdDirectMessageId || "",
          }).toString(),
        );
        closeNewDirectMessageDialog();
        collapseSideNavigation();
      } catch {}
    },
    [
      cancelToken,
      closeNewDirectMessageDialog,
      collapseSideNavigation,
      dispatchCreateDirectMessage,
      redirect,
    ],
  );

  return {
    open,
    handleCreateDirectMessage,
    openNewDirectMessageDialog,
    closeNewDirectMessageDialog,
  };
}

export default useNewDirectMessageDialog;
