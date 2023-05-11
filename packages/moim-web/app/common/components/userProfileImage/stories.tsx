import * as React from "react";
const { storiesOf } = require("@storybook/react");
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import UserProfileImage from "./";

const IMAGE =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGG748smd2_OZLeYyfrL9lI3XpQlsywN4JmCzQLN2j4uuT16ia&s";

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/UserProfileImage`, module)
  .add("Normal", () => (
    <>
      <div>
        XL :{" "}
        <UserProfileImage userId="U12345" size="xl" src={IMAGE} shape="round" />{" "}
        <UserProfileImage
          userId="U12345"
          size="xl"
          src={IMAGE}
          shape="square"
        />
      </div>
      <div>
        L :{" "}
        <UserProfileImage userId="U12345" size="l" src={IMAGE} shape="round" />{" "}
        <UserProfileImage userId="U12345" size="l" src={IMAGE} shape="square" />
      </div>
      <div>
        M :{" "}
        <UserProfileImage userId="U12345" size="m" src={IMAGE} shape="round" />{" "}
        <UserProfileImage userId="U12345" size="m" src={IMAGE} shape="square" />
      </div>
      <div>
        S :{" "}
        <UserProfileImage userId="U12345" size="s" src={IMAGE} shape="round" />{" "}
        <UserProfileImage userId="U12345" size="s" src={IMAGE} shape="square" />
      </div>
      <div>
        XS :{" "}
        <UserProfileImage userId="U12345" size="xs" src={IMAGE} shape="round" />{" "}
        <UserProfileImage
          userId="U12345"
          size="xs"
          src={IMAGE}
          shape="square"
        />
      </div>
    </>
  ))
  .add("With Online & Offline", () => (
    <>
      <div>
        XL :{" "}
        <UserProfileImage
          userId="U12345"
          size="xl"
          src={IMAGE}
          isOnline={true}
          shape="round"
        />
        <UserProfileImage
          userId="U12345"
          size="xl"
          src={IMAGE}
          isOnline={true}
          shape="square"
        />
      </div>
      <div>
        L :{" "}
        <UserProfileImage
          userId="U12345"
          size="l"
          src={IMAGE}
          isOnline={true}
          shape="round"
        />
        <UserProfileImage
          userId="U12345"
          size="l"
          src={IMAGE}
          isOnline={true}
          shape="square"
        />
      </div>
      <div>
        M :{" "}
        <UserProfileImage
          userId="U12345"
          size="m"
          src={IMAGE}
          isOnline={false}
          shape="round"
        />
        <UserProfileImage
          userId="U12345"
          size="m"
          src={IMAGE}
          isOnline={false}
          shape="square"
        />
      </div>
      <div>
        S :{" "}
        <UserProfileImage
          userId="U12345"
          size="s"
          src={IMAGE}
          isOnline={true}
          shape="round"
        />
        <UserProfileImage
          userId="U12345"
          size="s"
          src={IMAGE}
          isOnline={true}
          shape="square"
        />
      </div>
      <div>
        XS :{" "}
        <UserProfileImage
          userId="U12345"
          size="xs"
          src={IMAGE}
          isOnline={false}
          shape="round"
        />
        <UserProfileImage
          userId="U12345"
          size="xs"
          src={IMAGE}
          isOnline={false}
          shape="square"
        />
      </div>
    </>
  ));
