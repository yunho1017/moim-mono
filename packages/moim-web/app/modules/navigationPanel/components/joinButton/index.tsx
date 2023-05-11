import * as React from "react";
import { FormattedMessage } from "react-intl";
import { useProps, useHandlers } from "./hook";
import JoinButtonView from "./component";

function JoinButton() {
  const hookProps = useProps();
  const hookHandlers = useHandlers(hookProps);

  const { joinButtonText } = hookProps;
  const { handleClickButton } = hookHandlers;

  const label = React.useMemo(
    () => (
      <FormattedMessage
        id="child_moim_join_button"
        values={{
          ref_join_button: joinButtonText?.singular ?? "",
        }}
      />
    ),
    [joinButtonText],
  );
  return <JoinButtonView label={label} onClick={handleClickButton} />;
}

export default JoinButton;
