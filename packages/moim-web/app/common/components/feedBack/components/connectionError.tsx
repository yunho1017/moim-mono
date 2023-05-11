import * as React from "react";
import { useIntl } from "react-intl";
import FeedbackBase from "common/components/feedBack/components/base";
import { GhostButton } from "../styled";
import useRedirect from "common/hooks/useRedirect";
import { MoimURL } from "common/helpers/url";

function ConnectionError() {
  const intl = useIntl();
  const redirect = useRedirect();
  const handleClickButton = React.useCallback(() => {
    redirect(new MoimURL.MoimAppHome().toString());
  }, [redirect]);

  return (
    <FeedbackBase
      icon="😢"
      title={intl.formatMessage({ id: "connection_error/title" })}
      description={intl.formatMessage({ id: "connection_error/body" })}
      buttons={[
        <GhostButton onClick={handleClickButton}>
          {intl.formatMessage({ id: "retry_button" })}
        </GhostButton>,
      ]}
    />
  );
}

export default ConnectionError;
