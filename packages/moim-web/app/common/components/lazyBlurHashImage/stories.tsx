import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");

import LazyBlurHashImage from ".";

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/LazyBlurhashImage`,
  module,
).add("Default", () => {
  return (
    <>
      <div style={{ width: "100%", height: "1000px", backgroundColor: "cyan" }}>
        Black area
      </div>
      <LazyBlurHashImage
        src="https://files.vingle.network/files/G0CUWIRCRG/F81QG4NNW/1.png"
        blurHash="D0R3TW-=IUxuWB00t7%2RjD%"
        srcSet={`https://files.vingle.network/processed?key=files/G0CUWIRCRG/F81QG4NNW/1.png&type=ratio&value=234:529&scale=xs 320w, https://files.vingle.network/processed?key=files/G0CUWIRCRG/F81QG4NNW/1.png&type=ratio&value=234:529&scale=sm 780w, https://files.vingle.network/processed?key=files/G0CUWIRCRG/F81QG4NNW/1.png&type=ratio&value=234:529&scale=md 1120w, https://files.vingle.network/processed?key=files/G0CUWIRCRG/F81QG4NNW/1.png&type=ratio&value=234:529&scale=lg 1600w, https://files.vingle.network/processed?key=files/G0CUWIRCRG/F81QG4NNW/1.png&type=ratio&value=234:529&scale=xl 1920w`}
        // sizes="800px"
        fallBackSrc=""
        width={468}
        height={1058}
      />

      {/* <LazyBlurHashImage
        src="https://files.vingle.network/files/G0CUWIRCRG/FO8CDX6IY/2.jpeg"
        blurHash="DdJ*n@j[fQj[fQ~qj[fQj[ay"
        srcSet={`https://files.vingle.network/processed?key=files/G0CUWIRCRG/FO8CDX6IY/2.jpeg&type=ratio&value=761:2016&scale=xs 320w, https://files.vingle.network/processed?key=files/G0CUWIRCRG/FO8CDX6IY/2.jpeg&type=ratio&value=761:2016&scale=sm 780w, https://files.vingle.network/processed?key=files/G0CUWIRCRG/FO8CDX6IY/2.jpeg&type=ratio&value=761:2016&scale=md 1120w, https://files.vingle.network/processed?key=files/G0CUWIRCRG/FO8CDX6IY/2.jpeg&type=ratio&value=761:2016&scale=lg 1600w, https://files.vingle.network/processed?key=files/G0CUWIRCRG/FO8CDX6IY/2.jpeg&type=ratio&value=761:2016&scale=xl 1920w`}
        // sizes="800px"
        fallBackSrc=""
        width={1522}
        height={4032}
      /> */}
    </>
  );
});
