import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");

import Component from ".";

export const STORY_BOOK_PATH = `${STORYBOOK_PREFIX.DESIGN_SYSTEM}/RichEditor/Blockit`;

storiesOf(`${STORY_BOOK_PATH}/Renderer`, module).add("Default", () => {
  const [block, setBlock] = React.useState<Moim.Blockit.Blocks>({
    type: "timer",
    style: "brand-colored",
    onGoing: { scope: "seconds" },
    startDateTime: new Date().toISOString(),
    endDateTime: new Date(1600249052999).toISOString(),
  });
  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = React.useCallback(
    e => {
      const value = e.currentTarget.value;
      try {
        const json = JSON.parse(value);
        setBlock(json);
        // eslint-disable-next-line no-empty
      } catch {}
    },
    [],
  );

  return (
    <div>
      <div style={{ marginBottom: "2rem" }}>
        <h1>단일 블럭킷을 적어주세요</h1>
        <textarea
          style={{
            width: "300px",
            minHeight: "3rem",
          }}
          defaultValue={JSON.stringify(block)}
          onChange={handleChange}
        ></textarea>
      </div>
      <Component block={block} />
    </div>
  );
});
