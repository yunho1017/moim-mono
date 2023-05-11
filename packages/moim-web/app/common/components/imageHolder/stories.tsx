import * as React from "react";
const { storiesOf } = require("@storybook/react");
const { number: numberKnob } = require("@storybook/addon-knobs");
import ImageHolder from ".";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import ImageHolderSkeleton from "./skeleton";

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/ImageHolder`, module)
  .add("Normal/Default", () => (
    <div style={{ width: "600px" }}>
      <ImageHolder
        key="image_1"
        src="https://files.vingle.network/files/G0TAFIYY6/F1C124XE6/ttikx.png"
        width={1000}
        height={1000}
      />
      <ImageHolder
        key="image_2"
        src="https://careers.vingle.net/assets/img/vingle_og.jpg"
        width={numberKnob("Size", 250) * 2}
        height={numberKnob("Size", 250)}
      />
      <ImageHolderSkeleton
        blurHash="eSPQ4BS$w.ob==8vN4-Mj?s69Ft0tBfS$IEm-zxBa#WY-:NMWRWDax"
        width={1000}
        height={1000}
      />
      <ImageHolderSkeleton />
    </div>
  ))
  .add("Normal/Cover", () => (
    <ImageHolder
      src="https://files.vingle.network/files/G0TAFIYY6/F1C124XE6/ttikx.png"
      width={numberKnob("Size", 250) * 2}
      height={numberKnob("Size", 250)}
      fit="cover"
    />
  ))
  .add("Normal/Contain", () => (
    <ImageHolder
      src="https://files.vingle.network/files/G0TAFIYY6/F1C124XE6/ttikx.png"
      width={numberKnob("Size", 250) * 2}
      height={numberKnob("Size", 250)}
      fit="contain"
    />
  ))
  .add("Normal/fill", () => (
    <ImageHolder
      src="https://files.vingle.network/files/G0TAFIYY6/F1C124XE6/ttikx.png"
      width={numberKnob("Size", 250) * 2}
      height={numberKnob("Size", 250)}
      fit="fill"
    />
  ));
// .add("Tall", () => (
//   <ImageHolder
//     src={MOCK_TALL_IMAGE.src}
//     width={MOCK_TALL_IMAGE.width}
//     height={MOCK_TALL_IMAGE.height}
//   />
// ))
// .add("Tall/CropTop", () => (
//   <ImageHolder
//     src={MOCK_TALL_IMAGE.src}
//     width={MOCK_TALL_IMAGE.width}
//     height={MOCK_TALL_IMAGE.height / 2}
//     fit="crop-top"
//   />
// ))
// .add("Wide", () => (
//   <ImageHolder
//     src={MOCK_WIDE_IMAGE.src}
//     width={MOCK_WIDE_IMAGE.width}
//     height={MOCK_WIDE_IMAGE.height}
//   />
// ));
