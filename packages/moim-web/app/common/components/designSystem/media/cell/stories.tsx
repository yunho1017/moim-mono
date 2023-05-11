import * as React from "react";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
const {
  text: textKnob,
  boolean: booleanKnob,
  select: selectKnob,
} = require("@storybook/addon-knobs");

import { STORYBOOK_PREFIX } from "common/constants/storybook";
import MediaCellComponent from ".";
import { RAW } from "app/__mocks__";

storiesOf(`${STORYBOOK_PREFIX.DESIGN_SYSTEM}/Media/Cell/Component`, module).add(
  "default",
  () => (
    <div style={{ width: "320px", paddingTop: "300px" }}>
      <MediaCellComponent
        title={textKnob("title", "title")}
        fileType={textKnob("fileType", "fileType")}
        mimeType={selectKnob(
          "mimeType",
          {
            image: "image/*",
            video: "video/*",
            file: "application/pdf",
          },
          "image",
        )}
        privateUrl={RAW.FILE_IMAGE.data.url_private}
        isUploading={booleanKnob("isUploading", false)}
        isFailed={booleanKnob("isFailed", false)}
        disableButtons={booleanKnob("disableButtons", false)}
        isSmallDeleteButton={booleanKnob("isSmallDeleteButton", false)}
        onClickRetry={action("onClickRetry")}
        onClickDelete={action("onClickDelete")}
      />
    </div>
  ),
);
