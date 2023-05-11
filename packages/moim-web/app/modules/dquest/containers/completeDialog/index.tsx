import * as React from "react";
import useOpenState from "common/hooks/useOpenState";
import useRedirect from "common/hooks/useRedirect";
import { useStoreState, useActions } from "app/store";
import { closeDQuestCompleteDialog } from "./actions";
import DQuestCompleteDialogComponent from "../../components/completeDialog";
import { AnalyticsClass } from "common/helpers/analytics/analytics";

const DQuestCompleteDialog = ({}) => {
  const { isOpen, open, close } = useOpenState();
  const redirect = useRedirect();
  const messages = useStoreState(state => state.dquestCompleteDialog.messages);

  const { close: closeAction } = useActions({
    close: closeDQuestCompleteDialog,
  });

  const visibleMessage = messages[0];

  const handleMessageCheck = React.useCallback(
    (messageId: Moim.Id) => {
      AnalyticsClass.getInstance().event({
        category: "quest",
        action: "quest_show_achieve_quest_dialog_next",
        name: visibleMessage?.id,
      });

      if (visibleMessage?.buttonLink) {
        redirect(visibleMessage.buttonLink);
      }
      closeAction(messageId);
      if (messages.length <= 1) {
        close();
      }
    },
    [close, closeAction, messages.length, redirect, visibleMessage?.buttonLink],
  );

  React.useEffect(() => {
    if (messages.length) {
      open();
    }
  }, [messages]);

  return (
    <DQuestCompleteDialogComponent
      open={isOpen}
      id={visibleMessage?.id}
      title={visibleMessage?.title}
      message={visibleMessage?.message}
      buttonText={visibleMessage?.buttonText}
      totalMessageCount={messages.length}
      onMessageCheck={handleMessageCheck}
    />
  );
};

export default React.memo(DQuestCompleteDialog);
