import * as React from "react";
const { storiesOf } = require("@storybook/react");
import { useOpenProfileDialog } from "common/hooks/profileDialog";

import { STORYBOOK_PREFIX } from "common/constants/storybook";
import ProfileDialog from ".";

const MockComponent = () => {
  const ref = React.useRef<HTMLButtonElement>(null);
  const open = useOpenProfileDialog();
  const handleClick = React.useCallback(() => {
    open("U1234", ref);
  }, [ref, open]);

  return (
    <button role="button" ref={ref} onClick={handleClick}>
      Open profile dialog
    </button>
  );
};

storiesOf(`${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Profile Dialog`, module).add(
  "Default",
  () => (
    <>
      <MockComponent />
      <ProfileDialog />
    </>
  ),
);
