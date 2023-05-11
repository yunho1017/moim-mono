import * as React from "react";
import { BaseEmoji } from "emoji-mart";
const { storiesOf } = require("@storybook/react");

import EmojiPopover from ".";
import { STORYBOOK_PREFIX } from "common/constants/storybook";

const MockComponent = () => {
  const refButton = React.useRef<HTMLButtonElement>(null);
  const [open, setOpen] = React.useState(false);
  const setClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleClick = React.useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button ref={refButton} onClick={handleClick}>
        Open emoji popover
      </button>
      <EmojiPopover
        open={open}
        anchorElement={refButton.current}
        onSelected={(emoji: BaseEmoji) => {
          console.log(
            `!! onSelected: ${String.fromCodePoint(
              parseInt(emoji.unified, 16),
            )}`,
          );
        }}
        onClose={setClose}
      />
    </div>
  );
};

storiesOf(`${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Emoji`, module).add(
  "Default",
  () => <MockComponent />,
);
