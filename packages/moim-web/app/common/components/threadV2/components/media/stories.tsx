import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");

import MultiImageHolder from "./multiImage";

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Thread V2/Components/Media/Multi Image`,
  module,
).add("Default", () => {
  return (
    <MultiImageHolder
      parentId="1121"
      images={[
        {
          url:
            "https://files.vingle.network/files/G0VEUOBM0W/FY24TZQRA/__________01.jpeg",
        },
        {
          url:
            "https://files.vingle.network/files/G0VEUOBM0W/FP8JEUR6O/__________04.jpeg",
        },
        {
          url:
            "https://files.vingle.network/files/G0VEUOBM0W/FM7UQV9QQ/__________06.jpeg",
        },
        {
          url:
            "https://files.vingle.network/files/G0VEUOBM0W/FO4BQ5U7M/__________04.jpeg",
        },
        {
          url:
            "https://files.vingle.network/files/G0VEUOBM0W/FO4BQ5U7M/__________03.jpeg",
        },
        {
          url:
            "https://files.vingle.network/files/G0VEUOBM0W/FO4BQ5U7M/__________02.jpeg",
        },
        {
          url:
            "https://files.vingle.network/files/G0VEUOBM0W/FO4BQ5U7M/__________05.jpeg",
        },
        {
          url:
            "https://files.vingle.network/files/G0VEUOBM0W/FO4BQ5U7M/__________07.jpeg",
        },
        {
          url:
            "https://files.vingle.network/files/G0VEUOBM0W/FO4BQ5U7M/__________04.jpeg",
        },
        {
          url:
            "https://files.vingle.network/files/G0VEUOBM0W/FO4BQ5U7M/__________04.jpeg",
        },
        {
          url:
            "https://files.vingle.network/files/G0VEUOBM0W/FO4BQ5U7M/__________04.jpeg",
        },
        {
          url:
            "https://files.vingle.network/files/G0VEUOBM0W/FO4BQ5U7M/__________04.jpeg",
        },
        {
          url:
            "https://files.vingle.network/files/G0VEUOBM0W/FO4BQ5U7M/__________04.jpeg",
        },
      ]}
    />
  );
});
