import * as React from "react";
const { storiesOf } = require("@storybook/react");

import { STORYBOOK_PREFIX } from "common/constants/storybook";
import TermsOfUse from "./termsOfUse";
import PrivacyPolicy from "./privacyPolicy";

storiesOf(`${STORYBOOK_PREFIX.MODULE_COMPONENTS}/About/TermsOfUse`, module)
  .add("TermsOfUse", () => <TermsOfUse />)
  .add("PrivacyPolicy", () => <PrivacyPolicy />);
