import * as React from "react";
import FeedbackBase from "common/components/feedBack/components/base";
import { useProps, useHandlers } from "./hook";
import { GhostButton } from "../../styled";
import { NoRightIconWrapper, NoRightIcon } from "./styled";

function NoRightFullScreenDialog({
  hasButtons = true,
}: {
  hasButtons?: boolean;
}) {
  const hookProps = useProps();
  const hookHandlers = useHandlers(hookProps);

  const { intl } = hookProps;
  const { handleClickButton } = hookHandlers;

  const buttons = hasButtons
    ? [
        <GhostButton onClick={handleClickButton}>
          {intl.formatMessage({ id: "ok_button" })}
        </GhostButton>,
      ]
    : undefined;

  return (
    <FeedbackBase
      icon={
        <NoRightIconWrapper>
          <NoRightIcon />
        </NoRightIconWrapper>
      }
      title={intl.formatMessage({
        id: "no_right_common_full_page_dialog_title",
      })}
      description={intl.formatMessage({
        id: "no_right_common_full_page_dialog_body",
      })}
      buttons={buttons}
    />
  );
}

export default NoRightFullScreenDialog;
