import React from "react";
import { useIntl } from "react-intl";

import GlobalReportDialogBase from "../../base";

import { useActions, useStoreState } from "app/store";
import { ActionCreators } from "./actions";

const config = {
  id: "user",
  title: "dialog_report_user_title",
  placeholder: "dialog_report_user_placeholder",
};

export default function GlobalUserReportDialog() {
  const intl = useIntl();
  const { isOpen, threadId } = useStoreState(state => ({
    isOpen: state.globalReportDialog.user.open,
    threadId: state.globalReportDialog.user.threadId,
  }));

  const { onClose } = useActions({ onClose: ActionCreators.close });

  const snackbarMessage = React.useMemo(
    () => ({
      getSucceed: () =>
        intl.formatMessage({ id: "snack_bar_message_report_user_success" }),

      getFailed: (code?: string) => {
        switch (code) {
          case "ALREADY_BLOCKED":
            return intl.formatMessage({
              id: "snack_bar_message_report_repeated",
            });

          default:
            return intl.formatMessage({ id: "snack_bar_message_report_fail" });
        }
      },
    }),
    [intl],
  );

  return (
    <GlobalReportDialogBase
      isOpen={isOpen}
      threadId={threadId}
      id={config.id}
      title={config.title}
      placeholder={config.placeholder}
      snackbarMessage={snackbarMessage}
      onClose={onClose}
    />
  );
}
