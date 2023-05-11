import * as React from "react";
import { FormattedMessage } from "react-intl";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");

import { STORYBOOK_PREFIX } from "common/constants/storybook";
import Phone from ".";

const PHONE_TEXT_SET: Moim.Group.ICreateMoimStepData = {
  title: <FormattedMessage id="sign_up_form/second/page_title" />,
  subTitle: <FormattedMessage id="sign_up_form/second/page_description" />,
  buttonText: <FormattedMessage id="set_your_name/button_set" />,
};

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/JoinGroup/phone`,
  module,
).add("main", () => (
  <Phone stepData={PHONE_TEXT_SET} onNext={action("button click")} />
));
