import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import ResponsiveDialog from "common/components/responsiveDialog/index";
const { storiesOf } = require("@storybook/react");

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Responsive Dialog`,
  module,
).add("Default", () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open</button>

      <ResponsiveDialog open={isOpen} onCloseRequest={() => setIsOpen(false)}>
        <div style={{ width: "320px", height: "200px" }}>Responsive Dialog</div>
      </ResponsiveDialog>
    </>
  );
});
