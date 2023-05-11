import * as React from "react";
import { FormattedMessage } from "react-intl";
import FeedbackBase from "common/components/feedBack/components/base";
import { FlatButton } from "../../styled";
import { LoginIcon } from "./styled";

import useCurrentGroup from "common/hooks/useCurrentGroup";
import useGroupTexts from "common/hooks/useGroupTexts";
import { useHandleSignIn } from "common/hooks/useHandleSign";

function UnsignedFullScreenFeedback() {
  const currentGroup = useCurrentGroup();
  const signIn = useHandleSignIn();
  const signInText = useGroupTexts("button_login");
  const joinText = useGroupTexts("join_button");
  const childTitle = useGroupTexts("non_joined_child_feedback_full");
  const parentTitle = useGroupTexts("non_signed_up_parent_feedback_full");
  const title = React.useMemo(() => {
    if (currentGroup?.is_hub) {
      return parentTitle?.singular;
    }

    return childTitle?.singular;
  }, [childTitle, currentGroup, parentTitle]);
  const joinButton = React.useMemo(() => {
    if (currentGroup?.is_hub) {
      return signInText?.singular;
    }

    return (
      <FormattedMessage
        id="child_moim_join_button"
        values={{
          ref_join_button: joinText?.singular ?? "",
        }}
      />
    );
  }, [currentGroup, joinText, signInText]);

  return (
    <FeedbackBase
      icon={<LoginIcon />}
      title={title}
      buttons={[<FlatButton onClick={signIn}>{joinButton}</FlatButton>]}
    />
  );
}

export default UnsignedFullScreenFeedback;
