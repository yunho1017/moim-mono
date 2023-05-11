import * as React from "react";
const { storiesOf } = require("@storybook/react");
import { RAW } from "app/__mocks__";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import ProfileComponent from ".";

storiesOf(
  `${STORYBOOK_PREFIX.MODULE_COMPONENTS}/Profile/components/Profile panel`,
  module,
).add("Default", () => (
  <ProfileComponent
    positions={[RAW.POSITION.id]}
    userData={{
      ...RAW.MEMBER,
      id: "U1234",
      name: "Genesis sam",
      bio:
        "Hello! this is test account!\nAs soon as possible close beta open!\nplz wait",
      avatar_url:
        "tbn:ANd9GcSGG748smd2_OZLeYyfrL9lI3XpQlsywN4JmCzQLN2j4uuT16ia",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGG748smd2_OZLeYyfrL9lI3XpQlsywN4JmCzQLN2j4uuT16ia&s",
      positions: [],
    }}
  />
));
