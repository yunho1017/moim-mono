import * as React from "react";
import { useIntl } from "react-intl";
import FeedbackBase from "common/components/feedBack/components/base";

function ServerMaintenance() {
  const intl = useIntl();

  return (
    <FeedbackBase
      icon="🛠"
      title={intl.formatMessage({ id: "downtime_dialog_title" })}
      description={intl.formatMessage({ id: "downtime_dialog_body" })}
    />
  );
}

export default ServerMaintenance;
