import * as React from "react";
import styled from "styled-components";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");

import BaseSelect, { AsyncSelectBase } from ".";
import { STORY_BOOK_PATH } from "../../../..";

const Wrapper = styled.div`
  width: 407px;
  margin: 1rem;
`;

const options: Moim.Blockit.ISelectOption[] = [
  { value: "opt1", label: "option 1 가나다" },
  { value: "opt2", label: "option 2 아이우" },
  { value: "opt3", label: "option 3 가자미" },
  { value: "opt4", label: "option 4" },
  { value: "opt5", label: "option 5" },
  { value: "opt6", label: "option 6" },
  { value: "opt7", label: "option 7" },
  { value: "opt8", label: "option 8" },
  { value: "opt9", label: "option 9" },
  { value: "opt10", label: "option 10" },
];

storiesOf(`${STORY_BOOK_PATH}/Components/Select/Base`, module)
  .add("Base", () => (
    <Wrapper>
      <BaseSelect id="sel01" name="sel01" options={options} />
    </Wrapper>
  ))
  .add("Async", () => (
    <Wrapper>
      <AsyncSelectBase
        id="sel01"
        name="sel01"
        onSearchOptions={(newValue, callback) => {
          action("onSearchOptions")(newValue);
          callback([
            {
              label: "user1",
              value: "username1",
            },
            {
              label: "user2",
              value: "username2",
              avatar: "https://ca.edge.vg/i/G0033S6TH-UDYV5VXRL-vue8uh--512",
            },
            {
              label: "user3",
              value: "username3",
              avatar:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGG748smd2_OZLeYyfrL9lI3XpQlsywN4JmCzQLN2j4uuT16ia&s",
            },
          ]);
        }}
      />
    </Wrapper>
  ));
