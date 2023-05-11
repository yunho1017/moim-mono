import * as React from "react";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
const { text: textKnob } = require("@storybook/addon-knobs");

import GroupInput, { SimpleDialogGroupInput, ReviewDialogGroupInput } from ".";
import { STORYBOOK_PREFIX } from "common/constants/storybook";

storiesOf(`${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Inputs/GroupInput`, module)
  .add("Default", () => (
    <div style={{ marginTop: "300px", width: "600px" }}>
      <GroupInput
        id="C123"
        imageBlocks={[
          {
            blurHash: "eSPQ4BS$w.ob==8vN4-Mj?s69Ft0tBfS$IEm-zxBa#WY-:NMWRWDax",
            height: 1000,
            ratio: "1:1",
            src:
              "https://files.vingle.network/files/G0TAFIYY6/FZ696PQ0U/ttikx.png",
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
          },
          {
            blurHash: "d69Gjma}a{WW57ayfQjt0Lf6j[j?~Uj[j[fQNyj@a{j[",
            height: 360,
            ratio: "4:3",
            src:
              "https://files.vingle.network/files/G0TAFIYY6/F1CDTYRJD/img.gif",
            srcLg:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=lg",
            srcMd:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=md",
            srcSet:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xs 320w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=sm 780w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=md 1120w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=lg 1600w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xl 1920w",
            srcSm:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=sm",
            srcXl:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xl",
            srcXs:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xs",
            type: "image",
            width: 480,
          },
          {
            blurHash: "eSPQ4BS$w.ob==8vN4-Mj?s69Ft0tBfS$IEm-zxBa#WY-:NMWRWDax",
            height: 1000,
            ratio: "1:1",
            src:
              "https://files.vingle.network/files/G0TAFIYY6/FZ696PQ0U/ttikx.png",
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
          },
          {
            blurHash: "d69Gjma}a{WW57ayfQjt0Lf6j[j?~Uj[j[fQNyj@a{j[",
            height: 360,
            ratio: "4:3",
            src:
              "https://files.vingle.network/files/G0TAFIYY6/F1CDTYRJD/img.gif",
            srcLg:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=lg",
            srcMd:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=md",
            srcSet:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xs 320w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=sm 780w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=md 1120w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=lg 1600w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xl 1920w",
            srcSm:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=sm",
            srcXl:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xl",
            srcXs:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xs",
            type: "image",
            width: 480,
          },
          {
            blurHash: "eSPQ4BS$w.ob==8vN4-Mj?s69Ft0tBfS$IEm-zxBa#WY-:NMWRWDax",
            height: 1000,
            ratio: "1:1",
            src:
              "https://files.vingle.network/files/G0TAFIYY6/FZ696PQ0U/ttikx.png",
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
          },
          {
            blurHash: "d69Gjma}a{WW57ayfQjt0Lf6j[j?~Uj[j[fQNyj@a{j[",
            height: 360,
            ratio: "4:3",
            src:
              "https://files.vingle.network/files/G0TAFIYY6/F1CDTYRJD/img.gif",
            srcLg:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=lg",
            srcMd:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=md",
            srcSet:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xs 320w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=sm 780w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=md 1120w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=lg 1600w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xl 1920w",
            srcSm:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=sm",
            srcXl:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xl",
            srcXs:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xs",
            type: "image",
            width: 480,
          },
          {
            blurHash: "eSPQ4BS$w.ob==8vN4-Mj?s69Ft0tBfS$IEm-zxBa#WY-:NMWRWDax",
            height: 1000,
            ratio: "1:1",
            src:
              "https://files.vingle.network/files/G0TAFIYY6/FZ696PQ0U/ttikx.png",
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
          },
          {
            blurHash: "d69Gjma}a{WW57ayfQjt0Lf6j[j?~Uj[j[fQNyj@a{j[",
            height: 360,
            ratio: "4:3",
            src:
              "https://files.vingle.network/files/G0TAFIYY6/F1CDTYRJD/img.gif",
            srcLg:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=lg",
            srcMd:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=md",
            srcSet:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xs 320w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=sm 780w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=md 1120w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=lg 1600w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xl 1920w",
            srcSm:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=sm",
            srcXl:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xl",
            srcXs:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xs",
            type: "image",
            width: 480,
          },
          {
            blurHash: "eSPQ4BS$w.ob==8vN4-Mj?s69Ft0tBfS$IEm-zxBa#WY-:NMWRWDax",
            height: 1000,
            ratio: "1:1",
            src:
              "https://files.vingle.network/files/G0TAFIYY6/FZ696PQ0U/ttikx.png",
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
          },
          {
            blurHash: "d69Gjma}a{WW57ayfQjt0Lf6j[j?~Uj[j[fQNyj@a{j[",
            height: 360,
            ratio: "4:3",
            src:
              "https://files.vingle.network/files/G0TAFIYY6/F1CDTYRJD/img.gif",
            srcLg:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=lg",
            srcMd:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=md",
            srcSet:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xs 320w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=sm 780w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=md 1120w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=lg 1600w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xl 1920w",
            srcSm:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=sm",
            srcXl:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xl",
            srcXs:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xs",
            type: "image",
            width: 480,
          },
          {
            blurHash: "eSPQ4BS$w.ob==8vN4-Mj?s69Ft0tBfS$IEm-zxBa#WY-:NMWRWDax",
            height: 1000,
            ratio: "1:1",
            src:
              "https://files.vingle.network/files/G0TAFIYY6/FZ696PQ0U/ttikx.png",
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
          },
          {
            blurHash: "d69Gjma}a{WW57ayfQjt0Lf6j[j?~Uj[j[fQNyj@a{j[",
            height: 360,
            ratio: "4:3",
            src:
              "https://files.vingle.network/files/G0TAFIYY6/F1CDTYRJD/img.gif",
            srcLg:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=lg",
            srcMd:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=md",
            srcSet:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xs 320w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=sm 780w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=md 1120w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=lg 1600w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xl 1920w",
            srcSm:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=sm",
            srcXl:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xl",
            srcXs:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xs",
            type: "image",
            width: 480,
          },
          {
            blurHash: "d69Gjma}a{WW57ayfQjt0Lf6j[j?~Uj[j[fQNyj@a{j[",
            height: 360,
            ratio: "4:3",
            src:
              "https://files.vingle.network/files/G0TAFIYY6/F1CDTYRJD/img.gif",
            srcLg:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=lg",
            srcMd:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=md",
            srcSet:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xs 320w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=sm 780w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=md 1120w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=lg 1600w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xl 1920w",
            srcSm:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=sm",
            srcXl:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xl",
            srcXs:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xs",
            type: "image",
            width: 480,
          },
          {
            blurHash: "eSPQ4BS$w.ob==8vN4-Mj?s69Ft0tBfS$IEm-zxBa#WY-:NMWRWDax",
            height: 1000,
            ratio: "1:1",
            src:
              "https://files.vingle.network/files/G0TAFIYY6/FZ696PQ0U/ttikx.png",
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
          },
          {
            blurHash: "d69Gjma}a{WW57ayfQjt0Lf6j[j?~Uj[j[fQNyj@a{j[",
            height: 360,
            ratio: "4:3",
            src:
              "https://files.vingle.network/files/G0TAFIYY6/F1CDTYRJD/img.gif",
            srcLg:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=lg",
            srcMd:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=md",
            srcSet:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xs 320w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=sm 780w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=md 1120w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=lg 1600w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xl 1920w",
            srcSm:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=sm",
            srcXl:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xl",
            srcXs:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xs",
            type: "image",
            width: 480,
          },
          {
            blurHash: "eSPQ4BS$w.ob==8vN4-Mj?s69Ft0tBfS$IEm-zxBa#WY-:NMWRWDax",
            height: 1000,
            ratio: "1:1",
            src:
              "https://files.vingle.network/files/G0TAFIYY6/FZ696PQ0U/ttikx.png",
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
          },
          {
            blurHash: "d69Gjma}a{WW57ayfQjt0Lf6j[j?~Uj[j[fQNyj@a{j[",
            height: 360,
            ratio: "4:3",
            src:
              "https://files.vingle.network/files/G0TAFIYY6/F1CDTYRJD/img.gif",
            srcLg:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=lg",
            srcMd:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=md",
            srcSet:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xs 320w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=sm 780w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=md 1120w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=lg 1600w, https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xl 1920w",
            srcSm:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=sm",
            srcXl:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xl",
            srcXs:
              "https://files.vingle.network/processed?key=files/G0TAFIYY6/F1CDTYRJD/img.gif&type=ratio&value=4:3&scale=xs",
            type: "image",
            width: 480,
          },
          {
            blurHash: "eSPQ4BS$w.ob==8vN4-Mj?s69Ft0tBfS$IEm-zxBa#WY-:NMWRWDax",
            height: 1000,
            ratio: "1:1",
            src:
              "https://files.vingle.network/files/G0TAFIYY6/FZ696PQ0U/ttikx.png",
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
          },
        ]}
        value={[
          {
            type: "text",
            content:
              "<@U1111>님 안녕하세요. 저는 <#C7111>을 관리하는 관리자입니다.\n<@U2222>, <@U3333> <@U44444>",
          },
        ]}
        placeholder={textKnob("Placeholder", "Message here")}
        onEnter={action("onEnter")}
      />
    </div>
  ))
  .add("Simple Dialog Group input", () => {
    const [open, setOpen] = React.useState(true);

    return (
      <div>
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          인풋창 열기
        </button>
        <SimpleDialogGroupInput
          id="C1234"
          open={open}
          contents={[
            {
              type: "text",
              content: "hello world",
            },
          ]}
          titleElement="질문하기"
          cancelAlertMessage="작성한 내용을 포스트 하지않고 닫으시겠습니까?"
          postAlertMessage="작성한 질문을 등록하시겠습니까?"
          uploadLoadingAlertMessage="업로드가 끝난후 등록해주세요"
          onPost={action("onPost")}
          onCancel={action("onCancel")}
          onClose={() => {
            setOpen(false);
          }}
        />
      </div>
    );
  })
  .add("Review Dialog Group input", () => {
    const [open, setOpen] = React.useState(true);

    return (
      <div>
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          인풋창 열기
        </button>
        <ReviewDialogGroupInput
          id="C1234"
          open={open}
          meta={{
            purchaseItem: {
              id: "123",
              userId: "sersedfs",
            },
            purchaseItemSnap: {
              productId: "123",
              productName: "productName!@#!@#",
              quantity: 2,
              checkoutPrice: 192932,
            },
          }}
          contents={[
            {
              type: "text",
              content: "hello world",
            },
          ]}
          titleElement="질문하기"
          cancelAlertMessage="작성한 내용을 포스트 하지않고 닫으시겠습니까?"
          postAlertMessage="작성한 질문을 등록하시겠습니까?"
          uploadLoadingAlertMessage="업로드가 끝난후 등록해주세요"
          onPost={action("onPost")}
          onCancel={action("onCancel")}
          onClose={() => {
            setOpen(false);
          }}
        />
      </div>
    );
  });
