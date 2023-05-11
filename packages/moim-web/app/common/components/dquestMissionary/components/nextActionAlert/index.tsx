import * as React from "react";
import { FormattedMessage } from "react-intl";
import useOpenState from "common/hooks/useOpenState";
import useRedirect from "common/hooks/useRedirect";
import AlertDialog from "common/components/alertDialog";
import useNextAction from "common/hooks/useNextAction";

interface IProps {}

const NextActionAlert: React.FC<IProps> = ({}) => {
  const nextAction = useNextAction();
  const refNextActionUrl = React.useRef<string>("");
  const {
    isOpen: isOpenNextActionAlert,
    open: openNextActionAlert,
    close: closeNextActionAlert,
  } = useOpenState();
  const redirect = useRedirect();

  const handleConfirmNextAction = React.useCallback(() => {
    if (refNextActionUrl.current) {
      redirect(refNextActionUrl.current);
    }
    closeNextActionAlert();
  }, [closeNextActionAlert, redirect]);

  const handleCancelNextAction = React.useCallback(() => {
    closeNextActionAlert();
  }, [closeNextActionAlert]);

  const handleOpenAlert = React.useCallback((params: any) => {
    if (params.type === "go-to" && params.payload.withAlert) {
      refNextActionUrl.current = params.payload.url;
      openNextActionAlert();
    }
  }, []);

  React.useEffect(() => {
    const id = nextAction.addEventListener("write-post", handleOpenAlert);
    return () => {
      nextAction.removeEventListener(id);
    };
  }, []);

  return (
    <AlertDialog
      open={isOpenNextActionAlert}
      title={<FormattedMessage id="dialog_message_redirect_to_from_title" />}
      content={<FormattedMessage id="dialog_message_redirect_to_from_body" />}
      rightButtons={[
        {
          text: <FormattedMessage id="button_cancel" />,
          onClick: handleCancelNextAction,
        },
        {
          text: <FormattedMessage id="button_ok" />,
          onClick: handleConfirmNextAction,
        },
      ]}
      onClose={handleCancelNextAction}
    />
  );
};

export default NextActionAlert;
