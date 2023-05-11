import * as React from "react";
import { useIntl } from "react-intl";

import { UserSelectDialogWithSearchHooks } from "app/modules/userSelectDialog";
import useNewDirectMessageDialog from "common/hooks/useNewDirectMessageDialog";

// TODO: connect search user api
export default function NewDirectMessageDialog() {
  const intl = useIntl();
  const {
    open,
    closeNewDirectMessageDialog,
    handleCreateDirectMessage,
  } = useNewDirectMessageDialog();

  return (
    <UserSelectDialogWithSearchHooks
      open={open}
      onClose={closeNewDirectMessageDialog}
      title={intl.formatMessage({
        id: "select_members/title",
      })}
      placeholder={intl.formatMessage({
        id: "select_members/input_field_placeholder",
      })}
      nextButtonText={intl.formatMessage({
        id: "select_members/input_field_go_button",
      })}
      emptyTextId="no_user_found_message"
      isMultipleSelect={false}
      onNext={handleCreateDirectMessage}
    />
  );
}
