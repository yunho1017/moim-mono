import * as React from "react";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");

import ImageUploadThumbnail from ".";
const PAYLOAD = {
  blur_hash: "eSPQ4BS$w.ob==8vN4-Mj?s69Ft0tBfS$IEm-zxBa#WY-:NMWRWDax",
  height: 1000,
  ratio: "1:1",
  src: "https://files.vingle.network/files/G0TAFIYY6/FZ696PQ0U/ttikx.png",
  srcLg:
    "https://files.vingle.network/processed?key=files/G0TAFIYY6/FZ696PQ0U/ttikx.png&type=ratio&value=1:1&scale=lg",
  srcMd:
    "https://files.vingle.network/processed?key=files/G0TAFIYY6/FZ696PQ0U/ttikx.png&type=ratio&value=1:1&scale=md",
  srcSet:
    "https://files.vingle.network/processed?key=files/G0TAFIYY6/FZ696PQ0U/ttikx.png&type=ratio&value=1:1&scale=xs 320w, https://files.vingle.network/processed?key=files/G0TAFIYY6/FZ696PQ0U/ttikx.png&type=ratio&value=1:1&scale=sm 780w, https://files.vingle.network/processed?key=files/G0TAFIYY6/FZ696PQ0U/ttikx.png&type=ratio&value=1:1&scale=md 1120w, https://files.vingle.network/processed?key=files/G0TAFIYY6/FZ696PQ0U/ttikx.png&type=ratio&value=1:1&scale=lg 1600w, https://files.vingle.network/processed?key=files/G0TAFIYY6/FZ696PQ0U/ttikx.png&type=ratio&value=1:1&scale=xl 1920w",
  srcSm:
    "https://files.vingle.network/processed?key=files/G0TAFIYY6/FZ696PQ0U/ttikx.png&type=ratio&value=1:1&scale=sm",
  srcXl:
    "https://files.vingle.network/processed?key=files/G0TAFIYY6/FZ696PQ0U/ttikx.png&type=ratio&value=1:1&scale=xl",
  srcXs:
    "https://files.vingle.network/processed?key=files/G0TAFIYY6/FZ696PQ0U/ttikx.png&type=ratio&value=1:1&scale=xs",
  type: "image",
  width: 1000,
};

storiesOf(
  `${STORYBOOK_PREFIX.COMMON_COMPONENTS}/ImageUploadThumbnail`,
  module,
).add("Default", () => {
  return (
    <>
      <ImageUploadThumbnail
        id="img-01"
        payload={PAYLOAD}
        isLoading={false}
        onRemoveClick={action("onRemoveClick")}
      />

      <ImageUploadThumbnail
        id="img-02"
        payload={PAYLOAD}
        isLoading={true}
        onRemoveClick={action("onRemoveClick")}
      />
    </>
  );
});
