import * as React from "react";
import styled from "styled-components";
const { storiesOf } = require("@storybook/react");
const { action } = require("@storybook/addon-actions");
const {
  text: textKnob,
  boolean: booleanKnob,
  select: selectKnob,
} = require("@storybook/addon-knobs");

import { STORYBOOK_PREFIX } from "common/constants/storybook";
import {
  BadgeSelection,
  MemberSelection,
  PositionSelection,
  StaticSelection,
  ChipSelection,
} from ".";
import { px2rem } from "common/helpers/rem";

const OptionPrefix = styled.div<{ color: string }>`
  background-color: ${props => props.color};
  width: ${px2rem(18)};
  height: ${px2rem(18)};
  border-radius: ${px2rem(2)};
`;

const Wrapper = styled.div`
  width: 320px;
  background-color: white;
`;

const options = [
  {
    label: "menu1",
    value: "1",
    prefix: {
      touch: 42,
      leftMargin: 7,
      rightMargin: 3,
      element: <OptionPrefix color="#000" />,
    },
  },
  {
    label: "menu2",
    value: "2",
    prefix: {
      touch: 42,
      leftMargin: 7,
      rightMargin: 3,
      element: <OptionPrefix color="red" />,
    },
  },
  {
    label: "menu3",
    value: "3",
    prefix: {
      touch: 42,
      leftMargin: 7,
      rightMargin: 3,
      element: <OptionPrefix color="red" />,
    },
  },
  {
    label: "menu4",
    value: "4",
    prefix: {
      touch: 42,
      leftMargin: 7,
      rightMargin: 3,
      element: <OptionPrefix color="red" />,
    },
  },
  {
    label: "menu5",
    value: "5",
    prefix: {
      touch: 42,
      leftMargin: 7,
      rightMargin: 3,
      element: <OptionPrefix color="red" />,
    },
  },
  {
    label: "menu6",
    value: "6",
    prefix: {
      touch: 42,
      leftMargin: 7,
      rightMargin: 3,
      element: <OptionPrefix color="red" />,
    },
  },
  {
    label: "menu7",
    value: "7",
    prefix: {
      touch: 42,
      leftMargin: 7,
      rightMargin: 3,
      element: <OptionPrefix color="red" />,
    },
  },
  {
    label: "menu8",
    value: "8",
    isDisabled: true,
    prefix: {
      touch: 42,
      leftMargin: 7,
      rightMargin: 3,
      element: <OptionPrefix color="red" />,
    },
  },
];

storiesOf(`${STORYBOOK_PREFIX.DESIGN_SYSTEM}/selection`, module)
  .add("Static", () => {
    const size = selectKnob("size", {
      S: "s",
      L: "l",
    });
    const state = selectKnob("state", {
      normal: "normal",
      error: "error",
      disabled: "disabled",
    });

    const isMultiple = booleanKnob("isMultiple", true);
    const useSearch = booleanKnob("useSearch", true);
    const selected = (isMultiple ? ["1"] : "1") as any;
    const placeholder = textKnob("placeholder", "");
    const reasonText = textKnob("reasonText", "");
    return (
      <Wrapper>
        <StaticSelection
          size={size}
          state={state}
          selected={selected}
          options={options}
          placeholder={placeholder}
          reasonText={reasonText}
          onChange={action("onChange")}
          useSearch={useSearch}
          isMultiple={isMultiple}
        />
      </Wrapper>
    );
  })
  .add("Member", () => {
    const size = selectKnob("size", {
      L: "l",
      S: "s",
    });
    const state = selectKnob("state", {
      normal: "normal",
      error: "error",
      disabled: "disabled",
    });

    const isMultiple = booleanKnob("isMultiple", true);
    const useSearch = booleanKnob("useSearch", true);
    const selected = (isMultiple ? ["1"] : "1") as any;
    const placeholder = textKnob("placeholder", "");
    const reasonText = textKnob("reasonText", "");
    return (
      <Wrapper>
        <MemberSelection
          size={size}
          state={state}
          selected={selected}
          options={options}
          placeholder={placeholder}
          reasonText={reasonText}
          onChange={action("onChange")}
          useSearch={useSearch}
          isMultiple={isMultiple}
        />
      </Wrapper>
    );
  })
  .add("Position", () => {
    const size = selectKnob("size", {
      L: "l",
      S: "s",
    });
    const state = selectKnob("state", {
      normal: "normal",
      error: "error",
      disabled: "disabled",
    });

    const isMultiple = booleanKnob("isMultiple", true);
    const useSearch = booleanKnob("useSearch", true);
    const selected = (isMultiple ? ["1"] : "1") as any;
    const placeholder = textKnob("placeholder", "");
    const reasonText = textKnob("reasonText", "");
    return (
      <Wrapper>
        <PositionSelection
          size={size}
          state={state}
          selected={selected}
          options={options}
          placeholder={placeholder}
          reasonText={reasonText}
          onChange={action("onChange")}
          useSearch={useSearch}
          isMultiple={isMultiple}
        />
      </Wrapper>
    );
  })
  .add("Badge", () => {
    const size = selectKnob("size", {
      L: "l",
      S: "s",
    });
    const state = selectKnob("state", {
      normal: "normal",
      error: "error",
      disabled: "disabled",
    });

    const isMultiple = booleanKnob("isMultiple", true);
    const useSearch = booleanKnob("useSearch", true);
    const selected = (isMultiple ? ["1"] : "1") as any;
    const placeholder = textKnob("placeholder", "");
    const reasonText = textKnob("reasonText", "");
    return (
      <Wrapper>
        <BadgeSelection
          size={size}
          state={state}
          selected={selected}
          options={options}
          placeholder={placeholder}
          reasonText={reasonText}
          onChange={action("onChange")}
          useSearch={useSearch}
          isMultiple={isMultiple}
        />
      </Wrapper>
    );
  })
  .add("Chip", () => {
    const size = selectKnob(
      "size",
      {
        S: "s",
        L: "l",
      },
      "l",
    );
    const disabled = booleanKnob("disabled", false);
    const placeholder = textKnob("placeholder", "Placeholder");
    return (
      <Wrapper>
        <ChipSelection
          id="1111"
          size={size}
          disabled={disabled}
          options={options}
          placeholder={placeholder}
          onChangeSelect={action("onChange")}
        >
          {(option, checked, index) => (
            <div key={`option_${index}`}>
              {option.label} {checked && "☑️"}{" "}
              {option.isDisabled && " - disabled"}
            </div>
          )}
        </ChipSelection>
      </Wrapper>
    );
  });
