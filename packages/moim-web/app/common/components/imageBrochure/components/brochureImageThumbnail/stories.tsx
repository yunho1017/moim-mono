import * as React from "react";

const { storiesOf } = require("@storybook/react");
import BrochureImageThumbnail from ".";
import { STORYBOOK_PREFIX } from "common/constants/storybook";

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/ImageBrochure/BrochureThumbnail`,
  module,
).add("Basic", () => (
  <BrochureImageThumbnail
    ownerId="U1234"
    fileId="F1234"
    src="https://s0.vingle.net/images/maintenance_vingle_logo.svg"
    width="300"
    height="120"
  />
));
