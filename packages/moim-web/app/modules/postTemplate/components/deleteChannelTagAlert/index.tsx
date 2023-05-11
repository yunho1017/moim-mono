import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";
// components
import ConfirmDialog from "common/components/alertDialog/confirm";
import {
  DeleteChannelTagAlertContext,
  PostTemplateContext,
} from "../../context";

import { useActions, useStoreState } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";
import { channelDenormalizer } from "app/models";
import { updatePostTemplate } from "app/actions/postTemplate";

const ChannelDeleteConfirmDialog: React.FC = () => {
  const intl = useIntl();
  const cancelToken = useCancelToken();
  const { isOpen, id, close } = React.useContext(DeleteChannelTagAlertContext);
  const { currentPostTemplate } = React.useContext(PostTemplateContext);
  const { channel } = useStoreState(state => ({
    channel: channelDenormalizer(id ?? "", state.entities),
  }));
  const { dispatchUpdatePostTemplate } = useActions({
    dispatchUpdatePostTemplate: updatePostTemplate,
  });
  const handleClickDelete = React.useCallback(() => {
    if (currentPostTemplate) {
      dispatchUpdatePostTemplate(
        {
          templateId: currentPostTemplate.id,
          channelIds: currentPostTemplate.channelIds?.filter(
            channel => channel !== id,
          ),
        },
        {
          succeed: intl.formatMessage({
            id: "admin_post_template/remove_channel_toast_message_success",
          }),
          failed: intl.formatMessage({
            id: "admin_post_template/remove_channel_toast_message_failure",
          }),
        },
        cancelToken.current.token,
      );
      close();
    }
  }, [currentPostTemplate, dispatchUpdatePostTemplate]);

  return (
    <ConfirmDialog
      open={isOpen}
      title={
        <FormattedMessage
          id="admin_post_template/remove_channel_dialog_title"
          values={{ channel_name: channel?.name }}
        />
      }
      content={
        <FormattedMessage
          id="admin_post_template/remove_channel_dialog_body"
          values={{ template_name: currentPostTemplate?.title }}
        />
      }
      confirmMessage={
        <FormattedMessage id="admin_post_template/remove_channel_dialog_agreement" />
      }
      positiveButtonProps={{
        text: intl.formatMessage({ id: "button_ok" }),
        onClick: handleClickDelete,
      }}
      negativeButtonProps={{
        text: intl.formatMessage({ id: "button_cancel" }),
        onClick: close,
      }}
      onClose={close}
    />
  );
};

export default ChannelDeleteConfirmDialog;
