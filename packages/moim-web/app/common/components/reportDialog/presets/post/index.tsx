import React from "react";
import { useIntl } from "react-intl";

import GlobalReportDialogBase from "../../base";

import { useActions, useStoreState } from "app/store";
import { ActionCreators } from "./actions";

const config = {
  id: "post",
  title: "dialog_report_content_title",
  placeholder: "dialog_report_content_placeholder",
};

export default function GlobalPostReportDialog() {
  const intl = useIntl();
  const { isOpen, threadId } = useStoreState(state => ({
    isOpen: state.globalReportDialog.post.open,
    threadId: state.globalReportDialog.post.threadId,
  }));

  const { onClose } = useActions({ onClose: ActionCreators.close });

  const snackbarMessage = React.useMemo(
    () => ({
      getSucceed: () =>
        intl.formatMessage({ id: "snack_bar_message_report_success" }),

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
