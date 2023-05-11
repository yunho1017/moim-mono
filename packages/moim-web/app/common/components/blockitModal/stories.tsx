import * as React from "react";
import { Provider } from "react-redux";
const { storiesOf } = require("@storybook/react");
const { text: textKnob } = require("@storybook/addon-knobs");
import { STORYBOOK_PREFIX } from "common/constants/storybook";
import { initialState } from "app/rootReducer";
import { generateMockStore } from "app/__mocks__/mockStore";

import Component from ".";

const ShowCase = () => <Component />;

storiesOf(`${STORYBOOK_PREFIX.COMMON_COMPONENTS}/Blockit Modal`, module).add(
  "Default",
  () => {
    const MOCK_STORE = generateMockStore({
      ...initialState,
      blockitModal: {
        open: true,
        isLoading: false,
        title: textKnob("Modal title", " Vote for [option_title]"),
        blocks: [
          {
            type: "form",
            buttons: {
              submit: {
                content: "투표",
                type: "flat",
                style: "primary",
                size: "large",
              },
            },
            blocks: [
              {
                type: "input",
                name: "input-1",
                label:
                  "EN) How many [point type] would you spend to vote for [this option name]?",
                element: {
                  type: "text-input",
                  required: true,
                  placeholder: "[point type]",
                  initialValue: "",
                  isMultiline: false,
                },
              },
              {
                type: "text",
                subType: "caption",
                content: "Available voting power | # [point type]",
              },
              {
                type: "text",
                subType: "caption",
                content: "Total voting power | # [point type]",
              },
              {
                type: "text",
                subType: "caption",
                content: "Used voting power | # [point type]",
              },
              {
                type: "line",
                backgroundColor: "#e9edf0",
                height: 1,
                fillWidth: 0,
                fillColor: "primary-main",
              },
              {
                type: "input",
                name: "input-2",
                label: "Why would you like to vote for [this option name]?",
                description: "Please write within {count} characters.",
                element: {
                  type: "text-input",
                  required: true,
                  placeholder:
                    "Write something...Write something...Write something...Write something...Write something...Write something..",
                  initialValue: "",
                  isMultiline: true,
                  minLength: 0,
                  maxLength: 34,
                },
              },
            ],
          },
        ],
      },
    });
    return (
      <Provider store={MOCK_STORE}>
        <ShowCase />
      </Provider>
    );
  },
);
