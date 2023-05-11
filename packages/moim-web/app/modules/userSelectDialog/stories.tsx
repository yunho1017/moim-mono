import * as React from "react";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
import UserSelectDialog from "./index";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import { RAW } from "../../__mocks__";

const users = [
  { ...RAW.MEMBER, user_id: `U${Math.random()}` },
  { ...RAW.MEMBER, user_id: `U${Math.random()}` },
  { ...RAW.MEMBER, user_id: `U${Math.random()}` },
  { ...RAW.MEMBER, user_id: `U${Math.random()}` },
  { ...RAW.MEMBER, user_id: `U${Math.random()}` },
  { ...RAW.MEMBER, user_id: `U${Math.random()}` },
  { ...RAW.MEMBER, user_id: `U${Math.random()}` },
];

storiesOf(`${STORYBOOK_PREFIX.MODULE_COMPONENTS}/UserSelectDialog`)
  .add("Radio", () => (
    <UserSelectDialog
      open={true}
      isLoading={false}
      onClose={action("onClose")}
      title="User Select Dialog"
      placeholder="This is placeholder"
      nextButtonText={"Add"}
      isMultipleSelect={false}
      users={{ data: users, paging: {} }}
      onNext={action("onNext")}
      onSearchUser={action("onSearchUser")}
      onGetMembers={action("onGetMember")}
    />
  ))
  .add("Checkbox", () => (
    <UserSelectDialog
      open={true}
      isLoading={false}
      onClose={action("onClose")}
      title="User Select Dialog"
      placeholder="This is placeholder"
      nextButtonText={"Add"}
      isMultipleSelect={true}
      users={{ data: users, paging: {} }}
      onNext={action("onNext")}
      onSearchUser={action("onSearchUser")}
      onGetMembers={action("onGetMember")}
    />
  ));
