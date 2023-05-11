import * as React from "react";
import FeedbackBase from "common/components/feedBack/components/base";
import { FlatButton, GhostButton } from "../../styled";
import { useProps, useHandlers } from "./hook";

function NotFound() {
  const hookProps = useProps();
  const hookHandlers = useHandlers(hookProps);

  const { intl } = hookProps;
  const { handleClickHomeButton, handleClickBackButton } = hookHandlers;

  const backButton = React.useMemo(
    () =>
      history.length ? (
        <GhostButton onClick={handleClickBackButton}>
          {intl.formatMessage({ id: "404_error/button_back" })}
        </GhostButton>
      ) : null,
    [intl, history.length, handleClickBackButton],
  );

  const homeButton = React.useMemo(
    () => (
      <FlatButton onClick={handleClickHomeButton}>
        {intl.formatMessage({ id: "404_error/button_home" })}
      </FlatButton>
    ),
    [handleClickHomeButton],
  );

  return (
    <FeedbackBase
      icon="🤯"
      title={intl.formatMessage({ id: "404_error/title" })}
      description={intl.formatMessage({ id: "404_error/body" })}
      buttons={[backButton, homeButton]}
    />
  );
}

export default NotFound;
