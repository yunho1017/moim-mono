import * as React from "react";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
const {
  text: textKnob,
  boolean: booleanKnob,
} = require("@storybook/addon-knobs");
import { STORYBOOK_PREFIX } from "common/constants/storybook";

import ForumEditor from ".";

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Forum/Components/editor`,
  module,
).add("default", () => (
  <ForumEditor
    id="new"
    hasContent={false}
    title={textKnob("Title", "")}
    isNewPost={booleanKnob("isNewPost", false)}
    isDraftPost={booleanKnob("isDraftPost", false)}
    isDraftSaving={booleanKnob("임시저장 중", false)}
    isPosting={booleanKnob("포스팅 중", false)}
    titlePlaceholder={textKnob("Title placeholder", "제목을 입력하세요")}
    tagSets={[]}
    selectedTagSetItemIds={[]}
    contents={[]}
    contentPlaceholder={textKnob("Content placeholder", "내용을 입력하세요")}
    preLinkMeeting={null}
    onSave={action("!!! onSubmit")}
    onDiscard={action("!!! onDiscard")}
    onChange={action("!!! onChange")}
    onSaveDraft={action("!!! onSaveDraft")}
    onOpenDraftList={action("!!! onOpenDraftList")}
  />
));
