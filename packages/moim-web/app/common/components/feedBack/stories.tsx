import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import ServerMaintenance from "./components/serverMaintenance";
import ConnectionError from "./components/connectionError";
import NotFound from "./components/notFound";
import NoRightFullScreenDialog from "common/components/feedBack/components/noRight";
import NoRightDialog, {
  IRefHandler as INoRightDialogRefHandler,
} from "./components/noRight/dialog";
import NoRightAlert, {
  IRefHandler as INoRightAlertRefHandler,
} from "./components/noRight/alert";
import UnsignedScreenFeedback from "common/components/feedBack/components/unsigned/screen";
import { UnsignedChatInputFeedback } from "common/components/feedBack/components/unsigned/input";

const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/FeedBack`)
  .add("Server Maintenance", () => <ServerMaintenance />)
  .add("Connection Error", () => <ConnectionError />)
  .add("404 Not Found", () => <NotFound />)
  .add("No Right", () => <NoRightFullScreenDialog />)
  .add("No Right Dialog", () => {
    const ref = React.useRef<INoRightDialogRefHandler>(null);

    const open = React.useCallback(() => {
      ref.current?.openHandler();
    }, [ref]);

    return (
      <div>
        <button onClick={open}>OPEN DIALOG</button>
        <NoRightDialog ref={ref} onClose={action("onClose")} />
      </div>
    );
  })
  .add("No Right Alert", () => {
    const ref = React.useRef<INoRightAlertRefHandler>(null);

    const open = React.useCallback(() => {
      ref.current?.openHandler();
    }, [ref]);

    return (
      <div>
        <button onClick={open}>OPEN ALERT</button>
        <NoRightAlert ref={ref} onClose={action("onClose")} />
      </div>
    );
  })
  .add("Unsigned Screen", () => <UnsignedScreenFeedback />)
  .add("Unsigned Input", () => <UnsignedChatInputFeedback />);
