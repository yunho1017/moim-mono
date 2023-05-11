import * as React from "react";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");

import FocusAnimationInput from ".";
import { px2rem } from "common/helpers/rem";
import { STORYBOOK_PREFIX } from "common/constants/storybook";

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/FocusAnimationInput`, module)
  .add("common", () => (
    <div style={{ width: px2rem(200) }}>
      <FocusAnimationInput
        title="Name"
        value="hello"
        placeholder="비밀번호를 입력해주세요"
        onInputTextChange={action("OnClick!!")}
      />
    </div>
  ))
  .add("no value", () => (
    <div style={{ width: px2rem(200) }}>
      <FocusAnimationInput
        title="Name"
        value=""
        placeholder="비밀번호를 입력해주세요"
        onInputTextChange={action("OnClick!!")}
      />
    </div>
  ));
