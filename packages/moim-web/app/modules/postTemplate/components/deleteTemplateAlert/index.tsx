import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";

// components
import ConfirmDialog from "common/components/alertDialog/confirm";

import { useActions, useStoreState } from "app/store";
import useCancelToken from "common/hooks/useCancelToken";
import useRedirect from "common/hooks/useRedirect";

import { DeleteTemplateAlertContext, PostTemplateContext } from "../../context";
import { postTemplateDenormalizer } from "app/models";
import { deletePostTemplate } from "app/actions/postTemplate";
import { MoimURL } from "common/helpers/url";

const DeleteTemplateAlert: React.FC = () => {
  const intl = useIntl();
  const cancelToken = useCancelToken();
  const redirect = useRedirect();
  const { isOpen, id, close } = React.useContext(DeleteTemplateAlertContext);
  const { currentPostTemplate } = React.useContext(PostTemplateContext);
  const { postTemplate } = useStoreState(state => ({
    postTemplate: postTemplateDenormalizer(id ?? "", state.entities),
  }));
  const { dispatchDeletePostTemplate } = useActions({
    dispatchDeletePostTemplate: deletePostTemplate,
  });
  const handleClickDelete = React.useCallback(() => {
    if (postTemplate) {
      dispatchDeletePostTemplate(
        { templateId: postTemplate.id },
        {
          succeed: intl.formatMessage({
            id: "admin_post_template/delete_template_toast_message_success",
          }),
          failed: intl.formatMessage({
            id: "admin_post_template/delete_template_toast_message_failure",
          }),
        },
        cancelToken.current.token,
      );
      close();
      if (currentPostTemplate?.id === postTemplate.id) {
        redirect(new MoimURL.PostTemplate().toString());
      }
    }
  }, [
    currentPostTemplate?.id,
    redirect,
    postTemplate,
    dispatchDeletePostTemplate,
  ]);

  return (
    <ConfirmDialog
      open={isOpen}
      title={
        <FormattedMessage
          id="admin_post_template/delete_template_dialog_title"
          values={{ template_name: postTemplate?.title }}
        />
      }
      content={
        <FormattedMessage id="admin_post_template/delete_template_dialog_body" />
      }
      confirmMessage={
        <FormattedMessage id="admin_post_template/delete_template_dialog_agreement" />
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

export default DeleteTemplateAlert;
