import * as React from "react";
import styled from "styled-components";
import { STORYBOOK_PREFIX } from "common/constants/storybook";
const { storiesOf } = require("@storybook/react");

import ProfileHeader from ".";

const Wrapper = styled.div`
  margin: 1rem;
  width: 30rem;
`;

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Profile Header`, module).add(
  "Default",
  () => {
    return (
      <div>
        <Wrapper>
          <div>
            <h1>PROFILE SHOW</h1>
          </div>
          <ProfileHeader
            type="show"
            userId="U1234"
            avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGG748smd2_OZLeYyfrL9lI3XpQlsywN4JmCzQLN2j4uuT16ia&s"
            isOnline={true}
          />
        </Wrapper>
        <Wrapper>
          <div>
            <h1>PROFILE PREVIEW</h1>
          </div>
          <ProfileHeader
            type="preview"
            userId="U1234"
            avatar="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGG748smd2_OZLeYyfrL9lI3XpQlsywN4JmCzQLN2j4uuT16ia&s"
            isOnline={true}
          />
        </Wrapper>
      </div>
    );
  },
);
