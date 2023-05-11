import * as React from "react";
import { RAW } from "app/__mocks__";

const { storiesOf } = require("@storybook/react");
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import GroupProfileImage from "./";

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/GroupProfileImage `, module)
  .add("No Image", () => (
    <>
      <div>
        XXL :
        <GroupProfileImage icon={RAW.TEXT_ICON} size="xxl" title="Group" />
      </div>
      <div>
        L : <GroupProfileImage icon={RAW.TEXT_ICON} size="l" title="Vingle" />
      </div>
      <div>
        M : <GroupProfileImage icon={RAW.TEXT_ICON} size="m" title="MinuKang" />
      </div>
      <div>
        S : <GroupProfileImage icon={RAW.TEXT_ICON} size="s" title="Twice" />
      </div>
      <div>
        XS : <GroupProfileImage icon={RAW.TEXT_ICON} size="xs" title="IZONE" />
      </div>
    </>
  ))
  .add("With Image", () => (
    <>
      <div>
        XXL :
        <GroupProfileImage icon={RAW.IMAGE_ICON} size="xxl" title="Group" />
      </div>
      <div>
        L : <GroupProfileImage icon={RAW.IMAGE_ICON} size="l" title="Vingle" />
      </div>
      <div>
        M :
        <GroupProfileImage icon={RAW.IMAGE_ICON} size="m" title="MinuKang" />
      </div>
      <div>
        S : <GroupProfileImage icon={RAW.IMAGE_ICON} size="s" title="Twice" />
      </div>
      <div>
        XS :
        <GroupProfileImage icon={RAW.IMAGE_ICON} size="xs" title="IZONE" />
      </div>
    </>
  ))
  .add("With Image & Selected", () => (
    <>
      <div>
        L :
        <GroupProfileImage
          icon={RAW.IMAGE_ICON}
          size="l"
          title="Vingle"
          selected={true}
        />
      </div>
      <div>
        M :
        <GroupProfileImage
          icon={RAW.IMAGE_ICON}
          size="m"
          title="MinuKang"
          selected={true}
        />
      </div>
      <div>
        S :
        <GroupProfileImage
          icon={RAW.IMAGE_ICON}
          size="s"
          title="Twice"
          selected={true}
        />
      </div>
      <div>
        XS :
        <GroupProfileImage
          icon={RAW.IMAGE_ICON}
          size="xs"
          title="IZONE"
          selected={true}
        />
      </div>
    </>
  ))
  .add("With Image & Selected & Badge", () => (
    <>
      <div>
        L :
        <GroupProfileImage
          icon={RAW.IMAGE_ICON}
          size="l"
          title="Vingle"
          selected={true}
          badge={33}
        />
      </div>
      <div>
        M :
        <GroupProfileImage
          icon={RAW.IMAGE_ICON}
          size="m"
          title="MinuKang"
          selected={false}
          badge={2}
        />
      </div>
    </>
  ));
